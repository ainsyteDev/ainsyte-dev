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
//    console.log("Question Number:" + index); //Write the current question numnber to the console.
//    console.log("Total Questions in Current Test:" + Object.keys(testInput).length); //Write total number of questions found in the current test to the console.
//    console.log("Current Question:" + testInput[index].split('|')[0]); //Write the current question text to the console.
//    console.log("Current Answer Options:" + testInput[index].split('|')[1]); //Write the current answer options to the console.
//    console.log(testInput); //Write the current tests object to the console.

  //Populate question text, index 0 after splitting by pipe delineation.
  document.getElementById("currentQuestion").innerHTML = testInput[index].split('|')[0];

  //Get the number of answers associated with the indexed quesiton to decide how many answer options to display.
  let numberOfAnswerOptions = testInput[index].split('|')[1].split(',').length;

  //Create an object of the answer check box options using the class name answerOptions. 
  let answerOptionBoxes = document.getElementsByClassName("answerOptions");

  //create an object of the anser check box label options using the class name answerOptions-label.
  let answerOptionLabels = document.getElementsByClassName("answerOptions-label");

  //Toggle answer options based off the number available, must be at least one option, in which case it is assumed that the answer should be free-form text.
  switch(numberOfAnswerOptions) {

    //Providing a single answer option (cannot be 0 for now, will update) is equivalent to providing only free-form text as an answer.
    case 1:
      answerOptionBoxes[0].value = "";
      answerOptionBoxes[1].value = "";
      answerOptionBoxes[2].value = "";
      answerOptionBoxes[3].value = "";
      answerOptionBoxes[0].style.visibility = 'hidden';
      answerOptionBoxes[1].style.visibility = 'hidden';
      answerOptionBoxes[2].style.visibility = 'hidden';
      answerOptionBoxes[3].style.visibility = 'hidden';

      answerOptionLabels[0].innerText = "";
      answerOptionLabels[1].innerText = "";
      answerOptionLabels[2].innerText = "";
      answerOptionLabels[3].innerText = "";
      answerOptionLabels[0].style.visibility = 'hidden';
      answerOptionLabels[1].style.visibility = 'hidden';
      answerOptionLabels[2].style.visibility = 'hidden';
      answerOptionLabels[3].style.visibility = 'hidden';
      break;

    //Providing any other N<=4 will display each answer as a button and the free-form text box. 
    case 2:
      answerOptionBoxes[0].value = testInput[index].split('|')[1].split(',')[0];
      answerOptionBoxes[1].value = testInput[index].split('|')[1].split(',')[1];
      answerOptionBoxes[2].value = "";
      answerOptionBoxes[3].value = "";
      answerOptionBoxes[0].style.visibility = 'visible';
      answerOptionBoxes[1].style.visibility = 'visible';
      answerOptionBoxes[2].style.visibility = 'hidden';
      answerOptionBoxes[3].style.visibility = 'hidden';

      answerOptionLabels[0].innerText = testInput[index].split('|')[1].split(',')[0];
      answerOptionLabels[1].innerText = testInput[index].split('|')[1].split(',')[1];
      answerOptionLabels[2].innerText = "";
      answerOptionLabels[3].innerText = "";
      answerOptionLabels[0].style.visibility = 'visible';
      answerOptionLabels[1].style.visibility = 'visible';
      answerOptionLabels[2].style.visibility = 'hidden';
      answerOptionLabels[3].style.visibility = 'hidden';
      break;
    case 3:
      answerOptionBoxes[0].value = testInput[index].split('|')[1].split(',')[0];
      answerOptionBoxes[1].value = testInput[index].split('|')[1].split(',')[1];
      answerOptionBoxes[2].value = testInput[index].split('|')[1].split(',')[2];
      answerOptionBoxes[3].value = "";
      answerOptionBoxes[0].style.visibility = 'visible';
      answerOptionBoxes[1].style.visibility = 'visible';
      answerOptionBoxes[2].style.visibility = 'visible';
      answerOptionBoxes[3].style.visibility = 'hidden';

      answerOptionLabels[0].innerText = testInput[index].split('|')[1].split(',')[0];
      answerOptionLabels[1].innerText = testInput[index].split('|')[1].split(',')[1];
      answerOptionLabels[2].innerText = testInput[index].split('|')[1].split(',')[2];
      answerOptionLabels[3].innerText = "";
      answerOptionLabels[0].style.visibility = 'visible';
      answerOptionLabels[1].style.visibility = 'visible';
      answerOptionLabels[2].style.visibility = 'visible';
      answerOptionLabels[3].style.visibility = 'hidden';
      break;
    case 4:
      answerOptionBoxes[0].value = testInput[index].split('|')[1].split(',')[0];
      answerOptionBoxes[1].value = testInput[index].split('|')[1].split(',')[1];
      answerOptionBoxes[2].value = testInput[index].split('|')[1].split(',')[2];
      answerOptionBoxes[3].value = testInput[index].split('|')[1].split(',')[3];
      answerOptionBoxes[0].style.visibility = 'visible';
      answerOptionBoxes[1].style.visibility = 'visible';
      answerOptionBoxes[2].style.visibility = 'visible';
      answerOptionBoxes[3].style.visibility = 'visible';

      answerOptionLabels[0].innerText = testInput[index].split('|')[1].split(',')[0];
      answerOptionLabels[1].innerText = testInput[index].split('|')[1].split(',')[1];
      answerOptionLabels[2].innerText = testInput[index].split('|')[1].split(',')[2];
      answerOptionLabels[3].innerText = testInput[index].split('|')[1].split(',')[3];
      answerOptionLabels[0].style.visibility = 'visible';
      answerOptionLabels[1].style.visibility = 'visible';
      answerOptionLabels[2].style.visibility = 'visible';
      answerOptionLabels[3].style.visibility = 'visible';
      break;

    //Default behavior is to show no buttons and only free-form text input. This would only be in case of error.
    default:
      answerOptionBoxes[0].value = "";
      answerOptionBoxes[1].value = "";
      answerOptionBoxes[2].value = "";
      answerOptionBoxes[3].value = "";
      answerOptionBoxes[0].style.visibility = 'hidden';
      answerOptionBoxes[1].style.visibility = 'hidden';
      answerOptionBoxes[2].style.visibility = 'hidden';
      answerOptionBoxes[3].style.visibility = 'hidden';

      answerOptionLabels[0].innerText = "";
      answerOptionLabels[1].innerText = "";
      answerOptionLabels[2].innerText = "";
      answerOptionLabels[3].innerText = "";
      answerOptionLabels[0].style.visibility = 'visible';
      answerOptionLabels[1].style.visibility = 'visible';
      answerOptionLabels[2].style.visibility = 'hidden';
      answerOptionLabels[3].style.visibility = 'hidden';
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
