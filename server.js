const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./db");
const authRoutes = require("./routes/authRoutes");
const session = require("express-session"); 
const journalRoutes = require("./routes/journalRoutes"); 
const { ensureAuthenticated } = require("./middleware/auth");
const MongoStore = require("connect-mongo");
const quizRoutes = require("./routes/quizRoutes");
const forumRoutes = require('./routes/forum');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

connectDB();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/mentalHealthApp" }),
    cookie: { maxAge: 86400000 }// 1 day
}));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use((req, res, next) => {
//     console.log("Middleware User:", req.user);
//     next();
// });

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/journal", ensureAuthenticated, journalRoutes);
app.use("/api/quiz", quizRoutes);
app.use(forumRoutes);

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
  });
  
  app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "register.html"));
  });
  
  app.get("/homepage", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "homepage.html"));
});
app.get("/findTherapist", (req, res) => {
    res.sendFile(path.join(__dirname, "public","Location.html"));
});
app.get("/relaxVideos", (req, res) => {
    res.sendFile(path.join(__dirname, "public","Videos.html"));
});
app.get("/journal", ensureAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "journal.html"));
});
app.get("/quiz",(req,res)=>{
    res.sendFile(path.join(__dirname, "public", "quiz.html"));
});
app.get("/about", (req, res) => {
    res.render("about"); // or sendFile if HTML
});
// app.get("/check-auth", (req, res) => {
//     console.log("User:", req.user);
//     res.json({ user: req.user || "No user found", authenticated: req.isAuthenticated() });
// });
app.get("/session", (req, res) => {
    res.json(req.session);
});



const PORT =3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
