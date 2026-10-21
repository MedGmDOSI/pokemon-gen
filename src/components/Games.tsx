import { useAppSelector } from '../app/hooks'

function formatName(name: string) {
  return name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function Games() {
  const { selected, selectedName, status, error } = useAppSelector(
    (state) => state.generationDetail,
  )

  return (
    <section className="panel" aria-labelledby="games-title">
      <h2 id="games-title">Jeux</h2>
      {status === 'idle' && (
        <p className="muted">Sélectionnez une génération.</p>
      )}
      {status === 'loading' && (
        <p className="muted" role="status">
          Chargement de {selectedName}…
        </p>
      )}
      {status === 'failed' && <p className="error" role="alert">{error}</p>}
      {status === 'succeeded' && selected && (
        <>
          <p className="region">
            Région principale : <strong>{formatName(selected.main_region.name)}</strong>
          </p>
          <ul className="chip-list">
            {selected.version_groups.map((game) => (
              <li className="chip" key={game.name}>
                {formatName(game.name)}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  )
}

export default Games
