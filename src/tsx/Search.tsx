
import React, { SFC } from 'react'
import { ISearchProps } from './interface'

const Search: SFC<ISearchProps> = ({ handleSearchChange }) => {
  return (
    <div className="Search">
      <fieldset>
        <legend>Enter stuff:</legend>
        <input className="searchInput" type="text" onKeyPress={handleSearchChange} placeholder="回车确定" />
      </fieldset>

    </div>
  )
}

export default Search;