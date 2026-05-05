function Nav() {
  const favorites = useStore((s) => s.favorites)

  return (
    <nav style={{ padding: 12, background: '#222', color: 'white' }}>
      <a href="/" style={{ color: 'white', marginRight: 16 }}>
        Search
      </a>
      <a href="/favorites" style={{ color: 'white' }}>
        Favorites ({favorites.length})
      </a>
    </nav>
  )
}


export default Nav;