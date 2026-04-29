import { useEffect, useState, useRef } from 'react'
import { Tag } from '@carbon/react'
import { useNavigate } from 'react-router-dom'
import { EVENTS } from '../data/mock.js'

const TICKER_EXTRAS = [
  { id: 'EVT-2026-04-27-0815', type: 'CUSTOMS.DELAY',  sev: 'amber', payload: 'Lane SHA-LAX · port congestion · +18h ETA',  status: 'Triggered Flow', tone: 'blue', time: 'now' },
  { id: 'EVT-2026-04-27-0816', type: 'SUPPLIER.RISK',  sev: 'amber', payload: 'Supplier 442 · credit watch downgrade',       status: 'Auto-resolving', tone: 'green', time: 'now' },
  { id: 'EVT-2026-04-27-0817', type: 'WEATHER.ALERT',  sev: 'amber', payload: 'Corridor MEM-ATL · severe storm window',      status: 'Triggered Flow', tone: 'blue', time: 'now' }
]

const TONE_TYPE = { blue: 'blue', green: 'green', amber: 'warm-gray', gray: 'gray', red: 'red' }

export default function EventStream({ onSelect }) {
  const [events, setEvents] = useState(EVENTS)
  const idx = useRef(0)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setInterval(() => {
      idx.current = (idx.current + 1) % TICKER_EXTRAS.length
      const next = { ...TICKER_EXTRAS[idx.current], hero: true }
      setEvents(prev => {
        const demoted = prev.map(e => ({ ...e, hero: false, time: e.time === 'now' ? '1m ago' : e.time }))
        return [next, ...demoted].slice(0, 10)
      })
    }, 5500)
    return () => clearInterval(t)
  }, [])

  const handleClick = (ev) => {
    if (onSelect) return onSelect(ev)
    if (ev.type === 'SHIPMENT.LOST') navigate('/workspace')
    else if (ev.status === 'Held by mesh' || ev.status === 'Triggered Flow') navigate('/mesh')
  }

  return (
    <div className="gn-stream">
      <div className="gn-stream-head">
        <div className="left">
          <span className="dot" />
          <span>LIVE EVENT STREAM</span>
          <span style={{ color: 'var(--cds-text-secondary)', marginLeft: 8 }}>· 47 events / min</span>
        </div>
        <div style={{ display: 'flex', gap: 6, fontFamily: 'IBM Plex Mono, monospace', fontSize: 11, color: 'var(--cds-text-secondary)' }}>
          <span style={{ background: '#0f62fe', color: '#fff', padding: '2px 8px' }}>All</span>
          <span style={{ padding: '2px 8px' }}>Lost</span>
          <span style={{ padding: '2px 8px' }}>SLA breach</span>
          <span style={{ padding: '2px 8px' }}>Excursion</span>
        </div>
      </div>

      {events.map((ev, i) => (
        <div
          key={ev.id + i}
          className={`gn-stream-row ${ev.sev} ${ev.hero ? 'hero' : ''}`}
          onClick={() => handleClick(ev)}
          role="button"
        >
          <span className="severity-bar" />
          <span className="ev-id">{ev.id}</span>
          <span className="ev-type">{ev.type}</span>
          <span className="ev-payload">{ev.payload}</span>
          <Tag size="sm" type={TONE_TYPE[ev.tone] || 'gray'}>{ev.status}</Tag>
          <span className="ev-time">{ev.time}</span>
        </div>
      ))}
      {events[0]?.sub && (
        <div style={{ padding: '0.5rem 1rem 0.875rem 2rem', fontFamily: 'IBM Plex Mono, monospace', fontSize: 12, color: '#0f62fe', borderBottom: '1px solid var(--cds-border-subtle)' }}>
          {events[0].sub}
        </div>
      )}
    </div>
  )
}
