const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await UserModel.create({ username, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);
  console.log(user);
  console.log(id);
  if (!id || !user) return res.status(400).json("User id not found");
  try {
    const user = await UserModel.findByIdAndDelete(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  res.send(`Name ${id} ${username}, desc ${password}`);
});
module.exports = router;
