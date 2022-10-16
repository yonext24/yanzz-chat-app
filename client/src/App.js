import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login.js'
import Register from './pages/Register/Register.js'
import { UserContextProvider } from './contexts/UserContext';
import Home from './pages/Home/Home';

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
