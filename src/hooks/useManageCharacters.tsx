import { useLazyQuery, useQuery } from "@apollo/client";
import { useState, createContext } from "react";
import { characterByIdQuery, charactersListQuery } from "../graphql/queries.ts";

const ManageCharactersContext = createContext<any>(null);

const UseManageCharacters = (props : any) => {
  const { loading, error, data } = useQuery(charactersListQuery);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [flagStorage, setFlagStorage] = useState<boolean>(false);
  
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
      setSelectedCharacterId,
      flagStorage,
      setFlagStorage }}>
      {props.children}
    </ManageCharactersContext.Provider>
  );
}

export { ManageCharactersContext, UseManageCharacters };
