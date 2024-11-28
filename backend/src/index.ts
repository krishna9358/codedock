require("dotenv").config();

const groqApiKey = process.env.GROQ_API_KEY;

import Groq from "groq-sdk";
import { BASE_PROMPT, getSystemPrompt } from "./prompts";
import { basePrompt as reactBasePrompt } from "./defaults/react";
import { basePrompt as nodeBasePrompt } from "./defaults/node";
const groq = new Groq({ apiKey: groqApiKey });

// to create a chat completion
async function main() {
  const chatCompletion = await groq.chat.completions.create({
    //system prompt is for the llm to know the constraints and capabilities and identify himself
    //user prompt is for the user to ask the llm to do something
    messages: [
      { role: "system", content: getSystemPrompt() },
      { role: "user", content: BASE_PROMPT }, //Base prompt -> for all the prompts to go
      { role: "user", content: `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n` }, // Base prompt to specify the file structure to go with user prompt
      { role: "user", content: "write the todo app in react" }, // user specified prompt
    ],
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
