import { useMemo, useState } from 'react'
import { useAppSelector } from '../app/hooks'

function Pokemons() {
  const [search, setSearch] = useState('')
  const { selected, status } = useAppSelector(
    (state) => state.generationDetail,
  )

  const filteredPokemons = useMemo(() => {
    const pokemon = selected?.pokemon_species ?? []
    const searchTerm = search.trim().toLowerCase()

    return pokemon.filter((item) => item.name.includes(searchTerm))
  }, [search, selected])

  return (
    <section className="panel" aria-labelledby="pokemons-title">
      <div className="section-heading">
        <h2 id="pokemons-title">Pokémons</h2>
        {selected && status === 'succeeded' && (
          <span className="count">{filteredPokemons.length}</span>
        )}
      </div>
      {status === 'idle' && (
        <p className="muted">La liste apparaîtra après le choix d’une génération.</p>
      )}
      {status === 'loading' && (
        <p className="muted" role="status">Chargement des Pokémons…</p>
      )}
      {status === 'failed' && (
        <p className="muted">La liste est indisponible pour le moment.</p>
      )}
      {selected && status === 'succeeded' && (
        <>
          <label className="visually-hidden" htmlFor="pokemon-filter">
            Filtrer les Pokémons par nom
          </label>
          <input
            className="filter-input"
            id="pokemon-filter"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Filtrer par nom…"
          />
          {filteredPokemons.length > 0 ? (
            <ul className="pokemon-list">
              {filteredPokemons.map((pokemon) => {
                const pokemonId = pokemon.url.split('/').filter(Boolean).at(-1)
                const spriteUrl = pokemonId
                  ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
                  : null

                return (
                  <li className="pokemon-item" key={pokemon.name}>
                    {spriteUrl && (
                      <img
                        src={spriteUrl}
                        alt=""
                        width="48"
                        height="48"
                        loading="lazy"
                      />
                    )}
                    <span>{pokemon.name}</span>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="muted">Aucun Pokémon ne correspond à la recherche.</p>
          )}
        </>
      )}
    </section>
  )
}

export default Pokemons
