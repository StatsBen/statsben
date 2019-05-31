import React from "react";
import DetailsEditor from "./DetailsEditor";
import HTMLWriter from "./HTMLWriter";
import TagsEditor from "./TagsEditor";
import EntriesSelector from "./entries-selector/EntriesSelector";
import { firestore } from "../../authentication/firebase";
import { tidyEntry, validateEntry } from "../../utils";
import "./styles/editor.css";

class Editor extends React.Component {
  constructor(props) {
    super(props);

    let entryAttributes = ["Name", "Date", "Color", "Theme", "Featured Text"];

    let currentEntry = {};
    entryAttributes.map(attr => {
      currentEntry[attr] = "";
    });

    currentEntry["html"] = "";
    currentEntry["tags"] = [];
    currentEntry["Is Featured"] = false;
    currentEntry["Show By Default"] = true;

    this.state = { entryAttributes, currentEntry };
  }

  unsubscribeFromFirestore = null;

  componentDidMount = async () => {
    this.unsubscribeFromFirestore = await firestore
      .collection("entries")
      .onSnapshot(snapshot => {
        const entries = snapshot.docs.map(doc => tidyEntry(doc));
        this.setState({ entries });
      });
  };

  loadEntry = entry => {
    let newEntry = {};

    this.state.entryAttributes.map(attr => {
      if (entry[attr]) {
        newEntry[attr] = entry[attr];
      } else {
        newEntry[attr] = "";
      }
    });

    newEntry["html"] = entry["html"];
    newEntry["tags"] = entry["tags"];
    newEntry["Is Featured"] = entry["Is Featured"];
    newEntry["Show By Default"] = entry["Show By Default"];

    this.setState({
      currentEntry: newEntry,
      oldName: entry.Name,
      revising: true
    });
  };

  resetWriter = () => {
    let newEntry = {};
    this.state.entryAttributes.map(attr => {
      newEntry[attr] = "";
    });
    newEntry["html"] = "";
    newEntry["tags"] = [];
    newEntry["Is Featured"] = false;
    newEntry["Show By Default"] = true;
    this.setState({ currentEntry: newEntry, oldName: null, revising: false });
    this.render();
  };

  handleChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let newEntry = this.state.currentEntry;
    newEntry[name] = value;
    this.setState({ currentEntry: newEntry });
  };

  submitNewEntry = event => {
    event.preventDefault();
    let { errors, entry } = validateEntry(this.state.currentEntry);

    if (errors.length) {
      errors.map(err => alert(err.message));
    } else {
      firestore
        .collection("entries")
        .doc(entry.Name)
        .set(entry);
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
    let { errors, entry } = validateEntry(this.state.currentEntry);

    if (errors.length) {
      errors.map(err => alert(err.message));
    } else {
      firestore
        .collection("entries")
        .doc(this.state.oldName)
        .set({ ...entry });
      this.resetWriter();
    }
  };

  addTag = tag => {
    // Maybe add some checks here to make sure it's real and works???
    // Add a check for uniqueness too!
    let newEntry = this.state.currentEntry;
    newEntry.tags.push(tag);
    this.setState({ currentEntry: newEntry });
  };

  removeTag = tagToKill => {
    let allTags = this.state.currentEntry.tags;

    let i = allTags.indexOf(tagToKill);

    if (i < 0) {
      // Error, tag not found :/ do something... TODO
    }

    allTags.splice(i, 1);

    let newEntry = this.state.currentEntry;
    newEntry.tags = allTags;
    this.setState({ currentEntry: newEntry });
  };

  render() {
    return (
      <div id="editor-container">
        <div id="main-editor">
          <h1>Write an Entry</h1>
          <form>
            <DetailsEditor
              currentEntry={this.state.currentEntry}
              resetWriter={this.resetWriter}
              handleChange={this.handleChange}
              submitNewEntry={this.submitNewEntry}
              updateEntry={this.updateEntry}
              revising={this.state.revising}
            />

            <HTMLWriter
              handleChange={this.handleChange}
              contents={this.state.currentEntry.html}
            />

            <TagsEditor
              tags={this.state.currentEntry.tags}
              addTag={this.addTag}
              removeTag={this.removeTag}
            />

            <div className="editor-section">
              <input
                name="finish-button"
                type="submit"
                value="Commit"
                className="entry-button"
                onClick={
                  this.state.revising ? this.updateEntry : this.submitNewEntry
                }
              />

              <div
                style={{
                  position: "relative",
                  float: "none",
                  clear: "both",
                  width: "100%"
                }}
              />
            </div>
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
