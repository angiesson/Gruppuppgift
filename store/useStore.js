import { create } from "zustand";

const useStore = create((set, get) => ({
  favorites: [],
  searchQuery: '',
  searchResults: [],
  loading: false,
  error: null,
  
  addFavorite: (show) =>
    set((state) => {
      state.favorites.push(show)
      return { favorites: state.favorites }
    }),

  removeFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.filter((f) => f.id != id),
    })),
;
  setQuery: (q) => set({ searchQuery: q }),
  setResults: (r) => set({ searchResults: r }),
  setLoading: (l) => set({ loading: l }),
  setError: (e) => set({ error: e }),
}))


export default useStore;