import React, { useState } from 'react'; // Import useState

const AuthImagePattern = ({ title, subtitle }) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  return (
    <div style={{ 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(45deg, #8B5CF6, #F9A8D4,)',
      padding: '3rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: `repeating-linear-gradient(
          30deg,
          rgba(255,255,255,0.05) 0px,
          rgba(255,255,255,0.05) 20px,
          transparent 20px,
          transparent 40px
        )`,
        animation: 'rotate 20s linear infinite',
      }}/>
      
      <div style={{ maxWidth: '480px', textAlign: 'center', position: 'relative' }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1rem',
          marginBottom: '2.5rem'
        }}>
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(-1)}
              style={{
                aspectRatio: '1/1',
                background: `rgba(255,255,255,${i % 2 === 0 ? 0.1 : 0.15})`,
                borderRadius: '16px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: hoveredIndex === i ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                boxShadow: hoveredIndex === i ? 
                  '0 8px 32px rgba(99, 102, 241, 0.4)' : 
                  '0 4px 24px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.1)'
              }}
            />
          ))}
        </div>

        <h2 style={{
          background: 'linear-gradient(45deg, #fff, #e0e0e0)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          fontSize: '2.5rem',
          fontWeight: '800',
          lineHeight: '1.2',
          marginBottom: '1.5rem',
          textShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          {title}
        </h2>

        <p style={{
          color: 'rgba(255,255,255,0.9)',
          fontSize: '1.125rem',
          lineHeight: '1.6',
          margin: '0 auto',
          maxWidth: '400px',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}>
          {subtitle}
        </p>
      </div>

      {/* Add global styles for animation */}
      <style>{`
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AuthImagePattern;