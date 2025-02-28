import { gql } from "@apollo/client"

export const LOGIN = gql `mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }`;

  export const REGISTER = gql `mutation Mutation($input: UserInput!) {
    addUser(input: $input) {
      token
    }
  }`;

  export const FAVORITE = gql `mutation Mutation($species: String!) {
  saveFavSpecies(species: $species) {
    _id
    username
    email
  }
}`;

export const DELETE_FAVORITE = gql `mutation DeleteFavSpecies($species: String!) {
  deleteFavSpecies(species: $species) {
    _id
    username
    email
  }
}`;