import { Router } from "express";
import dbConnection from '../../../knexfile.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Register route'
    });
});

router.post('/', async (req, res) => {
    
    try {
        await dbConnection.raw('Insert into usuarios values (?, ?, ?, ?)', [req.body.usuario, req.body.name, req.body.lastname, req.body.password]);        
        //console.log(rows);
        console.log(req.body);
        res.json({
            message: 'Registro exitoso',
            data: req.body,  // Enviamos solo el primer usuario encontrado
        });
        

    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
});

export default router;