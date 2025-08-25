import React, { useState } from "react";
import Questions from "./Questions";

function Question() {
  const [showStart, setShowStart] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [playerName, setPlayerName] = useState(""); // ✅ store friend's name

  const currentQ = Questions[currentIndex];

  const handleAnswer = (i) => {
    setSelected(i);
    if (i === currentQ.correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < Questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
    } else {
      setIsFinished(true);

      // ✅ Send result to Google Sheets
      fetch("https://sheetdb.io/api/v1/7qio6nzj37pfp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            {
              Name: playerName,
              Score: score,
              TotalQuestions: Questions.length,
              Date: new Date().toLocaleString(),
            },
          ],
        }),
      });
    }
  };

  // ✅ Cover Page
  if (showStart) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-lg w-full">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            How much you know <span className="text-purple-600">Debanjali</span>
            ! 🤔
          </h1>
          <p className="text-gray-600 mb-6">
            Enter your name to start the quiz 🎉
          </p>

          {/* ✅ Input for name */}
          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="border p-2 rounded w-full mb-4"
          />

          <button
            onClick={() => setShowStart(false)}
            className="px-8 py-3 bg-purple-600 text-white rounded-xl shadow hover:bg-purple-700 transition text-lg"
            disabled={!playerName.trim()} // disable if empty
          >
            Start Quiz 🚀
          </button>
        </div>
      </div>
    );
  }

  // ✅ Final Score Page
  if (isFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center max-w-lg w-full">
          <h2 className="text-3xl font-bold mb-4">🎉 Quiz Finished!</h2>
          <p className="text-lg mb-4">
            {playerName}, your final score:{" "}
            <span className="font-semibold">{score}</span> / {Questions.length}
          </p>
          <p className="text-gray-500 mb-4">Your result has been saved ✅</p>
          <button
            onClick={() => {
              setCurrentIndex(0);
              setScore(0);
              setIsFinished(false);
              setShowStart(true);
              setPlayerName("");
            }}
            className="px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  // ✅ Quiz Questions Page
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-xl w-full">
        <p className="text-sm text-gray-500 mb-2">
          Question {currentIndex + 1} of {Questions.length}
        </p>

        {currentQ.image && (
          <img
            src={currentQ.image}
            alt="question visual"
            className="rounded-lg mb-4 w-full h-40 object-cover shadow"
          />
        )}

        <h2 className="text-lg font-semibold mb-3">{currentQ.question}</h2>

        <div className="grid gap-3">
          {currentQ.options.map((option, i) => {
            let btnColor = "bg-blue-500 hover:bg-blue-600";
            if (selected !== null) {
              if (i === currentQ.correctIndex) btnColor = "bg-green-500";
              else if (selected === i) btnColor = "bg-red-500";
              else btnColor = "bg-gray-300";
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selected !== null}
                className={`px-4 py-2 text-white rounded-lg shadow transition ${btnColor}`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <button
            onClick={handleNext}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
          >
            {currentIndex + 1 === Questions.length ? "Finish" : "Next"}
          </button>
        )}

        <p className="mt-4 text-sm text-gray-600">
          Score: {score} / {Questions.length}
        </p>
      </div>
    </div>
  );
}

export default Question;
