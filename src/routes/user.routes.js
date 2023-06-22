import Router from 'express'
import {getUsers} from '../controllers/user.controller.js';
import { getMessageByUser } from '../controllers/message.controller.js';
const router = Router()
router.get("",getUsers);
router.get("/:userId/messages", getMessageByUser);

export default router;