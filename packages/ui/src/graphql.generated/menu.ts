import { gql } from 'urql';
import * as Urql from 'urql';

import * as Types from './_types';

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type MenuForEditingFragment = {
  __typename?: 'Menu';
  id: string;
  title: string;
  items?: Array<{
    __typename?: 'Item';
    id: string;
    parentId?: string | null;
    orderKey: string;
    title?: string | null;
    description?: string | null;
    price?: any | null;
    imageId?: string | null;
    image?: { __typename?: 'UploadedFile'; id: string; url: string } | null;
  }> | null;
  images: Array<{ __typename?: 'UploadedFile'; id: string; url: string; originalName: string }>;
};

export type GetMenuQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.MenuWhereUniqueInput>;
}>;

export type GetMenuQuery = {
  __typename?: 'Query';
  menu?: {
    __typename?: 'Menu';
    id: string;
    title: string;
    items?: Array<{
      __typename?: 'Item';
      id: string;
      parentId?: string | null;
      orderKey: string;
      title?: string | null;
      description?: string | null;
      price?: any | null;
      imageId?: string | null;
      image?: { __typename?: 'UploadedFile'; id: string; url: string } | null;
    }> | null;
    images: Array<{ __typename?: 'UploadedFile'; id: string; url: string; originalName: string }>;
  } | null;
  availableMenus: Array<{ __typename?: 'Menu'; id: string; title: string }>;
};

export type SaveMenuMutationVariables = Types.Exact<{
  menu: Types.SaveMenuInput;
}>;

export type SaveMenuMutation = {
  __typename?: 'Mutation';
  menu: {
    __typename?: 'Menu';
    id: string;
    title: string;
    items?: Array<{
      __typename?: 'Item';
      id: string;
      parentId?: string | null;
      orderKey: string;
      title?: string | null;
      description?: string | null;
      price?: any | null;
      imageId?: string | null;
      image?: { __typename?: 'UploadedFile'; id: string; url: string } | null;
    }> | null;
    images: Array<{ __typename?: 'UploadedFile'; id: string; url: string; originalName: string }>;
  };
};

export const MenuForEditingFragmentDoc = gql`
  fragment MenuForEditing on Menu {
    id
    title
    items {
      id
      parentId
      orderKey
      title
      description
      price
      imageId
      image {
        id
        url
      }
    }
    images {
      id
      url
      originalName
    }
  }
`;
export const GetMenuDocument = gql`
  query GetMenu($where: MenuWhereUniqueInput) {
    menu: menu(where: $where) {
      ...MenuForEditing
    }
    availableMenus {
      id
      title
    }
  }
  ${MenuForEditingFragmentDoc}
`;

export function useGetMenuQuery(options?: Omit<Urql.UseQueryArgs<GetMenuQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMenuQuery, GetMenuQueryVariables>({ query: GetMenuDocument, ...options });
}
export const SaveMenuDocument = gql`
  mutation SaveMenu($menu: SaveMenuInput!) {
    menu: saveMenu(menu: $menu) {
      ...MenuForEditing
    }
  }
  ${MenuForEditingFragmentDoc}
`;

export function useSaveMenuMutation() {
  return Urql.useMutation<SaveMenuMutation, SaveMenuMutationVariables>(SaveMenuDocument);
}
