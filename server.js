import express from 'express'
import OpenAi from "openai"
import "dotenv/config"

const app = express()
app.use(express.json())

const openai = new OpenAi({
    baseURL: process.env.AI_URL,
    apiKey: process.env.AI_KEY
})

app.post('/api/translation', async(req, res) => {

    console.log(req)

    const { userSubmission, language } = req.body

    const response = await openai.chat.completions.create({
        model: process.env.AI_MODEL,
        messages: [
            {
                role: "system",
                content: `you are a translator. only given direct translations of the word supplied. no fluff, just meat.`
            },
            {
                role: "user",
                content: `translate ${userSubmission} into ${language}`
            }
        ]
    })

    const translation = response.choices[0].message.content

    res.json({ translation })

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running at Port ${PORT}`)
})

