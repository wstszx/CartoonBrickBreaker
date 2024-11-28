import { useState, useCallback } from 'react';
import { GAME_CONFIG } from '../config/gameConfig';
import { createBall, createBricks } from '../utils/gameUtils';

export const useGameLogic = () => {
  const [gameState, setGameState] = useState({
    topPaddle: {
      x: GAME_CONFIG.width / 2 - GAME_CONFIG.paddleWidth / 2,
      width: GAME_CONFIG.paddleWidth
    },
    bottomPaddle: {
      x: GAME_CONFIG.width / 2 - GAME_CONFIG.paddleWidth / 2,
      width: GAME_CONFIG.paddleWidth
    },
    balls: [createBall()],
    bricks: createBricks(1),
    lives: GAME_CONFIG.initialLives,
    score: 0,
    level: 1
  });

  const updateGameState = useCallback(() => {
    setGameState(prevState => {
      const newState = { ...prevState };
      
      newState.balls = newState.balls.map(ball => {
        let newBall = { ...ball };
        newBall.x += newBall.dx;
        newBall.y += newBall.dy;

        // Wall collision
        if (newBall.x - GAME_CONFIG.ballRadius < 0 || 
            newBall.x + GAME_CONFIG.ballRadius > GAME_CONFIG.width) {
          newBall.dx *= -1;
        }

        // Paddle collision
        const isBottomPaddleCollision = 
          newBall.y + GAME_CONFIG.ballRadius > GAME_CONFIG.height - GAME_CONFIG.paddleHeight &&
          newBall.x > newState.bottomPaddle.x &&
          newBall.x < newState.bottomPaddle.x + newState.bottomPaddle.width;

        const isTopPaddleCollision = 
          newBall.y - GAME_CONFIG.ballRadius < GAME_CONFIG.paddleHeight &&
          newBall.x > newState.topPaddle.x &&
          newBall.x < newState.topPaddle.x + newState.topPaddle.width;

        if (isBottomPaddleCollision || isTopPaddleCollision) {
          newBall.dy *= -1;
        }

        // Brick collision
        newState.bricks = newState.bricks.filter(brick => {
          const isBrickCollision = 
            newBall.x > brick.x &&
            newBall.x < brick.x + brick.width &&
            newBall.y > brick.y &&
            newBall.y < brick.y + brick.height;

          if (isBrickCollision) {
            newBall.dy *= -1;
            brick.health -= 1;
            newState.score += 10;
            return brick.health > 0;
          }
          return true;
        });

        // Level completion check
        if (newState.bricks.length === 0) {
          newState.level += 1;
          newState.bricks = createBricks(newState.level);
          newState.balls = [createBall()];
        }

        return newBall;
      });

      return newState;
    });
  }, []);

  const handleMouseMove = (e) => {
    const canvas = e.target;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    setGameState(prev => ({
      ...prev,
      topPaddle: { ...prev.topPaddle, x: mouseX - prev.topPaddle.width / 2 },
      bottomPaddle: { ...prev.bottomPaddle, x: mouseX - prev.bottomPaddle.width / 2 }
    }));
  };

  return {
    gameState,
    updateGameState,
    handleMouseMove
  };
};