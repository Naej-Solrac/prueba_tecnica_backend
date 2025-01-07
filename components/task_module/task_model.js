import { Model, DataTypes } from 'sequelize';
import sequelize from '../../database';
// import Project from '../project_module/project_model'; // Asegúrate de importar correctamente

class Task extends Model {}

Task.init({
  task_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'proyecto',
      key: 'project_id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {
  sequelize,
  modelName: 'Task',
  tableName: 'tarea',
  timestamps: false,
});



export default Task;
