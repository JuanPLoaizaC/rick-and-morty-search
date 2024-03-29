import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ManageCharactersContext } from '../../hooks/useManageCharacters.tsx';

export const Search = () => {
  const manageCharacters = useContext(ManageCharactersContext);
  const [charactersList, setCharactersList] = useState([]);

  useEffect(() => {
    getServiceCharacters();
  }, []);

  const getServiceCharacters = async () => {
    let { data } = await manageCharacters.getCharactersList();
    setCharactersList(data.results);
  };

  return (
    <>
      <aside id="sidebar-multi-level-sidebar" className="fixed top-0 left-0 z-40 w-1/3 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <p className='mx-3 my-4 text-xl'>Rick and Morty list</p>
          <ul role="list" className="divide-y divide-gray-100">
            {charactersList.map((character) => (
              <li key={character.id} className="flex justify-between gap-x-6 py-3.5 hover:bg-purple-100 dark:text-white dark:hover:bg-gray-700 ml-6 rounded-lg">
                <Link to={`/character/${character.id}`} className="flex min-w-0 gap-x-4">
                  <img className="h-10 w-10 flex-none rounded-full bg-gray-50 ml-5" src={character.image} alt="" />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{character.name}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{character.species}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
};
