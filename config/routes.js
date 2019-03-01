const axios = require("axios");
const db = require("../database/dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticate } = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

async function register(req, res) {
  // implement user registration
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 14);
  user.password = hash;

  await db("users").insert(user);
  res.status(201).json({ message: "registered", user });
}

const createToken = user => {
  payload = {
    username: user.username
  };

  secret = process.env.JWT_SECRET;

  options = {
    expiresIn: "10m"
  };

  return jwt.sign(payload, secret, options);
};

const login = async (req, res) => {
  // implement user login
  const { username, password } = req.body;
  try {
    const user = await db
      .select()
      .from("users")
      .where({ username: username })
      .first();

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = createToken(user);
      res.status(200).json({ message: "Got it", token });
    } else {
      res
        .status(401)
        .json({ message: "You sure you got the right login info?" });
    }
  } catch (error) {
    res.status(500).json({ message: "We ran into some problems" });
  }
};

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
