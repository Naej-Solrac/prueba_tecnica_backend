import express from 'express';
import user_service from './user_service.js'

const router = express.Router();

// Ruta para crear cuenta
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const exists = await user_service.userExists(email);
        if (exists) {
            return res.status(409).json({ error: 'El correo ya está registrado' });
        }

        // Encriptar la contraseña
        const hashedPassword = await user_service.encryptPassword(password);

        // Crear el usuario en la base de datos
        const user = await user_service.createUser(email, hashedPassword);

        res.status(201).json({ message: 'Usuario registrado exitosamente', user_id: user.usr_id });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Verificar si el usuario existe
      const user = await user_service.userExists(email);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      
      // Verificar la contraseña
      const storedUser = await user_service.findUserByEmail( email ); // Obtén al usuario desde la base de datos
      console.log(storedUser);
      
      const isPasswordValid = await user_service.verifyPassword(password, storedUser.password);
      if (!isPasswordValid) {
          return res.status(401).json({ error: 'Contraseña incorrecta' });
        }
  
      // Generar el token JWT
      const token = user_service.generateToken(storedUser);
     
      // Responder con el token
      res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

export default router;
