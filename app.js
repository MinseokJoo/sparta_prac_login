const express = require("express")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json(), cookieParser())

const users = [
  {name: "우준호", id: "noggong", password: "1234"},
  {name: "이설인", id: "seolin", password: "asdf"},
  {name: "주민석", id: "minseok", password: "hello"},
  {name: "유희선", id: "heesun", password: "94kf"},
  {name: "한동주", id: "dongjoo", password: "vded"},
]

app.get("/login", (req, res) => {
  const id = req.query.id
  const password = req.query.password

  const user = users.find(user => user.id === id)
  
  if (!user) {
    return res.status(500).json({message: "존재하지 않는 아이디 입니다."})
  }

  if (user.password !== password) {
    return res.status(500).json({message: "잘못된 비밀번호 입니다."})
  }

  res.cookie("user_id", user.id)
  console.log(req.cookies.user_id)

  res.send("로그인")
})

app.get("/logout", (_,res) => {
  res.clearCookie("user_id")
  res.send("로그아웃")
})

app.get("/register", (req,res) => {
  const id = req.query.id
  const password = req.query.password
  const name = req.query.name

  const user = users.find(user => user.id === id)

  if (user) {
    return res.status(500).json({message: "이미 존재하는 아이디 입니다."})
  }

  users.push({name, id, password})
  console.log(users)

  res.send("회원가입")
})

app.get("/users", (req,res) => {
  const yesLogin = req.cookies.user_id

  if (!yesLogin) {
    return res.status(500).json({message: "로그인 후 가능한 기능입니다."})
  }
  
  const userInfo = users.find(user => user.id === yesLogin)
  
  // userInfo의 값이 없다면 회원정보를 잘못 넣었다는 return을 만들지 않은 이유는 쿠키를 만들려면 로그인을 해야한다는 조건하에 저 쿠키가 없다면
  // 로그인을 하지않았다! 로그인을 했더라면 userInfo에 값이 존재해야 한다고 판단을 해서 따로 if로 만들지 않았다!

  res.send(userInfo)
})

app.listen(3000, () => console.log(3000,"번 포트로 서버 열림"))