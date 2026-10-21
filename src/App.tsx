import Generations from './components/Generations'
import Games from './components/Games'
import Pokemons from './components/Pokemons'
import './App.css'

function App() {
  return (
    <main className="app-shell">
      <header className="page-header">
        <p className="eyebrow">Pokédex with PokéAPI</p>
        <h1>Les générations Pokémon</h1>
        <p className="intro">
          Choisissez une génération pour découvrir ses jeux et ses Pokémon.
        </p>
      </header>

      <div className="explorer">
        <Generations />
        <div className="generation-content">
          <Games />
          <Pokemons />
        </div>
      </div>

      <footer>
        Données fournies par{' '}
        <a href="https://pokeapi.co/" target="_blank" rel="noreferrer">
          PokéAPI
        </a>
        <img src="/image.png" alt="PokéAPI" style={{ height: '2rem', marginLeft: '1rem' }} />
      </footer>
    </main>
  )
}

export default App
