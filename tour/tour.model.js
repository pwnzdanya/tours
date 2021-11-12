const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Tour = sequelize.define('Tour', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
  },
  duration: {
    type: DataTypes.INTEGER,
    nullable: false,
  },
  groupSize: {
    type: DataTypes.INTEGER,
    nullable: false,
  },
  difficulty: {
    type: DataTypes.STRING,
    nullable: false,
  },
  price: {
    type: DataTypes.INTEGER,
    nullable: false,
  },
  priceDiscount: {
    type: DataTypes.INTEGER,
  },
  summary: {
    type: DataTypes.STRING,
    nullable: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  imageCover: {
    type: DataTypes.STRING,
    nullable: false,
  },
  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  startDates: {
    type: DataTypes.ARRAY(DataTypes.DATE),
  },
});

module.exports = Tour;
