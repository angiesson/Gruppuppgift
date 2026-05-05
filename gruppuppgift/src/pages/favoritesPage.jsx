
function FavoritesPage() {
  const { favorites, removeFavorite } = useStore()

/*  const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(favorites.length)
  }, [favorites])

  console.log('FavoritesPage render', favorites)
  */
 /* onödigt med count då vi redan har favorites.length*/


 /* tar bort index, kan bli problematiskt, bättre att använda id*/
  return (
    <div style={{ padding: 20 }}>
      <h2>Favorites ({favorites.length})</h2>
      {favorites.length === 0 && <p>No favorites yet</p>}
      {favorites.map((show) => (
        <div
          key={show.id}
          style={{
            border: '1px solid #ccc',
            padding: 12,
            margin: 8,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h3 style={{ margin: 0 }}>{show.name}</h3>
            <p style={{ margin: '4px 0' }}>
              Rating: {show.rating?.average ?? 'N/A'}
            </p>
          </div>

          /* ändrade till button, bättre för semantik */
          <button onClick={() => removeFavorite(show.id)} style={{ cursor: 'pointer', color: 'crimson' }}>
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}

export default FavoritesPage;
