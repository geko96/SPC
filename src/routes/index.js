import { Router } from "express";
import registerRouter from './register/index.js';
import loginRouter from './login/index.js';
import usersRouter from './users/users.js'

//import fichadasRouter from './fichadas/index.js';

import auth from '../middleware/auth.js';
const router = Router();


router.use('/login', loginRouter)
router.use('/register', registerRouter)
router.use('/users', usersRouter)

router.use(auth);

//router.use('/fichadas', fichadasRouter)

export default router;