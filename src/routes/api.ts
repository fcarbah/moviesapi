import express from "express";
import movieCtrl from '../controllers/moviecontroller';
import { sanitize, header, validationResult, checkSchema } from 'express-validator';
import AppResponse from "../classes/appresonse";
import { isAuthenticated } from "../controllers/authcontroller";

const router = express.Router();

router.use('', 
    [header('Content-Type').isIn(['application/json','application/x-www-form-urlencoded'])],
    function(req, res, next){

        if(['GET','DELETE'].indexOf(req.method) >=0){
            return next();
        }

        let result = validationResult(req);

        if(!result.isEmpty()){
            res.statusCode = 400;
            return res.json(
                AppResponse.error('Invalid Content Type. Supported types: "application/json" and "application/x-www-form-urlencoded"', 53)
            );
        }
        next();
})

router.get('/api/v1/movies',
    [
        isAuthenticated,
        sanitize(['page','limit','sort','order']).trim().escape(),
        sanitize(['page','limit']).toInt(),
    ],

    async (req, res) => {
        let resp = await movieCtrl.index(req.query);
        res.json(resp);
});

router.post('/api/v1/movies', [
        isAuthenticated,
        sanitize(['title','length','release_year','format','rating']).trim().escape(),
    ],
    async (req, res) => {
        let resp = await movieCtrl.create(req.body);
        res.json(resp);
});

router.get('/api/v1/movies/:movieid', 
    [
        isAuthenticated,
        sanitize('movieid').toInt()
    ], 
    async (req, res) => {
        let resp = await movieCtrl.get(req.params.movieid);
        res.json(resp);
});

router.patch('/api/v1/movies/:movieid',
    [
        isAuthenticated,
        sanitize('movieid').toInt()
    ],
    async (req, res) => {
        let resp = await movieCtrl.update(req.params.movieid,req.body);
        res.json(resp);
});

router.delete('/api/v1/movies/:movieid',
    [
        isAuthenticated,
        sanitize('movieid').toInt()
    ],
    async (req, res) => {
        let resp = await movieCtrl.delete(req.params.movieid);
        res.json(resp);
});

router.use(function (req, res, next) {
    res.statusCode = 404;
    return res.json(AppResponse.error('Route Not Found',404));
});

router.use(function (err, req, res, next) {
    console.log(err);
    res.statusCode = 500;
    return res.json(AppResponse.error(err,500));
});

export default router;