const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Initialize Sequelize with SQLite for local development
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'notes.sqlite'),
  logging: false,
});

// Define User model
const User = sequelize.define('User', {
  // PUBLIC_INTERFACE
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: 'Unique username for login',
  },
  // PUBLIC_INTERFACE
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Bcrypt hash of user password',
  }
}, {
  tableName: 'users',
  timestamps: true,
});

// Define Note model
const Note = sequelize.define('Note', {
  // PUBLIC_INTERFACE
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Note title',
  },
  // PUBLIC_INTERFACE
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: 'Main content of the note',
  }
}, {
  tableName: 'notes',
  timestamps: true,
});

// Association: User has many Notes, Note belongs to User
User.hasMany(Note, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  },
  as: 'notes',
  onDelete: 'CASCADE',
});
Note.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  },
  as: 'user'
});

// Export models and sequelize instance
module.exports = {
  sequelize,
  User,
  Note
};
