import React from 'react'

import { NavBar } from '../components/NavBar.jsx'
import { Hero } from '../components/Hero.jsx'

import { Cards } from '../components/Cards.jsx'
export default function Home({data}) {
    

    
  return (
    <>
    <NavBar/>
    <Hero/> 
    <Cards data={data}/>
    </>
  )
}
