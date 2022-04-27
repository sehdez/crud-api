const { Schema, model } = require('mongoose');

// id, nombres, apellido paterno, apellido materno, 
// domicilio y correo electrónico.

const ClienteSchema = Schema({

    nombres: {
        type: String, 
        required: true
    },
    apellidoPaterno:{
        type: String,
        required: true
    },
    apellidoMaterno:{
        type: String,
        required: true
    },
    domicilio: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    // El estado es para identificar al usuario si esta activo o no
    // En lugar de eliminar un cliente, solo se le cambia el estado para no afectar procesos de la base de datos que halla realizado ese cliente
    estado:{
        type: Boolean,
        required: true,
        default: true
    }
});

// En esta parte ocultamos los atributos de _v que genera MongoDB y el estado para que no sean visibles
ClienteSchema.methods.toJSON = function(){
    const { __v, _id, estado, ...user} = this.toObject();
    user.id = _id;
    return user;
}


module.exports = model('Cliente', ClienteSchema);