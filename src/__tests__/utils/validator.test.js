import { validator } from "../../utils/validator";
import { validEntry as e } from "../demo-entries/demo-valid-entry";

test("correctly validates a valid entry attribute", () => {
  expect(validator.validateEntryAttributeByName(e, "name")).toBe(true);
});
