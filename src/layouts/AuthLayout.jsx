import { LockKeyhole, ShieldCheck } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import logo from '../assets/images/logo.svg'

function AuthLayout() {
  return (
    <main className="auth-page">
      <div className="auth-shell">
        <header className="brand-lockup">
          <img className="brand-logo" src={logo} alt="" />
          <span className="brand-name">
            p<span>vault</span>
          </span>
        </header>

        <section className="auth-panel" aria-label="Account access">
          <div className="panel-meta">
            <span className="meta-id">PV / AUTH-01</span>
            <span className="secure-indicator">
              <ShieldCheck aria-hidden="true" />
              Secure gateway
            </span>
          </div>
          <div className="auth-content">
            <Outlet />
          </div>
        </section>

        <footer className="auth-footer">
          <LockKeyhole aria-hidden="true" />
          <span>PRIVATE BY DESIGN</span>
          <span aria-hidden="true">/</span>
          <span>256-BIT ENCRYPTION</span>
        </footer>
      </div>
    </main>
  )
}

export default AuthLayout