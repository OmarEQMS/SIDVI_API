# SIDVI (Sistema de Información y Diagnóstico de Virus)

Back-end del proyecto SIDVI.
Plataforma para informar acerca de diversos virus. El usuario puede conocer información general de cada uno, consultar las estadisticas actuales
filtrando por diversos campos (por ejemplo: virus, localidad, genero, edad...), obtener un pre-diagnóstico al realizar un test de sintomas, encontrar
consultorios cercanos que atiendan dicho virus entre otras cosas.
Todo es gestionable desde la vista del administrador. 

## Estructura del proyecto 

```
.
├── README.md
|
├── node_modules
|
├── source					# Modelos, Controladores, Servicios...
|   └── ...
|
├── test
|   ├── files          		# Archivos que subimos a la BD
|   │   └── ...
|   └── seed        		# Proyecto Angular
|       └──  ...			# inisialización de datos de las tablas
|
└── ...
        
```
## Pre requisitos

Tener WAMP instalado

## Iniciar

Estas instrucciones le ayudaran a generar una copia del proyecto para correrlo desde su computadora.
Nota importante: Necesitará instalar el font-end para contar con todas las funcionalidades del proyecto ubicado [aquí](https://github.com/OmarEQMS/SIDVI.git)

1. Descargar el archivo zip o clonar el proyecto con el siguiente comando
```
$ git clone https://github.com/OmarEQMS/SIDVI_API.git
```
2. Navegar a **SIDVI_API/** y ejecutar los siguientes comandos

```
$ npm i -g knex
$ npm i -g grunt-cli

```

3. Crear la base de datos

Crear una base de datos en MySQL llamada **sidvi"**

4. Obtener la base de datos

Iniciar servidor WAMP y dentro de **SIDVI_API/** ejecutar

```
$ grunt init
$ grunt build
$ grunt seed
```

4. Correr el servidor
```
$ grunt serve
```

## Authors

* Omar Quintero Marmol Sánchez - [perfil](https://github.com/OmarEQMS)
* Diego Montoya Martinez - [perfil](https://github.com/diegommtz)
* Fernanda Orduña Rangel - [perfil](https://github.com/FerOrduna28)
* Ariadna Angélica Guemes Estrada - [perfil](https://github.com/AngieGE)



