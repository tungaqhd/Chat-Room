require("dotenv").config();
require("./config/database");

const Message = require("./models/message.model");
const User = require("./models/user.model");

const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const session = require("express-session");
const cookieParser = require("cookie-parser");
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_KEY,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(async function () {
          const user = await User.findOne({facebookId: profile.id});
          if(user) {
            return done(null, user);
          } else {
            const user = User({facebookId: profile.id, username: `user_${profile.id}`, name: profile.displayName});
              await user.save();
              return done(null, user);
          }
        return done(null, profile);
      });
    }
  )
);
app.use(
  session({
    secret: "asjnakjsnakjsmnaolksnaijsbajhsnbkasbujahs",
    key: "sid",
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

let totalOnline = 0;
io.on("connection", (socket) => {
  socket.join("home");
  ++totalOnline;
  io.to("home").emit("updateOnline", totalOnline);

  socket.on("disconnect", () => {
    --totalOnline;
    io.to("home").emit("updateOnline", totalOnline);
  });

  socket.on("sendMessage", async (username, message) => {
    if (message.length > 200) {
      io.to("home").emit(
        "alert",
        "error",
        "Maximum length of message is 200 characters!"
      );
    } else {
      const messageSave = Message({ username, message });
      await messageSave.save();

      io.to("home").emit("receiveMessage", username, message, new Date());
    }
  });

  socket;
});

app.use(express.static("public"));
app.use(bodyParser.json({ limit: "10MB" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const routers = require("./routes/index.route");
app.use(routers);

server.listen(process.env.PORT, () =>
  console.log(`App is listening on port ${process.env.PORT}`)
);
