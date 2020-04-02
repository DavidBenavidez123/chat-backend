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
    client: 'postgresql',
    connection: {
      database: 'dcaqs1e7hlgmbe',
      user: 'frneftcvosqcms',
      password: '37ea7e005bc8b70bdde432d34dce240e2cc5a66324a8a8f3c1278109accca6cc'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: './database/migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'dcaqs1e7hlgmbe',
      user: 'frneftcvosqcms',
      password: '37ea7e005bc8b70bdde432d34dce240e2cc5a66324a8a8f3c1278109accca6cc'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: './database/migrations'
    }
  }

};
