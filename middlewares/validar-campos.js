const { request } = require("express")
const { validationResult } = require("express-validator")


const validarCampos = ( req = request, res, next ) =>{

    errors = validationResult ( req );
    
    if ( !errors.isEmpty() ){
       return res.status(400).json(errors);
    }
    next();

}


module.exports = {
     validarCampos
}