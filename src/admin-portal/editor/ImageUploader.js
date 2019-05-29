import React from "react";

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div id="image-uploader" className="editor-section">
        <label htmlFor="uploader">Add an image</label>
        <input name="uploader" type="file" accept="image/jpg" />
      </div>
    );
  }
}

export default ImageUploader;
