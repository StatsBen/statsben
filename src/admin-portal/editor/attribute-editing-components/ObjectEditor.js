require("react");
import TextInput from "./TextInput";
import ToggleButton from "./ToggleButton";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globals } from "../../../globals";
import { formatter } from "../../../utils/formatter";

const ObjectEditor = props => {
  const { name, contents } = props;
  const defn = globals.entryDefinition.attributes.find(attr => {
    return attr.name == name;
  });

  const callParentChangeHandler = props.handleChange;

  const handleChange = event => {
    const target = event.target;
    const name = target.name.slice(6);
    const value = target.type === "checkbox" ? target.checked : target.value;
    let updatedObject = contents;
    updatedObject[name] = value;
    callParentChangeHandler(updatedObject);
  };

  const Header = () => {
    return (
      <h3
        css={css`
          margin: 0;
          padding: 0;
        `}
      >{`Edit ${formatter.toSentenceCase(name)}: `}</h3>
    );
  };

  const containerCSS = css`
    float: none;
    clear: both;
    width: 100%;
    margin: 50px 0 30px 0;
  `;

  return (
    <div css={containerCSS}>
      <Header />
      <br />
      {defn.objectFields.map(attr => {
        switch (attr.type) {
          case "boolean":
            return (
              <ToggleButton
                key={`toggle-for-${attr.name}`}
                label={attr.name}
                checked={contents[attr.name]}
                handleChange={handleChange}
              />
            );

          default:
            return (
              <TextInput
                key={`text-input-for-${attr.name}`}
                label={attr.name}
                contents={contents[attr.name]}
                type={attr.unit ? attr.unit : attr.type}
                handleChange={handleChange}
              />
            );
        }
      })}
      <div
        css={css`
          float: none;
          clear: both;
        `}
      />
    </div>
  );
};

export default ObjectEditor;
