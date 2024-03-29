import { gql, useLazyQuery, useQuery } from "@apollo/client";
import axios from "axios";
import { useState, createContext } from "react";

const ManageCharactersContext = createContext<any>(null);

const charactersListQuery = gql`
  query {
    characters {
      results {
        id
        name
        status
        species
        gender
        location {
          name
        }
        image
      }
    }
  }
`;

const characterByIdQuery = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      gender
      location {
        name
      }
      image
    }
  }
`;

function UseManageCharacters(props : any) {
  const { loading, error, data } = useQuery(charactersListQuery);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  
  const [getCharacterById, { data: characterData }] = useLazyQuery(
    characterByIdQuery,
    { variables: { id: selectedCharacterId ?? '' } }
  );

  return (
    <ManageCharactersContext.Provider value={{ loading,
      error,
      characters: data ? data.characters.results : [],
      characterData,
      getCharacterById,
      selectedCharacterId,
      setSelectedCharacterId }}>
      {props.children}
    </ManageCharactersContext.Provider>
  );
}

export { ManageCharactersContext, UseManageCharacters };
