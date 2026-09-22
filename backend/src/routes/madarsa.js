import { Router } from 'express';
import { createMadarsaRecord, deleteMadarsaRecord, getMadarsaModule, getMadarsaRecord, listMadarsaModules, updateMadarsaRecord } from '../controllers/madarsaController.js';
import { authenticate, authorizeModule } from '../middleware/authenticate.js';

const router = Router();

router.use(authenticate);
router.param('moduleKey', authorizeModule);

router.get('/', listMadarsaModules);
router.get('/:moduleKey', getMadarsaModule);
router.post('/:moduleKey/records', createMadarsaRecord);
router.get('/:moduleKey/records/:recordId', getMadarsaRecord);
router.patch('/:moduleKey/records/:recordId', updateMadarsaRecord);
router.delete('/:moduleKey/records/:recordId', deleteMadarsaRecord);

export default router;