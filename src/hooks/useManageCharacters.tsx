import axios from "axios";
import { createContext } from "react";

const ManageCharactersContext = createContext<any>(null);

function UseManageCharacters(props : any) {
  const getCharactersList = async () => {
    //console.log(process.env.GET_CHARACTERS_URL);
    return await axios.get('https://rickandmortyapi.com/api/character');
  };

  return (
    <ManageCharactersContext.Provider value={{ getCharactersList }}>
      {props.children}
    </ManageCharactersContext.Provider>
  );
}

export { ManageCharactersContext, UseManageCharacters };
