import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../common/Button.jsx'
import Input from '../common/Input.jsx'
import eyeIcon from '../../assets/icons/eye.svg'
import eyeOffIcon from '../../assets/icons/eye-off.svg'
import { createSession, setAuthToken } from '../../services/api.js'

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberDevice, setRememberDevice] = useState(true)
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    setFeedback('')
    setLoading(true)
    try {
      const session = await createSession({
        email: formData.get('email'),
        password: formData.get('password'),
      })
      if (!session.token) throw new Error('The server did not return an authentication token.')
      setAuthToken(session.token, rememberDevice)
      navigate('/vault', { replace: true })
    } catch (error) {
      setFeedback(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <p className="auth-eyebrow">Returning operator</p>
      <h1 className="auth-title">Access your vault</h1>
      <p className="auth-description">Sign in to continue to your secure credential workspace.</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <Input
          id="login-email"
          label="Email address"
          type="email"
          placeholder="you@company.com"
          name="email"
          autoComplete="email"
          required
        />

        <Input
          id="login-password"
          label="Master password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your master password"
          autoComplete="current-password"
          name="password"
          required
          trailing={(
            <button
              className="password-toggle"
              type="button"
              aria-label={showPassword ? 'Hide master password' : 'Show master password'}
              aria-pressed={showPassword}
              onClick={() => setShowPassword((visible) => !visible)}
            >
              <img src={showPassword ? eyeOffIcon : eyeIcon} alt="" />
            </button>
          )}
        />

        <div className="form-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={rememberDevice}
              onChange={(event) => setRememberDevice(event.target.checked)}
            />
            Remember this device
          </label>
        </div>

        {location.state?.notice ? <p className="auth-feedback" role="status">{location.state.notice}</p> : null}
        {feedback ? <p className="auth-feedback" role="status">{feedback}</p> : null}

        <Button type="submit" loading={loading} loadingText="Signing in">
          Sign in
          <ArrowRight aria-hidden="true" />
        </Button>
      </form>

      <p className="auth-switch">
        New to PVault? <Link className="text-link" to="/register">Create an account</Link>
      </p>
    </>
  )
}

export default LoginForm