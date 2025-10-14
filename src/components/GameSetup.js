import { motion } from "framer-motion";
import { User, Minus, Plus } from "lucide-react";

function GameSetup({
  numPlayers,
  numSpies,
  setNumPlayers,
  setNumSpies,
  startGame,
  disabled,
}) {
  const renderIcons = (count, color = "#CA3E47") => (
    <motion.div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "6px",
        marginTop: "8px",
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.1, delay: i * 0.05 }}
        >
          <User size={28} color={color} />
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "1.5rem",
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(20px, 4vw, 26px)",
          fontWeight: "bold",
          marginBottom: "2rem",
        }}
      >
        تنظیمات بازی جاسوس 🕵️‍♂️
      </h1>

      {/* 🔹 تعداد بازیکنان */}
      <div style={boxStyle}>
        <h3 style={{ fontSize: "clamp(16px, 3vw, 20px)" }}>تعداد بازیکنان</h3>
        {renderIcons(numPlayers, "#4CAF50")}
        <div style={buttonRow}>
          <button
            onClick={() => setNumPlayers(Math.max(3, numPlayers - 1))}
            style={circleButton}
          >
            <Minus size={18} />
          </button>
          <span style={{ fontSize: "clamp(16px, 4vw, 20px)", fontWeight: "bold" }}>
            {numPlayers}
          </span>
          <button
            onClick={() => setNumPlayers(Math.min(12, numPlayers + 1))}
            style={circleButton}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* 🔹 تعداد جاسوس‌ها */}
      <div style={boxStyle}>
        <h3 style={{ fontSize: "clamp(16px, 3vw, 20px)" }}>تعداد جاسوس‌ها</h3>
        {renderIcons(numSpies, "#CA3E47")}
        <div style={buttonRow}>
          <button
            onClick={() => setNumSpies(Math.max(1, numSpies - 1))}
            style={circleButton}
          >
            <Minus size={18} />
          </button>
          <span style={{ fontSize: "clamp(16px, 4vw, 20px)", fontWeight: "bold" }}>
            {numSpies}
          </span>
          <button
            onClick={() => setNumSpies(Math.min(numPlayers - 1, numSpies + 1))}
            style={circleButton}
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={startGame}
        disabled={disabled}
        style={buttonStyle}
      >
        🎲 شروع بازی
      </motion.button>
    </div>
  );
}

// 🧊 افکت شیشه‌ای و واکنش‌گرا
const boxStyle = {
  marginBottom: "2rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem 1.5rem",
  borderRadius: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px) saturate(150%)",
  WebkitBackdropFilter: "blur(10px) saturate(150%)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  width: "90%",
  maxWidth: "400px",
};

const buttonRow = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "15px",
  marginTop: "10px",
  flexWrap: "wrap",
};

const circleButton = {
  backgroundColor: "#CA3E47",
  border: "none",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  color: "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "transform 0.2s",
};

const buttonStyle = {
  padding: "12px 24px",
  fontSize: "clamp(14px, 3vw, 18px)",
  cursor: "pointer",
  backgroundColor: "#CA3E47",
  borderRadius: "25px",
  fontWeight: "bold",
  border: "none",
  color: "white",
  marginTop: "1rem",
  width: "80%",
  maxWidth: "250px",
  //drop shadow
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
};



export default GameSetup;
