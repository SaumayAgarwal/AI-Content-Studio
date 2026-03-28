import React, { useState } from "react";
import Markdown from 'react-markdown';

const CreationItem = ({ item }) => {

  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="p-5 max-w-5xl text-sm glass-card cursor-pointer hover:border-neonPurple/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] transition-all duration-300"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex justify-between items-center gap-4">

        <div>
          <h2 className="font-semibold text-gray-100 text-lg">{item.prompt}</h2>
          <p className="text-gray-400 mt-1">
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>

        <span className="bg-neonBlue/10 border border-neonBlue/30 text-neonBlue px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-[0_0_10px_rgba(59,130,246,0.2)] whitespace-nowrap">
          {item.type.toUpperCase()}
        </span>

      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-white/10 animate-fade-in">

          {item.type === "image" ? (

            <img
              src={item.content}
              alt="Generated"
              className="w-full max-w-md rounded-xl shadow-lg border border-white/5"
            />

          ) : (
            <div className='max-h-96 overflow-y-auto pr-2'>
              <div className='prose-dark'>
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default CreationItem;