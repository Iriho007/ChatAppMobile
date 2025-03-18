import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SOCKET_URL = 'http://10.0.2.2:3000';

class SocketService {
  socket = null;

  connect = async () => {
    const token = await AsyncStorage.getItem('token');
    this.socket = io(SOCKET_URL, {
      auth: {
        token
      }
    });

    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  };

  disconnect = () => {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  };

  emit = (event, data) => {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  };

  on = (event, callback) => {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  };
}

export default new SocketService();