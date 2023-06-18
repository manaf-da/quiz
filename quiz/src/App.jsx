import { useState } from "react";
import { quiz } from "./data.js";

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const { questions } = quiz;
  const { question, options, correctAnswer } = questions[currentQuestion];

  const handlePrevQuestion = () => {
    setCurrentQuestion((prev) => prev - 1);
    setSelectedAnswer("");
    setShowResult(false);
  };

  const handleNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
    setSelectedAnswer("");
    setShowResult(false);
  };

  const handleSelectedAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleQuizSubmit = () => {
    const currentAnswer = selectedAnswer.toLowerCase();
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].selectedAnswer = currentAnswer;

    const correctAnswers = updatedQuestions.reduce((count, q) => {
      return q.correctAnswer.toLowerCase() === q.selectedAnswer
        ? count + 1
        : count;
    }, 0);
    const wrongAnswers = updatedQuestions.length - correctAnswers;
    const score = correctAnswers;

    setResult({
      score: score,
      correctAnswers: correctAnswers,
      wrongAnswers: wrongAnswers,
    });

    setShowResult(true);
  };

  const handleStartAgain = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setShowResult(false);
    setResult({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
  };

  return (
    <div className="h-screen flex justify-center items-center">
      {!showResult ? (
        <div className="w-[500px] h-[500px] p-6 flex flex-col bg-[#ffd166]">
          <div className="flex items-center justify-between mb-4 relative">
            <div className="bg-[#ffffff] px-1 rounded-sm absolute right-0 top-0  ">
              <span className="text-2xl font-bold">{currentQuestion + 1}</span>
              <span className="text-lg font-medium">/</span>
              <span className="text-sm font-medium"> {questions.length}</span>
            </div>
            <h1 className="text-4xl font-semibold text-center mt-6">Quiz</h1>
          </div>

          <h6 className="text-lg font-medium mb-4">{question}</h6>
          <ul className=" pl-6">
            {options.map((answer, index) => (
              <li
                key={index}
                className={`text-left py-1   ${
                  selectedAnswer === answer
                    ? "font-bold bg-[#edede9] border rounded-md "
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
              className="rounded bg-gray-700 px-6 font-semibold py-2 text-sm text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-[#333333]"
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
            >
              Prev
            </button>
            {currentQuestion === questions.length - 1 ? (
              <button
                className="rounded bg-[#E94B3CFF] px-6 font-semibold py-2 text-sm text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-[#333333]"
                onClick={handleQuizSubmit}
                disabled={!selectedAnswer}
              >
                Next
              </button>
            ) : (
              <button
                className="rounded bg-[#E94B3CFF] px-6 font-semibold py-2 text-sm text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-[#333333]"
                onClick={handleNextQuestion}
                disabled={currentQuestion === questions.length - 1}
              >
                Next
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="w-[500px] h-[500px] p-6 gap-8 flex flex-col bg-[#ffd166]">
            <h3 className="text-center text-2xl  font-bold">Result</h3>
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
                {result.correctAnswers}
              </span>
            </p>
            <p className="font-medium text-lg">
              Wrong Answers:{" "}
              <span className="font-bold text-xl bg-[#ffffff] p-1">
                {result.wrongAnswers}
              </span>
            </p>

            <button
              className="rounded w-[100px] bg-[#2d6460] px-6 font-semibold py-2 text-sm text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-[#333333]"
              onClick={handleStartAgain}
            >
              Restart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
