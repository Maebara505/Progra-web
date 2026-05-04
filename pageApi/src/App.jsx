import { useState } from 'react';
import Calculadora from './Calculadora';
import Suma from './Suma';
import PokemonSearch from './PokemonSearch';

function App() {

  const [vistaActual, setVistaActual] = useState('home');

  if (vistaActual === 'Suma') {
    return (
      <div>
        {/* Un botón para regresar al Home cambiando el estado */}
        <button onClick={() => setVistaActual('home')} style={{ marginBottom: '20px', cursor: 'pointer' }}>
          ⬅ Volver al Menú Principal
        </button>
        
        {/* Aquí inyectamos tu componente */}
        <Suma /> 
      </div>
    );
  }

  if (vistaActual === 'calculadora') {
    return (
      <div>
        <button onClick={() => setVistaActual('home')} style={{ marginBottom: '20px', cursor: 'pointer' }}>
          ⬅ Volver al Menú Principal
        </button>
        
        <Calculadora />
      </div>
    );
  }

  if (vistaActual === 'PokemonSearch') {
    return (
      <div>
        <button onClick={() => setVistaActual('home')} style={{ marginBottom: '20px', cursor: 'pointer' }}>
          ⬅ Volver al Menú Principal
        </button>
        
        <PokemonSearch />
      </div>
    );
  }

  return (
    <div >
      <h1>Mis Aplicaciones</h1>
      <p>Selecciona una herramienta para comenzar:</p>
      
      <div>
        <button 
          onClick={() => setVistaActual('Suma')} 
        >
          ➕ Suma Simple
        </button>
        
        <button 
          onClick={() => setVistaActual('calculadora')} 
        >
          🧮 Calculadora Avanzada
        </button>
        
        <button 
          onClick={() => setVistaActual('PokemonSearch')} 
        >
          🕷️ Buscador de Pokémon
        </button>
      </div>
    </div>
  );
}

export default App;