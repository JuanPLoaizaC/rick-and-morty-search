import React, { useContext } from 'react';
import { CharacterInterface } from '../../app/models';
import { ManageCharactersContext } from '../../hooks/useManageCharacters.tsx';

interface Props {
  character: CharacterInterface;
  deleteCharacter: any;
  changeFavorite: any;
}

export const SearchList = ({
  character,
  deleteCharacter,
  changeFavorite
}: Props) => {
  const manageCharacters = useContext(ManageCharactersContext);

  return (
    <>
      <div className="flex items-center">
        <img
          className="h-10 w-10 rounded-full bg-gray-50 ml-5"
          src={character.image}
          alt=""
        />
        <div>
          <p className="text-sm font-semibold leading-6 ml-3 text-gray-900">
            {character.name}
          </p>
          <p className="mt-1 truncate text-xs leading-5 ml-3 text-gray-500">
            {character.species}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center">
          <button
            className="flex items-center justify-center rounded-full p-2 text-gray-800"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              deleteCharacter(character.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
          <button
            className={`flex items-center justify-center rounded-full p-2 text-gray-800 mr-2 ${manageCharacters?.selectedCharacterId ===
              character.id
              ? "bg-white"
              : "bg-transparent"
              }`}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              changeFavorite(character.id);
            }}
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
                stroke-width="2"
                d="M10 18l-1-1.08C4.54 13.25 2 11.15 2 8.5 2 6.42 3.42 5 5.5 5c1.54 0 3.04.99 4 2.36C10.46 5.99 11.96 5 13.5 5 15.58 5 17 6.42 17 8.5c0 2.65-2.54 4.75-7 8.42L10 18z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
