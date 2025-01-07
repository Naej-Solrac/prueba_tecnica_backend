import express from 'express';

import projects from '../components/project_module/project_network'
import task from '../components/task_module/task_network'
import user from '../components/user_module/user_network'

const router = express.Router();

router.use('/projects', projects)
router.use('/projects', task)
router.use('/user', user)

module.exports = router;
