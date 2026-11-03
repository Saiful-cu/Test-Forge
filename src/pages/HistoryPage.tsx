import { useCallback, useEffect, useState } from 'react'
import { Button, Card, Modal, PageHeader } from '../components/ui'
import { api } from '../lib/api'
import { cn, formatDateTime } from '../lib/utils'
import { useMasterLibrary } from '../store/MasterLibraryContext'

interface Version {
  version: number
  message: string
  author: string
  createdAt: string
}
interface AuditEntry {
  id: number
  at: string
  actor: string
  action: string
  detail: string
}

export function HistoryPage() {
  const { libraryVersion, reloadLibrary } = useMasterLibrary()
  const [tab, setTab] = useState<'library' | 'audit'>('library')
  const [versions, setVersions] = useState<Version[]>([])
  const [entries, setEntries] = useState<AuditEntry[]>([])
  const [error, setError] = useState<string | null>(null)
  const [restoring, setRestoring] = useState<number | null>(null)

  const load = useCallback(async () => {
    try {
      const [v, a] = await Promise.all([
        api<{ versions: Version[] }>('GET', '/library/versions'),
        api<{ entries: AuditEntry[] }>('GET', '/audit'),
      ])
      setVersions(v.versions)
      setEntries(a.entries)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load history.')
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load, libraryVersion])

  const restore = async () => {
    if (restoring === null) return
    try {
      await api('POST', `/library/versions/${restoring}/restore`, {})
      await reloadLibrary()
      setRestoring(null)
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not restore that version.')
      setRestoring(null)
    }
  }

  const tabBtn = (id: 'library' | 'audit', label: string) => (
    <button
      type="button"
      onClick={() => setTab(id)}
      className={cn(
        'rounded-lg px-3 py-1.5 text-sm font-medium',
        tab === id ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100',
      )}
    >
      {label}
    </button>
  )

  return (
    <>
      <PageHeader
        title="History"
        subtitle="Every library save is kept as a version you can go back to. The activity log records users, access changes and project actions."
      />
      <div className="mb-4 flex gap-1">
        {tabBtn('library', 'Library versions')}
        {tabBtn('audit', 'Activity log')}
      </div>
      {error ? (
        <p role="alert" className="mb-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      ) : null}

      {tab === 'library' ? (
        <Card className="divide-y divide-slate-100">
          {versions.map((v) => (
            <div key={v.version} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-900">
                  Version {v.version}
                  {v.version === libraryVersion ? <span className="ml-2 text-xs font-normal text-emerald-600">current</span> : null}
                  <span className="ml-2 font-normal text-slate-600">— {v.message}</span>
                </p>
                <p className="text-xs text-slate-500">
                  {v.author} · {formatDateTime(v.createdAt)}
                </p>
              </div>
              {v.version !== libraryVersion ? (
                <Button size="sm" onClick={() => setRestoring(v.version)}>
                  Restore
                </Button>
              ) : null}
            </div>
          ))}
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-slate-900">
                Built-in library <span className="font-normal text-slate-600">— no custom changes</span>
              </p>
              <p className="text-xs text-slate-500">The starting point that ships with the app</p>
            </div>
            <Button size="sm" onClick={() => setRestoring(0)}>
              Restore
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="divide-y divide-slate-100">
          {entries.length === 0 ? <p className="px-4 py-6 text-center text-sm text-slate-500">Nothing recorded yet.</p> : null}
          {entries.map((e) => (
            <div key={e.id} className="px-4 py-2.5">
              <p className="text-sm text-slate-800">
                <span className="font-medium">{e.actor}</span> · {e.detail}
              </p>
              <p className="text-xs text-slate-500">
                {e.action} · {formatDateTime(e.at)}
              </p>
            </div>
          ))}
        </Card>
      )}

      <Modal
        open={restoring !== null}
        onClose={() => setRestoring(null)}
        title={restoring === 0 ? 'Restore the built-in library?' : `Restore version ${restoring}?`}
        description="This saves a new version with that content. Nothing in the history is lost, so you can undo it by restoring the version you are on now."
        footer={
          <>
            <Button onClick={() => setRestoring(null)}>Cancel</Button>
            <Button variant="primary" onClick={restore}>
              Restore
            </Button>
          </>
        }
      />
    </>
  )
}
