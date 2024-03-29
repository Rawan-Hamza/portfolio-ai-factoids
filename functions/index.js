require("dotenv").config({ path: __dirname + "/.env" });
const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

const configuration = new Configuration({
  organization: "org-UNC80YuTHlVMW0RHf4FRpumZ",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `pretend that you are an scientist. your name is gary, Answer with a one line interesting fact.
    Gary: How can I help you today?
    person: can you tell me someting interesting?
    Gary: A crocodile cannot stick its tongue out.
    person: ${message}?
    Gary:`,
    max_tokens: 40,
    temperature: 1,
  });

  if (response.status === 200) {
    res.json({
      message: response.data.choices[0].text,
    });
  } else {
    const infoArray = [
      "It is impossible for most people to lick their own elbow. (try it!)",
      "A crocodile cannot stick its tongue out.",
      "A shrimp's heart is in its head.",
      "It is physically impossible for pigs to look up into the sky.",
      "The \"sixth sick sheik's sixth sheep's sick\" is believed to be the toughest tongue twister in the English language.",
      "If you sneeze too hard, you could fracture a rib.",
      "Wearing headphones for just an hour could increase the bacteria in your ear by 700 times.",
      "In the course of an average lifetime, while sleeping you might eat around 70 assorted insects and 10 spiders, or more.",
      "Some lipsticks contain fish scales.",
      "Cat urine glows under a black-light.",
      "Like fingerprints, everyone's tongue print is different.",
      "Rubber bands last longer when refrigerated.",
      "There are 293 ways to make change for a dollar.",
      "The average person's left hand does 56% of the typing (when using the proper position of the hands on the keyboard; Hunting and pecking doesn't count!).",
      "A shark is the only known fish that can blink with both eyes.",
      'The longest one-syllable words in the English language are "scraunched" and "strengthed." Some suggest that "squirreled" could be included, but squirrel is intended to be pronounced as two syllables (squir-rel) according to most dictionaries. "Screeched" and "strengths" are two other long one-syllable words, but they only have 9 letters.',
      '"Dreamt" is the only English word that ends in the letters "mt".',
      "Almonds are a member of the peach family.",
      "Maine is the only state that has a one-syllable name.",
      'There are only four words in the English language which end in "dous": tremendous, horrendous, stupendous, and hazardous.',
      'Los Angeles\' full name is "El Pueblo de Nuestra Senora la Reina de los Angeles de Porciuncula"',
      "A cat has 32 muscles in each ear.",
      "An ostrich's eye is bigger than its brain.",
      "Tigers have striped skin, not just striped fur.",
      "In many advertisements, the time displayed on a watch is 10:10.",
      "The characters Bert and Ernie on Sesame Street were named after Bert the cop and Ernie the taxi driver in Frank Capra's \"It's a Wonderful Life.\"",
      "A dime has 118 ridges around the edge.",
      "The giant squid has the largest eyes in the world.",
      "Most people fall asleep in seven minutes.",
      '"Stewardesses" is the longest word that is typed with only the left hand.',
    ];
    const randomInfo = infoArray[Math.floor(Math.random() * infoArray.length)];
    res.json({
      message: randomInfo,
    });
  }
});

app.listen(port, () => {
  console.log(`example app listening at http://localhost:${port}`);
});
