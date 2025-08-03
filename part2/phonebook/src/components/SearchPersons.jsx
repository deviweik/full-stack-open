const SearchPersons = ({ search, handleSearch }) => {
  return (
    <>
      <h2>Search: </h2>
      <input
        type='text'
        value={search}
        onChange = {handleSearch}
        placeholder = 'Search by name'
      />
    </>
  )
}

export default SearchPersons;