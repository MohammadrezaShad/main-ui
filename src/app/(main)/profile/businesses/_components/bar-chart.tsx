'use client';

import {useEffect, useRef} from 'react';
import {css} from '@styled/css';

export function BarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions with higher resolution for retina displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Sample data - you would replace this with real data
    const data = [
      450, 50, 250, 500, 300, 650, 450, 500, 50, 180, 100, 350, 550, 300, 250, 200, 300, 750, 1000,
      550, 50, 300, 200, 180, 600, 500, 200, 550, 450, 800,
    ];

    const maxValue = Math.max(...data);
    const days = data.length;

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw horizontal dotted lines
    ctx.beginPath();
    ctx.strokeStyle = '#E5E7EB';
    ctx.setLineDash([2, 2]);

    const numLines = 5;
    for (let i = 1; i < numLines; i += 1) {
      const y = rect.height - i * (rect.height / numLines);
      ctx.moveTo(0, y);
      ctx.lineTo(rect.width, y);
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw bars
    const barWidth = (rect.width / days) * 0.6;
    const barSpacing = (rect.width / days) * 0.4;

    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * (rect.height - 40);
      const x = index * (barWidth + barSpacing) + barSpacing / 2;
      const y = rect.height - barHeight - 20;

      // Draw bar
      ctx.fillStyle = '#4BB6E8';
      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw day number
      ctx.fillStyle = '#6B7280';
      ctx.font = '10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText((index + 1).toString(), x + barWidth / 2, rect.height - 5);
    });

    // Draw y-axis labels
    ctx.fillStyle = '#6B7280';
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';

    ctx.fillText('0', 20, rect.height - 5);
    ctx.fillText('200k', 20, rect.height - rect.height / 5 - 5);
    ctx.fillText('400k', 20, rect.height - (2 * rect.height) / 5 - 5);
    ctx.fillText('600k', 20, rect.height - (3 * rect.height) / 5 - 5);
    ctx.fillText('800k', 20, rect.height - (4 * rect.height) / 5 - 5);
    ctx.fillText('1M', 20, 15);
  }, []);

  return (
    <div className={css({w: 'full', h: '250px'})}>
      <canvas
        ref={canvasRef}
        className={css({w: 'full', h: 'full'})}
        style={{width: '100%', height: '100%'}}
      />
    </div>
  );
}
