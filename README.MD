# Entregable Prueba Técnica Tualy Backend Node.js

Prueba desarrollara usando las tecnologias de Typescript, Postgresql, Docker

## Entrega

- Repositorio GIT con código fuente
  (El codigo Fuente compilado de la aplicacion se encuentra en la carpeta /src)

- Archivos docker-compose para ejecutar el contenedor de aplicaciones, base de datos postgresql y redis

## Extras

- Documentación del API Postman
  (Adjunto Documentacion de la API realizada en Postman https://documenter.getpostman.com/view/8647074/TzzANcjJ)
- Uso de TypeScript
- Utilizar una solución con ORM (Object-relational mapping, TypeORM)

### Guia de Instalacion

para la instalacion de este proyecto debemos tener instalado

- Nodejs
- Git
- Docker

teniendo esto instalado debemos usar el comando

```
git clone https://github.com/mabravo153/tualy-test.git
```

entramos a la carpeta del proyecto

```
cd tualy-test
```

debemos crear un archivo el cual contendra las variables de entorno de la aplicacion

```
PORT=3000
DB_HOST=db
POSTGRES_DB=postgres_tualy
POSTGRES_USER=mabravo153
POSTGRES_PASSWORD=Barranquilla1.
REDIS_URL=redis
REDIS_PORT=6379
USER_MAIL=
PASSWORD_MAIL=
```

ejecutamos el comando para levantar los contenedores correspondientes

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```
