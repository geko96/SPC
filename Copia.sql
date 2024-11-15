create database SPC1
go

use SPC1
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
Constraint fk_Marcas foreign key (Id_Marcas) references MarcasProductos(Id),
Constraint fk_Variantes foreign key (Id_Variantes) references VariantesProductos(Id)
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
Constraint fk_Productos2 foreign key (Id_Productos) references Productos(Id),
Constraint fk_Proveedores2 foreign key (Id_Proveedores) references Proveedores(Id)
)

Insert into Proveedores(NombreEmpresa,NombreProveedor,ApellidoProveedor,DNIProveedor,Mail,Telefono)
Values
('The Coca-Cola Company','Joaquin','Miretti','46.889.991','joaquimiretti@gmail.com','3584381302')

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
('Sabor Mousse Blanco')

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


Insert into Productos(Nombre, Descripcion,Id_Marcas, Id_Variantes)
values
('Gaseosa Fanta', 'Bebida sin alcohol artificial con sabor a naranja gasificada', 5, 1)

Insert into ProductoProveedor(Id_Productos, Id_Proveedores)
Values
(1, 1)

Select * from Productos
Select * from ProductoProveedor
Select * from Proveedores
Select * from MarcasProductos
Select * from VariantesProductos

Select P.Nombre, P.Descripcion, M.NombreMarca, V.NombreVariante
from Productos P
Join MarcasProductos M
on P.Id_Marcas=M.Id
Join VariantesProductos V
on P.Id_Variantes=V.Id

Select Prov.NombreEmpresa,Prov.NombreProveedor,P.Nombre, P.Descripcion
from ProductoProveedor Pro
Join Productos P
on P.Id=Pro.Id_Productos
Join Proveedores Prov
on Pro.Id_Proveedores=Prov.Id