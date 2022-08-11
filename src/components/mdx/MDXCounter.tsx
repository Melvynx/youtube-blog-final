import { useState } from 'react';

export const MDXCounter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button
        className="inline-block px-8 py-3 text-sm font-medium text-white transition bg-indigo-600 rounded hover:scale-110 hover:shadow-xl active:bg-indigo-500 focus:outline-none focus:ring"
        onClick={() => {
          setCount(count + 1);
        }}
      >
        {count}
      </button>
    </div>
  );
};
