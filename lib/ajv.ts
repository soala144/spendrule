import Ajv from "ajv";
import contractsphereSchema from "../spendrule-Validation.json" assert { type: "json" };
import validationEngineSchema from "../spendrule-contractsphere.json" assert { type: "json" };
import intelligenceSchema from "../spendrule-Intelligence-json.json" assert { type: "json" };

const ajv = new Ajv({ allErrors: true, strict: false });

export function validateContractSphere(data: unknown) {
  const validate = ajv.compile(contractsphereSchema as object);
  const valid = validate(data);
  return { valid, errors: validate.errors };
}

export function validateValidationRequest(data: unknown) {
  const validate = ajv.compile(validationEngineSchema as object);
  const valid = validate(data);
  return { valid, errors: validate.errors };
}

export function validateIntelligence(data: unknown) {
  const validate = ajv.compile(intelligenceSchema as object);
  const valid = validate(data);
  return { valid, errors: validate.errors };
}