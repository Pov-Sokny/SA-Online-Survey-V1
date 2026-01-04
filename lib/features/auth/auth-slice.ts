import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  user: {
    id: string
    email: string
    name?: string
    username?: string
    roles?: string
  } | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: AuthState["user"] }>) => {
      state.user = action.payload.user
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
    restoreAuth: (state, action: PayloadAction<{ user: AuthState["user"] }>) => {
      state.user = action.payload.user
      state.isAuthenticated = true
    },
  },
})

export const { setCredentials, logout, restoreAuth } = authSlice.actions
export default authSlice.reducer
