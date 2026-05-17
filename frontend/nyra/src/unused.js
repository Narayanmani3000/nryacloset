 <input
        type="text"
        placeholder="Search product..."
        onChange={handleSearch}
        className="border border-gray-400 p-2 m-4 rounded w-[90%]"
      />



       const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();

    if (value === "") {
      setProduct(data || []);
      return;
    }

    const searchPro = (data || []).filter((p) =>
      p.name.toLowerCase().includes(value)
    );

    setProduct(searchPro || searchSize);
  };


  const clickSearch = (e)=>{
    const value = e.target.value;
     const searchSize = (data || []).filter((p) =>
    p.size.some((a) => a.toLowerCase() === value.toLowerCase())
  );
    setProduct(searchSize || [])
  }
   <div className="flex w-full justify-evenly md:justify-center-safe">

      <button value="M" onClick={clickSearch} className="border border-gray-500 px-4 md:m-2">M</button>
      <button value="L" onClick={clickSearch}  className="border border-gray-500 p-3 md:m-2">L</button>
      <button value="XL" onClick={clickSearch}  className="border border-gray-500 p-3 md:m-2">XL</button>
      <button value="XXL" onClick={clickSearch}  className="border border-gray-500 p-3 md:m-2">XXL</button>
     
      </div>