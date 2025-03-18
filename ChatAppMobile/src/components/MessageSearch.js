import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import { useTheme } from '../context/ThemeContext';

export default function MessageSearch({ messages, onMessageSelect }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { theme } = useTheme();

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim()) {
      const filtered = messages.filter(message => 
        message.text.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SearchBar
        placeholder="Search messages..."
        onChangeText={handleSearch}
        value={searchQuery}
        platform="default"
        containerStyle={{ backgroundColor: theme.colors.background }}
        inputContainerStyle={{ backgroundColor: theme.colors.input }}
      />
      <FlatList
        data={searchResults}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <ListItem
            onPress={() => onMessageSelect(item)}
            containerStyle={{ backgroundColor: theme.colors.background }}
          >
            <ListItem.Content>
              <ListItem.Title style={{ color: theme.colors.text }}>
                {item.text}
              </ListItem.Title>
              <ListItem.Subtitle style={{ color: theme.colors.text }}>
                {new Date(item.createdAt).toLocaleDateString()}
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});