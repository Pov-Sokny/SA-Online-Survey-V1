import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface FilesState {
  backgroundImage: {
    [key: string]: string
  }
}

const initialState: FilesState = {
  backgroundImage: {},
}

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setBackgroundImage: (state, action: PayloadAction<{ type: string; url: string }>) => {
      state.backgroundImage[action.payload.type] = action.payload.url
    },
  },
})

export const { setBackgroundImage } = filesSlice.actions
export default filesSlice.reducer
