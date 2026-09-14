import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({ name: String, email: { type: String, unique: true }, password: String }, { timestamps: true });
const resumeSchema = new mongoose.Schema({ userId: mongoose.Schema.Types.ObjectId, originalName: String, mimeType: String, text: String, analysis: Object }, { timestamps: true });

export const User = mongoose.model('User', userSchema);
export const Resume = mongoose.model('Resume', resumeSchema);

const users = new Map();
const resumes = new Map();
export const memory = { users, resumes };

export function useMongo() {
  const uri = (process.env.MONGO_URI || '').trim();
  return Boolean(uri) && mongoose.connection.readyState === 1;
}

export async function connectDb() {
  const uri = (process.env.MONGO_URI || '').trim();
  if (!uri) {
    console.log('MongoDB URI not configured; using memory store');
    return false;
  }

  try {
    mongoose.set('bufferCommands', false);
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    console.log('MongoDB connected');
    return true;
  } catch (error) {
    console.warn('Mongo unavailable, using memory store:', error.message);
    process.env.MONGO_URI = '';
    return false;
  }
}
