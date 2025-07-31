const { Note } = require('../db');

// PUBLIC_INTERFACE
/**
 * NotesService contains the CRUD logic for notes.
 */
class NotesService {
  // Create a note for user
  async createNote(userId, title, content) {
    return await Note.create({ userId, title, content });
  }

  // Get all notes for user
  async getAllNotes(userId) {
    return await Note.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });
  }

  // Get a note by id (only if owned by user)
  async getNoteById(userId, noteId) {
    return await Note.findOne({
      where: { id: noteId, userId }
    });
  }

  // Update a note by id (owned by user)
  async updateNote(userId, noteId, { title, content }) {
    const note = await Note.findOne({ where: { id: noteId, userId } });
    if (!note) return null;
    if (title) note.title = title;
    if (content) note.content = content;
    await note.save();
    return note;
  }

  // Delete a note by id (owned by user)
  async deleteNote(userId, noteId) {
    const deleted = await Note.destroy({ where: { id: noteId, userId } });
    return deleted > 0;
  }
}

module.exports = new NotesService();
