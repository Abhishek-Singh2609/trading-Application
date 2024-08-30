const express = require("express");
const { Signup,Login } = require("../Controllers/AuthController");

const router = express.Router();

router.post("/signup", Signup);
router.post('/login', Login)

// router.get("/test-auth", (req, res) => {
//     res.send("Auth Route is working!");
// });


module.exports = router;