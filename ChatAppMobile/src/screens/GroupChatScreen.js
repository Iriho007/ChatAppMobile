import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useTheme } from '../context/ThemeContext';
import socketService from '../services/socket';

export default function GroupChatScreen({ route }) {
  const { groupId, groupName } = route.params;
  const [messages, setMessages] = useState([]);
  const [members, setMembers] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    socketService.emit('joinGroup', groupId);
    socketService.on('groupMessage', handleNewMessage);
    loadGroupMessages();
    loadGroupMembers();

    return () => {
      socketService.emit('leaveGroup', groupId);
      socketService.off('groupMessage');
    };
  }, [groupId]);

  const loadGroupMessages = async () => {
    // Implement loading group messages from API
  };

  const loadGroupMembers = async () => {
    // Implement loading group members from API
  };

  const handleNewMessage = (message) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, [message]));
  };

  const onSend = (newMessages = []) => {
    const [messageToSend] = newMessages;
    socketService.emit('groupMessage', { groupId, message: messageToSend });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={user}
        renderBubble={renderBubble}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});