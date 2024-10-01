const Track = require('../models/track');
const express = require('express');
const router = express.Router();



// Write your routes/controller functions here


// Index route to get all tracks
router.get('/', async (req, res) => {
    try {
        const allTracks = await Track.find({});
        res.status(200).json(allTracks);
    } catch (error) {
        console.error(error);
        res.status(500).json({Message : 'Server Error'});
    }
});



router.get('/:trackId', async (req, res) => {
    try {
        const foundId = await Track.findById(req.params.trackId);
        if(!foundId){
            res.status(404).json({Message : 'Track not found???'});
        }  else {
            res.status(200).json(foundId);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({Message : 'Server Error'});
    }
});


// Put route to update a track
router.put('/:trackId', async (req, res) => {
    try {
        const updateTrack = await Track.findByIdAndUpdate(req.params.trackId, req.body, {new : true});
        if(updateTrack){
            res.status(200).json(updateTrack);
        } else {
            res.status(404).json({Message : 'Track not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({Message : 'Server Error'});
    }
});





// Delete route to delete a track
router.delete('/:trackId', async (req, res) => {
    try {
        const deleteTrack = await Track.findByIdAndDelete(req.params.trackId);
        if(deleteTrack){
            res.status(200).json(deleteTrack);
        } else {
            res.status(404).json({Message : 'Track not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({Message : 'Server Error'});
    }
});


// Post route to create a new track
router.post('/', async (req, res) => {
    try {
        const createTrack = await Track.create(req.body);
        res.status(201).json(createTrack);
    } catch (error) {
        console.error(error);
        res.status(500).json({Message : 'Validation Error'});
    }
});





// Export the router at the bottom of the file
module.exports = router;