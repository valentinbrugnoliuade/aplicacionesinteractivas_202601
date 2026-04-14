import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, register, clearError, selectAuth } from '../store/slices/authSlice'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading, error, token } = useSelector(selectAuth)
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({ username: '', password: '' })

  useEffect(() => {
    if (token) navigate('/dashboard', { replace: true })
  }, [token, navigate])

  const handleChange = (e) => {
    dispatch(clearError())
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (mode === 'login') dispatch(login(form))
    else dispatch(register(form))
  }

  const toggleMode = () => {
    dispatch(clearError())
    setMode((m) => (m === 'login' ? 'register' : 'login'))
  }

  return (
    <div className={styles.page}>
      <div className={styles.box}>
        <div className={styles.logo}>
          <span className={styles.logoDot} />
          <span>CréditosApp</span>
        </div>

        <h1 className={styles.title}>
          {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
        </h1>
        <p className={styles.subtitle}>
          {mode === 'login' ? 'Ingresá con tu usuario' : 'Registrá un nuevo usuario'}
        </p>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Usuario</label>
            <input
              name="username"
              type="text"
              placeholder="tu-usuario"
              value={form.username}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>
          <div className={styles.field}>
            <label>Contraseña</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading
              ? <span className={styles.spinner} />
              : mode === 'login' ? 'Ingresar' : 'Registrarme'
            }
          </button>
        </form>

        <p className={styles.toggle}>
          {mode === 'login' ? '¿No tenés cuenta?' : '¿Ya tenés cuenta?'}
          {' '}
          <button className={styles.toggleBtn} onClick={toggleMode}>
            {mode === 'login' ? 'Registrate' : 'Iniciá sesión'}
          </button>
        </p>
      </div>
    </div>
  )
}
