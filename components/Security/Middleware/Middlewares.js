import jwt from 'jsonwebtoken';
import User from '../../user_module/user_model';


const authenticateToken = (req, res, next) => {
  console.log("jean");
  
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
    // Verificar el token
    const secret = 'your_secret_key'; // Usa una clave secreta desde las variables de entorno
    console.log(token);
    console.log(secret);
    
    const user = jwt.verify(token, secret);
    console.log(user);
    
    req.user = user; // Agregar la información del usuario al objeto req
    next(); // Continuar al siguiente middleware o controlador
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

/**
 * Middleware para verificar si el usuario tiene permisos de edición.
 * 
 * @param {Request} req - Objeto de solicitud.
 * @param {Response} res - Objeto de respuesta.
 * @param {Function} next - Función para pasar al siguiente middleware o controlador.
 */
const checkEditPermission = async (req, res, next) => {
  try {
    // Obtener el ID del usuario desde el token (asumiendo que se usa `authenticateToken` previamente)
    const userId = req.user.id;

    // Buscar al usuario en la base de datos
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Verificar el campo `edit`
    if (user.edit !== 1) {
      return res.status(403).json({ error: 'No tienes permiso para realizar esta acción' });
    }

    // Si tiene permisos, continuar al siguiente middleware o controlador
    next();
  } catch (error) {
    console.error('Error al verificar permisos de edición:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};



export {
  authenticateToken,
  checkEditPermission
};
