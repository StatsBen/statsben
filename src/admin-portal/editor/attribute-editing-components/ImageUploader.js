import React from "react";
import { globals } from "../../../globals";
import { storage } from "../../../authentication/firebase";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);

    this.inputElement = React.createRef();

    this.state = {
      images: [],
      storage: storage.ref(),
      awaitingUpload: false
    };
  }

  handleDownloadLinkArrival = (url, name) => {
    this.setState(state => {
      state.images.push({ name: name, src: url });
      return { images: state.images, awaitingUpload: false };
    });
  };

  handleUpload = snapshot => {
    const name = snapshot.metadata.name;
    snapshot.ref.getDownloadURL().then(urlResult => {
      this.handleDownloadLinkArrival(urlResult, name);
    });
  };

  handleSelect = event => {
    event.preventDefault();
    this.setState({ awaitingUpload: true });
    const imgElement = this.inputElement.current;
    const file = imgElement.files[0] || imgElement.file;
    const fn = file.name;
    const storageRef = storage
      .ref()
      .child("images")
      .child(fn);
    storageRef.put(file).then(snapshot => {
      this.handleUpload(snapshot);
    });
  };

  render() {
    return (
      <div
        id="image-uploader"
        css={css`
          padding: 20px 0 20px 10%;
          width: 90%;
        `}
      >
        <label htmlFor="uploader">Add an image: </label>
        <input
          name="uploader"
          type="file"
          accept="image/jpg"
          onChange={this.handleSelect}
          ref={this.inputElement}
        />

        {this.state.awaitingUpload ? <div>Uploading...</div> : null}

        {this.state.images.map((img, i) => {
          return (
            <div
              key={`img-${i}`}
              css={css`
                float: none;
                clear: both;
                width: 90%;
                margin: 5px 0 5px 0;
                padding: 5px 5% 5px 5%;
                background: ${globals.colours.lightBlue};
                border: thin solid ${globals.colours.lightGray};
                border-radius: ${globals.sizes.entryPageBorderRadius};
              `}
            >
              <span>{img.name} : </span>
              <br />
              <code
                css={css`
                  font-size: 0.8em;
                `}
              >
                {`<img class='' alt='' src='${img.src}' />`}
              </code>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ImageUploader;
