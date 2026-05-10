import React, { useEffect, useState } from 'react'
import discount from '../util/discountCalculator.js'
import Image from '../components/ImageReplacement.jsx'
export const Cards = ({data}) => {
  const [product, setProduct] = useState([])
  const [search, setSearch] = useState()
  const [searchProduct, setSearchProduct] = useState([])
  useEffect(()=>{
    setProduct(data)
  },[])
  const handleSearch = (e) =>{
   const searchPro = product.filter(p=> (p.name).includes(e.target.value))
   setProduct(searchPro)
  }
  return (<>
    <div className='max-w-full m-4'><input onChange={handleSearch} className='p-2 w-full ring ring-gray-500' type="text" /></div>
    <div className='grid grid-cols-2'>{product.map((da,i)=>{
      return <div key={da.id} className='items-center p-5 m-4 border border-gray-600'>
       <Image url={da.image}/>
        <h1 className='font-bold text-blue-900'>{da.name}</h1>
        <p>{da.color}</p>
        <p>Size: {da.size.map(s => <span>{`${s} `}</span>)}</p>
        <p>
        <span className='line-through text-gray-400 block'>Rs. {da.price}</span>
        <span className='text-green-600 font-bold mr-2'>Rs. {da.dp}</span>
        <span className='text-gray-600 font-semibold'>({discount(da.price, da.dp)}% Off)</span>
        </p>
       </div>
    })}</div>
    </>
  )
}
