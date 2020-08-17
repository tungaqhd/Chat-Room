const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})