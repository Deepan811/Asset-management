 
module.exports = {
    database: {
      dialect: 'postgres', 
      host: 'localhost',  
      username: 'postgres',
      password: 'admin',
      database: 'hello',
    },
    server: {
      port: process.env.PORT || 3000,
    },
  
  };
  