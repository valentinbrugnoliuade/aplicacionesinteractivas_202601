import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectAuth } from '../store/slices/authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username, token, rol } = useSelector(selectAuth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <span style={styles.brand}>💳 Créditos UADE</span>
      {token && (
        <div style={styles.links}>
          <Link to="/clientes"    style={styles.link}>Clientes</Link>
          <Link to="/creditos"    style={styles.link}>Créditos</Link>
          <Link to="/cobranzas"   style={styles.link}>Cobranzas</Link>
          <Link to="/comentarios" style={styles.link}>Comentarios</Link>
          {rol === 'ADMIN' && (
            <Link to="/admin/permisos" style={{ ...styles.link, color: '#ffb74d' }}>⚙ Permisos</Link>
          )}
          <span style={styles.user}>👤 {username} {rol === 'ADMIN' && <span style={styles.badge}>ADMIN</span>}</span>
          <button onClick={handleLogout} style={styles.btn}>Salir</button>
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav:   { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 24px', backgroundColor:'#1e3a5f', color:'white' },
  brand: { fontWeight:'bold', fontSize:'1.2rem' },
  links: { display:'flex', alignItems:'center', gap:'20px' },
  link:  { color:'#90caf9', textDecoration:'none', fontWeight:'500' },
  user:  { color:'#b0bec5', fontSize:'0.9rem' },
  badge: { background:'#ff9800', color:'white', borderRadius:'4px', padding:'1px 6px', fontSize:'0.7rem', marginLeft:'4px' },
  btn:   { background:'#e53935', color:'white', border:'none', padding:'6px 14px', borderRadius:'6px', cursor:'pointer' },
};
