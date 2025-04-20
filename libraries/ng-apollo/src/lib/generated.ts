import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Query = {
  __typename?: 'Query';
  sayHello: Scalars['String']['output'];
};

export type SayHelloQueryVariables = Exact<{ [key: string]: never; }>;


export type SayHelloQuery = { __typename?: 'Query', sayHello: string };

export const SayHelloDocument = gql`
    query sayHello {
  sayHello
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SayHelloGQL extends Apollo.Query<SayHelloQuery, SayHelloQueryVariables> {
    override document = SayHelloDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }