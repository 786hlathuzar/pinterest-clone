var express = require('express');
var router = express.Router();
let userModel = require('./users')
let postModel = require('./posts');
const passport = require('passport');
const localStrategy = require('passport-local');
passport.use(new localStrategy(userModel.authenticate()))
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
// router.get('/alluser', async (req, res) => {
//   let users = await userModel.findOne({ _id: "6744865582134c293c3fb903" }).populate("post");
//   res.send(users);
// })
// router.get('/alluserpost', async (req, res) => {
//   let users = await userModel.findOne({ _id: "6744865582134c293c3fb903" }).populate("post");
//   res.send(users);
// })
// router.get('/createUser', async (req, res) => {
//   let user = await userModel.create({
//     // username:req.query.name,
//     // password:req.query.password,
//     // post:[],
//     // email:req.query.email,
//     // fullName:"Aung Kyaw"
//     username: "Aung3",
//     password: "Aung",
//     post: [],
//     email: "aungaung3@gmail.com",
//     fullName: "Aung Kyaw"
//   })
//   res.send(user)
// })


// router.get("/createPost", async (req, res) => {
//   let createPost = await postModel.create({
//     postText: "Hello  Post",
//     user: "6744865582134c293c3fb903"
//   })
//   let users = await userModel.findOne({ _id: ("6744865582134c293c3fb903") });
//   users.post.push(createPost._id);
//   await users.save()
//   res.send("Done")
// })

router.post("/register", async (req, res) => {
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname })

  userModel.register(userData, req.body.password)
    .then((user) => {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile")
      })
    })
})

// router.post("/login", passport.authenticate("local", {
//   successRedirect: "/profile",
//   failureRedirect: "/"
// }), function (req, res) { })

router.get('/login', (req, res) => {
  res.render('login');
})
router.post("/logout", (req, res, next) => {
  req.logout((e) => {
    if (e) return next(e);
    res.redirect("/");
  });
})
router.get("/profile", isloggedIn, (req, res) => {
  res.send("Welcome to profile");
})

function isloggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
module.exports = router;
