import EmptyList from "./EmptyList";
import ErrorPlaceholder from "./ErrorPlaceholder";
import ItemList from "./ItemList";
const Content = ({
  items,
  handleCheck,
  handleDelete,
  fetchError,
  isLoading,
  isEditing,
  handleEdit,
  selectedItem,
  editText,
  setEditText,
}) => {
  return (
    <main>
      {isLoading ? (
        <p>Loading...</p>
      ) : fetchError ? (
        <ErrorPlaceholder fetchError={fetchError} />
      ) : items.length ? (
        <ItemList
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          isEditing={isEditing}
          handleEdit={handleEdit}
          selectedItem={selectedItem}
          editText={editText}
          setEditText={setEditText}
        />
      ) : (
        <EmptyList />
      )}
    </main>
  );
};

export default Content;
