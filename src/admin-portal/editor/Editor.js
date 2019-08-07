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

class Editor extends React.Component {
  constructor(props) {
    super(props);

    let currentEntry = {};
    const defn = globals.entryDefinition;

    defn.attributes.map(attr => {
      if (attr.type == "object") {
        let newObj = {};
        attr.objectFields.map(n => {
          newObj[n.name] = null;
        });
        currentEntry[attr.name] = newObj;
      } else {
        currentEntry[attr.name] = null;
      }
    });

    this.state = { currentEntry };
  }

  unsubscribeFromFirestore = null;

  componentDidMount = async () => {
    // this.unsubscribeFromFirestore = await firestore
    //   .collection("entries")
    //   .orderBy("dateUTC", "desc")
    //   .onSnapshot(snapshot => {
    //     const entries = snapshot.docs;
    //     this.setState({ entries });
    //   });
  };

  loadEntry = entry => {
    // STUB

    this.setState(entry);
    // let newEntry = {};
    //
    // this.entryAttributes.map(attr => {
    //   if (entry[attr]) {
    //     newEntry[attr] = entry[attr];
    //   } else {
    //     newEntry[attr] = "";
    //   }
    // });
    //
    // newEntry["html"] = entry["html"];
    // newEntry["tags"] = entry["tags"];
    // newEntry["Is Featured"] = entry["Is Featured"];
    // newEntry["Show By Default"] = entry["Show By Default"];
    //
    // this.setState({
    //   currentEntry: newEntry,
    //   oldName: entry.Name,
    //   revising: true
    // });
  };

  resetWriter = () => {
    let currentEntry = {};
    const defn = globals.entryDefinition;
    defn.attributes.map(attr => {
      currentEntry[attr.name] = null;
    });

    this.setState({ currentEntry, revising: false });
    this.render();
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
    // let { errors, entry } = validateEntry(this.state.currentEntry);
    //
    // if (errors.length) {
    //   errors.map(err => alert(err.message));
    // } else {
    //   firestore
    //     .collection("entries")
    //     .doc(entry.Name)
    //     .set(entry);
    //   this.resetWriter();
    // }
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
    // let { errors, entry } = validateEntry(this.state.currentEntry);
    //
    // if (errors.length) {
    //   errors.map(err => alert(err.message));
    // } else {
    //   firestore
    //     .collection("entries")
    //     .doc(this.state.oldName)
    //     .set({ ...entry });
    //   this.resetWriter();
    // }
  };

  render() {
    return (
      <div>
        <div
          css={css`
            width: 90%;
            margin: 0 5% 0 5%;
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

          <EntriesSelector
            entries={this.state.entries}
            loadEntry={this.loadEntry}
            deleteEntry={this.deleteEntry}
          />
        </div>
      </div>
    );
  }
}

export default Editor;
