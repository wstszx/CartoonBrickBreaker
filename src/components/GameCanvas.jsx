import React, { useRef, useEffect } from 'react';
import { GAME_CONFIG } from '../config/gameConfig';

const GameCanvas = ({ gameState, onMouseMove }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const render = () => {
      ctx.clearRect(0, 0, GAME_CONFIG.width, GAME_CONFIG.height);

      // Render paddles
      ctx.fillStyle = '#3B82F6';
      ctx.fillRect(
        gameState.topPaddle.x,
        0,
        gameState.topPaddle.width,
        GAME_CONFIG.paddleHeight
      );
      ctx.fillRect(
        gameState.bottomPaddle.x,
        GAME_CONFIG.height - GAME_CONFIG.paddleHeight,
        gameState.bottomPaddle.width,
        GAME_CONFIG.paddleHeight
      );

      // Render bricks
      gameState.bricks.forEach(brick => {
        ctx.fillStyle = brick.color;
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        
        // Add 3D effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(brick.x, brick.y, brick.width, 3);
      });

      // Render balls with gradient
      gameState.balls.forEach(ball => {
        const gradient = ctx.createRadialGradient(
          ball.x, ball.y, 0,
          ball.x, ball.y, GAME_CONFIG.ballRadius
        );
        gradient.addColorStop(0, '#EF4444');
        gradient.addColorStop(1, '#B91C1C');

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, GAME_CONFIG.ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = '#991B1B';
        ctx.stroke();
      });
    };

    render();
  }, [gameState]);

  return (
    <canvas
      ref={canvasRef}
      width={GAME_CONFIG.width}
      height={GAME_CONFIG.height}
      onMouseMove={onMouseMove}
      className="border-4 border-blue-500 rounded-lg shadow-lg"
    />
  );
};

export default GameCanvas;