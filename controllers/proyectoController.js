const Proyecto = require("../models/Proyecto");

exports.crearProyecto = async (req, res, next) => {
  try {
    // crear un nuevo proyecto
    const proyecto = new Proyecto(req.body);

    // Guardar el creador via JWT
    proyecto.creador = req.usuario.id;

    //guardamos el proyecto
    proyecto.save();
    res.json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

// OBtiene todos los proyecto del usuario actual
exports.obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
      creado: -1,
    });
    res.json({ proyectos });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// actualiza un proyecto
exports.actualizarProyecto = async (req, res) => {
  // extraer la informacion del proyecto
  const { nombre } = req.body;
  const nuevoProyecto = {};

  if (nombre) {
    nuevoProyecto.nombre = nombre;
  }

  try {
    //revisar el id
    let proyecto = await Proyecto.findById(req.params.id);
    //si el proyecto existe o no
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado " });
    }
    //verifica el creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }
    // actualizar
    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoProyecto },
      { new: true }
    );
    res.json({ proyecto });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};

// Eliminar por _id

exports.eliminarProyecto = async (req, res) => {
  try {
    //revisar el id
    let proyecto = await Proyecto.findById(req.params.id);
    //si el proyecto existe o no
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado " });
    }
    //verifica el creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    //eliminar el proyecto

    await Proyecto.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Proyecto eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};
