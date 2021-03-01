import { GetServerSideProps } from 'next';
import Head from 'next/head';
import axios from 'axios';

import CountdownProvider from '../contexts/CountdownContexts';
import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import CompletedChallenges from '../components/CompletedChallenges';
import ChallengeBox from '../components/ChallengeBox';
import Countdown from '../components/Countdown';

import styles from '../styles/pages/Home.module.css';
import ChallengeProvider from '../contexts/ChallengesContexts';

export default function Home() {
  return (
    <ChallengeProvider>
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
