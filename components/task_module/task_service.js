import Task from './task_model'; // Importa el modelo correctamente

/**
 * Crea una nueva tarea asociada a un proyecto en la base de datos.
 * 
 * @param {number} projectId - El ID del proyecto al que pertenece la tarea.
 * @param {string} title - El título de la tarea.
 * @param {string} status - El estado de la tarea.
 * @returns {Promise<object>} - Un objeto con el resultado de la inserción o un error.
 */
const createTask = (projectId, title, status) => {
    return Task.create({
        project_id: projectId, // Clave foránea
        title,
        status
    });
};


const deleteTask = async (projectId, taskId) => {
    const task = await Task.findByPk(taskId); // Asegúrate de usar Task si así lo importaste
    if (task && task.project_id === parseInt(projectId)) {
        await task.destroy();
        return true;
    } else {
        return false;
    }
};


const updateTask = async (projectId, taskId, taskData) => {
    // Utiliza directamente Task.update con una cláusula where adecuada
    const [updatedRows] = await Task.update(taskData, {
        where: {
            task_id: taskId,
            project_id: projectId
        }
    });

    if (updatedRows > 0) {
        // Si se actualizó al menos una fila, puedes retornar la tarea actualizada
        const updatedTask = await Task.findOne({
            where: {
                task_id: taskId,
                project_id: projectId
            }
        });
        return updatedTask;
    } else {
        // No se encontró la tarea o no pertenece al proyecto especificado
        return null;
    }
};


module.exports = { 
    createTask,
    deleteTask,
    updateTask, // Exporta la función para usarla en otros módulos
};
