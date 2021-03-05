import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContexts';
import styles from '../styles/components/Profile.module.css';

export default function Profile() {
  const { username, avatarUrl, level } = useContext(ChallengeContext);

  return (
    <div className={styles.profileContainer}>
      <img src={avatarUrl} alt="Guilherme F Meira" />
      <div>
        <strong>{username}</strong>

        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
}
