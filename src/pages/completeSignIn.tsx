import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

interface CompleteSignInProps {
  code: string;
}

export default function CompleteSignIn({ code }: CompleteSignInProps) {
  const { replace } = useRouter();

  useEffect(() => {
    if (!code) return;

    const requestAccessToken = async () => {
      const response = await axios.post('/api/github/accessToken', { code });
      const { access_token } = response.data;
      if (!access_token) {
        replace('/');
      }
      const { data } = await axios.post('/api/users/create', { access_token });
      const { id } = data;
      Cookies.set('id', id);
      replace('/home');
    };

    requestAccessToken();
  }, [code]);

  return (
    <div className="w-screen h-screen bg-brand-blue-200">
      <img
        src="/logos/logo-background.svg"
        alt="loading"
        className="p-8 h-full object-center animate-pulse"
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { code } = context.query;

  if (!code) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  return { props: { code } };
};
