const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Create a new review
reviewRouter.post('/createReview', reviewController.createReview);

// Get all reviews
reviewRouter.get('/getAllReviews', reviewController.getAllReviews);

// Get reviews for a specific provider
reviewRouter.get('/provider/:providerId', reviewController.getReviewsByProvider);

// Get reviews by a specific user
reviewRouter.get('/user/:userId', reviewController.getReviewsByUser);

// Update a review
reviewRouter.put('/:id', reviewController.updateReview);

// Delete a review
reviewRouter.delete('/:id', reviewController.deleteReview);

module.exports= reviewRouter;