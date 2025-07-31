const { sequelize, User, Note } = require('./db');
const bcrypt = require('bcryptjs');

// PUBLIC_INTERFACE
/**
 * Initialize the database: sync all models and optionally seed example data.
 * Run: node src/db-init.js
 */
async function initializeDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database & tables created!');

    // Seed an example user
    const adminPassword = 'admin123';
    const hash = await bcrypt.hash(adminPassword, 10);
    const user = await User.create({
      username: 'admin',
      password_hash: hash,
    });

    // Create a sample note for the user
    await Note.create({
      title: 'Welcome Note',
      content: 'This is your first note. You can create, view, edit, and delete notes.',
      userId: user.id,
    });
    console.log('Seeded user "admin" and a sample note. Login password: admin123');
    process.exit(0);
  } catch (err) {
    console.error('Error during DB initialization:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  initializeDatabase();
}
