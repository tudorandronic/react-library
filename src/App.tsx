import React from 'react';
import './App.css';
import { Navbar } from './layouts/NavbarAndFooter/Navbar';
import { ExploreTopBooks } from './layouts/HomePage/ExploreTopBooks';
import { Carousel } from './layouts/HomePage/Carousel';
import { Heroes } from './layouts/HomePage/Heroes';
import { LibraryServices } from './layouts/HomePage/LibraryServices';

function App() {
  return (
    <div>
      <Navbar/>
      <ExploreTopBooks/>
      <Carousel/>
      <Heroes/>
      <LibraryServices/>
    </div>
  );
}

export default App;
