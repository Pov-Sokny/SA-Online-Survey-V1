'use client';

import { useEffect, useState } from 'react';

interface LoadingSpinnerProps {
  variant?: 'pulse' | 'orbit' | 'dots' | 'shimmer' | 'wave' | 'spiral' | 'expanding' | 'gradient-ring' | 'morphing' | 'bounce-rings' | 'scanning' | 'grid';
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function LoadingSpinner({
  variant = 'pulse',
  size = 'md',
  text = 'Loading',
}: LoadingSpinnerProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const dotSize = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {variant === 'pulse' && (
        <style>{`
          @keyframes pulse-ring {
            0%, 100% { transform: scale(0.8); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.5; }
          }
          .pulse-loader {
            animation: pulse-ring 2s ease-in-out infinite;
          }
        `}</style>
      )}

      {variant === 'orbit' && (
        <style>{`
          @keyframes orbit {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes orbit-spin {
            0% { transform: translateX(0) rotate(0deg); }
            100% { transform: translateX(0) rotate(360deg); }
          }
          .orbit-loader {
            animation: orbit 3s linear infinite;
          }
          .orbit-dot {
            animation: orbit-spin 1.5s linear infinite reverse;
          }
        `}</style>
      )}

      {variant === 'dots' && (
        <style>{`
          @keyframes bounce-dots {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-12px); }
          }
          .dot-1 { animation: bounce-dots 1.4s ease-in-out 0s infinite; }
          .dot-2 { animation: bounce-dots 1.4s ease-in-out 0.2s infinite; }
          .dot-3 { animation: bounce-dots 1.4s ease-in-out 0.4s infinite; }
        `}</style>
      )}

      {variant === 'shimmer' && (
        <style>{`
          @keyframes shimmer-flow {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
          }
          .shimmer-loader {
            background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%);
            background-size: 1000px 100%;
            animation: shimmer-flow 2s infinite;
          }
        `}</style>
      )}

      {variant === 'wave' && (
        <style>{`
          @keyframes wave-motion {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .wave-bar-1 { animation: wave-motion 1.2s ease-in-out 0s infinite; }
          .wave-bar-2 { animation: wave-motion 1.2s ease-in-out 0.1s infinite; }
          .wave-bar-3 { animation: wave-motion 1.2s ease-in-out 0.2s infinite; }
          .wave-bar-4 { animation: wave-motion 1.2s ease-in-out 0.3s infinite; }
          .wave-bar-5 { animation: wave-motion 1.2s ease-in-out 0.4s infinite; }
        `}</style>
      )}

      {variant === 'spiral' && (
        <style>{`
          @keyframes spiral-rotate {
            0% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.2); }
            100% { transform: rotate(360deg) scale(1); }
          }
          .spiral-loader {
            animation: spiral-rotate 2.5s ease-in-out infinite;
          }
        `}</style>
      )}

      {variant === 'expanding' && (
        <style>{`
          @keyframes expand-contract {
            0%, 100% { width: 24px; height: 24px; opacity: 1; }
            50% { width: 48px; height: 48px; opacity: 0.5; }
          }
          .expand-loader {
            animation: expand-contract 2s ease-in-out infinite;
          }
        `}</style>
      )}

      {variant === 'gradient-ring' && (
        <style>{`
          @keyframes gradient-spin {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .gradient-ring-loader {
            animation: gradient-spin 3s ease infinite;
            background-size: 200% 200%;
          }
        `}</style>
      )}

      {variant === 'morphing' && (
        <style>{`
          @keyframes morph {
            0%, 100% { border-radius: 50%; transform: scale(1); }
            25% { border-radius: 30%; transform: scale(1.1); }
            50% { border-radius: 50%; transform: scale(1); }
            75% { border-radius: 70%; transform: scale(1.1); }
          }
          .morph-loader {
            animation: morph 2.5s ease-in-out infinite;
          }
        `}</style>
      )}

      {variant === 'bounce-rings' && (
        <style>{`
          @keyframes ring-bounce {
            0%, 100% { transform: scale(0.8); opacity: 0.5; }
            50% { transform: scale(1.2); opacity: 1; }
          }
          .ring-1 { animation: ring-bounce 1.4s ease-in-out 0s infinite; }
          .ring-2 { animation: ring-bounce 1.4s ease-in-out 0.4s infinite; }
          .ring-3 { animation: ring-bounce 1.4s ease-in-out 0.8s infinite; }
        `}</style>
      )}

      {variant === 'scanning' && (
        <style>{`
          @keyframes scan {
            0% { left: 0; }
            100% { left: 100%; }
          }
          .scan-line {
            animation: scan 1.5s ease-in-out infinite;
          }
        `}</style>
      )}

      {variant === 'grid' && (
        <style>{`
          @keyframes grid-pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          .grid-item { animation: grid-pulse 1.2s ease-in-out infinite; }
          .grid-1 { animation-delay: 0s; }
          .grid-2 { animation-delay: 0.1s; }
          .grid-3 { animation-delay: 0.2s; }
          .grid-4 { animation-delay: 0.3s; }
          .grid-5 { animation-delay: 0.4s; }
          .grid-6 { animation-delay: 0.5s; }
          .grid-7 { animation-delay: 0.6s; }
          .grid-8 { animation-delay: 0.7s; }
          .grid-9 { animation-delay: 0.8s; }
        `}</style>
      )}

      {variant === 'pulse' && (
        <div
          className={`${sizeClasses[size]} pulse-loader rounded-full border-2 border-[#00a368] bg-gradient-to-r from-[#00a368] to-[#00d98e]`}
        />
      )}

      {variant === 'orbit' && (
        <div className={`${sizeClasses[size]} relative orbit-loader`}>
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#00a368] border-r-[#00d98e] orbit-dot" />
          <div className="absolute inset-1 rounded-full border border-transparent border-t-[#00a368]/60" />
        </div>
      )}

      {variant === 'dots' && (
        <div className="flex gap-2">
          <div className={`${dotSize[size]} dot-1 rounded-full bg-[#00a368]`} />
          <div className={`${dotSize[size]} dot-2 rounded-full bg-[#00d98e]`} />
          <div className={`${dotSize[size]} dot-3 rounded-full bg-[#00a368]/70`} />
        </div>
      )}

      {variant === 'shimmer' && (
        <div className={`${sizeClasses[size]} shimmer-loader rounded-lg`} style={{
          background: 'linear-gradient(90deg, rgba(0,163,104,0) 0%, rgba(0,163,104,0.3) 50%, rgba(0,163,104,0) 100%)',
        }} />
      )}

      {variant === 'wave' && (
        <div className="flex items-end gap-1">
          <div className="wave-bar-1 w-1.5 h-6 rounded-full bg-[#00a368]" />
          <div className="wave-bar-2 w-1.5 h-8 rounded-full bg-[#00d98e]" />
          <div className="wave-bar-3 w-1.5 h-10 rounded-full bg-[#00a368]" />
          <div className="wave-bar-4 w-1.5 h-8 rounded-full bg-[#00d98e]" />
          <div className="wave-bar-5 w-1.5 h-6 rounded-full bg-[#00a368]" />
        </div>
      )}

      {variant === 'spiral' && (
        <div className={`${sizeClasses[size]} spiral-loader rounded-full border-4 border-transparent border-t-[#00a368] border-r-[#00d98e]`} />
      )}

      {variant === 'expanding' && (
        <div
          className={`expand-loader rounded-lg bg-gradient-to-r from-[#00a368] to-[#00d98e]`}
          style={{ width: '24px', height: '24px' }}
        />
      )}

      {variant === 'gradient-ring' && (
        <div
          className={`${sizeClasses[size]} gradient-ring-loader rounded-full border-4 border-transparent`}
          style={{
            borderImage: 'linear-gradient(45deg, #00a368, #00d98e, #00a368) 1',
            backgroundImage: 'conic-gradient(from 0deg, #00a368, #00d98e, #00a368)',
            WebkitMaskImage: 'radial-gradient(circle, transparent 60%, black 100%)',
            maskImage: 'radial-gradient(circle, transparent 60%, black 100%)',
          }}
        />
      )}

      {variant === 'morphing' && (
        <div className="morph-loader w-12 h-12 bg-gradient-to-r from-[#00a368] to-[#00d98e]" />
      )}

      {variant === 'bounce-rings' && (
        <div className="relative w-16 h-16">
          <div className="ring-1 absolute inset-0 rounded-full border-2 border-[#00a368]" />
          <div className="ring-2 absolute inset-2 rounded-full border-2 border-[#00d98e]" />
          <div className="ring-3 absolute inset-4 rounded-full border-2 border-[#00a368]" />
        </div>
      )}

      {variant === 'scanning' && (
        <div className="relative w-16 h-16 rounded-lg bg-gradient-to-r from-[#00a368]/10 to-[#00d98e]/10 overflow-hidden">
          <div className="scan-line absolute top-0 h-1 w-8 bg-gradient-to-r from-transparent via-[#00a368] to-transparent" />
        </div>
      )}

      {variant === 'grid' && (
        <div className="grid grid-cols-3 gap-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div
              key={i}
              className={`grid-item grid-${i} w-2 h-2 rounded-full bg-[#00a368]`}
            />
          ))}
        </div>
      )}

      {text && <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{text}</p>}
    </div>
  );
}

export function LoadingOverlay({
  isLoading = true,
  variant = 'orbit',
  children,
}: {
  isLoading?: boolean;
  variant?: 'pulse' | 'orbit' | 'dots' | 'shimmer' | 'wave' | 'spiral' | 'expanding' | 'gradient-ring' | 'morphing' | 'bounce-rings' | 'scanning' | 'grid';
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white/80 dark:bg-black/80 backdrop-blur-sm">
          <LoadingSpinner variant={variant} size="md" />
        </div>
      )}
    </div>
  );
}
