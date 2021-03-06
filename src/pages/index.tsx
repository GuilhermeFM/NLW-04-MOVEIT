import axios from 'axios';
import Head from 'next/head';
import { useState, useRef } from 'react';
import { GetServerSideProps } from 'next';

import * as Icons from '../components/Icons';

interface InputTextWithButtonProps {
  onClick(value: string): void;
}

function InputTextWithButton({ onClick }: InputTextWithButtonProps) {
  const ref = useRef<HTMLInputElement>();

  function handleOnClick() {
    const value = ref.current.value;
    if (value) onClick(value);
  }

  return (
    <div className="app-sign-in-form-input">
      <input
        ref={ref}
        type="text"
        autoComplete="off"
        placeholder="Digite seu username"
        className="app-sign-in-form-input-control"
      />
      <button
        type="submit"
        onClick={handleOnClick}
        className={`app-sign-in-form-input-button hover:bg-green-500`}
      >
        <Icons.Forward className="app-sign-in-form-input-button-img" />
      </button>
    </div>
  );
}

export default function SignIn() {
  async function handleOnClick(value: string) {
    const response = await axios.post('/api/github/login', { username: value });
    const { githubLoginUrl } = response.data;
    window.location.href = githubLoginUrl;
  }

  return (
    <div className="app-sign-in">
      <div className="app-sign-in-main">
        <Head>
          <title>Login | move.it</title>
        </Head>

        <img className="app-sign-in-logo" src="/logos/logo-background.svg" alt="background" />

        <div className="app-sign-in-form">
          <section className="app-sign-in-form-brand">
            <img src="/logos/logo-text.svg" alt="move it" />
            <p className="app-sign-in-form-brand-text">Bem Vindo</p>
          </section>
          <section className="app-sign-in-form-github">
            <img src="/logos/logo-github.svg" alt="github-logo" />
            <p className="app-sign-in-form-github-text">Faça login com seu github para começar</p>
          </section>
          <InputTextWithButton onClick={handleOnClick} />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.req.cookies;

  if (id) {
    return {
      redirect: {
        destination: '/home',
        permanent: true,
      },
    };
  }

  return { props: {} };
};
