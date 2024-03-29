import React, { useState, useEffect, useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { Popover, Transition } from "@headlessui/react";

import { ManageCharactersContext } from "../../hooks/useManageCharacters.tsx";

const arrayButtons = [
  { text: 'Character', name: 'character', buttons: [
    { text: 'All', value: 'all' },
    { text: 'Starred', value: 'starred' },
    { text: 'Others', value: 'others' }
  ] },
  { text: 'Status', name: 'status', buttons: [
    { text: 'All', value: 'all' },
    { text: 'Alive', value: 'alive' },
    { text: 'Dead', value: 'dead' },
    { text: 'Unknown', value: 'unknown' }
  ] },
  { text: 'Specie', name: 'specie', buttons: [
    { text: 'All', value: 'all' },
    { text: 'Human', value: 'human' },
    { text: 'Alien', value: 'alien' }
  ] },
  { text: 'Gender', name: 'gender', buttons: [
    { text: 'All', value: 'all' },
    { text: 'Male', value: 'male' },
    { text: 'Female', value: 'female' }
  ] },
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
      setCharactersList(manageCharacters.characters.map((character: Character) => {
          return {
            ...character,
            favourite: false,
            comments: ''
          };
        })
      );
    }
  }, [manageCharacters.characters]);

  const changeFavourite = (id: any) => {
    let list = [...charactersList];
    let index = list.findIndex((character) => character.id === id);
    list[index].favourite = !list[index].favourite;
    setCharactersList(list);
  };

  const conditions = () => {
    return filterData.character !== 'all' || filterData.status !== 'all' || filterData.specie !== 'all' || filterData.gender !== 'all';
  };

  return (
    <>
      <aside
        className="fixed top-0 left-0 z-40 w-1/3 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
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
              >
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
                    {
                      //TODO Cuando esté abierto activar bg, el botón de filter, disabled
                    }
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
                  <Popover.Panel className="absolute -right-0 z-10 mt-6 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-gray-900/5">
                    <div>
                      <div className="p-5">
                        {
                          arrayButtons.map((item, index) => (
                            <div>
                              <p className={`${index === 0 ? 'mb-2' : 'pt-5 pb-2'} text-sm text-gray-500 font-normal`}>
                                { item.text }
                              </p>
                              <div className="flex gap-x-4">
                                {
                                  item.buttons.map(button => (
                                      <button
                                        className={`w-24 hover:bg-purple-100 font-semi-bold py-2 px-4 rounded-lg border border-gray-300 ${button.value === filterData[item.name] ? 'bg-purple-100' : ''}`}
                                        onClick={() => {
                                          setFilterData({
                                            ...filterData,
                                            [item.name]: button.value,
                                          });
                                        }}
                                      >
                                        { button.text }
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
          {filterButtons.character !== "others" && (
            <>
              <div className="flex ml-12 mt-8">
                <p className="text-sm leading-6 text-gray-600">
                  STARRED CHARACTERS (
                  {
                    charactersList.filter((character) => {
                      return (
                        character.favourite &&
                        (character.species.toUpperCase() === filterButtons.specie.toUpperCase() || filterButtons.specie === "all") &&
                        character.name.toUpperCase().includes(filter.toUpperCase()) &&
                        (character.status.toUpperCase() === filterButtons.status.toUpperCase() || filterButtons.status === 'all') &&
                        (character.gender.toUpperCase() === filterButtons.gender.toUpperCase() || filterButtons.gender === 'all')
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
                      character.favourite &&
                      (character.species.toUpperCase() === filterButtons.specie.toUpperCase() || filterButtons.specie === "all") &&
                      character.name.toUpperCase().includes(filter.toUpperCase()) &&
                      (character.status.toUpperCase() === filterButtons.status.toUpperCase() || filterButtons.status === "all") &&
                      (character.gender.toUpperCase() === filterButtons.gender.toUpperCase() || filterButtons.gender === 'all')
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
                      className={`flex justify-between gap-x-6 py-3.5 hover:bg-purple-100 ml-6 rounded-lg ${charactersSelected?.id === character.id &&
                        "bg-purple-100"
                        }`}
                    >
                      <Link
                        to={`/character/${character.id}`}
                        onClick={() => {
                          //setCharactersSelected(character);
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
                        <button
                          className={`flex items-center justify-center rounded-full p-2 text-gray-800 mr-2 ${charactersSelected?.id === character.id
                            ? "bg-white"
                            : "bg-transparent"
                            }`}
                          onClick={() => changeFavourite(character.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-6 w-6 ${character.favourite
                              ? ""
                              : "text-gray-300 stroke-current"
                              }`}
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill={`${character.favourite ? "green" : "white"
                                }`}
                              stroke={`${character.favourite ? "none" : "currentColor"
                                }`}
                              strokeWidth="2"
                              d="M10 18l-1-1.08C4.54 13.25 2 11.15 2 8.5 2 6.42 3.42 5 5.5 5c1.54 0 3.04.99 4 2.36C10.46 5.99 11.96 5 13.5 5 15.58 5 17 6.42 17 8.5c0 2.65-2.54 4.75-7 8.42L10 18z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
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
                        !character.favourite &&
                        (character.species.toUpperCase() === filterButtons.specie.toUpperCase() || filterButtons.specie === "all") &&
                        character.name.toUpperCase().includes(filter.toUpperCase()) &&
                        (character.status.toUpperCase() === filterButtons.status.toUpperCase() || filterButtons.status === "all") &&
                        (character.gender.toUpperCase() === filterButtons.gender.toUpperCase() || filterButtons.gender === 'all')
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
                      !character.favourite &&
                      (character.species.toUpperCase() === filterButtons.specie.toUpperCase() || filterButtons.specie === "all") &&
                      character.name.toUpperCase().includes(filter.toUpperCase()) &&
                      (character.status.toUpperCase() === filterButtons.status.toUpperCase() || filterButtons.status === "all") &&
                      (character.gender.toUpperCase() === filterButtons.gender.toUpperCase() || filterButtons.gender === 'all')
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
                      className={`flex justify-between gap-x-6 py-3.5 hover:bg-purple-100 ml-6 rounded-lg ${charactersSelected?.id === character.id &&
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
                        <button
                          className={`flex items-center justify-center rounded-full p-2 text-gray-800 mr-2 ${charactersSelected?.id === character.id
                            ? "bg-white"
                            : "bg-transparent"
                            }`}
                          onClick={() => changeFavourite(character.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-6 w-6 ${character.favourite
                              ? ""
                              : "text-gray-300 stroke-current"
                              }`}
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill={`${character.favourite ? "green" : "white"
                                }`}
                              stroke={`${character.favourite ? "none" : "currentColor"
                                }`}
                              strokeWidth="2"
                              d="M10 18l-1-1.08C4.54 13.25 2 11.15 2 8.5 2 6.42 3.42 5 5.5 5c1.54 0 3.04.99 4 2.36C10.46 5.99 11.96 5 13.5 5 15.58 5 17 6.42 17 8.5c0 2.65-2.54 4.75-7 8.42L10 18z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
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