import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Sidebar from './components/Layout/Sidebar'
import ChatRoom from './components/Chat/ChatRoom'

// Create theme instance
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#40E0D0',
      light: '#48D1CC',
      dark: '#008B8B',
      contrastText: '#fff'
    },
    secondary: {
      main: '#9370DB',
      light: '#9932CC',
      dark: '#8B008B',
      contrastText: '#fff'
    },
    background: {
      default: 'linear-gradient(135deg, #40E0D0 0%, #9370DB 100%)',
      paper: 'rgba(255, 255, 255, 0.9)'
    },
    text: {
      primary: '#2d2d2d',
      secondary: '#666666'
    },
    divider: 'rgba(255, 255, 255, 0.1)'
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#5c2d91',
          color: '#fff'
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#f57c00',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#f57c00'
            }
          },
          '&:hover': {
            backgroundColor: '#ffb74d',
            color: '#fff'
          }
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#fff'
        }
      }
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
  }
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
          <Routes>
            <Route path="/" element={<ChatRoom roomName="Welcome" />} />
            <Route path="/chat/general" element={<ChatRoom roomName="General Chat" />} />
            <Route path="/chat/departments" element={<ChatRoom roomName="Departments" />} />
            <Route path="/chat/departments/:id" element={<ChatRoom />} />
            <Route path="/profile" element={<div>Profile Coming Soon!</div>} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App