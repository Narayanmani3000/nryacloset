 export default function WhatsappMessage({itemId,itemName,image,size,color}){


const phone = "919767869083";
const message = `Hi Nyra Closet, I want to order 
Id:${itemId} 
Product: ${itemName}
Size: ${Array.isArray(size) ? size.join(", ") : size}
Color:${color}
Is it available?
`;
const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

return <a 
 href={url}
 target="_blank"
 rel="noopener noreferrer"
 className="bg-green-500 text-white px-4 py-2 rounded block text-center mt-2"
 >
    Order on WhatsApp
 </a>

}