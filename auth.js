import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { User, memory, useMongo } from '../models/store.js';
import { sign, auth } from '../middleware/auth.js';

const r = Router();

const getByEmail = async (email) => (useMongo() ? User.findOne({ email }) : memory.users.get(email));

r.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 6) {
      return res.status(400).json({ message: 'Name, email and 6+ character password required' });
    }

    if (await getByEmail(email)) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = useMongo() ? await User.create({ name, email, password: hashed }) : { id: randomUUID(), name, email, password: hashed };

    if (!useMongo()) memory.users.set(email, user);
    res.status(201).json({ token: sign(user), user: { name, email } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

r.post('/login', async (req, res) => {
  const user = await getByEmail(req.body.email);
  if (!user || !(await bcrypt.compare(req.body.password || '', user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({ token: sign(user), user: { name: user.name, email: user.email } });
});

const profile = (req, res) => res.json({ user: { name: req.user.name, email: req.user.email } });
r.get('/me', auth, profile);
r.get('/profile', auth, profile);

export default r;
