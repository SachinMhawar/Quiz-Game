import * as readlineSync from 'readline-sync';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
}

class Quiz {
  private questions: Question[] = [];
  private score: number = 0;

  addQuestion(q: Question) {
    this.questions.push(q);
    console.log('Question added!');
  }

  viewQuestions() {
    this.questions.forEach((q, i) => {
      console.log(`${i + 1}. ${q.question}`);
      q.options.forEach((opt, idx) => console.log(`   ${idx + 1}. ${opt}`));
    });
  }

  deleteQuestion(i: number) {
    if (i >= 0 && i < this.questions.length) {
      this.questions.splice(i, 1);
      console.log('Deleted!');
    } else {
      console.log('Invalid number!');
    }
  }

  play() {
    this.questions.sort(() => Math.random() - 0.5);
    this.score = 0;
    for (let q of this.questions) {
      console.log(q.question);
      q.options.forEach((opt, i) => console.log(`${i + 1}. ${opt}`));
      if (readlineSync.keyInYN('Use hint? (Costs 1 point)')) {
        this.score--;
        console.log('Hint:', q.hint);
      }
      const ans = readlineSync.questionInt('Your answer: ');
      if (ans === q.correctAnswer) {
        console.log('Correct!');
        this.score++;
      } else {
        console.log('Wrong!');
      }
    }
    console.log('Final score:', this.score);
  }
}

function main() {
  const quiz = new Quiz();
  while (true) {
    console.log('\n=== Quiz Game ===');
    console.log('1. Play Quiz');
    console.log('2. Add Question');
    console.log('3. View Questions');
    console.log('4. Delete Question');
    console.log('5. Exit');
    const choice = readlineSync.questionInt('Enter your choice (1-5): ');

    if (choice === 1) quiz.play();
    else if (choice === 2) {
      const q = readlineSync.question('Question: ');
      const opts = [
        readlineSync.question('Option 1: '),
        readlineSync.question('Option 2: '),
        readlineSync.question('Option 3: '),
        readlineSync.question('Option 4: ')
      ];
      const correct = readlineSync.questionInt('Correct option (1-4): ');
      const hint = readlineSync.question('Hint: ');
      quiz.addQuestion({ question: q, options: opts, correctAnswer: correct, hint });
    } else if (choice === 3) quiz.viewQuestions();
    else if (choice === 4) {
      const i = readlineSync.questionInt('Delete question number: ') - 1;
      quiz.deleteQuestion(i);
    } else if (choice === 5) break;
    else console.log('Invalid choice!');
  }
}

main();
