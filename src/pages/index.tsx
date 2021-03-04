import Head from 'next/head';
import { FormEvent, useContext, useState, useRef } from 'react';
import { AuthenticateContext } from '../contexts/AuthenticateContext';

export default function SignIn() {
  const usernameRef = useRef<HTMLInputElement>();
  const [filled, setFilled] = useState(false);
  const { redirect } = useContext(AuthenticateContext);

  function handleUsernameOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const username = e.target.value;
    if (username.length > 0 && !filled) setFilled(true);
    if (username.length <= 0) setFilled(false);
  }

  async function handleSignIn() {
    const username = usernameRef.current.value;
    if (username) redirect(username);
  }

  return (
    <div className="w-screen h-screen overflow-auto bg-blue flex-middle">
      <div className="w-5/6 h-full xl:w-full xl:justify-evenly flex-center">
        <Head>
          <title>Login | move.it</title>
        </Head>

        <div className="hidden xl:flex-middle xl:h-3/6 xl:w-5/12">
          <img src="/icons/background-logo.svg" alt="background" />
        </div>

        <div className="w-full xl:w-5/12 xl:h-3/6 flex-col-middle">
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

          <div className="input-textbox">
            <input
              type="text"
              autoComplete="off"
              placeholder="Digite seu username"
              onChange={handleUsernameOnChange}
              ref={usernameRef}
            />
            <button
              type="submit"
              onClick={handleSignIn}
              className={`${filled ? 'bg-green-500' : 'bg-blue-dark'} hover:bg-green-500`}
            >
              <img alt="logar" src="/icons/arrow-right.svg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
