import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Lesson from './Lesson';

class Course extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
}

Course.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Course',
});

// Define associations after importing Lesson
Course.hasMany(Lesson, {
  foreignKey: 'courseId',
  as: 'lessons',
});

export default Course;
