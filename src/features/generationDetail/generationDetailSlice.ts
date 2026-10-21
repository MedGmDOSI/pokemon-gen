import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { GenerationSummary } from '../generations/generationsSlice'

export type NamedResource = {
  name: string
  url: string
}

export type GenerationDetail = {
  id: number
  name: string
  main_region: NamedResource
  version_groups: NamedResource[]
  pokemon_species: NamedResource[]
}

type GenerationDetailState = {
  selected: GenerationDetail | null
  selectedName: string | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  activeRequestId: string | null
}

const initialState: GenerationDetailState = {
  selected: null,
  selectedName: null,
  status: 'idle',
  error: null,
  activeRequestId: null,
}

export const fetchGenerationDetail = createAsyncThunk<
  GenerationDetail,
  GenerationSummary,
  { rejectValue: string }
>('generationDetail/fetch', async (generation, { rejectWithValue }) => {
  try {
    const response = await fetch(generation.url)

    if (!response.ok) {
      return rejectWithValue('Impossible de charger cette génération.')
    }

    return (await response.json()) as GenerationDetail
  } catch {
    return rejectWithValue('Erreur réseau. Vérifiez votre connexion.')
  }
})

const generationDetailSlice = createSlice({
  name: 'generationDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenerationDetail.pending, (state, action) => {
        state.status = 'loading'
        state.error = null
        state.selectedName = action.meta.arg.name
        state.activeRequestId = action.meta.requestId
      })
      .addCase(fetchGenerationDetail.fulfilled, (state, action) => {
        if (state.activeRequestId === action.meta.requestId) {
          state.status = 'succeeded'
          state.selected = action.payload
          state.activeRequestId = null
        }
      })
      .addCase(fetchGenerationDetail.rejected, (state, action) => {
        if (state.activeRequestId === action.meta.requestId) {
          state.status = 'failed'
          state.error = action.payload ?? 'Une erreur est survenue.'
          state.activeRequestId = null
        }
      })
  },
})

export default generationDetailSlice.reducer
