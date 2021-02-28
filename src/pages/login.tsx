import Head from 'next/head';
import { useState } from 'react';

import styles from '../styles/Pages/Login.module.css';

export default function login() {
  const [username, setUsername] = useState<string>();

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

          <main>
            <div>
              <img src="/icons/github-logo.svg" alt="github-logo" />
              <p>Faça login com seu github para começar</p>
            </div>
            <div>
              <input
                type="text"
                placeholder="Digite seu username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <button
                type="button"
                className={`${username && styles.buttonHighlight}`}
              >
                <img src="/icons/arrow-right.svg" alt="logar" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
