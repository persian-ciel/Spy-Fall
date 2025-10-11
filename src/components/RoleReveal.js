function RoleReveal({
  currentPlayerIndex,
  player,
  roleViewed,
  setRoleViewed,
  confirmRole,
  totalPlayers,
}) {
  return (
    <div>
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bolder",
          marginBottom: "2.5rem",
        }}
      >
        بازی جاسوس
      </h2>

      <h3
        style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "1.5rem" }}
      >
        بازیکن شماره {currentPlayerIndex + 1}
      </h3>

      {!roleViewed ? (
        <button onClick={() => setRoleViewed(true)} style={buttonStyle}>
          نمایش نقش
        </button>
      ) : (
        <>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "1.5rem",
            }}
          >
            {player.role}
          </p>
          <button onClick={confirmRole} style={buttonStyle}>
            {currentPlayerIndex < totalPlayers - 1
              ? "تأیید و بازیکن بعدی"
              : "پایان نمایش نقش‌ها"}
          </button>
        </>
      )}
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
};

export default RoleReveal;
