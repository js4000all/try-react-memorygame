import GameManager from './components/GameManager'
import { ToastProvider } from './contexts/ToastContext'
import './App.css'

function App() {
  return (
    <ToastProvider>
      <div className="app">
        <GameManager />
      </div>
    </ToastProvider>
  )
}

export default App 