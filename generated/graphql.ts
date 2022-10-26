import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CoalDepot = {
  __typename?: "CoalDepot";
  address: Scalars["String"];
  coalDepotName: Scalars["String"];
  coalDescAndAmount: Scalars["String"];
  id: Scalars["ID"];
  image: Scalars["String"];
  landline: Scalars["String"];
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
  mobilePhone: Scalars["String"];
  publicId: Scalars["String"];
  userId: Scalars["String"];
};

export type CoalDepotInput = {
  address: Scalars["String"];
  coalDepotName: Scalars["String"];
  coalDescAndAmount: Scalars["String"];
  coordinates: CoordinatesInput;
  image: Scalars["String"];
  landline: Scalars["String"];
  mobilePhone: Scalars["String"];
};

export type CoordinatesInput = {
  latitude: Scalars["Float"];
  longitude: Scalars["Float"];
};

export type ImageSignature = {
  __typename?: "ImageSignature";
  signature: Scalars["String"];
  timestamp: Scalars["Int"];
};

export type Mutation = {
  __typename?: "Mutation";
  createCoalDepot?: Maybe<CoalDepot>;
  createImageSignature: ImageSignature;
};

export type MutationCreateCoalDepotArgs = {
  input: CoalDepotInput;
};

export type Query = {
  __typename?: "Query";
  hello: Scalars["String"];
};

export type CreateSignatureMutationVariables = Exact<{ [key: string]: never }>;

export type CreateSignatureMutation = {
  __typename?: "Mutation";
  createImageSignature: {
    __typename?: "ImageSignature";
    signature: string;
    timestamp: number;
  };
};

export const CreateSignatureDocument = gql`
  mutation CreateSignature {
    createImageSignature {
      signature
      timestamp
    }
  }
`;
export type CreateSignatureMutationFn = Apollo.MutationFunction<
  CreateSignatureMutation,
  CreateSignatureMutationVariables
>;

/**
 * __useCreateSignatureMutation__
 *
 * To run a mutation, you first call `useCreateSignatureMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSignatureMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSignatureMutation, { data, loading, error }] = useCreateSignatureMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateSignatureMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateSignatureMutation,
    CreateSignatureMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateSignatureMutation,
    CreateSignatureMutationVariables
  >(CreateSignatureDocument, options);
}
export type CreateSignatureMutationHookResult = ReturnType<
  typeof useCreateSignatureMutation
>;
export type CreateSignatureMutationResult =
  Apollo.MutationResult<CreateSignatureMutation>;
export type CreateSignatureMutationOptions = Apollo.BaseMutationOptions<
  CreateSignatureMutation,
  CreateSignatureMutationVariables
>;
