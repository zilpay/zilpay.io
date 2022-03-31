import "@/styles/components/_apps.scss";

import React from 'react';
import { useTranslation } from 'next-i18next';

import { TeamCard } from 'components/team-card';


export const TeamSection: React.FC = () => {
  const { t } = useTranslation(`main`);
  return (
    <div className="team">
      <div className="header-wrapper">
        <h2>
          Our Team
        </h2>
      </div>
      <div className="wrapper">
        <TeamCard
          img="/images/rinat.webp"
          title={t(`rinat_name`)}
          github="https://github.com/hicaru"
          linkedin="https://www.linkedin.com/in/arc-warden/"
          twitter="https://twitter.com/lich666black"
        >
          {t(`rinat_type`)}
        </TeamCard>
        <TeamCard
          img="/images/hanwen.webp"
          title={t(`han_name`)}
          linkedin="https://www.linkedin.com/in/han-wen-chua/"
          twitter="https://twitter.com/chanwen_"
        >
          {t(`han_type`)}
        </TeamCard>
        <TeamCard
          img="/images/madhav.webp"
          title={t(`madhav_name`)}
          linkedin="https://www.linkedin.com/in/madhavk1698/"
          twitter="https://twitter.com/madhavk1698"
        >
          {t(`madhav_type`)}
        </TeamCard>
      </div>
    </div>
  );
};

export default TeamSection;
