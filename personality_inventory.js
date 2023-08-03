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

  //grab div#answer-inputs wrapper to remove when text only input is desired.
  let answerInputs = document.getElementById("answer-inputs");

  //Toggle answer options based off the number available, must be at least one option, in which case it is assumed that the answer should be free-form text.
  switch(numberOfAnswerOptions) {

    //Providing a single answer option (cannot be 0 for now, will update) is equivalent to providing only free-form text as an answer.
    case 1:
      //remove div.answerInputs so layout doesn't have white space when text only input is requested.
      answerInputs.style.display = "none";
      //Update checkboxes.
      answerOptionBoxes[0].value = "";
      answerOptionBoxes[1].value = "";
      answerOptionBoxes[2].value = "";
      answerOptionBoxes[3].value = "";
      answerOptionBoxes[0].style.display = "none";
      answerOptionBoxes[1].style.display = "none";
      answerOptionBoxes[2].style.display = "none";
      answerOptionBoxes[3].style.display = "none";
      //Update labels
      answerOptionLabels[0].innerText = "";
      answerOptionLabels[1].innerText = "";
      answerOptionLabels[2].innerText = "";
      answerOptionLabels[3].innerText = "";
      answerOptionLabels[0].style.display = "none";
      answerOptionLabels[1].style.display = "none";
      answerOptionLabels[2].style.display = "none";
      answerOptionLabels[3].style.display = "none";
      break;

    //Providing any other N<=4 will display each answer as a button and the free-form text box. 
    case 2:
      //makes sure answerInputs div is displayed, will not be if coming from a text only input question.
      answerInputs.style.display = "block";
      //Update checkboxes.
      answerOptionBoxes[0].value = testInput[index].split('|')[1].split(',')[0];
      answerOptionBoxes[1].value = testInput[index].split('|')[1].split(',')[1];
      answerOptionBoxes[2].value = "";
      answerOptionBoxes[3].value = "";
      answerOptionBoxes[0].style.display = "inline";
      answerOptionBoxes[1].style.display = "inline";
      answerOptionBoxes[2].style.display = "none";
      answerOptionBoxes[3].style.display = "none";
      //update labels
      answerOptionLabels[0].innerText = testInput[index].split('|')[1].split(',')[0];
      answerOptionLabels[1].innerText = testInput[index].split('|')[1].split(',')[1];
      answerOptionLabels[2].innerText = "";
      answerOptionLabels[3].innerText = "";
      answerOptionLabels[0].style.display = "inline";
      answerOptionLabels[1].style.display = "inline";
      answerOptionLabels[2].style.display = "none";
      answerOptionLabels[3].style.display = "none";
      break;

    case 3:
      //makes sure answerInputs div is displayed, will not be if coming from a text only input question.
      answerInputs.style.display = "block";
      //Update checkboxes.
      answerOptionBoxes[0].value = testInput[index].split('|')[1].split(',')[0];
      answerOptionBoxes[1].value = testInput[index].split('|')[1].split(',')[1];
      answerOptionBoxes[2].value = testInput[index].split('|')[1].split(',')[2];
      answerOptionBoxes[3].value = "";
      answerOptionBoxes[0].style.display = "inline";
      answerOptionBoxes[1].style.display = "inline";
      answerOptionBoxes[2].style.display = "inline";
      answerOptionBoxes[3].style.display = "none";
      //update labels
      answerOptionLabels[0].innerText = testInput[index].split('|')[1].split(',')[0];
      answerOptionLabels[1].innerText = testInput[index].split('|')[1].split(',')[1];
      answerOptionLabels[2].innerText = testInput[index].split('|')[1].split(',')[2];
      answerOptionLabels[3].innerText = "";
      answerOptionLabels[0].style.display = "inline";
      answerOptionLabels[1].style.display = "inline";
      answerOptionLabels[2].style.display = "inline";
      answerOptionLabels[3].style.display = "none";
      break;

    case 4:
      //makes sure answerInputs div is displayed, will not be if coming from a text only input question.
      answerInputs.style.display = "block";
      //Update checkboxes.
      answerOptionBoxes[0].value = testInput[index].split('|')[1].split(',')[0];
      answerOptionBoxes[1].value = testInput[index].split('|')[1].split(',')[1];
      answerOptionBoxes[2].value = testInput[index].split('|')[1].split(',')[2];
      answerOptionBoxes[3].value = testInput[index].split('|')[1].split(',')[3];
      answerOptionBoxes[0].style.display = "inline";
      answerOptionBoxes[1].style.display = "inline";
      answerOptionBoxes[2].style.display = "inline";
      answerOptionBoxes[3].style.display = "inline";
      //Update labels.
      answerOptionLabels[0].innerText = testInput[index].split('|')[1].split(',')[0];
      answerOptionLabels[1].innerText = testInput[index].split('|')[1].split(',')[1];
      answerOptionLabels[2].innerText = testInput[index].split('|')[1].split(',')[2];
      answerOptionLabels[3].innerText = testInput[index].split('|')[1].split(',')[3];
      answerOptionLabels[0].style.display = "inline";
      answerOptionLabels[1].style.display = "inline";
      answerOptionLabels[2].style.display = "inline";
      answerOptionLabels[3].style.display = "inline";
      break;

    //Default behavior is to show no buttons and only free-form text input. This would only be in case of error.
    default:
      //remove div.answerInputs so layout doesn't have white space when text only input is requested.
      answerInputs.style.display = "none";
      //Update checkboxes.
      answerOptionBoxes[0].value = "";
      answerOptionBoxes[1].value = "";
      answerOptionBoxes[2].value = "";
      answerOptionBoxes[3].value = "";
      answerOptionBoxes[0].style.display = 'none';
      answerOptionBoxes[1].style.display = 'none';
      answerOptionBoxes[2].style.display = 'none';
      answerOptionBoxes[3].style.display = 'none';
      //Update labels.
      answerOptionLabels[0].innerText = "";
      answerOptionLabels[1].innerText = "";
      answerOptionLabels[2].innerText = "";
      answerOptionLabels[3].innerText = "";
      answerOptionLabels[0].style.display = 'none';
      answerOptionLabels[1].style.display = 'none';
      answerOptionLabels[2].style.display = 'none';
      answerOptionLabels[3].style.display = 'none';
  }

  //Update question number and progress display.
  updateQuestionNumberDisplay();

  //Address special case of the first question where you should not be able to move back by disabling the Previous button.
  if(currentQuestionNumber == 1){

    //If on the first question, disable the Previous button.
    document.getElementById("previousQuestion").disabled = true;

  }else{

    //If not, ensure the previous button is enabled.
    document.getElementById("previousQuestion").disabled = false;

  }

  //Address special case of the last question where you should not be able to move forward. This will also be the end state trigger.
  if(currentQuestionNumber == Object.keys(testInput).length){

    //If on the last question, disable the next button. End state.
    document.getElementById("nextQuestion").disabled = true;

  }else{

   //If not, ensure the Next button is enabled.
    document.getElementById("nextQuestion").disabled = false;

  }

}

//Function to clear checkboxes.
function clearCheckBoxes(){
  let answers  = document.getElementsByClassName("answerOptions");
  for (let i = 0; i < answers.length; i++) {
    
    if(answers[i].checked){
      answers[i].checked = false;
    }

  }
}

//Array to hold inventory results.
let  resultsArray = [];
//Function to collect current answers and place them in an array.
function collectAnswers(inventoryResults){

  //Grab the current question to store with user response.
  let answeredQuestion = currentTest[currentQuestionNumber].split('|')[0];
  //Grab the current state of the answer checkboxes as an array of elements with class answerOptions.
  let answerOptions  = document.getElementsByClassName("answerOptions");
  //Initialize an empty array to hold just the checked boxes values (user provided answers.)
  let questionAnswer = [];

  //Loop through the current answer options and push the selected answers to the questionAnswer array.
  for(let i = 0; i < answerOptions.length; i++){ 
    if(answerOptions[i].checked){
      questionAnswer.push(answerOptions[i].value)
    }
  }

  //If the inventoryResults array is empty (starting state)... 
  if(inventoryResults.length == 0){
    //...push the selected answers from the first question to results with the question number and text.
    inventoryResults.push([currentQuestionNumber, answeredQuestion, questionAnswer]);

  //if the inventoryResults array isn't empty...
  }else{
    //...check to see if the current question (if the user moved back) has already been answered.
    if(inventoryResults.find(el => el[0] === currentQuestionNumber)){
     
      //Update the response with the user changed answers. 
      inventoryResults[currentQuestionNumber-1] = [currentQuestionNumber, answeredQuestion, questionAnswer];

    //Otherwise if this question has not been answered... 
    }else{
      //...push the selected answers from the first question to results with the question number and text.
      inventoryResults.push([currentQuestionNumber, answeredQuestion, questionAnswer]);

    }

  }
}

//Function to display question number / progress.
function updateQuestionNumberDisplay(){
  document.getElementById("questionNumberDisplay").innerHTML = currentQuestionNumber; //currentTest[index].split('|')[0];
  document.getElementById("testLengthDisplay").innerHTML = Object.keys(currentTest).length;
}

//Function to move to next question, to be called onClick on Next button. //Event handlers to be moved out of HTML later.
function moveToNextQuestion() {

  //Collect Answers and push to array.
  collectAnswers(resultsArray);

  //Add 1 to the currentQuestionNumber.
  currentQuestionNumber++;

  //Re-populate current question with the next questions data.
  populateQuestions(currentTest, currentQuestionNumber);

  //Clear answers.
  clearCheckBoxes()
}

//Add event listeners for Next button.
document.getElementById("nextQuestion").addEventListener("click", moveToNextQuestion); //Then populate the next question.

//Function to move to next question, to be called onClick on Next button. //Event handlers to be moved out of HTML later.
function moveToPreviousQuestion() {
  
  //Collect Answers and push to array.
  collectAnswers(resultsArray);

  //Subtract 1 from the current Question number.
  currentQuestionNumber--;

  //Re-populate current question with the next questions data.
  populateQuestions(currentTest, currentQuestionNumber);

  //Clear answers.
  clearCheckBoxes()

}

//Add event listener for Previous button.
document.getElementById("previousQuestion").addEventListener("click", moveToPreviousQuestion); //Then populate the next question.

//Set the currentTest object to the result of the extract questions function. This creates the test object when the user loads the page compiling the questions and answers from hidden HTML elements provided by the CMS.
let currentTest = extractQuestions();

//Initialize the question index at question 1.
let currentQuestionNumber = 1;

//Start the test by populating the first question and answer sets.
populateQuestions(currentTest, currentQuestionNumber);
