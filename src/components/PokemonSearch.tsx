import { useState, useEffect } from 'react';
import { API_CONFIG } from '../utils/apiConfig';
import { PokemonItem, PokemonDetail } from '../types/pokemon';
import { capitalizeText, formatId } from '../utils/helpers';

function PokemonSearch() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pokemonList, setPokemonList] = useState<PokemonItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(null);

  useEffect(() => {
    loadInitialPokemon();
  }, []);

  const loadInitialPokemon = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}pokemon?limit=20`, {
        headers: { 'x-api-key': API_CONFIG.API_KEY }
      });
      const data = await response.json();
      formatAndSetList(data.results);
    } catch (error) {
      console.error("Error loading initial Pokemon:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      loadInitialPokemon(); 
      return;
    }

    setIsLoading(true);
    setSelectedPokemon(null);

    try {
      const exactResponse = await fetch(`${API_CONFIG.BASE_URL}pokemon/${query}`, {
        headers: { 'x-api-key': API_CONFIG.API_KEY }
      });

      if (exactResponse.ok) {
        const data = await exactResponse.json();
        const singleResult: PokemonItem = {
          id: data.id,
          name: data.name,
          thumbnail: data.sprites.front_default
        };
        setPokemonList([singleResult]);
      } else {
        const listResponse = await fetch(`${API_CONFIG.BASE_URL}pokemon?limit=151`, {
          headers: { 'x-api-key': API_CONFIG.API_KEY }
        });
        const listData = await listResponse.json();

        const filtered = listData.results.filter((poke: any) =>
          poke.name.toLowerCase().startsWith(query)
        );

        if (filtered.length > 0) {
          formatAndSetList(filtered);
        } else {
          setPokemonList([]); 
          alert("No Pokémon found matching that name.");
        }
      }
    } catch (error) {
      console.error("Search error:", error);
      alert("An error occurred during the search.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatAndSetList = (results: any[]) => {
    const formattedList: PokemonItem[] = results.map((poke: any) => {
      const urlParts = poke.url.split('/');
      const id = Number(urlParts[urlParts.length - 2]);

      return {
        id: id,
        name: poke.name,
        thumbnail: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      };
    });
    setPokemonList(formattedList);
  };

  const fetchDetailedData = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}pokemon/${id}`);
      const data = await response.json();

      const extractedTypes = data.types.map((t: any) => t.type.name).join(', ');

      setSelectedPokemon({
        name: data.name,
        highResImage: data.sprites.other['official-artwork'].front_default,
        types: extractedTypes,
        weight: data.weight / 10,
        height: data.height / 10
      });
    } catch (error) {
      alert("Could not load Pokemon details");
    } finally {
      setIsLoading(false);
    }
  };

  if (selectedPokemon) {
    return (
      <div>
        <button
          onClick={() => setSelectedPokemon(null)}
          style={{ marginBottom: '20px' }}
        >
          ⬅ Back to Results
        </button>

        <div className="detail-view">
          <img src={selectedPokemon.highResImage} alt={selectedPokemon.name} />
          <h1 style={{ textTransform: 'capitalize' }}>{selectedPokemon.name}</h1>
          <p><strong>Type:</strong> <span style={{ textTransform: 'capitalize' }}>{selectedPokemon.types}</span></p>
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px', backgroundColor: '#f8fafc', padding: '15px', borderRadius: '10px' }}>
            <p><strong>Height:</strong> {selectedPokemon.height} m</p>
            <p><strong>Weight:</strong> {selectedPokemon.weight} kg</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="pokedex-header">
        <h2>National Pokédex</h2>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Ex: Ra, Pi, Char..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>
          {isLoading ? "Searching..." : "Search"}
        </button>
      </div>

      <div className="poke-grid">
        {pokemonList.map((poke) => (
          <div
            key={poke.id}
            className="poke-card"
            onClick={() => fetchDetailedData(poke.id)}
          >
            <img src={poke.thumbnail} alt={poke.name} />
            <h4>{capitalizeText(poke.name)}</h4>
            <p>{formatId(poke.id)}</p>
          </div>
        ))}
      </div>

      {pokemonList.length === 0 && !isLoading && (
        <p style={{ textAlign: 'center', color: '#64748b', marginTop: '2rem' }}>
          No Pokemon match your search.
        </p>
      )}
    </div>
  );
}

export default PokemonSearch;