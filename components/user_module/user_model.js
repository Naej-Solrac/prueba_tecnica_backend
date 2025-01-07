import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../../database';

const User = sequelize.define('User', {
  usr_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Valida que el correo tenga un formato válido
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  edit: {
    type: DataTypes.TINYINT, // Definimos como TINYINT (para valores 0 o 1)
    allowNull: false,        // No puede ser nulo
    defaultValue: 0,         // Valor predeterminado: 0
  },
}, {
  tableName: 'usuario',
  timestamps: true,
  createdAt: false, // No necesitamos `createdAt` en este caso
  updatedAt: false, // No necesitamos `updatedAt` en este caso
});

export default User;
