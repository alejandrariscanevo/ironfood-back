const express = require('express');
const router = express.Router();
//import las cosas importantes
const Recipes = require("../models/recipes")


/* GET Trainees page.
    C.R.U.D
    C = Create,
    R = Read,
    U = Update,
    D = Delete
    Obtener todas las propiedades
    crear la propiedad
    eliminar || ||
*/

// RUTA PARA CREAR
router.post("/", (req, res, next) => {
    //voy a sacar el id de la persona loggeada
    //para crear una propiedad (CASA)
    const { _id: _user} = req.user

    Recipes.create({...req.body, _user}).then((recipes) => {
        res.status(201).json({result:recipes})
    }).catch((err) => {
        res.status(400).json({msg:"Algo salio mal",err})
    })
})

//RUTA PARA LEER

router.get('/', (req, res, next) => {
    Recipes.find(req.query)
        .populate("_user", "email name")  // <------ Populate
        .then((recipes) => {
            res.status(200).json({result:recipes})
        })
        .catch((err) =>{
            res.status(400).json({msg:"algo salió mal", err})
        })
});

//TRAER SOLO UNO

router.get('/:id', (req, res, next) => {
    //req.params
    const {id} = req.params
    .populate("_user", "email name")  // <------ Populate
    Recipes.findById(id)
        .then((recipes) => {
            res.status(200).json({result:recipes})
        })
        .catch((err) =>{
            res.status(400).json({msg:"Something went wrong", err})
        })
});

//Editar (update)
// post patch

router.patch("/:id", (req,res,next) => {
    const {id} = req.params;
    Recipes.findByIdAndUpdate(id, req.body, { new : true })
        .populate("_user", "email name")
        .then((recipes) => {
            res.status(200).json({result:recipes})
        })
        .catch((err) => {
            res.status(400).json({msg:"Something went wrong", err})
        })

})

//delete

router.delete("/:id", (req,res,next) => {
    const {id} = req.params;
    Recipes.findByIdAndRemove(id)
        .then((recipes) => {
            res.status(200).json({msg: "The user has been removed"})
        })
        .catch((err) => {
            res.status(400).json({msg:"Something went wrong", err})
        })

})

module.exports = router;