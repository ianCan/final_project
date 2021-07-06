const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Movie = require('../models/movies.js')

//Routes
router.get('/movies', (req, res) => {
    Movie.find({}, (error, allMovies) => {
        if (error) {
            res.send(error)
        } else {
            res.render('index.ejs', {
                movies: allMovies
            });
        };
    });
});
//
router.get('/movies/new', (req, res) => {
    res.render('new.ejs');
});

//Show
router.post('/movies/', (req, res) => {
    if (req.body.hasSeen === 'on') {
        req.body.hasSeen = true;
    } else {
        req.body.hasSeen = false;
    }
    Movie.create(req.body, (error, createdMovie) => {
        res.redirect('/movies');
    });
});
//Show
router.get('/movies/:id', (req, res) => {
    console.log(req.params.id)
    Movie.findById(req.params.id, (error, foundMovie) => {
        res.render('show.ejs', {
            movie: foundMovie
        });
    });
});

//Delete
router.delete('/movies/:id', (req, res) => {
    Movie.findByIdAndRemove(req.params.id, (error, deletedMovie) => {
        console.log(deletedMovie)
        res.redirect('/movies');
    });
});

//Edit show
router.get('/movies/:id/edit', (req, res) => {
    console.log(req.params.id)
    Movie.findById(req.params.id, (error, foundMovie) => {
        res.render('edit.ejs', {
            movie: foundMovie
        });
    });
});

//Edit
router.put('/movies/:id', (req, res) => {
    if (req.body.hasSeen === 'on') {
        req.body.hasSeen = true;
    } else {
        req.body.hasSeen = false;
    }
    console.log(req.body)
    Movie.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedModel) => {
        res.redirect('/movies');
    });
});

module.exports = router;