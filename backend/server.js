const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const app = express();
const { authenticateJWT } = require("./middleware/auth.js");
const { connectDB, getDB } = require("./config/db.js");

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

connectDB();
const users = [
  { id: "user_1", name: "user1", email: "user1@gmail.com", role: "admin" },
  { id: "user_1", name: "user2", email: "user2@gmail.com", role: "teacher" },
  { id: "user_3", name: "user3", email: "user3@gmail.com", role: "student" },
];

let JWT_SECRET = "secret_key"; //|| process.env.JWT_SECRET;
let Port = process.env.PORT || 8080;
app.post("/login", async (req, res) => {
  const { id, email } = req.body;
  try {
    const user = users.find((u) => u.id == id && u.email == email);
    if (!user) {
      return res.status(401).json({ msg: "Invalid credential" });
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "10h" });

    return res.status(200).json({ msg: "Login Succefully", token });
  } catch (err) {
    return `Login failed`;
  }
});

app.get("/users", authenticateJWT, async (req, res) => {
  try {
    const db = await getDB();
    const data = await db.collection("users").find().toArray();
    return res.status(200).json(data);
  } catch (err) {
    errObj = {
      kind: "TEST - Getting users",
      name: err.name,
      msg: err.message,
      solution: "Restart the server",
    };
    return res.status(500).json(errObj);
  }
});

app.listen(Port, () => {
  console.log(
    `Server started and running on Port: ${Port} -- ${process.env.JWT_SECRET}`,
  );
});
