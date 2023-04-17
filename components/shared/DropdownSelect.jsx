import { useCallback } from "react";

const DropdownSelect = ({ id, value, items, onChange, ukey, displayKey }) => {
  const getMap = useCallback(() => {
    const map = new Map();
    items.forEach((i) => map.set(i[ukey], i));
    return map;
  }, [items, ukey]);

  const getItem = useCallback((k) => getMap().get(k), [items, ukey]);
  // return (
  //   <div className="dropdown">
  //     <button
  //       className="btn btn btn-outline-secondary dropdown-toggle"
  //       type="button"
  //       id={id}
  //       data-bs-toggle="dropdown"
  //       aria-expanded="false"
  //     >
  //       {value[displayKey]}
  //     </button>

  //     <ul className="dropdown-menu" aria-labelledby={id}>
  //       {items.map((item) => (
  //         <li
  //           className={
  //             "dropdown-item" +
  //             `${item[ukey] === value[ukey] ? " dropdown-selected" : ""}`
  //           }
  //           key={item[ukey]}
  //           onClick={() => onChange(item)}
  //         >
  //           {item[displayKey]}
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );

  return (
    <select
      id={id}
      className="form-select form-select-sm"
      aria-label=".form-select-sm example"
      value={value[ukey]}
      onChange={(e) => {
        onChange(getItem(e.target.value));
      }}
    >
      {items.map((item) => (
        <option
          key={item[ukey]}
          value={item[ukey]}
          className={
            "form-select-item" +
            `${item[ukey] === value[ukey] ? " form-select-item-selected" : ""}`
          }
        >
          {item[displayKey]}
        </option>
      ))}
    </select>
  );
};

export default DropdownSelect;
