// rutas para crear usuarios
const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectoController");
const auth = require("../middlewares/auth");

router.post("/", auth, proyectoController.crearProyecto);

router.get("/", auth, proyectoController.obtenerProyectos);

router.put("/:id", auth, proyectoController.actualizarProyecto);

router.delete("/:id", auth, proyectoController.eliminarProyecto);

module.exports = router;
