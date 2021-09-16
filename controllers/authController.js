const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// const authCtrl = {};

exports.autenticarUsuario = async (req, res) => {
  // extraer el email y password
  const { email, password } = req.body;

  try {
    // revisar que el usuario este registrado
    let usuario = await Usuario.findOne({ email: email });
    if (!usuario) {
      return res.status(404).json({ mensaje: "El usuario no existe" });
    }

    // revisar el password

    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(404).json({ mensaje: "Password Incorrecto" });
    }

    // Si es correcto el password
    // creo el jwt y lo firmo
    const payload = {
      usuario: {
        id: usuario.id,
      },
    };

    //firmo jwt
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        //Mensaje de confirmacion
        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// obtiene que usuario esta autenticado
exports.usuarioAutenticado = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-password");
    res.json({ usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Hubo un error" });
  }
};
