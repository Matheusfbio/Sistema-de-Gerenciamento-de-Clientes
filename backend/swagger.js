const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API de Gerenciamento de Clientes",
      version: "1.0.0",
      description: "Documentação da API de gerenciamento de clientes",
    },
  },
  apis: ["src/routes/*.js"], // Onde encontrar os comentários JSDoc
};

const specs = swaggerJsdoc(options);

module.exports = specs;
