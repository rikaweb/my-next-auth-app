// TestA11y.tsx
import React from "react";

const TestA11y: React.FC = () => {
  return (
    <div>
      <img src="example.jpg" />
      <div role="button">Click me</div>
      <a href="#" onClick={() => console.log("clicked")}>
        Link
      </a>
    </div>
  );
};

export default TestA11y;
