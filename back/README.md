
<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Acerca del Proyecto

Este proyecto es una **aplicación de blog** construida con el framework **Laravel**. Su objetivo es proporcionar una plataforma básica de gestión de usuarios y posts, con características de autenticación y autorización, permitiendo a los usuarios autenticados crear, ver y listar posts por categoría.

### Funcionalidades principales

- **Registro de Usuarios**: Permite a los nuevos usuarios registrarse en la plataforma.
- **Autenticación de Usuarios**: Los usuarios registrados pueden iniciar sesión y obtener un token de autenticación usando Laravel Sanctum.
- **Gestión de Posts**: Los usuarios autenticados pueden crear nuevos posts, listar todos los posts o listar posts de una categoría específica.
- **Relación entre Usuarios y Posts**: Cada post está asociado a un usuario, permitiendo ver quién es el autor.
- **Gestión de Categorías**: Los posts se pueden asociar a categorías para facilitar su organización y visualización.

## Requisitos Previos

Para poder ejecutar este proyecto en tu entorno local, necesitarás tener instalados los siguientes elementos:

- **PHP** >= 8.0
- **Composer**
- **MySQL** o **PostgreSQL** como base de datos
- **Node.js** y **NPM** (para compilar los recursos front-end si es necesario)
- **Laravel** instalado globalmente (opcional, pero recomendado)

## Instalación

Sigue los siguientes pasos para configurar y ejecutar el proyecto en tu máquina local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd tu-repositorio
   ```

3. Instala las dependencias de Composer:
   ```bash
   composer install
   ```

4. Copia el archivo de configuración de entorno y configura tus variables:
   ```bash
   cp .env.example .env
   ```

5. Genera la clave de aplicación de Laravel:
   ```bash
   php artisan key:generate
   ```

6. Configura las variables de entorno en el archivo `.env` para tu base de datos:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=nombre_base_de_datos
   DB_USERNAME=tu_usuario
   DB_PASSWORD=tu_contraseña
   ```

7. Ejecuta las migraciones y seeders para crear las tablas y datos iniciales:
   ```bash
   php artisan migrate --seed
   ```

8. Instala las dependencias de NPM y compila los assets (si es necesario):
   ```bash
   npm install
   npm run dev
   ```

9. Inicia el servidor de desarrollo de Laravel:
   ```bash
   php artisan serve
   ```

El proyecto estará disponible en `http://localhost:8000`.

## Uso

### Endpoints de la API

1. **Registro de Usuarios**:  
   `POST /api/register`  
   Campos requeridos: `name`, `email`, `password`, `password_confirmation`

2. **Inicio de Sesión**:  
   `POST /api/login`  
   Campos requeridos: `email`, `password`

3. **Crear un Post (Requiere Autenticación)**:  
   `POST /api/posts`  
   Campos requeridos: `title`, `content`, `category_id`, `tags`, `status`, `featured_image`, `published_at`

4. **Listar todos los Posts**:  
   `GET /api/posts`

5. **Ver un Post Específico**:  
   `GET /api/posts/{id}`

6. **Listar Posts por Categoría (Requiere Autenticación)**:  
   `GET /api/posts/category/{categoryid}`

### Pruebas Unitarias

Este proyecto incluye pruebas unitarias para validar el registro de usuarios y la creación de posts. Para ejecutar las pruebas, usa el siguiente comando:

```bash
php artisan test
```

## Contribuciones

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza los cambios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Sube los cambios (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia [MIT](https://opensource.org/licenses/MIT).
