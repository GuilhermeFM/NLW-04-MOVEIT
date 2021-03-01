import { createContext, useContext, useEffect, useState } from 'react';

import challenges from '../../challenges.json';
import LevelUpModal from '../components/LevelUpModal';
import { AuthenticateContext } from './AuthenticateContext';
import axios from 'axios';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengeContextData {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  challengesCompleted: number;
  activeChallenge: Challenge;

  closeLevelUpModal(): void;
  startNewChallenge(): void;
  resetChallenge(): void;
  completeChallenge(): Promise<void>;
}

interface ChallengeProviderProps {
  children: React.ReactNode;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export default function ChallengeProvider({
  children,
}: ChallengeProviderProps) {
  const { id } = useContext(AuthenticateContext);

  const [level, setLevel] = useState(0);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();
    if (Notification.permission === 'granted') {
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount} xp`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  async function completeChallenge() {
    if (!activeChallenge) return;

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;

      setLevel(level + 1);
      setIsLevelUpModalOpen(true);
    }

    setActiveChallenge(null);
    setCurrentExperience(finalExperience);
    setChallengesCompleted(challengesCompleted + 1);

    await axios.post('/api/users/update', {
      id,
      info: {
        level: level + 1,
        currentExperience: finalExperience,
        challengesCompleted: challengesCompleted + 1,
      },
    });
  }

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      const { data } = await axios.get('/api/users/fetch', { params: { id } });
      const { level, currentExperience, challengesCompleted } = data;

      setLevel(level);
      setCurrentExperience(currentExperience);
      setChallengesCompleted(challengesCompleted);
    };

    fetchUser();
  }, [id]);

  return (
    <ChallengeContext.Provider
      value={{
        level,
        currentExperience,
        experienceToNextLevel,
        challengesCompleted,
        activeChallenge,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengeContext.Provider>
  );
}
