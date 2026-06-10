import ContactMessage from '../models/ContactMessage.js';

export const createContactMessage = async (req, res) => {
  try {
    const message = await ContactMessage.create(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getContactMessages = async (req, res) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(messages);
};

export const deleteContactMessage = async (req, res) => {
  const message = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!message) {
    return res.status(404).json({ message: 'Contact message not found' });
  }
  res.json({ message: 'Contact message deleted successfully' });
};