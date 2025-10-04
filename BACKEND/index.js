/**
 * @file index.js
 * @description Ruta mínima/healthcheck del backend. Responde en `/` con un mensaje simple para verificar que el servidor está activo.
 */

app.get("/", (req, res) => {
    res.send("Backend en funcionamiento ✅");
  });
