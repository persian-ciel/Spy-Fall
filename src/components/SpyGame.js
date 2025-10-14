import GameSetup from "./GameSetup";
import RoleReveal from "./RoleReveal";
import GuessPhase from "./GuessPhase";
import useSpyGameLogic from "./useSpyGameLogic";
import { Toaster } from "react-hot-toast";
import { Grid } from "ldrs/react";
import "ldrs/react/Grid.css";

function SpyGame() {
  const {
    allWords,
    isLoading,
    gameState,
    currentPlayerIndex,
    gameStarted,
    numPlayers,
    numSpies,
    roleViewed,
    setNumPlayers,
    setNumSpies,
    setRoleViewed,
    startGame,
    confirmRole,
    handleGuessSpy,
  } = useSpyGameLogic();

  if (isLoading)
    return (
      <div
        style={{
          background: "#570303",
          background:
            "linear-gradient(0deg,rgba(87, 3, 3, 1) 0%, rgba(36, 36, 36, 1) 71%)",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "white",
          fontFamily: "Vazirmatn, sans-serif",
        }}
      >
        <Grid size="70" speed="1.5" color="#ffffff" />
        <p style={{ marginTop: "1rem", fontSize: "18px" }}>
          ... در حال بارگذاری
        </p>
      </div>
    );

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        background: "#570303",
        background:
          "linear-gradient(0deg,rgba(87, 3, 3, 1) 0%, rgba(36, 36, 36, 1) 71%)",
        color: "white",
        height: "100vh",
      }}
    >
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        gutter={8} // فاصله بین toastها
        containerStyle={{ zIndex: 9999 }}
        toastOptions={{
          duration: 3000, // هر toast ۳ ثانیه نمایش داده شود
          style: {
            fontFamily: "Vazirmatn, sans-serif",
            fontWeight: "bold",
            borderRadius: "12px",
            padding: "12px 20px",
            fontSize: "16px",
            color: "#fff",
            boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
            background: "#333",
            transition: "all 0.3s ease",
          },
          success: {
            style: { background: "#4caf50" }, // سبز برای موفقیت
          },
          error: {
            style: { background: "#f44336" }, // قرمز برای خطا
          },
          loading: {
            style: { background: "#2196f3" }, // آبی برای اطلاع‌رسانی
          },
        }}
      />

      {!gameStarted ? (
        <GameSetup
          numPlayers={numPlayers}
          numSpies={numSpies}
          setNumPlayers={setNumPlayers}
          setNumSpies={setNumSpies}
          startGame={startGame}
          disabled={!allWords}
        />
      ) : currentPlayerIndex !== null ? (
        <RoleReveal
          currentPlayerIndex={currentPlayerIndex}
          player={gameState.players[currentPlayerIndex]}
          roleViewed={roleViewed}
          setRoleViewed={setRoleViewed}
          confirmRole={confirmRole}
          totalPlayers={gameState.players.length}
        />
      ) : (
        <GuessPhase
          players={gameState.players}
          handleGuessSpy={handleGuessSpy}
        />
      )}
    </div>
  );
}

export default SpyGame;
