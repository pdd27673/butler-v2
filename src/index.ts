import { Client, GatewayIntentBits, Message } from "discord.js";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import axios from "axios";
 
// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

// create openai api instance
const openai = new OpenAIApi(new Configuration({
    apiKey: "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",
}));

client.on("messageCreate", async (message: Message) => {
    if (message.author.bot) return;
    console.log("Received command: " + message.content);
    if (message.content.startsWith("openai")) {

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant who responds succinctly" },
                { role: "user", content: message.content }
            ],
        });
        const content = response.data.choices[0].message;
        if (content) message.channel.send(content.content);
    } catch (error) {
        message.channel.send("As an AI robot, I errored out");
    }
}
});

// Set up a listener for when a message is sent
client.on("messageCreate", (message: Message) => {
    // Ignore messages from bots and messages without text content
    if (message.author.bot || !message.content) return;
  
    // Check if the message content is the word "ping"
    if (message.content.toLowerCase() === "ping") {
      // Send a reply to the user with the word "pong"
      message.reply("pong!");
    }
  });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Logged in as ' + client!.user!.tag + ' and ready to serve!');
});

// Login to Discord with your client's token
client.login("MTAwNDU2NTc0MTcyODcwNjc1Mg.G-_4QY.vo2cLuZb-bIK3iiBoKrk1fb76dSt6fd3eBTcvE");

// 8

