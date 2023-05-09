import { gql } from "@apollo/client";
import client from "../apollo-client";

export const getAllRoutes = async (page = 1, size = 10) => {
  const { data, errors, loading } = await client.query({
    query: gql`
      query routes($page: Int, $size: Int) {
        getRoutes(page: $page, size: $size) {
          pageInfo {
            totalItems
            currentPage
          }
          nodes {
            _id
            name
            from {
              _id
              city
              locationName
              address
            }
            to {
              _id
              locationName
              address
              city
            }
            distance
            expectedTime
          }
        }
      }
    `,
    variables: {
      page,
      size,
    },
  });
  return { data, loading, errors };
};

export const getRoute = async (routeId) => {
  const { data, errors, loading } = await client.query({
    query: gql`
      query getRoute($routeId: String!) {
        getRoute(routeId: $routeId) {
          _id
          name
          distance
          expectedTime
          from {
            _id
            city
            locationName
            address
          }
          to {
            _id
            locationName
            address
            city
          }
          buses {
            _id
            class
            type
            departureDate
            departureTime
            price
            busImage
            numberOfSeats
            availableSeats
            occupiedSeat
            departureTerminal
            arrivalTerminal
            status
          }
        }
      }
    `,
    variables: {
      routeId,
    },
  });
  return { data, errors, loading };
};

export const addRoute = async (event) => {
  const { companyId, routeId } = event;
  const { data, errors } = await client.mutate({
    mutation: gql`
      mutation addRouteToCompany($companyId: String!, $routeId: String!) {
        addRouteToCompany(companyId: $companyId, routeId: $routeId) {
          _id
          name
          address
        }
      }
    `,
    variables: {
      companyId,
      routeId,
    },
  });
  return { data, errors };
};

export const deleteRoute = async (routeId) => {
  const { data, errors } = await client.mutate({
    mutation: gql`
      mutation deleteRoute($routeId: String!) {
        deleteRoute(routeId: $routeId)
      }
    `,
    variables: {
      routeId,
    },
  });
  return { data, errors };
};
