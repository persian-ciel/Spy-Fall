function GuessPhase({ players, handleGuessSpy }) {
  return (
    <div>
      <h3>همه بازیکنان نقش خود را دیده‌اند ✅</h3>
      <h3>حدس بزنید جاسوس کیست!</h3>
      <div style={{ marginTop: "20px" }}>
        {players.map((player) => (
          <button
            key={player.id}
            onClick={() => handleGuessSpy(player.id)}
            style={buttonStyle}
          >
            بازیکن شماره {player.id + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  margin: "5px",
  backgroundColor: "#CA3E47",
  borderRadius: "25px",
  fontWeight: "bold",
  cursor: "pointer",

};

export default GuessPhase;
