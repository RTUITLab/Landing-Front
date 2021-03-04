import React from 'react';
import Header from './modules/header/Header';
import About from './modules/about/About';
//import News from './modules/news/News';
import Equipment from './modules/equipment/Equipment';
import Projects from './modules/projects/Projects';
import Contacts from './modules/contacts/Contacts';
import Footer from './modules/footer/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

function FullApp() {
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

function ExampleApp() {
  return (
    <div className="App">
      <Projects/>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/example"><ExampleApp></ExampleApp></Route>
        <Route path="/"><FullApp></FullApp></Route>
      </Switch>
    </Router>
  );
}

export default App;
