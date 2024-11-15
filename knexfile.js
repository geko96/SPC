import knex from 'knex';

export const development = {
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite' // Ruta donde se creará/ubicará el archivo SQLite
  },
  useNullAsDefault: true // Necesario para SQLite
};

const dbConnection = knex(development);
export default dbConnection;