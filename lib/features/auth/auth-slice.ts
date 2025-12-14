import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  user: {
    id: string
    email: string
    name?: string
    username?: string
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
      console.log("[v0] User authenticated:", action.payload.user)
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      console.log("[v0] User logged out")
    },
    restoreAuth: (state, action: PayloadAction<{ user: AuthState["user"] }>) => {
      state.user = action.payload.user
      state.isAuthenticated = true
      console.log("[v0] Auth restored from API")
    },
  },
})

export const { setCredentials, logout, restoreAuth } = authSlice.actions
export default authSlice.reducer
