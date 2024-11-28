import { GAME_CONFIG } from '../config/gameConfig';

export const createBall = () => ({
  x: GAME_CONFIG.width / 2,
  y: GAME_CONFIG.height / 2,
  dx: Math.random() * 4 - 2,
  dy: Math.random() > 0.5 ? GAME_CONFIG.baseSpeed : -GAME_CONFIG.baseSpeed
});

export const createBricks = (level) => {
  const startY = (GAME_CONFIG.height - GAME_CONFIG.brickAreaHeight) / 2;
  return Array.from({ length: GAME_CONFIG.brickRows }, (_, rowIndex) => 
    Array.from({ length: GAME_CONFIG.brickCols }, (_, colIndex) => ({
      x: colIndex * (GAME_CONFIG.width / GAME_CONFIG.brickCols),
      y: startY + rowIndex * 30,
      width: GAME_CONFIG.width / GAME_CONFIG.brickCols - 2,
      height: 25,
      health: Math.ceil(Math.random() * level),
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    }))
  ).flat();
};