var quiz = {
  // (A) PROPERTIES
  // (A1) QUESTIONS & ANSWERS
  // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
  data: [
    {
      q: "Who is the android officer on the Enterprise?",
      o: ["Worf", "Data", "Riker", "Leon"],
      a: 1, // arrays start with 0, so answer is Data
    },
    {
      q: "What is the name of the secret organization that works behind the scenes to protect the Federation?",
      // o: ["Starfleet Intelligence", "Obsidian Order", "Tal Shiar", "Section 31"],
      o: ["Head of Intelligence", "Article 47", "100th Div", "Section 31"],
      a: 3,
    },
    {
      q: "What is the name of the Klingon home world?",
      o: ["Romulus", "Risa", "Ferenginar", "Qo'noS"],
      a: 3,
    },
    {
      q: "What is the name of the superweapon capable of destroying entire planets?",
      o: ["Planet Killer", "Death Star", "Omega Particle", "Wesley's Crusher"],
      a: 0,
    },
    {
      q: "Who is the former Borg drone who joins the crew of the Enterprise?",
      o: ["Seven of Nine", "Icheb", "Hugh", "Elon"],
      a: 2,
    },
  ],

  // (A2) HTML ELEMENTS
  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrapper
  hAns: null, // HTML answers wrapper

  // (A3) GAME FLAGS
  now: 0, // current question
  score: 0, // current score

  // (B) INIT QUIZ HTML
  init: () => {
    // (B1) WRAPPER
    quiz.hWrap = document.getElementById("quizWrap");

    // (B2) QUESTIONS SECTION
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    // (B3) ANSWERS SECTION
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    // (B4) GO!
    quiz.draw();
  },

  // (C) DRAW QUESTION
  draw: () => {
    // (C1) QUESTION
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;

    // (C2) OPTIONS
    quiz.hAns.innerHTML = "";
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", () => {
        quiz.select(label);
      });
      quiz.hAns.appendChild(label);
      document.querySelector("#qCounter").innerText= ` Star Trek Quiz • Q ${quiz.now + 1}/${quiz.data.length}` //MJR added question counter
    }
  },

  // (D) OPTION SELECTED
  select: (option) => {
    // (D1) DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    // (D2) CHECK IF CORRECT
    let correct = option.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++; //add point
      option.classList.add("correct"); //make green
      option.innerText+=" \u2714"
    } else {
      option.classList.add("wrong"); //make red
      option.innerText+=" \uFF58"
    }

    // (D3) NEXT QUESTION OR END GAME
    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) {
        quiz.draw();
      } else {
        quiz.hQn.innerHTML = `You answered ${quiz.score} out of ${quiz.data.length} questions correctly.`;
        quiz.hAns.innerHTML = "";
      }
    }, 1000); //time to be auto-forwarded to next question
  },

  // (E) RESTART QUIZ
  reset: () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  },
};
window.addEventListener("load", quiz.init);