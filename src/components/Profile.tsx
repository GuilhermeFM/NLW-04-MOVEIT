import { useContext } from 'react';
import { AuthenticateContext } from '../contexts/AuthenticateContext';
import { ChallengeContext } from '../contexts/ChallengesContexts';
import styles from '../styles/components/Profile.module.css';

export default function Profile() {
  const { level } = useContext(ChallengeContext);
  const { username, avatarUrl } = useContext(AuthenticateContext);

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
