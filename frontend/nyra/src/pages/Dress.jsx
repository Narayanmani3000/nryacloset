import React from 'react'
import data from '../data.js'
import { NavBar } from '../components/NavBar.jsx'
import { Hero } from '../components/Hero.jsx'

import { Cards } from '../components/Cards.jsx'
export default function Dress() {
    

    
  return (
    <>
    <NavBar/>
    <Hero/> 
    <Cards data={data}/>
    </>
  )
}
