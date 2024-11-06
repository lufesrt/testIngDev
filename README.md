
# TestingDev

Bienvenido al repositorio de **TestingDev**, un sistema de blog completo con backend en Laravel y frontend en React. Este proyecto está diseñado para proporcionar una plataforma donde los usuarios puedan registrarse, iniciar sesión y gestionar sus publicaciones de blog de manera organizada y eficiente.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales:

1. **Backend (Laravel)**: Ubicado en el directorio `back`, el backend de esta aplicación está construido con Laravel y proporciona todas las funcionalidades de autenticación y gestión de posts. Además, incluye endpoints API para el registro de usuarios, inicio de sesión, creación de posts y obtención de posts por categoría.

2. **Frontend (React)**: Ubicado en el directorio `front2`, el frontend está construido con React y permite a los usuarios interactuar con la API a través de una interfaz web. Las funcionalidades incluyen formularios de registro e inicio de sesión, y una vista para gestionar los posts.

Para obtener instrucciones detalladas sobre la configuración y el uso de cada componente, asegúrate de revisar los archivos `README.md` en los directorios `back` y `front2`.

## Funcionalidades Principales

### Backend (Laravel)

El backend de **TestingDev** provee una API RESTful con las siguientes características:

- **Registro de Usuarios**: Los nuevos usuarios pueden registrarse para crear una cuenta.
- **Inicio de Sesión**: Los usuarios registrados pueden iniciar sesión y obtener un token de autenticación.
- **Gestión de Posts**: Los usuarios autenticados pueden crear, ver, listar y borrar sus publicaciones en el blog.
- **Categorías de Posts**: Los posts pueden ser categorizados, facilitando la organización y filtrado.

Para configurar y ejecutar el backend, consulta el archivo `README.md` en el directorio `back`. Es importante ejecutar el comando de migración junto con los seeders para cargar los datos iniciales en la base de datos:
```bash
php artisan migrate --seed
```

### Frontend (React)

El frontend de **TestingDev** permite a los usuarios interactuar con la API a través de una interfaz amigable y accesible. Las vistas principales incluyen:

- **Pantalla de Inicio de Sesión**: Permite a los usuarios autenticarse.
- **Pantalla de Registro**: Permite a los nuevos usuarios registrarse en la plataforma.
- **Gestión de Posts**: Vista donde los usuarios autenticados pueden crear nuevos posts, ver sus publicaciones existentes, y filtrarlas por categoría.

En el archivo `package.json` del frontend, se ha configurado un proxy:
```json
"proxy": "https://testingdev.nes360.org"
```
Es posible que necesites modificar este valor para que se adapte al entorno en el que estás ejecutando el backend, para que el frontend funcione correctamente.

Para más detalles sobre el frontend, consulta el archivo `README.md` en el directorio `front2`.

## Instalación y Ejecución

A continuación, se proporciona una guía básica para ejecutar el proyecto. Para configuraciones avanzadas, por favor, revisa los archivos `README.md` en cada directorio.

### Requisitos Previos

- **Node.js** y **NPM** para el frontend.
- **PHP**, **Composer**, y **MySQL** o **PostgreSQL** para el backend.
- **Docker** (opcional) para ejecutar el backend en un contenedor.

### Instalación del Backend

Sigue los pasos detallados en el archivo `README.md` en el directorio `back` para configurar y ejecutar el backend, asegurándote de ejecutar las migraciones y seeders con el comando:
```bash
php artisan migrate --seed
```

### Instalación del Frontend

1. Ve al directorio `front2`:
   ```bash
   cd front2
   ```

2. Instala las dependencias de NPM:
   ```bash
   npm install
   ```

3. Ejecuta la aplicación en modo de desarrollo:
   ```bash
   npm start
   ```

Esto iniciará el servidor de desarrollo en `http://localhost:3000`, que también redirige las solicitudes de API al backend usando el proxy configurado.

## Contribuciones

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Realiza un fork de este repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Sube los cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia [MIT](https://opensource.org/licenses/MIT).
