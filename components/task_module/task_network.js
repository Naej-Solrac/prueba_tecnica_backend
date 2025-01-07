
import task_service from './task_service'
const { Router } = require('express');
const express = require('express');

const router = express.Router();
const jwt_decode = require('jwt-decode');



router.post('/:projectId/tasks', async (req, res) => {
  try {
    const { projectId } = req.params; // Obtén el projectId de los parámetros de la URL
    const { title, status } = req.body; // Obtén los datos del cuerpo de la solicitud

    // Validación simple para asegurar que se proporcionan los campos necesarios
    if (!title || !status) {
      return res.status(400).json({ error: 'El título y el estado son obligatorios.' });
    }

    // Crea la nueva tarea
    const newTask = await task_service.createTask(projectId, title, status);

    res.status(201).json(newTask); 
  } catch (error) {
    console.error('Error al añadir la tarea:', error);
    res.status(500).json({ error: 'No se pudo añadir la tarea.' });
  }
});


router.delete('/:projectId/tasks/:taskId', async (req, res) => {
  try {
    const { projectId, taskId } = req.params; // Obtén el projectId y taskId de los parámetros de la URL

    // Llama a la función del servicio para eliminar la tarea
    const result = await task_service.deleteTask(projectId, taskId);

    if (result) {
      res.status(200).json({ message: 'Tarea eliminada con éxito' });
    } else {
      res.status(404).json({ error: 'Tarea no encontrada o no pertenece al proyecto especificado' });
    }
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    res.status(500).json({ error: 'No se pudo eliminar la tarea.' });
  }
});


router.patch('/:projectId/tasks/:taskId', async (req, res) => {
  try {
    const { projectId, taskId } = req.params; // Obtén el projectId y taskId de los parámetros de la URL
    const taskData = req.body; // Datos de la tarea para actualizar

    // Llama a la función del servicio para actualizar la tarea
    const updatedTask = await task_service.updateTask(projectId, taskId, taskData);

    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ error: 'Tarea no encontrada o no pertenece al proyecto especificado' });
    }
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    res.status(500).json({ error: 'No se pudo actualizar la tarea.' });
  }
});


router.patch('/:projectId/tasks/:taskId', async (req, res) => {
  try {
    const { projectId, taskId } = req.params; // Obtén el projectId y taskId de los parámetros de la URL
    const taskData = req.body; // Datos de la tarea para actualizar

    // Llama a la función del servicio para actualizar la tarea
    const updatedTask = await task_service.updateTask(projectId, taskId, taskData);

    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ error: 'Tarea no encontrada o no pertenece al proyecto especificado' });
    }
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    res.status(500).json({ error: 'No se pudo actualizar la tarea.' });
  }
});




export default router;