/**
 * @file models/credito.model.js
 * @description Queries y funciones para la entidad crédito: creación, consulta de saldos y pagos.
 * @exports: funciones que interactúan con la tabla de créditos.
 */

const pool = require("../config/db");

const crearCredito = async (id_cliente, monto, fecha_inicio, fecha_vencimiento, tasa_interes) => {
    const query = "INSERT INTO credito (id_cliente, monto, fecha_inicio, fecha_vencimiento, tasa_interes) VALUES (?, ?, ?, ?, ?)";
    return pool.query(query, [id_cliente, monto, fecha_inicio, fecha_vencimiento, tasa_interes]);
};

const obtenerCreditos = async () => {
    return pool.query("SELECT * FROM credito");
};

const eliminarCredito = async (id) => {
    return pool.query("DELETE FROM credito WHERE id_credito = ?", [id]);
};


module.exports = { crearCredito, obtenerCreditos, eliminarCredito };
