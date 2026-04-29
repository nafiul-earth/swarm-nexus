import { useMemo } from 'react'

export default function KpiTile({ label, value, weight = 'med', delta, deltaTone = 'green', spark = [] }) {
  const points = useMemo(() => {
    if (!spark.length) return ''
    const w = 90, h = 28
    const max = Math.max(...spark) * 1.05
    const min = Math.min(...spark) * 0.95
    return spark.map((v, i) => {
      const x = (i / (spark.length - 1)) * w
      const y = h - ((v - min) / (max - min || 1)) * h
      return `${x},${y}`
    }).join(' ')
  }, [spark])

  const stroke =
    deltaTone === 'amber' ? '#b28600' :
    deltaTone === 'red'   ? '#da1e28' :
    deltaTone === 'blue'  ? '#0f62fe' : '#24a148'

  return (
    <div className={`gn-kpi weight-${weight}`}>
      <div className="label">{label}</div>
      <div className="row">
        <div className="value">{value}</div>
        {spark.length > 0 && (
          <svg viewBox="0 0 90 28" className="spark">
            <polyline points={points} fill="none" stroke={stroke} strokeWidth="1.5" />
          </svg>
        )}
      </div>
      {delta && <div className={`delta ${deltaTone}`}>{delta}</div>}
    </div>
  )
}
