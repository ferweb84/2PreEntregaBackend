import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import __dirname from "./utils.js";

const options = {
    swaggerOptions: {
        basePath: '/api'
    },
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            title: "E-commerce API",
            version: "1.0.0",
            description: "Api para el proyecto final de Coderhouse",
        },
    },
    apis: [`${__dirname}docs/../**/*.yaml`]
};

const swaggerSpecs = swaggerJSDoc(options);

export const swaggerRoute = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, { swaggerOptions: { basePath: '/api' } }));
};