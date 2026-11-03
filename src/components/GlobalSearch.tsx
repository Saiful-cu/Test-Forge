import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileCheck2, FolderKanban, Layers, Search, X } from 'lucide-react'
import { useStore } from '../store/StoreContext'
import { useMasterLibrary } from '../store/MasterLibraryContext'

interface Hit {
  key: string
  kind: 'Project' | 'Feature' | 'Test case'
  title: string
  subtitle: string
  to: string
}

export function GlobalSearch() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const { projects } = useStore()
  const { casesFor, features: MASTER_FEATURES } = useMasterLibrary()
  const navigate = useNavigate()
  const boxRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const hits = useMemo<Hit[]>(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return []
    const out: Hit[] = []

    for (const p of projects) {
      if (p.name.toLowerCase().includes(q) || p.categoryName.toLowerCase().includes(q)) {
        out.push({
          key: `p-${p.id}`,
          kind: 'Project',
          title: p.name,
          subtitle: `${p.categoryName} · ${p.testCases.length} test cases`,
          to: `/projects/${p.id}`,
        })
      }
      if (out.length >= 4) break
    }

    let featureCount = 0
    for (const f of MASTER_FEATURES) {
      if (featureCount >= 5) break
      if (f.name.toLowerCase().includes(q)) {
        out.push({
          key: `f-${f.id}`,
          kind: 'Feature',
          title: f.name,
          subtitle: `${f.categoryName} · ${f.moduleName}`,
          to: `/features/${encodeURIComponent(f.id)}`,
        })
        featureCount += 1
      }
    }

    // The library is generated on demand, so test cases are searched within the features
    // that already matched rather than by materialising every case in every industry.
    const searchable = MASTER_FEATURES.filter(
      (f) => f.name.toLowerCase().includes(q) || f.moduleName.toLowerCase().includes(q),
    ).slice(0, 8)
    let tcCount = 0
    for (const f of searchable) {
      if (tcCount >= 5) break
      for (const tc of casesFor(f.id)) {
        if (tcCount >= 5) break
        if (!tc.title.toLowerCase().includes(q) && !tc.id.toLowerCase().includes(q)) continue
        out.push({
          key: `t-${tc.id}`,
          kind: 'Test case',
          title: tc.title,
          subtitle: `${tc.id} · ${tc.testType} · ${tc.priority}`,
          to: `/features/${encodeURIComponent(f.id)}?q=${encodeURIComponent(tc.id)}`,
        })
        tcCount += 1
      }
    }

    // The dropdown only reaches cases inside matching features, so always offer the full
    // library search, which does scan every test case title.
    out.push({
      key: 'all',
      kind: 'Test case',
      title: `Search all test cases for “${query.trim()}”`,
      subtitle: 'Opens the master test case library with this search applied',
      to: `/test-cases?q=${encodeURIComponent(query.trim())}`,
    })

    return out
  }, [query, projects, casesFor, MASTER_FEATURES])

  const go = (to: string) => {
    setOpen(false)
    setQuery('')
    navigate(to)
  }

  const iconFor = (kind: Hit['kind']) =>
    kind === 'Project' ? FolderKanban : kind === 'Feature' ? Layers : FileCheck2

  return (
    <div ref={boxRef} className="relative w-full max-w-md">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && hits[0]) go(hits[0].to)
        }}
        placeholder="Search projects, features and test cases…"
        className="input-base pl-9 pr-16"
      />
      {query ? (
        <button
          type="button"
          onClick={() => setQuery('')}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:bg-slate-100"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : (
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-2xs text-slate-400">
          /
        </kbd>
      )}

      {open && query.trim().length >= 2 ? (
        <div className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-pop">
          {hits.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-slate-500">
              No matches for “{query.trim()}”.
            </p>
          ) : (
            <ul className="max-h-[22rem] divide-y divide-slate-100 overflow-y-auto">
              {hits.map((hit) => {
                const Icon = iconFor(hit.kind)
                return (
                  <li key={hit.key}>
                    <button
                      type="button"
                      onClick={() => go(hit.to)}
                      className="flex w-full items-start gap-3 px-4 py-2.5 text-left transition hover:bg-slate-50"
                    >
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-500">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-slate-900">{hit.title}</span>
                        <span className="block truncate text-xs text-slate-500">{hit.subtitle}</span>
                      </span>
                      <span className="mt-1 shrink-0 text-2xs font-medium uppercase tracking-wide text-slate-400">
                        {hit.kind}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  )
}
