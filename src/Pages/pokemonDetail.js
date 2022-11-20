import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import {PokemonResources} from '../Api/index';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setMyPokemon } from '../../src/redux/features/pokemonSlice';

export default function PokemonDetail() {

    const pokemonResources = new PokemonResources();
    const params = useParams();
    const [pokemon, setPokemon] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [images, setImages] = useState([]);
    const [image, setImage] = useState('')

    const { pokemons, myPokemons } = useSelector((state) => state.pokemon);
    const dispatch = useDispatch();

    async function getDetail(name) {
        setIsLoading(true);
        const response = await pokemonResources.pokemonDetail(name);
        let allData = await response.json();
        
        setPokemon(allData);
        
        if (allData) {
            setIsLoading(false);
        }
    }

    function handleChoosePokemon() {
        const {species} = pokemon
        let choosePokemon = {};
        if (pokemon.id !== undefined) {
            choosePokemon = {...{id: pokemon.id, abilities: pokemon.abilities, image: pokemon.sprites.other.dream_world.front_default}, ...species };
            // dispatch(setMyPokemon({pokemon: []}))
            // console.log(choosePokemon)

            if (myPokemons.length > 0) {
                // console.log(pokemon.name)
                if (!myPokemons.find(e => e.name === pokemon.name)) {
                    // console.log('ada', !myPokemons.find(e => e.name === pokemon.name));
                    dispatch(setMyPokemon({pokemon: [...myPokemons, ...[choosePokemon]]}))
                }
                
            }else {
                dispatch(setMyPokemon({pokemon: [...myPokemons, ...[choosePokemon]]}))
            }
        }
    }

    async function handleImage(){
        if (pokemon.sprites) {
            
            let image1 = Object.values(pokemon.sprites.other.home);
                image1 = [...image1, ...Object.values(pokemon.sprites.other.dream_world)]
            
            let allImage = [];

            image1.forEach((item) => {
                if (item) {
                    allImage.push(item)
                    // console.log([...images, ...item])
                }
            })
            
            setImages(allImage)

            if(images.length > 0 ) {
                while (true) {
                    for (let index = 0; index < images.length; index++) {
                        const element = images[index];
                        setImage(element);
                        await timer(1000);
                    }
                }
                
            }
            // console.log(images)
        }
    }

    function timer(ms) { return new Promise(res => setTimeout(res, ms)); }

    useEffect(() => {
        const { name } = params;
        getDetail(name);
    }, []);

    useEffect(() => {
        handleImage();
        // console.log(images)
    }, [pokemon]);

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
                <Link to={'/pokemon-my'}>
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
            <div className='grid grid-cols-1'>
                {
                    !isLoading ? (
                        <div>
                            <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg">
                                {/* <img className="w-full max-h-[300px] min-h-[300px]" src={`${pokemon.sprites.other.dream_world ? pokemon.sprites.other.dream_world.front_default : ''}`} alt="Sunset in the mountains" /> */}
                                
                                {
                                    image !== '' ? (
                                        <img className="w-full max-h-[300px] min-h-[300px]" src={`${image}`} alt="Sunset in the mountains" />
                                    ): <img className="w-full max-h-[300px] min-h-[300px]" src={`${pokemon.sprites.other.dream_world ? pokemon.sprites.other.dream_world.front_default : ''}`} alt="Sunset in the mountains" />
                                }
                                <div className="px-6 py-0">
                                    <div className="font-bold text-xl mb-2 text-left">{pokemon.name}</div>
                                    {/* <p className="text-gray-700 text-base">
                                        {item.url.split('/').slice(-1)[0] }
                                    </p> */}
                                </div>
                                <div className="px-6 pt-2 pb-4">
                                    <p className='text-gray-700 text-base font-bold pb-4'>abilities :</p>
                                    {
                                        pokemon.abilities && pokemon.abilities.length > 0 ? (
                                            pokemon.abilities.map((item, index) => {
                                                return (
                                                    <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-normal text-gray-700 mr-2 mb-2">{item.ability ? item.ability.name : ''}</span>
                                                )
                                            })
                                        ) : false
                                    }
                                    <div className='my-4'>
                                        <button onClick={handleChoosePokemon} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center mb-2">
                                            Choose pokemon
                                        </button>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    ) : false
                }
            </div>
        </div>
      </>
    );
}