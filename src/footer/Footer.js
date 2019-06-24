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
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:ben.clark456@gmail.com"
          >
            Email
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/StatsBen"
          >
            GitHub
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/ben-clark-970907101/"
          >
            LinkedIn
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/splittercracks/"
          >
            Instagram
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.facebook.com/ben.clark456"
          >
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
