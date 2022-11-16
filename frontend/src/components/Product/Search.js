import React, { useState } from 'react'
import "./search.css"
import { useNavigate } from 'react-router-dom'
import MetaData from '../layouts/MetaData';

const Search = () => {
    const navigate = useNavigate();
    const [keyword, setkeyword] = useState("");
    const searchSubmitHandler = (e) =>{
        e.preventDefault()
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }
        else{
            
            navigate("/products")
        }
    }
    return (
        <>  <MetaData title={`UNIVERSE-Search`}/>
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input type="text" placeholder='Search Your Product here' onChange={(e)=>{setkeyword(e.target.value)}}/>
                <input type="submit" value="Search" />
            </form>
        </>
    )
}

export default Search