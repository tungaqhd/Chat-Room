require("dotenv").config();
require("./config/database");

const Message = require("./models/message.model");
const User = require("./models/user.model");

const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const xss = require("xss");
const moment = require('moment');

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
        const user = await User.findOne({ facebookId: profile.id });
        if (user) {
          return done(null, user);
        } else {
          const user = User({
            facebookId: profile.id,
            username: `user_${profile.id}`,
            name: profile.displayName,
          });
          let token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
          user.token = token;
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
    saveUninitialized: true,
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

  socket.on("sendMessage", async (payload, message) => {
    if (message.length > 200) {
      io.to("home").emit(
        "alert",
        "error",
        "Maximum length of message is 200 characters!"
      );
    } else {
      let user;
      try {
        let token = jwt.verify(payload, process.env.JWT_TOKEN);
        user = await User.findById(token.id);
      } catch (e) {
        console.log(e);
      }
      message = xss(message);
      let timer = moment().format('MMMM Do YYYY, h:mm:ss a');
      const messageSave = Message({userId: user._id, message, username: user.username, avatar: user.avatar, time: timer});
      await messageSave.save();

      io.to("home").emit("receiveMessage", user.username, message, timer, user.avatar);
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
