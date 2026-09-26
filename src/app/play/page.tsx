"use client";

import { DivisionId, Challenge, Division } from "../../data/types";
import { DIVISIONS } from "../../data";

import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";

type PlayerProfile = {
  name: string;
  email: string;
  guest: boolean;
};

type PlayerPosition = {
  x: number;
  y: number;
};

type PlayerDirection = "down" | "left" | "right" | "up";

type SpriteFrameProps = {
  src: string;
  frameWidth: number;
  frameHeight: number;
  totalFrames?: number;
  frame?: number;
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};

function SpriteFrame({
  src,
  frameWidth,
  frameHeight,
  totalFrames = 1,
  frame = 0,
  scale = 2,
  className = "",
  style,
  ariaLabel,
}: SpriteFrameProps) {
  const safeFrame = ((frame % totalFrames) + totalFrames) % totalFrames;
  const width = frameWidth * scale;
  const height = frameHeight * scale;

  return (
    <div
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
      className={`select-none pointer-events-none ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundImage: `url('${src}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: `${frameWidth * totalFrames * scale}px ${height}px`,
        backgroundPosition: `-${safeFrame * width}px 0px`,
        imageRendering: "pixelated",
        ...style,
      }}
    />
  );
}
type SavedProgress = {
  divisionId: DivisionId | null;
  sessionEnergy: number;
  completedSessions: number;
  sessionActive: boolean;
  sessionSecondsLeft: number;
  challengeIndex: number;
  skill: number;

  reputation: number;
  pantryUsedToday: boolean;
  storySeen: boolean;
  currentDay?: number;
  lastEnergyDate?: string;
  correctMultipleChoiceCount?: number;
  passedWrittenCount?: number;
};

const MAX_SESSION_ENERGY = 3;
const SESSION_DURATION_SECONDS = 420; // 7 menit per sesi sesuai desain

const MAYA_POSITION = { x: 275, y: 245 };
const DESK_POSITION = { x: 750, y: 330 };
const PANTRY_POSITION = { x: 500, y: 235 };
const INTERACTION_DISTANCE = 125;

function getTodayDateKey() {
  return new Date().toISOString().slice(0, 10);
}
function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function PlayPage() {
  const router = useRouter();

  const [player, setPlayer] = useState<PlayerProfile | null>(null);
  const [position, setPosition] = useState<PlayerPosition>({
    x: 120,
    y: 360,
  });
  const [direction, setDirection] = useState<PlayerDirection>("down");
  const [isMoving, setIsMoving] = useState(false);
  const [animTick, setAnimTick] = useState(0);

  const [divisionId, setDivisionId] = useState<DivisionId | null>(null);
  const [sessionEnergy, setSessionEnergy] = useState(MAX_SESSION_ENERGY);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionSecondsLeft, setSessionSecondsLeft] = useState(
    SESSION_DURATION_SECONDS,
  );
  const [challengeIndex, setChallengeIndex] = useState(0);

  const [skill, setSkill] = useState(0);

  const [reputation, setReputation] = useState(0);
  const [pantryUsedToday, setPantryUsedToday] = useState(false);
  const [storySeen, setStorySeen] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [lastEnergyDate, setLastEnergyDate] = useState(getTodayDateKey());
  const [correctMultipleChoiceCount, setCorrectMultipleChoiceCount] =
    useState(0);
  const [passedWrittenCount, setPassedWrittenCount] = useState(0);

  const [nearTarget, setNearTarget] = useState<
    "maya" | "desk" | "pantry" | null
  >(null);

  const [showStoryModal, setShowStoryModal] = useState(false);
  const [storyLines, setStoryLines] = useState<string[]>([]);
  const [storyIndex, setStoryIndex] = useState(0);

  const [showDivisionModal, setShowDivisionModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [writtenAnswer, setWrittenAnswer] = useState("");
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackBody, setFeedbackBody] = useState("");
  const [feedbackTip, setFeedbackTip] = useState("");
  const [feedbackExample, setFeedbackExample] = useState("");


  const mobileMoveInterval = useRef<number | null>(null);

  const startMobileMove = (dir: string) => {
    if (mobileMoveInterval.current) return;
    
    const step = () => {
      const speed = 14;
      let moveX = 0;
      let moveY = 0;
      let nextDirection: PlayerDirection | null = null;

      if (dir === "w") {
        moveY = -speed;
        nextDirection = "up";
      } else if (dir === "s") {
        moveY = speed;
        nextDirection = "down";
      } else if (dir === "a") {
        moveX = -speed;
        nextDirection = "left";
      } else if (dir === "d") {
        moveX = speed;
        nextDirection = "right";
      }

      if (nextDirection) {
        setDirection(nextDirection);
      }
      setIsMoving(true);

      setPosition((current) => ({
        x: Math.max(20, Math.min(900, current.x + moveX)),
        y: Math.max(20, Math.min(470, current.y + moveY)),
      }));
    };
    
    step();
    mobileMoveInterval.current = window.setInterval(step, 50);
  };

  const stopMobileMove = () => {
    if (mobileMoveInterval.current) {
      window.clearInterval(mobileMoveInterval.current);
      mobileMoveInterval.current = null;
    }
    setIsMoving(false);
  };

  const [notice, setNotice] = useState(
    "Dekati Maya di lobby untuk memulai orientasi.",
  );

  const selectedDivision = useMemo(
    () => DIVISIONS.find((division) => division.id === divisionId) ?? null,
    [divisionId],
  );

  const currentSession =
    selectedDivision?.sessions[Math.min(completedSessions, 20)] ?? null;

  const currentChallenge =
    currentSession?.challenges[Math.min(challengeIndex, 2)] ?? null;

  function buildProgress(
    overrides: Partial<SavedProgress> = {},
  ): SavedProgress {
    return {
      divisionId,
      sessionEnergy,
      completedSessions,
      sessionActive,
      sessionSecondsLeft,
      challengeIndex,
      skill,
      reputation,
      pantryUsedToday,
      storySeen,
      currentDay,
      lastEnergyDate,
      correctMultipleChoiceCount,
      passedWrittenCount,
      ...overrides,
    };
  }

  function saveProgress(overrides: Partial<SavedProgress> = {}) {
    localStorage.setItem(
      "magangsim-session-progress",
      JSON.stringify(buildProgress(overrides)),
    );
  }

  function resetSessionForNewDay() {
    setPantryUsedToday(false);
  }

  useEffect(() => {
    const savedPlayer = localStorage.getItem("magangsim-player");

    if (!savedPlayer) {
      router.replace("/");
      return;
    }

    setPlayer(JSON.parse(savedPlayer) as PlayerProfile);

    const savedProgress = localStorage.getItem("magangsim-session-progress");

    if (!savedProgress) {
      return;
    }

    const progress = JSON.parse(savedProgress) as Partial<SavedProgress>;
    const todayKey = getTodayDateKey();
    const isNewCalendarDay =
      Boolean(progress.lastEnergyDate) && progress.lastEnergyDate !== todayKey;

    if (
      progress.divisionId &&
      DIVISIONS.some((division) => division.id === progress.divisionId)
    ) {
      setDivisionId(progress.divisionId);
    }

    const loadedDay = (progress.currentDay ?? 1) + (isNewCalendarDay ? 1 : 0);
    const loadedSessionEnergy = isNewCalendarDay
      ? MAX_SESSION_ENERGY
      : (progress.sessionEnergy ?? MAX_SESSION_ENERGY);
    const loadedPantryUsed = isNewCalendarDay
      ? false
      : (progress.pantryUsedToday ?? false);

    setCurrentDay(loadedDay);
    setLastEnergyDate(todayKey);
    setSessionEnergy(loadedSessionEnergy);
    setCompletedSessions(progress.completedSessions ?? 0);
    setSessionActive(progress.sessionActive ?? false);
    setSessionSecondsLeft(
      progress.sessionSecondsLeft ?? SESSION_DURATION_SECONDS,
    );
    setChallengeIndex(progress.challengeIndex ?? 0);
    setSkill(progress.skill ?? 0);
    setReputation(progress.reputation ?? 0);
    setPantryUsedToday(loadedPantryUsed);
    setStorySeen(progress.storySeen ?? false);
    setCorrectMultipleChoiceCount(progress.correctMultipleChoiceCount ?? 0);
    setPassedWrittenCount(progress.passedWrittenCount ?? 0);

    if ((progress.completedSessions ?? 0) >= 21) {
      setNotice("Semua sesi orientasi selesai. Lihat hasil magangmu.");
    } else if (isNewCalendarDay) {
      setNotice(
        `Hari ke-${loadedDay} dimulai! Energy Sesi harian (${MAX_SESSION_ENERGY}/${MAX_SESSION_ENERGY}) telah dipulihkan.`,
      );
    } else if (progress.sessionActive) {
      setNotice(
        "Sesi masih aktif. Datangi meja divisi untuk melanjutkan challenge.",
      );
    } else if (progress.divisionId) {
      setNotice("Progress dimuat. Temui Maya atau mulai sesi berikutnya.");
    }
  }, [router]);

  useEffect(() => {
    const distanceToMaya = Math.sqrt(
      Math.pow(position.x - MAYA_POSITION.x, 2) +
        Math.pow(position.y - MAYA_POSITION.y, 2),
    );

    const distanceToDesk = Math.sqrt(
      Math.pow(position.x - DESK_POSITION.x, 2) +
        Math.pow(position.y - DESK_POSITION.y, 2),
    );

    const distanceToPantry = Math.sqrt(
      Math.pow(position.x - PANTRY_POSITION.x, 2) +
        Math.pow(position.y - PANTRY_POSITION.y, 2),
    );

    if (distanceToMaya < INTERACTION_DISTANCE) {
      setNearTarget("maya");
      return;
    }

    if (distanceToPantry < INTERACTION_DISTANCE) {
      setNearTarget("pantry");
      return;
    }

    if (distanceToDesk < INTERACTION_DISTANCE) {
      setNearTarget("desk");
      return;
    }

    setNearTarget(null);
  }, [position]);

  useEffect(() => {
    if (!sessionActive) {
      return;
    }

    const timer = window.setInterval(() => {
      setSessionSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [sessionActive]);

  useEffect(() => {
    if (!sessionActive || sessionSecondsLeft > 0) {
      return;
    }

    setSessionActive(false);
    setShowTaskModal(false);
    setShowFeedbackModal(false);
    setChallengeIndex(0);
    setSessionSecondsLeft(SESSION_DURATION_SECONDS);

    saveProgress({
      sessionActive: false,
      challengeIndex: 0,
      sessionSecondsLeft: SESSION_DURATION_SECONDS,
    });

    setNotice(
      "Waktu sesi 7 menit habis saat mengerjakan challenge. Energy Sesi tetap terpakai. Kamu dapat memulai sesi berikutnya jika masih memiliki Energy Sesi.",
    );
  }, [sessionActive, sessionSecondsLeft]);

  useEffect(() => {
    const animInterval = window.setInterval(() => {
      setAnimTick((current) => (current + 1) % 24);
    }, 160);

    return () => window.clearInterval(animInterval);
  }, []);

  useEffect(() => {
    let stopMovingTimeout: number | undefined;

    function handleKeyboard(event: KeyboardEvent) {
      const key = event.key.toLowerCase();

      if (
        showStoryModal ||
        showDivisionModal ||
        showTaskModal ||
        showFeedbackModal
      ) {
        return;
      }

      if (key === "e" || key === "enter") {
        event.preventDefault();
        interact();
        return;
      }

      const speed = 14;
      let moveX = 0;
      let moveY = 0;
      let nextDirection: PlayerDirection | null = null;

      if (key === "arrowup" || key === "w") {
        moveY = -speed;
        nextDirection = "up";
      } else if (key === "arrowdown" || key === "s") {
        moveY = speed;
        nextDirection = "down";
      } else if (key === "arrowleft" || key === "a") {
        moveX = -speed;
        nextDirection = "left";
      } else if (key === "arrowright" || key === "d") {
        moveX = speed;
        nextDirection = "right";
      }

      if (moveX === 0 && moveY === 0) {
        return;
      }

      event.preventDefault();

      if (nextDirection) {
        setDirection(nextDirection);
      }
      setIsMoving(true);

      if (stopMovingTimeout !== undefined) {
        window.clearTimeout(stopMovingTimeout);
      }
      stopMovingTimeout = window.setTimeout(() => {
        setIsMoving(false);
      }, 220);

      setPosition((current) => ({
        x: Math.max(20, Math.min(900, current.x + moveX)),
        y: Math.max(20, Math.min(470, current.y + moveY)),
      }));
    }

    function handleKeyUp(event: KeyboardEvent) {
      const key = event.key.toLowerCase();
      if (
        [
          "w",
          "a",
          "s",
          "d",
          "arrowup",
          "arrowdown",
          "arrowleft",
          "arrowright",
        ].includes(key)
      ) {
        if (stopMovingTimeout !== undefined) {
          window.clearTimeout(stopMovingTimeout);
        }
        stopMovingTimeout = window.setTimeout(() => {
          setIsMoving(false);
        }, 80);
      }
    }

    window.addEventListener("keydown", handleKeyboard);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
      window.removeEventListener("keyup", handleKeyUp);
      if (stopMovingTimeout !== undefined) {
        window.clearTimeout(stopMovingTimeout);
      }
    };
  }, [
    showStoryModal,
    showDivisionModal,
    showTaskModal,
    showFeedbackModal,
    nearTarget,
    divisionId,
    sessionActive,
    completedSessions,
  ]);

  function openStory(lines: string[]) {
    setStoryLines(lines);
    setStoryIndex(0);
    setShowStoryModal(true);
  }

  function nextStoryLine() {
    if (storyIndex < storyLines.length - 1) {
      setStoryIndex((current) => current + 1);
      return;
    }

    setShowStoryModal(false);

    if (!storySeen) {
      setStorySeen(true);
      saveProgress({ storySeen: true });
      setShowDivisionModal(true);
      setNotice("Pilih posisi magang yang ingin kamu eksplorasi.");
      return;
    }

    setNotice("Kamu dapat mulai sesi ketika sudah siap.");
  }

  function chooseDivision(division: Division) {
    const todayKey = getTodayDateKey();

    setDivisionId(division.id);
    setSessionEnergy(MAX_SESSION_ENERGY);
    setCompletedSessions(0);
    setSessionActive(false);
    setSessionSecondsLeft(SESSION_DURATION_SECONDS);
    setChallengeIndex(0);
    setSkill(0);
    setReputation(0);
    setPantryUsedToday(false);
    setStorySeen(true);
    setCurrentDay(1);
    setLastEnergyDate(todayKey);
    setCorrectMultipleChoiceCount(0);
    setPassedWrittenCount(0);

    setShowDivisionModal(false);

    const progress: SavedProgress = {
      divisionId: division.id,
      sessionEnergy: MAX_SESSION_ENERGY,
      completedSessions: 0,
      sessionActive: false,
      sessionSecondsLeft: SESSION_DURATION_SECONDS,
      challengeIndex: 0,
      skill: 0,
      reputation: 0,
      pantryUsedToday: false,
      storySeen: true,
      currentDay: 1,
      lastEnergyDate: todayKey,
      correctMultipleChoiceCount: 0,
      passedWrittenCount: 0,
    };

    localStorage.setItem("magangsim-session-progress", JSON.stringify(progress));
    localStorage.setItem("magangsim-selected-division", division.id);

    openStory([
      `Bagus, kamu memilih jalur ${division.name}.`,
      ...division.mayaBriefing,
      "Saat siap, mulai sesi pertama (durasi 7 menit). Setiap sesi menggunakan 1 Energy Sesi dan berisi 3 challenge bertahap.",
    ]);
  }

  function advanceToNextDay() {
    const nextDay = currentDay + 1;
    const todayKey = getTodayDateKey();

    setCurrentDay(nextDay);
    setLastEnergyDate(todayKey);
    setSessionEnergy(MAX_SESSION_ENERGY);
    setPantryUsedToday(false);

    saveProgress({
      currentDay: nextDay,
      lastEnergyDate: todayKey,
      sessionEnergy: MAX_SESSION_ENERGY,
      pantryUsedToday: false,
    });

    setNotice(
      `Memasuki Hari ke-${nextDay}! Energy Sesi (${MAX_SESSION_ENERGY}/${MAX_SESSION_ENERGY}) telah dipulihkan untuk melanjutkan tantangan.`,
    );
  }

  function startSession() {
    if (!selectedDivision) {
      setNotice("Temui Maya terlebih dahulu untuk memilih posisi magang.");
      return;
    }

    if (completedSessions >= 21) {
      setNotice("Seluruh sesi telah selesai. Klik Lihat Hasil Magang.");
      return;
    }

    if (sessionActive) {
      setNotice("Sesi sedang aktif. Datangi meja divisi untuk melanjutkan.");
      return;
    }

    if (sessionEnergy <= 0) {
      setNotice(
        "Energy Sesi hari ini sudah habis untuk menjaga fokus belajar. Lanjutkan ke hari kerja berikutnya untuk memulihkan Energy Sesi.",
      );
      return;
    }

    const nextSessionEnergy = sessionEnergy - 1;

    setSessionEnergy(nextSessionEnergy);
    setSessionActive(true);
    setSessionSecondsLeft(SESSION_DURATION_SECONDS);
    setChallengeIndex(0);
    resetSessionForNewDay();

    saveProgress({
      sessionEnergy: nextSessionEnergy,
      sessionActive: true,
      sessionSecondsLeft: SESSION_DURATION_SECONDS,
      challengeIndex: 0,
      pantryUsedToday: false,
    });

    openStory([
      `Hari ke-${currentDay} • Sesi ${completedSessions + 1} (7 Menit) dimulai: ${currentSession?.title ?? "Challenge Magang"}.`,
      `Tingkat kesulitan sesi ini: ${currentSession?.difficulty ?? "Dasar"}.`,
      "Kamu memiliki 3 challenge (2 pilihan ganda & 1 tugas uraian praktis). Baca skenario dengan teliti dan gunakan waktu 7 menit secara bijak.",
    ]);
  }

  function openTask() {
    if (!selectedDivision) {
      setNotice("Pilih divisi bersama Maya terlebih dahulu.");
      return;
    }

    if (!sessionActive) {
      setNotice("Mulai Sesi 7 Menit terlebih dahulu.");
      return;
    }



    if (!currentChallenge) {
      return;
    }

    setSelectedAnswer(null);
    setWrittenAnswer("");
    setShowTaskModal(true);
  }

  function usePantry() {
    if (pantryUsedToday) {
      setNotice(
        "Pantry sudah digunakan pada sesi ini. Gunakan energy dengan bijak.",
      );
      return;
    }

    if (sessionEnergy >= MAX_SESSION_ENERGY) {
      setNotice("Energi sesi sudah penuh.");
      return;
    }

    const nextSessionEnergy = sessionEnergy + 1;
    setSessionEnergy(nextSessionEnergy);
    setPantryUsedToday(true);

    saveProgress({
      sessionEnergy: nextSessionEnergy,
      pantryUsedToday: true,
    });

    setNotice(
      `Kamu beristirahat di Pantry. Energi sesi +1.`,
    );
  }

  function submitMultipleChoice() {
    if (
      !currentChallenge ||
      currentChallenge.type !== "multiple-choice" ||
      selectedAnswer === null
    ) {
      return;
    }

    const isCorrect = selectedAnswer === currentChallenge.correctAnswer;
    const nextReputation = isCorrect
      ? reputation + 3
      : Math.max(0, reputation - 1);
    const nextCorrectMC = isCorrect
      ? correctMultipleChoiceCount + 1
      : correctMultipleChoiceCount;

    setShowTaskModal(false);
    setReputation(nextReputation);
    setCorrectMultipleChoiceCount(nextCorrectMC);

    setFeedbackTitle(isCorrect ? "Keputusan yang Tepat" : "Perlu Ditinjau Lagi");
    setFeedbackBody(
      isCorrect
        ? currentChallenge.correctFeedback
        : currentChallenge.wrongFeedback,
    );
    setFeedbackTip(
      isCorrect
        ? "Kamu sudah menghubungkan keputusan dengan kebutuhan situasi kerja."
        : "Baca kembali tujuan kerja pada skenario, lalu fokus pada tindakan yang paling relevan dan profesional.",
    );
    setFeedbackExample("");
    setShowFeedbackModal(true);

    saveProgress({
      reputation: nextReputation,
      correctMultipleChoiceCount: nextCorrectMC,
    });
  }

  function submitWrittenAnswer() {
    if (!currentChallenge || currentChallenge.type !== "written") {
      return;
    }

    const normalizedAnswer = writtenAnswer.toLowerCase();

    const keywordMatches = currentChallenge.keywords.filter((keyword) =>
      normalizedAnswer.includes(keyword.toLowerCase()),
    ).length;

    const enoughLength = writtenAnswer.trim().length >= currentChallenge.minLength;
    const enoughKeywords = keywordMatches >= 1;
    const passed = enoughLength && enoughKeywords;

    const nextReputation = passed
      ? reputation + 4
      : Math.max(0, reputation - 1);
    const nextPassedWritten = passed
      ? passedWrittenCount + 1
      : passedWrittenCount;

    setShowTaskModal(false);
    setReputation(nextReputation);
    setPassedWrittenCount(nextPassedWritten);

    setFeedbackTitle(
      passed ? "Jawaban Praktis Terkirim" : "Jawaban Perlu Dikembangkan",
    );

    setFeedbackBody(
      passed
        ? currentChallenge.correctFeedback
        : `Jawabanmu sudah tercatat, tetapi masih perlu dikembangkan. Pastikan jawaban memiliki detail yang cukup dan menyentuh unsur penting dari skenario.`,
    );

    setFeedbackTip(currentChallenge.improvementTip);
    setFeedbackExample(currentChallenge.exampleAnswer);
    setShowFeedbackModal(true);

    saveProgress({
      reputation: nextReputation,
      passedWrittenCount: nextPassedWritten,
    });
  }

  function continueAfterFeedback() {
    setShowFeedbackModal(false);

    const isLastChallenge = challengeIndex >= 2;

    if (!isLastChallenge) {
      const nextChallengeIndex = challengeIndex + 1;

      setChallengeIndex(nextChallengeIndex);
      setSelectedAnswer(null);
      setWrittenAnswer("");
      
      saveProgress({
        challengeIndex: nextChallengeIndex,
      });

      setNotice(
        `Challenge ${nextChallengeIndex + 1} dari 3 dimulai.`,
      );
      
      setShowTaskModal(true);
      return;
    }

    const nextCompletedSessions = completedSessions + 1;
    const nextSkill = skill + 1;

    setCompletedSessions(nextCompletedSessions);
    setSkill(nextSkill);
    setSessionActive(false);
    setSessionSecondsLeft(SESSION_DURATION_SECONDS);
    setChallengeIndex(0);

    saveProgress({
      completedSessions: nextCompletedSessions,
      skill: nextSkill,
      sessionActive: false,
      sessionSecondsLeft: SESSION_DURATION_SECONDS,
      challengeIndex: 0,
    });

    if (nextCompletedSessions >= 21) {
      openStory([
        "Kamu sudah menyelesaikan seluruh sesi orientasi.",
        "Kamu bukan hanya menjawab pertanyaan, tetapi juga berlatih mengambil keputusan dan membuat output kerja.",
        "Sekarang lihat hasil magangmu untuk mengetahui perkembangan kompetensimu dan sertifikasi dari validator ahli.",
      ]);

      setNotice("Orientasi selesai. Klik Lihat Hasil Magang.");
      return;
    }

    openStory([
      `Sesi ${completedSessions + 1} telah selesai.`,
      "Kamu telah menunjukkan perkembangan dalam memahami situasi kerja.",
      `Sesi berikutnya memiliki tingkat kesulitan lebih tinggi. Gunakan kembali satu Energy Sesi saat kamu siap.`,
    ]);

    setNotice(
      `Sesi selesai. Skill +1. Mulai sesi berikutnya saat siap.`,
    );
  }

  function interact() {
    if (
      showStoryModal ||
      showDivisionModal ||
      showTaskModal ||
      showFeedbackModal
    ) {
      return;
    }

    if (nearTarget === "maya") {
      if (!storySeen) {
        openStory([
          "Selamat datang di Nusantara Works.",
          "Aku Maya, mentor kamu selama orientasi magang ini.",
          "Di sini kamu akan mencoba situasi kerja nyata melalui sesi singkat 7 menit, challenge bertahap, dan feedback langsung.",
          "Sebelum mulai, pilih posisi magang yang paling ingin kamu eksplorasi.",
        ]);
        return;
      }

      if (selectedDivision) {
        openStory([
          `Halo, ${player?.name ?? "peserta"}. Kamu sedang berada di jalur ${selectedDivision.name}.`,
          "Ingat, jawaban terbaik bukan hanya yang terlihat benar, tetapi yang sesuai dengan tujuan kerja dan situasinya.",
          "Gunakan feedback setelah setiap challenge untuk memperbaiki keputusanmu.",
        ]);
        return;
      }
    }

    if (nearTarget === "pantry") {
      usePantry();
      return;
    }

    if (nearTarget === "desk") {
      openTask();
      return;
    }

    setNotice("Dekati Maya, meja divisi, atau Pantry untuk berinteraksi.");
  }

  function getInteractionPrompt() {
    if (nearTarget === "maya") {
      return "Tekan E untuk bicara dengan Maya";
    }

    if (nearTarget === "pantry") {
      return pantryUsedToday
        ? "Pantry sudah digunakan pada sesi ini"
        : "Tekan E untuk istirahat di Pantry (+30 Energy kerja)";
    }

    if (nearTarget === "desk") {
      if (!selectedDivision) {
        return "Bicara dengan Maya untuk memilih divisi";
      }

      if (!sessionActive) {
        return "Mulai sesi terlebih dahulu";
      }

      return `Tekan E untuk Challenge ${challengeIndex + 1} dari 3`;
    }

    return null;
  }

  function getObjective() {
    if (!storySeen || !selectedDivision) {
      return "Temui Maya di lobby untuk memilih posisi magang.";
    }

    if (completedSessions >= 21) {
      return "Seluruh orientasi selesai. Lihat hasil magangmu.";
    }

    if (!sessionActive) {
      return `Mulai Sesi ${completedSessions + 1} (7 Menit) untuk melanjutkan simulasi ${selectedDivision.name}.`;
    }

    return `Selesaikan Challenge ${challengeIndex + 1} dari 3 di ${selectedDivision.deskLabel}.`;
  }

  function viewResults() {
    const oldProgress = localStorage.getItem("magangsim-progress");

    if (oldProgress) {
      localStorage.removeItem("magangsim-progress");
    }

    router.push("/result");
  }

  if (!player) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#35131f] text-[#fff1c9]">
        Memuat game...
      </main>
    );
  }

  const interactionPrompt = getInteractionPrompt();

  return (
    <main className="min-h-screen bg-[#35131f] px-4 py-5 text-[#241922]">
      {/* Top Center Controls */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-40 opacity-85 transition-opacity hover:opacity-100 flex flex-col items-center pointer-events-none">
        <div className="pointer-events-auto">
          {storySeen && (
            completedSessions >= 21 ? (
              <button
                className="mt-3 border-3 border-[#241922] bg-[#f9a8d4] px-5 py-3 font-black shadow-[4px_4px_0_#a74f7a] transition-all duration-200 hover:scale-[1.04] hover:-translate-y-0.5 hover:bg-[#fbcfe8] hover:shadow-[6px_6px_0_#241922] active:scale-[0.98]"
                onClick={viewResults}
              >
                Lihat Hasil Magang →
              </button>
            ) : sessionEnergy <= 0 && !sessionActive ? (
              <button
                className="mt-3 border-3 border-[#241922] bg-[#86efac] px-5 py-3 font-black shadow-[4px_4px_0_#4a8c55] transition-all duration-200 hover:scale-[1.04] hover:-translate-y-0.5 hover:bg-[#bbf7d0] hover:shadow-[6px_6px_0_#241922] active:scale-[0.98]"
                onClick={advanceToNextDay}
              >
                Lanjut ke Hari ke-{currentDay + 1} (+Pulihkan Energy Harian) →
              </button>
            ) : sessionActive ? (
              <div className="mt-3 inline-block border-3 border-[#241922] bg-[#4fc7bd] px-5 py-3 font-black text-[#241922] shadow-[4px_4px_0_#1f6f68]">
                ⏱ Sesi Aktif • {formatTime(sessionSecondsLeft)}
              </div>
            ) : (
              <button
                className="mt-3 border-3 border-[#241922] bg-[#f6c85f] px-5 py-3 font-black shadow-[4px_4px_0_#b17732] transition-all duration-200 enabled:hover:scale-[1.04] enabled:hover:-translate-y-0.5 enabled:hover:bg-[#fbd373] enabled:hover:shadow-[6px_6px_0_#241922] enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                onClick={startSession}
                disabled={sessionEnergy <= 0 || !selectedDivision}
              >
                {`Mulai Sesi ${completedSessions + 1} • 07:00 (-1 Energy Sesi)`}
              </button>
            )
          )}
        </div>
      </div>
      {/* Force Landscape Overlay */}
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#241922] text-[#fff1c9] lg:hidden landscape:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 animate-pulse text-[#f9a8d4]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <p className="mt-6 text-center text-lg font-black px-8 uppercase tracking-widest text-[#f9a8d4]">
          Putar Layar HP Anda
        </p>
        <p className="mt-2 text-center text-sm px-8 font-bold text-[#fff1c9]">
          Game ini hanya dapat dimainkan dalam mode Landscape (Miring).
        </p>
      </div>

      <header className="mx-auto mb-3 flex w-full max-w-6xl items-center justify-between gap-3 text-xs font-black text-[#fff1c9]">
        <button
          className="border-2 border-[#fff1c9] bg-[#4a1c2c] px-3 py-2 shadow-[3px_3px_0_#180b11] transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 hover:bg-[#6a2b3e] active:scale-95"
          onClick={() => router.push("/dashboard")}
        >
          ← MENU
        </button>

        <div className="flex items-center gap-2">
          <img
            src="/branding/magangsim-logo.png"
            alt="Logo MAGANG SIM"
            className="h-8 w-8 object-contain"
          />
          <span>SIMULASI MAGANG • MAGANG SIM</span>
        </div>

        <span className="border-2 border-[#fff1c9] bg-[#4a1c2c] px-3 py-1.5">
          {player.name}
        </span>
      </header>

      <section className="relative mx-auto aspect-video w-full max-w-6xl overflow-hidden border-4 border-[#241922] bg-[#241922] shadow-[8px_8px_0_#180b11]">
        <img
          src="/assets/background.png"
          alt="Latar Kantor MAGANG SIM"
          className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover [image-rendering:pixelated]"
        />

        <div className="absolute left-3 top-3 z-20 max-w-xs border-3 border-[#241922] bg-[#fffdf7] p-2.5 text-xs shadow-[4px_4px_0_rgba(35,20,25,0.18)]">
          <b className="block text-xs">OBJECTIVE • HARI KE-{currentDay}</b>
          <span className="mt-0.5 block leading-4">{getObjective()}</span>
        </div>

        <div className="absolute right-3 top-3 z-20 grid grid-cols-2 gap-x-3 gap-y-0.5 border-3 border-[#241922] bg-[#fffdf7] p-2.5 text-right text-[11px] shadow-[4px_4px_0_rgba(35,20,25,0.18)]">
          <span style={{ fontFamily: "var(--font-silkscreen)" }}>DIVISI</span>
          <b>{selectedDivision?.name ?? "-"}</b>

          <span style={{ fontFamily: "var(--font-silkscreen)" }}>SESI</span>
          <b>
            {Math.min(completedSessions + 1, 21)}/21 ({currentSession?.difficulty ?? "Dasar"})
          </b>

          <span style={{ fontFamily: "var(--font-silkscreen)" }}>WAKTU SESI</span>
          <b className={sessionActive ? "text-[#b91c1c]" : ""}>
            {sessionActive ? formatTime(sessionSecondsLeft) : "07:00"}
          </b>

          <span style={{ fontFamily: "var(--font-silkscreen)" }}>ENERGY SESI</span>
          <b>
            {sessionEnergy}/{MAX_SESSION_ENERGY}
          </b>


          <span style={{ fontFamily: "var(--font-silkscreen)" }}>{selectedDivision?.skillName ?? "SKILL"}</span>
          <b>{skill}</b>

          <span style={{ fontFamily: "var(--font-silkscreen)" }}>REPUTASI</span>
          <b>{reputation}</b>
        </div>

        <div className="absolute left-[9%] top-[39%] z-10 flex flex-col items-center text-xs font-black">
          <span className="mb-1 whitespace-nowrap border-2 border-[#241922] bg-[#fff8e5] px-2 py-0.5 text-[10px] shadow-[2px_2px_0_#180b11]">
            RECEPTION
          </span>
          <div className="flex flex-col items-center">
            <SpriteFrame
              src="/assets/worker4.png"
              frameWidth={64}
              frameHeight={64}
              totalFrames={1}
              frame={0}
              scale={1.6}
              ariaLabel="Staff Reception"
            />
            <span className="-mt-2 bg-[#241922] px-1.5 py-0.5 text-[9px] font-black text-[#fff8e5]">
              STAFF
            </span>
          </div>
        </div>

        <div className="absolute left-[9%] top-[72%] z-10 flex flex-col items-center text-xs font-black">
          <span className="whitespace-nowrap border-2 border-[#241922] bg-[#fff8e5] px-2 py-0.5 text-[10px] shadow-[2px_2px_0_#180b11]">
            SOFA LOUNGE
          </span>
        </div>

        {/* Properti tambahan meja divisi: Atas */}
        <div className="pointer-events-none absolute right-[15%] top-[35%] z-10 flex items-center justify-center">
          <SpriteFrame
            src="/assets/Julia_PC.png"
            frameWidth={64}
            frameHeight={64}
            totalFrames={6}
            frame={(animTick + 1) % 6}
            scale={1.8}
            ariaLabel="Properti Meja Atas"
          />
        </div>

        {/* Properti tambahan meja divisi: Bawah */}
        <div className="pointer-events-none absolute right-[15%] top-[68%] z-10 flex items-center justify-center">
          <SpriteFrame
            src="/assets/Julia_PC.png"
            frameWidth={64}
            frameHeight={64}
            totalFrames={6}
            frame={(animTick + 3) % 6}
            scale={1.8}
            ariaLabel="Properti Meja Bawah"
          />
        </div>

        {/* Properti tambahan meja divisi: Kiri */}
        <div className="pointer-events-none absolute right-[26%] top-[53.5%] z-10 flex items-center justify-center">
          <SpriteFrame
            src="/assets/Julia_PC.png"
            frameWidth={64}
            frameHeight={64}
            totalFrames={6}
            frame={(animTick + 2) % 6}
            scale={1.8}
            ariaLabel="Properti Meja Kiri"
          />
        </div>

        {/* Properti tambahan meja divisi: Kanan */}
        <div className="pointer-events-none absolute right-[4%] top-[53.5%] z-10 flex items-center justify-center">
          <SpriteFrame
            src="/assets/Julia_PC.png"
            frameWidth={64}
            frameHeight={64}
            totalFrames={6}
            frame={(animTick + 4) % 6}
            scale={1.8}
            ariaLabel="Properti Meja Kanan"
          />
        </div>

        {/* Meja Divisi Utama (Interaktif) */}
        <div className="absolute right-[15%] top-[50%] z-10 flex flex-col items-center text-xs font-black">
          <span
            className="mb-1 whitespace-nowrap border-2 border-[#241922] px-2 py-0.5 text-[10px] shadow-[2px_2px_0_#180b11]"
            style={{ backgroundColor: selectedDivision?.color ?? "#fff8e5" }}
          >
            {selectedDivision?.deskLabel ?? "MEJA DIVISI"}
          </span>
          <div className="-mt-1 flex items-center justify-center">
            <SpriteFrame
              src="/assets/Julia_PC.png"
              frameWidth={64}
              frameHeight={64}
              totalFrames={6}
              frame={animTick % 6}
              scale={1.8}
              ariaLabel="Meja Komputer Divisi"
            />
          </div>
        </div>

        <div className="absolute left-[49%] top-[38%] z-10 flex flex-col items-center text-xs font-black">
          <span className="mb-1 whitespace-nowrap border-2 border-[#241922] bg-[#fff8e5] px-2 py-0.5 text-[10px] shadow-[2px_2px_0_#180b11]">
            PANTRY
          </span>
          <div className="flex items-center justify-center">
            <SpriteFrame
              src="/assets/Water-Dispenser.png"
              frameWidth={32}
              frameHeight={32}
              totalFrames={1}
              frame={0}
              scale={2.2}
              ariaLabel="Dispenser Air Pantry"
            />
          </div>
        </div>

        <div className="absolute left-[26%] top-[40%] z-10 flex flex-col items-center">
          <span className="mb-1 whitespace-nowrap border-2 border-[#241922] bg-[#facc15] px-1.5 py-0.5 text-[10px] font-black text-[#241922] shadow-[2px_2px_0_#180b11]">
            MAYA (MENTOR)
          </span>
          <SpriteFrame
            src="/assets/Julia-Idle.png"
            frameWidth={32}
            frameHeight={32}
            totalFrames={4}
            frame={(animTick + 2) % 4}
            scale={2}
            style={{ filter: "hue-rotate(315deg) saturate(1.15)" }}
            ariaLabel="Maya Mentor"
          />
        </div>

        <div
          className="absolute z-20 h-16 w-16 -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-75"
          style={{
            left: `${position.x / 9.6}%`,
            top: `${position.y / 5.4}%`,
          }}
          aria-label="Player"
        >
          <span className="-top-6 left-1/2 absolute -translate-x-1/2 whitespace-nowrap border-2 border-[#241922] bg-[#4fc7bd] px-1.5 py-0.5 text-[10px] font-black text-[#241922] shadow-[2px_2px_0_#180b11]">
            {player.name}
          </span>

          {isMoving ? (
            <SpriteFrame
              src={
                direction === "down"
                  ? "/assets/Julia_walk_Foward.png"
                  : direction === "left"
                    ? "/assets/Julia_walk_Left.png"
                    : direction === "right"
                      ? "/assets/Julia_walk_Rigth.png"
                      : "/assets/Julia_walk_Up.png"
              }
              frameWidth={64}
              frameHeight={64}
              totalFrames={4}
              frame={animTick % 4}
              scale={2}
              className="absolute"
              style={{ left: "-32px", top: "-32px" }}
              ariaLabel="Karakter Berjalan"
            />
          ) : direction === "down" ? (
            <SpriteFrame
              src="/assets/Julia-Idle.png"
              frameWidth={32}
              frameHeight={32}
              totalFrames={4}
              frame={animTick % 4}
              scale={2}
              className="absolute left-0 top-0"
              ariaLabel="Karakter Idle"
            />
          ) : (
            <SpriteFrame
              src="/assets/Julia.png"
              frameWidth={32}
              frameHeight={32}
              totalFrames={4}
              frame={
                direction === "right"
                  ? 1
                  : direction === "up"
                    ? 2
                    : 3
              }
              scale={2}
              className="absolute left-0 top-0"
              ariaLabel="Karakter Arah"
            />
          )}
        </div>

        {interactionPrompt && (
          <div className="absolute bottom-14 left-1/2 z-20 -translate-x-1/2 border-2 border-white bg-[#241922] px-3 py-2 text-center text-xs font-bold text-white">
            {interactionPrompt}
          </div>
        )}

        <div className="absolute bottom-4 left-1/2 z-20 -translate-x-1/2 bg-transparent px-3 py-2 text-center text-xs font-black tracking-widest text-[#fff1c9] drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] opacity-90">
          WASD / tombol panah untuk bergerak • E / Enter untuk interaksi
        </div>

        {showStoryModal && (
          <div className="absolute inset-0 z-40 grid place-items-center bg-[#241922]/75 p-5">
            <div className="w-full max-w-xl border-4 border-[#241922] bg-[#fff8e5] p-5 shadow-[8px_8px_0_#180b11]">
              <p className="text-center text-xs font-black tracking-[0.2em] text-[#7c3146]">
                MAYA • MENTOR MAGANG
              </p>

              <img
                src="/branding/magangsim-logo.png"
                alt="Logo MAGANG SIM"
                className="mx-auto mt-4 h-12 w-12 object-contain"
              />

              <div className="mx-auto mt-5 grid h-20 w-20 place-items-center border-3 border-[#241922] bg-[#facc15] shadow-[3px_3px_0_#9b7420]">
                <SpriteFrame
                  src="/assets/Julia-Idle.png"
                  frameWidth={32}
                  frameHeight={32}
                  totalFrames={4}
                  frame={animTick % 4}
                  scale={2}
                  style={{ filter: "hue-rotate(315deg) saturate(1.15)" }}
                  ariaLabel="Maya Portrait"
                />
              </div>

              <p className="mt-5 text-center text-lg font-bold leading-8">
                “{storyLines[storyIndex]}”
              </p>

              <p className="mt-4 text-center text-xs text-[#5f4a4d]">
                {storyIndex + 1} / {storyLines.length}
              </p>

              <button
                className="mt-5 w-full border-3 border-[#241922] bg-[#f6c85f] px-5 py-3 font-black shadow-[4px_4px_0_#b17732] transition-all duration-200 hover:scale-[1.03] hover:-translate-y-0.5 hover:bg-[#fbd373] hover:shadow-[6px_6px_0_#241922] active:scale-[0.98]"
                onClick={nextStoryLine}
              >
                {storyIndex === storyLines.length - 1 ? "Lanjut →" : "Berikutnya →"}
              </button>
            </div>
          </div>
        )}

        {showDivisionModal && (
          <div className="absolute inset-0 z-40 grid place-items-center bg-[#241922]/75 p-5">
            <div className="w-full max-w-3xl border-4 border-[#241922] bg-[#fff8e5] p-5 shadow-[8px_8px_0_#180b11]">
              <p className="text-center text-xs font-black tracking-[0.2em] text-[#7c3146]">
                PILIH POSISI MAGANG
              </p>

              <h2 className="mt-2 text-center text-2xl font-black">
                Jalur mana yang ingin kamu eksplorasi?
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-6 text-[#5f4a4d]">
                Pilihanmu menentukan skenario kerja, challenge, skill utama,
                serta briefing dari Maya.
              </p>

              <div className="mt-5 grid gap-3.5 md:grid-cols-3">
                {DIVISIONS.map((division) => (
                  <button
                    key={division.id}
                    className="border-3 border-[#241922] p-4 text-left shadow-[4px_4px_0_#b17732] transition-all duration-200 hover:scale-[1.05] hover:-translate-y-1 hover:shadow-[7px_7px_0_#241922] active:scale-[0.98]"
                    style={{ backgroundColor: division.color }}
                    onClick={() => chooseDivision(division)}
                  >
                    <b className="block text-lg">{division.name}</b>
                    <span className="mt-2 block text-xs leading-5">
                      {division.description}
                    </span>
                    <span className="mt-4 block border-t-2 border-[#241922] pt-3 text-xs font-black">
                      SKILL: {division.skillName}
                    </span>
                  </button>
            )
                )}
              </div>
            </div>
          </div>
        )}

        {showTaskModal && currentChallenge && (
          <div className="absolute inset-0 z-50 grid place-items-center bg-[#241922]/80 p-5">
            <div className="max-h-[88%] w-full max-w-2xl overflow-y-auto border-4 border-[#241922] bg-[#fff8e5] p-5 shadow-[8px_8px_0_#180b11]">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#241922] pb-2.5">
                <p className="text-xs font-black tracking-[0.16em] text-[#7c3146]">
                  SESI {completedSessions + 1} • CHALLENGE {challengeIndex + 1}/3
                </p>

                <span className="border-2 border-[#241922] bg-[#f6c85f] px-2.5 py-1 text-xs font-black text-[#241922] shadow-[2px_2px_0_#241922]">
                  ⏱ SISA WAKTU: {formatTime(sessionSecondsLeft)}
                </span>
              </div>

              <h2 className="mt-3 text-center text-xl font-black">
                {currentChallenge.title}
              </h2>

              <div className="mt-4 border-3 border-[#241922] bg-[#fff0b8] p-3 text-sm leading-6">
                <b>SKENARIO KERJA</b>
                <div className="mt-2" style={{ fontFamily: "var(--font-vt323)", fontSize: "1.15rem", lineHeight: "1.3" }}>
                  {currentChallenge.scenario.split('\n').map((line, i) => 
                    line.trim().startsWith('|') ? (
                      <div key={i} className="whitespace-pre bg-white/50 px-1">{line}</div>
                    ) : (
                      <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
                    )
                  )}
                </div>
              </div>

              <p className="mt-5 text-center text-base font-bold leading-7">
                {currentChallenge.question}
              </p>

              {currentChallenge.type === "multiple-choice" ? (
                <>
                  <div className="mt-5 grid gap-3">
                    {currentChallenge.options.map((option, index) => (
                      <button
                        key={option}
                        className={`border-3 border-[#241922] px-4 py-3 text-left text-sm font-bold shadow-[3px_3px_0_#b17732] transition-all duration-200 hover:scale-[1.025] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#241922] active:scale-[0.99] ${
                          selectedAnswer === index
                            ? "bg-[#f6c85f]"
                            : "bg-white hover:bg-[#fff0b8]"
                        }`}
                        onClick={() => setSelectedAnswer(index)}
                      >
                        <span className="mr-2 inline-block w-6">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        {option}
                      </button>
                    ))}
                  </div>

                  <button
                    className="mt-5 w-full border-3 border-[#241922] bg-[#93c5fd] px-5 py-3 font-black shadow-[4px_4px_0_#4b76a6] transition-all duration-200 enabled:hover:scale-[1.03] enabled:hover:-translate-y-0.5 enabled:hover:bg-[#bfdbfe] enabled:hover:shadow-[6px_6px_0_#241922] enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={submitMultipleChoice}
                    disabled={selectedAnswer === null}
                  >
                    Kirim Jawaban
                  </button>
                </>
              ) : (
                <>
                  <textarea
                    className="mt-5 min-h-36 w-full border-3 border-[#241922] bg-white p-3 text-sm leading-6 outline-none transition-shadow duration-200 focus:bg-[#fffdf7] focus:shadow-[4px_4px_0_#86efac]"
                    placeholder="Tulis jawabanmu di sini..."
                    value={writtenAnswer}
                    onChange={(event) => setWrittenAnswer(event.target.value)}
                  />

                  <div className="mt-2 flex justify-between text-xs text-[#5f4a4d]">
                    <span>
                      Minimal {currentChallenge.minLength} karakter
                    </span>
                    <span>{writtenAnswer.length} karakter</span>
                  </div>

                  <button
                    className="mt-5 w-full border-3 border-[#241922] bg-[#86efac] px-5 py-3 font-black shadow-[4px_4px_0_#4a8c55] transition-all duration-200 enabled:hover:scale-[1.03] enabled:hover:-translate-y-0.5 enabled:hover:bg-[#bbf7d0] enabled:hover:shadow-[6px_6px_0_#241922] enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={submitWrittenAnswer}
                    disabled={writtenAnswer.trim().length === 0}
                  >
                    Kirim Jawaban Praktis
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {showFeedbackModal && (
          <div className="absolute inset-0 z-[60] grid place-items-center bg-[#241922]/80 p-5">
            <div className="max-h-[88%] w-full max-w-2xl overflow-y-auto border-4 border-[#241922] bg-[#fff8e5] p-5 shadow-[8px_8px_0_#180b11]">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#241922] pb-2.5">
                <p className="text-xs font-black tracking-[0.16em] text-[#7c3146]">
                  FEEDBACK MAYA
                </p>

                <span className="border-2 border-[#241922] bg-[#f6c85f] px-2.5 py-1 text-xs font-black text-[#241922] shadow-[2px_2px_0_#241922]">
                  ⏱ SISA WAKTU: {formatTime(sessionSecondsLeft)}
                </span>
              </div>

              <h2 className="mt-3 text-center text-2xl font-black">
                {feedbackTitle}
              </h2>

              <div className="mt-5 border-3 border-[#241922] bg-white p-4 text-sm leading-6">
                <b>Yang perlu kamu pahami</b>
                <p className="mt-2">{feedbackBody}</p>
              </div>

              <div className="mt-3 border-3 border-[#241922] bg-[#fff0b8] p-4 text-sm leading-6">
                <b>Saran pengembangan</b>
                <p className="mt-2">{feedbackTip}</p>
              </div>

              {feedbackExample && (
                <div className="mt-3 border-3 border-[#241922] bg-[#e6f4ff] p-4 text-sm leading-6">
                  <b>Contoh jawaban yang dapat dikembangkan</b>
                  <p className="mt-2">{feedbackExample}</p>
                </div>
              )}

              <button
                className="mt-5 w-full border-3 border-[#241922] bg-[#f6c85f] px-5 py-3 font-black shadow-[4px_4px_0_#b17732] transition-all duration-200 hover:scale-[1.03] hover:-translate-y-0.5 hover:bg-[#fbd373] hover:shadow-[6px_6px_0_#241922] active:scale-[0.98]"
                onClick={continueAfterFeedback}
              >
                Lanjutkan →
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto mt-4 w-full max-w-6xl">
        <div className="border-3 border-[#241922] bg-[#fff8e5] p-4 text-center shadow-[4px_4px_0_#180b11]">
          <b className="block text-sm">NOTIFIKASI</b>
          <p className="mt-2 text-sm">{notice}</p>

          {!storySeen && (
            <button
              className="mt-3 border-3 border-[#241922] bg-[#f6c85f] px-5 py-3 font-black shadow-[4px_4px_0_#b17732] transition-all duration-200 hover:scale-[1.04] hover:-translate-y-0.5 hover:bg-[#fbd373] hover:shadow-[6px_6px_0_#241922] active:scale-[0.98]"
              onClick={interact}
            >
              Bicara dengan Maya [E]
            </button>
          )}
        </div>
      </section>
    
        {!(showStoryModal || showDivisionModal || showTaskModal || showFeedbackModal) && (
          <>
            {/* Mobile Controls */}
            <div className="lg:hidden fixed bottom-6 left-6 grid grid-cols-3 gap-2 opacity-80 z-50 touch-none select-none">
          <div />
          <button 
            className="bg-[#f6c85f] border-2 border-[#241922] p-4 rounded-xl shadow-[2px_2px_0_#b17732] font-black text-xl flex items-center justify-center active:scale-95" 
            onTouchStart={() => startMobileMove("w")} 
            onTouchEnd={stopMobileMove} 
            onMouseDown={() => startMobileMove("w")} 
            onMouseUp={stopMobileMove} 
            onMouseLeave={stopMobileMove}
          >W</button>
          <div />
          <button 
            className="bg-[#f6c85f] border-2 border-[#241922] p-4 rounded-xl shadow-[2px_2px_0_#b17732] font-black text-xl flex items-center justify-center active:scale-95" 
            onTouchStart={() => startMobileMove("a")} 
            onTouchEnd={stopMobileMove} 
            onMouseDown={() => startMobileMove("a")} 
            onMouseUp={stopMobileMove} 
            onMouseLeave={stopMobileMove}
          >A</button>
          <button 
            className="bg-[#f6c85f] border-2 border-[#241922] p-4 rounded-xl shadow-[2px_2px_0_#b17732] font-black text-xl flex items-center justify-center active:scale-95" 
            onTouchStart={() => startMobileMove("s")} 
            onTouchEnd={stopMobileMove} 
            onMouseDown={() => startMobileMove("s")} 
            onMouseUp={stopMobileMove} 
            onMouseLeave={stopMobileMove}
          >S</button>
          <button 
            className="bg-[#f6c85f] border-2 border-[#241922] p-4 rounded-xl shadow-[2px_2px_0_#b17732] font-black text-xl flex items-center justify-center active:scale-95" 
            onTouchStart={() => startMobileMove("d")} 
            onTouchEnd={stopMobileMove} 
            onMouseDown={() => startMobileMove("d")} 
            onMouseUp={stopMobileMove} 
            onMouseLeave={stopMobileMove}
          >D</button>
        </div>

        <div className="lg:hidden fixed bottom-6 right-6 opacity-80 z-50 touch-none select-none">
          <button 
            className="bg-[#f9a8d4] text-[#831843] border-3 border-[#831843] w-20 h-20 rounded-full shadow-[4px_4px_0_#a74f7a] font-black text-2xl active:scale-95 flex items-center justify-center" 
            onClick={() => interact()}
          >
            E
          </button>
        </div>
        </>
      )}

</main>
  );
}