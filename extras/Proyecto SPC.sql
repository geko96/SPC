create database SPC
go

use SPC
go

Create table Usuarios(
Id int primary key identity (1,1) not null,
Nombre_de_Usuario varchar(100)not null unique,
Nombre varchar(100) not null,
Apellido varchar(100) not null,
Contraseña varchar(15) not null unique,
)

Create table Accesos(
Id int primary key identity (1,1) not null,
Descripcion varchar(500) not null
)

Create table Seguridad(
Id int primary key identity (1,1) not null,
Id_Usuario int not null ,
Id_Acceso int not null ,
Constraint fk_Usuario foreign key (Id_Usuario) references Usuarios(Id),
Constraint fk_Acceso foreign key (Id_Acceso) references Accesos(Id)
)

create table MarcasProductos(
Id int primary key identity (1,1) not null,
NombreMarca varchar(100) not null unique,
)

Create table VariantesProductos(
Id int primary key identity (1,1) not null,
NombreVariante varchar(100) not null unique,
)

Create table CategoriasProductos(
Id int primary key identity(1,1) not null,
NombreCategoria varchar(100) not null unique,
)

Create table Proveedores(
Id int primary key identity (1,1) not null,
NombreProveedor varchar(100) not null,
ApellidoProveedor varchar(100) not null,
Telefono varchar(20),
Mail varchar(100),
NombreEmpresa varchar(100) not null,
DNIProveedor varchar(10) not null,
)

Create table Productos(
Id int primary key identity (1,1) not null,
Nombre varchar(100) not null,
Descripcion varchar(300) not null,
Id_Marcas int,
Id_Variantes int,
Id_Categorias int,
Constraint fk_Marcas foreign key (Id_Marcas) references MarcasProductos(Id),
Constraint fk_Variantes foreign key (Id_Variantes) references VariantesProductos(Id),
Constraint fk_Categorias foreign key (Id_Categorias) references CategoriasProductos(Id)
)

Create table MetodosPagos(
Id int primary key identity (1,1) not null,
NombreMetodo varchar(100) not null unique,
)


Create table Clientes(
Id int primary key identity (1,1) not null,
Nombre varchar(100) not null,
Apellido varchar(100) not null,
DNI varchar(10) not null,
)

Create table Pedidos(
Id int primary key identity (1,1) not null,
Id_Clientes int,
Id_Productos int,
Id_Pagos int,
Constraint fk_Cliente foreign key (Id_Clientes) references Clientes(Id),
Constraint fk_Productos foreign key (Id_Productos) references Productos(Id),
Constraint fk_Pagos foreign key (Id_Pagos) references MetodosPagos(Id)
)

Create table ProductoProveedor(
Id int primary key identity (1,1) not null,
Id_Productos int,
Id_Proveedores int,
Constraint fk_Productos1 foreign key (Id_Productos) references Productos(Id),
Constraint fk_Provedores1 foreign key (Id_Proveedores) references Proveedores(Id)
)

Insert into Proveedores
Values
('Juan','Ramirez','358682290','jramirez@gmail.com','The Coca Cola Company','38990342'),
('Jose','Gonzalez','358002832','jgonzalez@gmail.com','Arcor','40782221'),
('Guillermo','Juarez','353849021','gjuarez@gmail.com','PepsiCo','41223580'),
('Guillermo','Fabre','356781102','gfabre@gmail.com','The Coca Cola Company','43009530'),
('Geronimo','Benavidez','349766820','gbenavidez@gmail.com','Despensa Tito','34027709'),
('Osvaldo','Perez','358900241','operez@gmail.com','Alimentos Perez S.A.','19444230'),
('Pedro','Romero','353210739','promero@gmail.com','Arcor','22874493'),
('Ismael','Suarez','353789911','isuarez@gmail.com','PepsiCo','20441860')

Insert into CategoriasProductos(NombreCategoria)
values
('Gaseosas'),
('Alfajores'),
('Masitas'),
('Agua Saborizada'),
('Bebida Energetica'),
('Caramelos'),
('Chupaletas'),
('Chicles')

Insert Into VariantesProductos(NombreVariante)
values
('Sabor Naranja'),
('Sabor Limon'),
('Sabor Original'),
('Sabor Zero Azucar'),
('Sabor Chocolate'),
('Sabor Chocolate Blanco'),
('Sabor Oreo'),
('Sabor Mousse'),
('Sabor Mousse Blanco'),
('Sabor Manzana'),
('Sabor Pera'),
('Sabor Pomelo'),
('Sabor Limalimon')

Insert into MarcasProductos(NombreMarca)
values
('CocaCola'),
('Pepsi'),
('Tatin'),
('Sprite'),
('Fanta'),
('Oreo'),
('Aquarius'),
('Milka')


Insert into Productos(Nombre, Descripcion,Id_Marcas, Id_Variantes, Id_Categorias)
values
('Gaseosa Fanta Naranja', 'Bebida sin alcohol artificial con sabor a naranja gasificada.', 5, 1, 1),
('Gaseosa Pepsi', 'Bebida gaseosa refrescante con sabor a cola.', 2, 3, 1),
('Alfajor Oreo', 'Es una deliciosa variante de alfajor que combina la clásica galleta de chocolate Oreo con un relleno cremoso y suave.', 6, 7, 2),
('Masitas Oreo', 'Son dos galletas redondas y delgadas de chocolate, que encierran un relleno cremoso y suave.', 6, 7, 3),
('Gaseosa Fanta Limon', 'Bebida sin alcohol artificial con sabor a limon gasificada.', 5, 2, 1),
('Aquarius Pera','Agua saborizada con sabor a pera ', 7, 11, 4),
('Aquarius Pomelo', 'Agua saborizada con sabor a pomelo', 7, 12, 4),
('Alfajor Tatin Negro', 'Son dos galletas suaves y dulces, típicamente de chocolate, unidas por un relleno cremoso, como dulce de leche o chocolate, y luego cubierto con una capa de chocolate negro o glaseado oscuro.', 3, 5, 2),
('Alfajor Tatin Blanco', 'Son dos galletas suaves y esponjosas unidas por un relleno cremoso de dulce de leche y cubiertas con una capa de glaseado blanco.', 3, 6, 2),
('Gaseosa Sprite limalimon', 'Es una refrescante bebida carbonatada con un sabor único y vibrante que combina lima y limón.', 4, 13, 1)

Insert into ProductoProveedor(Id_Productos,Id_Proveedores)
Values
(1, 1),
(5, 4),
(10, 4),
(6, 1),
(7, 1),
(8, 5),
(4, 6),
(3, 5)

Insert into Clientes
Values
('Joaquin','Miretti','46.532.531'),
('Ezio','Venedictis','42.497.623'),
('Walter','White','46.393.771'),
('Jesse','Pinkman','47.285.831'),
('Benjamin','Dardanelli','47.888.304'),
('Francisco','Barrios','46.672.110'),
('Juan','Urquia','45.902.502'),
('Saul','Goodman','42.002.484'),
('Vito','Gastaldi','45.999.802'),
('Lisandro','Monti','45.776.223')

Insert into Usuarios
values
('Jorge7274', 'Jorge', 'Rojas', 'A12345'),
('Mati47', 'Matías', 'Molina', 'B12345'),
('Gonza841', 'Gonzalo', 'Quiroga', 'C12345'),
('Tomi14', 'Tomás', 'Sarate', 'D12345'),
('Agus3434', 'Agustín', 'Sanchez', '123321'),
('Martin540','Martin','Ferreyra','123456'),
('Pedro223','Pedro','Gonzalez','987654'),
('Pablo64','Pablo','Almiron','123496')

insert into Accesos
values
('Inicio'),
('Productos'),
('Pedidos'),
('Asistencia al cliente'),
('Perfil')

insert into MetodosPagos
values
('Efectivo'),
('Transferencia')

insert into Pedidos
values
(1,5,2),
(2,6,2),
(1,2,2),
(3,1,1),
(3,2,1),
(4,7,2),
(5,4,1),
(8,5,2)

1--Seleccionar los productos que tengan como Nombre de categoría “Alfajor”.

Select P.Nombre
from Productos P
join CategoriasProductos C
on P.Id_Categorias=C.Id where C.Id= 2

2--Seleccionar los productos cuyo proveedor sea The Coca Cola Company.

Select P.Nombre
from ProductoProveedor PP
join Productos P
on P.Id=PP.Id_Productos
join Proveedores Pro
on PP.Id_Proveedores=Pro.Id
where Pro.NombreEmpresa='The Coca Cola Company'

3--Seleccionar los productos cuyas variantes sean de "Sabor Chocolate”.

Select P.Nombre
from Productos P
join VariantesProductos V
on P.Id_Variantes=V.Id
where V.NombreVariante='Sabor Chocolate'

4--Seleccionar los productos con marca “Fanta” y “Sprite”.

Select P.Nombre
from Productos P
Join MarcasProductos M
on P.Id_Marcas=M.Id
where M.NombreMarca='Fanta' or M.NombreMarca='Sprite'

5--Seleccionar todos los datos de productos, variantes de productos y las categorías de los productos.

Select P.Nombre, P.Descripcion, V.NombreVariante, M.NombreMarca, C.NombreCategoria
from Productos P
join VariantesProductos V
on P.Id_Variantes=V.Id
join MarcasProductos M
on P.Id_Marcas=M.Id
join CategoriasProductos C
on P.Id_Categorias=C.Id

6--Seleccionar los productos cuyos pedidos fueron pagados con el método "transferencia".

Select P.Nombre
from Productos P
join Pedidos Pe
on P.Id=Pe.Id_Productos
join MetodosPagos M
on M.Id=Pe.Id_Pagos
where M.NombreMetodo='Transferencia'

7--Seleccionar los clientes cuyos pedidos fueron pagados con dinero físico.

Select C.Nombre, C.Apellido
from Clientes C
Join Pedidos P
on P.Id_Clientes=C.Id
join MetodosPagos M
on M.Id=P.Id_Pagos
where M.NombreMetodo='Efectivo'

8--Seleccionar los clientes cuyos pedidos fueron pagados por el método transferencia.

Select C.Nombre, C.Apellido
from Clientes C
Join Pedidos P
on P.Id_Clientes=C.Id
join MetodosPagos M
on M.Id=P.Id_Pagos
where M.NombreMetodo='Transferencia'

9--Seleccionar los pedidos de los clientes cuyo DNI termine en 31.

Select P.Id, C.Nombre, C.Apellido, M.NombreMetodo, Pr.Nombre
from Pedidos P
join Clientes C
on P.Id_Clientes=C.Id
join MetodosPagos M
on M.Id=P.Id_Pagos
join Productos Pr
on Pr.Id=P.Id_Productos
where C.DNI like '%31'

--Vistas
Create view Vista1 as
select Id_Clientes, Id_Productos
from Pedidos

Create view Vista2 as
select Nombre, Descripcion
from Productos

Create view Vista3 as
select Id, Nombre, Apellido
from Clientes