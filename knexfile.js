// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/dev.sqlite3'
    },
    migrations: {
      directory: "./database/migrations"
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user: process.env.USER,
      password: process.env.PASSWORD,
      DATABASE_URL: process.env.DATABASE_URL
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user: process.env.USER,
      password: process.env.PASSWORD,
      DATABASE_URL: process.env.DATABASE_URL
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
console.log(process.env.PASSWORD)