import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function RoleReveal({
  currentPlayerIndex,
  player,
  roleViewed,
  setRoleViewed,
  confirmRole,
  totalPlayers,
}) {
  const [showNextMessage, setShowNextMessage] = useState(false);

  const handleConfirm = () => {
    // اگر آخرین نفر نیست پیام بده به نفر بعدی را نشان بده
    if (currentPlayerIndex < totalPlayers - 1) {
      setShowNextMessage(true);
      setTimeout(() => {
        setShowNextMessage(false);
        confirmRole();
      }, 1500);
    } else {
      // آخرین نفر، مستقیم نقش بعدی / پایان نمایش نقش‌ها
      confirmRole();
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bolder",
          marginBottom: "2.5rem",
        }}
      >
        بازی جاسوس 🕵️‍♂️
      </h2>

      <h3
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "1.5rem",
        }}
      >
        بازیکن شماره {currentPlayerIndex + 1}
      </h3>

      <AnimatePresence mode="wait">
        {!roleViewed ? (
          <motion.button
            key="show-role"
            onClick={() => setRoleViewed(true)}
            style={buttonStyle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            نمایش نقش
          </motion.button>
        ) : showNextMessage ? (
          <motion.p
            key="next-player"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: "20px", fontWeight: "bold", color: "#CA3E47" }}
          >
             ... بده به بازیکن بعدی 🎭 
          </motion.p>
        ) : (
          <motion.div
            key="role-view"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "1.5rem",
              }}
            >
              {player.role}
            </p>
            <button onClick={handleConfirm} style={buttonStyle}>
              {currentPlayerIndex < totalPlayers - 1
                ? "تأیید و بازیکن بعدی"
                : "پایان نمایش نقش‌ها"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#CA3E47",
  borderRadius: "25px",
  fontWeight: "bold",
  marginTop: "10px",
  border: "none",
  color: "white",
  cursor: "pointer",
};

export default RoleReveal;
