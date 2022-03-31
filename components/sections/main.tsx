import React from 'react';
import { useTranslation } from 'next-i18next';

import { InstallButton } from 'components/Install-button';


export const MainSection: React.FC = () => {
  const { t } = useTranslation(`main`);

  return (
    <div className="main">
      <div className="background" />
      <div className="wrapper">
        <p>
          {t(`sub_title`)}
        </p>
        <h1>
          {t(`title`)}
        </h1>
        <p>
          {t(`under_title`)}
        </p>
        <InstallButton />
      </div>
    </div>
  );
};

export default MainSection;
