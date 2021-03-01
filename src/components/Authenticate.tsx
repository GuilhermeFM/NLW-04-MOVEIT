import { useContext } from 'react';
import { AuthenticateContext } from '../contexts/AuthenticateContext';

import Index from '../pages';

export default function Authenticate(Component) {
  function Auth(props) {
    const { id } = useContext(AuthenticateContext);

    if (id) {
      return <Component {...props} />;
    }

    return <Index />;
  }

  if (Component.getServerSideProps)
    Auth.getServerSideProps = Component.getServerSideProps;

  return Auth;
}
