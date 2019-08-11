import React from "react";
import EntriesSelector from "./entries-selector/EntriesSelector";
import HTMLWriter from "./attribute-editing-components/HTMLWriter";
import ObjectEditor from "./attribute-editing-components/ObjectEditor";
import SubmitButton from "./attribute-editing-components/SubmitButton";
import TextInput from "./attribute-editing-components/TextInput";
import ToggleButton from "./attribute-editing-components/ToggleButton";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { firestore } from "../../authentication/firebase";
import { globals } from "../../globals";
import { validator } from "../../utils/validator";
import { parser } from "../../utils/parser";

class Editor extends React.Component {
  constructor(props) {
    super(props);
    let currentEntry = this.getBlankEntry();
    this.state = { currentEntry, revising: false };
  }

  unsubscribeFromFirestore = null;

  componentDidMount = async () => {
    this.unsubscribeFromFirestore = await firestore
      .collection("entries")
      .orderBy("date", "desc")
      .onSnapshot(snapshot => {
        const entries = snapshot.docs.map(doc => {
          let entry = doc.data();
          try {
            let valid = validator.validateEntireEntry(entry);
            return valid ? entry : null;
          } catch (e) {
            console.error("Firebase returned an invalid entry: ");
            console.error(entry);
          }
        });
        this.setState({ entries });
      });
  };

  loadEntry = entry => {
    this.setState({ currentEntry: entry, oldName: entry.name, revising: true });
  };

  getBlankEntry = () => {
    let e = {};
    const defn = globals.entryDefinition;

    defn.attributes.map(attr => {
      if (attr.type == "object") {
        let newObj = {};
        attr.objectFields.map(n => {
          newObj[n.name] = null;
        });
        e[attr.name] = newObj;
      } else {
        e[attr.name] = null;
      }
    });

    return e;
  };

  resetWriter = () => {
    let currentEntry = this.getBlankEntry();
    this.setState({ currentEntry, revising: false, oldName: null });
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name.slice(6);
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState(state => {
      let newEntry = state.currentEntry;
      newEntry[name] = value;
      return { currentEntry: newEntry };
    });
  };

  handleChangeObject = (name, updatedObject) => {
    this.setState(state => {
      let newEntry = state.currentEntry;
      newEntry[name] = updatedObject;
      return { currentEntry: newEntry };
    });
  };

  handleSubmit = event => {
    this.state.revising ? this.updateEntry(event) : this.submitNewEntry(event);
  };

  submitNewEntry = event => {
    event.preventDefault();
    let valid = true;
    let parsedEntry = null;

    try {
      valid = validator.validateEntireEntry(this.state.currentEntry);
      parsedEntry = parser.parseEntireEntry(this.state.currentEntry);
    } catch (e) {
      console.error("Tried to update entry but it failed.");
      console.error("Entry was: ");
      console.error(this.state.currentEntry);
    }

    console.log("parsed entry is: ");
    console.log(parsedEntry);

    if (valid && parsedEntry != null) {
      firestore
        .collection("entries")
        .doc(this.state.currentEntry.name)
        .set(parsedEntry);
      this.resetWriter();
    }
  };

  deleteEntry = entryName => {
    if (confirm("You sure, bro?")) {
      firestore
        .collection("entries")
        .doc(entryName)
        .delete();
      this.resetWriter();
    }
  };

  updateEntry = event => {
    event.preventDefault();

    let valid = true;
    let parsedEntry = null;

    try {
      valid = validator.validateEntireEntry(this.state.currentEntry);
      parsedEntry = parser.parseEntireEntry(this.state.currentEntry);
    } catch (e) {
      console.error("Tried to update entry but it failed.");
      console.error("Entry was: ");
      console.error(this.state.currentEntry);
    }

    console.log("parsed entry is: ");
    console.log(parsedEntry);

    if (valid && parsedEntry != null) {
      firestore
        .collection("entries")
        .doc(this.state.oldName)
        .set(parsedEntry);
      this.resetWriter();
    }
  };

  render() {
    return (
      <div>
        <div
          css={css`
            width: 90%;
            margin: 0 5% 0 5%;
            text-align: center;
          `}
        >
          <h1>Write an Entry</h1>

          <form>
            {globals.entryDefinition.attributes.map(attr => {
              switch (attr.type) {
                case "boolean":
                  return (
                    <ToggleButton
                      key={`toggle-for-${attr.name}`}
                      label={attr.name}
                      checked={this.state.currentEntry[attr.name]}
                      handleChange={this.handleChange}
                    />
                  );

                case "html":
                  return (
                    <HTMLWriter
                      key={`writer-for-${attr.name}`}
                      contents={
                        this.state.currentEntry[attr.name]
                          ? this.state.currentEntry[attr.name]
                          : ""
                      }
                      handleChange={this.handleChange}
                    />
                  );

                case "object":
                  return (
                    <ObjectEditor
                      key={`object-editor-for-${attr.name}`}
                      name={attr.name}
                      contents={this.state.currentEntry[attr.name]}
                      handleChange={this.handleChangeObject}
                    />
                  );

                default:
                  return (
                    <TextInput
                      key={`text-input-for-${attr.name}`}
                      label={attr.name}
                      contents={this.state.currentEntry[attr.name]}
                      type={attr.type}
                      handleChange={this.handleChange}
                    />
                  );
              }
            })}

            <SubmitButton handleSubmit={this.handleSubmit} />
          </form>
        </div>

        <EntriesSelector
          entries={this.state.entries}
          loadEntry={this.loadEntry}
          deleteEntry={this.deleteEntry}
        />
      </div>
    );
  }
}

export default Editor;
