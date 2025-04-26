 
const { Sequelize, DataTypes } = require('sequelize');
 
const sequelize = new Sequelize('TestDB', 'snpl', 'setu@123', {
    host: '172.18.0.4',  
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
 
// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');  
//  }).catch((error) => {
//     console.error('Unable to connect to the database: ', error);
//  });

async function testConnection() {
    try {
        await sequelize.authenticate(); 
        console.log('Connection to the database has been established successfully.');
     
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

 
testConnection();
 
 
 

module.exports = sequelize;
