import React, { useEffect, useState } from 'react';

const TextAnimation = ({ children, onEnd }) => {
  const [text, setText] = useState("");
  let index = 0;

  useEffect(() => {
    setText("");
    const intervalId = setInterval(() => {
      if (index < children.length) {
        let nextChar = children[index];
        if (nextChar === "\n") {
          nextChar = "<br/>";
        } else if (nextChar === "'") {
          nextChar = "&#39;";
        }
        setText((prevText) => prevText + nextChar);
        index++;
      } else {
        if (onEnd) {
          onEnd();
        }
        clearInterval(intervalId);
      }
    }, 10);

    return () => clearInterval(intervalId);
  }, [children]);

  return <div className="typewriter-text" dangerouslySetInnerHTML={{ __html: text }} />;
};

export default TextAnimation;
