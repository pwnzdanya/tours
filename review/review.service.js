const ApiError = require('../exceptions/api-error');
const Review = require('./review.model');
const User = require('../user/user.model');
const Tour = require('../tour/tour.model');
const sequelize = require('../db');
const TourService = require('../tour/tour.service');

class ReviewService {
  async create(review, tourId, userId) {
    console.log(tourId);
    if (!review || !tourId) {
      throw ApiError.BadRequest('please enter the valid data');
    }
    if (!userId) {
      throw ApiError.Unauthorized();
    }
    const newReview = {
      text: review.text,
      rating: review.rating,
      title: review.title,
      userId,
      TourId: tourId,
    };
    const createReview = await Review.create(newReview);

    const tourAvgRating = await this.getRating(tourId);

    await TourService.update({ avgRating: +tourAvgRating, id: tourId });

    return this.getOne(createReview.dataValues.id);
  }

  async getRating(tourId) {
    if (!tourId) {
      throw ApiError.BadRequest('tour does not exist');
    }
    const avg = await Review.findAll({
      where: { TourId: tourId },
      attributes: ['TourId', [sequelize.fn('AVG', sequelize.col('rating')), 'ratingAvg']],
      group: ['TourId'],
    });
    return avg[0].dataValues.ratingAvg;
  }

  async getOne(reviewId) {
    if (!reviewId) {
      throw ApiError.BadRequest('review does not exist');
    }
    return Review.findOne({
      where: {
        id: reviewId,
      },
      include: [
        { model: User, attributes: ['name', 'photo', 'id'] },
        { model: Tour, attributes: ['name', 'id'] },
      ],
    });
  }

  async getAll(tourId, query) {
    if (!query) {
      throw ApiError.BadRequest(`can't find query`);
    }
    if (!tourId) {
      throw ApiError.BadRequest(`tour does not exist`);
    }
    let { order, page, limit } = query;
    order = order || 'DESC';
    page = page || 1;
    limit = limit || 9;
    const offset = page * limit - limit;
    if (query.sort) {
      return Review.findAll({
        where: { TourId: tourId },
        order: [[query.sort, order.toUpperCase()]],
        limit,
        offset,
        attributes: { exclude: ['TourId', 'userId'] },
        include: [
          { model: User, attributes: ['name', 'photo', 'id'] },
          { model: Tour, attributes: ['name', 'id'] },
        ],
      });
    }
    return Review.findAll({
      where: { TourId: tourId },
      limit,
      offset,
      attributes: { exclude: ['TourId', 'userId'] },
    });
  }

  async delete(reviewId, tourId) {
    if (!reviewId) {
      throw ApiError.BadRequest('review does not exist');
    }

    await Review.destroy({
      where: {
        id: reviewId,
      },
    });

    const tourAvgRating = await this.getRating(tourId);
    await TourService.update({ avgRating: +tourAvgRating, id: tourId });
  }
}

module.exports = new ReviewService();
