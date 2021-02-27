import { createContext, useState, useContext, useEffect } from 'react';
import { ChallengeContext } from './ChallengesContexts';

interface CountdownContextData {
  minutes: number;
  seconds: number;
  isActive: boolean;
  hasFinished: boolean;

  startCountdown(): void;
  resetCountdown(): void;
}

interface CountdownProviderProps {
  children: React.ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export default function CountdownProvider({
  children,
}: CountdownProviderProps) {
  const { startNewChallenge } = useContext(ChallengeContext);

  const [time, setTime] = useState(30 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
    setHasFinished(false);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => setTime(time - 1), 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        isActive,
        hasFinished,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
