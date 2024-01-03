import React, { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import { toast } from 'react-toastify'; // Asumo que tienes una librería de notificaciones como react-toastify instalada
import useSound from 'use-sound';
const socket = io('ws://localhost:5000');
import reloj from './assets/sonido/reloj.mp3'

function App() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [info, setInfo] = useState(false);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [seconds, setSeconds] = useState();
  const [scores, setScores] = useState([]);
  const [winner, setWinner] = useState();
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [joinMessage, setJoinMessage] = useState('');
  const [gameMode, setGameMode] = useState(null);
  const [imagen, setImagen] = useState('');
  const [playersAndScores, setPlayersAndScores] = useState([]);
  const [playsound]=useSound(reloj);


  const handleModeClick = (gameMode) => {
    setGameMode(gameMode);
    if (mode === 'solo') {
      setInfo(true);
      socket.emit('getQuestions'); // Cambia esto para emitir 'getQuestions' en lugar de 'getFirstQuestion'
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (name && room) {
      setInfo(true);
      if (gameMode === 'solo') {
        socket.emit('getQuestions', room);
      }
    }
  }

  const handleAnswer = (answerIndex) => {
    if (!answered) {
      setSelectedAnswerIndex(answerIndex);
      socket.emit('submitAnswer', room, answerIndex); // Asegúrate de enviar la sala y la respuesta al servidor
      setAnswered(true);
    }
  };

  useEffect(() => {
    // Exit the effect when the timer reaches 0
    if (seconds === 0) return;
    // Create an interval to decrement the time every second
    const timerInterval = setInterval(() => {
      setSeconds((prevTime) => prevTime - 1);
    }, 1000);
    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(timerInterval);
    };
  }, [seconds]);

  useEffect(() => {
    if (name) {
      socket.emit('joinRoom', room, name);
    }
  }, [info]);

  useEffect(() => {
    socket.on('message', (message) => {
      setJoinMessage(`${message} !!`);
      setTimeout(() => {
        setJoinMessage('');
      }, 3000);
    });
    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    socket.on('newQuestion', (data) => {
      setQuestion(data.question);
      setOptions(data.answers);
      setAnswered(false);
      setSeconds(data.timer);
      setSelectedAnswerIndex(null); // Corregido el valor inicial
      setImagen(data.imagen);
    });

    socket.on('answerResult', (data) => {
      if (data.isCorrect) {
        toast(`¡Correcto! ${data.playerName} lo ha acertado.`, {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
        });
      }
      setScores(data.scores);
    });

    socket.on('gameOver', (data) => {
      setWinner(data.winner);
      // Mostrar todos los jugadores y puntajes
      const playersAndScores = data.players.map((player) => (
        <p key={player.id}>
          {player.name}: {player.score} /5
        </p>
      ));
      setPlayersAndScores(playersAndScores);
    });

    return () => {
      socket.off('newQuestion');
      socket.off('answerResult');
      socket.off('gameOver');
    };
  }, []);

  if (winner) {
    return (
      <div className="winner-container">
        <h1> {winner} Ha Ganado. </h1>
        {playersAndScores && (
          <div className="scores-container">
            <h2>Tabla de puntajes</h2>
            {scores.map((player, index) => (
              <p key={index}>
                {player.name}: {player.score}
              </p>
              
            ))}
          </div>
          
        )}
        
      </div>
    );
  }

  return (
    <div className='App'>
      {!gameMode ? (
        <div className='welcome-div'>
          <h2>Bienvenidos <br /> a</h2>
          <h1>Play Quiz</h1>
          <p>Selecciona un modo de juego:</p>
          <div>
            <button onClick={() => handleModeClick('solo')}>Solitario</button>
            <button onClick={() => handleModeClick('multijugador')}>Multijugador</button>
          </div>
        </div>
      ) : (
        !info ? (
          <div className='join-div'>
            <h1> Play Quiz!</h1>
            <form onSubmit={handleSubmit}>
              <input
                id='name'
                type='text'
                required
                placeholder='Ingresa tu nombre'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                id='room'
                type='text'
                required
                placeholder='Ingresa el nombre de la sala'
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
              <button className='join-btn' type='submit' onClick={playsound}>
                Unirse
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h1>PLAY QUIZ</h1>
            <p className='room-id'>Id Sala: {room}</p>
            {question ? (
              <div className='quiz-div'>
                <div className='timer'>
    <p>Quedan 00:{seconds} seg</p>
  </div>
    <div className='question'>
      <p className='question-text'>{question}</p>
      
    </div>
    {imagen && (
                  <div className='image-container'>
                    <img src={imagen} alt='Imagen de la pregunta' />
                  </div>
                )}
    <ul>
      {options.map((answer, index) => (
        <li key={index}>
          <button
            className={`options ${selectedAnswerIndex === index ? 'selected' : ''}`}
            onClick={() => handleAnswer(index)}
            disabled={answered}
            
          >
            {answer}
            
          </button>
        </li>
      ))}
    </ul>
    {scores.map((player, index) => (
      <p key={index}>
        {player.name}: {player.score} /5
      </p>
      
    ))}
    <h3>Objetivo: <br /> Responder 5 preguntas en el menor tiempo posible.</h3>
  </div>
) : (
  <p>Cargando las Preguntas....</p>
)}
          </div>
        )
      )}

      {joinMessage && (
        <div className='join-message-container'>
          <p className='join-message'>{joinMessage}</p>
        </div>
      )}
    </div>
  );
}

export default App;
