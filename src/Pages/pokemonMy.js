import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMyPokemon } from '../../src/redux/features/pokemonSlice';

export default function PokemonMy() {

    const { pokemons, myPokemons } = useSelector((state) => state.pokemon);
    const dispatch = useDispatch();

    function handleDelete(event) {
        const id = event.target.id;
        // console.log(event.target.id)
        const pokemonDelete = myPokemons.filter(item => {
            return item.id != id;
        })
        dispatch(setMyPokemon({pokemon: pokemonDelete}))
    }

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
            <h1 className='my-5 text-center text-xl font-bold text-blue-500'>MY POKEMON</h1>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-8'>
                {
                    myPokemons.length > 0 ? (
                        myPokemons.map((item, index) => {
                            return (
                                <div key={index} className="flex flex-col relative items-center bg-white border rounded-lg shadow-md md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <img className='py-4 px-3 max-h-[200px]'  src={item.image} alt="" />
                                    <div className="flex flex-col justify-between p-4 leading-normal">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
                                        <div className="my-2">
                                            <p className='text-gray-700 text-base font-bold pb-4'>abilities :</p>
                                            {
                                                item.abilities && item.abilities.length > 0 ? (
                                                    item.abilities.map((item, index) => {
                                                        return (
                                                            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-normal text-gray-700 mr-2 mb-2">{item.ability ? item.ability.name : ''}</span>
                                                        )
                                                    })
                                                ) : false
                                            }
                                        </div>
                                    </div>
                                    <div className='absolute right-[5%]'>
                                        <button id={item.id} onClick={handleDelete} type="button" className="text-white bg-gradient-to-br from-red-800 to-red-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center mb-2">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    ) : false
                }
            </div>
        </div>
    </>
   )
}