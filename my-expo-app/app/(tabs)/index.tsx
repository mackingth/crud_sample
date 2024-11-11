import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';


interface Item {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [name, setName] = useState('');

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const addItem = async () => {
    await axios.post(API_URL, { name });
    setName('');
    fetchItems();
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
          <Text>{item.name}</Text>
        )}
      />
    </View>
  );
};

export default App;
