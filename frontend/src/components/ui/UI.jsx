import styles from './UI.module.css'

export function PageHeader({ title, subtitle, action }) {
  return (
    <div className={styles.pageHeader}>
      <div>
        <h1 className={styles.pageTitle}>{title}</h1>
        {subtitle && <p className={styles.pageSubtitle}>{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}

export function Card({ children, className = '' }) {
  return <div className={`${styles.card} ${className}`}>{children}</div>
}

export function CardHeader({ title, right }) {
  return (
    <div className={styles.cardHeader}>
      <span className={styles.cardTitle}>{title}</span>
      {right && <div>{right}</div>}
    </div>
  )
}

export function Badge({ variant = 'default', children }) {
  return <span className={`${styles.badge} ${styles[`badge_${variant}`]}`}>{children}</span>
}

export function Alert({ type = 'error', children, onClose }) {
  return (
    <div className={`${styles.alert} ${styles[`alert_${type}`]}`}>
      <span>{children}</span>
      {onClose && <button className={styles.alertClose} onClick={onClose}>✕</button>}
    </div>
  )
}

export function Btn({ children, variant = 'default', type = 'button', onClick, disabled, loading }) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[`btn_${variant}`]}`}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <span className={styles.spinner} /> : children}
    </button>
  )
}

export function FormGroup({ label, children, error }) {
  return (
    <div className={styles.formGroup}>
      {label && <label className={styles.label}>{label}</label>}
      {children}
      {error && <span className={styles.fieldError}>{error}</span>}
    </div>
  )
}

export function FormRow({ children }) {
  return <div className={styles.formRow}>{children}</div>
}

export function Table({ columns, data, emptyText = 'Sin datos' }) {
  if (!data || data.length === 0) {
    return <div className={styles.empty}>{emptyText}</div>
  }
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : row[col.key] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function Spinner() {
  return <div className={styles.spinnerFull}><div className={styles.spinner} /></div>
}
