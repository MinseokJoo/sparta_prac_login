const express = require("express")
const cookieParser = require("cookie-parser")

const app = express()
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Hello World~~!")
})

app.get("/users", (req,res) => {
  console.log(req.cookies.test1)
  console.log(req.cookies.test2)
  res.send("회원정보 페이지")
})

app.post("/login", (req,res) => {
  res.send("로그인 페이지")
})

app.post("/logout", (req,res) => {
  res.send("로그아웃 페이지")
})

app.post("/register", (req,res) => {
  res.send("register 페이지")
})


app.listen(3000, () => {
  console.log(3000,"번 서버 열림")
})