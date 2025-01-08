import Project from './components/project_module/project_model'; // Ruta al modelo Project
import Task from './components/task_module/task_model'; // Ruta al modelo Task

// Definir asociaciones
Project.hasMany(Task, {
    foreignKey: 'project_id',
    as: 'tasks',
  });
  
Task.belongsTo(Project, {
    foreignKey: 'project_id',
    as: 'project',
});




