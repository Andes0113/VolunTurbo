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
} from "react-router-dom";
import { 
  Box
} from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <Router basename='/'>
        <Header />
        <Box margin={'auto'} width={'90vh'}>
          <Routes>
              <Route path="/" exact element={<About />}/>
              <Route path="/match" element={<Match />}/>
              <Route path="/profile" element={<Profile />}/>
              <Route path="/matches" element={<Matches />}/>
              <Route path="/settings" element={<Settings />}/>
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;