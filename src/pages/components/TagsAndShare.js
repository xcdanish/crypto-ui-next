import React from "react";
import { Button } from "reactstrap";

const TagsAndShare = () => {
  const tags = [
    "ai",
    "crypto",
    "dashboard",
    "figma",
    "finance",
    "saas",
    "ui",
    "ui kit",
    "web app",
    "web design",
    "website",
    "web template",
  ];

  return (
    <div>
      <div>
        <h5>Tags</h5>
        <div className="tags">
          {tags.map((tag, index) => (
            <Button
              key={index}
              outline
              color="secondary"
              className="tag-button"
              style={{
                margin: "5px",
                borderColor: "#d3d3d3", // Light gray border color
                color: "black", // Text color black
              }}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
      <hr style={{ margin: "20px 0", borderColor: "#d3d3d3" }} />
      <div className="share-section">
        <h5>Share</h5>
        <div className="share-buttons">
          <Button
            outline
            color="primary"
            className="share-button"
            style={{
              margin: "5px",
              borderColor: "#d3d3d3", // Light gray border color
              color: "black", // Text color black
            }}
          >
            🔗
          </Button>
          <Button
            outline
            color="success"
            className="share-button"
            style={{
              margin: "5px",
              borderColor: "#d3d3d3", // Light gray border color
              color: "black", // Text color black
            }}
          >
            🖤
          </Button>
          <Button
            outline
            color="info"
            className="share-button"
            style={{
              margin: "5px",
              borderColor: "#d3d3d3", // Light gray border color
              color: "black", // Text color black
            }}
          >
            👍
          </Button>
        </div>
      </div>
      <hr style={{ margin: "20px 0", borderColor: "#d3d3d3" }} />
      <div className="additional-info">
        <div className="figma-info">
          <Button
            outline
            color="secondary"
            className="tag-button"
            style={{
              margin: "5px",
              borderColor: "#d3d3d3", // Light gray border color
              color: "black", // Text color black
            }}
          >
            🔗
          </Button>{" "}
          For Figma
        </div>
        <hr style={{ margin: "20px 0", borderColor: "#d3d3d3" }} />
      </div>
    </div>
  );
};

export default TagsAndShare;
