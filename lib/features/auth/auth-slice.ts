import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  token: string | null
  user: {
    id: string
    email: string
    name?: string
    username?: string
  } | null
  isAuthenticated: boolean
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; user: AuthState["user"] }>) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.isAuthenticated = true

      if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", action.payload.token)
        localStorage.setItem("user", JSON.stringify(action.payload.user))
        console.log("[v0] Credentials stored successfully")
      }
    },
    logout: (state) => {
      state.token = null
      state.user = null
      state.isAuthenticated = false

      // Clear localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user")
        console.log("[v0] User logged out")
      }
    },
    restoreAuth: (state, action: PayloadAction<{ token: string; user: AuthState["user"] }>) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.isAuthenticated = true
      console.log("[v0] Auth restored from storage")
    },
  },
})

export const { setCredentials, logout, restoreAuth } = authSlice.actions
export default authSlice.reducer
