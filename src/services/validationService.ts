import Ajv, { SchemaObject } from 'ajv';
const ajv = new Ajv()

const validate = (data: unknown, schema: SchemaObject) => {
    const validate = ajv.compile(schema);
    const valid = validate(data);

    if (!valid) {
        return { valid, errors: validate.errors }; // Use validate.errors here
    } else {
        return { valid };
    }
};

export default { validate };
