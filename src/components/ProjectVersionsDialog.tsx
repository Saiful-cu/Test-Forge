import { useCallback, useEffect, useState } from 'react'
import { Button, Modal } from './ui'
import { api } from '../lib/api'
import { formatDateTime } from '../lib/utils'
import { useStore } from '../store/StoreContext'
import type { Project } from '../types'

interface Snapshot {
  id: number
  label: string
  author: string
  createdAt: string
}

export function ProjectVersionsDialog({
  open,
  onClose,
  project,
}: {
  open: boolean
  onClose: () => void
  project: Project
}) {
  const { replaceProject } = useStore()
  const [snapshots, setSnapshots] = useState<Snapshot[]>([])
  const [label, setLabel] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      const r = await api<{ snapshots: Snapshot[] }>('GET', `/projects/${project.id}/snapshots`)
      setSnapshots(r.snapshots)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load versions.')
    }
  }, [project.id])

  useEffect(() => {
    if (open) void load()
  }, [open, load])

  const run = async (fn: () => Promise<void>) => {
    setBusy(true)
    setError(null)
    try {
      await fn()
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    }
    setBusy(false)
  }

  const save = () =>
    run(async () => {
      // Push the on-screen state first so the snapshot is exactly what the user is looking at.
      await api('PUT', `/projects/${project.id}`, project)
      await api('POST', `/projects/${project.id}/snapshots`, { label })
      setLabel('')
    })

  const restore = (s: Snapshot) =>
    run(async () => {
      await api('PUT', `/projects/${project.id}`, project)
      const r = await api<{ project: Project }>('POST', `/projects/${project.id}/snapshots/${s.id}/restore`, {})
      replaceProject(r.project)
    })

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Project versions"
      description="Save a named snapshot of this project, or go back to an earlier one. Restoring keeps your current state as a snapshot too."
      footer={<Button onClick={onClose}>Close</Button>}
    >
      <div className="flex gap-2">
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Snapshot name, e.g. Before release 2.1"
          className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
        />
        <Button variant="primary" disabled={busy} onClick={save}>
          Save snapshot
        </Button>
      </div>
      {error ? (
        <p role="alert" className="mt-3 text-xs text-rose-600">
          {error}
        </p>
      ) : null}
      <ul className="mt-4 max-h-72 divide-y divide-slate-100 overflow-y-auto rounded-lg border border-slate-200">
        {snapshots.length === 0 ? (
          <li className="px-3 py-4 text-center text-xs text-slate-500">No snapshots yet.</li>
        ) : (
          snapshots.map((s) => (
            <li key={s.id} className="flex items-center justify-between gap-3 px-3 py-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-800">{s.label}</p>
                <p className="text-2xs text-slate-500">
                  {s.author} · {formatDateTime(s.createdAt)}
                </p>
              </div>
              <Button size="sm" disabled={busy} onClick={() => restore(s)}>
                Restore
              </Button>
            </li>
          ))
        )}
      </ul>
    </Modal>
  )
}
