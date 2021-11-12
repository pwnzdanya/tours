const TourService = require('./tour.service');

class TourController {
  async getAll(req, res, next) {
    const { query } = req;
    try {
      const tours = await TourService.getAll(query);
      res.status(200).json({
        data: tours,
        results: tours.length,
      });
    } catch (e) {
      next(e);
    }
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    try {
      const tour = await TourService.getOne(id);
      res.status(200).json({
        data: tour,
      });
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const newTour = await TourService.create(req.body);
      res.status(201).json({
        data: newTour,
      });
    } catch (e) {
      next(e);
    }
  }

  async patch(req, res, next) {
    try {
      const updatedTour = await TourService.update(req.body);
      res.status(200).json({
        data: updatedTour,
      });
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      await TourService.delete(id);
      res.send(200);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new TourController();
