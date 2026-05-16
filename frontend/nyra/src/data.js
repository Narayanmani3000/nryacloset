const images = import.meta.glob('./assets/*.png',{eager : true})

const dresses = Object.values(images);
console.log(dresses)
const dress = [
    {
        id:1,
        image:dresses[0].default,
        name:"Stylish Multicolor Striped Flared Kurti",
        color: "multicolor",
        details:"Pair it with Leggings, palazzos, heels jhumkas,or flats for a complete fashionable look.",
        price: 999,
        offer: 799,
        size:["M","L","XL","XXL"]

    },
    {
        id:2,
        image:dresses[1].default,
        name:"Elegant Olive Green Printed Kurti",
        color: "Printed",
        details:"Pair it with Leggings, palazzos, heels jhumkas,or flats for a complete fashionable look.",
        price: 649,
        offer: 499,
        size:["M","L","XL","XXL"]

    },
    {
        id:3,
        image:dresses[2].default,
        name:"Elegant Blue Floral Kurti Pant Set",
        color: "Printed",
        details:"Perfect For: Office, Casual Wear, College, tDaily Comfort",
        price: 899,
        offer: 699,
        size:["M","L","XL","XXL"]

    },
    {
        id:4,
        image:dresses[3].default,
        name:"Pastel Cotton Printed Kurti 3Pc Set",
        color: "Printed",
        details:"Perfect For: Office, Casual Wear, College, tDaily Comfort",
        price: 899,
        offer: 499,
        size:["XL"]

    },
    {
        id:5,
        image:dresses[4].default,
        name:"Traditional Rust Printed Kurti Pant Set",
        color: ["Beige", "Aqua Blue", "Pink", "Lavender"],
        details:"Perfect For: Daily Wear, Office Wear,Casual Outings",
        price: 999,
        offer: 799,
        size:["M","L","XL","XXL"]

    },
    {
        id:6,
        image:dresses[5].default,
        name:"Elegant Red Printed Flared Kurti",
        color: "Printed",
        details:"Perfect For: Daily Wear, Office Wear,Casual Outings",
        price: 999,
        offer: 899,
        size:["M","L","XL","XXL"]

    },
    {
        id:7,
        image:dresses[6].default,
        name:"Elegant Red Printed Flared Kurti",
        color: "Printed",
        details:"Perfect For: Daily Wear, Office Wear,Casual Outings",
        price: 999,
        offer: 899,
        size:["M","L","XL","XXL"]

    },
    {
        id:8,
        image:dresses[7].default,
        name:"Elegant Red Printed Flared Kurti",
        color: "Printed",
        details:"Perfect For: Daily Wear, Office Wear,Casual Outings",
        price: 999,
        offer: 899,
        size:["M","L","XL","XXL"]

    },
    {
        id:9,
        image:dresses[8].default,
        name:"Elegant Red Printed Flared Kurti",
        color: "Printed",
        details:"Perfect For: Daily Wear, Office Wear,Casual Outings",
        price: 999,
        offer: 899,
        size:["M","L","XL","XXL"]

    },
    {
        id:10,
        image:dresses[9].default,
        name:"Elegant Red Printed Flared Kurti",
        color: "Printed",
        details:"Perfect For: Daily Wear, Office Wear,Casual Outings",
        price: 999,
        offer: 899,
        size:["M","L","XL","XXL"]

    },
    {
        id:11,
        image:dresses[10].default,
        name:"Elegant Red Printed Flared Kurti",
        color: "Printed",
        details:"Perfect For: Daily Wear, Office Wear,Casual Outings",
        price: 999,
        offer: 899,
        size:["M","L","XL","XXL"]

    },
    {
        id:12,
        image:dresses[11].default,
        name:"Elegant Red Printed Flared Kurti",
        color: "Printed",
        details:"Perfect For: Daily Wear, Office Wear,Casual Outings",
        price: 999,
        offer: 899,
        size:["M","L","XL","XXL"]

    },
   
]
export default dress;