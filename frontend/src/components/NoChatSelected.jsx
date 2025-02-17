import { useEffect, useState } from "react";

// Single water drop component
const WaterDrop = ({ left, delay }) => {
  return (
    <div
      style={{ left, animationDelay: `${delay}s` }}
      className="water-drop"
    />
  );
};

// Spawns water drops periodically
const WaterDrops = () => {
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newDrop = {
        id: Date.now(),
        // Random horizontal position (ensuring some padding from the edges)
        left: `${Math.random() * 80 + 10}%`
      };
      setDrops((prev) => [...prev, newDrop]);
      // Remove the drop after its animation ends (4s)
      setTimeout(() => {
        setDrops((prev) => prev.filter((drop) => drop.id !== newDrop.id));
      }, 4000);
    }, 1500); // Create a new drop every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {drops.map((drop) => (
        <WaterDrop key={drop.id} left={drop.left} delay={0} />
      ))}
    </>
  );
};

// Realistic Candle component with burning flame animation
const Candle = () => {
  return (
    <div className="candle-container">
      <div className="candle">
        {/* Flame */}
        <div className="flame">
          <div className="flame-flicker"></div>
        </div>
        {/* Wick */}
        <div className="wick"></div>
        {/* Candle Body */}
        <div className="wax"></div>
      </div>
    </div>
  );
};

const NoChatSelected = () => {
  return (
    // Set the container to "relative" and "overflow-hidden" so drops stay within
    <div className="w-full relative flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50 overflow-hidden">
      <div className="max-w-md text-center space-y-6 z-10">
        {/* Candle Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
              <Candle />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to T-CHAT!</h2>
        <p className="text-base-content/60">start chatting</p>
      </div>

      {/* Water drop animations overlaid in the background */}
      <WaterDrops />
    </div>
  );
};

export default NoChatSelected;