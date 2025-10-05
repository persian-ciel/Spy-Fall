// src/components/SpyGame/useSpyGameLogic.js
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function useSpyGameLogic() {
  const [allWords, setAllWords] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gameState, setGameState] = useState(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [numPlayers, setNumPlayers] = useState(4);
  const [numSpies, setNumSpies] = useState(1);
  const [roleViewed, setRoleViewed] = useState(false);

  // Load JSON data
  useEffect(() => {
    fetch("/data/Words.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load JSON");
        return res.json();
      })
      .then((data) => {
        setAllWords(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("❌ خطا در بارگذاری داده‌ها!");
      });
  }, []);

  // Start new game
  const startGame = () => {
    if (!allWords || !allWords.locations.length) return;

    if (numPlayers < 3) {
      toast.error("حداقل ۳ بازیکن لازم است!");
      return;
    }
    if (numSpies >= numPlayers) {
      toast.error("تعداد جاسوس‌ها باید کمتر از تعداد بازیکنان باشد!");
      return;
    }

    const randomLocation =
      allWords.locations[Math.floor(Math.random() * allWords.locations.length)];

    const spyIndices = [];
    while (spyIndices.length < numSpies) {
      const index = Math.floor(Math.random() * numPlayers);
      if (!spyIndices.includes(index)) spyIndices.push(index);
    }

    const players = Array(numPlayers)
      .fill(null)
      .map((_, i) => ({
        id: i,
        role: spyIndices.includes(i) ? "جاسوس" : randomLocation,
        revealed: false,
      }));

    setGameState({ location: randomLocation, players, spyIndices });
    setCurrentPlayerIndex(0);
    setRoleViewed(false);
    setGameStarted(true);

    toast.success("🎲 بازی شروع شد!");
  };

  // Confirm viewing role
  const confirmRole = () => {
    const updatedPlayers = [...gameState.players];
    updatedPlayers[currentPlayerIndex].revealed = true;
    setGameState({ ...gameState, players: updatedPlayers });

    if (currentPlayerIndex < updatedPlayers.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setRoleViewed(false);
      toast("👤 نوبت بازیکن بعدی!");
    } else {
      setCurrentPlayerIndex(null);
      setRoleViewed(false);
      toast.success("✅ همه بازیکنان نقش خود را دیدند!");
    }
  };

  // Spy guessing logic
  const handleGuessSpy = (playerId) => {
    const isCorrect = gameState.spyIndices.includes(playerId);

    if (isCorrect) {
      toast.success("🎉 تبریک! شما یک جاسوس را درست حدس زدید!");
    } else {
      toast.error(
        `😈 اشتباه کردید! جاسوس‌ها بازیکنان شماره ${gameState.spyIndices
          .map((i) => i + 1)
          .join(", ")} بودند.`
      );
    }
    setGameStarted(false);
  };

  return {
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
  };
}
