function ShowCard({ show }) {
  const store = useStore()

  const [isFav, setIsFav] = useState(
    store.favorites.find((f) => f.id === show.id) !== undefined
  )

  useEffect(() => {
    setIsFav(store.favorites.find((f) => f.id === show.id) !== undefined)
  }, [store.favorites])

  const toggle = () => {
    if (isFav) {
      store.removeFavorite(show.id)
    } else {
      store.addFavorite(show)
    }
    setIsFav(!isFav)
  }

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: 12,
        margin: 8,
        display: 'flex',
        gap: 12,
      }}
    >
      {show.image && <img src={show.image.medium} width={80} />}
      <div style={{ flex: 1 }}>
        <h3 style={{ margin: 0 }}>{show.name}</h3>
        <p style={{ margin: '4px 0' }}>
          Rating: {show.rating?.average ?? 'N/A'}
        </p>
        <div
          onClick={toggle}
          style={{
            cursor: 'pointer',
            color: isFav ? 'crimson' : 'gray',
            userSelect: 'none',
            marginBottom: 6,
          }}
        >
          {isFav ? '♥ Favorited' : '♡ Add to favorites'}
        </div>
        <a href={'/show/' + show.id}>Details →</a>
      </div>
    </div>
  )
}

export default ShowCard;