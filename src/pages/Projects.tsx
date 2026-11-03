import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BarChart3, FolderKanban, Pencil, Plus, Trash2 } from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Field,
  Modal,
  PageHeader,
  SearchInput,
  Select,
  StackedBar,
} from '../components/ui'
import { useStore } from '../store/StoreContext'
import { MASTER_CATEGORIES } from '../data/masterLibrary'
import { computeStats, formatDate, relativeDate } from '../lib/utils'
import type { Project } from '../types'
import { useAuth } from '../store/AuthContext'

const ALL = 'all'

export function Projects() {
  const { projects, updateProject, deleteProject } = useStore()
  const { isAdmin } = useAuth()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [categoryId, setCategoryId] = useState(ALL)
  const [editing, setEditing] = useState<Project | null>(null)
  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [deleting, setDeleting] = useState<Project | null>(null)

  const usedCategories = useMemo(() => {
    const ids = new Set(projects.map((p) => p.categoryId))
    return MASTER_CATEGORIES.filter((c) => ids.has(c.id))
  }, [projects])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return projects
      .filter((p) => (categoryId === ALL ? true : p.categoryId === categoryId))
      .filter((p) =>
        q ? `${p.name} ${p.description} ${p.categoryName}`.toLowerCase().includes(q) : true,
      )
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
  }, [projects, query, categoryId])

  const startEdit = (p: Project) => {
    setEditing(p)
    setEditName(p.name)
    setEditDescription(p.description)
  }

  const saveEdit = () => {
    if (!editing || !editName.trim()) return
    updateProject(editing.id, { name: editName, description: editDescription })
    setEditing(null)
  }

  return (
    <>
      <PageHeader
        title="Projects"
        subtitle="Each project holds its own independent copy of the test cases imported from the master library."
        action={
          <Button variant="primary" icon={Plus} onClick={() => navigate('/projects/new')}>
            Create Project
          </Button>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchInput value={query} onChange={setQuery} placeholder="Search projects…" className="flex-1" />
        <Select
          aria-label="Filter by category"
          value={categoryId}
          onChange={setCategoryId}
          className="sm:w-64"
          options={[
            { value: ALL, label: 'All categories' },
            ...usedCategories.map((c) => ({ value: c.id, label: c.name })),
          ]}
        />
      </div>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState
            icon={FolderKanban}
            title={projects.length === 0 ? 'No projects yet' : 'No projects match your filters'}
            description={
              projects.length === 0
                ? 'Create a project, pick the features it will implement, and its test cases are imported automatically.'
                : 'Try a different keyword or clear the category filter.'
            }
            action={
              projects.length === 0 ? (
                <Button variant="primary" icon={Plus} onClick={() => navigate('/projects/new')}>
                  Create Project
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    setQuery('')
                    setCategoryId(ALL)
                  }}
                >
                  Clear filters
                </Button>
              )
            }
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
          {filtered.map((p) => {
            const s = computeStats(p.testCases)
            return (
              <Card key={p.id} className="flex flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      to={`/projects/${p.id}`}
                      className="truncate text-base font-semibold tracking-tight text-slate-900 hover:text-brand-700"
                    >
                      {p.name}
                    </Link>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      <Badge className="bg-brand-50 text-brand-700 ring-brand-600/20">{p.categoryName}</Badge>
                      <Badge className="bg-slate-100 text-slate-600 ring-slate-500/20">
                        {p.features.length} features
                      </Badge>
                      <Badge className="bg-slate-100 text-slate-600 ring-slate-500/20">
                        {s.total} test cases
                      </Badge>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      icon={Pencil}
                      aria-label={`Edit ${p.name}`}
                      onClick={() => startEdit(p)}
                    />
                    {isAdmin ? <Button
                      size="sm"
                      variant="ghost"
                      icon={Trash2}
                      aria-label={`Delete ${p.name}`}
                      className="text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                      onClick={() => setDeleting(p)}
                    /> : null}
                  </div>
                </div>

                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-500">{p.description}</p>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Execution</span>
                    <span className="font-medium tabular-nums text-slate-900">{s.executionPct}%</span>
                  </div>
                  <StackedBar
                    className="mt-2"
                    segments={[
                      { label: 'Pass', value: s.pass, className: 'bg-emerald-500' },
                      { label: 'Fail', value: s.fail, className: 'bg-rose-500' },
                      { label: 'Blocked', value: s.blocked, className: 'bg-amber-500' },
                      { label: 'Not Run', value: s.notRun, className: 'bg-slate-200' },
                    ]}
                  />
                  <dl className="mt-3 grid grid-cols-4 gap-2 text-center">
                    {[
                      ['Passed', s.pass, 'text-emerald-600'],
                      ['Failed', s.fail, 'text-rose-600'],
                      ['Blocked', s.blocked, 'text-amber-600'],
                      ['Not run', s.notRun, 'text-slate-600'],
                    ].map(([label, value, tone]) => (
                      <div key={label as string} className="rounded-lg bg-slate-50 px-2 py-2">
                        <dt className="text-2xs uppercase tracking-wide text-slate-500">{label}</dt>
                        <dd className={`mt-0.5 text-sm font-semibold tabular-nums ${tone}`}>{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-200 pt-4">
                  <p className="min-w-0 truncate text-2xs text-slate-500">
                    Created {formatDate(p.createdAt)} · updated {relativeDate(p.updatedAt)}
                  </p>
                  <div className="flex shrink-0 gap-2">
                    <Button size="sm" icon={BarChart3} onClick={() => navigate(`/reports/${p.id}`)}>
                      Report
                    </Button>
                    <Button size="sm" variant="primary" onClick={() => navigate(`/projects/${p.id}`)}>
                      Open
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      <Modal
        open={Boolean(editing)}
        onClose={() => setEditing(null)}
        title="Edit project"
        description="Feature selection is managed from the project page."
        footer={
          <>
            <Button onClick={() => setEditing(null)}>Cancel</Button>
            <Button variant="primary" disabled={!editName.trim()} onClick={saveEdit}>
              Save changes
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Field label="Project name" required>
            <input className="input-base" value={editName} onChange={(e) => setEditName(e.target.value)} />
          </Field>
          <Field label="Description">
            <textarea
              className="input-base min-h-[88px] resize-y"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
            />
          </Field>
          {editing ? (
            <p className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
              Category <span className="font-medium text-slate-700">{editing.categoryName}</span> cannot be changed
              after creation, because the imported test cases belong to it.
            </p>
          ) : null}
        </div>
      </Modal>

      <Modal
        open={Boolean(deleting)}
        onClose={() => setDeleting(null)}
        title={`Delete ${deleting?.name ?? 'project'}?`}
        footer={
          <>
            <Button onClick={() => setDeleting(null)}>Cancel</Button>
            <Button
              variant="danger"
              onClick={() => {
                if (deleting && isAdmin) deleteProject(deleting.id)
                setDeleting(null)
              }}
            >
              Delete project
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          This permanently removes the project and its{' '}
          <span className="font-medium text-slate-900">{deleting?.testCases.length ?? 0} test case records</span>,
          including every execution result. The master library is not affected.
        </p>
      </Modal>
    </>
  )
}
