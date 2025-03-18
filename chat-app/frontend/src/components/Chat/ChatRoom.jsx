import React, { useState, useEffect, useRef } from 'react'
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import { Send as SendIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { io } from 'socket.io-client'

const ChatRoom = ({ roomName, onBack }) => {
  const [department, setDepartment] = useState('general')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [connected, setConnected] = useState(false)
  const socketRef = useRef()
  const messagesEndRef = useRef(null)

  const messageStyles = {
    sent: {
      backgroundColor: '#40E0D0',
      color: '#ffffff',
      alignSelf: 'flex-end',
      borderRadius: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginLeft: '20%',
      padding: '12px 16px',
      position: 'relative',
      '&:hover': {
        backgroundColor: '#48D1CC'
      }
    },
    received: {
      backgroundColor: '#9370DB',
      color: '#ffffff',
      alignSelf: 'flex-start',
      borderRadius: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      marginRight: '20%',
      padding: '12px 16px',
      position: 'relative',
      '&:hover': {
        backgroundColor: '#633f86'
      }
    }
  }

  useEffect(() => {
    socketRef.current = io('http://localhost:3000')

    socketRef.current.on('connect', () => {
      setConnected(true)
      socketRef.current.emit('joinRoom', roomName)
    })

    socketRef.current.on('message', (message) => {
      setMessages((msgs) => [...msgs, message])
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [roomName])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim() && connected) {
      const newMessage = {
        id: Date.now(),
        sender: 'Current User',
        content: message,
        timestamp: new Date().toISOString(),
        room: roomName
      }
      socketRef.current.emit('sendMessage', newMessage)
      setMessage('')
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', bgcolor: '#f5f5f5' }}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        p: 2,
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
      }}>
        <Typography variant="h6" sx={{ color: '#333' }}>
          {roomName}
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          flex: 1,
          overflow: 'auto',
          backgroundColor: '#ffffff',
          p: 3,
          maxHeight: 'calc(100vh - 140px)',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
            '&:hover': {
              background: '#555',
            },
          },
        }}
      >
        <List sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {messages.map((msg) => (
            <ListItem
              key={msg.id}
              alignItems="flex-start"
              sx={{
                ...messageStyles[msg.sender === 'Current User' ? 'sent' : 'received'],
                maxWidth: '70%',
                p: 2,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', width: '100%', mb: 1 }}>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    mr: 1,
                    bgcolor: msg.sender === 'Current User' ? '#5c2d91' : '#7b4fa7'
                  }}
                >
                  {msg.sender.charAt(0).toUpperCase()}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: '#ffffff', mb: 0.5 }}
                  >
                    {msg.sender}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#ffffff' }}>
                    {msg.content}
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="caption"
                sx={{ color: 'rgba(255,255,255,0.7)', alignSelf: 'flex-end' }}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Paper>

      <Paper
        component="form"
        onSubmit={handleSendMessage}
        sx={{
          p: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '30px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          margin: '20px',
          position: 'relative',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <TextField
          fullWidth
          placeholder="Type a message..."
          variant="standard"
          InputProps={{
            disableUnderline: true,
            style: { color: '#ffffff' }
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          sx={{ ml: 1, flex: 1 }}
        />
        <IconButton
          type="submit"
          sx={{
            color: '#ffffff',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Box>
  )
}

export default ChatRoom