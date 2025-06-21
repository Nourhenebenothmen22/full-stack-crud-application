const express = require("express");
const router = express.Router();
const userController = require('../Controllers/UserControllers');

router.post("/user", userController.createUser);
router.delete("/user/:id", userController.deleteUser);
router.get("/users", userController.listUser);
router.get("/user/:id", userController.getUserById);
router.put("/user/:id", userController.updateUser);

module.exports = router;
