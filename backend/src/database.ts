import { PoolConfig, Pool } from 'pg';
import bcrypt from 'bcryptjs';

const {
    SUPERUSER_USERNAME,
    SUPERUSER_PASSWORD,
    SUPERUSER_AUTH_LEVEL,
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD
} = process.env;

let config: PoolConfig;


config = {
    host: POSTGRES_HOST,
    port: parseInt(POSTGRES_PORT as string),
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    }
};
const db = new Pool(config);

// Create superuser if it doesn't exist
(async () => {
    try {
        const check_sql = 'SELECT * FROM users WHERE username = ($1)';
        const conn = await db.connect();
        if (!(await conn.query(check_sql, [SUPERUSER_USERNAME])).rowCount) {
            const sql = 'INSERT INTO users (auth_level, first_name, last_name, username, password_digest) VALUES($1, $2, $3, $4, $5)';
            await conn.query(sql, [SUPERUSER_AUTH_LEVEL, 'Super', 'User', SUPERUSER_USERNAME, bcrypt.hashSync((SUPERUSER_PASSWORD as string) + process.env.BCRYPT_PASSWORD, parseInt(process.env.SALT_ROUNDS as string))]);
        }
    } catch (err) {
        throw new Error(`Could not create superuser. ${err}`);
    }
})();

export default db;