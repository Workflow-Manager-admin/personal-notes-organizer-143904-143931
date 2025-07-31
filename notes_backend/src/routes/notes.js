const express = require('express');
const notesController = require('../controllers/notes');
const authenticateJWT = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Notes management endpoints (require authentication)
 */

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Get all notes for current user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of notes
 */
router.get('/', authenticateJWT, notesController.getAllNotes.bind(notesController));

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note for current user
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created
 */
router.post('/', authenticateJWT, notesController.createNote.bind(notesController));

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Get a single note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Note ID
 *     responses:
 *       200:
 *         description: Note found
 *       404:
 *         description: Note not found
 */
router.get('/:id', authenticateJWT, notesController.getNoteById.bind(notesController));

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Update a note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated
 *       404:
 *         description: Note not found
 */
router.put('/:id', authenticateJWT, notesController.updateNote.bind(notesController));

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete a note by ID
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Note ID
 *     responses:
 *       200:
 *         description: Note deleted
 *       404:
 *         description: Note not found
 */
router.delete('/:id', authenticateJWT, notesController.deleteNote.bind(notesController));

module.exports = router;
