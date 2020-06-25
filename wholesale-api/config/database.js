import couchdbConfig from './couchdbConfig';

// Databases names
var couchdb = {
    clients: null,
    employees: null,
    products: null,
    orders: null
};

const nano = require('nano')(couchdbConfig.url);

export async function createDatabases() {
    Object.keys(couchdb).forEach(async (key) => {
        try {
            await nano.db.create(key);
            console.log(`Database ${key} - init`);
        } catch (err) {
            console.log(`Database ${key} already exists`);
        }
    });
}
