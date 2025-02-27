import React, { useEffect, useState } from "react";

function QuestionHistory() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Retrieve the stored questions as an array
    const storedQuestions = JSON.parse(localStorage.getItem("questionHistory")) || [];
    
    // Ensure storedQuestions is an array of full questions
    if (Array.isArray(storedQuestions)) {
      setQuestions(storedQuestions);
    } else {
      setQuestions([]); // Fallback in case of incorrect format
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <h1 className="text-2xl font-bold mb-5 text-center">Question History</h1>
      
      {questions.length === 0 ? (
        <p className="text-gray-600">No questions recorded yet.</p>
      ) : (
        <div className="w-full max-w-xl space-y-4">
          {questions.map((question, index) => (
            <div 
              key={index} 
              className="bg-white shadow-lg rounded-lg p-4 text-lg font-medium text-gray-800 border-l-4 border-blue-500"
            >
              {question}  {/* Ensures full question is displayed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuestionHistory;
