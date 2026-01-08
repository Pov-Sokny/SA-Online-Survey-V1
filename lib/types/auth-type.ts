export interface LoginRequest {
  username?: string
  email?: string
  password: string
}

export interface LoginResponse {
  message: string
}

export interface RegisterRequest {
  email: string
  password: string
  name?: string
  username?: string
  firstName?: string
  lastName?: string
  dateOfBirth?: string
  confirmPassword: string
}

export interface RegisterResponse {
  message: string
  requiresOtp: boolean
  isExisting?: boolean
  isVerified?: boolean
}

export interface VerifyOtpRequest {
  email: string
  token: string // Changed from 'otp' to 'token' to match backend
}

export interface VerifyOtpResponse {
  message: string
  user?: User
}

export interface ResendOtpRequest {
  email: string
}

export interface User {
  id: string
  email: string
  name?: string
  username?: string
  roles?: string // Backend returns "[USER]" or "[ADMIN]" as a string
}