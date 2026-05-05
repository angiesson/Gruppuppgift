function SearchPage() {
  const {
    searchQuery,
    searchResults,
    loading,
    error,
    setQuery,
    setResults,
    setLoading,
    setError,
  } = useStore()

  useEffect(() => {
    if (searchQuery == '') {
      setResults([])
      return
    }
    setLoading(true)
    fetch('https://api.tvmaze.com/search/shows?q=' + searchQuery)
      .then((r) => r.json())
      .then((data) => {
        setResults(data.map((d) => d.show))
        setLoading(false)
      })
      .catch((e) => console.log(e))
  }, [searchQuery])

  return (
    <div style={{ padding: 20 }}>
      <input
        type="text"
        placeholder="Search shows..."
        value={searchQuery}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: 8, width: 320, fontSize: 16 }}
      />
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <div>
        {searchResults.map((show, i) => (
          <ShowCard show={show} key={i} />
        ))}
      </div>
    </div>
  )
}


export default SearchPage;