import React from 'react';
import { Heart, Star, Zap } from 'lucide-react';

const GameStats = ({ lives, score, level }) => {
  return (
    <div className="flex space-x-8 mb-4 text-lg font-semibold">
      <div className="flex items-center gap-2">
        <Heart className="text-red-500" />
        <span>{lives}</span>
      </div>
      <div className="flex items-center gap-2">
        <Star className="text-yellow-500" />
        <span>{score}</span>
      </div>
      <div className="flex items-center gap-2">
        <Zap className="text-blue-500" />
        <span>Level {level}</span>
      </div>
    </div>
  );
};

export default GameStats;