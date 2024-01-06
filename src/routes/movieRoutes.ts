import express from "express";
import * as movieController from '../controllers/movieController'


const router=express.Router();

router.post('/',movieController.createMovie);
router.get('/',movieController.getMovies);
router.put('/:id',movieController.updateMovie);
router.delete('/:id',movieController.deleteMovie);
router.get('/search',movieController.searchMovies);


export default router;