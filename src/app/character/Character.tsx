import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ManageCharactersContext } from '../../hooks/useManageCharacters.tsx';

export const Character = () => {
  const manageCharacters = useContext(ManageCharactersContext);
  const character = useParams();
  
  // En tu componente
  const [characterSelected, setCharacterSelected] = useState<Character | null>(null);

  useEffect(() => {
    if (character) {
      manageCharacters.setSelectedCharacterId(character.id);
      manageCharacters.getCharacterById();
    }
  }, [character]);

  useEffect(() => {
    if (manageCharacters.characterData) {
      setCharacterSelected(manageCharacters.characterData.character);
    }
  }, [manageCharacters.characterData]);

  return (
    <>
      {
        characterSelected &&
        <>
          <div className="flex flex-col md:flex-row p-8 bg-white rounded-lg">
            <div className="md:w-2/3">
              <div className="flex items-center gap-x-6">
                <img className="h-16 w-16 rounded-full" src={characterSelected.image} alt="" />
              </div>
              <div className="mt-2">
                <h3 className="text-xl font-medium text-gray-800">{ characterSelected.name }</h3>
              </div>
              <div className="mb-4 mt-5">
                <label htmlFor="specie" className="block text-gray-700 font-medium mb-1">
                  Specie
                </label>
                <div className="p-2">
                  <span className="text-gray-700">{ characterSelected.species }</span>
                </div>
              </div>
              <hr className='mb-3'/>
              <div className="mb-4">
                <label htmlFor="status" className="block text-gray-700 font-medium mb-1">
                  Status
                </label>
                <div className="p-2">
                  <span className="text-gray-700">{ characterSelected.status }</span>
                </div>
              </div>
              <hr className='mb-3'/>
              <div className="mb-4">
                <label htmlFor="gender" className="block text-gray-700 font-medium mb-1">
                  Gender
                </label>
                <div className="p-2">
                  <span className="text-gray-700">{ characterSelected.gender }</span>
                </div>
              </div>
              <hr className='mb-3'/>
              <div className="mb-4">
                <label htmlFor="location" className="block text-gray-700 font-medium mb-1">
                  Location
                </label>
                <div className="p-2">
                  <span className="text-gray-700">{ characterSelected.location?.name }</span>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </>
  )
}