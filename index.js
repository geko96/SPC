import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mainRouter from './src/routes/index.js';
import { dbConnection, initializeDatabase } from './src/lib/db/knextInitialization.js';
dotenv.config();
const PORT = process.env.PORT || 3000;

if(dbConnection){
    console.log('Database connection established');
}

const app = express();

//use corse
app.use(cors());
app.options("*", cors());

///use urlencoded for JSON support
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use /plublic folder
app.use(express.static('public'));


app.use('/api', mainRouter);

(async () => {
    try {
      await initializeDatabase();
      console.log('Base de datos lista para usar');
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
      process.exit(1);
    }
})();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


