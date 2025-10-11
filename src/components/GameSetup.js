function GameSetup({
  numPlayers,
  numSpies,
  setNumPlayers,
  setNumSpies,
  startGame,
  disabled,
}) {
  return (
    <div style={{ display: "inline-grid" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "2.5rem" }}
      >
        تنظیمات بازی جاسوس
      </h1>

      <div style={boxStyle}>
        <label>
          تعداد بازیکنان:
          <input
            type="number"
            value={numPlayers}
            min="3"
            max="12"
            onChange={(e) => {
              const value = parseInt(e.target.value) || 3;
              setNumPlayers(Math.min(12, Math.max(3, value)));
            }}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </div>

      <div style={boxStyle}>
        <label>
          تعداد جاسوس‌ها:
          <input
            type="number"
            value={numSpies}
            min="1"
            max={numPlayers - 1}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 1;
              setNumSpies(Math.min(numPlayers - 1, Math.max(1, value)));
            }}
            style={{ marginLeft: "10px", padding: "5px" }}
          />
        </label>
      </div>

      <button onClick={startGame} disabled={disabled} style={buttonStyle}>
        شروع بازی
      </button>
    </div>
  );
}

const boxStyle = {
  marginBottom: "2rem",
  border: "1px solid white",
  display: "inline",
  padding: "15px 20px",
  borderRadius: "60px",
  backgroundColor: "#525252",
};

const buttonStyle = {
  padding: "15px 25px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "#CA3E47",
  borderRadius: "25px",
  fontWeight: "bold",
};

export default GameSetup;
