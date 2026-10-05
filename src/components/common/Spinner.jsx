import { LoaderCircle } from 'lucide-react'

function Spinner({ className = '' }) {
  return <LoaderCircle className={`spinner ${className}`.trim()} aria-hidden="true" />
}

export default Spinner