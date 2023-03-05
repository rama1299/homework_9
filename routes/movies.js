const express = require('express');
const router = express.Router();
const pool = require ("../config.js");
const {authoriz} = require("../middlewares/auth.js");
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

router.get("/movies", (req, res, next) => {
    console.log(req.query);
    const {limit, page} = req.query;

    let resultLimit = +limit? parseInt(limit) : DEFAULT_LIMIT;
    let resultPage = +page? parseInt(page) : DEFAULT_PAGE;

    console.log(resultLimit, resultPage);
    const findQuery = 
        `SELECT *
        FROM movies
        LIMIT ${resultLimit} OFFSET ${(resultPage - 1)*resultLimit}`

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

router.post("/movies", authoriz, (req, res, next) =>{
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

router.put("/movies/:id", (req, res, next) =>{
    const {id} = req.params;
    const {title, genres, year} = req.body;

    const updateMovie =
    `UPDATE movies
    SET title = $1, genres = $2, year = $3,
    WHERE movies.id = $4`

    pool.query(updateMovie, [title, genres, year, id], (err, result) => {
        if (err) next(err);

        res.status(201).json({message: "Movie updated"});
    })
})

router.delete("/movies/:id", (req, res, next) =>{

    const {id} = req.params;

    const deleteMovie = `
    DELETE FROM movies
    WHERE id = $1`

    pool.query(deleteMovie, [id], (err, result) => {
        if (err) next(err);
    
        res.status(201).json({message: "Movie deleted"});
    })
})


module.exports = router;