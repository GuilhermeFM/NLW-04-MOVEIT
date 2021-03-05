import { createContext, useEffect, useState } from 'react';

import challenges from '../../challenges.json';
import LevelUpModal from '../components/LevelUpModal';
import axios from 'axios';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengeContextData {
  id: number;
  username: string;
  avatarUrl: string;

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
  id: number;
  username: string;
  avatarUrl: string;

  level: number;
  currentExperience: number;
  challengesCompleted: number;

  children: React.ReactNode;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export default function ChallengeProvider({ children, ...rest }: ChallengeProviderProps) {
  const [id, setId] = useState(rest.id);
  const [username, setUsername] = useState(rest.username);
  const [avatarUrl, setAvatarUrl] = useState(rest.avatarUrl);

  const [level, setLevel] = useState(rest.level);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted);

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

  return (
    <ChallengeContext.Provider
      value={{
        id,
        username,
        avatarUrl,
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
