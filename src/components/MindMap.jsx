import "../assets/mind-map.css";
import { Box, Card } from '@mantine/core';
import React from 'react';

const MindMapNode = ({ node }) => {
  return (
    <Card withBorder className="mind-map-node">
      <h3>{node.title}</h3>
      <p>{node.description}</p>
      {node.subtopics && node.subtopics.length > 0 && (
        <div className="mind-map-subtopics">
          {node.subtopics.map((subtopic, i) => (
            <MindMapNode key={i} node={subtopic} />
          ))}
        </div>
      )}
    </Card>
  );
};

export default MindMapNode;