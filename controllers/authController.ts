import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import jwtConfig from '../config/jwtConfig';

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Authentication failed' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Authentication failed' });

    const token = jwt.sign({ userId: user.id }, jwtConfig.secret, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
