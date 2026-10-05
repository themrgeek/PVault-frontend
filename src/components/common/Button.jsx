import Spinner from './Spinner.jsx'

function Button({ children, loading = false, loadingText, ...props }) {
  return (
    <button className="auth-button" disabled={loading || props.disabled} {...props}>
      {loading ? <Spinner /> : null}
      <span>{loading ? loadingText : children}</span>
    </button>
  )
}

export default Button