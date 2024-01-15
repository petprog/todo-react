import ItemTile from "./ItemTile";

const ItemList = ({
  items,
  handleCheck,
  handleDelete,
  handleEdit,
  isEditing,
  selectedItem,
  editText,
  setEditText,
}) => {
  return (
    <ul>
      {items.map((item) => (
        <ItemTile
          key={item.id}
          item={item}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          isEditing={isEditing}
          selectedItem={selectedItem}
          editText={editText}
          setEditText={setEditText}
        />
      ))}
    </ul>
  );
};

export default ItemList;
