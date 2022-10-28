import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BoundsInput = {
  ne: CoordinatesInput;
  sw: CoordinatesInput;
};

export type CoalDepot = {
  __typename?: 'CoalDepot';
  address: Scalars['String'];
  coalDepotName: Scalars['String'];
  id: Scalars['ID'];
  image: Scalars['String'];
  landline: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  mediumCoalAmount: Scalars['Float'];
  mediumCoalPrice: Scalars['Float'];
  mobilePhone: Scalars['String'];
  nearby: Array<CoalDepot>;
  publicId: Scalars['String'];
  smallCoalAmount: Scalars['Float'];
  smallCoalPrice: Scalars['Float'];
  thickCoalAmount: Scalars['Float'];
  thickCoalPrice: Scalars['Float'];
  userId: Scalars['String'];
};

export type CoalDepotInput = {
  address: Scalars['String'];
  coalDepotName: Scalars['String'];
  coordinates: CoordinatesInput;
  image: Scalars['String'];
  landline: Scalars['String'];
  mediumCoalAmount: Scalars['Float'];
  mediumCoalPrice: Scalars['Float'];
  mobilePhone: Scalars['String'];
  smallCoalAmount: Scalars['Float'];
  smallCoalPrice: Scalars['Float'];
  thickCoalAmount: Scalars['Float'];
  thickCoalPrice: Scalars['Float'];
};

export type CoordinatesInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type ImageSignature = {
  __typename?: 'ImageSignature';
  signature: Scalars['String'];
  timestamp: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCoalDepot?: Maybe<CoalDepot>;
  createImageSignature: ImageSignature;
  updateCoalDepot?: Maybe<CoalDepot>;
};


export type MutationCreateCoalDepotArgs = {
  input: CoalDepotInput;
};


export type MutationUpdateCoalDepotArgs = {
  id: Scalars['String'];
  input: CoalDepotInput;
};

export type Query = {
  __typename?: 'Query';
  coalDepot?: Maybe<CoalDepot>;
  coalDepots: Array<CoalDepot>;
  hello: Scalars['String'];
};


export type QueryCoalDepotArgs = {
  id: Scalars['String'];
};


export type QueryCoalDepotsArgs = {
  bounds: BoundsInput;
};

export type CreateCoalDepotMutationVariables = Exact<{
  input: CoalDepotInput;
}>;


export type CreateCoalDepotMutation = { __typename?: 'Mutation', createCoalDepot?: { __typename?: 'CoalDepot', id: string } | null };

export type CreateImageSignatureMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateImageSignatureMutation = { __typename?: 'Mutation', createImageSignature: { __typename?: 'ImageSignature', signature: string, timestamp: number } };

export type EditCoalDepotQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type EditCoalDepotQuery = { __typename?: 'Query', coalDepot?: { __typename?: 'CoalDepot', id: string, userId: string, address: string, publicId: string, coalDepotName: string, mobilePhone: string, landline: string, latitude: number, longitude: number, thickCoalAmount: number, mediumCoalAmount: number, smallCoalAmount: number, thickCoalPrice: number, mediumCoalPrice: number, smallCoalPrice: number } | null };

export type GetCoalDepotsFromBoundsQueryVariables = Exact<{
  bounds: BoundsInput;
}>;


export type GetCoalDepotsFromBoundsQuery = { __typename?: 'Query', coalDepots: Array<{ __typename?: 'CoalDepot', id: string, latitude: number, longitude: number, address: string, publicId: string, coalDepotName: string }> };

export type ShowCoalDepotQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ShowCoalDepotQuery = { __typename?: 'Query', coalDepot?: { __typename?: 'CoalDepot', id: string, userId: string, address: string, publicId: string, coalDepotName: string, mobilePhone: string, landline: string, latitude: number, longitude: number, thickCoalAmount: number, mediumCoalAmount: number, smallCoalAmount: number, thickCoalPrice: number, mediumCoalPrice: number, smallCoalPrice: number, nearby: Array<{ __typename?: 'CoalDepot', id: string, latitude: number, longitude: number }> } | null };

export type UpdateCoalDepotMutationVariables = Exact<{
  id: Scalars['String'];
  input: CoalDepotInput;
}>;


export type UpdateCoalDepotMutation = { __typename?: 'Mutation', updateCoalDepot?: { __typename?: 'CoalDepot', id: string, image: string, address: string, publicId: string, coalDepotName: string, mobilePhone: string, landline: string, latitude: number, longitude: number, thickCoalAmount: number, mediumCoalAmount: number, smallCoalAmount: number, thickCoalPrice: number, mediumCoalPrice: number, smallCoalPrice: number } | null };


export const CreateCoalDepotDocument = gql`
    mutation CreateCoalDepot($input: CoalDepotInput!) {
  createCoalDepot(input: $input) {
    id
  }
}
    `;
export type CreateCoalDepotMutationFn = Apollo.MutationFunction<CreateCoalDepotMutation, CreateCoalDepotMutationVariables>;

/**
 * __useCreateCoalDepotMutation__
 *
 * To run a mutation, you first call `useCreateCoalDepotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCoalDepotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCoalDepotMutation, { data, loading, error }] = useCreateCoalDepotMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCoalDepotMutation(baseOptions?: Apollo.MutationHookOptions<CreateCoalDepotMutation, CreateCoalDepotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCoalDepotMutation, CreateCoalDepotMutationVariables>(CreateCoalDepotDocument, options);
      }
export type CreateCoalDepotMutationHookResult = ReturnType<typeof useCreateCoalDepotMutation>;
export type CreateCoalDepotMutationResult = Apollo.MutationResult<CreateCoalDepotMutation>;
export type CreateCoalDepotMutationOptions = Apollo.BaseMutationOptions<CreateCoalDepotMutation, CreateCoalDepotMutationVariables>;
export const CreateImageSignatureDocument = gql`
    mutation CreateImageSignature {
  createImageSignature {
    signature
    timestamp
  }
}
    `;
export type CreateImageSignatureMutationFn = Apollo.MutationFunction<CreateImageSignatureMutation, CreateImageSignatureMutationVariables>;

/**
 * __useCreateImageSignatureMutation__
 *
 * To run a mutation, you first call `useCreateImageSignatureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateImageSignatureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createImageSignatureMutation, { data, loading, error }] = useCreateImageSignatureMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateImageSignatureMutation(baseOptions?: Apollo.MutationHookOptions<CreateImageSignatureMutation, CreateImageSignatureMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateImageSignatureMutation, CreateImageSignatureMutationVariables>(CreateImageSignatureDocument, options);
      }
export type CreateImageSignatureMutationHookResult = ReturnType<typeof useCreateImageSignatureMutation>;
export type CreateImageSignatureMutationResult = Apollo.MutationResult<CreateImageSignatureMutation>;
export type CreateImageSignatureMutationOptions = Apollo.BaseMutationOptions<CreateImageSignatureMutation, CreateImageSignatureMutationVariables>;
export const EditCoalDepotDocument = gql`
    query EditCoalDepot($id: String!) {
  coalDepot(id: $id) {
    id
    userId
    address
    publicId
    coalDepotName
    mobilePhone
    landline
    latitude
    longitude
    thickCoalAmount
    mediumCoalAmount
    smallCoalAmount
    thickCoalPrice
    mediumCoalPrice
    smallCoalPrice
  }
}
    `;

/**
 * __useEditCoalDepotQuery__
 *
 * To run a query within a React component, call `useEditCoalDepotQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditCoalDepotQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditCoalDepotQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEditCoalDepotQuery(baseOptions: Apollo.QueryHookOptions<EditCoalDepotQuery, EditCoalDepotQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EditCoalDepotQuery, EditCoalDepotQueryVariables>(EditCoalDepotDocument, options);
      }
export function useEditCoalDepotLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EditCoalDepotQuery, EditCoalDepotQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EditCoalDepotQuery, EditCoalDepotQueryVariables>(EditCoalDepotDocument, options);
        }
export type EditCoalDepotQueryHookResult = ReturnType<typeof useEditCoalDepotQuery>;
export type EditCoalDepotLazyQueryHookResult = ReturnType<typeof useEditCoalDepotLazyQuery>;
export type EditCoalDepotQueryResult = Apollo.QueryResult<EditCoalDepotQuery, EditCoalDepotQueryVariables>;
export const GetCoalDepotsFromBoundsDocument = gql`
    query getCoalDepotsFromBounds($bounds: BoundsInput!) {
  coalDepots(bounds: $bounds) {
    id
    latitude
    longitude
    address
    publicId
    coalDepotName
  }
}
    `;

/**
 * __useGetCoalDepotsFromBoundsQuery__
 *
 * To run a query within a React component, call `useGetCoalDepotsFromBoundsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoalDepotsFromBoundsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoalDepotsFromBoundsQuery({
 *   variables: {
 *      bounds: // value for 'bounds'
 *   },
 * });
 */
export function useGetCoalDepotsFromBoundsQuery(baseOptions: Apollo.QueryHookOptions<GetCoalDepotsFromBoundsQuery, GetCoalDepotsFromBoundsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCoalDepotsFromBoundsQuery, GetCoalDepotsFromBoundsQueryVariables>(GetCoalDepotsFromBoundsDocument, options);
      }
export function useGetCoalDepotsFromBoundsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCoalDepotsFromBoundsQuery, GetCoalDepotsFromBoundsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCoalDepotsFromBoundsQuery, GetCoalDepotsFromBoundsQueryVariables>(GetCoalDepotsFromBoundsDocument, options);
        }
export type GetCoalDepotsFromBoundsQueryHookResult = ReturnType<typeof useGetCoalDepotsFromBoundsQuery>;
export type GetCoalDepotsFromBoundsLazyQueryHookResult = ReturnType<typeof useGetCoalDepotsFromBoundsLazyQuery>;
export type GetCoalDepotsFromBoundsQueryResult = Apollo.QueryResult<GetCoalDepotsFromBoundsQuery, GetCoalDepotsFromBoundsQueryVariables>;
export const ShowCoalDepotDocument = gql`
    query ShowCoalDepot($id: String!) {
  coalDepot(id: $id) {
    id
    userId
    address
    publicId
    coalDepotName
    mobilePhone
    landline
    latitude
    longitude
    thickCoalAmount
    mediumCoalAmount
    smallCoalAmount
    thickCoalPrice
    mediumCoalPrice
    smallCoalPrice
    nearby {
      id
      latitude
      longitude
    }
  }
}
    `;

/**
 * __useShowCoalDepotQuery__
 *
 * To run a query within a React component, call `useShowCoalDepotQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowCoalDepotQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowCoalDepotQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useShowCoalDepotQuery(baseOptions: Apollo.QueryHookOptions<ShowCoalDepotQuery, ShowCoalDepotQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowCoalDepotQuery, ShowCoalDepotQueryVariables>(ShowCoalDepotDocument, options);
      }
export function useShowCoalDepotLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowCoalDepotQuery, ShowCoalDepotQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowCoalDepotQuery, ShowCoalDepotQueryVariables>(ShowCoalDepotDocument, options);
        }
export type ShowCoalDepotQueryHookResult = ReturnType<typeof useShowCoalDepotQuery>;
export type ShowCoalDepotLazyQueryHookResult = ReturnType<typeof useShowCoalDepotLazyQuery>;
export type ShowCoalDepotQueryResult = Apollo.QueryResult<ShowCoalDepotQuery, ShowCoalDepotQueryVariables>;
export const UpdateCoalDepotDocument = gql`
    mutation UpdateCoalDepot($id: String!, $input: CoalDepotInput!) {
  updateCoalDepot(id: $id, input: $input) {
    id
    image
    address
    publicId
    coalDepotName
    mobilePhone
    landline
    latitude
    longitude
    thickCoalAmount
    mediumCoalAmount
    smallCoalAmount
    thickCoalPrice
    mediumCoalPrice
    smallCoalPrice
  }
}
    `;
export type UpdateCoalDepotMutationFn = Apollo.MutationFunction<UpdateCoalDepotMutation, UpdateCoalDepotMutationVariables>;

/**
 * __useUpdateCoalDepotMutation__
 *
 * To run a mutation, you first call `useUpdateCoalDepotMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCoalDepotMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCoalDepotMutation, { data, loading, error }] = useUpdateCoalDepotMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCoalDepotMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCoalDepotMutation, UpdateCoalDepotMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCoalDepotMutation, UpdateCoalDepotMutationVariables>(UpdateCoalDepotDocument, options);
      }
export type UpdateCoalDepotMutationHookResult = ReturnType<typeof useUpdateCoalDepotMutation>;
export type UpdateCoalDepotMutationResult = Apollo.MutationResult<UpdateCoalDepotMutation>;
export type UpdateCoalDepotMutationOptions = Apollo.BaseMutationOptions<UpdateCoalDepotMutation, UpdateCoalDepotMutationVariables>;