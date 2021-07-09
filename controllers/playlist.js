const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Playlist = require('../models/playlist.js')

//Routes
router.get('/playlist', (req, res) => {
    Playlist.find({}, (error, allPlaylist) => {
        if (error) {
            res.send(error)
        } else {
            res.render('index.ejs', {
                playlist: allPlaylist
            });
        };
    });
});
//
router.get('/playlist/new', (req, res) => {
    res.render('new.ejs');
});

//Show
router.post('/playlist/', (req, res) => {
    if (req.body.hasSeen === 'on') {
        req.body.hasSeen = true;
    } else {
        req.body.hasSeen = false;
    }
    Playlist.create(req.body, (error, createdPlaylist) => {
        res.redirect('/playlist');
    });
});
//Show
router.get('/playlist/:id', (req, res) => {
    console.log(req.params.id)
    Playlist.findById(req.params.id, (error, foundPlaylist) => {
        res.render('show.ejs', {
            playlist: foundPlaylist
        });
    });
});

//Delete
router.delete('/playlist/:id', (req, res) => {
    Playlist.findByIdAndRemove(req.params.id, (error, deletedPlaylist) => {
        console.log(deletedPlaylist)
        res.redirect('/playlist');
    });
});

//Edit show
router.get('/playlist/:id/edit', (req, res) => {
    console.log(req.params.id)
    Playlist.findById(req.params.id, (error, foundPlaylist) => {
        res.render('edit.ejs', {
            Playlist: foundPlaylist
        });
    });
});

//Edit
router.put('/playlist/:id', (req, res) => {
    if (req.body.hasSeen === 'on') {
        req.body.hasSeen = true;
    } else {
        req.body.hasSeen = false;
    }
    console.log(req.body)
    Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedModel) => {
        res.redirect('/playlist');
    });
});

module.exports = router;