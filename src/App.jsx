import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/navbar';
import Manager from './components/manager';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <div className="bg-green-500 py-6 px-4" id='top'>
        <h1 className="text-4xl text-yellow">Password Manager</h1>
      </div>
      <Navbar/>
      <Manager/>
      <Footer/>
    </>
  )  
}

export default App


