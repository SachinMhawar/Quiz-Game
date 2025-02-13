"use strict";
// const readline = require('readline-sync');
Object.defineProperty(exports, "__esModule", { value: true });
// interface Question {
//     question: string;
//     options: string[];
//     correctAnswer: number;
//     hint: string;
//   }
// function Options(): void {
//     console.log('=== Quiz Game ===');
//     console.log('1. Play Quiz');
//     console.log('2. Add a Question');
//     console.log('3. View All Questions');
//     console.log('4. Delete a Question');
//     console.log('5. View High Scores');
//     console.log('6. Exit');
//   }    
// function main() {
//     let choice: number;
//     do {
//       Options();
//       choice = parseInt(readline.question('Enter your choice (1-6): '), 10);
//       switch (choice) {
//         case 1:
//           console.log('Starting Quiz...');
//           // Add your quiz logic here
//           break;
//         case 2:
//           console.log('Add a new question...');
//           // Logic to add a question
//           break;
//         case 3:
//           console.log('Displaying all questions...');
//           // Logic to view questions
//           break;
//         case 4:
//           console.log('Delete a question...');
//           // Logic to delete a question
//           break;
//         case 5:
//           console.log('Viewing high scores...');
//           // Logic to view high scores
//           break;
//         case 6:
//           console.log('Exiting...');
//           break;
//         default:
//           console.log('Invalid choice, please enter a number between 1-6.');
//       }
//     } while (choice !== 6);
//   }
//   main();
var readlineSync = require("readline-sync");
var Quiz = /** @class */ (function () {
    function Quiz() {
        this.questions = [];
        this.score = 0;
    }
    Quiz.prototype.addQuestion = function (question) {
        this.questions.push(question);
        console.log('Question added successfully!');
    };
    Quiz.prototype.viewQuestions = function () {
        this.questions.forEach(function (q, index) {
            console.log("".concat(index + 1, ". ").concat(q.question));
            q.options.forEach(function (opt, i) { return console.log("   ".concat(i + 1, ". ").concat(opt)); });
        });
    };
    Quiz.prototype.deleteQuestion = function (index) {
        if (index >= 0 && index < this.questions.length) {
            this.questions.splice(index, 1);
            console.log('Question deleted successfully!');
        }
        else {
            console.log('Invalid index!');
        }
    };
    Quiz.prototype.shuffleQuestions = function () {
        var _a;
        for (var i = this.questions.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [this.questions[j], this.questions[i]], this.questions[i] = _a[0], this.questions[j] = _a[1];
        }
    };
    Quiz.prototype.play = function () {
        this.shuffleQuestions();
        this.score = 0;
        for (var i = 0; i < this.questions.length; i++) {
            console.log("Q".concat(i + 1, ": ").concat(this.questions[i].question));
            this.questions[i].options.forEach(function (opt, idx) { return console.log("".concat(idx + 1, ". ").concat(opt)); });
            var useHint = readlineSync.keyInYN('Do you want to use a hint? (Costs 1 point)');
            if (useHint) {
                this.score -= 1;
                console.log("Hint: ".concat(this.questions[i].hint));
            }
            var answer = readlineSync.questionInt('Your answer: ');
            if (answer === this.questions[i].correctAnswer) {
                console.log('Correct!');
                this.score += 1;
            }
            else {
                console.log('Wrong!');
            }
        }
        console.log("Your final score is: ".concat(this.score));
    };
    return Quiz;
}());
function main() {
    var quiz = new Quiz();
    while (true) {
        console.log('\n=== Quiz Game ===');
        console.log('1. Play Quiz');
        console.log('2. Add a Question');
        console.log('3. View All Questions');
        console.log('4. Delete a Question');
        console.log('5. View High Scores');
        console.log('6. Exit');
        var choice = readlineSync.questionInt('Enter your choice (1-6): ');
        switch (choice) {
            case 1:
                quiz.play();
                break;
            case 2:
                var questionText = readlineSync.question('Enter the question: ');
                var options = [];
                for (var i = 0; i < 4; i++) {
                    options.push(readlineSync.question("Option ".concat(i + 1, ": ")));
                }
                var correct = readlineSync.questionInt('Enter the correct option number (1-4): ');
                var hint = readlineSync.question('Enter a hint: ');
                quiz.addQuestion({ question: questionText, options: options, correctAnswer: correct, hint: hint });
                break;
            case 3:
                quiz.viewQuestions();
                break;
            case 4:
                var delIndex = readlineSync.questionInt('Enter question number to delete: ') - 1;
                quiz.deleteQuestion(delIndex);
                break;
            case 5:
                console.log('High scores feature coming soon!');
                break;
            case 6:
                console.log('Exiting...');
                return;
            default:
                console.log('Invalid choice, try again!');
        }
    }
}
main();
