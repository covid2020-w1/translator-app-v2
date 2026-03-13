import './App.css'
import { useState, useEffect } from "react"


//mvp: basically, we want to be able to access the value of the text area, access the value of the language, put those together in a userPrompt, send it to the openai api, extract the content, and display it somewhere on the webpage.
//so after 

export default function App(){

  const [text, setText] = useState("")
  const [userSubmission, setUserSubmission] = useState("")
  const [language, setLanguage] = useState("")
  const [translation, setTranslation] = useState("")

  //so what we wnat to do is add an event listener to each radio so that when it is checked, it calls a function. in the function, we want to set the value of language to the value of the checked event listener. 



  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>){
    setText(e.target.value)
  }

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
    e.preventDefault()
    console.log(text)
    setUserSubmission(text)
  }

  function handleLanguageChange(e: React.ChangeEvent<HTMLInputElement>){
    setLanguage(e.target.value)
  }
  
  console.log(language)

  useEffect(
    () => {

      if(!userSubmission || !language) return

      async function fetchTranslation(){

        try{
          const res = await fetch("/api/translation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({userSubmission, language})
          })
          
          const data = await res.json()
          setTranslation(data.translation)
  
        }catch(err){
          console.error(err)
        } 

      }

      fetchTranslation()

    }, 
    [userSubmission, language]
  )


  return(
    <>
      <header>
        <img />
        <h1>PollyGlot</h1>
        <p>Perfect translation every Time</p>
      </header>
      <main>
        <div className="container">
          <form onSubmit={handleSubmit}>
            <h2>Text to translate 👇</h2>
            <textarea value={text} onChange={handleChange}></textarea>
            <h2>Select language 👇</h2>
            <fieldset>
              <label>
                <input 
                  type="radio" 
                  name="language" 
                  value="french"
                  onChange={handleLanguageChange}
                  checked={language === "french"}
                />
                French
              </label>
              <label>
                <input 
                  type="radio" 
                  name="language" 
                  value="spanish"
                  onChange={handleLanguageChange}
                  checked={language === "spanish"}
                />
                spanish
              </label>
              <label>
                <input 
                  type="radio" 
                  name="language" 
                  value="japanese"
                  onChange={handleLanguageChange}
                  checked={language === "japanese"}
                />
                japanese
              </label>
            </fieldset>
            <button>Translate</button>
          </form>
          {translation && <p>{translation}</p>}
        </div>
      </main>
    </>
  )
}