import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import Header from './components/Header';
import About from './pages/About';
import Profile from './pages/Profile';
import Matches from './pages/Matches';
import Match from './pages/Match';
import Settings from './pages/Settings';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";

function App() {

  function RequireAuth({ children }) {
    var token = sessionStorage.getItem('Bearer Token');
    const location = useLocation();
    
    return token 
    ?  children
    : <Navigate to="/login" replace state={{ path: location.pathname }} />;
  }

  return (
      <ChakraProvider>
        <Router basename='/'>
          <Header />
            <Routes>
                <Route path="/" exact element={
                  <RequireAuth>
                    <About />
                  </RequireAuth>}/>
                <Route path="/match" element={
                  <RequireAuth>
                    <Match />
                  </RequireAuth>}/>
                <Route path="/matches" element={
                  <RequireAuth>
                    <Matches />
                  </RequireAuth>}/>
                <Route path="/settings" element={
                  <RequireAuth>
                    <Settings />
                  </RequireAuth>}/>
                <Route path="/login" element={<Profile />}/>
            </Routes>
        </Router>
      </ChakraProvider>
  );
}

export default App;