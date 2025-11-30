import mongoose from 'mongoose'

const resumeSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: String,
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  experience: String,
  education: String,
  skills: String,
  linkedin: String,
  github: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Resume', resumeSchema)
