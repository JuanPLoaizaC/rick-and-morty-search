import React, { useState, useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";
import '../../App.css';

import { ManageCharactersContext } from "../../hooks/useManageCharacters.tsx";

const arrayButtons = [
  {
    text: 'Character', name: 'character', buttons: [
      { text: 'All', value: 'all' },
      { text: 'Starred', value: 'starred' },
      { text: 'Others', value: 'others' }
    ]
  },
  {
    text: 'Status', name: 'status', buttons: [
      { text: 'All', value: 'all' },
      { text: 'Alive', value: 'alive' },
      { text: 'Dead', value: 'dead' },
      { text: 'Unknown', value: 'unknown' }
    ]
  },
  {
    text: 'Specie', name: 'specie', buttons: [
      { text: 'All', value: 'all' },
      { text: 'Human', value: 'human' },
      { text: 'Alien', value: 'alien' }
    ]
  },
  {
    text: 'Gender', name: 'gender', buttons: [
      { text: 'All', value: 'all' },
      { text: 'Male', value: 'male' },
      { text: 'Female', value: 'female' }
    ]
  },
];

export const Search = () => {
  const manageCharacters = useContext(ManageCharactersContext);
  const [charactersList, setCharactersList] = useState<Character[]>([]);
  const [charactersSelected, setCharactersSelected] = useState({});
  const [filter, setFilter] = useState("");
  const [filterData, setFilterData] = useState({
    character: "all",
    status: "all",
    specie: "all",
    gender: "all",
  });
  const [filterButtons, setFilterButtons] = useState({
    character: "all",
    status: "all",
    specie: "all",
    gender: "all",
  });
  const [filterFlag, setFilterFlag] = useState(true);
  const [sortOrder, setSortOrder] = useState(null);

  useEffect(() => {
    if (manageCharacters.characters?.length > 0) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) ?? [];
      let deleted = JSON.parse(localStorage.getItem('deleted')) ?? [];
      setCharactersList(manageCharacters.characters.map((character: Character) => {
        return {
          ...character,
          favorite: favorites.filter(favoriteCharacter => favoriteCharacter === character.id) > 0 ? true : false,
          comments: '',
          deleted: deleted.find(deletedCharacter => deletedCharacter === character.id)
        };
      })
      );
    }
  }, [manageCharacters.characters]);

  const changeFavorite = (id: any) => {
    let list = [...charactersList];
    let index = list.findIndex((character) => character.id === id);
    list[index].favorite = !list[index].favorite;
    const favorites = list.filter(character => character.favorite).map(character => character.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setCharactersList(list);
  };

  const conditions = () => {
    return filterData.character !== 'all' || filterData.status !== 'all' || filterData.specie !== 'all' || filterData.gender !== 'all';
  };

  const deleteCharacter = (id: any) => {
    let list = [...charactersList];
    let index = list.findIndex(character => character.id === id);
    list[index].deleted = true;
    let ids = list.filter(character => character.deleted).map(character => character.id);
    localStorage.setItem('deleted', JSON.stringify(ids));
    setCharactersList(list);
  };

  const givingBackCharacters = () => {
    setCharactersList(charactersList.map(character => {
      return {
        ...character,
        deleted: false
      };
    }));
    localStorage.setItem('deleted', JSON.stringify([]));
  };

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-full h-full bg-gray-50 overflow-y-auto sm:w-3/3 sm:relative sm:translate-x-0 ${manageCharacters.selectedCharacterId ? 'hide-on-mobile' : ''}`}
        aria-label="Sidebar"
        style={{  }}
      >
        <div className="px-3 py-4 sm:px-4 sm:py-6">
          <p className="mx-3 my-4 text-xl font-bold">Rick and Morty list</p>
          <div className="flex justify-center gap-x-4 mb-3">
            <button
              className="rounded-full bg-gray-200 p-1 px-2 text-sm text-gray-800 hover:bg-gray-300"
              onClick={() => setSortOrder("asc")}
            >
              A-Z
            </button>
            <button
              className="rounded-full bg-gray-200 p-1 px-2 text-sm text-gray-800 hover:bg-gray-300"
              onClick={() => setSortOrder("desc")}
            >
              Z-A
            </button>
            <button
              className="rounded-full bg-gray-200 p-1 px-2 text-sm text-gray-800 hover:bg-gray-300"
              onClick={() => givingBackCharacters()}
            >
              Restart
            </button>
          </div>
          <div className="relative mt-2.5">
            <div className="absolute inset-y-0 left-0 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 ml-4"
              >setCharactersSelected
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <input
              type="search"
              placeholder="Search or filter results"
              value={filter}
              onChange={({ target }) => setFilter(target.value)}
              className="block w-full rounded-lg border-0 px-3.5 py-4 pl-10 ml-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Popover className="relative">
                <Popover.Button className="hover:bg-gray-100 rounded-lg grid items-center">
                  <div className='bg-purple-100 rounded-md p-0.5'>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-purple-700 "
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
                      />
                    </svg>
                  </div>
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute -right-0 z-10 mt-6 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 size-panel">
                    <div>
                      <div className="p-5">
                        {
                          arrayButtons.map((item, index) => (
                            <div>
                              <p className={`${index === 0 ? 'mb-2' : 'pt-5 pb-2'} text-sm text-gray-500 font-normal`}>
                                {item.text}
                              </p>
                              <div className="flex gap-x-4">
                                {
                                  item.buttons.map(button => (
                                    <button
                                      className={`w-24 hover:bg-purple-100 font-semi-bold py-2 px-4 rounded-lg border border-gray-300 size-buttons ${button.value === filterData[item.name] ? 'bg-purple-100' : ''}`}
                                      onClick={() => {
                                        setFilterData({
                                          ...filterData,
                                          [item.name]: button.value,
                                        });
                                      }}
                                    >
                                      {button.text}
                                    </button>
                                  ))
                                }
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <button
                        className={`${!conditions() ? 'text-gray-500 bg-gray-200' : 'bg-purple-600 hover:bg-purple-700 text-white'} font-semi-bold py-2 px-4 rounded-lg mt-5 mb-5`}
                        style={{ width: "85%" }}
                        onClick={() => {
                          setFilterFlag(true);
                          setFilterButtons({
                            character: filterData.character,
                            status: filterData.status,
                            specie: filterData.specie,
                            gender: filterData.gender,
                          });
                        }}
                        disabled={!conditions()}
                      >
                        Filter
                      </button>
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </div>
          </div>
        </div>
        <div className="sm:h-screen sm:flex-1 overflow-y-auto">
          {filterButtons.character !== "others" && (
            <>
              <div className="flex ml-12 mt-8">
                <p className="text-sm leading-6 text-gray-600">
                  STARRED CHARACTERS (
                  {
                    charactersList.filter((character) => {
                      return (
                        character.favorite &&
                        (character.species.toUpperCase() === filterButtons.specie.toUpperCase() || filterButtons.specie === "all") &&
                        character.name.toUpperCase().includes(filter.toUpperCase()) &&
                        (character.status.toUpperCase() === filterButtons.status.toUpperCase() || filterButtons.status === 'all') &&
                        (character.gender.toUpperCase() === filterButtons.gender.toUpperCase() || filterButtons.gender === 'all') &&
                        !character.deleted
                      );
                    }).length
                  }
                  )
                </p>
              </div>
              <ul role="list" className="divide-y divide-gray-100 mb-5">
                {charactersList
                  .filter((character) => {
                    return (
                      character.favorite &&
                      (character.species.toUpperCase() === filterButtons.specie.toUpperCase() || filterButtons.specie === "all") &&
                      character.name.toUpperCase().includes(filter.toUpperCase()) &&
                      (character.status.toUpperCase() === filterButtons.status.toUpperCase() || filterButtons.status === "all") &&
                      (character.gender.toUpperCase() === filterButtons.gender.toUpperCase() || filterButtons.gender === 'all') &&
                      !character.deleted
                    );
                  })
                  .sort((a, b) => {
                    if (sortOrder === "asc") {
                      return a.name.localeCompare(b.name);
                    } else if (sortOrder === "desc") {
                      return b.name.localeCompare(a.name);
                    }
                  })
                  .map((character) => (
                    <li
                      key={character.id}
                      className={`flex justify-between gap-x-6 py-3.5 hover:bg-purple-100 ml-6 rounded-lg ${manageCharacters?.selectedCharacterId === character.id &&
                        "bg-purple-100"
                        }`}
                    >
                      <Link
                        to={`/character/${character.id}`}
                        onClick={() => {
                          setCharactersSelected(character);
                          manageCharacters.setSelectedCharacterId(character.id);
                        }}
                        className="flex items-center gap-x-4"
                      >
                        <img
                          className="h-10 w-10 rounded-full bg-gray-50 ml-5"
                          src={character.image}
                          alt=""
                        />
                        <div>
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {character.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {character.species}
                          </p>
                        </div>
                      </Link>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <button
                            className='flex items-center justify-center rounded-full p-2 text-gray-800' onClick={() => deleteCharacter(character.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>
                          <button
                            className={`flex items-center justify-center rounded-full p-2 text-gray-800 mr-2 ${manageCharacters?.selectedCharacterId === character.id
                              ? "bg-white"
                              : "bg-transparent"
                              }`}
                            onClick={() => changeFavorite(character.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-6 w-6 ${character.favorite ? "" : "text-gray-300 stroke-current"
                                }`}
                              viewBox="0 0 20 20"
                            >
                              <path
                                fill={`${character.favorite ? "green" : "white"}`}
                                stroke={`${character.favorite ? "none" : "currentColor"}`}
                                strokeWidth="2"
                                d="M10 18l-1-1.08C4.54 13.25 2 11.15 2 8.5 2 6.42 3.42 5 5.5 5c1.54 0 3.04.99 4 2.36C10.46 5.99 11.96 5 13.5 5 15.58 5 17 6.42 17 8.5c0 2.65-2.54 4.75-7 8.42L10 18z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </>
          )}
          {filterButtons.character !== "starred" && (
            <>
              <div
                className={`flex ml-12 ${filterButtons.character === "others" ? "mt-8" : ""
                  }`}
              >
                <p className="text-sm leading-6 text-gray-600">
                  CHARACTERS (
                  {
                    charactersList.filter((character) => {
                      return (
                        !character.favorite &&
                        (character.species.toUpperCase() === filterButtons.specie.toUpperCase() || filterButtons.specie === "all") &&
                        character.name.toUpperCase().includes(filter.toUpperCase()) &&
                        (character.status.toUpperCase() === filterButtons.status.toUpperCase() || filterButtons.status === "all") &&
                        (character.gender.toUpperCase() === filterButtons.gender.toUpperCase() || filterButtons.gender === 'all') &&
                        !character.deleted
                      );
                    }).length
                  }
                  )
                </p>
              </div>
              <ul role="list" className="divide-y divide-gray-100">
                {charactersList
                  .filter((character) => {
                    return (
                      !character.favorite &&
                      (character.species.toUpperCase() === filterButtons.specie.toUpperCase() || filterButtons.specie === "all") &&
                      character.name.toUpperCase().includes(filter.toUpperCase()) &&
                      (character.status.toUpperCase() === filterButtons.status.toUpperCase() || filterButtons.status === "all") &&
                      (character.gender.toUpperCase() === filterButtons.gender.toUpperCase() || filterButtons.gender === 'all') &&
                      !character.deleted
                    );
                  })
                  .sort((a, b) => {
                    if (sortOrder === "asc") {
                      return a.name.localeCompare(b.name);
                    } else if (sortOrder === "desc") {
                      return b.name.localeCompare(a.name);
                    }
                  })
                  .map((character) => (
                    <li
                      key={character.id}
                      className={`flex justify-between gap-x-6 py-3.5 hover:bg-purple-100 ml-6 rounded-lg ${manageCharacters?.selectedCharacterId === character.id &&
                        "bg-purple-100"
                        }`}
                    >
                      <Link
                        to={`/character/${character.id}`}
                        onClick={() => {
                          setCharactersSelected(character);
                          manageCharacters.setSelectedCharacterId(character.id);
                        }}
                        className="flex items-center gap-x-4"
                      >
                        <img
                          className="h-10 w-10 rounded-full bg-gray-50 ml-5"
                          src={character.image}
                          alt=""
                        />
                        <div>
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {character.name}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {character.species}
                          </p>
                        </div>
                      </Link>
                      <div className="flex items-center">
                        <div className="flex items-center">
                          <button
                            className='flex items-center justify-center rounded-full p-2 text-gray-800' onClick={() => deleteCharacter(character.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>
                          <button
                            className={`flex items-center justify-center rounded-full p-2 text-gray-800 mr-2 ${manageCharacters?.selectedCharacterId === character.id
                              ? "bg-white"
                              : "bg-transparent"
                              }`}
                            onClick={() => changeFavorite(character.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-6 w-6 ${character.favorite
                                ? ""
                                : "text-gray-300 stroke-current"
                                }`}
                              viewBox="0 0 20 20"
                            >
                              <path
                                fill={`${character.favorite ? "green" : "white"
                                  }`}
                                stroke={`${character.favorite ? "none" : "currentColor"
                                  }`}
                                strokeWidth="2"
                                d="M10 18l-1-1.08C4.54 13.25 2 11.15 2 8.5 2 6.42 3.42 5 5.5 5c1.54 0 3.04.99 4 2.36C10.46 5.99 11.96 5 13.5 5 15.58 5 17 6.42 17 8.5c0 2.65-2.54 4.75-7 8.42L10 18z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
      </aside>
    </>
  );
};