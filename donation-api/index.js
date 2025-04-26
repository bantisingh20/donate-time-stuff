const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./sequelize'); 
const CommonRoutes = require('./Router/Common.routes');  
const generateSwaggerSpec = require('./swaggerConfig');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const app = express(); 
 
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(generateSwaggerSpec()));
const PORT = process.env.PORT || 3000;   
require('dotenv').config();
 
app.use(bodyParser.json());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api', CommonRoutes);
 
async function startServer() {
    try {
 
        sequelize.sync({ force: false, alter: process.env.ALTER_REQUIRE }).then(() => {
            console.log('All Tables has been Created!');
        }).catch((error) => {
            console.error('Unable to create table : ', error);
        });
        
       
        app.listen(PORT, (err) => {
            if (err) {
                console.log('Error starting server:', err);
            } else {
                console.log(`Server running on http://localhost:${PORT}`);
                console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
            }
        });
    } catch (error) {
        console.error('Error syncing models:', error);
    }
}

startServer();
