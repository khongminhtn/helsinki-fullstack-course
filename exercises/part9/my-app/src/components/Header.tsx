import React from 'react'

interface HeaderProps {
  title: string
}

const Header = ({title} : HeaderProps): JSX.Element => {
  return(
    <h1>
      {title}
    </h1>
  );
};

export default Header;