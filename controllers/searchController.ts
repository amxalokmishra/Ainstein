import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Course from '../models/Course';
import Lesson from '../models/Lesson';

export const searchContent = async (req: Request, res: Response) => {
  const { keyword } = req.query;
  try {
    const courses = await Course.findAll({
      where: {
        title: { [Op.like]: `%${keyword}%` },
      },
    });

    const lessons = await Lesson.findAll({
      where: {
        title: { [Op.like]: `%${keyword}%` },
      },
    });

    res.status(200).json({ courses, lessons });
  } catch (error) {
    res.status(500).json({ message: 'Error searching content', error });
  }
};
