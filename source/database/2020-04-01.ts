export const up = (knex: any) => {
    return knex.schema
        .createTable('Usuario', (table: any) => {
            table.increments('idUsuario').primary();
            table.string('nombreCompleto', 300); 
            table.string('usuario', 50);
            table.string('contrasena', 300);
            table.string('token', 300);
            table.string('correo', 300);
            table.string('celular', 50);
            table.string('mimetypeFoto', 20);
            table.specificType('archivoFoto', 'mediumblob');
            table.enum('rol', ['USUARIO', 'ADMINISTRADOR']);
        })
        .createTable('Virus', (table: any) => {
            table.increments('idVirus').primary();
            table.string('clave', 20);
            table.string('nombre', 300);
            table.string('mimetypeIcono', 20);
            table.specificType('archivoIcono', 'mediumblob');
            table.integer('fkTestNodo').unsigned(); //.references('TestNodo.idTestNodo').onDelete('CASCADE');
            table.enum('estatus', ['INHABILITADO', 'HABILITADO']);
        })
        .createTable('TestNodo', (table: any) => {
            table.increments('idTestNodo').primary();
            table.integer('fkVirus').unsigned().references('Virus.idVirus').onDelete('CASCADE');            
            table.string('texto', 300);
            table.string('descripcion', 1000);
            table.string('mimetype', 20);
            table.specificType('archivo', 'longblob'); 
        })
        .createTable('TestOpcion', (table: any) => {
            table.increments('idTestOpcion').primary();
            table.integer('fkTestNodo').unsigned().references('TestNodo.idTestNodo').onDelete('CASCADE');
            table.integer('fkTestNodoSig').unsigned().references('TestNodo.idTestNodo').onDelete('SET NULL');
            table.string('clave', 20);
            table.string('texto', 300);
            table.string('descripcion', 300);
            table.string('mimetype', 20);
            table.specificType('archivo', 'mediumblob');
        })
        .createTable('CategoriaInformacion', (table: any) => {
            table.increments('idCategoriaInformacion').primary();
            table.string('clave', 20);
            table.string('nombre', 300);
        })
        .createTable('Informacion', (table: any) => {
            table.increments('idInformacion').primary();
            table.integer('fkVirus').unsigned().references('Virus.idVirus').onDelete('CASCADE');            
            table.integer('fkCategoriaInformacion').unsigned().references('CategoriaInformacion.idCategoriaInformacion').onDelete('CASCADE');
            table.string('texto', 300);
            table.string('descripcion', 1000);
            table.string('mimetype', 20);
            table.specificType('archivo', 'longblob');
        })
        .createTable('Ubicacion', (table: any) => {
            table.increments('idUbicacion').primary();
            table.integer('fkUbicacion').unsigned().references('Ubicacion.idUbicacion').onDelete('CASCADE');            
            table.string('clave', 20);
            table.string('nombre', 300);
            table.decimal('latitud', 11, 7);
            table.decimal('longitud', 11, 7);
            table.text('archivoMapa', 'longtext');
            table.string('identificadorMapa');
        })
        .createTable('CategoriaEstadistica', (table: any) => {
            table.increments('idCategoriaEstadistica').primary();
            table.string('nombre', 300);
        })
        .createTable('SubcategoriaEstadistica', (table: any) => {
            table.increments('idSubcategoriaEstadistica').primary();
            table.integer('fkCategoriaEstadistica').unsigned().references('CategoriaEstadistica.idCategoriaEstadistica').onDelete('CASCADE');   
            table.string('nombre', 300);
        })
        .createTable('Estadistica', (table: any) => {
            table.increments('idEstadistica').primary();
            table.integer('fkVirus').unsigned().references('Virus.idVirus').onDelete('CASCADE');            
            table.integer('fkUbicacion').unsigned().references('Ubicacion.idUbicacion').onDelete('CASCADE');  
            table.integer('fkSubcategoriaEstadistica1').unsigned().references('SubcategoriaEstadistica.idSubcategoriaEstadistica').onDelete('CASCADE');   
            table.integer('fkSubcategoriaEstadistica2').unsigned().references('SubcategoriaEstadistica.idSubcategoriaEstadistica').onDelete('CASCADE');   
            table.decimal('valor', 8, 2);
            table.date('fecha');
        })
        .createTable('Medico', (table: any) => {
            table.increments('idMedico').primary();
            table.integer('fkUsuario').unsigned().references('Usuario.idUsuario').onDelete('CASCADE');
            table.integer('fkUbicacion').unsigned().references('Ubicacion.idUbicacion').onDelete('CASCADE');            
            table.string('nombreConsultorio', 300); 
            table.string('nombreDoctor', 300); 
            table.string('direccionConsultorio', 300); 
            table.string('telefonoConsultorio', 300); 
            table.string('cedulaProfesional', 30);
            table.string('descripcion', 1000);
            table.string('mimetypeFoto', 30);
            table.specificType('archivoFoto', 'mediumblob');
            table.enum('estatus', ['HABILITADO', 'DESHABILITADO', 'EN_ESPERA', 'RECHAZADO']);
        })
        .createTable('MedicoVirus', (table: any) => {
            table.increments('idMedicoVirus').primary();
            table.integer('fkMedico').unsigned().references('Medico.idMedico').onDelete('CASCADE');
            table.integer('fkVirus').unsigned().references('Virus.idVirus').onDelete('CASCADE');            
        })
        .createTable('Valoracion', (table: any) => {
            table.increments('idValoracion').primary();
            table.integer('fkMedicoVirus').unsigned().references('MedicoVirus.idMedicoVirus').onDelete('CASCADE');
            table.integer('fkUsuario').unsigned().references('Usuario.idUsuario').onDelete('CASCADE');
            table.integer('valoracion');
        })
    ;
}

export const down = (knex: any) => {
    return knex.schema
        .dropTableIfExists('Valoracion')
        .dropTableIfExists('MedicoVirus')
        .dropTableIfExists('Medico')
        .dropTableIfExists('Estadistica')
        .dropTableIfExists('CategoriaEstadistica')
        .dropTableIfExists('Informacion')
        .dropTableIfExists('CategoriaInformacion')
        .dropTableIfExists('TestOpcion')
        .dropTableIfExists('TestNodo')
        .dropTableIfExists('Virus')
        .dropTableIfExists('Usuario')
    ;
};
