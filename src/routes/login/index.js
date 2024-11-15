import { Router } from "express";
import { dbConnection } from "../../lib/db/knextInitialization.js";

const router = Router();

router.get('/', (req, res) => {
    res.json({
        message: 'Login route'
    });
});

router.post('/', async (req, res) => {
    if (req.body.usuario && req.body.password) {
        try {
            const {usuario, password} = req.body;
            let rows = await dbConnection('usuarios').where({Nombre_de_Usuario: usuario});
            
            if(rows.length === 0){
                res.status(404).json({
                    message: 'Usuario no encontrado'
                });
                return;
            } else if (rows[0].Contraseña !== password){
                res.status(401).json({
                    message: 'Contraseña incorrecta'
                });
                return;
            }  else {
                res.status(200).json({
                    message: 'Inicio de sesión exitoso',
                    usuario: rows[0],
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