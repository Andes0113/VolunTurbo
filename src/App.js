import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import Header from './components/Header';
import Viewport from './pages/Viewport';
import Profile from './pages/Profile';
import Matches from './pages/Matches';
import Settings from './pages/Settings';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <ChakraProvider>
      <Router basename='/'>
        <Header />
        <Routes>
          <Route path="/" exact element={<Viewport />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/matches" element={<Matches />}/>
          <Route path="/settings" element={<Settings />}/>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;