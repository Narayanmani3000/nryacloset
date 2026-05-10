const discount = (oldPrice,newPrice)=>{
    const discountOff =  Math.round(((oldPrice - newPrice)/oldPrice)*100)
    return discountOff
}

export default discount;