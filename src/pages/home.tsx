import Head from 'next/head';
import { GetServerSideProps } from 'next';
import React, { useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { fetch } from '../services/mongodb';
import ChallengeProvider, { ChallengeContext } from '../contexts/ChallengesContexts';
import CountdownProvider, { CountdownContext } from '../contexts/CountdownContexts';

import ExperienceBar from '../components/ExperienceBar';

import * as Icons from '../components/Icons';
import * as Images from '../components/Images';

interface HomeProps {
  id: number;
  username: string;
  avatarUrl: string;

  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

function ChallengeBox() {
  const { resetCountdown } = useContext(CountdownContext);
  const { username, activeChallenge, resetChallenge, completeChallenge } = useContext(
    ChallengeContext,
  );
  async function handleChallengeSucceeded() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }

  return (
    <div className="challenge-box">
      <section className="challenge-box-section-1">
        <header className="challenge-box-header">
          <strong className="challenge-box-header-text">Ganhe {activeChallenge.amount} xp</strong>
        </header>
        {activeChallenge.type == 'body' ? (
          <Images.Body className="challenge-box-header-svg" />
        ) : (
          <Images.Eye className="challenge-box-header-svg" />
        )}
        <p className="challenge-box-header-p-1">Exercite-se</p>
        <p className="challenge-box-header-p-2">
          Bora lá {username} é agora meu parça. {activeChallenge.description}
        </p>
      </section>

      <section className="challenge-box-section-2">
        <button className="challenge-box-red-button" onClick={handleChallengeFailed}>
          Falhei
        </button>
        <button className="challenge-box-green-button" onClick={handleChallengeSucceeded}>
          Completei
        </button>
      </section>
    </div>
  );
}

function ChallengeInfo() {
  return (
    <div className="challenge-info">
      <p className="challenge-info-p">Inicie um ciclo para receber desafios a serem completados.</p>
      <div className="challenge-info-content">
        <Images.LevelUp className="challenge-info-content-svg" />
        <p className="challenge-info-content-p">
          Complete os desafios, ganhe experiência e avance de nível.
        </p>
      </div>
    </div>
  );
}

function Countdown() {
  const {
    minutes,
    seconds,
    isActive,
    hasFinished,
    startCountdown,
    resetCountdown,
    currentPercentageOfElapsedTime,
  } = useContext(CountdownContext);

  const { username, avatarUrl, level, challengesCompleted } = useContext(ChallengeContext);
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <div className="countdown">
      <div className="profile">
        <img className="profile-img" src={avatarUrl} alt={username} />
        <div className="profile-info">
          <p className="profile-info-username">{username}</p>
          <div className="profile-level">
            <img className="profile-level-img" src="others/level.svg" alt="Level" />
            <span className="profile-level-value">Level {level}</span>
          </div>
        </div>
      </div>

      <div className="challenges-completed">
        <span className="challenges-completed-title">Desafios completados</span>
        <span className="challenges-completed-amount">{challengesCompleted}</span>
      </div>

      <div className="timer">
        <div className="timer-minutes">
          <span className="timer-minutes-left">{minuteLeft}</span>
          <span className="timer-minutes-right">{minuteRight}</span>
        </div>
        <span className="timer-separator">:</span>
        <div className="timer-seconds">
          <span className="timer-seconds-left">{secondLeft}</span>
          <span className="timer-seconds-right">{secondRight}</span>
        </div>
      </div>

      {isActive ? (
        <div className="stop-button">
          <button className="stop-button-control" onClick={resetCountdown}>
            <span className="stop-button-control-text">Abandonar ciclo</span>
            <Icons.Close className="stop-button-control-svg" />
          </button>
          <div
            className="stop-button-progress-bar"
            style={{ width: `${currentPercentageOfElapsedTime()}%` }}
          />
        </div>
      ) : (
        <button className="start-button" onClick={startCountdown}>
          <span className="start-button-text">Iniciar um ciclo</span>
          <Icons.Play className="start-button-svg" />
        </button>
      )}
    </div>
  );
}

function Main() {
  const lg = useMediaQuery({ query: '(min-width: 1024px)' });
  const { activeChallenge } = useContext(ChallengeContext);
  const [clienteSide, setClientSide] = useState(false);

  useEffect(() => {
    setClientSide(true);
  }, []);

  return (
    <main className="app-main">
      <ExperienceBar />

      {clienteSide && lg ? (
        <div className="app-main-desktop">
          <Countdown />
          {activeChallenge ? <ChallengeBox /> : <ChallengeInfo />}
        </div>
      ) : (
        <div className="app-main-mobile">{activeChallenge ? <ChallengeBox /> : <Countdown />}</div>
      )}
    </main>
  );
}

export default function Home({ ...rest }: HomeProps) {
  return (
    <>
      <Head>
        <title>Inicio | move.it</title>
      </Head>
      <div className="app">
        <header className="app-header">
          <img src="/logos/logo-icon.svg" alt="logo" width="24" height="24" />
          <nav className="app-header-nav-bar">
            <a href="/#" className="app-header-nav-bar-home">
              <Icons.Home className="app-header-nav-bar-icon-home" />
            </a>
            <a href="/#" className="app-header-nav-bar-leaderboards">
              <Icons.Award className="app-header-nav-bar-icon-leaderboards" />
            </a>
          </nav>
        </header>
        <ChallengeProvider {...rest}>
          <CountdownProvider>
            <Main />
          </CountdownProvider>
        </ChallengeProvider>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { id: cId } = context.req.cookies;

  if (!cId) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  const user = await fetch(Number(cId));
  const { id, username, avatarUrl } = user;
  const { level, currentExperience, challengesCompleted } = user;

  return {
    props: {
      id,
      username,
      avatarUrl,
      level: level ?? 0,
      currentExperience: currentExperience ?? 0,
      challengesCompleted: challengesCompleted ?? 0,
    },
  };
};
