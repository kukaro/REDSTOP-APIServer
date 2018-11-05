const swaggerJSDoc  = require('swagger-jsdoc');
const swaggerUi     = require('swagger-ui-express');

// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
var swaggerDefinition = {
    info: {                                             // API informations (required)
        title: 'REDSTOP API',                            // Title (required)
        version: '1.0.0',                               // Version (required)
        description: 'This is API Specification for REDSTOP\n오늘 하루도 힘을 냅시다 :)', // Description (optional)
    },
    host: "52.79.221.114:3000",
    basePath: "/api/v1"                                     // v1,v2... 확장가능(swaggerDefinition,swaggerSpec도 버전별로 따로 생성해야 함)
};

// Options for the swagger docs
var options = {
    swaggerDefinition: swaggerDefinition,               // Import swaggerDefinitions
    apis: [                                             // Path to the API docs
        'routes/api/*.js'                                 // v1,v2... 확장가능(swaggerDefinition,swaggerSpec도 버전별로 따로 생성해야 함)
    ]
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
// 여기서 위에서 정의한 swaggerSpec을 export 시킨다.
var swaggerSpec = module.exports.swaggerSpec = swaggerJSDoc(options);

// Swagger UI
module.exports.swaggerUi = swaggerUi;
