import Image from "next/image";
import React, { useEffect, useState } from "react";
Image;

const ViewSelectorItem = ({ v, view, setView, viewData }) => {
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
          id={`btn-check-outlined-${v}`}
          onClick={() => {
            setView(v);
          }}
        >
          <label
            className={v === view ? "btn btn-warning" : "btn-outline-warning"}
          >
            Select
          </label>
        </button>
      </div>
    </div>
  );
};

const ViewSelector = ({ views, initlaView, onViewSelectorChnage }) => {
  const dashboardViews = Object.keys(views);
  const [view, setView] = useState(initlaView ?? "std");
  useEffect(() => {
    onViewSelectorChnage(view);
  }, [view]);
  return (
    <div>
      <h3 className="text-center">View Selector</h3>
      <div className="d-flex gap-2">
        {dashboardViews.map((v, i) => (
          <div key={i} className="w-100">
            <ViewSelectorItem
              v={v}
              view={view}
              viewData={views[v]}
              setView={setView}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSelector;
