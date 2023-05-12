var quiz = {

  // questions
  // q: question, o: options, a: index of correct answer
  data: [
    {
      q: "Who is the android officer on the Enterprise?",
      o: ["Worf", "Data", "Riker", "Leon"],
      a: 1, // arrays start with 0, so answer is Data
    },
    {
      q: "What is the name of the secret organization that works behind the scenes to protect the Federation?",
      o: ["Head of Intelligence", "Article 47", "100th Div", "Section 31"],
      a: 3,
    },
    {
      q: "What is the name of the Klingon home world?",
      o: ["Romulus", "Risa", "Boreth", "Qo'noS"],
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
    {
      q: "Which of the following is a space battle tactic?",
      o: ["Riker Roll", "Picard Maneuver", "McCoy Decoy", "Data Cascade"],
      a: 1,
    },    
    {
      q: "Which book does <q>Sometimes the only thing more dangerous than a question is an answer.</q> come from?",
      o: ["Surak's Kir'Shara", "Rules Of Acquisition", "The Holy Bible", "Macbeth"],
      a: 1,
    },
    {
      q: "What is the name of the omnipotent alien entity encountered multiple times in Star Trek: The Next Generation?",
      o: ["Q", "W", "E", "R"],
      a: 0,
    },
    {
      q: "Who is Captain Janeway's main adversary near the end of USS Voyager's journey home?",
      o: ["The Caretaker", "The Scorpion King", "The Borg Queen", "Ambassador Neelix"],
      a: 2,
    },
    //last question
    {
      q: "How many lights are there?",
      o: ["1", "2", "4", "5"],
      a: 2,
    },
  ],

  // HTML elements
  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrapper
  hAns: null, // HTML answers wrapper

  // flags
  now: 0, // current question
  score: 0, // current score

  // initialize quiz HTML
  init: () => {
    // wrapper
    quiz.hWrap = document.getElementById("quizWrap");

    // question section
    quiz.hQn = document.createElement("div");
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    // answers section
    quiz.hAns = document.createElement("div");
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    // let's go!
    quiz.draw();
  },

  // draw question
  draw: () => {
    // question
    quiz.hQn.innerHTML = quiz.data[quiz.now].q;

    // options (buttons)
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
      document.querySelector("#qCounter").innerText= `Star Trek Quiz \u2022 Q ${quiz.now + 1}/${quiz.data.length}` //question counter
    }
  },

  // option (button) selected
  select: (option) => {
    // detach all on click
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    // check if answer correct
    let correct = option.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++; //add point
      option.classList.add("correct"); //make green
      option.innerText+=" \u2714"; //add checkmark
    } else {
      option.classList.add("wrong"); //make red
      option.innerText+=" \uFF58"; //add X
    }

    // next question or end game?
    quiz.now++;
    setTimeout(() => {
      if (quiz.now < quiz.data.length) {
        quiz.draw();
      } else {
        if(quiz.data.length === quiz.score){
          quiz.hQn.innerHTML = `Perfect! You answered ${quiz.score} out of ${quiz.data.length} questions correctly.<br><br>
          <q>You may find that having is not so pleasing a thing as wanting. This is not logical, but it is often true.</q> — Spock`;
          quiz.hAns.innerHTML = "";
        }else if(quiz.score === quiz.data.length - 1){
          quiz.hQn.innerHTML = `You answered ${quiz.score} out of ${quiz.data.length} questions correctly.<br><br>
          <q>It is the lot of ‘man’ to strive no matter how content he is.</q> — Spock<br><br>
          Visit <a href="https://memory-alpha.fandom.com/wiki/" target="_blank">Memory Alpha</a> for further study`;
          quiz.hAns.innerHTML = "";
        }else if(quiz.score / quiz.data.length >= 0.7){
          quiz.hQn.innerHTML = `You answered ${quiz.score} out of ${quiz.data.length} questions correctly.<br><br>
          <q>A library serves no purpose unless someone is using it.</q> — Mr. Atoz<br><br>
          Visit <a href="https://memory-alpha.fandom.com/wiki/" target="_blank">Memory Alpha</a> for further study`;
          quiz.hAns.innerHTML = "";
        }
        else if(quiz.score / quiz.data.length >= 0.5){
          quiz.hQn.innerHTML = `You answered ${quiz.score} out of ${quiz.data.length} questions correctly.<br><br>
          <q>There is a way out of every box, a solution to every puzzle; it’s just a matter of finding it.</q> — Picard<br><br>
          Visit <a href="https://memory-alpha.fandom.com/wiki/" target="_blank">Memory Alpha</a> for further study`;
          quiz.hAns.innerHTML = "";
        }else if(quiz.score / quiz.data.length >= 0.3){
          quiz.hQn.innerHTML = `You answered ${quiz.score} out of ${quiz.data.length} questions correctly.<br><br>
          <q>Things are only impossible until they’re not.</q> — Picard<br><br>
          Visit <a href="https://memory-alpha.fandom.com/wiki/" target="_blank">Memory Alpha</a> for further study`;
          quiz.hAns.innerHTML = "";
        }else if(quiz.score / quiz.data.length > 0){
          quiz.hQn.innerHTML = `You answered ${quiz.score} out of ${quiz.data.length} questions correctly.<br><br>
          <q>Another dream that failed. There’s nothing sadder.</q> — James T. Kirk<br><br>
          Visit <a href="https://memory-alpha.fandom.com/wiki/" target="_blank">Memory Alpha</a> for further study`;
          quiz.hAns.innerHTML = "";
        }else if(quiz.score === 0){
          quiz.hQn.innerHTML = `You answered ${quiz.score} out of ${quiz.data.length} questions correctly.
          <br><br>
          <q>Damn it, Jim!</q> — Dr. McCoy<br><br>
          Visit <a href="https://memory-alpha.fandom.com/wiki/" target="_blank">Memory Alpha</a> for further study`;
          quiz.hAns.innerHTML = "";
        }
        //this is just here for edge cases
        else{
          quiz.hQn.innerHTML = `You answered ${quiz.score} out of ${quiz.data.length} questions correctly.`;
          quiz.hAns.innerHTML = "";

        }

        
      }
    }, 1000); //time to be auto-forwarded to next question
  },

  // restart quiz
  reset: () => {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  },
};
window.addEventListener("load", quiz.init);