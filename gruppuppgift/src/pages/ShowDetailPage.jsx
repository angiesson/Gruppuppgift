function ShowDetailPage() {
  const id = window.location.pathname.split('/').pop()

  const [show, setShow] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.tvmaze.com/shows/' + id)
      .then((r) => r.json())
      .then((data) => {
        setShow(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>
  if (!show) return <p style={{ padding: 20 }}>Not found</p>

  return (
    <div style={{ padding: 20 }}>
      <h1>{show.name}</h1>
      {show.image && <img src={show.image.original} width={300} />}
      <div dangerouslySetInnerHTML={{ __html: show.summary }} />
      <p>
        <strong>Genres:</strong> {show.genres?.join(', ')}
      </p>
      <p>
        <strong>Premiered:</strong> {show.premiered}
      </p>
    </div>
  )
}

export default ShowDetailPage;