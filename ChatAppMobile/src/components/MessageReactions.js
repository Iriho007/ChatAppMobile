import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import EmojiSelector from 'react-native-emoji-selector';
import socketService from '../services/socket';

export default function MessageReactions({ messageId, currentReactions }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleReaction = (emoji) => {
    socketService.emit('messageReaction', {
      messageId,
      reaction: emoji
    });
    setShowEmojiPicker(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.reactionsContainer}>
        {currentReactions.map((reaction, index) => (
          <TouchableOpacity
            key={index}
            style={styles.reaction}
            onPress={() => handleReaction(reaction.emoji)}
          >
            <Text>{reaction.emoji}</Text>
            <Text style={styles.count}>{reaction.count}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity
        style={styles.addReaction}
        onPress={() => setShowEmojiPicker(true)}
      >
        <Text>+</Text>
      </TouchableOpacity>

      <Modal
        visible={showEmojiPicker}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <EmojiSelector
            onEmojiSelected={handleReaction}
            columns={8}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  reaction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 4,
    marginRight: 4,
  },
  count: {
    fontSize: 12,
    marginLeft: 2,
  },
  addReaction: {
    padding: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 'auto',
  },
});