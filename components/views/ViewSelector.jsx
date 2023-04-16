import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

const ViewSelectorItem = ({ value, selectedView, setView, viewData }) => {
  return (
    <div className="d-flex flex-column align-items-center p-1">
      <div>{viewData["name"]}</div>
      <div className="view-selector-preview my-2">
        <Image
          alt="dashboard view preview"
          width={100}
          height={100}
          src={viewData["url"]}
        />
      </div>
      <div>
        <button
          className="btn"
          id={`btn-check-outlined-${value}`}
          onClick={() => {
            setView(value);
          }}
        >
          <label
            className={
              value === selectedView
                ? "btn btn-secondary"
                : "btn-outline-secondary"
            }
          >
            {value === selectedView ? "Selected" : "Select"}
          </label>
        </button>
      </div>
    </div>
  );
};

const ViewSelector = ({ views, view, onViewSelectorChnage }) => {
  const dashboardViews = Object.keys(views);
  const onViewChnage = (v) => {
    onViewSelectorChnage(v);
  };

  return (
    <div>
      <h3 className="text-center">View Selector</h3>
      <div className="d-flex gap-2">
        {dashboardViews.map((v, i) => (
          <div key={i} className="w-100">
            <ViewSelectorItem
              value={v}
              selectedView={view}
              viewData={views[v]}
              setView={onViewChnage}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSelector;
