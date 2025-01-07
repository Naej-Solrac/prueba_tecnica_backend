import { Model, DataTypes } from 'sequelize';
import sequelize from '../../database';
// import Task from '../task_module/task_model'; // Importa el modelo correctamente

class Project extends Model {}

Project.init({
  // Define las columnas de la tabla
  project_id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Indica que esta columna es la clave primaria
    autoIncrement: true // Si es un campo auto incremental
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  sequelize,
  modelName: 'Project',
  tableName: 'proyecto', // Nombre real de la tabla en la base de datos
  timestamps: false, // Manejo automático de `createdAt` y `updatedAt`
  underscored: true, // Convierte camelCase en snake_case
});



export default Project;
