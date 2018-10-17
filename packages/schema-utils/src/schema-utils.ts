import * as Ajv from 'ajv'; // https://github.com/epoberezkin/ajv

const ajv = new Ajv();

const ajvDefaults = new Ajv({
  useDefaults: true,
});

interface InterfaceSchema {
  $schema: string;
  type: string;
  [k: string]: any;
}

/**
 * Validate Schema itself (metaSchema)
 * Validates against contents of the `$schema` field
 * @link https://github.com/epoberezkin/ajv#validateschemaobject-schema---boolean
 */
export function validateSchema(schema: InterfaceSchema): {
  ok: boolean,
  message: string,
} {
  const isSchemaValid: boolean = ajv.validateSchema(schema);
  return {
    ok: isSchemaValid,
    message: isSchemaValid
      ? ''
      : `Schema itself is not valid. ${ajv.errorsText()}`,
  };
}

/**
 * Validate Schema and Assign Defaults
 * Any `default` on properties will be added if that property is absent
 * @link https://github.com/epoberezkin/ajv#assigning-defaults
 * @param {Object} schema - JSON Schema
 * @param {Object} data - Data to validate
 * @return {{ok: boolean, message: string, data: Object}} - Results
 */
export function validateSchemaAndAssignDefaults(schema: InterfaceSchema, data: object): {
  ok: boolean,
  message: string,
  data: object, // @todo look into using "generics" to keep type info from original `data` param
} {
  const { ok, message } = validateSchema(schema);
  if (!ok) {
    return {
      ok: false,
      message,
      data,
    };
  }

  const newData = Object.assign({}, data);
  // This `validate` function mutates `newData`, so that's why we created a new object above first.
  const isValid: boolean = !!ajvDefaults.validate(schema, newData);
  return {
    ok: isValid,
    message: isValid ? '' : ajvDefaults.errorsText(),
    data: newData,
  };
}

/**
 * Validate Data against Schema
 * @link https://github.com/epoberezkin/ajv
 */
export function validateDataAgainstSchema(schema: InterfaceSchema, data: object): {
  ok: boolean,
  message: string,
} {
  const { ok, message } = validateSchema(schema);
  if (!ok) {
    return {
      ok: false,
      message,
    };
  }

  const isValid = !!ajv.validate(schema, data);
  return {
    ok: isValid,
    message: isValid ? '' : ajv.errorsText(),
  };
}
