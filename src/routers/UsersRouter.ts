import { Router } from 'express';
import UsersController from '../controllers/UsersController';

const router = Router();
const usersController = new UsersController();

router.post('/authenticate', usersController.authenticate);
router.post('/', usersController.post);

export default router;
