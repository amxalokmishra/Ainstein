import { Request, Response } from 'express';
import Lesson from '../models/Lesson';

export const createLesson = async (req: Request, res: Response) => {
  try {
    const newLesson = await Lesson.create(req.body);
    res.status(201).json({ message: 'Lesson created', lesson: newLesson });
  } catch (error) {
    res.status(500).json({ message: 'Error creating lesson', error });
  }
};

export const getLessons = async (req: Request, res: Response) => {
  try {
    const lessons = await Lesson.findAll();
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lessons', error });
  }
};

export const getLessonById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const lesson = await Lesson.findByPk(id);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lesson', error });
  }
};

export const updateLesson = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [updated] = await Lesson.update(req.body, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'Lesson not found' });
    const updatedLesson = await Lesson.findByPk(id);
    res.status(200).json({ message: 'Lesson updated', lesson: updatedLesson });
  } catch (error) {
    res.status(500).json({ message: 'Error updating lesson', error });
  }
};

export const deleteLesson = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await Lesson.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'Lesson not found' });
    res.status(200).json({ message: 'Lesson deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lesson', error });
  }
};
