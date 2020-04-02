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
      tableName: 'knex_migrations',
      directory: "./database/migrations"
    }
  },

  production: {
    client: 'pg',
    connection: {
      DATABASE_URL: 'postgres://frneftcvosqcms:37ea7e005bc8b70bdde432d34dce240e2cc5a66324a8a8f3c1278109accca6cc@ec2-34-233-186-251.compute-1.amazonaws.com:5432/dcaqs1e7hlgmbe'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/database/migrations',
    }
  }
};

