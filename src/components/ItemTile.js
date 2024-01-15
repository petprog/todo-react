import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
const ItemTile = ({
  item,
  handleCheck,
  handleDelete,
  handleEdit,
  isEditing,
  selectedItem,
  editText,
  setEditText,
}) => {
  return (
    <li className="item">
      <input
        type="checkbox"
        id={`item-${item.id}`}
        checked={item.isChecked}
        onChange={() => handleCheck(item.id)}
      />
      {isEditing && selectedItem === item.id ? (
        <input
          type="text"
          value={editText}
          onChange={(event) => setEditText(event.target.value)}
        />
      ) : (
        <label
          style={item.isChecked ? { textDecoration: "line-through" } : null}
          htmlFor={`item-${item.id}`}
        >
          {item.item}
        </label>
      )}
      {selectedItem === item.id ? (
        !isEditing ? (
          <FaRegEdit
            onClick={() => {
              handleEdit(item.id, true, item.item);
            }}
            role="button"
            tabIndex="0"
            aria-label={`Edit ${item.item}`}
          />
        ) : (
          <FaRegSave
            onClick={() => handleEdit(item.id, false)}
            role="button"
            tabIndex="0"
            aria-label={`Save ${item.item}`}
          />
        )
      ) : (
        <FaRegEdit
          onClick={() => {
            handleEdit(item.id, true, item.item);
          }}
          role="button"
          tabIndex="0"
          aria-label={`Edit ${item.item}`}
        />
      )}
      <FaRegTrashAlt
        onClick={() => handleDelete(item.id)}
        role="button"
        tabIndex="0"
        aria-label={`Delete ${item.item}`}
      />
    </li>
  );
};

export default ItemTile;
