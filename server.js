import express from 'express'
import OpenAi from "openai"
import "dotenv/config"
import cors from 'cors'

const app = express()

const allowedOrigin = process.env.FRONTEND_URL

app.use(cors({
    origin: allowedOrigin,
    methods: ["GET, POST"],
    allowedHeaders: ["Content-Type"],

}))

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

