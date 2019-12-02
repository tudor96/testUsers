import React from 'react'
import {SearchChangeInterface} from "../interfaces"

const SearchBar: React.FC<SearchChangeInterface> = ({handleSearchChange}) =>{
    return(
        <div className="" >
            <input 
                type="search"
                placeholder= "Search for user..." 
                onChange = {handleSearchChange}
                // onChange = {(event: React.ChangeEvent<HTMLInputElement>) => handleSearchChange(event)}
            />
        </div>
    )
}

export default SearchBar;