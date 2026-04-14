import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authService } from '../../services/authService'

const tokenFromStorage = localStorage.getItem('token')

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    return await authService.login(credentials)
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const register = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    return await authService.register(data)
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: tokenFromStorage || null,
    username: null,
    rol: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null
      state.username = null
      state.rol = null
      localStorage.removeItem('token')
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state) => { state.loading = true; state.error = null }
    const handleFulfilled = (state, action) => {
      state.loading = false
      state.token = action.payload.token
      state.username = action.payload.username
      state.rol = action.payload.rol
      localStorage.setItem('token', action.payload.token)
    }
    const handleRejected = (state, action) => {
      state.loading = false
      state.error = action.payload
    }
    builder
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, handleFulfilled)
      .addCase(login.rejected, handleRejected)
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, handleFulfilled)
      .addCase(register.rejected, handleRejected)
  },
})

export const { logout, clearError } = authSlice.actions
export const selectIsAuthenticated = (state) => !!state.auth.token
export const selectAuth = (state) => state.auth
export default authSlice.reducer
