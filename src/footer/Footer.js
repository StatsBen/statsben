import React from "react";
import "./footer.css";

class Footer extends React.Component {
  render() {
    return (
      <div id="footer">
        <div id="footer-full-width-messages">
          <span id="message-1">Website by Ben Clark - April, 2019</span>
          <span id="message-2">All images by Ben Clark</span>
        </div>
        <div id="footer-links">
          <a target="_blank" href="www.google.com">
            Email
          </a>
          <a target="_blank" href="www.google.com">
            GitHub
          </a>
          <a target="_blank" href="www.google.com">
            LinkedIn
          </a>
          <a target="_blank" href="www.google.com">
            Instagram
          </a>
          <a target="_blank" href="www.google.com">
            facebook
          </a>
        </div>
        <div id="lil-version-number">
          <span>version 0.9.9</span>
        </div>
        <div style={{ float: "none", clear: "both", width: "100%" }} />
      </div>
    );
  }
}

export default Footer;
