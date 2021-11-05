const fs = require('fs');

//donde quiero guardar la data
//path donde se va a guardar
const archivo = './db/data.json';

//recibo la data que quiero grabar
const guardarDB = (data) => {
    
    //le paso el archivo que es el path donde se guardará
    //le paso la data que se va a guardar

    //Objeto JSON tiene un método stringify que convierte
    //un objeto a su versión json válida como un string
    fs.writeFileSync(archivo, JSON.stringify(data));

}

const leerDB = () => {
    if (!fs.existsSync(archivo)) {
        return null;
    }
    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    const data = JSON.parse(info);
    
    //console.log(data);

    return data;
}

module.exports = {
    guardarDB,
    leerDB
}