interface Location {
  name: string;
};

interface CharacterInterface {
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