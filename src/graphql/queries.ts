import { gql } from "@apollo/client";

export const charactersListQuery = gql`
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

export const characterByIdQuery = gql`
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