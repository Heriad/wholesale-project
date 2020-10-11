import couchdbConfig from './couchdbConfig';
import { createAdmin } from './adminConfig';

// Databases names
var couchdb = {
    clients: null,
    employees: null,
    admins: null,
    products: null,
    orders: null
};

const nano = require('nano')(couchdbConfig.url);
const databaseAdmins = nano.db.use(couchdbConfig.dbAdmins);

export async function createDatabases() {
    Object.keys(couchdb).forEach(async (key) => {
        try {
            await nano.db.create(key);
            console.log(`Database ${key} - init`);
            if (key === couchdbConfig.dbAdmins) {
                const admin = await createAdmin();
                await databaseAdmins.insert(admin);
            }
        } catch (err) {
            console.log(`Database ${key} already exists`);
        }
    });
}
