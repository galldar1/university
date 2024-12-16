import swaggerAutogen from 'swagger-autogen'

const outputFile = './swagger/swagger-output.json' // Output file for Swagger JSON
const endpointsFiles = ['./app.js'] // Entry point of your routes

const doc = {
	info: {
		title: 'Educational Institutions API',
		description: 'API documentation for managing educational institutions',
	},
	host: 'localhost:3000', // Replace with your host
	schemes: ['http'],
	basePath: '/',
	definitions: {
		Institution: {
			id: 1,
			name: 'Institution Name',
			address: '123 Main St',
		},
	},
}

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
	console.log('Swagger documentation generated!')
})
