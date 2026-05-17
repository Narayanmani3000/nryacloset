const Image = ({url}) =>{
       // return <div className='flex items-center justify-center h-40   p-5 m-3 bg-gray-500'>image</div>
        return <div className="flex justify-center text-center mb-2 border border-gray-400 rounded-2xl"> <img className="rounded" src={url} alt="" /></div>
    }


export default Image;