import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Index from "./pages/Index/Index";
import ProjectPageTemplate from "./modules/ProjectPageTemplate/ProjectPageTemplate";
import AchievementPageTemplate from "./modules/AchievementPageTemplate/AchievementPageTemplate";
import {ParallaxProvider} from "react-scroll-parallax";
import CP from "./pages/archievements/CP";

declare module 'react' {
  interface HTMLAttributes<T> {
    active?: any
  }
}

function App() {


  return (
    <div className="App" >
      <ParallaxProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Index />} />
            <Route path="/project/test" element={<ProjectPageTemplate title={"title"} coverLink={"f"} desc={"Описание"}/>}/>
            <Route path="/achievement/test" element={<CP/>}/>

            {/**
             Errors
             **/}
            <Route path="/project/*" element={<div>project 404</div>}/>
            <Route path="/achievement/*" element={<div>achievement 404</div>}/>
            <Route path='*' element={<div>404</div>} />
          </Routes>
        </BrowserRouter>
      </ParallaxProvider>
    </div>
  );
}

export default App;
