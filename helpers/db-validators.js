const Cliente = require("../models/cliente");

// Validar si el usuario existe o no
const clienteExiste = async( id ) => {
    
    const existeCliente = await Cliente.findById( id );
    if ( !existeCliente || !existeCliente.estado){
        throw new Error (`No existe ningun Cliente con el id ${ id }`);
    }
}
module.exports = {
    clienteExiste
}