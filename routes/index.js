const express = require('express');
const router = express.Router();
const moviesRouter = require("./movies.js");
const pool = require("../config");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const secretKey = "RAHASIALAH";

router.post("/login", (req, res, next) => {
    const {email, password} = req.body;

    const findUser = 
    `SELECT *
    FROM users
    WHERE email = $1`

    pool.query(findUser, [email], (err, result) => {
        if(err) next(err);

        if (result.rows.length === 0) {
            next({name: "ErrorNotFound"})
        }else{
            const data = result.rows[0]
            const comparePassword = bcrypt.compareSync(password, data.password);

            console.log(comparePassword);

            if(comparePassword){
                const token = jwt.sign({
                    email: data.email,
                    role: data.role
                }, secretKey, {expiresIn: "1h"})
                console.log(token)

                res.status(200).json({
                    email: data.email,
                    role: data.role,
                    message: "Login successfully",
                    token: token
                })
            }else{
                next({name: "ErrorWrongPassword"})
            }
        }
    })
})

router.post("/register", (req, res, next) => {
    const {email, gender, password, role} = req.body;

    const hash = bcrypt.hashSync(password, 10);
    console.log(hash);

    const insertUser = 
    `INSERT INTO users (email, gender, password, role)
    VALUES ($1, $2, $3, $4);`

    pool.query(insertUser, [email, gender, hash, role], (err, result) => {

        if(err) next(err);

        res.status(201).json({
            message: "User register successfully"
        })
    })
})

router.use("/", moviesRouter);

module.exports = router;