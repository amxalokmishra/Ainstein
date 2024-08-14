import { Request, Response } from 'express';
import Course from '../models/Course';
import Lesson from '../models/Lesson';

export const createCourse = async (req: Request, res: Response) => {
  try {
    const newCourse = await Course.create(req.body);
    res.status(201).json({ message: 'Course created', course: newCourse });
  } catch (error) {
    res.status(500).json({ message: 'Error creating course', error });
  }
};

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.findAll({ include: [{ model: Lesson, as: 'lessons' }] });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses', error });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const course = await Course.findByPk(id, { include: [{ model: Lesson, as: 'lessons' }] });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course', error });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [updated] = await Course.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'Course not found' });
    const updatedCourse = await Course.findByPk(id);
    res.status(200).json({ message: 'Course updated', course: updatedCourse });
  } catch (error) {
    res.status(500).json({ message: 'Error updating course', error });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await Course.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error });
  }
};
