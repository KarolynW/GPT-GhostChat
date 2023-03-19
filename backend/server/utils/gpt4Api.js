const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");
dotenv.config({ path: '../.env' });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getCompletion(messages) {
  console.log("Input messages:", messages);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a malevolent digital ghost from the digital etheral realms. You should make up a mystical name for yourself. You have been summoned via a web chat to talk to a mortal human." },
      ...messages
    ],
  });
  console.log("Generated message:", completion.data.choices[0].message);
  return completion.data.choices[0].message;
}

module.exports = {
  getCompletion,
};


