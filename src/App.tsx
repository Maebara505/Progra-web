import { useState } from 'react';
import Calculator from './components/Calculator';
import Addition from './components/Addition';
import PokemonSearch from './components/PokemonSearch';

type View = 'home' | 'addition' | 'calculator' | 'pokemon';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  const renderBackButton = () => (
    <button 
      onClick={() => setCurrentView('home')} 
      style={{ marginBottom: '20px', cursor: 'pointer' }}
    >
      ⬅ Back to Main Menu
    </button>
  );

  return (
    <div style={{ padding: '20px' }}>
      {currentView === 'home' ? (
        <div className="main-menu">
          <h1>My Applications</h1>
          <p>Select a tool to begin:</p>
          
          <div >
            <button onClick={() => setCurrentView('addition')}>
              ➕ Simple Addition
            </button>
            
            <button onClick={() => setCurrentView('calculator')}>
              🧮 Advanced Calculator
            </button>
            
            <button onClick={() => setCurrentView('pokemon')}>
              🕷️ Pokemon Searcher
            </button>
          </div>
        </div>
      ) : (
        <div className="view-container">
          {renderBackButton()}
          
          {/* Conditional Rendering based on currentView */}
          {currentView === 'addition' && <Addition />}
          {currentView === 'calculator' && <Calculator />}
          {currentView === 'pokemon' && <PokemonSearch />}
        </div>
      )}
    </div>
  );
}

export default App;