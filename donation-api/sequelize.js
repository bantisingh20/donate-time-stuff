 
const { Sequelize, DataTypes } = require('sequelize');
 
const sequelize = new Sequelize('test', 'snpl', 'setu@123', {
    host: '52.175.73.49',  
    dialect: 'mssql',   
    //port: 1433,         
    dialectOptions: {
        options: {
            encrypt: true,  
            trustServerCertificate: true,  
        }
    },
    logging: false, 
});
  
async function testConnection() {
    try {
        await sequelize.authenticate(); 
        console.log('Connection to the database has been established successfully.');
     
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

 
testConnection();
 
 
 

module.exports = {sequelize};
