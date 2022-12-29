const express = require("express")
const cookieParser = require("cookie-parser")

const app = express()
app.use(cookieParser())

const users = [
  {name: "우준호", id: "noggong", password: "1234"},
  {name: "이설인", id: "seolin", password: "asdf"},
  {name: "주민석", id: "minseok", password: "hello"},
  {name: "유희선", id: "heesun", password: "94kf"},
  {name: "한동주", id: "dongjoo", password: "vded"},
]

app.get("/", (req, res) => {
  res.send("Hello World~~!")
})

//유저 정보
app.get("/users", (req,res) => {
  const YseLogin = req.cookies.user_id

  if (!YseLogin) {
    return res.status(500).json({message: "로그인 후 가능한 기능입니다."})
  }
  
  const user = users.find(user => user.id === YseLogin)

  res.send(user)
})

// 로그인
app.get("/login", (req,res) => {
  const id = req.query.id
  const password = req.query.password

  const user = users.find(user => user.id === id)
  console.log(user)

  if (!user) {
    return res.status(500).json({message: "존재하지 않는 아이디입니다."})
  }
  
  if (user.password !== password) {
    return res.status(500).json({message: "잘못된 비밀번호 입니다."})
  }

  res.cookie("user_id", user.id)
  console.log(req.cookies.user_id)

  res.send("로그인")
})

//로그아웃
app.get("/logout", (req,res) => {
  res.clearCookie("user_id")
  res.send("로그아웃")
})

//회원가입
app.get("/register", (req,res) => {
  const id = req.query.id
  const password = req.query.password
  const name = req.query.name

  const user = users.find(user => user.id === id)

  if (user) {
    return res.status(500).json({message: "이미 존재한 아이디 입니다."})
  }

  users.push({name, id, password})

  console.log(users)

  res.send("회원가입")
})


app.listen(3000, () => {
  console.log(3000,"번 서버 열림")
})