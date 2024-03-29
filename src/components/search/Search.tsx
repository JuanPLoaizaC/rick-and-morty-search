import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ManageCharactersContext } from '../../hooks/useManageCharacters.tsx';

export const Search = () => {
  const manageCharacters = useContext(ManageCharactersContext);
  const [charactersList, setCharactersList] = useState([]);
  const [charactersSelected, setCharactersSelected] = useState({});
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    getServiceCharacters();
  }, []);

  const getServiceCharacters = async () => {
    let { data } = await manageCharacters.getCharactersList();
    let { results } = data;
    setCharactersList(results.map(character => {
      return {
        ... character,
        favourite: false
      };
    }));
  };

  const changeFavourite = (id: any) => {
    let list = [... charactersList];
    let index = list.findIndex(character => character.id === id);
    list[index].favourite = !list[index].favourite;
    setCharactersList(list);
  };

  return (
    <>
      <aside className="fixed top-0 left-0 z-40 w-1/3 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <p className='mx-3 my-4 text-xl'>Rick and Morty list</p>
          <div className="flex justify-center gap-x-4 mb-3">
            <button className="rounded-full bg-gray-200 p-1 px-2 text-sm text-gray-800 hover:bg-gray-300" onClick={() => setSortOrder('asc')}>
              A-Z
            </button>
            <button className="rounded-full bg-gray-200 p-1 px-2 text-sm text-gray-800 hover:bg-gray-300" onClick={() => setSortOrder('desc')}>
              Z-A
            </button>
          </div>
          <ul role="list" className="divide-y divide-gray-100">
            {charactersList.sort((a, b) => {
              if (sortOrder === 'asc') {
                return a.name.localeCompare(b.name);
              } else if (sortOrder === 'desc') {
                return b.name.localeCompare(a.name);
              }
            }).map((character) => (
              <li key={character.id} className={`flex justify-between gap-x-6 py-3.5 hover:bg-purple-100 ml-6 rounded-lg ${charactersSelected?.id === character.id && 'bg-purple-100'}`}>
                <Link to={`/character/${character.id}`} onClick={() => setCharactersSelected(character)} className="flex items-center gap-x-4">
                  <img className="h-10 w-10 rounded-full bg-gray-50 ml-5" src={character.image} alt="" />
                  <div>
                    <p className="text-sm font-semibold leading-6 text-gray-900">{character.name}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{character.species}</p>
                  </div>
                </Link>
                <div className="flex items-center">
                  <button className={`flex items-center justify-center rounded-full p-2 text-gray-800 mr-2 ${charactersSelected?.id === character.id ? 'bg-white' : 'bg-transparent'}`} onClick={() => changeFavourite(character.id)} >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${character.favourite ? '' : 'text-gray-300 stroke-current'}`} viewBox="0 0 20 20">
                      <path fill={`${character.favourite ? 'green' : 'white'}`} stroke={`${character.favourite ? 'none' : 'currentColor'}`} strokeWidth="2" d="M10 18l-1-1.08C4.54 13.25 2 11.15 2 8.5 2 6.42 3.42 5 5.5 5c1.54 0 3.04.99 4 2.36C10.46 5.99 11.96 5 13.5 5 15.58 5 17 6.42 17 8.5c0 2.65-2.54 4.75-7 8.42L10 18z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  )
};
