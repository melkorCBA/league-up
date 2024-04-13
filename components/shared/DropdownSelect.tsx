import { useCallback } from "react";

const DropdownSelect = ({ id, value, items, onChange, ukey, displayKey }) => {
  const getMap = useCallback(() => {
    const map = new Map();
    items.forEach((i) => map.set(i[ukey], i));
    return map;
  }, [items, ukey]);
  const getCurrentSelectedValue = useCallback(() => {
    return value ? value[ukey] : "";
  }, [value, items, ukey]);

  const getItem = useCallback((k) => getMap().get(k), [items, ukey]);

  return (
    <select
      id={id}
      className="form-select form-select-sm"
      aria-label=".form-select-sm example"
      value={getCurrentSelectedValue()}
      onChange={(e) => {
        onChange(getItem(e.target.value));
      }}
    >
      {value === undefined ? <option value="">None</option> : null}

      {items.map((item) => (
        <option
          key={item[ukey]}
          value={item[ukey]}
          className={
            "form-select-item" +
            `${
              item[ukey] === getCurrentSelectedValue()
                ? " form-select-item-selected"
                : ""
            }`
          }
        >
          {item[displayKey]}
        </option>
      ))}
    </select>
  );
};

export default DropdownSelect;
