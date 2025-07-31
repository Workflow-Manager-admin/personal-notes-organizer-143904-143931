const notesService = require('../services/notes');

// PUBLIC_INTERFACE
/**
 * Notes Controller for notes CRUD operations.
 */
class NotesController {
  /**
   * Create a new note for authenticated user.
   * req.body: { title, content }
   */
  async createNote(req, res) {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ status: 'fail', message: 'Title and content required' });
      }
      const note = await notesService.createNote(req.user.userId, title, content);
      return res.status(201).json({ status: 'ok', note });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }

  /**
   * Get all notes for authenticated user.
   */
  async getAllNotes(req, res) {
    try {
      const notes = await notesService.getAllNotes(req.user.userId);
      return res.status(200).json({ status: 'ok', notes });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }

  /**
   * Get a specific note by ID (must belong to user).
   */
  async getNoteById(req, res) {
    try {
      const { id } = req.params;
      const note = await notesService.getNoteById(req.user.userId, id);
      if (!note) {
        return res.status(404).json({ status: 'fail', message: 'Note not found' });
      }
      return res.status(200).json({ status: 'ok', note });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }

  /**
   * Update a note by ID (must belong to user).
   * req.body: { title?, content? }
   */
  async updateNote(req, res) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      if (!title && !content) {
        return res.status(400).json({ status: 'fail', message: 'Nothing to update' });
      }
      const updated = await notesService.updateNote(req.user.userId, id, { title, content });
      if (!updated) {
        return res.status(404).json({ status: 'fail', message: 'Note not found or not owned by user' });
      }
      return res.status(200).json({ status: 'ok', note: updated });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }

  /**
   * Delete a note by ID (must belong to user).
   */
  async deleteNote(req, res) {
    try {
      const { id } = req.params;
      const deleted = await notesService.deleteNote(req.user.userId, id);
      if (!deleted) {
        return res.status(404).json({ status: 'fail', message: 'Note not found or not owned by user' });
      }
      return res.status(200).json({ status: 'ok', message: 'Note deleted' });
    } catch (error) {
      return res.status(500).json({ status: 'error', message: error.message });
    }
  }
}

module.exports = new NotesController();
