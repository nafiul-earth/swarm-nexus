import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './AppShell.jsx'
import Today from './pages/Today.jsx'
import Executive from './pages/Executive.jsx'
import Goals from './pages/Goals.jsx'
import Delegate from './pages/Delegate.jsx'
import Live from './pages/Live.jsx'
import Plans from './pages/Plans.jsx'
import Knowledge from './pages/Knowledge.jsx'
import Decisions from './pages/Decisions.jsx'
import Replay from './pages/Replay.jsx'
import Eval from './pages/Eval.jsx'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/"           element={<Today />} />
        <Route path="/exec"       element={<Executive />} />
        <Route path="/goals"      element={<Goals />} />
        <Route path="/delegate"   element={<Delegate />} />
        <Route path="/live"       element={<Live />} />
        <Route path="/plans"      element={<Plans />} />
        <Route path="/knowledge"  element={<Knowledge />} />
        <Route path="/decisions"  element={<Decisions />} />
        <Route path="/replay"     element={<Replay />} />
        <Route path="/eval"       element={<Eval />} />
        <Route path="*"           element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}
