import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import socketService from '../services/socket';

export default function UserStatus({ userId }) {
  const [isOnline, setIsOnline] = useState(false);
  const [lastSeen, setLastSeen] = useState(null);

  useEffect(() => {
    socketService.emit('checkUserStatus', userId);
    
    socketService.on('userStatus', (status) => {
      if (status.userId === userId) {
        setIsOnline(status.isOnline);
        setLastSeen(status.lastSeen);
      }
    });

    return () => {
      socketService.off('userStatus');
    };
  }, [userId]);

  return (
    <View style={styles.container}>
      <View style={[styles.statusDot, { backgroundColor: isOnline ? '#4CAF50' : '#9E9E9E' }]} />
      <Text style={styles.statusText}>
        {isOnline ? 'Online' : `Last seen ${new Date(lastSeen).toLocaleString()}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 5,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
  },
});