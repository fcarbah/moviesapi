import express from "express";
import movieCtrl from '../controllers/moviecontroller';
import config from 'config';
import { check, validationResult, sanitizeBody } from 'express-validator';
import { MovieInterface } from "../models/movie";

const movieConfig: any = config.get('movie');
const router = express.Router();


router.get('/api/v1/movies',async (req, res) => {
    let resp = await movieCtrl.index(req.query);
    res.send(resp).statusCode = resp.code;
});

router.post('/api/v1/movies', async (req, res) => {
    let resp = await movieCtrl.create(req.body)
    res.send(resp).statusCode = resp.code;
});

router.get('/api/v1/movies/:movieid', async (req, res) => {
    let resp = await movieCtrl.get(req.params.movieid);
    res.send(resp).statusCode = resp.code;
});

router.put('/api/v1/movies/:movieid', async (req, res) => {
    let resp = await movieCtrl.update(req.params.movieid,req.body);
    res.send(resp).statusCode = resp.code;
});

router.delete('/api/v1/movies/:movieid', async (req, res) => {
    let resp = await movieCtrl.delete(req.params.movieid);
    res.send(resp).statusCode = resp.code;
});

export default router;