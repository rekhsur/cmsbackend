const express = require("express")
const router =  express.Router()
const Controller = require("../controller/usercontroller")
const auth = require("../middleware/userAuthorization")

router.get("/users", Controller.userPanel)
router.post("/users/signup",Controller.signup)

router.post("/users/login", Controller.login)
router.get("/users/:id", Controller.getdata)
router.post("/users/singleUser",Controller.getSingleData )
router.patch("/users/update", Controller.update)
router.delete("/users/delete", Controller.removeData)
router.post("/users/logout",Controller.logout)
module.exports = router