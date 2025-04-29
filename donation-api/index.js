const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./sequelize'); 
 
const generateSwaggerSpec = require('./swaggerConfig');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const { route } = require('./Routes/user.routes');
const router = require('./Routes/user.routes');
const app = express(); 
 
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(generateSwaggerSpec()));
const PORT = process.env.PORT || 3000;   
require('dotenv').config(); 
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 
app.use('/api',router)
 
async function startServer() {
    try {
  
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
