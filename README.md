# Gruppuppgift 3 Javascript 2 kurs
 
## Jonathans del:

rad 1-48 
1. Göra en separat fil för CSS för att göra de enklare att läsa, det kan bli en del kod när man har CSS och js/html i samma kod
2. Rad 20 använder inte zustand och kommer leda till komponenter inte kommer re-rendera korrekt 
3. Rad 18 Just nu kan man lägga samma favorit flera gånger och det kan resultera i förvirring och problem för använderan
 
Förbättring:
<img src={show.image.original} width={300} alt={show.name} />

---
## Linneas del:

Förbättringar rad 50-101 (ShowCard-funktionen):
Inline styling kan flyttas till ett separat CSS-dokument
Namngivningen av f.id kan bytas till favorite.id för att det ska bli tydligare
isFav är derived state. Det är räknas ut från store.favorites men lagras ändå som ett eget state 
med en useState och en useEffect. Detta skapar onödiga renders. Lösningen är att ta bort useState och useEffect helt och räkna ut värdet direkt.
---

## Angelicas del:
(rader 102-158)

Problem och buggar:
 I funktionen för SearchPage :

useEffect(() => {
    if (searchQuery == '') {     // bör vara: if (searchQuery.trim() === '') 

endast == kan ge konstiga jämförelser
.trim()stoppar tomma mellanslag från att trigga API-anrop

Förbättringsförslag:
I return kan vi ta bort:

.catch((e) => console.log(e))   // Onödigt, har redan error i state

Istället kan vi skriva:
.catch((err) => {
  setError('Could not get results. Please try again')
  setResults([])
})

På rad 143 kan vi ändra key={show.id} istället. Index keys kan ge konstiga rendering-buggar.
<ShowCard show={show} key={i} />     
        ))}
      </div>
    </div>
  )
}


På rad 150 kan vi ändra detta:

Ta bort hela useState delen, då den är onödig och vi redan har <h2>Favorites ({favorites.length})</h2>

function FavoritesPage() {
  const { favorites, removeFavorite } = useStore()

//Ta bort//
const [count, setCount] = useState(0)
  useEffect(() => {
    setCount(favorites.length)
  }, [favorites])

  console.log('FavoritesPage render', favorites)
//Ta bort//

Samma sak i return, ta bort index, ersätt med id.

return (
    <div style={{ padding: 20 }}>
      <h2>Favorites ({favorites.length})</h2>   (tagit bort count)
      {favorites.length === 0 && <p>No favorites yet</p>}
      {favorites.map((show, i) => (
      {favorites.map((show) => (
        <div
          key={i}
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

Lägg till button-knapp för semantik och korrekt HTML.

<button
          onClick={() => removeFavorite(show.id)} 
style={{ cursor: 'pointer', color: 'crimson' }}
>
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}

---

## Meriliis del:

Problem, buggar och förbättringsförslag (rader 190 – 235)
 
1.Routing
Const id = window.location.pathname.split(`/`). pop()
 
Problem:
-Inte React-standard
-Bryter React Router-principen
-Svår att underhålla
 
Bättre:
const { id } = useParams()
 
2.useState  och loading
const [show, setShow] = useState(null)
const [loading, setLoading] = useState(true)
 
Problem:
-Inte direkt buggar men: Loading styrs bara manuellt – risk för fast state om fetch failar
 
3.useEffect
 
useEffect(() => {
 fetch('https://api.tvmaze.com/shows/' + id)
   .then((r) => r.json())
   .then((data) => {
     setShow(data)
     setLoading(false)
   })
 
}, [])
 
Problem:
Saknar dependency array korrekt
 -id används men finns inte i [ ] 
 - kan ge fel data vid navigation
 
Saknar error handling
-Ingen .catch()
-Appen kan “hänga” i loading state
 
Loading reset saknas vid fel
setLoading(false) körs bara vid success
 
Förbättring:
}, [id])
 
4.Loading UI
if (loading) return <p>Loading...</p>
 
Det är helt ok men:
-Ingen fallback om API fastnar
-Ingen timeout eller error state
 
 
5.Not found check
If (!show) return <p>Not found</P>
 
Problem:
-kan visa “Not found” även vid API-fel
-blandar error och empty state
 
 
6.DangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: show.summary }} />
 
Problem:
-potentiell XSS-risk
-osäker rendering av HTML
-bör sanitiseras i riktiga appar
 
7.Render av image
{show.image && <img src={show.image.original} width={300} />}
 
Problem:
ingen alt-text → dålig tillgänglighet
