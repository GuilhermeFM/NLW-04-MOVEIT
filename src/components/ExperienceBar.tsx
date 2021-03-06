import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContexts';

export default function ExperienceBar() {
  const { currentExperience, experienceToNextLevel } = useContext(ChallengeContext);
  const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;

  return (
    <header className="experience-bar">
      <span className="experience-bar-min-exp">0xp</span>
      <div className="experience-bar-meter">
        <div className="experience-bar-meter-overlay" style={{ width: `${percentToNextLevel}%` }} />
        <span className="experience-bar-current-exp" style={{ left: `${percentToNextLevel}%` }}>
          {currentExperience} xp
        </span>
      </div>
      <span className="experience-bar-max-exp">{experienceToNextLevel} xp</span>
    </header>
  );
}
