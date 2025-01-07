
import project_service from './project_service'
const { Router } = require('express');
const express = require('express');

const router = express.Router();
const jwt_decode = require('jwt-decode');

import { authenticateToken, checkEditPermission} from '../Security/Middleware/Middlewares.js';


router.post('/',authenticateToken, checkEditPermission, async (req, res) => {
   try {
     const { name } = req.body;

     const newProject = await project_service.createProject(name)
    
     res.status(201).json(newProject);
   } catch (error) {
     console.error('Error al crear el proyecto:', error);
     res.status(400).json({ error: 'No se pudo crear el proyecto' });
   }
 });

 router.get('/',authenticateToken ,async (req, res) => {
  try {
    const projects = await project_service.getProjectsWithTasks();
    res.status(200).json(projects);
  } catch (error) {
    console.error('error al obtener los proyectos con sus task:', error);
    res.status(400).json({ error: 'error al obtener los proyectos con sus task' });
  }
});


// DELETE - Eliminar un proyecto específico
router.delete('/:id', authenticateToken, checkEditPermission, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await project_service.deleteProject(id);
    if (result) {
      res.status(200).json({ message: 'Proyecto eliminado con éxito' });
    } else {
      res.status(404).json({ error: 'Proyecto no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el proyecto:', error);
    res.status(500).json({ error: 'Error interno al eliminar el proyecto' });
  }
});


// PATCH - Actualizar un proyecto específico
router.patch('/:id', authenticateToken, checkEditPermission, async (req, res) => {
  try {
    const { id } = req.params;
    const projectData = req.body;
    const updatedProject = await project_service.updateProject(id, projectData);
    if (updatedProject) {
      res.status(200).json(updatedProject);
    } else {
      res.status(404).json({ error: 'Proyecto no encontrado' });
    }
  } catch (error) {
    console.error('Error al actualizar el proyecto:', error);
    res.status(500).json({ error: 'Error interno al actualizar el proyecto' });
  }
});




export default router;