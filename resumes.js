import { Router } from 'express';
import multer from 'multer';
import fs from 'fs/promises';
import { randomUUID } from 'crypto';
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import { auth } from '../middleware/auth.js';
import { Resume, memory, useMongo } from '../models/store.js';
import { analyzeResume } from '../services/analyzer.js';

const r = Router();
const upload = multer({ dest: 'uploads/', limits: { fileSize: 5 * 1024 * 1024 } });

const all = async (uid) => {
  if (useMongo()) return Resume.find({ userId: uid }).sort({ createdAt: -1 }).lean();
  return [...memory.resumes.values()].filter((x) => x.userId === uid).sort((a, b) => b.createdAt - a.createdAt);
};

r.post('/', auth, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Resume file required' });

    let text = '';
    if (req.file.mimetype === 'application/pdf') {
      text = (await pdf(await fs.readFile(req.file.path))).text;
    } else if (req.file.mimetype.includes('wordprocessingml')) {
      text = (await mammoth.extractRawText({ path: req.file.path })).value;
    } else {
      text = await fs.readFile(req.file.path, 'utf8');
    }

    const doc = {
      userId: req.user._id || req.user.id,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      text,
      analysis: null,
      createdAt: new Date()
    };

    const saved = useMongo() ? await Resume.create(doc) : { ...doc, id: randomUUID() };
    if (!useMongo()) memory.resumes.set(saved.id, saved);

    await fs.unlink(req.file.path).catch(() => {});
    res.status(201).json({ resume: { ...saved, text: undefined } });
  } catch (error) {
    res.status(400).json({ message: 'Could not process file: ' + error.message });
  }
});

r.get('/', auth, async (req, res) => res.json({ resumes: await all(req.user._id || req.user.id) }));

r.get('/:id', auth, async (req, res) => {
  const resume = useMongo()
    ? await Resume.findOne({ _id: req.params.id, userId: req.user._id }).lean()
    : memory.resumes.get(req.params.id);

  if (!resume || String(resume.userId) !== String(req.user._id || req.user.id)) return res.sendStatus(404);
  res.json({ resume: { ...resume, text: undefined } });
});

r.get('/:id/download', auth, async (req, res) => {
  const resume = useMongo()
    ? await Resume.findOne({ _id: req.params.id, userId: req.user._id }).lean()
    : memory.resumes.get(req.params.id);

  if (!resume || String(resume.userId) !== String(req.user._id || req.user.id)) return res.sendStatus(404);

  const analysis = resume.analysis || (await analyzeResume(resume.text));
  const report = `ResumeIQ analysis report\n\nScore: ${analysis.score}/100\n\n${analysis.summary}\n\nStrengths:\n${(analysis.strengths || []).map((item) => '- ' + item).join('\n')}\n\nImprovements:\n${(analysis.improvements || []).map((item) => '- ' + item).join('\n')}`;

  res.setHeader('Content-Disposition', `attachment; filename="${resume.originalName.replace(/\.[^.]+$/, '')}-report.txt"`);
  res.type('text/plain').send(report);
});

r.post('/:id/analyze', auth, async (req, res) => {
  const resume = useMongo()
    ? await Resume.findOne({ _id: req.params.id, userId: req.user._id })
    : memory.resumes.get(req.params.id);

  if (!resume) return res.sendStatus(404);

  resume.analysis = await analyzeResume(resume.text);
  if (useMongo()) await resume.save();

  res.json({ analysis: resume.analysis });
});

export default r;
