import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import logo from './logo.png';
import './App.css';
import { AppBar, Toolbar, Typography, Button, Box, Container, Paper, TextField, IconButton, Menu, MenuItem, Avatar, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { UserContext } from './index';
import LogoutIcon from '@mui/icons-material/Logout';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import './LandingPage.css';

function NavigationMenu() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = React.useContext(UserContext);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const [profileAnchorEl, setProfileAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setMenuAnchorEl(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => setProfileAnchorEl(null);

  const handleNavigate = (path: string) => {
    navigate(path);
    handleMenuClose();
    handleProfileClose();
  };

  return (
    <AppBar position="static" sx={{ background: '#edb32b', boxShadow: 'none' }}>
      <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 64 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick} sx={{ mr: 1 }}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={() => handleNavigate('/')}>{t('Home')}</MenuItem>
            <MenuItem onClick={() => handleNavigate('/train')}>{t('Train')}</MenuItem>
            <MenuItem onClick={() => handleNavigate('/chat')}>{t('Chat')}</MenuItem>
            <MenuItem onClick={() => handleNavigate('/export')}>{t('Export')}</MenuItem>
            <MenuItem onClick={() => handleNavigate('/agents')}>{t('AI Agents')}</MenuItem>
            <MenuItem onClick={() => handleNavigate('/profile')}>{t('Profile')}</MenuItem>
          </Menu>
          <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 2, cursor: 'pointer', color: '#fff' }} onClick={() => navigate('/')}>Lantros</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button color="inherit" onClick={() => navigate('/login')} sx={{ mr: 1, fontWeight: 500, color: '#fff', '&:hover': { color: '#0fdfff' } }}>{t('Login')}</Button>
          <Button variant="contained" onClick={() => navigate('/register')} sx={{ background: '#0fdfff', color: '#222', fontWeight: 500, mr: 1, '&:hover': { background: '#fff', color: '#0fdfff' } }}>{t('Signup')}</Button>
          <IconButton color="inherit" onClick={handleProfileClick} sx={{ ml: 1 }}>
            <Avatar src={user.avatar} sx={{ width: 32, height: 32 }} />
          </IconButton>
          <Menu anchorEl={profileAnchorEl} open={Boolean(profileAnchorEl)} onClose={handleProfileClose}>
            <MenuItem onClick={() => handleNavigate('/profile')}>{t('Profile')}</MenuItem>
            <MenuItem onClick={() => handleNavigate('/')}><LogoutIcon fontSize="small" sx={{ mr: 1 }} />{t('Logout')}</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/train" element={<TrainPage />} />
        <Route path="/chat" element={<ChatBotPage />} />
        <Route path="/export" element={<ExportPage />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function AppHeader() {
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [profileAnchorEl, setProfileAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleNav = (path: string) => {
    setDrawerOpen(false);
    navigate(path);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => setProfileAnchorEl(null);

  const handleLogout = () => {
    setProfileAnchorEl(null);
    setUser({ name: '', email: '', avatar: '' });
    navigate('/');
  };

  return (
    <>
      <AppBar position="static" sx={{ background: '#edb32b', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 64 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle} sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" sx={{ fontWeight: 700, letterSpacing: 2, cursor: 'pointer', color: '#fff' }} onClick={() => navigate('/')}>Lantros</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button color="inherit" onClick={() => navigate('/login')} sx={{ fontWeight: 500, color: '#fff', '&:hover': { color: '#0fdfff' } }}>LOGIN</Button>
            <Button variant="contained" onClick={() => navigate('/register')} sx={{ background: '#0fdfff', color: '#222', fontWeight: 500, ml: 2, '&:hover': { background: '#fff', color: '#0fdfff' } }}>SIGNUP</Button>
            <IconButton color="inherit" onClick={handleProfileClick} sx={{ ml: 1 }}>
              <Avatar src={user.avatar} sx={{ width: 32, height: 32 }} />
            </IconButton>
            <Menu anchorEl={profileAnchorEl} open={Boolean(profileAnchorEl)} onClose={handleProfileClose}>
              <MenuItem onClick={() => { handleProfileClose(); navigate('/profile'); }}>Profile</MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 220 }} role="presentation" onClick={handleDrawerToggle}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNav('/')}> <ListItemText primary="Home" /> </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNav('/login')}> <ListItemText primary="Login" /> </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNav('/register')}> <ListItemText primary="Signup" /> </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNav('/chat')}> <ListItemText primary="Chat" /> </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNav('/train')}> <ListItemText primary="Train" /> </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNav('/export')}> <ListItemText primary="Export" /> </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNav('/agents')}> <ListItemText primary="AI Agents" /> </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNav('/profile')}> <ListItemText primary="Profile" /> </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

function LandingPage() {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/register');
  };
  
  const handleLearnMore = () => {
    // Scroll to features section or navigate to a learn more page
    document.querySelector('.features-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Welcome to <span className="highlight">Lantros</span>
            </h1>
            <p className="hero-subtitle">
              Your intelligent AI chatbot companion that understands, learns, and helps you achieve more.
            </p>
            <div className="hero-features">
              <div className="feature">
                <div className="feature-icon">🤖</div>
                <h3>AI-Powered</h3>
                <p>Advanced artificial intelligence for natural conversations</p>
              </div>
              <div className="feature">
                <div className="feature-icon">⚡</div>
                <h3>Lightning Fast</h3>
                <p>Instant responses and real-time interactions</p>
              </div>
              <div className="feature">
                <div className="feature-icon">🔒</div>
                <h3>Secure</h3>
                <p>Your conversations are private and protected</p>
              </div>
            </div>
            <div className="cta-buttons">
              <button className="cta-primary" onClick={handleGetStarted}>Get Started</button>
              <button className="cta-secondary" onClick={handleLearnMore}>Learn More</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="chatbot-mockup">
              <div className="chat-header">
                <div className="chat-avatar">
                  <img src={logo} alt="Lantros Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                </div>
                <div className="chat-info">
                  <h4>Lantros</h4>
                  <span className="status">Online</span>
                </div>
              </div>
              <div className="chat-messages">
                <div className="message bot">
                  <p>Hello! I'm Lantros, your AI assistant. How can I help you today?</p>
                </div>
                <div className="message user">
                  <p>Can you help me with my project?</p>
                </div>
                <div className="message bot">
                  <p>Absolutely! I'd be happy to help you with your project. What are you working on?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="features-section">
        <div className="container">
          <h2>Why Choose Lantros?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-large">🧠</div>
              <h3>Smart Learning</h3>
              <p>Lantros learns from every interaction to provide more personalized and accurate responses.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-large">🌐</div>
              <h3>Multi-Language</h3>
              <p>Communicate in multiple languages with seamless translation and understanding.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-large">🎯</div>
              <h3>Task Automation</h3>
              <p>Automate repetitive tasks and streamline your workflow with intelligent assistance.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-large">📊</div>
              <h3>Analytics</h3>
              <p>Get insights into your conversations and productivity patterns.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', minWidth: '100vw', background: 'linear-gradient(135deg, #edb32b 60%, #0fdfff 100%)', display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center' }}>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
        <img src={logo} alt="Logo" style={{ width: 180 }} />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <Paper elevation={6} sx={{ p: 6, width: '100%', maxWidth: 400, borderRadius: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#edb32b', mb: 2, letterSpacing: 1, textAlign: 'center' }}>
            Lantros
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, color: '#222', textAlign: 'center' }}>Login</Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <input type="text" placeholder="Username" style={{ padding: 12, borderRadius: 4, border: '1px solid #ccc', fontSize: 16 }} />
            <input type="password" placeholder="Password" style={{ padding: 12, borderRadius: 4, border: '1px solid #ccc', fontSize: 16 }} />
            <Button variant="contained" sx={{ background: '#edb32b', color: '#222', fontWeight: 700, mt: 2 }}>
              LOGIN
            </Button>
            <Button variant="text" sx={{ color: '#0fdfff', mt: 1 }} onClick={() => navigate('/register')}>
              DON'T HAVE AN ACCOUNT? SIGN UP.
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

function RegisterPage() {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', minWidth: '100vw', background: 'linear-gradient(135deg, #edb32b 60%, #0fdfff 100%)', display: 'flex', flexDirection: 'row', alignItems: 'stretch', justifyContent: 'center' }}>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent' }}>
        <img src={logo} alt="Logo" style={{ width: 180 }} />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <Paper elevation={6} sx={{ p: 6, width: '100%', maxWidth: 400, borderRadius: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#edb32b', mb: 2, letterSpacing: 1, textAlign: 'center' }}>
            Lantros
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, color: '#222', textAlign: 'center' }}>Sign Up</Typography>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <input type="text" placeholder="Username" style={{ padding: 12, borderRadius: 4, border: '1px solid #ccc', fontSize: 16 }} />
            <input type="email" placeholder="Email" style={{ padding: 12, borderRadius: 4, border: '1px solid #ccc', fontSize: 16 }} />
            <input type="password" placeholder="Password" style={{ padding: 12, borderRadius: 4, border: '1px solid #ccc', fontSize: 16 }} />
            <Button variant="contained" sx={{ background: '#edb32b', color: '#222', fontWeight: 700, mt: 2 }}>
              REGISTER
            </Button>
            <Button variant="text" sx={{ color: '#0fdfff', mt: 1 }} onClick={() => navigate('/login')}>
              ALREADY HAVE AN ACCOUNT? LOGIN
            </Button>
            <Button variant="outlined" sx={{ borderColor: '#0fdfff', color: '#0fdfff', fontWeight: 500, mt: 2 }}>
              SIGN UP WITH GOOGLE
            </Button>
            <Button variant="outlined" sx={{ borderColor: '#333', color: '#333', fontWeight: 500, mt: 1 }}>
              SIGN UP WITH GITHUB
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

function TrainPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Container maxWidth="md" sx={{ py: 6, minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#edb32b', mb: 4, letterSpacing: 1 }}>
        {t('Train Your Data')}
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        <Paper elevation={3} sx={{ flex: 1, minWidth: 220, p: 3, borderTop: '4px solid #edb32b', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>{t('Upload PDF')}</Typography>
          <input type="file" accept="application/pdf" />
        </Paper>
        <Paper elevation={3} sx={{ flex: 1, minWidth: 220, p: 3, borderTop: '4px solid #0fdfff', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>{t('Upload DOC')}</Typography>
          <input type="file" accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" />
        </Paper>
        <Paper elevation={3} sx={{ flex: 1, minWidth: 220, p: 3, borderTop: '4px solid #222', borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>{t('Add URL')}</Typography>
          <input type="url" placeholder="https://example.com" style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
        </Paper>
      </Box>
      <Button variant="contained" size="large" sx={{ background: '#0fdfff', color: '#222', fontWeight: 700 }} onClick={() => navigate('/chat')}>
        {t('Go to Chatbot')}
      </Button>
    </Container>
  );
}

function ChatBotPage() {
  const { t } = useTranslation();
  const theme = useTheme();
  const [selectedModel, setSelectedModel] = React.useState('gpt-3.5-turbo');
  const [messages, setMessages] = React.useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [input, setInput] = React.useState('');
  const [clipboard, setClipboard] = React.useState<string[]>([]);
  const [chatHistory, setChatHistory] = React.useState<Array<{ id: string, title: string, messages: Array<{ role: 'user' | 'assistant', content: string }> }>>([
    { id: '1', title: 'Research on AI Agents', messages: [] },
    { id: '2', title: 'Data Analysis Discussion', messages: [] },
    { id: '3', title: 'Project Planning', messages: [] }
  ]);
  const [selectedChat, setSelectedChat] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = { role: 'user' as const, content: input };
    setMessages([...messages, newMessage]);
    
    // Update chat history if a chat is selected
    if (selectedChat) {
      setChatHistory(prev => prev.map(chat => 
        chat.id === selectedChat 
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      ));
    }
    
    // Here you would make API call to get bot response
    const botResponse = { role: 'assistant' as const, content: 'This is a sample response.' };
    setMessages(prev => [...prev, botResponse]);
    
    // Update chat history with bot response
    if (selectedChat) {
      setChatHistory(prev => prev.map(chat => 
        chat.id === selectedChat 
          ? { ...chat, messages: [...chat.messages, botResponse] }
          : chat
      ));
    }
    
    setInput('');
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
    const selectedChatData = chatHistory.find(chat => chat.id === chatId);
    if (selectedChatData) {
      setMessages(selectedChatData.messages);
    }
  };

  const handleNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: `New Chat ${chatHistory.length + 1}`,
      messages: []
    };
    setChatHistory([newChat, ...chatHistory]);
    setSelectedChat(newChat.id);
    setMessages([]);
  };

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', p: 2, gap: 2, maxWidth: '100vw', overflow: 'hidden', background: theme.palette.background.default }}>
      {/* Chat History Sidebar */}
      <Paper elevation={3} sx={{ width: 250, p: 2, borderRadius: 2, minWidth: 200, maxHeight: '100%', overflowY: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ color: 'var(--color1)' }}>{t('Chat History')}</Typography>
          <Button
            variant="contained"
            size="small"
            onClick={handleNewChat}
            sx={{ background: 'var(--color2)', color: '#222' }}
          >
            {t('New Chat')}
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {chatHistory.map((chat) => (
            <Button
              key={chat.id}
              variant={selectedChat === chat.id ? 'contained' : 'text'}
              onClick={() => handleChatSelect(chat.id)}
              sx={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                background: selectedChat === chat.id ? 'var(--color1)' : 'transparent',
                color: selectedChat === chat.id ? '#fff' : 'inherit',
                '&:hover': {
                  background: selectedChat === chat.id ? 'var(--color1)' : 'rgba(237, 179, 43, 0.1)',
                }
              }}
            >
              {chat.title}
            </Button>
          ))}
        </Box>
      </Paper>

      {/* Main Chat Area */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
        <Paper elevation={3} sx={{ flex: 1, p: 2, borderRadius: 2, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          {/* Model Selection */}
          <Box sx={{ mb: 2 }}>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: 4,
                border: '1px solid #ccc',
                fontSize: 14,
                width: 200
              }}
            >
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="gpt-4">GPT-4</option>
              <option value="claude">Claude</option>
            </select>
          </Box>

          {/* Messages */}
          <Box sx={{ flex: 1, overflowY: 'auto', mb: 2, p: 2, minHeight: 0 }}>
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    maxWidth: '70%',
                    background: message.role === 'user' ? 'var(--color1)' : theme.palette.background.paper,
                    color: message.role === 'user' ? '#fff' : theme.palette.text.primary,
                    borderRadius: 2
                  }}
                >
                  <Typography>{message.content}</Typography>
                </Paper>
              </Box>
            ))}
          </Box>

          {/* Input Area */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('Type your message...')}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 4,
                border: '1px solid #ccc',
                fontSize: 16
              }}
            />
            <Button
              variant="contained"
              onClick={handleSend}
              sx={{ background: 'var(--color1)', color: '#fff' }}
            >
              {t('Send')}
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Clipboard Sidebar */}
      <Paper elevation={3} sx={{ width: 250, p: 2, borderRadius: 2, minWidth: 200, maxHeight: '100%', overflowY: 'auto' }}>
        <Typography variant="h6" sx={{ mb: 2, color: 'var(--color1)' }}>{t('Clipboard')}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
          {clipboard.map((item, index) => (
            <Paper key={index} elevation={1} sx={{ p: 1, fontSize: 14 }}>
              {item}
            </Paper>
          ))}
        </Box>
        <Button
          variant="contained"
          fullWidth
          sx={{ background: 'var(--color2)', color: '#222' }}
          onClick={() => navigate('/export')}
        >
          {t('Proceed')}
        </Button>
      </Paper>
    </Box>
  );
}

function ExportPage() {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedFormat, setSelectedFormat] = React.useState('pdf');

  const handleExport = () => {
    // Here you would handle the export based on selectedFormat
    console.log(`Exporting as ${selectedFormat}`);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6, minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: theme.palette.background.default }}>
      <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--color1)', mb: 4, letterSpacing: 1 }}>
        {t('Export Your Data')}
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Format Selection */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>{t('Select Export Format')}</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {['pdf', 'doc', 'txt', 'json'].map((format) => (
              <Button
                key={format}
                variant={selectedFormat === format ? 'contained' : 'outlined'}
                onClick={() => setSelectedFormat(format)}
                sx={{
                  background: selectedFormat === format ? 'var(--color1)' : 'transparent',
                  color: selectedFormat === format ? '#fff' : 'var(--color1)',
                  borderColor: 'var(--color1)',
                  '&:hover': {
                    background: selectedFormat === format ? 'var(--color1)' : 'rgba(237, 179, 43, 0.1)',
                  }
                }}
              >
                {t(`Download ${format.toUpperCase()}`)}
              </Button>
            ))}
          </Box>
        </Paper>

        {/* Export Options */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>{t('Export Options')}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<span>📥</span>}
              sx={{ background: 'var(--color1)', color: '#fff' }}
              onClick={handleExport}
            >
              {t(`Download ${selectedFormat.toUpperCase()}`)}
            </Button>
            <Button
              variant="contained"
              startIcon={<span>📝</span>}
              sx={{ background: 'var(--color2)', color: '#222' }}
              onClick={handleExport}
            >
              {t('Summarize Content')}
            </Button>
            <Button
              variant="contained"
              startIcon={<span>🤖</span>}
              sx={{ background: '#222', color: '#fff' }}
              onClick={() => navigate('/agents')}
            >
              {t('Use AI Agents')}
            </Button>
          </Box>
        </Paper>

        {/* Preview Section */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>{t('Preview')}</Typography>
          <Box sx={{ 
            p: 2, 
            border: '1px solid #ccc', 
            borderRadius: 1,
            minHeight: 200,
            background: theme.palette.background.paper,
            maxHeight: 300,
            overflowY: 'auto'
          }}>
            <Typography color="text.secondary">
              {t('Preview of your exported content will appear here...')}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

function AgentsPage() {
  const { t } = useTranslation();
  const theme = useTheme();
  const agents = [
    {
      name: t('Research Agent'),
      description: t('Conducts in-depth research on specific topics'),
      icon: '🔍'
    },
    {
      name: t('Analysis Agent'),
      description: t('Analyzes data and provides insights'),
      icon: '📊'
    },
    {
      name: t('Writing Agent'),
      description: t('Helps with content creation and writing'),
      icon: '✍️'
    },
    {
      name: t('Summary Agent'),
      description: t('Creates concise summaries of long content'),
      icon: '📝'
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6, minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: theme.palette.background.default }}>
      <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--color1)', mb: 4, letterSpacing: 1 }}>
        {t('AI Agents')}
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        {t('Select an AI agent to help you with your tasks. Each agent is specialized in different areas and can assist you in various ways.')}
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
        {agents.map((agent) => (
          <Paper
            key={agent.name}
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)'
              }
            }}
          >
            <Typography variant="h1" sx={{ mb: 2 }}>{agent.icon}</Typography>
            <Typography variant="h6" sx={{ mb: 1, color: 'var(--color1)' }}>{agent.name}</Typography>
            <Typography variant="body2" color="text.secondary">{agent.description}</Typography>
            <Button
              variant="contained"
              sx={{
                mt: 2,
                background: 'var(--color2)',
                color: '#222',
                '&:hover': {
                  background: 'var(--color1)',
                  color: '#fff'
                }
              }}
            >
              {t('Use Agent')}
            </Button>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}

function ProfilePage() {
  const { t } = useTranslation();
  const { user, setUser } = React.useContext(UserContext);
  const [edit, setEdit] = React.useState({ name: user.name, email: user.email });
  const [open, setOpen] = React.useState(false);

  // For avatar edit (no real upload, just UI)
  const handleAvatarEdit = () => {
    alert('Avatar edit coming soon!');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    setUser({ ...user, name: edit.name, email: edit.email });
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <Container maxWidth="md" sx={{ py: 6, minHeight: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, color: 'var(--color1)', mb: 4, letterSpacing: 1, textAlign: 'center' }}>
        {t('Profile Settings')}
      </Typography>
      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Profile Card */}
        <Paper elevation={3} sx={{ flex: 1, minWidth: 320, maxWidth: 400, p: 4, borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Box sx={{ position: 'relative', mb: 2 }}>
            <Avatar src={user.avatar} sx={{ width: 90, height: 90, mb: 1, border: '3px solid var(--color1)' }} />
            <IconButton sx={{ position: 'absolute', bottom: 8, right: 8, background: '#fff', boxShadow: 1 }} onClick={handleAvatarEdit} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="h6" sx={{ color: 'var(--color1)', fontWeight: 700 }}>{user.name}</Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>{user.email}</Typography>
          <Divider sx={{ width: '100%', mb: 2 }} />
          <TextField label={t('Name')} name="name" value={edit.name} onChange={handleChange} fullWidth sx={{ mb: 2 }} size="small" />
          <TextField label={t('Email')} name="email" value={edit.email} onChange={handleChange} fullWidth sx={{ mb: 2 }} size="small" />
          <Button variant="contained" fullWidth sx={{ background: 'var(--color1)', color: '#fff', fontWeight: 700 }} onClick={handleUpdate}>
            {t('Update Profile')}
          </Button>
        </Paper>
      </Box>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <MuiAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {t('Profile updated')}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
}

export default App;
