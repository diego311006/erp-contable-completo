// CONFIGURACIÓN DE CONEXIÓN A MYSQL
const mysql = require('mysql2');

// Creamos el pool de conexiones usando el usuario root de XAMPP
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',               // Si creaste erp_user, usa 'erp_user'
  password: '',               // Si creaste erp_user, usa 'erp2026'
  database: 'erp_contable_de', // Tu base de datos con tus iniciales
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exportamos el pool como promesas para usar async/await
module.exports = pool.promise();