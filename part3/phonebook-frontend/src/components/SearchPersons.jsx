const SearchPersons = ({ searchValue, setSearchValue }) => {
    return (
        <div>
            Search:
            <input 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
        </div>
    )
}

export default SearchPersons;