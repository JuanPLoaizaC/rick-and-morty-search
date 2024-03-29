interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    location: {
      name: string;
    };
    image: string;
    favorite: boolean;
    comments: string;
  };