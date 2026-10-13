import { Router } from 'express'
import Contact from '../models/Contact.js'

const router = Router()
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

router.post('/', async (req, res, next) => {
  try {
    const { name, email, message } = req.body || {}
    if (![name, email, message].every(value => typeof value === 'string')) {
      return res.status(400).json({ message: 'Please provide your name, email, and message.' })
    }
    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()
    const cleanMessage = message.trim()
    if (cleanName.length < 2 || cleanName.length > 100) return res.status(400).json({ message: 'Name must be between 2 and 100 characters.' })
    if (!emailPattern.test(cleanEmail) || cleanEmail.length > 254) return res.status(400).json({ message: 'Please enter a valid email address.' })
    if (cleanMessage.length < 10 || cleanMessage.length > 5000) return res.status(400).json({ message: 'Message must be between 10 and 5000 characters.' })
    if (mongooseUnavailable()) return res.status(503).json({ message: 'The contact service is temporarily unavailable because the database is not connected.' })
    const contact = await Contact.create({ name: cleanName, email: cleanEmail, message: cleanMessage })
    return res.status(201).json({ message: 'Message received successfully.', id: contact._id })
  } catch (error) { next(error) }
})

function mongooseUnavailable() {
  return Contact.db.readyState !== 1
}

export default router
