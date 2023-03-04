const express = require('express');
const router = express.Router();
const pool = require ("../config.js");

router.get("/movies", (req, res, next) => {
    const findQuery = 
        `SELECT *
        FROM movies`
    pool.query(findQuery, (err, result) => {
        if (err) throw(err);
        res.status(200).json(result.rows);
    });
});

router.get("/movies/:id", (req, res, next) => {
    const {id} = req.params;
    const findOneQuery =
        `SELECT *
        FROM movies
        WHERE movies.id = $1`

    pool.query(findOneQuery, [id], (err, result) => {
        if (err) next(err);
        if (result.rows.length === 0) {
            next({name:"ErrorNotFound"})
        }else{

        res.status(200).json(result.rows[0]);
        }
    })
})

router.post("/movies",(req, res, next) =>{
    console.log(req.body);

    const createMovie =
    `INSERT INTO movies (title, genres, year)
    VALUES ($1, $2, $3)
    RETURNING *;`

    pool.query(createMovie, [req.body.title, req.body.genres, req.body.year], (err, result) => {
        if (err) next(err);
        res.status(201).json({message: "Movie created"});
    });
})

module.exports = router;