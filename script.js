
document.addEventListener("DOMContentLoaded", () => {
  // EDIT THIS DATE: use Paddu's birthday date.
  // Format: YYYY-MM-DD
  const BIRTHDAY_DATE = "YYYY-MM-DD";

  // MUSIC PLAYER
  const song = document.getElementById("birthdaySong");
  const musicButton = document.getElementById("musicButton");
  const musicStatus = document.getElementById("musicStatus");
  const musicCard = document.querySelector(".music-card");

  musicButton.addEventListener("click", async () => {
    if (song.paused) {
      try {
        await song.play();
      } catch (error) {
        musicStatus.textContent =
          "Song play avvaleda? Check music.mp3 file and try again.";
      }
    } else {
      song.pause();
    }
  });

  song.addEventListener("play", () => {
    musicButton.textContent = "Ⅱ PAUSE OUR SONG";
    musicStatus.textContent = "Playing just for you ♡";
    musicCard.classList.add("is-playing");
  });

  song.addEventListener("pause", () => {
    musicButton.textContent = "♫ PLAY OUR SONG";
    musicStatus.textContent = "Paused — press play when you're ready ♡";
    musicCard.classList.remove("is-playing");
  });

  song.addEventListener("ended", () => {
    musicStatus.textContent = "Hope this song made you smile ♡";
  });

  song.addEventListener("error", () => {
    musicStatus.textContent =
      "Couldn't load music.mp3. Check its name and upload.";
  });

  // BIRTHDAY COUNTDOWN
  const countdownNote = document.getElementById("countdown-note");
  const countdownIds = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
  };

  function updateCountdown() {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(BIRTHDAY_DATE)) {
      countdownNote.textContent =
        "Open script.js and enter Paddu's birthday date.";
      return;
    }

    const now = new Date();
    const parts = BIRTHDAY_DATE.split("-").map(Number);

    // Count down to the next occurrence of her birthday.
    let target = new Date(
      now.getFullYear(), parts[1] - 1, parts[2], 0, 0, 0
    );

    if (target.getTime() <= now.getTime()) {
      target = new Date(
        now.getFullYear() + 1, parts[1] - 1, parts[2], 0, 0, 0
      );
    }

    let difference = target.getTime() - now.getTime();

    const days = Math.floor(difference / 86400000);
    difference %= 86400000;

    const hours = Math.floor(difference / 3600000);
    difference %= 3600000;

    const minutes = Math.floor(difference / 60000);
    const seconds = Math.floor((difference % 60000) / 1000);

    countdownIds.days.textContent = days;
    countdownIds.hours.textContent = String(hours).padStart(2, "0");
    countdownIds.minutes.textContent = String(minutes).padStart(2, "0");
    countdownIds.seconds.textContent = String(seconds).padStart(2, "0");

    countdownNote.textContent = "Every second brings another reason to celebrate you ♡";
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // FLOATING HEARTS
  const heartsContainer = document.getElementById("hearts");
  const heartSymbols = ["♡", "♥", "✧", "✦"];

  function createHeart() {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent =
      heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (12 + Math.random() * 18) + "px";
    heart.style.animationDuration = (5 + Math.random() * 4) + "s";

    heartsContainer.appendChild(heart);

    heart.addEventListener("animationend", () => heart.remove());
  }

  const heartTimer = setInterval(createHeart, 1400);

  // EXTRA LOVE BUTTON
  const heartButton = document.getElementById("heartButton");
  const heartMessage = document.getElementById("heartMessage");

  heartButton.addEventListener("click", () => {
    heartMessage.textContent =
      "Sending you the biggest hug and all my love, Paddu. ♡";

    for (let i = 0; i < 14; i++) {
      setTimeout(createHeart, i * 100);
    }
  });
});
