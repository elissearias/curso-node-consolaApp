/** 
 *  _listado:
 *          {'uuid-123712-123123: {id:12, desc:asd, completadoEn:92231} },
 */

const { stripColors } = require('colors');
const Tarea = require('./tarea');

class Tareas {
    //manejado como objeto
    _listado = {};

    //transformar a un arreglos pero solo getter
    get listadoArr () {
        
        const listado = [];
        //Arreglo de todas las llaves
        Object.keys(this._listado).forEach(key => {
            //console.log(key);

            const tarea = this._listado[key];

            //console.log(tarea);
            //insertar tareas al listado
            listado.push(tarea);
        })
        return listado;
    }

    constructor () {
        this._listado = {};  
    }

    //Para eliminar la propiedad del objeto
    borrarTarea (id= '') {
        //pregunto si existe 
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }

    cargarTareasFromArray (tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;

        })
    }

    crearTarea ( desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    //creo otro metodo
    //listado completo

    listadocompleto () {
        // console.log(this._listado);
        //console.log(this.listadoArr);
        //const indice;
        console.log('');
        this.listadoArr.forEach ((tarea, i) => {
            const idx = `${i+1}`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                            ?'Completada'.green
                            :'Pendiente'.red
            console.log(`${idx}. ${desc}:: ${estado}`);
        })
    }

    listarPendientesCompletadas (completadas = true) {
        
        console.log('');
        let contador = 0;

        this.listadoArr.forEach((tarea) => { 
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                            ?'Completada'.green
                            :'Pendiente'.red
            
            if (completadas){
                if (completadoEn){
                    contador += 1;
                    console.log(`${(contador+'.').green} ${desc}:: ${completadoEn.green}`);
                }
            }else {
                if (!completadoEn){
                    contador += 1;
                    console.log(`${(contador+'.').green} ${desc}:: ${estado}`);
                }         
            }        
        })
    }

    toggleCompletadas ( ids = [] ) {
        ids.forEach ( id => {
            const tarea = this._listado[id]; 

            if (!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }

        })
        this.listadoArr.forEach (tarea => {
            if (!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;