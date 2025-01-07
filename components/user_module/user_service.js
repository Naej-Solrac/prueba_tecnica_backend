import User from './user_model'; // Importa el modelo del usuario
import bcrypt from 'bcrypt'; // Para encriptar contraseñas
import jwt from 'jsonwebtoken'; 
/**
 * Verifica si un usuario ya existe en la base de datos.
 * 
 * @param {string} email - El correo electrónico del usuario.
 * @returns {Promise<boolean>} - Retorna `true` si el usuario existe, `false` en caso contrario.
 */
const userExists = async (email) => {
    const existingUser = await User.findOne({ where: { email } });
    return !!existingUser; // Convierte el resultado en un valor booleano
};

/**
 * Encripta una contraseña.
 * 
 * @param {string} password - La contraseña en texto plano.
 * @returns {Promise<string>} - La contraseña encriptada.
 */
const encryptPassword = (password) => {
    return bcrypt.hash(password, 10); // Retorna la contraseña encriptada
};

/**
 * Crea un nuevo usuario en la base de datos.
 * 
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} hashedPassword - La contraseña encriptada.
 * @returns {Promise<object>} - El objeto del usuario creado.
 */
const createUser = (email, hashedPassword) => {
    return User.create({
        email,
        password: hashedPassword,
    });
};


/**
 * Verifica si la contraseña proporcionada coincide con la almacenada.
 * @param {string} inputPassword - Contraseña proporcionada por el usuario.
 * @param {string} storedPassword - Contraseña encriptada en la base de datos.
 * @returns {Promise<boolean>} - Retorna true si las contraseñas coinciden.
 */
const verifyPassword = (inputPassword, storedPassword) => {
    return bcrypt.compare(inputPassword, storedPassword);
  };



  /**
 * Genera un JWT para el usuario.
 * @param {object} user - Información del usuario.
 * @returns {string} - Token JWT generado.
 */
const generateToken = (user) => {
    const secret = 'your_secret_key'; // Cambiar por una clave secreta en variables de entorno
    return jwt.sign({ id: user.usr_id, email: user.email, edit: user.edit }, secret, { expiresIn: '1h' });
  };


  /**
 * Busca un usuario por correo en la base de datos.
 * 
 * @param {string} email - El correo del usuario a buscar.
 * @returns {Promise<object|null>} - Retorna el objeto del usuario si existe, o null si no.
 */
const findUserByEmail = async (email) => {
    return User.findOne({ where: { email } });
  };

// Exporta las funciones para usarlas en otros módulos
module.exports = {
    userExists,
    encryptPassword,
    createUser,
    verifyPassword,
    generateToken,
    findUserByEmail
};
