import axios from 'axios';
import Head from 'next/head';
import { useState, useRef } from 'react';
import { GetServerSideProps } from 'next';

interface InputTextWithButtonProps {
  onClick(value: string): void;
}

function InputTextWithButton({ onClick }: InputTextWithButtonProps) {
  const ref = useRef<HTMLInputElement>();
  const [filled, setFilled] = useState(false);

  function handleTextOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value.length > 0 && !filled) setFilled(true);
    if (value.length <= 0) setFilled(false);
  }

  function handleOnClick() {
    const value = ref.current.value;
    if (value) onClick(value);
  }

  return (
    <div className="input-textbox">
      <input
        type="text"
        autoComplete="off"
        placeholder="Digite seu username"
        onChange={handleTextOnChange}
        ref={ref}
      />
      <button
        type="submit"
        onClick={handleOnClick}
        className={`${filled ? 'bg-green-500' : 'bg-blue-dark'} hover:bg-green-500`}
      >
        <img alt="logar" src="/icons/arrow-right.svg" />
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
    <div className="w-screen h-screen overflow-auto bg-blue flex-middle">
      <div className="w-5/6 h-full xl:w-full xl:justify-evenly flex-middle">
        <Head>
          <title>Login | move.it</title>
        </Head>

        <div className="hidden xl:flex-middle xl:h-3/6 xl:w-5/12">
          <img src="/icons/background-logo.svg" alt="background" />
        </div>

        <div className="w-full lg:w-6/12 xl:w-5/12 xl:h-3/6 flex-col-middle">
          <header className="flex flex-col w-full mb-10">
            <section className="mb-10">
              <img src="/icons/logo.svg" alt="move it" />
              <p className="mt-10 text-2xl font-semibold leading-9 text-white font-inter">
                Bem Vindo
              </p>
            </section>

            <section className="flex items-center">
              <img src="/icons/github-logo.svg" alt="github-logo" />
              <p className="ml-6 text-lg font-medium leading-7 font-inter text-blue">
                Faça login com seu github para começar
              </p>
            </section>
          </header>
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
