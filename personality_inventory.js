//Function to create object with inventory  of questions pulling from the hidden p elements inside the secion.gh-content element.
//This allows the CMS to to provide the test data in the form of stylesheet hidden <p> tags in the content response.
function extractQuestions() {

  //Load document HTML and create a parser to pull the text/html from hidden p tags inside the section.gh-content block.
  const htmlString = document.documentElement.innerHTML;
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const pTags = doc.querySelectorAll('section.gh-content p');
  const pObject = {};

  //Loop through the gathered p tags (questions and answers) and create an indexed object from them.
  pTags.forEach((pTag, index) => {
    pObject[`${index + 1}`] = pTag.textContent.trim();
  });

  //Return the object of questions and answers.
  return pObject;

}

//Function to populate initial question and answer options to div#currentQuestion, starting at question #1.
function populateQuestions(testInput, index) {

//## Debug logging ## Uncomment to see in console. 
//  console.log(); //
//  console.log(Object.keys(testInput).length); //Write total number of questions found in the current test to the console.
//  console.log(testInput); //Write the current tests object to the console.
//  console.log(testInput[index].split('\t')[0]); //Write the current question to the console.
//  console.log(testInput[index].split('\t')[1]); //Write the current answer options to the console.

  //Populate question text, index 0 after splitting by tab delineation.
  document.getElementById("currentQuestion").innerHTML = testInput[index].split('\t')[0];

  //Get the number of answers associated with the indexed quesiton to decide how many answer options to display.
  let numberOfAnswerOptions = testInput[index].split('\t')[1].split(',').length;

  //Create an object of the answer button options using the class name answerOptions. 
  let answerOptionButtons = document.getElementsByClassName("answerOptions");

  //Toggle answer options based off the number available, must be at least one option, in which case it is assumed that the answer should be free-form text.
  switch(numberOfAnswerOptions) {

    //Providing a single answer option (cannot be 0 for now, will update) is equivalent to providing only free-form text as an answer.
    case 1:
      answerOptionButtons[0].innerText = "";
      answerOptionButtons[1].innerText = "";
      answerOptionButtons[2].innerText = "";
      answerOptionButtons[3].innerText = "";
      answerOptionButtons[0].style.display = 'none';
      answerOptionButtons[1].style.display = 'none';
      answerOptionButtons[2].style.display = 'none';
      answerOptionButtons[3].style.display = 'none';
      break;

    //Providing any other N<=4 will display each answer as a button and the free-form text box. 
    case 2:
      answerOptionButtons[0].innerText = testInput[index].split('\t')[1].split(',')[0];
      answerOptionButtons[1].innerText = testInput[index].split('\t')[1].split(',')[1];
      answerOptionButtons[2].innerText = "";
      answerOptionButtons[3].innerText = "";
      answerOptionButtons[0].style.display = 'inline';
      answerOptionButtons[1].style.display = 'inline';
      answerOptionButtons[2].style.display = 'none';
      answerOptionButtons[3].style.display = 'none';
      break;
    case 3:
      answerOptionButtons[0].innerText = testInput[index].split('\t')[1].split(',')[0];
      answerOptionButtons[1].innerText = testInput[index].split('\t')[1].split(',')[1];
      answerOptionButtons[2].innerText = testInput[index].split('\t')[1].split(',')[2];
      answerOptionButtons[3].innerText = "";
      answerOptionButtons[0].style.display = 'inline';
      answerOptionButtons[1].style.display = 'inline';
      answerOptionButtons[2].style.display = 'inline';
      answerOptionButtons[3].style.display = 'none';
      break;
    case 4:
      answerOptionButtons[0].innerText = testInput[index].split('\t')[1].split(',')[0];
      answerOptionButtons[1].innerText = testInput[index].split('\t')[1].split(',')[1];
      answerOptionButtons[2].innerText = testInput[index].split('\t')[1].split(',')[2];
      answerOptionButtons[3].innerText = testInput[index].split('\t')[1].split(',')[3];
      answerOptionButtons[0].style.display = 'inline';
      answerOptionButtons[1].style.display = 'inline';
      answerOptionButtons[2].style.display = 'inline';
      answerOptionButtons[3].style.display = 'inline';
      break;

    //Default behavior is to show no buttons and only free-form text input. This would only be in case of error.
    default:
      answerOptionButtons[0].innerText = "";
      answerOptionButtons[1].innerText = "";
      answerOptionButtons[2].innerText = "";
      answerOptionButtons[3].innerText = "";
      answerOptionButtons[0].style.display = 'none';
      answerOptionButtons[1].style.display = 'none';
      answerOptionButtons[2].style.display = 'none';
      answerOptionButtons[3].style.display = 'none';
  }

  //Address special case of the first question where you should not be able to move back by disabling the Previous button.
  if(currentQuesitonNumber == 1){

    //If on the first question, disable the Previous button.
    document.getElementById("previousQuestion").disabled = true;

  }else{

    //If not, ensure the previous button is enabled.
    document.getElementById("previousQuestion").disabled = false;

  }

  //Address special case of the last question where you should not be able to move forward. This will also be the end state trigger.
  if(currentQuesitonNumber == Object.keys(testInput).length){

    //If on the last question, disable the next button. End state.
    document.getElementById("nextQuestion").disabled = true;

  }else{

   //If not, ensure the Next button is enabled.
    document.getElementById("nextQuestion").disabled = false;

  }

}

//Function to move to next question, to be called onClick on Next button. //Event handlers to be moved out of HTML later.
function moveToNextQuestion() {

  //When called, add 1 to the currentQuestionNumber.
  currentQuesitonNumber++;

  //Re-populate current question with the next questions data.
  populateQuestions(currentTest, currentQuesitonNumber);

}

//Function to move to next question, to be called onClick on Next button. //Event handlers to be moved out of HTML later.
function moveToPreviousQuestion() {
  
  //When called, subtract 1 from the current Question number.
  currentQuesitonNumber--;

  //Re-populate current question with the next questions data.
  populateQuestions(currentTest, currentQuesitonNumber);

}

//Set the currentTest object to the result of the extract questions function. This creates the test object when the user loads the page compiling the questions and answers from hidden HTML elements provided by the CMS.
let currentTest = extractQuestions();

//Initialize the question index at question 1.
let currentQuesitonNumber = 1;

//Start the test by populating the first question and answer sets.
populateQuestions(currentTest, currentQuesitonNumber);
