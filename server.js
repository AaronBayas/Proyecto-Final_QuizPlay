const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const { url } = require("inspector");
const app = express();

const server = http.createServer(app);
app.use(cors());
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5000;

const questions = [
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: "¿Cuál es la capital de Francia?",
    answers: [
      { text: "París", correct: true },
      { text: "Berlín", correct: false },
      { text: "Londres", correct: false },
      { text: "Madrid", correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: "¿Cuál es el símbolo químico del agua?",
    answers: [
      { text: "H2O", correct: true},
      { text: "CO2", correct: false},
      { text: "O2", correct: false },
      { text: "NaCl", correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: "¿Cuál es el planeta más grande de nuestro sistema solar?",
    answers: [
      { text: "Mercurio", correct: false },
      { text: "Venus", correct: false },
      { text: "Marte", correct: false},
      { text: "Júpiter", correct: true },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: "¿Cuál es el símbolo químico del hierro?",
    answers: [
      { text: "Fe", correct: true },
      { text: "Ag", correct: false },
      { text: "Au", correct: false },
      { text: "Cu", correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: "¿Qué científico famoso es conocido por la teoría de la evolución?",
    answers: [
      { text: "Galileo Galilei", correct: false },
      { text: "Isaac Newton", correct: false },
      { text: "Charles Darwin", correct: true },
      { text: "Marie Curie", correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: "¿En qué país se inventó el juego de ajedrez?",
    answers: [
      { text: "China", correct: false },
      { text: "India", correct: true },
      { text: "Grecia", correct: false },
      { text: "Egipto", correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: "¿Qué gas es responsable de la capa de ozono de la Tierra?",
    answers: [
      { text: "Oxígeno", correct: false },
      { text: "Dióxido de carbono", correct: false },
      { text: "Nitrógeno", correct: false },
      { text: "Ozono", correct: true },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: "¿Qué planeta es conocido como el Planeta Rojo?",
    answers: [
      { text: "Marte", correct: true },
      { text: "Venus", correct: false },
      { text: "Júpiter", correct: false },
      { text: "Saturno", correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: "¿Qué gas utilizan las plantas para la fotosíntesis?",
    answers: [
      { text: "Oxígeno", correct: false },
      { text: "Dióxido de carbono", correct: true },
      { text: "Nitrógeno", correct: false },
      { text: "Helio", correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: "¿Cuál es la capital de Japón?",
    answers: [
      { text: "Pekín", correct: false },
      { text: "Tokio", correct: true },
      { text: "Seúl", correct: false },
      { text: "Bangkok", correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: "¿Qué científico famoso desarrolló la teoría de la relatividad general?",
    answers: [
      { text: "Isaac Newton", correct: false },
      { text: "Albert Einstein", correct: true },
      { text: "Nikola Tesla", correct: false },
      { text: "Marie Curie", correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: "¿Qué país es conocido como la 'Tierra del Sol Naciente'?",
    answers: [
      { text: "China", correct: false },
      { text: "Japón", correct: true },
      { text: "India", correct: false },
      { text: "Egipto", correct: false },
    ],
    used: false,
  },
  {
    image: "https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: "¿Cuál es el símbolo químico del oro?",
    answers: [
      { text: "Ag", correct: false },
      { text: "Au", correct: true },
      { text: "Fe", correct: false },
      { text: "Hg", correct: false },
    ],
    used: false,
  },
  {
    imagen: "https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: "¿Qué planeta es conocido como la 'Estrella de la Mañana' o 'Estrella de la Tarde'?",
    answers: [
      { text: "Marte", correct: false },
      { text: "Venus", correct: true },
      { text: "Mercurio", correct: false },
      { text: "Neptuno", correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: "¿Cuál es el número primo más pequeño?",
    answers: [
      { text: "1", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false },
      { text: "5", correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: "¿Qué país es conocido como la 'Tierra del Sol Naciente'?",
    answers: [
      { text: "China", correct: false },
      { text: "Corea del Sur", correct: false },
      { text: "Japón", correct: true },
      { text: "Tailandia", correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: "¿Cuál es el océano más grande de la Tierra?",
    answers: [
      { text: "Océano Atlántico", correct: false },
      { text: "Océano Índico", correct: false },
      { text: "Océano Ártico", correct: false },
      { text: "Océano Pacífico", correct: true },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: "¿Qué elemento tiene el símbolo químico 'K'?",
    answers: [
      { text: "Kriptón", correct: false },
      { text: "Potasio", correct: true },
      { text: "Kriptonita", correct: false },
      { text: "Kalio", correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: "¿Cuál es la capital de la India?",
    answers: [
      { text: "Mumbai", correct: false },
      { text: "Nueva Delhi", correct: true },
      { text: "Bangalore", correct: false },
      { text: "Calcuta", correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: 'Química',
    difficulty: 'Fácil',
    question: '¿Cuál es el símbolo químico del oxígeno?',
    answers: [
      { text: 'O', correct: true },
      { text: 'Ox', correct: false },
      { text: 'Oy', correct: false },
      { text: 'Oz', correct: false },
    ],
    used: false,
  },
  // Preguntas de Ciencia
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: '¿Cuál es el componente principal del aire?',
    answers: [
      { text: 'Nitrógeno', correct: true },
      { text: 'Oxígeno', correct: false },
      { text: 'Dióxido de carbono', correct: false },
      { text: 'Argón', correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: '¿Cuál es la distancia promedio entre la Tierra y el Sol?',
    answers: [
      { text: '150 millones de kilómetros', correct: true },
      { text: '100 millones de kilómetros', correct: false },
      { text: '200 millones de kilómetros', correct: false },
      { text: '50 millones de kilómetros', correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: '¿Qué es la fotosíntesis?',
    answers: [
      { text: 'Proceso de conversión de luz en energía', correct: true },
      { text: 'Proceso de conversión de energía en luz', correct: false },
      { text: 'Proceso de descomposición de materia orgánica', correct: false },
      { text: 'Proceso de combustión en plantas', correct: false },
    ],
    used: false,
  },
  // Preguntas de Tecnología
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: '¿Quién es el fundador de Microsoft?',
    answers: [
      { text: 'Steve Jobs', correct: false },
      { text: 'Bill Gates', correct: true },
      { text: 'Mark Zuckerberg', correct: false },
      { text: 'Elon Musk', correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: '¿En qué año se lanzó el primer iPhone?',
    answers: [
      { text: '2005', correct: false },
      { text: '2007', correct: true },
      { text: '2010', correct: false },
      { text: '2012', correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: '¿Cuál es el sistema operativo de Android?',
    answers: [
      { text: 'iOS', correct: false },
      { text: 'Windows', correct: false },
      { text: 'Linux', correct: false },
      { text: 'Android', correct: true },
    ],
    used: false,
  },
  // Preguntas de Entretenimiento
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: '¿Cuál es la película más taquillera de todos los tiempos?',
    answers: [
      { text: 'Titanic', correct: false },
      { text: 'Avatar', correct: true },
      { text: 'Avengers: Endgame', correct: false },
      { text: 'Star Wars: El despertar de la fuerza', correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: '¿En qué año se lanzó la primera película de Star Wars?',
    answers: [
      { text: '1974', correct: false },
      { text: '1977', correct: true },
      { text: '1980', correct: false },
      { text: '1983', correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: '¿Cuántas películas componen la trilogía original de Jurassic Park?',
    answers: [
      { text: '2', correct: false },
      { text: '3', correct: true },
      { text: '4', correct: false },
      { text: '5', correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: '¿Qué elemento tiene el símbolo químico "Na"?',
    answers: [
      { text: 'Nitrógeno', correct: false },
      { text: 'Neodimio', correct: false },
      { text: 'Sodio', correct: true },
      { text: 'Níquel', correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: '¿Cuál es el símbolo químico del hidrógeno?',
    answers: [
      { text: 'H', correct: true },
      { text: 'He', correct: false },
      { text: 'Ho', correct: false },
      { text: 'Hi', correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: '¿Qué elemento tiene el símbolo químico "Fe"?',
    answers: [
      { text: 'Plata', correct: false },
      { text: 'Oro', correct: false },
      { text: 'Hierro', correct: true },
      { text: 'Helio', correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: '¿Cuál es el símbolo químico del carbono?',
    answers: [
      { text: 'C', correct: true },
      { text: 'Ca', correct: false },
      { text: 'Co', correct: false },
      { text: 'Cr', correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: '¿Qué elemento tiene el símbolo químico "Mg"?',
    answers: [
      { text: 'Magnesio', correct: true },
      { text: 'Manganio', correct: false },
      { text: 'Mercurio', correct: false },
      { text: 'Molibdeno', correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: '¿Cuál es el símbolo químico del zinc?',
    answers: [
      { text: 'Zn', correct: true },
      { text: 'Zm', correct: false },
      { text: 'Zc', correct: false },
      { text: 'Zu', correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: '¿Qué elemento tiene el símbolo químico "Cu"?',
    answers: [
      { text: 'Cobre', correct: true },
      { text: 'Cromo', correct: false },
      { text: 'Curio', correct: false },
      { text: 'Cesio', correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: '¿Cuál es el símbolo químico del plomo?',
    answers: [
      { text: 'Po', correct: false },
      { text: 'Pm', correct: false },
      { text: 'Pb', correct: true },
      { text: 'Pu', correct: false },
    ],
    used: false,
  },
  {
    imagen:"https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
    question: '¿Qué elemento tiene el símbolo químico "Ag"?',
    answers: [
      { text: 'Aluminio', correct: false },
      { text: 'Argón', correct: false },
      { text: 'Plata', correct: true },
      { text: 'Azufre', correct: false },
    ],
    used: false,
  },
];

const rooms = {};

io.on("connection", (socket) => {
  console.log("Un usuario conectado");

  socket.on("joinRoom", (room, name) => {
    socket.join(room);
    io.to(room).emit("message", `${name} se ha unido al juego`);
    if (!rooms[room]) {
      rooms[room] = {
        players: [],
        currentQuestion: null,
        correctAnswer: null,
        questionTimeout: null,
        shouldAskNewQuestion: true,
        askedQuestions: new Set(),
      };
    }
    rooms[room].players.push({ id: socket.id, name });

    if (!rooms[room].currentQuestion) {
      askNewQuestion(room);
    }
  });

  socket.on('getFirstQuestion', (room) => {
    const firstQuestion = questions[0];
    io.to(room).emit('newQuestion', {
      question: firstQuestion.question,
      answers: firstQuestion.answers.map((answer) => answer.text),
      timer: 10,
    });
  });

  socket.on('getQuestions', () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const question = questions[randomIndex];

    const room = Object.keys(socket.rooms)[1];

    io.to(room).emit('newQuestion', {
      question: question.question,
      answers: question.answers.map((answer) => answer.text),
      timer: 10,
    });
  });

  socket.on("submitAnswer", (room, answerIndex) => {
    const currentPlayer = rooms[room].players.find(
      (player) => player.id === socket.id
    );

    if (currentPlayer) {
      const correctAnswer = rooms[room].correctAnswer;
      const isCorrect = correctAnswer !== null && correctAnswer === answerIndex;
      currentPlayer.score = isCorrect
        ? (currentPlayer.score || 0) + 1
        : (currentPlayer.score || 0) - 1;

      clearTimeout(rooms[room].questionTimeout);

      io.to(room).emit("answerResult", {
        playerName: currentPlayer.name,
        isCorrect,
        correctAnswer,
        scores: rooms[room].players.map((player) => ({
          name: player.name,
          score: player.score || 0,
        })),
      });

      const winningThreshold = 5;
      const winner = rooms[room].players.find(
        (player) => (player.score || 0) >= winningThreshold
      );

      if (winner) {
        io.to(room).emit("gameOver", { winner: winner.name });
        delete rooms[room];
      } else {
        askNewQuestion(room);
      }
    }
  });

  socket.on("disconnect", () => {
    for (const room in rooms) {
      rooms[room].players = rooms[room].players.filter(
        (player) => player.id !== socket.id
      );

      if (rooms[room].players.length === 0) {
        clearTimeout(rooms[room].questionTimeout);
        delete rooms[room];
      }
    }

    console.log("Un usuario desconectado");
  });
});

app.get('/questions', (req, res) => {
  const firstQuestion = questions[0];
  res.json({
    question: firstQuestion.question,
    answers: firstQuestion.answers.map((answer) => answer.text),
    timer: 10,
  });
});

function askNewQuestion(room) {
  if (rooms[room].players.length === 0) {
    clearTimeout(rooms[room].questionTimeout);
    delete rooms[room];
    return;
  }

  const remainingQuestions = questions.filter(
    (_, index) => !rooms[room].askedQuestions.has(index)
  );

  if (remainingQuestions.length === 0) {
    io.to(room).emit("gameOver", { winner: "Nadie" });
    delete rooms[room];
    return;
  }

  const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
  const question = remainingQuestions[randomIndex];
  rooms[room].askedQuestions.add(questions.indexOf(question));

  rooms[room].currentQuestion = question;
  const correctAnswerIndex = question.answers.findIndex(
    (answer) => answer.correct
  );

  rooms[room].correctAnswer = correctAnswerIndex;
  rooms[room].shouldAskNewQuestion = true;
  io.to(room).emit("newQuestion", {
    question: question.question,
    answers: question.answers.map((answer) => answer.text),
    imagen: question.imagen, // Agrega esta línea para incluir la imagen
    timer: 10,
  });

  rooms[room].questionTimeout = setTimeout(() => {
    io.to(room).emit("answerResult", {
      playerName: "Nadie",
      isCorrect: false,
      correctAnswer: rooms[room].correctAnswer,
      scores: rooms[room].players.map((player) => ({
        name: player.name,
        score: player.score || 0,
      })),
    });

    askNewQuestion(room);
  }, 10000);
}


server.listen(PORT, () => {
  console.log(`El servidor se está ejecutando en el puerto ${PORT}`);
});
