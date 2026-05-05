import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router'

import Nav from './components/nav'
import SearchPage from './pages/searchPage'
import FavoritesPage from './pages/favoritesPage'
import ShowDetailPage from './pages/ShowDetailPage'

export default function App() {
  return (
    <BrowserRouter>
      <Nav />

      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/show/:id" element={<ShowDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}