import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContexts';
import styles from '../styles/components/CompletedChallenges.module.css';

export default function CompleteChallenges() {
  const { challengesCompleted } = useContext(ChallengeContext);

  return (
    <div className={styles.completeChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}
