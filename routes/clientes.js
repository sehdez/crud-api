const { Router } = require('express');
const { check } = require('express-validator');

const { mostrarClientes, 
        crearCliente, 
        actualizarCliente, 
        eliminarCliente, 
        mostrarJWT } = require('../controllers/clientes');
const { clienteExiste } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// id, nombres, apellido paterno, apellido materno, 
// domicilio y correo electrónico.
// nombres apellidoPaterno apellidoMaterno domicilio email estado

router.get('/token/',[
    check('id','El id es requerido' ).not().isEmpty(),
    check('id', 'El id no es válido').isMongoId(),
    validarCampos,
    check('id').custom(clienteExiste),
    validarCampos
],mostrarJWT );


router.get('/',[
    check('x-token','El token es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos
], mostrarClientes );

// Voy a ir a beber agua xD

router.post('/',[
    // Validaciones necesarias
    check('x-token','El token es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos,
    check('nombres', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidoPaterno', 'Es obligatorio el apellido Paterno').not().isEmpty(),
    check('apellidoMaterno', 'Es obligatorio el apellido Materno').not().isEmpty(),
    check('domicilio', 'Es obligatorio el domicilio').not().isEmpty(),
    check('email', 'Es obligatorio el email').not().isEmpty(),
    check('email', 'Es formato del email no es correcto').isEmail(),
    validarCampos
], crearCliente );

// Tenemos que recibir el token del cliente que hará la actualización, y el id del cliente que se tiene que eliminar
router.put('/:id',[
    check('x-token','El token es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos,
    check('id', 'Es obligatorio el id').not().isEmpty(),
    check('id', 'El id no es válido').isMongoId(),
    validarCampos,
    check('id').custom(clienteExiste),
    validarCampos,
    check('nombres', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidoPaterno', 'Es obligatorio el apellido Paterno').not().isEmpty(),
    check('apellidoMaterno', 'Es obligatorio el apellido Materno').not().isEmpty(),
    check('domicilio', 'Es obligatorio el domicilio').not().isEmpty(),
    check('email', 'Es obligatorio el email').not().isEmpty(),
    check('email', 'Es formato del email no es correcto').isEmail(),
    validarCampos
], actualizarCliente );


router.delete('/:id',[
    check('x-token','El token es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos,
    check('id', 'Es obligatorio el id').not().isEmpty(),
    check('id', 'El id no es válido').isMongoId(),
    validarCampos,
    check('id').custom(clienteExiste),
    validarCampos,
], eliminarCliente );



module.exports = router;