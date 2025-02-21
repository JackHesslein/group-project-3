import { Router, Request, Response } from 'express';
import { User } from '../models/index.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    where: { username },
  });
  if (!user) {
    console.log('User not found');
    return res.status(401).json({ message: 'Username is invalid' });
  }
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!passwordIsValid) {
    console.error('Password is incorrect');
    return res.status(401).json({ message: 'Password is invalid!!' });
  }
  const secretKey = process.env.JWT_SECRET_KEY || '';
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  console.log('Token', token);
  return res.json({ token });
};
// POST /Users
export const createUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  try {
    const newUser = await User.create({ username, password, email });
    const secretKey = process.env.JWT_SECRET_KEY || '';
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    return res.status(201).json({
      newUser,
      token,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
const router = Router();
router.post('/login', login);
router.post('/createUser', createUser);
export default router;