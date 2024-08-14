import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Course from './Course';

class Lesson extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public courseId!: number;
}

Lesson.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Course,
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Lesson',
});

// Define associations after importing Course
Lesson.belongsTo(Course, {
  foreignKey: 'courseId',
  as: 'course',
});

export default Lesson;
