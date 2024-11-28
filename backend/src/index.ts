require("dotenv").config();

const groqApiKey = process.env.GROQ_API_KEY;

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: groqApiKey });

// to create a chat completion
async function main() {
  const chatCompletion = await groq.chat.completions.create({
    messages: [{ role: "user", content: "write code for a todo application in reactjs" }],
    model: "llama3-8b-8192",
    temperature: 0, // controls randomness
    // max_tokens: 1024, // max number of tokens in the response
    top_p: 1, // controls randomness
    stream: true, // to stream the response
    stop: null,
  });

  // to stream the response
  for await (const chunk of chatCompletion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || ""); // to write the response to the console without a new line    
  }
}

main();
