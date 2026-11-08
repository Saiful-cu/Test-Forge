import { useCallback, useEffect, useState } from 'react'
import { History, MessageSquare, Pencil, RefreshCw, Send, Trash2 } from 'lucide-react'
import { Button } from './ui'
import { api } from '../lib/api'
import { cn, formatDateTime } from '../lib/utils'
import { useAuth } from '../store/AuthContext'

interface Comment {
  id: number
  author: string
  body: string
  createdAt: string
  editedAt: string | null
}

interface HistoryEvent {
  id: number
  at: string
  actor: string
  action: string
  field: string | null
  oldValue: string | null
  newValue: string | null
}

const FIELD_LABELS: Record<string, string> = {
  status: 'status',
  title: 'title',
  description: 'description',
  preconditions: 'preconditions',
  steps: 'test steps',
  expectedResult: 'expected result',
  actualResult: 'actual result',
  notes: 'execution notes',
  testType: 'test type',
  priority: 'priority',
  isMandatory: 'mandatory flag',
}

// Short values read well inline ("Not Run → Pass"); long ones are shown as a before/after block.
const isShort = (v: string | null) => (v ?? '').length <= 40 && !(v ?? '').includes('\n')

function describe(e: HistoryEvent): string {
  switch (e.action) {
    case 'created':
      return 'added this test case'
    case 'deleted':
      return 'deleted this test case'
    case 'comment.added':
      return 'commented'
    case 'comment.edited':
      return 'edited a comment'
    case 'comment.deleted':
      return 'deleted a comment'
    default:
      return `changed the ${FIELD_LABELS[e.field ?? ''] ?? e.field}`
  }
}

/**
 * Comments and audit history for one project test case. History is recorded by the database,
 * so it reflects saved changes; it refreshes shortly after the test case changes on screen.
 */
export function TestCaseActivity({
  projectId,
  testCaseId,
  changeSignal,
  onCountChange,
}: {
  projectId: string
  testCaseId: string
  /** Changes whenever the test case changes, so history can be re-read after it saves. */
  changeSignal: unknown
  onCountChange?: (count: number) => void
}) {
  const { user, isAdmin } = useAuth()
  const [tab, setTab] = useState<'comments' | 'history'>('comments')
  const [comments, setComments] = useState<Comment[]>([])
  const [events, setEvents] = useState<HistoryEvent[]>([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [text, setText] = useState('')
  const [posting, setPosting] = useState(false)
  const [editing, setEditing] = useState<{ id: number; body: string } | null>(null)

  const load = useCallback(async () => {
    try {
      const r = await api<{ comments: Comment[]; events: HistoryEvent[] }>(
        'GET',
        `/projects/${projectId}/test-cases/${testCaseId}/activity`,
      )
      setComments(r.comments)
      setEvents(r.events)
      onCountChange?.(r.comments.length)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load comments and history.')
    } finally {
      setLoaded(true)
    }
    // onCountChange is an inline callback from the parent; re-creating load for it would refetch on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, testCaseId])

  useEffect(() => {
    void load()
  }, [load])

  // Project saves are debounced by ~500 ms, so re-read a moment after the test case changes.
  const [firstSignal] = useState(changeSignal)
  useEffect(() => {
    if (changeSignal === firstSignal) return
    const t = setTimeout(() => void load(), 1500)
    return () => clearTimeout(t)
  }, [changeSignal, firstSignal, load])

  const run = async (fn: () => Promise<unknown>) => {
    setError(null)
    try {
      await fn()
      await load()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed.')
      return false
    }
  }

  const post = async () => {
    if (!text.trim()) return
    setPosting(true)
    const ok = await run(() => api('POST', `/projects/${projectId}/test-cases/${testCaseId}/comments`, { body: text }))
    if (ok) setText('')
    setPosting(false)
  }

  const canChange = (c: Comment) => isAdmin || (Boolean(user) && c.author === user?.username)

  return (
    <div className="mt-5 rounded-lg border border-slate-200 bg-white">
      <div className="flex items-center justify-between border-b border-slate-200 px-3">
        <div className="flex" role="tablist">
          {(
            [
              ['comments', MessageSquare, `Comments${comments.length ? ` (${comments.length})` : ''}`],
              ['history', History, 'History'],
            ] as const
          ).map(([key, Icon, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={cn(
                '-mb-px flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-xs font-medium transition',
                tab === key ? 'border-brand-600 text-brand-700' : 'border-transparent text-slate-500 hover:text-slate-800',
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => void load()}
          title="Refresh"
          aria-label="Refresh comments and history"
          className="rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="p-3">
        {error ? (
          <p role="alert" className="mb-3 rounded-md bg-rose-50 px-3 py-2 text-xs text-rose-700">
            {error}
          </p>
        ) : null}

        {!loaded ? (
          <p className="py-3 text-center text-xs text-slate-400">Loading…</p>
        ) : tab === 'comments' ? (
          <>
            {comments.length === 0 ? (
              <p className="py-2 text-xs text-slate-400">No comments yet.</p>
            ) : (
              <ul className="mb-3 space-y-3">
                {comments.map((c) => (
                  <li key={c.id} className="flex gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-2xs font-semibold uppercase text-brand-700">
                      {c.author.slice(0, 2)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs">
                        <span className="font-semibold text-slate-800">{c.author}</span>{' '}
                        <span className="text-slate-400">
                          {formatDateTime(c.createdAt)}
                          {c.editedAt ? ' · edited' : ''}
                        </span>
                      </p>
                      {editing?.id === c.id ? (
                        <div className="mt-1">
                          <textarea
                            className="input-base min-h-[64px] resize-y text-sm"
                            value={editing.body}
                            onChange={(e) => setEditing({ id: c.id, body: e.target.value })}
                          />
                          <div className="mt-1.5 flex justify-end gap-1.5">
                            <Button size="sm" onClick={() => setEditing(null)}>
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              variant="primary"
                              disabled={!editing.body.trim() || editing.body.trim() === c.body}
                              onClick={async () => {
                                if (await run(() => api('PATCH', `/comments/${c.id}`, { body: editing.body }))) setEditing(null)
                              }}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="mt-0.5 whitespace-pre-wrap break-words text-sm text-slate-700">{c.body}</p>
                      )}
                    </div>
                    {canChange(c) && editing?.id !== c.id ? (
                      <div className="flex shrink-0 items-start gap-0.5">
                        <button
                          type="button"
                          title="Edit comment"
                          aria-label="Edit comment"
                          onClick={() => setEditing({ id: c.id, body: c.body })}
                          className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        >
                          <Pencil className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          title="Delete comment"
                          aria-label="Delete comment"
                          onClick={() => {
                            if (window.confirm('Delete this comment?')) void run(() => api('DELETE', `/comments/${c.id}`))
                          }}
                          className="rounded p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ) : null}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex items-end gap-2">
              <textarea
                className="input-base min-h-[40px] flex-1 resize-y text-sm"
                rows={2}
                value={text}
                maxLength={5000}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) void post()
                }}
                placeholder={user ? 'Add a comment… (Ctrl+Enter to post)' : 'Add a comment as guest… (Ctrl+Enter to post)'}
              />
              <Button variant="primary" size="sm" icon={Send} disabled={posting || !text.trim()} onClick={post}>
                Post
              </Button>
            </div>
          </>
        ) : events.length === 0 ? (
          <p className="py-2 text-xs text-slate-400">
            No recorded changes yet. Changes are recorded from the moment history tracking was switched on.
          </p>
        ) : (
          <ol className="relative space-y-3 border-l border-slate-200 pl-4">
            {events.map((e) => (
              <li key={e.id} className="relative">
                <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-slate-300 ring-2 ring-white" />
                <p className="text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">{e.actor}</span> {describe(e)}
                  {e.action === 'updated' && isShort(e.oldValue) && isShort(e.newValue) ? (
                    <>
                      {': '}
                      <span className="text-slate-400 line-through">{e.oldValue || 'empty'}</span>
                      {' → '}
                      <span className="font-medium text-slate-800">{e.newValue || 'empty'}</span>
                    </>
                  ) : null}
                  <span className="ml-1.5 text-slate-400">{formatDateTime(e.at)}</span>
                </p>
                {e.action === 'updated' && !(isShort(e.oldValue) && isShort(e.newValue)) ? (
                  <div className="mt-1 grid grid-cols-1 gap-1.5 text-xs sm:grid-cols-2">
                    <p className="whitespace-pre-wrap break-words rounded-md bg-rose-50/70 px-2 py-1.5 text-rose-900">
                      {e.oldValue || <span className="italic text-rose-400">empty</span>}
                    </p>
                    <p className="whitespace-pre-wrap break-words rounded-md bg-emerald-50/70 px-2 py-1.5 text-emerald-900">
                      {e.newValue || <span className="italic text-emerald-400">empty</span>}
                    </p>
                  </div>
                ) : e.action.startsWith('comment.') && (e.newValue || e.oldValue) ? (
                  <p className="mt-1 line-clamp-2 whitespace-pre-wrap text-xs text-slate-500">“{e.newValue ?? e.oldValue}”</p>
                ) : null}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  )
}
