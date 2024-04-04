interface Location {
  name: string;
};

export interface CharacterInterface {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  location: Location
  image: string;
  favorite: boolean;
  comments: string;
  deleted: boolean;
};

interface Button {
  text: string;
  value: string;
};

export interface Buttons {
  text: string;
  name: string;
  buttons: Button[];
};

export interface FilterData {
  character: string;
  status: string;
  specie: string;
  gender: string;
};