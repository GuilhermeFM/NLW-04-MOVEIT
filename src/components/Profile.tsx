import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContexts';
import styles from '../styles/components/Profile.module.css';

export default function Profile() {
  const { level } = useContext(ChallengeContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https:github.com/GuilhermeFM.png" alt="Guilherme F Meira" />
      <div>
        <strong>Guilherme Frizzera Meira</strong>

        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
