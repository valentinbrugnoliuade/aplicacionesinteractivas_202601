import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectAuth } from '../../store/slices/authSlice'
import styles from './Layout.module.css'

const NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: DashIcon },
  { to: '/clientes', label: 'Clientes', icon: ClienteIcon },
  { to: '/creditos', label: 'Créditos', icon: CreditoIcon },
  { to: '/cobranzas', label: 'Cobranzas', icon: CobranzaIcon },
]

export default function Layout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { username, rol } = useSelector(selectAuth)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const initials = username ? username.slice(0, 2).toUpperCase() : 'U'

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <span className={styles.brandDot} />
          <span className={styles.brandName}>CréditosApp</span>
        </div>

        <nav className={styles.nav}>
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.navActive : ''}`
              }
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.userArea}>
          <div className={styles.avatar}>{initials}</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{username}</span>
            <span className={styles.userRol}>{rol}</span>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout} title="Cerrar sesión">
            <LogoutIcon />
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  )
}

function DashIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" fill="currentColor"/><rect x="9" y="1" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5"/><rect x="1" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".5"/><rect x="9" y="9" width="6" height="6" rx="1.5" fill="currentColor" opacity=".3"/></svg>
}
function ClienteIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5.5" r="2.5" fill="currentColor"/><path d="M2.5 14c0-3 2.5-5 5.5-5s5.5 2 5.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
}
function CreditoIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1" y="4" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M4 9h2M4 11.5h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M9.5 9h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity=".5"/></svg>
}
function CobranzaIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M8 4.5v3.5l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function LogoutIcon() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5.5 2H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M9.5 9.5 12 7l-2.5-2.5M12 7H5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
