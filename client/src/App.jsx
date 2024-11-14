import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Events from './pages/Events';
import Communities from './pages/Communities';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import Register from './pages/Register';
import CreateCommunity from './pages/CreateCommunity'
import CreateEvent from './pages/CreateEvent';
import Settings from './pages/Settings';
import { SocketProvider } from './context/SocketContext';
function App() {
  return (
    <AuthProvider>
    <SocketProvider>
      
    <Router>
      
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/create-community" element={<CreateCommunity />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path='/events' element={<Events/>}/>
          <Route path='/communities' element={<Communities/>}/>
          <Route path="/create-event" element={<CreateEvent />} />
          <Route path="/settings" element={<Settings/>}/>
        </Routes>
      
    </Router>
    </SocketProvider>
    </AuthProvider>
  );
}

export default App;
