import React, { useEffect, useState } from "react";
import { quiz } from "./data.js";

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState({
    score: 0,
    wrongAnswers: 0,
    correctAnswers: 0,
  });
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [timer, setTimer] = useState(5);

  const { questions } = quiz;
  const question = questions?.[currentQuestion]?.question;
  const options = questions?.[currentQuestion]?.options;
  const answer = questions?.[currentQuestion]?.answer;

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(countdown);
    };
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleNextQuestion();
    }
  }, [timer]);

  const handlePrevQuestion = () => {
    setCurrentQuestion((prev) => prev - 1);
    setSelectedAnswer("");
    setShowResult(false);
  };

  const handleNextQuestion = () => {
    let score = result.score;
    let correctAnswers = result.correctAnswers;
    let wrongAnswers = result.wrongAnswers;

    if (answer === selectedAnswer) {
      score += 1;
      correctAnswers += 1;
    } else {
      wrongAnswers += 1;
    }

    if (currentQuestion === questions.length - 1) {
      setShowResult(true);
    } else {
      setResult((prev) => ({
        ...prev,
        score: score,
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswers,
      }));
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer("");
      setTimer(5);
    }
  };

  const handleSelectedAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleStartAgain = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setShowResult(false);
    setResult({
      score: 0,
      wrongAnswers: 0,
      correctAnswers: 0,
    });
    setTimer(5);
  };

  const handleSubmit = () => {
    let score = result.score;
    let correctAnswers = result.correctAnswers;
    let wrongAnswers = result.wrongAnswers;

    if (answer === selectedAnswer) {
      score += 1;
      correctAnswers += 1;
    } else {
      wrongAnswers += 1;
    }

    if (currentQuestion === questions.length - 1) {
      setShowResult(true);
    } else {
      setResult((prev) => ({
        ...prev,
        score: score,
        correctAnswers: correctAnswers,
        wrongAnswers: wrongAnswers,
      }));
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer("");
      setTimer(5);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#7373E3]">
      {showResult ? (
        <div className="w-[500px] h-[500px] p-6 gap-8 flex flex-col bg-[#ffd166]">
          <h3 className="text-center text-2xl font-bold">Result</h3>
          <p className="font-medium text-lg">
            Total Question:{" "}
            <span className="font-bold text-xl bg-[#ffffff] p-1">
              {questions.length}
            </span>
          </p>
          <p className="font-medium text-lg">
            Total Score:{" "}
            <span className="font-bold text-xl bg-[#ffffff] p-1">
              {result.score}
            </span>
          </p>
          <p className="font-medium text-lg">
            Correct Answers:{" "}
            <span className="font-bold text-xl bg-[#ffffff] p-1">
              {result.score}
            </span>
          </p>
          <p className="font-medium text-lg">
            Wrong Answers:{" "}
            <span className="font-bold text-xl bg-[#ffffff] p-1">
              {questions.length - result.score}
            </span>
          </p>

          <button
            className="rounded w-[100px] bg-[#2d6460] px-6 font-semibold py-2 text-sm text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-[#333333]"
            onClick={handleStartAgain}
          >
            Restart
          </button>
        </div>
      ) : (
        <div className="w-[500px] h-[500px] p-6 flex flex-col bg-[#ffd166] text-[#010141]">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-[#ffffff] px-1 rounded-sm">
              <span className="text-2xl font-bold">{currentQuestion + 1}</span>
              <span className="text-lg font-medium">/</span>
              <span className="text-sm font-medium">{questions.length}</span>
            </div>
            <h1 className="text-4xl font-semibold text-center mt-6">Quiz</h1>
            <div className="bg-[#ffffff] px-2 py-1 rounded-md">
              <span className="text-sm font-medium">Time:</span>{" "}
              <span className="text-lg font-bold">{timer}</span>
            </div>
          </div>

          <h6 className="text-lg font-medium mb-4">{question}</h6>
          <ul className="pl-6">
            {options &&
              options.map((answer, index) => (
                <li
                  key={index}
                  className={`text-left py-1 ${
                    selectedAnswer === options[index]
                      ? " font-bold bg-[#2b953e] text-xl border rounded-md px-1"
                      : ""
                  }`}
                  onClick={() => handleSelectedAnswer(answer)}
                >
                  {answer}
                </li>
              ))}
          </ul>
          <div className="flex justify-between mt-6">
            <button
              className="rounded bg-gray-700 px-6  font-semibold py-2 text-sm text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-[#333333]"
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
            >
              Prev
            </button>
            {currentQuestion === questions.length - 1 ? (
              <button
                className="rounded bg-[#E94B3CFF] px-6 font-semibold py-2 text-sm text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-[#333333]"
                onClick={handleSubmit}
              >
                Submit
              </button>
            ) : (
              <button
                className="rounded bg-[#2d6460] px-6 font-semibold py-2 text-sm text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-[#333333]"
                onClick={handleNextQuestion}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
