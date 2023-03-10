const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

const configuration = new Configuration({
  organization: "org-woWanKcsdcaI4AQmfMt2MlYs",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: ` pretend you are Gary Delaney. Answer with a one line joke.
    Gary: How can I help you today?
    person: I want to hear a joke.
    Gary: I’ve just bought Spider-Man pyjamas. I hope he likes them.
    person: ${message}?
    Gary:`,
    max_tokens: 50,
    temperature: 0,
  });
  console.log(response.data);
  if (response.data.choices[0].text) {
    res.json({
      message: response.data.choices[0].text,
    });
  }
});

app.listen(port, () => {
  console.log(`example app listening at http://localhost:${port}`);
});
