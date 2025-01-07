import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config(); // Cargar las variables de entorno.

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  retry: {
    max: 5 // Número de reintentos en conexiones iniciales
  }
});

async function checkConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida exitosamente.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    console.log('Reintentando en 5 segundos...');
    setTimeout(checkConnection, 5000);
  }
}

checkConnection();

export default sequelize;
