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
      <Router>
        <Header />
        <Routes>
          <Route path="/home" component={Viewport}/>
          <Route path="/profile" component={Profile}/>
          <Route path="/matches" component={Matches}/>
          <Route path="/settings" component={Settings}/>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;