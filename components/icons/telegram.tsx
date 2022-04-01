import React from 'react';


type Prop = {
  width: number | string;
  height: number | string;
  color: string;
  hoverColor?: string;
};

const TelegramIcon: React.FC<Prop> = ({
  width,
  height,
  color,
  hoverColor = 'var(--primary-color)'
}) => {
  const [hoverd, setHover] = React.useState(false);
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0C5.374 0 0 5.372 0 12C0 18.627 5.374 24 12 24C18.627 24 24 18.627 24 12C24 5.372 18.627 0 12 0ZM15.224 17.871C15.412 18.004 15.654 18.037 15.87 17.956C16.085 17.874 16.244 17.689 16.292 17.465C16.799 15.083 18.029 9.053 18.49 6.887C18.525 6.723 18.467 6.553 18.339 6.444C18.21 6.335 18.032 6.304 17.874 6.362C15.428 7.268 7.895 10.094 4.816 11.233C4.621 11.306 4.494 11.493 4.5 11.7C4.507 11.906 4.646 12.085 4.846 12.145C6.227 12.558 8.039 13.133 8.039 13.133C8.039 13.133 8.886 15.691 9.327 16.991C9.383 17.155 9.511 17.283 9.679 17.327C9.848 17.371 10.027 17.325 10.153 17.206C10.862 16.537 11.958 15.502 11.958 15.502C11.958 15.502 14.042 17.029 15.224 17.871V17.871ZM8.801 12.809L9.781 16.04L9.999 13.994C9.999 13.994 13.782 10.581 15.94 8.636C16.003 8.579 16.011 8.483 15.959 8.416C15.907 8.349 15.811 8.333 15.74 8.379C13.24 9.975 8.801 12.809 8.801 12.809V12.809Z"
        fill={hoverd ? hoverColor : color}
      />
    </svg>
  );
};

export default TelegramIcon;
