import { gql } from "@apollo/client";

export const QUERY_ME = gql `query Me {
  me {
    username
    email
  }
}`;

export const SEARCH = gql `query GetParksByName($name: String!) {
    getParksByName(name: $name) {
      _id
      name
    }
  }`;