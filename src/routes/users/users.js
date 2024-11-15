import { Router } from 'express';
import dbConnection from '../../../knexfile.js';

const router = Router()

router.get('/', async (req, res)=>{

    try {
        let rows = await dbConnection('Clientes')
        res.json(rows)
    } catch (e){
        console.log(e)
        res.send(e)
    }
    
})

export default router