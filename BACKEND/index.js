/**
 * @file index.js
 * @description Ruta mínima/healthcheck del backend. Responde en `/` con un mensaje simple para verificar que el servidor está activo.
 */

// Intentamos cargar el pool de la base de datos; si no existe, pool será null y se reportará como desconectado.
const pool = (() => {
    try {
        return require('./config/db');
    } catch (err) {
        return null;
    }
})();

app.get("/", async (req, res) => {
    try {
        if (!pool) throw new Error('Pool de base de datos no encontrado');
        // Consulta ligera para verificar conectividad
        await pool.query('SELECT 1');
        res.json({
            ok: true,
            message: "Backend en funcionamiento ✅",
            db: "connected"
        });
    } catch (err) {
        res.json({
            ok: true,
            message: "Backend en funcionamiento ✅",
            db: "disconnected",
            error: err.message
        });
    }
});
