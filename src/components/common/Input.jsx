function Input({
  id,
  label,
  type = 'text',
  trailing,
  hint,
  error,
  className = '',
  ...inputProps
}) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={`field ${className}`.trim()}>
      <div className="field-label-row">
        <label className="field-label" htmlFor={id}>
          {label}
        </label>
        {hint ? (
          <span className="field-hint" id={`${id}-hint`}>
            {hint}
          </span>
        ) : null}
      </div>
      <div className="field-control">
        <input
          className={`field-input${trailing ? ' has-trailing' : ''}`}
          id={id}
          type={type}
          aria-describedby={describedBy || undefined}
          aria-invalid={Boolean(error)}
          {...inputProps}
        />
        {trailing}
      </div>
      {error ? (
        <span className="field-error" id={`${id}-error`}>
          {error}
        </span>
      ) : null}
    </div>
  )
}

export default Input