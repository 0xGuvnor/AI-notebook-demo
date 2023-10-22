"use client";

import Typewriter from "typewriter-effect";

interface Props {}

const TypewriteTitle = ({}: Props) => {
  return (
    <Typewriter
      options={{ loop: true }}
      onInit={(typewriter) => {
        typewriter
          .typeString("🚀 Supercharge your productivity")
          .pauseFor(1000)
          .deleteAll()
          .typeString("🤖 AI powered insights")
          .start();
      }}
    />
  );
};
export default TypewriteTitle;
