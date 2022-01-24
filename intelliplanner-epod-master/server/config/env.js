const env = {
  database: 'epod',
  username: 'root',
  password: 'root',
  // host: '157.230.91.154',
  host: '127.0.0.1',
  dialect: 'mysql',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
};

module.exports = env;