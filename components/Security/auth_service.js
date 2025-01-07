import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User'; // Asegúrate de que esta ruta sea correcta
import { config } from 'dotenv';

config(); // Cargar las variables de entorno

const secret = process.env.JWT_SECRET || 'default_secret_key';

/**
 * Verifica si un usuario ya existe en la base de datos.
 * 
 * @param {string} email - Correo del usuario.
 * @returns {Promise<boolean>} - Retorna `true` si el usuario existe, `false` si no.
 */
const userExists = async (email) => {
  const existingUser = await User.findOne({ where: { email } });
  return !!existingUser; // Retorna `true` si el usuario existe
};

/**
 * Encripta una contraseña usando bcrypt.
 * 
 * @param {string} password - Contraseña en texto plano.
 * @returns {Promise<string>} - Contraseña encriptada.
 */
const encryptPassword = (password) => {
  return bcrypt.hash(password, 10);
};

/**
 * Verifica si la contraseña proporcionada coincide con la almacenada.
 * 
 * @param {string} inputPassword - Contraseña ingresada por el usuario.
 * @param {string} storedPassword - Contraseña encriptada en la base de datos.
 * @returns {Promise<boolean>} - `true` si las contraseñas coinciden.
 */
const verifyPassword = (inputPassword, storedPassword) => {
  return bcrypt.compare(inputPassword, storedPassword);
};

/**
 * Crea un nuevo usuario en la base de datos.
 * 
 * @param {string} email - Correo electrónico.
 * @param {string} hashedPassword - Contraseña encriptada.
 * @returns {Promise<object>} - El objeto del usuario creado.
 */
const createUser = (email, hashedPassword) => {
  return User.create({
    email,
    password: hashedPassword,
  });
};

/**
 * Genera un token JWT.
 * 
 * @param {object} user - Objeto del usuario (ID y correo).
 * @returns {string} - Token JWT generado.
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.usr_id,
      email: user.email,
    },
    secret,
    { expiresIn: '1h' } // Expira en 1 hora
  );
};

/**
 * Verifica un token JWT.
 * 
 * @param {string} token - Token JWT.
 * @returns {object} - Información decodificada del token.
 * @throws {Error} - Si el token es inválido o expiró.
 */
const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

export default {
  userExists,
  encryptPassword,
  verifyPassword,
  createUser,
  generateToken,
  verifyToken,
};
