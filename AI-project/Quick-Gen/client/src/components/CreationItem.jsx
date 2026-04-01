import React, { useState } from "react";
import Markdown from 'react-markdown';

const CreationItem = ({ item }) => {

  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="p-5 max-w-5xl text-sm bg-card-bg border border-border rounded-xl cursor-pointer hover:border-gold/50 hover:shadow-gold-sm transition-all duration-300"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex justify-between items-center gap-4">

        <div>
          <h2 className="font-semibold text-foreground font-display text-lg">{item.prompt}</h2>
          <p className="text-slate mt-1 font-sans">
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>

        <span className="bg-gold/15 border border-gold/30 text-gold px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-gold-sm whitespace-nowrap font-sans">
          {item.type.toUpperCase()}
        </span>

      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-border animate-fade-in">

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