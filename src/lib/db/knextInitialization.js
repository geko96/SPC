import knex from 'knex';

const development = {
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite'
  },
  useNullAsDefault: true
};

// Crear la conexión a la base de datos
const dbConnection = knex(development);

// Función para inicializar la base de datos
const initializeDatabase = async () => {
  try {
    // Verificar y crear la tabla Usuarios si no existe
    if (!(await dbConnection.schema.hasTable('Usuarios'))) {
      await dbConnection.schema.createTable('Usuarios', (table) => {
        table.increments('Id').primary();
        table.string('Nombre_de_Usuario', 100).notNullable().unique();
        table.string('Nombre', 100).notNullable();
        table.string('Apellido', 100).notNullable();
        table.string('Contraseña', 15).notNullable().unique();
      });
      console.log('Tabla Usuarios creada');
    }

    // Verificar y crear la tabla Accesos si no existe
    if (!(await dbConnection.schema.hasTable('Accesos'))) {
      await dbConnection.schema.createTable('Accesos', (table) => {
        table.increments('Id').primary();
        table.string('Descripcion', 500).notNullable();
      });
      console.log('Tabla Accesos creada');
    }

    // Verificar y crear la tabla Seguridad si no existe
    if (!(await dbConnection.schema.hasTable('Seguridad'))) {
      await dbConnection.schema.createTable('Seguridad', (table) => {
        table.increments('Id').primary();
        table.integer('Id_Usuario').notNullable();
        table.integer('Id_Acceso').notNullable();
        table.foreign('Id_Usuario').references('Usuarios.Id');
        table.foreign('Id_Acceso').references('Accesos.Id');
      });
      console.log('Tabla Seguridad creada');
    }

    // Verificar y crear la tabla MarcasProductos si no existe
    if (!(await dbConnection.schema.hasTable('MarcasProductos'))) {
      await dbConnection.schema.createTable('MarcasProductos', (table) => {
        table.increments('Id').primary();
        table.string('NombreMarca', 100).notNullable().unique();
      });
      console.log('Tabla MarcasProductos creada');
    }

    // Verificar y crear la tabla VariantesProductos si no existe
    if (!(await dbConnection.schema.hasTable('VariantesProductos'))) {
      await dbConnection.schema.createTable('VariantesProductos', (table) => {
        table.increments('Id').primary();
        table.string('NombreVariante', 100).notNullable().unique();
      });
      console.log('Tabla VariantesProductos creada');
    }

    // Verificar y crear la tabla CategoriasProductos si no existe
    if (!(await dbConnection.schema.hasTable('CategoriasProductos'))) {
      await dbConnection.schema.createTable('CategoriasProductos', (table) => {
        table.increments('Id').primary();
        table.string('NombreCategoria', 100).notNullable().unique();
      });
      console.log('Tabla CategoriasProductos creada');
    }

    // Verificar y crear la tabla Proveedores si no existe
    if (!(await dbConnection.schema.hasTable('Proveedores'))) {
      await dbConnection.schema.createTable('Proveedores', (table) => {
        table.increments('Id').primary();
        table.string('NombreProveedor', 100).notNullable();
        table.string('ApellidoProveedor', 100).notNullable();
        table.string('Telefono', 20);
        table.string('Mail', 100);
        table.string('NombreEmpresa', 100).notNullable();
        table.string('DNIProveedor', 10).notNullable();
      });
      console.log('Tabla Proveedores creada');
    }

    // Verificar y crear la tabla Productos si no existe
    if (!(await dbConnection.schema.hasTable('Productos'))) {
      await dbConnection.schema.createTable('Productos', (table) => {
        table.increments('Id').primary();
        table.string('Nombre', 100).notNullable();
        table.string('Descripcion', 300).notNullable();
        table.integer('Id_Marcas');
        table.integer('Id_Variantes');
        table.integer('Id_Categorias');
        table.foreign('Id_Marcas').references('MarcasProductos.Id');
        table.foreign('Id_Variantes').references('VariantesProductos.Id');
        table.foreign('Id_Categorias').references('CategoriasProductos.Id');
      });
      console.log('Tabla Productos creada');
    }

    // Verificar y crear la tabla MetodosPagos si no existe
    if (!(await dbConnection.schema.hasTable('MetodosPagos'))) {
      await dbConnection.schema.createTable('MetodosPagos', (table) => {
        table.increments('Id').primary();
        table.string('NombreMetodo', 100).notNullable().unique();
      });
      console.log('Tabla MetodosPagos creada');
    }

    // Verificar y crear la tabla Clientes si no existe
    if (!(await dbConnection.schema.hasTable('Clientes'))) {
      await dbConnection.schema.createTable('Clientes', (table) => {
        table.increments('Id').primary();
        table.string('Nombre', 100).notNullable();
        table.string('Apellido', 100).notNullable();
        table.string('DNI', 10).notNullable();
      });
      console.log('Tabla Clientes creada');
    }

    // Verificar y crear la tabla Pedidos si no existe
    if (!(await dbConnection.schema.hasTable('Pedidos'))) {
      await dbConnection.schema.createTable('Pedidos', (table) => {
        table.increments('Id').primary();
        table.integer('Id_Clientes');
        table.integer('Id_Productos');
        table.integer('Id_Pagos');
        table.foreign('Id_Clientes').references('Clientes.Id');
        table.foreign('Id_Productos').references('Productos.Id');
        table.foreign('Id_Pagos').references('MetodosPagos.Id');
      });
      console.log('Tabla Pedidos creada');
    }

    // Verificar y crear la tabla ProductoProveedor si no existe
    if (!(await dbConnection.schema.hasTable('ProductoProveedor'))) {
      await dbConnection.schema.createTable('ProductoProveedor', (table) => {
        table.increments('Id').primary();
        table.integer('Id_Productos');
        table.integer('Id_Proveedores');
        table.foreign('Id_Productos').references('Productos.Id');
        table.foreign('Id_Proveedores').references('Proveedores.Id');
      });
      console.log('Tabla ProductoProveedor creada');
    }

    console.log('Base de datos inicializada correctamente');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
    throw error;
  }
};

// Exportar la conexión y la función de inicialización
export { dbConnection, initializeDatabase };