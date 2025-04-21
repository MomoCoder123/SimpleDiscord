# SimpleDiscord
Make sure dicord.js, nodemon are installed well. As discord.js is the core module, and nodemon is very beneficial for developing.

Example code:
```node.js
const SimpleDiscord = require("SimpleDiscord.js")

// Initialize the bot and set configuration
SimpleDiscord.config({
  token: "your-bot-token",
  clientId: "your-client-id",
  guildId: "your-guild-id"
})

// Define commands with options
const greetCommand = SimpleDiscord.createCommand({
  name: "greet",
  description: "Greets a user",
  userOptions: [
    {
      name: "user",
      description: "The user to greet",
      required: true
    }
  ]
})

const chooseCommand = SimpleDiscord.createCommand({
  name: "choose",
  description: "Choose between options",
  stringOptions: [
    {
      name: "choice",
      description: "Your choice",
      required: true,
      choices: [
        { name: "Option 1", value: "option1" },
        { name: "Option 2", value: "option2" }
      ]
    }
  ]
})

// Add command handlers
greetCommand.execute = async interaction => {
  const user = interaction.options.getUser("user")
  await interaction.reply(`Hello, ${user.username}!`)
}

chooseCommand.execute = async interaction => {
  const choice = interaction.options.getString("choice")
  await interaction.reply(`You chose: ${choice}`)
}

// Set commands and launch the bot
SimpleDiscord.setCommands([greetCommand, chooseCommand])
SimpleDiscord.launchBot()
```
