import React from 'react';

// Extensions
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescriptionPart extends CoursePartBase {
  description: string
}

// Differences
interface CourseNormalPart extends CourseDescriptionPart {
  type: "normal";
}

interface CourseSpecialPart extends CourseDescriptionPart {
  type: "special"
  requirements: string[],
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescriptionPart {
  type: "submission"; // Type identifier
  exerciseSubmissionLink: string; // The additional field
}

// Union
type CoursePart = CourseSpecialPart | CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

// Props
interface ContentProps {
  courseParts: CoursePart[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: CoursePart): JSX.Element => {
  switch (props.type) {
    case "normal":
      return <>{props.description}</>
    case "groupProject":
      return <>project exercises {props.groupProjectCount}</>
    case "submission":
      return <>
        <div>description {props.description}</div>
        <div>submit to {props.exerciseSubmissionLink}</div>
      </>
    case "special":
      return <>
        <div>{props.description}</div>
        <div>requirements: {props.requirements[0]}, {props.requirements[1]}</div>
      </>
    default:
      return assertNever(props)
  }
}

const Content = ({courseParts}: ContentProps): JSX.Element => {
 return (
    <>
      {
        courseParts.map( coursePart => <div key={coursePart.name}>
          <div><b>{coursePart.name} {coursePart.exerciseCount}</b></div>
          <Part {...coursePart}/>
        </div>)
      }
    </>
  );
};

export default Content;