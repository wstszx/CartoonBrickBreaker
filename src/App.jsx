import React, { useEffect } from 'react';
import GameStats from './components/GameStats';
import GameCanvas from './components/GameCanvas';
import { useGameLogic } from './hooks/useGameLogic';

const App = () => {
  const { gameState, updateGameState, handleMouseMove } = useGameLogic();

  useEffect(() => {
    const gameLoop = setInterval(updateGameState, 16);
    return () => clearInterval(gameLoop);
  }, [updateGameState]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-8">Brick Breaker</h1>
      <GameStats
        lives={gameState.lives}
        score={gameState.score}
        level={gameState.level}
      />
      <GameCanvas
        gameState={gameState}
        onMouseMove={handleMouseMove}
      />
      <p className="mt-4 text-blue-600">Move your mouse to control the paddles</p>
    </div>
  );
};

export default App;