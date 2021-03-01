import Head from 'next/head';
import { FormEvent, useContext, useState } from 'react';

import styles from '../styles/Pages/Login.module.css';
import { AuthenticateContext } from '../contexts/AuthenticateContext';

export default function login() {
  const { redirect, authenticate } = useContext(AuthenticateContext);
  const [username, setUsername] = useState<string>('');

  async function handleOnSubmit(event: FormEvent) {
    event.preventDefault();
    await redirect(username);
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <Head>
          <title>Login | move.it</title>
        </Head>

        <div className={styles.containerLeft}>
          <img src="/icons/background-logo.svg" alt="background" />
        </div>

        <div className={styles.containerRight}>
          <header>
            <img src="/icons/logo.svg" alt="move it" />
            <strong>Bem Vindo</strong>
          </header>

          <form onSubmit={handleOnSubmit}>
            <div>
              <img src="/icons/github-logo.svg" alt="github-logo" />
              <p>Faça login com seu github para começar</p>
            </div>
            <div>
              <input
                type="text"
                name="username"
                placeholder="Digite seu username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <button type="submit">
                <img src="/icons/arrow-right.svg" alt="logar" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
