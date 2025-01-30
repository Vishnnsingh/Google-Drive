import React from 'react'
import { useState, useRef, useEffect } from "react";
// import "./App.css";
import axios from "axios";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { GiThink } from "react-icons/gi";
import  '../chat/Chat.css'
import Chats from '../../assets/Chat.jpg'
import Close from '../../assets/Close.jpg'

const Chat = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [isAppOpen, setIsAppOpen] = useState(false); // State for toggling app visibility

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;

    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion(""); // Clear input immediately after sending

    // Add user question to chat history
    setChatHistory((prev) => [...prev, { type: "question", content: currentQuestion }]);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
          import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
        }`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });

      const aiResponse = response.data.candidates[0].content.parts[0].text;
      setChatHistory((prev) => [...prev, { type: "answer", content: aiResponse }]);
      setAnswer(aiResponse);
    } catch (error) {
      console.error(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }
    setGeneratingAnswer(false);
  }

  return (

    <>
    

   
      <button
        onClick={() => setIsAppOpen(!isAppOpen)}
        className="toggle-button"
      >
        {isAppOpen ? <img  className="close" src={Close} alt="" />
 : <img  className="chht" src={Chats} alt="" />}
        
      </button>

    <div className="chat">
     

      {isAppOpen && (
        <div className="app-container hide-scrollbar">
          <header className="header">
              <h1 className="header-title">Chat AI </h1>
            
          </header>

          <div ref={chatContainerRef} className="chat-container">
            {chatHistory.length === 0 ? (
              <div className="welcome-container">
                <div className="welcome-message">
                  <h2 className="welcome-title">How may i help you </h2>
                  <p className="instructions">Just type your question below and press Enter or click Send!</p>
                </div>
              </div>
            ) : (
              <>
                {chatHistory.map((chat, index) => (
                  <div
                    key={index}
                    className={`chat-item ${
                      chat.type === "question" ? "chat-question" : "chat-answer"
                    }`}
                  >
                    <div className="chat-bubble">{chat.content}</div>
                  </div>
                ))}
              </>
            )}
            {generatingAnswer && (
              <div className="chat-item chat-answer">
                <div className="chat-bubble thinking"><GiThink />
                </div>
              </div>
            )}
          </div>

          <form onSubmit={generateAnswer} className="input-container">
            <textarea
              required
              className="input-textarea"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything..."
              rows="2"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  generateAnswer(e);
                }
              }}
            ></textarea>
            <button
              type="submit"
              className={`input-button ${generatingAnswer ? "disabled" : ""}`}
              disabled={generatingAnswer}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>


    
    
    </>
  );
}

export default Chat
