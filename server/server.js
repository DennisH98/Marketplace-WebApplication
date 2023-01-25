require('./models/db');
const express = require('express');
const cors = require('cors');
const authRoute = require("./routes/auth");
const reviewRoute = require("./routes/review");
const productRoute = require("./routes/product");
const userRoute = require("./routes/user");
const bidRoute = require("./routes/bid");
const profileRoute = require("./routes/profile");
const conversationRoute = require("./routes/conversations")
const messageRoute = require("./routes/messages")
const passport = require("passport");


const app = express();

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//example endpoints: localhost:5000/api/auth/signup
//                   localhost:5000/api/auth/login
app.use("/api/auth", authRoute);
app.use("/api/review", reviewRoute);
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);
app.use("/api/bid", bidRoute);
app.use("/api/profile", profileRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

//React frontend will fetch (GET/POST...etc) from the routes at localhost:5000/api/.....


app.get('/', (req, res) => {
   res.send('Hello World');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
