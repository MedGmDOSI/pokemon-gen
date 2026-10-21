import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type GenerationSummary = {
  name: string
  url: string
}

type GenerationListState = {
  items: GenerationSummary[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

type GenerationListResponse = {
  results: GenerationSummary[]
}

const initialState: GenerationListState = {
  items: [],
  status: 'idle',
  error: null,
}

export const fetchGenerations = createAsyncThunk<
  GenerationSummary[],
  void,
  { rejectValue: string }
>('generations/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://pokeapi.co/api/v2/generation')

    if (!response.ok) {
      return rejectWithValue('Impossible de charger les générations.')
    }

    const data: GenerationListResponse = await response.json()
    return data.results
  } catch {
    return rejectWithValue('Erreur réseau. Vérifiez votre connexion.')
  }
})

const generationsSlice = createSlice({
  name: 'generations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenerations.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchGenerations.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchGenerations.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Une erreur est survenue.'
      })
  },
})

export default generationsSlice.reducer
