const { response, request } = require("express")
const { generarJWT } = require("../helpers/generar-jwt")
const Cliente = require("../models/cliente")




const mostrarJWT = async( req = request, res = response ) =>{
    const { id } = req.body

    const token = await generarJWT( id )

    res.json({data:token})

}

const mostrarClienteId = async (req = request, res = response) =>{
    const { id } = req.params
    const cliente = await Cliente.findById( id );

    res.json({data: cliente})
}


const mostrarClientes = async( req , res = response ) =>{


    // Hacer las dos consultas simultaneas
    const [clientes, clientesTotales] = await Promise.all([
        Cliente.find({estado:true}),
        Cliente.count({estado:true})
    ]);

    res.json({
        data:{clientesTotales,clientes}
    })
}

// nombres apellidoPaterno apellidoMaterno domicilio email estado

const crearCliente = async( req , res = response ) =>{
    const { email, ...data } = req.body
    
    try{
        // Validar si existe el email en la base de datos
        const existeEmail = await Cliente.findOne({ email });
        if( existeEmail ){
            return res.status(400).json({ errors:{msg: 'El correo ya existe en la base de datos'} });
        }
        const dataCliente = {
            nombres: data.nombres, 
            apellidoPaterno: data.apellidoPaterno, 
            apellidoMaterno: data.apellidoMaterno, 
            domicilio: data.domicilio,
            email
        }        
        
        // Crear Usuario en la Base de datos
        const cliente = await Cliente.create( dataCliente );
        
        // Retornar el usuario
        res.json({
            data:cliente
        })
    }catch(err){
        console.log(err)
        return res.status(500).json({ errors:{msg: 'Hable con el administrador de la base de datos'} })
    }
}

const actualizarCliente = async ( req , res = response ) =>{

    try{
        const { email, ...data } = req.body;
        const { id } = req.params;

        //  Verificar el email
        const emailAntiguo = await Cliente.findById(id)

        console.log(emailAntiguo.email, email)
        
        if( emailAntiguo.email !== email ){
            const existeEmail = await Cliente.findOne( {email} );

            if( existeEmail ){
                return res.status(400).json({
                    errors:{msg: 'El email que intenta actualizar ya existe'}
                });
            }

        }
        const dataCliente = {
            nombres: data.nombres, 
            apellidoPaterno: data.apellidoPaterno, 
            apellidoMaterno: data.apellidoMaterno, 
            domicilio: data.domicilio,
            email
        }        
        
        // Busca el cliente y lo actualiza
        const cliente = await Cliente.findByIdAndUpdate( id, dataCliente, {new:true} );
        
        // Retornar el cliente
        res.json({
            data: cliente,
        })
    
    } catch(err){
        console.log(err);
        res.status(500).json({
            errors:{msg: "Pongase en contacto con el administrador de la BD"}
        })
    }
}
const eliminarCliente = async ( req , res = response ) =>{

    const { id } = req.params;

    // const clienteEliminado = await Cliente.findByIdAndUpdate(id, {estado: false}, {new:true});
    const clienteEliminado = await Cliente.findByIdAndDelete(id);
    
    
    res.json({
        data: clienteEliminado
    })
}


module.exports = {
    mostrarClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
    mostrarJWT,
    mostrarClienteId
}