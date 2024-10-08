import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PokeList.css';
import Pokecard from '../Pokecard/PokeCard';
import Searchbar from '../../components/Searchbar';
import customPokemon from '../../customPokemon'; 

export default function PokeList() {
    const [pokemons, setPokemons] = useState(customPokemon);
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [type, setType] = useState('');

    const loadMore = () => {
        setOffset(prevOffset => prevOffset + 20);
    };

    useEffect(() => {
        const fetchPokemons = async () => {
            setLoading(true);
            try {
                let url = `https://mern-pokedex-be.onrender.com/api/pokemons?offset=${offset}&limit=20`;
                const response = await axios.get(url);

                const fetchedPokemons = response.data;
                let allPokemons  ; 

                if (offset === 0) {
                    allPokemons = [...customPokemon , ...fetchedPokemons] ;
                    setPokemons(allPokemons);
                } else {
                    allPokemons = [...fetchedPokemons]
                    setPokemons(prevPokemons => [...prevPokemons, ...allPokemons]);
                }
            } catch (error) {
                console.error('Error fetching Pokémon data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemons();
    }, [offset]);

    useEffect(() => {
        if (type) {
            const newFilteredPokemons = pokemons.filter(pokemon =>
                pokemon.types && pokemon.types.some(t => t.toLowerCase().includes(type.toLowerCase()))
            );
            setFilteredPokemons(newFilteredPokemons);

            if (newFilteredPokemons.length === 0) {
                loadMore();
            }
        } else {
            setFilteredPokemons(pokemons);
        }
    }, [type, pokemons]);

    return (
        <div>
            <Searchbar type={type} setType={setType} />
            <ul className='pokemon-list'>
                {filteredPokemons.map((pokemon, index) => (
                    <Pokecard pokemon={pokemon} key={index} />
                ))}
            </ul>
            <div className='list-btn-container'>
                <button className='list-btn' onClick={loadMore} disabled={loading}>
                    {loading ? "Loading ....." : 'Load more'}
                </button>
            </div>
        </div>
    );
}
