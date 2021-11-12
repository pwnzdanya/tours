const Tour = require('./tour.model');
const ApiError = require('../exceptions/api-error');

class TourService {
  async create(tour) {
    if (!tour) {
      throw ApiError.BadRequest('tour has not defined');
    }
    const newTour = {
      name: tour.name,
      duration: tour.duration,
      groupSize: tour.groupSize,
      difficulty: tour.difficulty,
      price: tour.price,
      priceDiscount: tour.priceDiscount,
      summary: tour.summary,
      description: tour.description,
      imageCover: tour.imageCover,
      images: tour.images,
      startDates: tour.startDates,
    };

    return Tour.create(newTour);
  }

  async getAll(query) {
    if (!query) {
      throw ApiError.BadRequest(`can't find query`);
    }
    let { order, page, limit } = query;
    order = order || 'DESC';
    page = page || 1;
    limit = limit || 9;
    const offset = page * limit - limit;
    if (query.sort) {
      return Tour.findAll({
        order: [[query.sort, order.toUpperCase()]],
        limit,
        offset,
      });
    }
    this.promise = Tour.findAll({ limit, offset });
    return this.promise;
  }

  async getOne(id) {
    if (!id) {
      throw ApiError.BadRequest('invalid id of tour');
    }
    if (id.length !== 36) {
      throw ApiError.BadRequest('invalid id of tour');
    }
    const tour = await Tour.findOne({
      where: { id },
    });
    if (!tour) {
      throw ApiError.BadRequest('tour does not exist');
    }
    return tour;
  }

  async update(tour) {
    const { id } = tour;
    if (!id || !tour) {
      throw ApiError.BadRequest('invalid id of tour');
    }
    await Tour.update({ ...tour }, { where: { id } });
    return this.getOne(id);
  }

  async delete(id) {
    if (!id) {
      throw ApiError.BadRequest('invalid id of tour');
    }
    if (id.length !== 36) {
      throw ApiError.BadRequest('invalid id of tour');
    }
    const isDeleted = await Tour.destroy({
      where: { id },
    });
    if (isDeleted === 0) {
      throw ApiError.BadRequest('tour does not exist');
    }
  }
}

module.exports = new TourService();
