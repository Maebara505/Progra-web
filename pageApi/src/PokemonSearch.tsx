import { useState } from 'react';

interface PokemonItem {
  id: number;
  nombre: string;
  imagenMiniatura: string;
}

interface PokemonDetalle {
  nombre: string;
  imagenGrande: string;
  tipos: string;
  peso: number;
  altura: number;
}

function PokemonSearch() {
  // --- ESTADOS ---
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState<PokemonItem[]>([]);
  const [cargando, setCargando] = useState(false);
  
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState<PokemonDetalle | null>(null);

  // --- FUNCIONES ---
  const buscarPokemones = async () => {
    if (!busqueda) return;
    setCargando(true);
    setPokemonSeleccionado(null);

    try {
      const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const datos = await respuesta.json();

      const filtrados = datos.results.filter((poke: any) =>
        poke.name.includes(busqueda.toLowerCase())
      );

      const listaFormateada = filtrados.map((poke: any) => {
        const partesUrl = poke.url.split('/');
        const id = partesUrl[partesUrl.length - 2];

        return {
          id: Number(id),
          nombre: poke.name,
          imagenMiniatura: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
        };
      });

      setResultados(listaFormateada);
    } catch (error) {
      alert("Error al buscar en la Pokédex");
    } finally {
      setCargando(false);
    }
  };

  const verDetallesProfundos = async (id: number) => {
    setCargando(true);
    try {
      const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const datos = await respuesta.json();

      const tiposExtraidos = datos.types.map((t: any) => t.type.name).join(', ');

      setPokemonSeleccionado({
        nombre: datos.name,
        imagenGrande: datos.sprites.other['official-artwork'].front_default,
        tipos: tiposExtraidos,
        peso: datos.weight / 10, // La API lo da en hectogramos, lo pasamos a Kg
        altura: datos.height / 10 // La API lo da en decímetros, lo pasamos a Metros
      });
    } catch (error) {
      alert("No se pudieron cargar los datos del Pokémon");
    } finally {
      setCargando(false);
    }
  };

  // --- ZONA DE RENDERIZADO (JSX) ---


  if (pokemonSeleccionado) {
    return (
      <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <button 
          onClick={() => setPokemonSeleccionado(null)} 
          style={{ padding: '10px 15px', marginBottom: '20px', cursor: 'pointer', backgroundColor: '#333', color: 'white', borderRadius: '5px', border: 'none' }}
        >
          ⬅ Volver a los resultados
        </button>

        <div style={{ border: '2px solid #cc0000', borderRadius: '15px', padding: '30px', backgroundColor: '#f8f8f8', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
          <img src={pokemonSeleccionado.imagenGrande} alt={pokemonSeleccionado.nombre} style={{ width: '200px' }} />
          <h1 style={{ textTransform: 'capitalize', color: '#333' }}>{pokemonSeleccionado.nombre}</h1>
          <p><strong>Tipo:</strong> <span style={{ textTransform: 'capitalize' }}>{pokemonSeleccionado.tipos}</span></p>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px', backgroundColor: '#eee', padding: '10px', borderRadius: '10px' }}>
            <p><strong>Altura:</strong> {pokemonSeleccionado.altura} m</p>
            <p><strong>Peso:</strong> {pokemonSeleccionado.peso} kg</p>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h2>Pokédex Nacional</h2>
      
      {/* Buscador */}
      <div style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Ej: pika, char, bulb"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ padding: '10px', width: '250px', border: '2px solid #cc0000', borderRadius: '5px' }}
        />
        <button 
          onClick={buscarPokemones} 
          style={{ padding: '10px 20px', marginLeft: '10px', cursor: 'pointer', backgroundColor: '#cc0000', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}
        >
          {cargando ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {/* Cuadrícula de Resultados */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px', maxWidth: '800px', margin: '0 auto' }}>
        {resultados.map((poke) => (
          <div
            key={poke.id}
            onClick={() => verDetallesProfundos(poke.id)}
            style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '10px', cursor: 'pointer', backgroundColor: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}
          >
            <img src={poke.imagenMiniatura} alt={poke.nombre} style={{ width: '80px' }} />
            <h4 style={{ textTransform: 'capitalize', margin: '10px 0 0 0' }}>{poke.nombre}</h4>
            <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>#{poke.id}</p>
          </div>
        ))}
      </div>
      
      {/* Mensaje si no hay resultados */}
      {resultados.length === 0 && !cargando && busqueda !== "" && (
        <p style={{ color: '#666' }}>Escribe parte del nombre para buscar.</p>
      )}
    </div>
  );
}

export default PokemonSearch;