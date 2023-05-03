![ATClogo](./src/assets/images/logo.jpeg)

# Prueba técnica - StoryDots

# FRONTEND

---

### Indice:

<ul>
<li> <a href="#intro">Intro</a>
 <li><a href="#obj">- Objetivos del Proyecto</a></li>
 <li><a href="#stack">- Stack de tecnologias</a></li>
 <li><a href="#instrucciones">- Instrucciones para comenzar</a></li>
 </li>
 <br>
 <li><a href="#recorrido"> Recorrido</a></li>
<li> <a href="#landing">- Landing</a> 
 <li><a href="#createTeam">- Creacion de equipo</a></li>
<li><a href="#myTeams">- Mis Equipos</a></li>
 <li><a href="#match">- Jugar</a></li></li>

<ul>

<span id="intro"></span>

## Intro

¿Alguna vez soñaste con ver un partido de fútbol en donde se enfrenten tus jugadores favoritos? Imaginate poder armar dos equipos de 5 jugadores cada uno, en donde no tengas ninguna limitación... posición, presupuesto, contrato, club, edad... tu mente es tu límite.

<span id="obj"></span>

### Objetivos del Proyecto:

En **Alquila tu Cancha** deseamos crear una web app `[responsive desktop y mobile]` que se pueda crear **"El partido de tus sueños"**, un partido de fútbol 5 en donde se enfrenten tus 10 jugadores favoritos, consumiendo la API https://apifootball.com/documentation/

<span id="stack"></span>

### Stack

- React.js
- Tailwind CSS
- Redux Toolkit
- Git
  <span id="intro"></span>

<span id="instrucciones"></span>

### Iiniciar:

- Instalar dependecias ingresando en nuestro terminal el comando:

```bash
- npm install

```

- Inicializar ingresando el comando:

```bash
- npm run dev

```

<span id="recorrido"></span>

## Recorrido:

<span id="landing"></span>

### Homepage:

- Al comenzar nos encontramos con la homepage donde podemos ver una grilla con los productos del ecommerce, donde se renderizaran 8 por pagina con su respectivo paginado en la parte inferior.
- En la parte izquierda nos encontraremos con la sidebar la cual podremos filtrar por las marcas encontradas y ordenar por precio (mayor/menor) y alfabeticamnete (a-z / z-a)
- En la parte superior tenemos una Navbar la cual tiene el logo de la pagina que redirige siempre a la homepage, un buscador de productos, un carrito de compras donde se mostraran la cantidad de productos en el mismo y un boton de ingresar.

<p align="left"><img height="200" src="./src/assets/images/Screenshots/home.jpg" alt="homepage" /><p>

- Al clickear el carro de compras podemos er el listado de productos que tenemos en el mismo. Con la posibilidad de eliminar items individualmente o vaciar todo el carro, ademas tenemos informacion del total de los productos del carro y el boton de pago donde para poder acceder a el tendremos que estar logueados, sino lo estamos nos llevara a loguear y luego podremos simular el pago de neustro carrito. Cabe destacar que el contenido de neustro carro queda guardado en el almacenamiento local lo que no nos tendremos que preocupar si cerramos la página, etc.
<p align="left"><img height="200" src="./src/assets/images/Screenshots/cart_menu.jpg" alt="cartmenu" /><p>

- Luego de loguarse podemos ver nuestra foto de cuenta, la cual si la clickeamos podemos er el menu de usuario el cual nos da acceso al panel de administracion y el boton de salir el cual nos deslogueamos.
<p align="left"><img height="200" src="./src/assets/images/Screenshots/user_menu.jpg" alt="usermenu" /><p>

- Al clickear sobre un producto se nos desplegara la informacion del mismo con la posibilidad de agregarlo al carrito nueamente

<p align="left"><img height="200" src="./src/assets/images/Screenshots/product_detail.jpg" alt="usermenu" /><p>
<span id="createTeam"></span>

### Panel de administracion:

- La misma Navbar en la parte superior.
- Al ingresar podemos ver dos botones para crear nueva marca o producto lso cuales nos despliega un formulario para cada uno.
- A la izqueirda podemos ver todas las marcas cargadas con la posibilidad de editarlas/eliminarlas.
- a la derecha la grilla de productos cargados con la posibilidad de editarlos/ eliminarlos
<p align="left"><img height="200" src="./src/assets/images/Screenshots/admin_panel.jpg" alt="admin_panel" /><p>
