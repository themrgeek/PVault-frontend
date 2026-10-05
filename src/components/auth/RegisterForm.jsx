import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../common/Button.jsx'
import Input from '../common/Input.jsx'
import eyeIcon from '../../assets/icons/eye.svg'
import eyeOffIcon from '../../assets/icons/eye-off.svg'
import { registerUser } from '../../services/api.js'

function getPasswordStrength(password) {
  if (!password) return 0

  return [
    password.length >= 8,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d/.test(password),
    /[^a-zA-Z0-9]/.test(password),
  ].filter(Boolean).length
}

const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong']

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const strength = getPasswordStrength(password)
  const confirmationError = confirmation && confirmation !== password
    ? 'Passwords do not match.'
    : ''

  async function handleSubmit(event) {
    event.preventDefault()
    if (password !== confirmation) return

    const formData = new FormData(event.currentTarget)
    setFeedback('')
    setLoading(true)
    try {
      await registerUser({
        email: formData.get('email'),
        password,
      })
      navigate('/login', { state: { notice: 'Your account is ready. Sign in to open your vault.' } })
    } catch (error) {
      setFeedback(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <p className="auth-eyebrow">Initialize your account</p>
      <h1 className="auth-title">Create your vault</h1>
      <p className="auth-description">Set up a secure home for the credentials you rely on.</p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <Input
          id="register-email"
          label="Email address"
          type="email"
          placeholder="you@company.com"
          name="email"
          autoComplete="email"
          required
        />

        <div className="field">
          <Input
            id="register-password"
            label="Master password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a strong password"
            autoComplete="new-password"
            minLength={8}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            hint="8+ characters"
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
          <div className="password-meter" aria-live="polite">
            <div className="password-meter-track" aria-hidden="true">
              {[1, 2, 3, 4].map((level) => (
                <span
                  className={`password-meter-segment${strength >= level ? ` is-active level-${strength}` : ''}`}
                  key={level}
                />
              ))}
            </div>
            <div className="password-meter-label">
              <span>Password strength</span>
              <strong>{strengthLabels[strength]}</strong>
            </div>
          </div>
        </div>

        <Input
          id="register-confirm-password"
          label="Confirm password"
          type={showConfirmation ? 'text' : 'password'}
          placeholder="Re-enter your master password"
          autoComplete="new-password"
          required
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          error={confirmationError}
          trailing={(
            <button
              className="password-toggle"
              type="button"
              aria-label={showConfirmation ? 'Hide confirmation password' : 'Show confirmation password'}
              aria-pressed={showConfirmation}
              onClick={() => setShowConfirmation((visible) => !visible)}
            >
              <img src={showConfirmation ? eyeOffIcon : eyeIcon} alt="" />
            </button>
          )}
        />

        {feedback ? <p className="auth-feedback" role="status">{feedback}</p> : null}

        <Button type="submit" loading={loading} loadingText="Creating account" disabled={Boolean(confirmationError)}>
          Create account
          <ArrowRight aria-hidden="true" />
        </Button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link className="text-link" to="/login">Sign in</Link>
      </p>
    </>
  )
}

export default RegisterForm