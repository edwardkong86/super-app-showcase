import React from 'react';

// LoginButton as a lazy-loaded component from auth module
const AuthLoginButton = React.lazy(() => import('auth/LoginButton'));

interface LoginButtonProps {
  title?: string;
  style?: any;
  textStyle?: any;
}

const LoginButton: React.FC<LoginButtonProps> = (props) => {
  return (
    <React.Suspense fallback={<></>}>
      <AuthLoginButton {...props} />
    </React.Suspense>
  );
};

export default LoginButton;