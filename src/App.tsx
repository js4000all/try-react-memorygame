import GameBoard from './components/GameBoard'
import { ToastProvider } from './contexts/ToastContext'
import './App.css'

function App() {
  return (
    <ToastProvider>
      <div className="app">
        <GameBoard />
      </div>
    </ToastProvider>
  )
}

export default App 