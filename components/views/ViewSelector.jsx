import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

const ViewSelectorItem = ({ value, selectedView, setView, viewData }) => {
  return (
    <div className="d-flex col-md-3 col-sm-6 flex-column align-items-center p-1">
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
      <div className="row">
        {dashboardViews.map((v, i) => (
          <ViewSelectorItem
            key={i}
            value={v}
            selectedView={view}
            viewData={views[v]}
            setView={onViewChnage}
          />
        ))}
      </div>
    </div>
  );
};

export default ViewSelector;
