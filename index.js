const express = require("express");
const conectarDB = require("./database");
const cors = require("cors");

// Server
const app = express();

// Conect to db
conectarDB();

// Active cors - Middleware global
app.use(cors());

// Active json -- Middleware global
app.use(express.json({ extended: true }));

// Declaration of the app
const PORT = process.env.PORT || 4000;

//import routes
app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));

// Turn On the sv
app.listen(PORT, "0.0.0.0", () => {
  console.log(`The server is open in: ${PORT}`);
});
