import "@/styles/components/_apps.scss";

import React from 'react';
import { useTranslation } from 'next-i18next';

import { TestimonialsCard } from 'components/testimonials-card';


export const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation(`main`);
  return (
    <div className="testimonials">
      <div className="header-wrapper">
        <h2>
          {t(`testimonials_title`)}
        </h2>
      </div>
      <div className="wrapper">
        <TestimonialsCard
          img="/images/hanwen.webp"
          title={t(`testimonials_title0`)}
          info={t(`testimonials_sub_title0`)}
        >
          {t(`testimonials_info0`)}
        </TestimonialsCard>
        <TestimonialsCard
          img="/images/amrit.webp"
          title={t(`testimonials_title1`)}
          info={t(`testimonials_sub_title1`)}
        >
          {t(`testimonials_info1`)}
        </TestimonialsCard>
      </div>
    </div>
  );
};

export default TestimonialsSection;
