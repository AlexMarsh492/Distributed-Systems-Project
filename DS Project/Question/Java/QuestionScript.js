window.onload = LoadDropDown() //  loads elements and gets ID of elements
document.getElementById("GetQuestions").addEventListener('click', handleButtonClick)
document.getElementById("Answer1").addEventListener('click', WrongOrCorrect)
document.getElementById("Answer2").addEventListener('click', WrongOrCorrect)
document.getElementById("Answer3").addEventListener('click', WrongOrCorrect)
document.getElementById("Answer4").addEventListener('click', WrongOrCorrect)

let CorrectAnswer = ''
let NewQuestion = ''
let count = 0

async function LoadDropDown() { // drop down box functionality
    let TypeAPI = "/categories"
    const payload = await fetch(TypeAPI) // fetches all category types for dropdown box
    let jsonType = await payload.json()

    for(let i = 0; i < jsonType.length; i++) // inputs all current types of categories within the dropdown box
    {

        let DropDown = document.getElementById("CategoryID")
        let Add = document.createElement("option")
        
        Add.text = jsonType[i].Type

        DropDown.add(Add)
    }
}

async function getQuestions(SearchNum, QuestionType) { // requests the question type and number of questions from database
    let QuestionAPI = "/question/"

    QuestionAPI += `${QuestionType}?count=${SearchNum}`

    const payload = await fetch(QuestionAPI)

    let JsonResults = await payload.json()

    NewQuestion = JsonResults

    GetNewQuestion() // calls function to display the question
}

async function GetNewQuestion() // displays the answer buttons and configures the question
{

    let option1 = document.getElementById("Answer1")
    let option2 = document.getElementById("Answer2")
    let option3 = document.getElementById("Answer3")
    let option4 = document.getElementById("Answer4")

    option1.style.backgroundColor = '#808080' // assigns the colour of the buttons
    option2.style.backgroundColor = '#808080'
    option3.style.backgroundColor = '#808080'
    option4.style.backgroundColor = '#808080'

    let QuestionElem = document.getElementById("Question")

    if(count < NewQuestion.length)
    {
        QuestionElem.hidden = false

        QuestionElem.textContent = ''

        QuestionElem.textContent = `${NewQuestion[count].Question}` // gets the current question of the array

        document.getElementById("GetQuestions").hidden = true

        let RightAnswer = Math.floor((Math.random()*4)+1)

        CorrectAnswer = NewQuestion[count].Answer
    
        switch(RightAnswer) // randomly picks one putton to be the right answer and assigns the right text to the button
        {
            case 1:
            {
                option1.textContent = `${NewQuestion[count].Answer}`
                option2.textContent = `${NewQuestion[count].Wrong3}`
                option3.textContent = `${NewQuestion[count].Wrong1}`
                option4.textContent = `${NewQuestion[count].Wrong2}`
                break;
            }

            case 2:
            {
                option1.textContent = `${NewQuestion[count].Wrong2}`
                option2.textContent = `${NewQuestion[count].Answer}`
                option3.textContent = `${NewQuestion[count].Wrong3}`
                option4.textContent = `${NewQuestion[count].Wrong1}`
                break;
            }

            case 3:
            {
                option1.textContent = `${NewQuestion[count].Wrong2}`
                option2.textContent = `${NewQuestion[count].Wrong1}`
                option3.textContent = `${NewQuestion[count].Answer}`
                option4.textContent = `${NewQuestion[count].Wrong3}`
                break;
            }

            case 4:
            {
                option1.textContent = `${NewQuestion[count].Wrong1}`
                option2.textContent = `${NewQuestion[count].Wrong2}`
                option3.textContent = `${NewQuestion[count].Wrong3}`
                option4.textContent = `${NewQuestion[count].Answer}`
                break;
            }
        }

        option1.hidden = false // reveals the button if there are more questions to be displays
        option2.hidden = false
        option3.hidden = false
        option4.hidden = false

        count++
    }
    else
    {
        option1.hidden = true // hides the buttons and question if all questions have asked
        option2.hidden = true
        option3.hidden = true
        option4.hidden = true

        QuestionElem.hidden = true

         document.getElementById("GetQuestions").hidden = false

         count = 0 // resets counter

    }
}

async function WrongOrCorrect(event) 
{
    if(event.srcElement.textContent == CorrectAnswer) // if the ueser selects the right answer the buttons will change colour showing
                                                      // which answers were right and which one is wrong
    {
        document.getElementById("Answer1").style.backgroundColor = '#df1717'
        document.getElementById("Answer2").style.backgroundColor = '#df1717'
        document.getElementById("Answer3").style.backgroundColor = '#df1717'
        document.getElementById("Answer4").style.backgroundColor = '#df1717'
        event.srcElement.style.backgroundColor = '#18e518'

        notfiy = document.getElementById("ChangeTimer") // reveals timer and starts counting down until the question changes or ends
        notfiy.hidden = false

        notfiy.textContent = "CORRECT!!" // replaces the timer displays with a correct notification

        
        setTimeout(() => {notfiy.textContent = `The question will change in 5`,  
            setTimeout(() => {notfiy.textContent = `The question will change in 4`,
                setTimeout(() => {notfiy.textContent = `The question will change in 3`,
                    setTimeout(() => {notfiy.textContent = `The question will change in 2`, 
                        setTimeout(() => {notfiy.textContent = `The question will change in 1`,
                            setTimeout(() => {notfiy.hidden = true, GetNewQuestion()}, 1000)
                        }, 1000)
                    }, 1000)
                }, 1000)
            }, 1000)}, 1000) // count down from 5 then asks for the next question if there is one
    }
    else
    {
        event.srcElement.style.backgroundColor = '#df1717' // if the incorrect answer is clicked then the button will turn red
        notfiy = document.getElementById("ChangeTimer")
        notfiy.hidden = false

        notfiy.textContent = "INCORRECT" // displays this when the incorrect answer is shown
    }

}

async function handleButtonClick(event) { // this is for when the button is click for when the user wants to start the questions
    if(!(event.srcElement.id == 'GetQuestions')) return

    let GetQuestionType = document.getElementById('CategoryID').value
    let GetQuestionNum = document.getElementById('NumofQuestions').value

    getQuestions(GetQuestionNum, GetQuestionType)
}