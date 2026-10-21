import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  fetchGenerations,
  type GenerationSummary,
} from '../features/generations/generationsSlice'
import { fetchGenerationDetail } from '../features/generationDetail/generationDetailSlice'

function generationLabel(name: string) {
  const romanNumeral = name.split('-').at(-1)?.toUpperCase()
  return `Génération ${romanNumeral ?? name}`
}

function Generations() {
  const dispatch = useAppDispatch()
  const { items, status, error } = useAppSelector((state) => state.generations)
  const { selectedName } = useAppSelector((state) => state.generationDetail)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGenerations())
    }
  }, [dispatch, status])

  function selectGeneration(generation: GenerationSummary) {
    dispatch(fetchGenerationDetail(generation))
  }

  return (
    <section className="panel generations-panel" aria-labelledby="generations-title">
      <h2 id="generations-title">Générations</h2>
      {status === 'loading' && (
        <p className="muted" role="status">Chargement des générations…</p>
      )}
      {status === 'failed' && <p className="error" role="alert">{error}</p>}
      {status === 'succeeded' && (
        <ul className="generation-list">
          {items.map((generation) => (
            <li key={generation.url}>
              <button
                className={
                  selectedName === generation.name
                    ? 'generation-button selected'
                    : 'generation-button'
                }
                type="button"
                aria-pressed={selectedName === generation.name}
                onClick={() => selectGeneration(generation)}
              >
                {generationLabel(generation.name)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default Generations
