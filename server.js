import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import jwt from "jsonwebtoken"
import http from "http"
import dotenv from "dotenv"
import bcrypt from "bcrypt"

dotenv.config()
const app = express()
const server = http.createServer(app)

const allowedOrigins = ["http://localhost:3000"]
var corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

const users = [
  {
    id: 1,
    email: "user@mail.com",
    username: "user",
    password: "$2b$10$DylF2YmxVWrC6ySrAmGPNObFD5cXm.Eu6XjMkuzlBMF3KsLj2bdoa",
  },
]

app.post("/api/login", (req, res) => {
  try {
    const { email, password } = req.body
    const user = users.find((item) => item.email === email)
    if (!user) {
      return res.status(400).json({ message: "Wrong email or password" })
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" })
      }

      if (result) {
        const token = jwt.sign({ ...user, password: undefined }, "shhhhh")
        return res.json({ jwt: token })
      } else {
        return res.status(400).json({ message: "Wrong email or password" })
      }
    })
  } catch (error) {
    res.status(500).json({ message: "Internal server error" })
  }
})

app.get("/api/me", (req, res, next) => {
  const auth = req.headers.authorization.slice(7)
  try {
    const payload = jwt.verify(auth, "shhhhh")
    const me = users.find((item) => (item.id = payload.id))
    return res.json({ ...me, password: undefined })
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" })
  }
})

server.listen(8080, "localhost", () => {
  console.log(`Listening on ${process.env.BE_API_URL}`)
})
