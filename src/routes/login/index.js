import { Router } from "express";
import dbConnection from '../../../knexfile.js';

const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Login route'
    });
});

router.post('/', async (req, res) => {
    if (req.body.usuario && req.body.password) {
        try {
            let [rows] = await dbConnection.raw('SELECT * FROM usuario WHERE usuario = ? AND password = ?', [req.body.usuario, req.body.password]);
            
            //console.log(rows);
            
            if (rows.length > 0) {
                res.json({
                    message: 'Inicio exitoso',
                    data: rows[0],  // Enviamos solo el primer usuario encontrado
                    token: '1234567890'
                });
            } else {
                res.status(401).json({
                    message: 'Inicio fallido: Usuario o contraseña incorrectos'
                });
            }
        } catch (error) {
            console.error('Error en la consulta:', error);
            res.status(500).json({
                message: 'Error interno del servidor'
            });
        }
    } else {
        res.status(400).json({
            message: 'Inicio fallido: Falta usuario o contraseña'
        });
    }
});
export default router;