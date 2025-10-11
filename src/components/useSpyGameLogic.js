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
        guessed: false, // ← اضافه شد
      }));

    setGameState({ location: randomLocation, players, spyIndices });
    setCurrentPlayerIndex(0);
    setRoleViewed(false);
    setGameStarted(true);

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
    const updatedPlayers = [...gameState.players];
    const player = updatedPlayers[playerId];

    // حذف همه toastهای قبلی قبل از نمایش جدید
    toast.dismiss();

    if (player.role !== "جاسوس") {
      toast.error("😈 اشتباه! این بازیکن جاسوس نیست.");
      return;
    }

    if (player.guessed) {
      toast("⚠️ این جاسوس قبلاً حدس زده شده است!");
      return;
    }

    // علامت‌گذاری جاسوس حدس زده شده
    player.guessed = true;
    setGameState({ ...gameState, players: updatedPlayers });

    toast.success(`🎉 جاسوس شماره ${playerId + 1} حدس زده شد!`);

    // بررسی اینکه آیا تمام جاسوس‌ها حدس زده شدند
    const allSpiesGuessed = updatedPlayers
      .filter((p) => p.role === "جاسوس")
      .every((p) => p.guessed);

    if (allSpiesGuessed) {
      toast.success("✅ همه جاسوس‌ها حدس زده شدند! بازی تمام شد.");
      setGameStarted(false);
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
