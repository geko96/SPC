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