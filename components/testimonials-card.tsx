import "@/styles/components/testimonials-card";

import React from 'react';

type Prop = {
  img: string;
  title: string;
  info: string;
};

export const TestimonialsCard: React.FC<Prop> = ({ img, info, title, children }) => (
  <div className="testimonials-card">
    <img
      src={img}
      width="80"
      height="80"
    />
    <p>
      {children}
    </p>
    <h3>
      {title}
    </h3>
    <p>
      {info}
    </p>
  </div>
);
