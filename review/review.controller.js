const ReviewService = require('./review.service');

class ReviewController {
  async create(req, res, next) {
    const { tourId } = req.params;
    const { id } = req.user;

    try {
      const review = await ReviewService.create(req.body, tourId, id);
      res.status(201).json({
        data: review,
      });
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    const { reviewId } = req.params;
    try {
      const review = await ReviewService.getOne(reviewId);
      res.status(200).json({
        data: review,
      });
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    const { tourId } = req.params;
    try {
      const reviews = await ReviewService.getAll(tourId, req.query);
      res.status(200).json({
        data: reviews,
        results: reviews.length,
      });
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    const { reviewId, tourId } = req.params;
    try {
      await ReviewService.delete(reviewId, tourId);
      res.send(200);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ReviewController();
