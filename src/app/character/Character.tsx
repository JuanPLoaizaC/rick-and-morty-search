import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ManageCharactersContext } from '../../hooks/useManageCharacters.tsx';
import { CharacterInterface } from '../models.ts';

export const Character = () => {
  const manageCharacters = useContext(ManageCharactersContext);
  const character = useParams();
  let navigate = useNavigate();

  // En tu componente
  const [characterSelected, setCharacterSelected] = useState<CharacterInterface | null>(null);

  useEffect(() => {
    if (character) {
      manageCharacters.setSelectedCharacterId(character.id);
      manageCharacters.getCharacterById();
    }
  }, [character]);

  useEffect(() => {
    if (manageCharacters.characterData) {
      const comments = JSON.parse(localStorage.getItem('comments')) ?? [];
      const favorites = JSON.parse(localStorage.getItem('favorites')) ?? [];
      setCharacterSelected({
        ...manageCharacters.characterData.character,
        favorite: favorites.filter(favoriteCharacter => favoriteCharacter === character.id) > 0 ? true : false,
        comments: comments.find(character => character.id === manageCharacters.characterData.character.id)?.comments ?? ''
      });
    }
  }, [manageCharacters.characterData]);

  useEffect(() => {
    if (manageCharacters.characterData) {
      const favorites = JSON.parse(localStorage.getItem('favorites')) ?? [];
      setCharacterSelected({
        ...manageCharacters.characterData.character,
        favorite: favorites.filter(favoriteCharacter => favoriteCharacter === character.id) > 0 ? true : false
      });
    }
  }, [manageCharacters.flagStorage]);

  const handleChangeComments = ({ value }) => {
    setCharacterSelected({ ...characterSelected, comments: value });
    const comments = JSON.parse(localStorage.getItem('comments')) ?? [];
    const index = comments?.findIndex((character: { id: number; }) => character.id === characterSelected.id);
    if (comments?.length > 0) {
      comments[index] = {
        ...comments[index],
        comments: value
      };
    } else {
      comments.push({
        id: characterSelected.id,
        comments: value
      });
    }
    localStorage.setItem('comments', JSON.stringify(comments));
  };

  const navigateToLogin = () => {
    manageCharacters.setSelectedCharacterId(null);
    navigate('/');
  };

  return (
    <>
      {
        characterSelected &&
        <>
          <div className="fixed top-4 left-4 w-12 h-12 text-center flex justify-center items-center cursor-pointer md:block" onClick={() => navigateToLogin()}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
              <path fill='blue' d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </div>
          <div className="mt-5 flex flex-col md:flex-row p-8 bg-white rounded-lg">
            <div className="md:w-2/3 sm:w-1/3">
              <div className="relative">
                <img className='h-16 w-16 rounded-full bg-black z-10 top-0 left-0' src={characterSelected.image} />
                {
                  characterSelected.favorite &&
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className='bg-white rounded-full text-gray-800 z-10 absolute top-10 left-12 h-6 w-6'
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill='green'
                      stroke='none'
                      strokeWidth="2"
                      d="M10 18l-1-1.08C4.54 13.25 2 11.15 2 8.5 2 6.42 3.42 5 5.5 5c1.54 0 3.04.99 4 2.36C10.46 5.99 11.96 5 13.5 5 15.58 5 17 6.42 17 8.5c0 2.65-2.54 4.75-7 8.42L10 18z"
                      clipRule="evenodd"
                    />
                  </svg>
                }
              </div>
              <div className="mt-2">
                <h3 className="text-xl font-medium text-gray-800">{characterSelected.name}</h3>
              </div>
              <div className="mb-4 mt-5">
                <label htmlFor="specie" className="block text-gray-700 font-medium mb-1">
                  Specie
                </label>
                <div className="p-2">
                  <span className="text-gray-700">{characterSelected.species}</span>
                </div>
              </div>
              <hr className='mb-3' />
              <div className="mb-4">
                <label htmlFor="status" className="block text-gray-700 font-medium mb-1">
                  Status
                </label>
                <div className="p-2">
                  <span className="text-gray-700">{characterSelected.status}</span>
                </div>
              </div>
              <hr className='mb-3' />
              <div className="mb-4">
                <label htmlFor="gender" className="block text-gray-700 font-medium mb-1">
                  Gender
                </label>
                <div className="p-2">
                  <span className="text-gray-700">{characterSelected.gender}</span>
                </div>
              </div>
              <hr className='mb-3' />
              <div className="mb-4">
                <label htmlFor="location" className="block text-gray-700 font-medium mb-1">
                  Location
                </label>
                <div className="p-2">
                  <span className="text-gray-700">{characterSelected.location?.name}</span>
                </div>
              </div>
              <hr className='mb-3' />
              <div className="mb-4">
                <label htmlFor="comments" className="block text-gray-700 font-medium mb-1">
                  Comments
                </label>
                <div className="p-2">
                  <textarea value={characterSelected.comments} name="about" rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={({ target }) => handleChangeComments(target)} ></textarea>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}