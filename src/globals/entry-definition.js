import { types } from "./types";

const entryDefinition = {
  attributes: [
    { name: "name", type: "string" },
    { name: "dateString", type: "string" },
    { name: "dateUTC", type: "Date" },
    { name: "html", type: "longString" },
    {
      name: "grade",
      type: "object",
      objectFields: [
        { name: "commitment", type: "number", unit: "commitment" },
        { name: "distance", type: "number", unit: "km" },
        { name: "ice", type: "string", unit: "iceGrade" },
        { name: "scramble", type: "number", unit: "scrambleGrade" },
        { name: "vert", type: "number", unit: "m" }
      ]
    }
  ]
};

/* This builds the definition for types/categories programatically from
   the 'types.js' file. */
const typesDefn = { name: "types", type: "object", objectFields: [] };

types.map(type => {
  let typeDefn = { name: type, type: "boolean" };
  typesDefn.objectFields.push(typeDefn);
});

entryDefinition.attributes.push(typesDefn);

export { entryDefinition };
