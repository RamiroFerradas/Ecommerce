Fullstack Developer
Coding Challenge
Este documento contiene una consigna que esperamos que puedas completar exitosamente. Si bien la dividimos en dos partes separadas de front y backend, te recomendamos que leas todo el documento y comiences por donde sientas que puede resultar más cómodo. Dejamos anotados algunos extras que podés incluir en tu challenge si te animás, pero NO son puntos obligatorios a completar, y tu solución podrá ser válida sin incluir ningún extra.

En este coding challenge te vamos a proponer construir las bases de lo que luego podría transformarse en un ecommerce.
Backend
Queremos que construyas una API REST con Node que pueda realizar las operaciones CRUD de productos. Para eso te proponemos que construyas un endpoint /products.

Los productos deben tener al menos las siguientes propiedades:
id
name
description
image_url (pueden traer imágenes que no están hosteadas en la app)
price

El endpoint debe permitir traer un listado de todos los productos, como también de cada uno en particular filtrando por id. No es necesario que la API requiera token o algún tipo de autenticación para funcionar.
Como mencionamos antes, deben ser posibles todas las operaciones CRUD, así que además de obtener productos se deben poder crear, actualizar y eliminar.

Extras
Podés implementar algún tipo de autenticación a la API para proteger los métodos de creación, actualización y borrado. De este modo solamente un request autenticado podría hacer estas operaciones, mientras que los métodos de lectura (GET) serían públicos.
Podés agregar un segundo modelo de marcas a la aplicación. Cada producto tendría que tener entonces una marca de manera obligatoria, o sea, no debería haber productos sin marca. Las marcas deberían tener un name y un logo_url.
En caso de que elijas hacer este extra, te recomendamos utilizar un approach relacional (SQL) usando herramientas como Sequelize o Prisma (puede ser otro, son solo sugerencias).
Frontend
Vas a construir el frontend en React que muestre los productos que expone tu API en el backend. Podés usar solo React o Nextjs, lo que más te guste está bien :)

Tu tarea es construir un frontend que va a cargar una lista de productos desde el backend, y debe mostrar todos los que haya. Podés elegir paginar los resultados o hacer scroll infinito. Además, al hacer click en un producto el usuario debe poder ver una vista de detalle de ese producto, ya sea un modal en esa misma home o una página dedicada para el producto.

En el listado de productos, debe mostrarse la imagen, el nombre y el precio del producto. En la vista de detalle debe mostrarse, además, la descripción del producto.
Extras
Podés implementar una vista de “administrador” donde permitirle al usuario realizar todas las operaciones CRUD desde el frontend. Otro extra posible para este punto es solamente mostrar la vista de admin luego de que el usuario se logee con contraseña.
Si completaste el extra 2. en el backend, podés mostrar también información de la marca (por ejemplo el logo) en la vista de los productos.
Deployment
Queremos poder ver una app deployada online, tanto el back como el front. Podés usar servicios como Heroku, Vercel, Netlify o cualquier otro que te sirva para deployar tu app. Si te animás a deployar en AWS genial :) Pero en cualquier otro servicio está OK!
Entregables
Cuando hayas terminado este challenge, vamos a esperar recibir:
El código en un repositorio público de Github. Debe incluir un README.md explicando la solución brevemente: qué funcionalidades tiene cada parte de la app, qué librerías utilizaste, cómo funciona el backend, endpoints disponibles, etc. Podés meter front y back en el mismo repo o separarlo en dos, lo que te sea más cómodo está bien. También podés describir cómo levantar el proyecto en local en caso de que otra persona quisiera probarlo o hacer modificaciones.
Un link al proyecto funcionando online, puede ser en cualquier servicio donde sientas cómodo hacer el deploy.
Si no podés completar alguna parte de los requerimientos, incluí una explicación de qué no pudiste resolver y por qué, y qué harías si pudieses dedicarle más tiempo al problema.

Cuando diseñamos este challenge no pensamos en incluir nada tramposo ni complicado de gusto, así que CUALQUIER duda que tengas nos podés escribir y consultar a coding-challenge@storydots.app.

Mucha suerte!
Forkear el repositorio para tener una copia del mismo en sus cuentas 2. Clonar el repositorio en sus computadoras para comenzar a trabajar
Tendrán un `boilerplate` con la estructura general del servidor.
