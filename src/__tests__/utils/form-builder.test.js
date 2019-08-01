/* eslint-disable */

import { globals } from "../../globals";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { formBuilder } from "../../utils/form-builder";

Enzyme.configure({ adapter: new Adapter() });

const attrs = globals.entryDefinition.attributes;

const nameDefn = attrs.find(attr => {
  return attr.name === "name";
});

const typesDefn = attrs.find(attr => {
  return attr.name === "types";
});

const alpDefn = typesDefn.objectFields.find(field => {
  return field.name === "alpine";
});

test("Build checkbox label from entry attribute", () => {
  const checkbox = Enzyme.shallow(
    formBuilder.makeInputElement(alpDefn, false, null)
  );
  let label = checkbox.find("label").text();

  expect(label).toEqual("Alpine");
});

test("Build checkbox input from entry attribute", () => {
  const checkbox = Enzyme.shallow(
    formBuilder.makeInputElement(alpDefn, false, null)
  );
  expect(checkbox.exists(`input[type="checkbox"]`)).toEqual(true);
});

test("Build text input label from entry attribute", () => {
  const text = Enzyme.shallow(formBuilder.makeInputElement(nameDefn, "", null));
  const label = text.find("label").text();
  expect(label).toEqual("Name");
});

test("Build text input from entry attribute", () => {
  const text = Enzyme.shallow(formBuilder.makeInputElement(nameDefn, "", null));
  expect(text.exists(`input[type="text"]`)).toEqual(true);
});
