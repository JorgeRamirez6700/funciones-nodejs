const mysql = require('mysql2');

class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err) return reject(err);
                resolve();
            });
        });
    }
}

class CRUD {
    constructor(db, table) {
        this.db = db;
        this.table = table;
    }

    insert(data) {
        return this.db.query(`INSERT INTO ${this.table} SET ?`, data);
    }

    update(id, data) {
        return this.db.query(`UPDATE ${this.table} SET ? WHERE id = ?`, [data, id]);
    }

    delete(id) {
        return this.db.query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
    }

    find(id) {
        return this.db.query(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
    }

    findAll() {
        return this.db.query(`SELECT * FROM ${this.table}`);
    }
}

// Uso de la clase
const db = new Database({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

const users = new CRUD(db, 'users');

// Ejemplo de insert para datos, no lo probe bien :(
users.insert({ name: 'John Doe', email: 'john@example.com' })
    .then(result => console.log('Inserted:', result))
    .catch(err => console.error(err));
