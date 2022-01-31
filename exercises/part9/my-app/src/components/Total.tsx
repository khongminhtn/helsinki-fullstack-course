import React from 'react'

interface CoursePart {
  name: string,
  exerciseCount: number
}

interface TotalProps {
  courseParts: CoursePart[];
}

const Total = ({courseParts}: TotalProps): JSX.Element => {
  return(
    <>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </>
  );
};

export default Total;