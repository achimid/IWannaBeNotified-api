
const swagger = require('express-swagger-generator')

function startup (app) {

    const expressSwagger = swagger(app)

    const options = {
        swaggerDefinition: {
            info: {
                description: '',
                title: 'NotifyMe',
                version: process.env.npm_package_version
            },
            host: process.env.SWAGGER_URL,
            produces: [
                'application/json',
                'application/xml'
            ],
            schemes: [process.env.SWAGGER_SCHEMES],
            securityDefinitions: {
                Bearer: {
                    type: 'JWT',
                    in: 'header',
                    name: 'Authorization',
                    description: ''
                }
            }
        },
        basedir: __dirname,
        files: ['../**/*.js'],
        route: {
            url: '/api/v1/docs',
            docs: '/api/v1/docs.json'
        }
    }

    expressSwagger(options)
}

module.exports = { startup }
