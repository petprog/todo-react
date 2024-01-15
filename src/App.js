import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import AddItem from "./components/AddItem";
import { useEffect, useState } from "react";
import SearchItem from "./components/SearchItem";
import apiRequest from "./apiRequest";

function App() {
  const API_URL = "http://localhost:3500";

  // const loadList = () => {
  //   const storedList = localStorage.getItem("myShoppingList");
  //   if (!storedList) return [];
  //   const parsedList = JSON.parse(storedList);
  //   if (!parsedList.length) return [];
  //   return parsedList;
  // };

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const getItemsEndpoint = `${API_URL}/items`;
      try {
        const response = await fetch(getItemsEndpoint);
        if (!response.ok) throw Error("Expected data is not received");
        const items = await response.json();
        const newItems = items.map((item) => {
          return {
            id: item.id,
            isChecked: item.isChecked,
            item: item.item,
          };
        });
        setItems(newItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      (async () => await fetchItems())();
    }, 1000);
  }, []);

  const handleCheck = async (id) => {
    var updatedItem = null;
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        item.isChecked = !item.isChecked;
        updatedItem = item;
      }
      return item;
    });
    setItems(updatedItems);

    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isChecked: updatedItem.isChecked }),
    };

    const reqUrl = `${API_URL}/items/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };

  const addItem = async (item) => {
    const itemId = items.length ? parseInt(items[items.length - 1].id) + 1 : 1;
    const trimmedItemText = item.trim();
    const newItemObj = {
      id: itemId.toString(),
      isChecked: false,
      item: trimmedItemText,
    };
    const newList = [...items, newItemObj];
    setItems(newList);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItemObj),
    };
    const postUrl = `${API_URL}/items`;
    const result = await apiRequest(postUrl, postOptions);
    if (result) setFetchError(result);
  };

  const saveEditItem = async (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        item.item = editText;
      }
      return item;
    });
    setItems(updatedItems);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item: editText }),
    };
    const reqUrl = `${API_URL}/items/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  const handleDelete = async (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);

    const deleteOptions = {
      method: "DELETE",
    };
    const reqUrl = `${API_URL}/items/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  const handleEdit = async (id, isEditing, item) => {
    setSelectedItem(id);
    setIsEditing(isEditing);
    if (item) {
      setEditText(item);
    }
    if (!isEditing) {
      saveEditItem(id);
    }
  };

  const searchItems = (items) =>
    items.filter((item) => item.item.toLowerCase().includes(searchQuery));

  return (
    <div className="App">
      <Header title="TODO App" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Content
        items={searchItems(items)}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
        fetchError={fetchError}
        isLoading={isLoading}
        isEditing={isEditing}
        handleEdit={handleEdit}
        selectedItem={selectedItem}
        editText={editText}
        setEditText={setEditText}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
