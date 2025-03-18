import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  Avatar,
} from '@mui/material'
import {
  Chat as ChatIcon,
  Group as GroupIcon,
  Person as PersonIcon,
} from '@mui/icons-material'

const drawerWidth = 280

const chatItems = [
  { 
    text: 'Khalid',
    preview: 'Hi, how are you samim?',
    time: '8:40 AM',
    avatar: '/avatars/khalid.png',
    online: true,
    path: '/chat/general'
  },
  {
    text: 'Taherah Big',
    preview: 'I will look for you',
    time: '7m ago',
    avatar: '/avatars/taherah.png',
    online: false,
    path: '/chat/departments'
  },
  {
    text: 'Sami Rafi',
    preview: 'Typing...',
    time: 'Online',
    avatar: '/avatars/sami.png',
    online: true,
    path: '/profile'
  }
]

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const getStatusColor = (status) => {
    const colors = {
      online: '#44b700',
      away: '#ff9800',
      offline: '#bdbdbd'
    }
    return colors[status] || colors.offline
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(180deg, #40E0D0 0%, #9370DB 100%)',
          color: '#fff',
          borderRight: 'none',
        },
      }}
    >
      <Box sx={{ p: 2, color: '#fff' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          Messages
        </Typography>
      </Box>
      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.12)' }} />
      <List>
        {chatItems.map((item) => (
          <ListItem
            button
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              py: 2,
              borderRadius: 2,
              mx: 1,
              mb: 0.5,
              position: 'relative',
              '&.Mui-selected': {
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.15)',
                },
              },
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={item.avatar}
                sx={{
                  width: 48,
                  height: 48,
                  mr: 2,
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                }}
              />
              {item.online && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 2,
                    right: 16,
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    bgcolor: '#44b700',
                    border: '2px solid #fff',
                  }}
                />
              )}
            </Box>
            <Box sx={{ width: '100%', overflow: 'hidden' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
                  {item.text}
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  {item.time}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255,255,255,0.7)',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.preview}
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar