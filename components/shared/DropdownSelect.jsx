const DropdownSelect = ({ id, value, items, onChange, ukey, displayKey }) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn btn-outline-secondary dropdown-toggle"
        type="button"
        id={id}
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {value[displayKey]}
      </button>

      <ul className="dropdown-menu" aria-labelledby={id}>
        {items.map((item) => (
          <li
            className="dropdown-item"
            key={item[ukey]}
            onClick={() => onChange(item)}
          >
            {item[displayKey]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownSelect;
