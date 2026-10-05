import { useEffect, useState } from 'react'
import {
  ArrowDown, ArrowUp, Download, ExternalLink, Eye, EyeOff, KeyRound, LogOut,
  Pencil, Plus, Search, ShieldCheck, Trash2, X,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import {
  clearAuthToken,
  changePassword,
  createVaultItem,
  deleteAuthLogs,
  deleteVaultItem,
  downloadApiFile,
  getAuthLogs,
  getProfile,
  getVaultItem,
  getVaultItems,
  logoutSession,
  updateVaultItem,
} from '../services/api.js'

const PAGE_SIZE = 20
const EMPTY_FORM = { siteName: '', siteUrl: '', username: '', password: '', notes: '' }

function VaultPage() {
  const [profile, setProfile] = useState(null)
  const [items, setItems] = useState([])
  const [revealed, setRevealed] = useState({})
  const [filterInput, setFilterInput] = useState('')
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState('-createdAt')
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [modal, setModal] = useState('')
  const [editingItem, setEditingItem] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [showFormPassword, setShowFormPassword] = useState(false)
  const [logs, setLogs] = useState(null)
  const [logsOpen, setLogsOpen] = useState(false)
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmation: '' })
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    let active = true
    Promise.all([
      getProfile(),
      getVaultItems({ limit: PAGE_SIZE, offset: 0, sort, siteName: filter }),
    ])
      .then(([user, result]) => {
        if (!active) return
        setProfile(user)
        setItems(result.data || [])
        setOffset(0)
        setTotal(result.pagination?.total ?? result.data?.length ?? 0)
      })
      .catch((requestError) => {
        if (active) setError(requestError.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => { active = false }
  }, [filter, sort])

  function openCreate() {
    setEditingItem(null)
    setForm(EMPTY_FORM)
    setError('')
    setModal('item')
  }

  function openEdit(item) {
    setEditingItem(item)
    setForm({ ...EMPTY_FORM, ...item, password: '' })
    setError('')
    setModal('item')
  }

  async function handleSave(event) {
    event.preventDefault()
    const payload = {
      siteName: form.siteName.trim(),
      siteUrl: form.siteUrl.trim(),
      username: form.username.trim(),
      notes: form.notes.trim(),
    }
    if (form.password) payload.password = form.password
    if (!editingItem || form.password) payload.password = form.password

    setBusy(true)
    setError('')
    try {
      if (editingItem) {
        await updateVaultItem(editingItem.id, payload)
        setNotice('Credential updated.')
      } else {
        await createVaultItem(payload)
        setNotice('Credential saved to your vault.')
      }
      setModal('')
      await reloadItems()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }

  async function reloadItems(currentOffset = 0, append = false) {
    try {
      const result = await getVaultItems({ limit: PAGE_SIZE, offset: currentOffset, sort, siteName: filter })
      setItems((current) => append ? [...current, ...(result.data || [])] : result.data || [])
      setOffset(currentOffset)
      setTotal(result.pagination?.total ?? result.data?.length ?? 0)
      setRevealed({})
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  async function togglePassword(item) {
    if (revealed[item.id]) {
      setRevealed((current) => ({ ...current, [item.id]: null }))
      return
    }
    setError('')
    try {
      const details = await getVaultItem(item.id)
      setRevealed((current) => ({ ...current, [item.id]: details.password }))
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Delete the ${item.siteName} credential? This cannot be undone.`)) return
    setError('')
    try {
      await deleteVaultItem(item.id)
      setNotice('Credential deleted.')
      await reloadItems()
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  async function handleLogout() {
    setBusy(true)
    try {
      await logoutSession()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      clearAuthToken()
      setBusy(false)
      navigate('/login', { replace: true })
    }
  }

  async function handleLoadMore() {
    const nextOffset = offset + PAGE_SIZE
    setBusy(true)
    await reloadItems(nextOffset, true)
    setBusy(false)
  }

  async function toggleLogs() {
    const shouldOpen = !logsOpen
    setLogsOpen(shouldOpen)
    if (shouldOpen && !logs) {
      setError('')
      try {
        const result = await getAuthLogs()
        setLogs(result.logs || [])
      } catch (requestError) {
        setError(requestError.message)
      }
    }
  }

  async function handleDeleteLogs() {
    if (!window.confirm('Delete all authentication logs for this account?')) return
    try {
      const result = await deleteAuthLogs()
      setLogs([])
      setNotice(`${result.deletedCount ?? 0} authentication logs deleted.`)
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  async function handleDownload(path, filename) {
    setError('')
    try {
      await downloadApiFile(path, filename)
      setNotice(`${filename} downloaded.`)
    } catch (requestError) {
      setError(requestError.message)
    }
  }

  async function handlePasswordChange(event) {
    event.preventDefault()
    if (passwordForm.newPassword !== passwordForm.confirmation) {
      setError('The new passwords do not match.')
      return
    }
    if (passwordForm.newPassword.length < 8) {
      setError('The new password must be at least 8 characters.')
      return
    }
    setBusy(true)
    setError('')
    try {
      await changePassword(passwordForm.currentPassword, passwordForm.newPassword)
      setPasswordForm({ currentPassword: '', newPassword: '', confirmation: '' })
      setShowPasswordForm(false)
      setNotice('Master password updated.')
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setBusy(false)
    }
  }

  function handleSearch(event) {
    event.preventDefault()
    const nextFilter = filterInput.trim()
    if (nextFilter === filter) return
    setLoading(true)
    setError('')
    setFilter(nextFilter)
  }

  function clearSearch() {
    setFilterInput('')
    if (filter) {
      setLoading(true)
      setFilter('')
    }
  }

  return (
    <main className="vault-page">
      <header className="vault-header">
        <Link className="vault-brand" to="/vault" aria-label="PVault home">
          <KeyRound aria-hidden="true" />
          <span>p<span>vault</span></span>
        </Link>
        <div className="vault-user">
          <span className="vault-user-email">{profile?.email || 'Loading account...'}</span>
          <button className="icon-button logout-button" type="button" onClick={handleLogout} disabled={busy} title="Sign out" aria-label="Sign out">
            <LogOut aria-hidden="true" />
          </button>
        </div>
      </header>

      <section className="vault-main">
        <div className="vault-heading-row">
          <div>
            <p className="vault-eyebrow"><ShieldCheck aria-hidden="true" /> PRIVATE CREDENTIAL STORE</p>
            <h1>Your vault</h1>
            <p className="vault-subtitle">Credentials are encrypted by the PVault service and scoped to your account.</p>
          </div>
          <button className="vault-primary-button" type="button" onClick={openCreate}>
            <Plus aria-hidden="true" /> New credential
          </button>
        </div>

        <div className="vault-toolbar">
          <form className="vault-search" onSubmit={handleSearch}>
            <Search aria-hidden="true" />
            <input
              aria-label="Filter by site name"
              value={filterInput}
              onChange={(event) => setFilterInput(event.target.value)}
              placeholder="Filter by site name"
            />
            {filterInput ? (
              <button type="button" className="search-clear" onClick={clearSearch} aria-label="Clear search">
                <X aria-hidden="true" />
              </button>
            ) : null}
          </form>
          <label className="sort-control">
            <span>Sort</span>
            <select value={sort} onChange={(event) => { setLoading(true); setSort(event.target.value) }}>
              <option value="-createdAt">Newest</option>
              <option value="createdAt">Oldest</option>
              <option value="siteName">Site name</option>
            </select>
          </label>
          <span className="vault-count">{total} {total === 1 ? 'credential' : 'credentials'}</span>
        </div>

        {error ? <p className="vault-message is-error" role="alert">{error}</p> : null}
        {notice ? <p className="vault-message" role="status">{notice}</p> : null}

        <div className="vault-list" aria-live="polite">
          {loading ? <p className="vault-empty">Loading your vault...</p> : null}
          {!loading && items.length === 0 ? (
            <div className="vault-empty-state">
              <KeyRound aria-hidden="true" />
              <h2>{filter ? 'No matching credentials' : 'Your vault is empty'}</h2>
              <p>{filter ? 'Try another site name or clear the filter.' : 'Add your first login to keep it close and protected.'}</p>
              {!filter ? <button className="vault-secondary-button" type="button" onClick={openCreate}><Plus aria-hidden="true" /> Add a credential</button> : null}
            </div>
          ) : null}
          {items.map((item) => (
            <article className="vault-item" key={item.id}>
              <div className="vault-item-mark" aria-hidden="true">{item.siteName.slice(0, 1).toUpperCase()}</div>
              <div className="vault-item-main">
                <div className="vault-item-heading">
                  <h2>{item.siteName}</h2>
                  {item.siteUrl ? (
                    <a href={item.siteUrl} target="_blank" rel="noreferrer" aria-label={`Open ${item.siteName}`} title={item.siteUrl}>
                      <ExternalLink aria-hidden="true" />
                    </a>
                  ) : null}
                </div>
                <p className="vault-username">{item.username}</p>
                <div className="vault-secret-line">
                  <code>{revealed[item.id] ?? '••••••••••••'}</code>
                  <button className="icon-button small-icon-button" type="button" onClick={() => togglePassword(item)} aria-label={revealed[item.id] ? 'Hide password' : 'Reveal password'} title={revealed[item.id] ? 'Hide password' : 'Reveal password'}>
                    {revealed[item.id] ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                  </button>
                </div>
                {item.notes ? <p className="vault-notes">{item.notes}</p> : null}
              </div>
              <div className="vault-item-actions">
                <button className="icon-button" type="button" onClick={() => openEdit(item)} title="Edit credential" aria-label={`Edit ${item.siteName}`}>
                  <Pencil aria-hidden="true" />
                </button>
                <button className="icon-button danger-icon-button" type="button" onClick={() => handleDelete(item)} title="Delete credential" aria-label={`Delete ${item.siteName}`}>
                  <Trash2 aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {!loading && items.length < total ? (
          <button className="load-more-button" type="button" onClick={handleLoadMore} disabled={busy}>
            <ArrowDown aria-hidden="true" /> Load more
          </button>
        ) : null}

        <section className="account-tools" aria-labelledby="account-tools-title">
          <div className="account-tools-heading">
            <div>
              <p className="vault-eyebrow">ACCOUNT CONTROLS</p>
              <h2 id="account-tools-title">Security &amp; activity</h2>
            </div>
            <button className="vault-secondary-button" type="button" onClick={() => { setError(''); setShowPasswordForm(true) }}>
              <KeyRound aria-hidden="true" /> Change password
            </button>
          </div>
          <div className="account-tool-actions">
            <button className="account-tool-button" type="button" onClick={() => handleDownload('/auth-logs/export', 'auth-logs.txt')}>
              <Download aria-hidden="true" /> Export logs
            </button>
            <button className="account-tool-button" type="button" onClick={() => handleDownload('/auth-logs/backup', 'auth-backup.json')}>
              <Download aria-hidden="true" /> Download account backup
            </button>
            <button className="account-tool-button" type="button" onClick={toggleLogs}>
              <ShieldCheck aria-hidden="true" /> {logsOpen ? 'Hide activity' : 'View activity'}
            </button>
          </div>
          {logsOpen ? (
            <div className="auth-log-list">
              {logs === null ? <p className="auth-log-empty">Loading activity...</p> : null}
              {logs?.length === 0 ? <p className="auth-log-empty">No authentication activity found.</p> : null}
              {logs?.map((log) => (
                <div className="auth-log-row" key={log.id}>
                  <span className="auth-log-event">{log.eventType.replaceAll('_', ' ')}</span>
                  <span className="auth-log-ip">{log.details?.ipAddress || 'IP unavailable'}</span>
                  <time dateTime={log.timestamp}>{new Date(log.timestamp).toLocaleString()}</time>
                </div>
              ))}
              {logs?.length ? <button className="delete-logs-button" type="button" onClick={handleDeleteLogs}><Trash2 aria-hidden="true" /> Delete activity</button> : null}
            </div>
          ) : null}
        </section>

        <footer className="vault-footer">
          <span>PV / VAULT-01</span>
          <span>ACCOUNT CREATED {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : '--'}</span>
        </footer>
      </section>

      {modal === 'item' ? (
        <div className="vault-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setModal('') }}>
          <section className="vault-modal" role="dialog" aria-modal="true" aria-labelledby="item-modal-title">
            <div className="vault-modal-heading">
              <div>
                <p className="vault-eyebrow">{editingItem ? 'UPDATE RECORD' : 'NEW RECORD'}</p>
                <h2 id="item-modal-title">{editingItem ? 'Edit credential' : 'Add credential'}</h2>
              </div>
              <button className="icon-button" type="button" onClick={() => setModal('')} aria-label="Close dialog"><X aria-hidden="true" /></button>
            </div>
            <form className="vault-form" onSubmit={handleSave}>
              <label className="vault-field">
                <span>Site name</span>
                <input required maxLength="100" value={form.siteName} onChange={(event) => setForm({ ...form, siteName: event.target.value })} />
              </label>
              <label className="vault-field">
                <span>Website URL</span>
                <input type="url" required placeholder="https://example.com" value={form.siteUrl} onChange={(event) => setForm({ ...form, siteUrl: event.target.value })} />
              </label>
              <label className="vault-field">
                <span>Username</span>
                <input required autoComplete="off" value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} />
              </label>
              <label className="vault-field">
                <span>{editingItem ? 'New password (optional)' : 'Password'}</span>
                <div className="vault-password-input">
                  <input type={showFormPassword ? 'text' : 'password'} required={!editingItem} autoComplete="new-password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} />
                  <button className="icon-button" type="button" onClick={() => setShowFormPassword((visible) => !visible)} aria-label={showFormPassword ? 'Hide password' : 'Show password'}>
                    {showFormPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                  </button>
                </div>
              </label>
              <label className="vault-field">
                <span>Notes <small>Optional</small></span>
                <textarea rows="3" maxLength="1000" value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} />
              </label>
              {error ? <p className="vault-message is-error" role="alert">{error}</p> : null}
              <div className="vault-modal-actions">
                <button className="vault-secondary-button" type="button" onClick={() => setModal('')}>Cancel</button>
                <button className="vault-primary-button" type="submit" disabled={busy}>{busy ? 'Saving...' : editingItem ? 'Save changes' : 'Save credential'}<ArrowUp aria-hidden="true" /></button>
              </div>
            </form>
          </section>
        </div>
      ) : null}

      {showPasswordForm ? (
        <div className="vault-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowPasswordForm(false) }}>
          <section className="vault-modal" role="dialog" aria-modal="true" aria-labelledby="password-modal-title">
            <div className="vault-modal-heading">
              <div>
                <p className="vault-eyebrow">ACCOUNT SECURITY</p>
                <h2 id="password-modal-title">Change master password</h2>
              </div>
              <button className="icon-button" type="button" onClick={() => setShowPasswordForm(false)} aria-label="Close dialog"><X aria-hidden="true" /></button>
            </div>
            <form className="vault-form" onSubmit={handlePasswordChange}>
              <label className="vault-field"><span>Current password</span><input type="password" required autoComplete="current-password" value={passwordForm.currentPassword} onChange={(event) => setPasswordForm({ ...passwordForm, currentPassword: event.target.value })} /></label>
              <label className="vault-field"><span>New password</span><input type="password" required minLength="8" autoComplete="new-password" value={passwordForm.newPassword} onChange={(event) => setPasswordForm({ ...passwordForm, newPassword: event.target.value })} /></label>
              <label className="vault-field"><span>Confirm new password</span><input type="password" required minLength="8" autoComplete="new-password" value={passwordForm.confirmation} onChange={(event) => setPasswordForm({ ...passwordForm, confirmation: event.target.value })} /></label>
              {error ? <p className="vault-message is-error" role="alert">{error}</p> : null}
              <div className="vault-modal-actions">
                <button className="vault-secondary-button" type="button" onClick={() => setShowPasswordForm(false)}>Cancel</button>
                <button className="vault-primary-button" type="submit" disabled={busy}>{busy ? 'Updating...' : 'Update password'}<ArrowUp aria-hidden="true" /></button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </main>
  )
}

export default VaultPage