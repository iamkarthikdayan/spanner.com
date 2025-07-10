const Review = require('../models/Review');

 const userReview = async (req, res) => {
  try {
    const review = new Review({
      user_id: req.user.userId,
      provider_id: req.body.provider_id,
      rating: req.body.rating,
      comment: req.body.comment
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add review' });
  }
};
const getReviewsUser = async (req, res) => {
  try {
    const reviews = await Review.find({ user_id: req.user.userId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get user reviews' });
  }
}
const getReviewsProvider = async (req, res) => {
  try {
    const reviews = await Review.find({ provider_id: req.params.providerId });
    if (!reviews) return res.status(404).json({ error: 'No reviews found for this provider' });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get provider reviews' });
  }
};
const ProviderReview = async (req, res) => {
  try {
    const reviews = await Review.find({ provider_id: req.params.providerId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get reviews' });
  }
};

module.exports = {
  userReview,
  getReviewsUser,
  getReviewsProvider,
  ProviderReview
};