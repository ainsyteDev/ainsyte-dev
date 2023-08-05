//Function to create object with inventory  of questions pulling from the hidden p elements inside the secion.gh-content element.
//This allows the CMS to to provide the test data in the form of stylesheet hidden <p> tags in the content response.
function extractQuestions() { //#Is called to create the variable currentTest obj at the start of each test and is passed to populateQuestions on initialization.

  //Load document HTML and create a parser to pull the text/html from hidden p tags inside the section.gh-content block.
  const htmlString = document.documentElement.innerHTML;
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const pTags = doc.querySelectorAll('div.kg-callout-text');
  const pObject = {};

  //Loop through the gathered p tags (questions and answers) and create an indexed object from them.
  pTags.forEach((pTag, index) => {
    pObject[`${index + 1}`] = pTag.textContent.trim();
  });

  //Return the object of questions and answers.
  return pObject;
}

//Function to display question number / progress. #Called by populateQuestions().
function updateQuestionNumberDisplay(){

  //Get the question number user display element.
  let questionNumberDisplay = document.getElementById("questionNumberDisplay"); //currentTest[index].split('|')[0];
  //Set the question number user display to the currnet question number.
  questionNumberDisplay.innerHTML = currentQuestionNumber;
  
  //Get the total number of questions user display element.
  let testLengthDisplay = document.getElementById("testLengthDisplay");
  //Set the totla number of questions user display element to the number of questions in the currentTest obj. 
  testLengthDisplay.innerHTML = Object.keys(currentTest).length;
}

//Function to add checkboxes to the DOM based on the number of question options.
function addCheckboxes(numDesired, testData){ //#Called by populateQuestions().
  
  //Grab the answer-inputs element to add children to or display:none if no checkboxes are desired.
  let answerInputs = document.getElementById("answer-inputs");

  //For now it will be quicker to just handle the HTML for each checkbox/label combo as a block. 

  let inputCheckboxHTML = [`
<div>
<input class="answerOptions" type="checkbox" id="option-1" name="Option One" value="Option One" />
<label class="answerOptions-label" for="option-1">Option One</label>
</div>
`,`
<div>
<input class="answerOptions" type="checkbox" id="option-2" name="Option Two" value="Option Two" />
<label class="answerOptions-label" for="option-2">Option Two</label>
</div>
`,`
<div>
<input class="answerOptions" type="checkbox" id="option-3" name="Option Three" value="Option Three" />
<label class="answerOptions-label" for="option-3">Option Three</label>
</div>
`,`
<div>
<input class="answerOptions" type="checkbox" id="option-4" name="Option Four" value="Option Four" />
<label class="answerOptions-label" for="option-4">Option Four</label>
</div>
`];

  switch(numDesired) {
    case 1:
      //Remove div.answerInputs so layout doesn't have white space when text only input is requested.
      answerInputs.style.display = "none";
      answerInputs.innerHTML = '';

    break;
    case 2:
      //Clear answer inputs.
      answerInputs.innerHTML = '';
      //Create answer option elements.
      answerInputs.innerHTML += inputCheckboxHTML[0];
      answerInputs.innerHTML += inputCheckboxHTML[1];
      //Populate question answer options.
      answerInputs.childNodes[1].childNodes[1].value = testData[currentQuestionNumber].split('|')[1].split(',')[0];
      answerInputs.childNodes[1].childNodes[3].innerText = testData[currentQuestionNumber].split('|')[1].split(',')[0];
      answerInputs.childNodes[3].childNodes[1].value = testData[currentQuestionNumber].split('|')[1].split(',')[1];
      answerInputs.childNodes[3].childNodes[3].innerText = testData[currentQuestionNumber].split('|')[1].split(',')[1];
      //Display the answerInputs element.
      answerInputs.style.display = "block";
    break;
    case 3:
      //Clear answer inputs.
      answerInputs.innerHTML = '';
      //Create answer option elements.
      answerInputs.innerHTML += inputCheckboxHTML[0];
      answerInputs.innerHTML += inputCheckboxHTML[1];
      answerInputs.innerHTML += inputCheckboxHTML[2];
      //Populate question answer options.
      answerInputs.childNodes[1].childNodes[1].value = testData[currentQuestionNumber].split('|')[1].split(',')[0];
      answerInputs.childNodes[1].childNodes[3].innerText = testData[currentQuestionNumber].split('|')[1].split(',')[0];
      answerInputs.childNodes[3].childNodes[1].value = testData[currentQuestionNumber].split('|')[1].split(',')[1];
      answerInputs.childNodes[3].childNodes[3].innerText = testData[currentQuestionNumber].split('|')[1].split(',')[1];
      answerInputs.childNodes[5].childNodes[1].value = testData[currentQuestionNumber].split('|')[1].split(',')[2];
      answerInputs.childNodes[5].childNodes[3].innerText = testData[currentQuestionNumber].split('|')[1].split(',')[2];
      //Display the answerInputs element.
      answerInputs.style.display = "block";
    break;
    case 4:
      //Clear answer inputs.
      answerInputs.innerHTML = '';
      //Create answer option elements.
      answerInputs.innerHTML += inputCheckboxHTML[0];
      answerInputs.innerHTML += inputCheckboxHTML[1];
      answerInputs.innerHTML += inputCheckboxHTML[2];
      answerInputs.innerHTML += inputCheckboxHTML[3];
      //Populate question answer options.
      answerInputs.childNodes[1].childNodes[1].value = testData[currentQuestionNumber].split('|')[1].split(',')[0];
      answerInputs.childNodes[1].childNodes[3].innerText = testData[currentQuestionNumber].split('|')[1].split(',')[0];
      answerInputs.childNodes[3].childNodes[1].value = testData[currentQuestionNumber].split('|')[1].split(',')[1];
      answerInputs.childNodes[3].childNodes[3].innerText = testData[currentQuestionNumber].split('|')[1].split(',')[1];
      answerInputs.childNodes[5].childNodes[1].value = testData[currentQuestionNumber].split('|')[1].split(',')[2];
      answerInputs.childNodes[5].childNodes[3].innerText = testData[currentQuestionNumber].split('|')[1].split(',')[2];
      answerInputs.childNodes[7].childNodes[1].value = testData[currentQuestionNumber].split('|')[1].split(',')[3];
      answerInputs.childNodes[7].childNodes[3].innerText = testData[currentQuestionNumber].split('|')[1].split(',')[3];
      //Display the answerInputs element.
      answerInputs.style.display = "block";
    break;
    default:
      //Remove div.answerInputs so layout doesn't have white space when text only input is requested.
      answerInputs.style.display = "none";
      answerInputs.innerHTML = '';
      console.log("Error. Likely invalid number of answer options.");
  }
}

//Function to clear checkboxes. #Called by populateQusetions();
function clearCheckBoxes(){

  //Grab the answer options objects.
  let answers  = document.getElementsByClassName("answerOptions");

  //Loop through them...
  for (let i = 0; i < answers.length; i++) {
    //checking to see if they are checked and...
    if(answers[i].checked){ //...if they are checked...
      //...uncheck them (reset for next question.)
      answers[i].checked = false;
    }
  }

  //Also clear the text-area.
  document.getElementById('answerText').value= "";
}

//Function to populate initial question and answer options to div#currentQuestion, starting at question #1.
function populateQuestions(testInput, index) { //#Is called on initalization and moveToNextQuestion() 

//## Debug logging ## Uncomment to see in console. 
//    console.log("Question Number:" + index); //Write the current question numnber to the console.
//    console.log("Total Questions in Current Test:" + Object.keys(testInput).length); //Write total number of questions found in the current test to the console.
//    console.log("Current Question:" + testInput[index].split('|')[0]); //Write the current question text to the console.
//    console.log("Current Answer Options:" + testInput[index].split('|')[1]); //Write the current answer options to the console.
//    console.log(testInput); //Write the current tests object to the console.

  //Get the current question user display element.
  let questionText = document.getElementById("currentQuestion");
  //Populate current question user display with current question text, index 0 after splitting by pipe delineation.
  questionText.innerHTML = testInput[index].split('|')[0];

  //Get the number of answers associated with the indexed question to decide how many answer options to display.
  let numberOfAnswerOptions = testInput[index].split('|')[1].split(',').length;

  //Add the number of checkboxes needed for the current question.
  addCheckboxes(numberOfAnswerOptions, testInput);

  //Update question number and progress display.
  updateQuestionNumberDisplay();

  //Address special case of the last question where you should not be able to move forward. This will also be the end state trigger.
  if(currentQuestionNumber == Object.keys(testInput).length){

    //If on the last question, disable the next button. End state.
    document.getElementById("nextQuestion").disabled = true;

  }else{

   //If not, ensure the Next button is enabled.
    document.getElementById("nextQuestion").disabled = false;
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
  console.log(inventoryResults);
}

//Function to move to next question, to be called onclick of Next button.
function moveToNextQuestion() {

  //Collect Answers and push to array.
  collectAnswers(resultsArray);

  //Add 1 to the currentQuestionNumber.
  currentQuestionNumber++;

  //Re-populate current question with the next questions data.
  populateQuestions(currentTest, currentQuestionNumber);

  //Clear answers.
  clearCheckBoxes();
}

//Get Next button element.
let nextButton = document.getElementById("nextQuestion");
//Add event listeners for Next button.
nextButton.addEventListener("click", moveToNextQuestion); //Then populate the next question.

//Set the currentTest object to the result of the extract questions function. This creates the test object when the user loads the page compiling the questions and answers from hidden HTML elements provided by the CMS.
let currentTest = extractQuestions();

// Create a URLSearchParams object based on the current URL to skip to a specific question using ?qn=N
const urlSearchParams = new URLSearchParams(window.location.search);
// Get the value of the "qn" parameter
let qn = urlSearchParams.get('qn');

//If a URL param is not supplied, default to question 1, otherwise go to the question number supplied in the URL.
if(qn !== null){
  var currentQuestionNumber = qn;
}else{
  var currentQuestionNumber = 1;
}

//Start the test by populating the first question and answer sets.
populateQuestions(currentTest, currentQuestionNumber);
