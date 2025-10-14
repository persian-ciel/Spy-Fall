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
  const [usedLocations, setUsedLocations] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const MAX_WRONG_GUESSES = 3;

  useEffect(() => {
    let loaded = false;
    let timerDone = false;
    const LOADING_DELAY = 2000;

    const timer = setTimeout(() => {
      timerDone = true;
      if (loaded) setIsLoading(false);
    }, LOADING_DELAY);

    fetch("/data/Words.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load JSON");
        return res.json();
      })
      .then((data) => {
        setAllWords(data);
        loaded = true;
        if (timerDone) setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.dismiss();
        toast.error("❌ خطا در بارگذاری داده‌ها!");
        setIsLoading(false);
      });

    return () => clearTimeout(timer);
  }, []);

  const startGame = () => {
    if (!allWords || !allWords.locations?.length) return;

    if (numPlayers < 3) {
      toast.dismiss();
      toast.error("حداقل ۳ بازیکن لازم است!");
      return;
    }
    if (numSpies >= numPlayers) {
      toast.dismiss();
      toast.error("تعداد جاسوس‌ها باید کمتر از تعداد بازیکنان باشد!");
      return;
    }

    const availableLocations = allWords.locations.filter(
      (loc) => !usedLocations.includes(loc)
    );

    let chosenLocation;
    if (availableLocations.length === 0) {
      setUsedLocations([]);
      chosenLocation =
        allWords.locations[
          Math.floor(Math.random() * allWords.locations.length)
        ];
    } else {
      chosenLocation =
        availableLocations[Math.floor(Math.random() * availableLocations.length)];
      setUsedLocations([...usedLocations, chosenLocation]);
    }

    const spyIndices = [];
    while (spyIndices.length < numSpies) {
      const index = Math.floor(Math.random() * numPlayers);
      if (!spyIndices.includes(index)) spyIndices.push(index);
    }

    const players = Array(numPlayers)
      .fill(null)
      .map((_, i) => ({
        id: i,
        role: spyIndices.includes(i) ? "جاسوس" : chosenLocation,
        revealed: false,
        guessed: false,
      }));

    setGameState({ location: chosenLocation, players, spyIndices });
    setCurrentPlayerIndex(0);
    setRoleViewed(false);
    setGameStarted(true);
    setWrongGuesses(0);

    toast.dismiss();
    toast.success("🎲 بازی شروع شد!");
  };

  const confirmRole = () => {
    const updatedPlayers = [...gameState.players];
    updatedPlayers[currentPlayerIndex].revealed = true;
    setGameState({ ...gameState, players: updatedPlayers });

    if (currentPlayerIndex < updatedPlayers.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setRoleViewed(false);
      toast.dismiss();
      toast("👤 نوبت بازیکن بعدی!");
    } else {
      setCurrentPlayerIndex(null);
      setRoleViewed(false);
      toast.dismiss();
      toast.success("✅ همه بازیکنان نقش خود را دیدند!");
    }
  };

  const handleGuessSpy = (playerId) => {
    if (!gameState) return;

    const updatedPlayers = [...gameState.players];
    const player = updatedPlayers[playerId];

    toast.dismiss();

    if (player.role !== "جاسوس") {
      toast.error("😈 اشتباه! این بازیکن جاسوس نیست.");
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);

      if (newWrongGuesses >= MAX_WRONG_GUESSES) {
        toast.error("💀 جاسوس برنده شد! بازیکنان نتوانستند جاسوس را پیدا کنند.");
        setGameStarted(false);

        const spies = updatedPlayers
          .filter((p) => p.role === "جاسوس")
          .map((p) => `بازیکن شماره ${p.id + 1}`);
        toast.success(`🕵️‍♂️ جاسوس‌ها: ${spies.join(", ")}`);
      }
      return;
    }

    if (player.guessed) {
      toast("⚠️ این جاسوس قبلاً حدس زده شده است!");
      return;
    }

    player.guessed = true;
    setGameState({ ...gameState, players: updatedPlayers });
    toast.success(`🎉 جاسوس شماره ${playerId + 1} حدس زده شد!`);

    const allSpiesGuessed = updatedPlayers
      .filter((p) => p.role === "جاسوس")
      .every((p) => p.guessed);

    if (allSpiesGuessed) {
      toast.success("✅ همه جاسوس‌ها حدس زده شدند! بازیکنان برنده شدند.");
      setGameStarted(false);

      // فقط اینجا کلمه اصلی رو نشون میده
      toast.success(`📌 کلمه اصلی: "${gameState.location}"`);
    }
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
