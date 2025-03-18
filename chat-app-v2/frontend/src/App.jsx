import { useState, useEffect } from 'react';
import { Box, Container, TextField, Button, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    socket.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('user_list', (userList) => {
      setUsers(userList);
    });

    return () => {
      socket.off('receive_message');
      socket.off('user_list');
    };
  }, []);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      socket.emit('user_join', username);
      setIsJoined(true);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('send_message', message);
      setMessage('');
    }
  };

  if (!isJoined) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Join Chat
          </Typography>
          <form onSubmit={handleJoin}>
            <TextField
              fullWidth
              label="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Join
            </Button>
          </form>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ height: '70vh', overflow: 'auto', p: 2 }}>
            <List>
              {messages.map((msg, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={msg.text}
                    secondary={`${msg.sender} - ${new Date(msg.timestamp).toLocaleTimeString()}`}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
          <form onSubmit={handleSend} style={{ marginTop: '1rem' }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                label="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button type="submit" variant="contained">
                Send
              </Button>
            </Box>
          </form>
        </Box>
        <Paper sx={{ width: 200, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Online Users
          </Typography>
          <Divider />
          <List>
            {users.map((user, index) => (
              <ListItem key={index}>
                <ListItemText primary={user} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
}

export default App;