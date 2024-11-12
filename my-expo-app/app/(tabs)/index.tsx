import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env'; // .envファイルからURLをインポート

interface Item {
  id: number;
  name: string;
}

const Index: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null); // 編集モードのアイテムIDを管理
  const [newName, setNewName] = useState(''); // 編集用の新しい名前

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const addItem = async () => {
    try {
      await axios.post(API_URL, { name });
      setName('');
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const updateItem = async (id: number) => {
    try {
      await axios.patch(`${API_URL}/${id}`, { name: newName });
      setEditingId(null); // 編集モード解除
      setNewName(''); // 編集名をクリア
      fetchItems();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Item name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Add Item" onPress={addItem} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            {editingId === item.id ? (
              // 編集モード
              <>
                <TextInput
                  placeholder="New name"
                  value={newName}
                  onChangeText={setNewName}
                  style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
                />
                <Button title="Update" onPress={() => updateItem(item.id)} />
                <Button title="Cancel" onPress={() => setEditingId(null)} />
              </>
            ) : (
              // 通常表示
              <>
                <Text>{item.name}</Text>
                <Button title="Edit" onPress={() => {
                  setEditingId(item.id); // 編集モードにする
                  setNewName(item.name); // 現在の名前をセット
                }} />
                <Button title="Delete" onPress={() => deleteItem(item.id)} />
              </>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default Index;
