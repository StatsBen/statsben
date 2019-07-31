import React from "react";
import { storage } from "../../authentication/firebase";
import { css } from "@emotion/core";

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      storage: storage.ref()
    };
  }

  handleUpload(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div id="image-uploader" className="editor-section">
        <label htmlFor="uploader">Add an image: </label>
        <input
          name="uploader"
          type="file"
          accept="image/jpg"
          onChange={this.handleUpload}
        />

        {this.state.images.map((img, i) => {
          return (
            <div key={`img-${i}`} css={css``}>
              I an image: {img}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ImageUploader;
