import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { canAccessModule } from '../config/roles.js';
import { createStudent, deleteStudent, getStudent, listStudents, updateStudent } from '../controllers/studentController.js';

const router = Router();
router.use(authenticate);
router.use((request, _response, next) => canAccessModule(request.user?.role, 'students')
	? next()
	: next(Object.assign(new Error('You do not have permission to open students.'), { statusCode: 403 })));
router.get('/', listStudents);
router.post('/', createStudent);
router.get('/:studentId', getStudent);
router.patch('/:studentId', updateStudent);
router.delete('/:studentId', deleteStudent);

export default router;