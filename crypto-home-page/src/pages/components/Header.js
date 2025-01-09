import React, { useState, useEffect } from "react";

function TabsComponent() {
  const [isFixed, setIsFixed] = useState(false);
  const [activeTab, setActiveTab] = useState("1"); // Default active tab

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTabClick = (tab, event) => {
    setActiveTab(tab);
    const section = document.getElementById(tab); // Scroll to the section with the matching ID
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`tabs-component ${isFixed ? "fixed-top" : ""}`}
      style={{
        backgroundColor: "white",
        boxShadow: isFixed ? "0px 2px 5px rgba(0, 0, 0, 0.1)" : "none",
        padding: "10px 0",
        zIndex: 1000,
      }}
    >
      <div className="tab-links d-flex justify-content-start">
        <button
          className={`tab-btn ${activeTab === "1" ? "active" : ""}`}
          onClick={(e) => handleTabClick("1", e)}
          style={{
            borderBottom: activeTab === "1" ? "3px solid black" : "none",
            color: activeTab === "1" ? "black" : "gray",
            cursor: "pointer",
            margin: "0 10px",
            padding: "10px 20px",
            background: "none",
            border: "none",
            outline: "none",
          }}
        >
          About
        </button>
        <button
          className={`tab-btn ${activeTab === "2" ? "active" : ""}`}
          onClick={(e) => handleTabClick("2", e)}
          style={{
            borderBottom: activeTab === "2" ? "3px solid black" : "none",
            color: activeTab === "2" ? "black" : "gray",
            cursor: "pointer",
            margin: "0 10px",
            padding: "10px 20px",
            background: "none",
            border: "none",
            outline: "none",
          }}
        >
          Comments
        </button>
      </div>
    </div>
  );
}

export default TabsComponent;
