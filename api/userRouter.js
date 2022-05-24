const MongoClient = require("mongodb").MongoClient
const express = require('express')
const userRouter = express.Router();
const connect_string = "mongodb://localhost:27017"

// создаем объект MongoClient и передаем ему строку подключения
const mongoClient = new MongoClient(connect_string);
userRouter.use("/add", async function (req, res) {
    try {
        console.log('try')
        mongoClient.connect(function (err, client) {
            console.log("connect")
            if (err) {
                return res.send(err);
            }
            client.db("axbn").collection("users").insertOne({
                username: req.body.username
            }).then((document) => {
                console.log(document)
                res.send(document)
                client.close();
            }).catch(err => {
                console.log(err)
                res.send(err)
                client.close()
            })
        });
    } catch (err) {
        console.log(err)
    }
});

userRouter.use("/search", async function (req, res) {
    console.log("some")
    try {
        mongoClient.connect(function (err, client) {
            if (err) {
                return res.send(err);
            }
            console.log(req.body)
            client.db("axbn").collection("users").findOne({
                username: req.body.username
            }).then((document) => {
                console.log(document)
                res.send(document)
                client.close();
            })
        });
    } catch (err) {
        console.log(err)
    }
});

userRouter.use("/edit_username", async function (req, res) {
    try {
        mongoClient.connect(function (err, client) {
            if (err) {
                return res.send(err);
            }
            client.db("axbn").collection("users").findOneAndUpdate({
                username: req.body.username
            }, {
                $set: {
                    username: req.body.new_username
                }
            }, {
                returnNewDocument: true
            }).then((document) => {
                res.send(document)
                client.close()
            }).catch(err => {
                client.close()
                return res.send(err)
            })
        });
    } catch (err) {
        console.log(err)
    }
});

userRouter.use("/remove", async function (req, res) {
    try {
        mongoClient.connect(function (err, client) {
            if (err) {
                return res.send(err);
            }
            console.log(req.body.id)
            client.db("axbn").collection("users").deleteOne({
                    username: req.body.id
                }).then((document) => {
                console.log(document)
                    res.send(document)
                client.close()
            }).catch(err => {
                client.close()
                return res.send(err)
            })
        });
    } catch (err) {
        console.log(err)
    }
});

userRouter.use("/getuserlist", async function (req, res) {
    try {
        mongoClient.connect(async function (err, client) {
            if (err) {
                return res.send(err);
            }
            let cursor = await client.db("axbn").collection("users").find().toArray()
            console.log(cursor)
            return res.send(cursor)
        });
    } catch (err) {
        console.log(err)
    }
});


module.exports = userRouter;