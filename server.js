const morgan = require("morgan")
const cors = require("cors")
const bp = require("body-parser")
const express = require("express")

const user = require("./api/userRouter.js")

let app = express()
app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({
    extended: true
}))
app.use(morgan("dev"))
app.use("/user", user)
app.listen(3000, () => {
    console.log('listen')
})
