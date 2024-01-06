import express from 'express';
import * as reviewController from '../controllers/reviewControllers'

const router = express.Router();

router.post('/', reviewController.createReview);
router.get('/', reviewController.getReviews);
router.put('/:id',reviewController.updateReview);
router.delete('/:id',reviewController.deleteReview);
router.get('/search',reviewController.searchReviews);

export default router;