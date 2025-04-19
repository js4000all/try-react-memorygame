import { useState } from 'react'
import CardGrid from './components/CardGrid'
import './App.css'

function App() {
  const [cards] = useState([
    { id: 1, value: 'A', isFlipped: false },
    { id: 2, value: 'B', isFlipped: false },
    { id: 3, value: 'C', isFlipped: false },
    { id: 4, value: 'D', isFlipped: false },
    { id: 5, value: 'A', isFlipped: false },
    { id: 6, value: 'B', isFlipped: false },
    { id: 7, value: 'C', isFlipped: false },
    { id: 8, value: 'D', isFlipped: false },
  ]);

  const handleCardClick = (id: number) => {
    console.log(`Card ${id} clicked`);
  };

  return (
    <div className="app">
      <h1>Memory Game</h1>
      <CardGrid
        cards={cards}
        onCardClick={handleCardClick}
        pairs={4}
      />
    </div>
  )
}

export default App 