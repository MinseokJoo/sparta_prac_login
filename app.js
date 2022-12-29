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

app.get("/login", (req,res) =>{
  const id = req.query.id
  const password = req.query.password

  try {
    const user = users.find(user => user.id === id)
    
    if (!user) {
      return res.status(401).json({message: "아이디를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요."})
    }

    if (password !== user.password) {
      return res.status(401).json({message: "비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 한번 확인해주세요."})
    }
    res.cookie("user_id", user.id)
    console.log(req.cookies.user_id)
    res.send("로그인")
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

app.get("/logout", (req,res) => {
  res.clearCookie("user_id")
  console.log(req.cookies.user_id)
  res.send("로그아웃")
})

app.get("/register", (req,res) => {
  const id = req.query.id
  const password = req.query.password
  const name = req.query.name

  try {
    const user = users.find(user => user.id === id)
    if (user) {
      return res.status(401).json({message: "이미 존재하는 아이디 입니다."})
    }
    users.push({name, id, password})
    console.log(users)
    res.status(201).send("회원가입")
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

app.get("/userInfos", (req,res) => {
  const yesLogin = req.cookies.user_id

  try {
    if (!yesLogin) {
      return res.json({message: "로그인 이후 사용 가능한 기능입니다."})
    }
    const userInfo = users.find(user => user.id === yesLogin)
    res.send(userInfo)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
})

app.listen(3000, () => console.log(3000,"번 포트로 서버 열림"))