//Importación de ese paquete
require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
//Desestructuración, sacando esas funciones u objetos que
//se encuentran en ese archivo
const {inquirerMenu, 
       pausa,
       leerInput,
       listadoTareasBorrar,
       confirmar,
       mostrarListadoCheckList
    }= require('./helpers/inquirer');

//Estoy haciendo una importación por defecto
const Tareas = require('./models/tareas')

//Función main
//para ocupa´r el async
const main = async() => {

    let opt = '';

    //instancia de las tareas
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB){
        //establecer las tareas
        //Todo: cargarTareas
        tareas.cargarTareasFromArray(tareasDB);
       // console.log(tareas);
    }
  //  await pausa ();
    
    do {
        //Imprimir el menú
        opt = await inquirerMenu();

        switch (opt) {
            case '1': 
            //crear opcion
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
            break;

            case '2':
                tareas.listadocompleto();
            break;
            
            case '3': //Listar completadas
                tareas.listarPendientesCompletadas(true);
            break;

            case '4': //Listar pendientes
                tareas.listarPendientesCompletadas(false);
            break;

            case '5': //completado o pendiente
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;

            case '6': //Borrar
            //Espero el id de las tareas por borrar, esto pide las tareas
            // como un arreglo y estas se encuentran en listadoArr
                const id = await listadoTareasBorrar(tareas.listadoArr);
                
                if (id !== '0'){
                    const ok = await confirmar('¿Está seguro de borrar?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente!');    
                    }     
                }            
            break;
        }
        
        guardarDB(tareas.listadoArr);
        await pausa ();


    } while (opt != '0');
    
    

    //pausa();
}

main ();