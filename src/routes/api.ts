import express from "express";
import movieCtrl from '../controllers/moviecontroller';
const router = express.Router();


router.get('/api/v1/movies', (req, res) => {
    res.send('All Movies');
});

router.post('/api/v1/movies', (req, res) => {
    res.send('Create Movie!');
});

router.get('/api/v1/movies/:movieid', (req, res) => {
    res.send('Get Movie!');
});

router.put('/api/v1/movies/:movieid', (req, res) => {
    res.send('Update Movie!');
});

router.delete('/api/v1/movies/:movieid', (req, res) => {
    res.send('Delete Movie!');
});

export default router;