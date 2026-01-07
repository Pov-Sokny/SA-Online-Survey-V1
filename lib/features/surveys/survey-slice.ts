import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface SurveyState {
  currentSurvey: {
    id?: string
    title: string
    description?: string
  } | null
  surveys: Array<{
    id: string
    title: string
    description?: string
  }>
}

const initialState: SurveyState = {
  currentSurvey: null,
  surveys: [],
}

const surveySlice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    setCurrentSurvey: (state, action: PayloadAction<{ id?: string; title: string; description?: string }>) => {
      state.currentSurvey = action.payload
    },
    resetCurrentSurvey: (state) => {
      state.currentSurvey = null
    },
    addSurvey: (state, action: PayloadAction<{ id: string; title: string; description?: string }>) => {
      state.surveys.push(action.payload)
    },
  },
})

export const { setCurrentSurvey, resetCurrentSurvey, addSurvey } = surveySlice.actions
export default surveySlice.reducer
