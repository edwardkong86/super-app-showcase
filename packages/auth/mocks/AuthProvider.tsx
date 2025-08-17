import React from 'react';

interface CreateAuthProviderMockProps {
  isAuthenticated?: boolean;
  isLoading?: boolean;
}

type AuthProviderMockProps = {
  [K in keyof CreateAuthProviderMockProps]-?: NonNullable<
    CreateAuthProviderMockProps[K]
  >;
};

export const createAuthProviderMock = ({
  isAuthenticated = false,
  isLoading = false,
}: CreateAuthProviderMockProps) => {
  return ({
    children,
  }: {
    children: ({
      isAuthenticated,
      isLoading,
    }: AuthProviderMockProps) => React.ReactNode;
  }) => {
    return <>{children({isAuthenticated, isLoading})}</>;
  };
};
