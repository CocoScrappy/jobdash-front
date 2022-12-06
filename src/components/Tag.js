import "../css/components/Card.css";
import React from "react";

const Tag = ({ tag }) => {
  const getBGColor = () => {
    if (tag === "hybrid") return "rgb(233 255 232)";
    if (tag === "remote") return "rgb(255 242 199)";
    if (tag === "in-person") return "rgb(255 232 236)";
  };

  const getColor = () => {
    if (tag === "hybrid") return "rgb(23 117 9)";
    if (tag === "remote") return "rgb(111 103 11)";
    if (tag === "in-person") return "rgb(169 47 68)";
  };

  return (
    <p
      className="small tag-colored"
      style={{
        backgroundColor: getBGColor(),
        color: getColor(),
      }}
    >
      {tag}
    </p>
  );
};

export default Tag;
