import Ajv from 'ajv'

 class SchemaValidator {
    constructor(){
        this.ajv = new Ajv({
        allErrors: true,
        useDefaults: true,
        })
    }

    validate (data, schema) {
        // throws error or returns the data
        const compiler = this.ajv.compile(schema)
        compiler(data)
        if (compiler.errors) {
            console.error(JSON.stringify(compiler.errors))
            throw new Error('Invalid schema: Ensure you have followed the sample text file format')
        } else {
            return data
        }

    }
 }

 export default SchemaValidator