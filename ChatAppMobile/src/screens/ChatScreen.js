import React, { useState, useCallback, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Alert, Modal } from 'react-native';
import { GiftedChat, Bubble, Actions, InputToolbar } from 'react-native-gifted-chat';
import { Ionicons } from '@expo/vector-icons';
import MessageScheduler from '../components/MessageScheduler';
import { useTheme } from '../context/ThemeContext';
import socketService from '../services/socket';
import VoiceMessage from '../components/VoiceMessage';
import { translateMessage } from '../services/translationService';
import { blockUser, getBlockedUsers } from '../services/userService';
import { pickDocument, uploadFile } from '../services/fileService';

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const { theme } = useTheme();
  let typingTimeout;
  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    socketService.on('userTyping', (user) => {
      setIsTyping(true);
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => setIsTyping(false), 3000);
    });

    socketService.on('messageRead', (messageId) => {
      setMessages(previousMessages =>
        previousMessages.map(message =>
          message._id === messageId
            ? { ...message, received: true }
            : message
        )
      );
    });

    return () => {
      clearTimeout(typingTimeout);
    };
  }, []);

  const onInputTextChanged = (text) => {
    if (text.length > 0) {
      socketService.emit('typing');
    }
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: theme.colors.primary,
          },
          left: {
            backgroundColor: theme.colors.input,
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: theme.colors.text,
          },
        }}
      />
    );
  };

  const renderFooter = () => {
    if (isTyping) {
      return (
        <View style={styles.typingContainer}>
          <Text style={[styles.typingText, { color: theme.colors.text }]}>
            Someone is typing...
          </Text>
        </View>
      );
    }
    return null;
  };

  useEffect(() => {
    loadBlockedUsers();
  }, []);

  const loadBlockedUsers = async () => {
    const users = await getBlockedUsers();
    setBlockedUsers(users);
  };

  const handleVoiceMessage = async (uri) => {
    const message = {
      _id: Math.random().toString(),
      audio: uri,
      createdAt: new Date(),
      user: user,
    };
    onSend([message]);
  };

  const handleTranslate = async (message) => {
    try {
      const translatedText = await translateMessage(message.text);
      Alert.alert('Translation', translatedText);
    } catch (error) {
      Alert.alert('Error', 'Failed to translate message');
    }
  };

  const handleBlockUser = async (userId) => {
    const success = await blockUser(userId);
    if (success) {
      loadBlockedUsers();
      Alert.alert('Success', 'User has been blocked');
    }
  };

  // Add new state variables
  const [editingMessage, setEditingMessage] = useState(null);
  const [scheduledMessages, setScheduledMessages] = useState([]);
  const [showScheduler, setShowScheduler] = useState(false);
  const [messageToSchedule, setMessageToSchedule] = useState(null);

  // Add message forwarding handler
  const handleForward = (message) => {
    navigation.navigate('ContactList', {
      onSelectContact: (contact) => {
        const forwardedMessage = {
          ...message,
          _id: Math.random().toString(),
          createdAt: new Date(),
          forwarded: true,
        };
        socketService.emit('message', { recipientId: contact._id, message: forwardedMessage });
        Alert.alert('Success', 'Message forwarded');
      },
    });
  };

  // Add message editing handler
  const handleEdit = (message) => {
    setEditingMessage(message);
  };

  // Add message scheduling handler
  const handleSchedule = (message) => {
    setMessageToSchedule(message);
    setShowScheduler(true);
  };

  const scheduleMessage = (date) => {
    if (messageToSchedule) {
      const scheduledMessage = {
        ...messageToSchedule,
        scheduledFor: date,
      };
      setScheduledMessages([...scheduledMessages, scheduledMessage]);
      setShowScheduler(false);
      setMessageToSchedule(null);
      Alert.alert('Success', `Message scheduled for ${format(date, 'PPpp')}`);
    }
  };

  // Update renderMessageActions
  const renderMessageActions = (props) => {
    const { currentMessage } = props;
    return (
      <Actions
        {...props}
        options={{
          'Translate': () => handleTranslate(currentMessage),
          'Forward': () => handleForward(currentMessage),
          'Edit': () => handleEdit(currentMessage),
          'Schedule': () => handleSchedule(currentMessage),
          'Block User': () => handleBlockUser(currentMessage.user._id),
        }}
        icon={() => (
          <Ionicons name="ellipsis-vertical" size={24} color="gray" />
        )}
      />
    );
  };

  // Add custom input toolbar for editing
  const renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        placeholder={editingMessage ? 'Edit message...' : 'Type a message...'}
        text={editingMessage ? editingMessage.text : props.text}
      />
    );
  };

  // Update onSend to handle edited messages
  const onSend = useCallback((messages = []) => {
    if (editingMessage) {
      const updatedMessages = messages.map(m => 
        m._id === editingMessage._id 
          ? { ...m, edited: true }
          : m
      );
      setMessages(updatedMessages);
      setEditingMessage(null);
    } else {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    }
  }, [editingMessage]);

  // Check for scheduled messages
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      scheduledMessages.forEach(message => {
        if (new Date(message.scheduledFor) <= now) {
          onSend([message]);
          setScheduledMessages(prev => 
            prev.filter(m => m._id !== message._id)
          );
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [scheduledMessages]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <GiftedChat
        messages={messages.filter(m => !blockedUsers.includes(m.user._id))}
        onSend={onSend}
        user={user}
        renderBubble={renderBubble}
        renderFooter={renderFooter}
        renderInputToolbar={renderInputToolbar}
        renderMessageActions={renderMessageActions}
        onInputTextChanged={onInputTextChanged}
        text={editingMessage?.text}
      />
      
      <Modal visible={showScheduler} transparent animationType="slide">
        <View style={styles.schedulerContainer}>
          <MessageScheduler
            onSchedule={scheduleMessage}
            onCancel={() => {
              setShowScheduler(false);
              setMessageToSchedule(null);
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

// Add new styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  typingContainer: {
    padding: 10,
  },
  typingText: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  schedulerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

// Inside ChatScreen component, add:
const handleAttachment = async () => {
  const file = await pickDocument();
  if (file) {
    try {
      const uploadedFile = await uploadFile(file.uri, file.name);
      const message = {
        _id: Math.random().toString(),
        text: 'File: ' + file.name,
        createdAt: new Date(),
        user: user,
        image: uploadedFile.url,
        file: {
          url: uploadedFile.url,
          name: file.name,
        },
      };
      onSend([message]);
    } catch (error) {
      Alert.alert('Error', 'Failed to upload file');
    }
  }
};

// Add to the GiftedChat component:
<GiftedChat
  messages={messages}
  onSend={onSend}
  user={user}
  renderActions={() => (
    <TouchableOpacity onPress={handleAttachment}>
      <Icon name="attachment" size={24} />
    </TouchableOpacity>
  )}
  renderMessageImage={(props) => (
    <TouchableOpacity onPress={() => handleFileOpen(props.currentMessage.file)}>
      <Image {...props} />
    </TouchableOpacity>
  )}
  renderCustomView={(props) => (
    <MessageReactions
      messageId={props.currentMessage._id}
      currentReactions={props.currentMessage.reactions || []}
    />
  )}
/>