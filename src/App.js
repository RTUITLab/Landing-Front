import React from 'react';
import Header from './modules/header/Header';
import About from './modules/about/About';
import Projects from './modules/projects/Projects';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <About/>
      <Projects/>
    </div>
  );
}

export default App;
