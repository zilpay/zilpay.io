import "@/styles/components/team-card";

import React from 'react';
import dynamic from 'next/dynamic';


const GitHubIcon = dynamic(import(`components/icons/github`));
const TwitterIcon = dynamic(import(`components/icons/twitter`));
const LinkedinIcon = dynamic(import(`components/icons/linkedin`));


type Prop = {
  img: string;
  title: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
};

export const TeamCard: React.FC<Prop> = ({
  img,
  title,
  children,
  github,
  linkedin,
  twitter
}) => (
    <div className="team-card">
      <img
        src={img}
        width="200"
        height="200"
      />
      <h3>
        {title}
      </h3>
      <p>
        {children}
      </p>
      <span />
      <div className="wrapper">
        {github ? (
          <a
            href={github}
            target="_blank" rel="noreferrer"
          >
            <GitHubIcon
              color="var(--hover-color)"
              height="15"
              width="15"
            />
          </a>
        ) : null}
        {linkedin ? (
          <a
            href={linkedin}
            target="_blank" rel="noreferrer"
          >
            <LinkedinIcon
              color="var(--hover-color)"
              height="15"
              width="15"
            />
          </a>
        ) : null}
        {twitter ? (
          <a
            href={twitter}
            target="_blank" rel="noreferrer"
          >
            <TwitterIcon
              color="var(--hover-color)"
              height="15"
              width="15"
            />
          </a>
        ) : null}
      </div>
    </div>
  );
