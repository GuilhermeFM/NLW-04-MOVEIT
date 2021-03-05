import { GetServerSideProps } from 'next';
import Head from 'next/head';

import Profile from '../components/Profile';
import Countdown from '../components/Countdown';
import ChallengeBox from '../components/ChallengeBox';
import ExperienceBar from '../components/ExperienceBar';
import CompletedChallenges from '../components/CompletedChallenges';

import CountdownProvider from '../contexts/CountdownContexts';
import ChallengeProvider from '../contexts/ChallengesContexts';

import { fetch } from '../services/mongodb';

import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  id: number;
  username: string;
  avatarUrl: string;

  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home({ ...rest }: HomeProps) {
  return (
    <ChallengeProvider {...rest}>
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it</title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengeProvider>
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
