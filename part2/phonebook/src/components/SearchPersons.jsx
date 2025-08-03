const SearchPersons = ({ search, handleSearch }) => {
  return (
    <>
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