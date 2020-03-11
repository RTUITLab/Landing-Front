import React from 'react';
import Header from './modules/header/Header';
import About from './modules/about/About';
import News from './modules/news/News';
import Equipment from './modules/equipment/Equipment';
import Projects from './modules/projects/Projects';
import Contacts from './modules/contacts/Contacts';
import Footer from './modules/footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <About/>
      {/* <News/> */}
      <Projects/>
      <Equipment/>
      <Contacts/>
      <Footer/>
    </div>
  );
}

export default App;
