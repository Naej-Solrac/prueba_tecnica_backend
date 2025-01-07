import Project from './project_model'; // Importa el modelo correctamente
import Task from '../task_module/task_model'; // Importa el modelo correctamente
/**
 * Crea un nuevo proyecto en la base de datos.
 * 
 * @param {string} projectName El nombre del proyecto a crear.
 * @returns {Promise<object>} Un objeto con el resultado de la inserción o un error.
 */
const createProject = (name) => {
    return Project.create({ name });
  };

const getProjectsWithTasks = () => {
  return Project.findAll({
    include: {
      model: Task, // Relación con el modelo Task
      as: 'tasks', // Alias definido en la asociación
    },
  });
};


const deleteProject = async (id) => {
  const project = await Project.findByPk(id);
  if (project) {
    await project.destroy();
    return true;
  } else {
    return false;
  }
};


const updateProject = async (id, projectData) => {
  const project = await Project.findByPk(id);
  if (project) {
    await project.update(projectData);
    return project;
  } else {
    return null;
  }
};


module.exports = { 
    createProject,
    getProjectsWithTasks,
    deleteProject,
    updateProject
};
