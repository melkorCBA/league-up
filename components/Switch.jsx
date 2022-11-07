import React, { useState, useRef, useEffect } from "react";

const Switch = ({
  label,
  valueLabels,
  values,
  defultValue,
  onChange,
  isDisabled,
}) => {
  const [state, setState] = useState(defultValue);
  // const [leftLable, rightLables] = sideLables;

  const lablesMap = {};
  const refs = useRef({});
  values.forEach((v, i) => (lablesMap[v] = valueLabels[i]));
  // const l = useRef();
  // const m = useRef();
  // const r = useRef();
  const onToggle = (value) => {
    setState(value);
    onChange(value);
  };

  const addToRefs = (v, el) => {
    if (el && refs.current[v] === undefined) {
      refs.current[v] = el;
    }
  };

  useEffect(() => {
    for (const k of values) {
      if (refs.current[k] === undefined) break;
      if (k === state) {
        refs.current[k].classList.add("bg-warning");
        refs.current[k].classList.remove("text-light");
        refs.current[k].textContent = lablesMap[k];
      } else {
        refs.current[k].classList.remove("bg-warning");
        refs.current[k].classList.add("text-light");
        refs.current[k].textContent = lablesMap[k];
      }
    }
  }, [state, values]);
  return (
    <div>
      <div className="text-center mt-2 mb-1">{label}</div>
      <div className="d-flex p-1 justify-content-between boarder-yelllow threeway-switch">
        {values.map((v) => (
          <div
            key={v}
            ref={(el) => addToRefs(v, el)}
            onClick={() => onToggle(v)}
            className={"w-100 p-1 " + (isDisabled ? "is-disabled" : "")}
          ></div>
        ))}
        {/* <div
          ref={l}
          onClick={() => onToggle(values[0])}
          className="w-100 p-1"
        ></div>
        <div
          ref={m}
          onClick={() => onToggle(values[1])}
          className="w-100  p-1"
        ></div>
        <div
          ref={r}
          onClick={() => onToggle(values[2])}
          className="w-100  p-1"
        ></div> */}
      </div>
    </div>
  );
};

export default Switch;
