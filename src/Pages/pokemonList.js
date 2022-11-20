import React, { useState, useEffect } from 'react';
import {PokemonResources} from '../Api/index';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setPokemon } from '../../src/redux/features/pokemonSlice';

export default function PokemonList() {

    const { pokemons, myPokemons } = useSelector((state) => state.pokemon);
    const dispatch = useDispatch();

    const pokemonResources = new PokemonResources();
    const [filterPokemon, setFilterPokemon] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function getData() {
        setIsLoading(true);
        const response = await pokemonResources.pokemonList();
        let {results} = await response.json();
        // setPokemon(results);
        handlePokemon(results);
        if (results) {
            setIsLoading(false);
        }
    }

    function handlePokemon(data) {
        dispatch(setPokemon({pokemon: data}))
    }

    useEffect(() => {
        // console.log(pokemons);
        getData();
    }, []);

    useEffect(() => {
        const filterPokemon = pokemons.filter(item => {
            return !myPokemons.find(e => {
                return e.name === item.name;
            });
        })
        setFilterPokemon(filterPokemon);
        
        // console.log(pokemons)
    }, [pokemons]);
    return (
      <>
        <nav className="bg-blue-500 text-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link to={'/'}>
                    <div className="flex items-center">
                        <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">Pokemon</span>
                        <span className="self-center text-3xl ml-2 font-light whitespace-nowrap dark:text-white">Api</span>
                    </div>
                </Link>
                <Link to={'pokemon-my'}>
                    <span className="self-end text-right text-sm font-semibold whitespace-nowrap dark:text-white"><span className='text-red-600'>({myPokemons.length})</span> My pokemon</span>
                </Link>
                <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                </div>
            </div>
        </nav>
        <div className='contain container mx-auto py-14 lg:px-0 px-5'>
            <div className='grid flex lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8'>
                {
                    !isLoading && pokemons.length > 0 ? (
                        filterPokemon.map((item, index) => {
                            return (
                            <div key={index} className="w-full">
                                <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg">
                                    <img className="w-full max-h-[200px] min-h-[200px]" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.url.split('/').slice(-2)[0]}.svg`} alt="Sunset in the mountains" />
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2 text-center">{item.name}</div>
                                        {/* <p className="text-gray-700 text-base">
                                          {item.url.split('/').slice(-1)[0] }
                                        </p> */}
                                    </div>
                                    <div className="px-6 pt-4 pb-2">
                                    <Link to={ `/pokemon-detail/${item.name}`}>
                                        <button type="button" className="flex mx-auto text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">
                                            Detail
                                        </button>
                                    </Link>
                                    </div>
                                    
                                </div>
                            </div>
                            )
                        })
                    ) : false
                }
            </div>
        </div>
      </>
    );
}