import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const people = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'Co-Founder / CEO',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3h ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
];

export const Character = () => {
  const character = useParams();

  useEffect(() => {
    if (character) {
      console.log(character);
    }
  }, [character]);

  return (
    <>
      {
        character &&
        <>
          <div className="flex flex-col md:flex-row p-8 bg-white rounded-lg">
            <div className="md:w-2/3">
              <div className="flex items-center gap-x-6">
                <img className="h-16 w-16 rounded-full" src={people[0].imageUrl} alt="" />
              </div>
              <div className="mt-2">
                <h3 className="text-xl font-medium text-gray-800">Abadango Cluster Princess</h3>
              </div>
              <div className="mb-4 mt-5">
                <label htmlFor="occupation" className="block text-gray-700 font-medium mb-1">
                  Specie
                </label>
                <div className="p-2">
                  <span className="text-gray-700">Alien</span>
                </div>
              </div>
              <hr className='mb-3'/>
              <div className="mb-4">
                <label htmlFor="status" className="block text-gray-700 font-medium mb-1">
                  Status
                </label>
                <div className="p-2">
                  <span className="text-gray-700">Alive</span>
                </div>
              </div>
              <hr className='mb-3'/>
              <div className="mb-4">
                <label htmlFor="occupation" className="block text-gray-700 font-medium mb-1">
                  Occupation
                </label>
                <div className="p-2">
                  <span className="text-gray-700">Princess</span>
                </div>
              </div>
              {/* Add more fields as needed */}
            </div>
          </div>
        </>
      }
    </>
  )
}