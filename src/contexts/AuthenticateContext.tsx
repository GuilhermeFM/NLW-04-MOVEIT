import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

import { ParsedUrlQuery } from 'querystring';
import { useRouter } from 'next/router';

interface AuthenticateContextData {
  id: number;
  avatarUrl: string;
  username: string;

  redirect(username: string): Promise<void>;
  authenticate(query: ParsedUrlQuery): Promise<void>;
}

export const AuthenticateContext = createContext({} as AuthenticateContextData);

export default function AuthenticateProvider({ children }) {
  const [id, setId] = useState(0);
  const [username, setUsername] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [authenticating, setAuthenticating] = useState(false);

  const { query, replace } = useRouter();

  async function redirect(username: string) {
    const response = await axios.post('/api/github/login', { username });
    const { githubLoginUrl } = response.data;

    window.location.href = githubLoginUrl;
  }

  async function authenticate(query: ParsedUrlQuery) {
    try {
      setAuthenticating(true);

      const { code } = query;
      if (!code) {
        setAuthenticating(false);
        return;
      }

      const response = await axios.post('/api/github/accessToken', { code });
      const { access_token } = response.data;

      const { data } = await axios.post('/api/users/create', { access_token });
      const { id, username, avatarUrl } = data;

      setId(id);
      setUsername(username);
      setAvatarUrl(avatarUrl);
      setAuthenticating(false);

      Cookies.set('id', id);
      Cookies.set('username', username);
      Cookies.set('avatarUrl', avatarUrl);

      replace('/home');
    } catch (err) {
      replace('/');
    } finally {
      setAuthenticating(false);
    }
  }

  useEffect(() => {
    const cId = Number(Cookies.get('id'));
    const cUsername = Cookies.get('username');
    const cAvatarUrl = Cookies.get('avatarUrl');

    setId(cId);
    setUsername(cUsername);
    setAvatarUrl(cAvatarUrl);
  }, []);

  useEffect(() => {
    authenticate(query);
  }, [query]);

  return (
    <AuthenticateContext.Provider
      value={{
        id,
        username,
        avatarUrl,
        redirect,
        authenticate,
      }}
    >
      {authenticating ? (
        <div>
          <div>
            <img src="/icons/background-logo.svg" alt="loading" />
          </div>
        </div>
      ) : (
        children
      )}
    </AuthenticateContext.Provider>
  );
}
