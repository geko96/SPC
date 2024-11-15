import { Router } from 'express';
import { dbConnection } from "../../lib/db/knextInitialization.js";

const router = Router()

router.get('/', async (req, res)=>{

    try {
        let rows = await dbConnection('Clientes')
        console.log(rows)
        res.json(rows)
    } catch (e){
        console.log(e)
        res.send(e)
    }
    
})

export default router