// src/components/SpyGame/SpyGame.jsx
import GameSetup from "./GameSetup";
import RoleReveal from "./RoleReveal";
import GuessPhase from "./GuessPhase";
import useSpyGameLogic from "./useSpyGameLogic";
import { Toaster } from "react-hot-toast";

// 🌀 اضافه کردن لودر
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

  // 🌀 در حال بارگذاری
  if (isLoading)
    return (
      <div
        style={{
          backgroundColor: "#313131",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          color: "white",
          fontFamily: "Vazirmatn, sans-serif",
        }}
      >
        <Grid size="70" speed="1.5" color="#CA3E47" />
        <p style={{ marginTop: "1rem", fontSize: "18px" }}>در حال بارگذاری...</p>
      </div>
    );

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#313131",
        color: "white",
        height: "100vh",
      }}
    >
      {/* 🔔 Toast container */}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff",
            fontFamily: "Vazirmatn, sans-serif",
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
