# SimpleDiscord
Make sure dicord.js, nodemon are installed well. As discord.js is the core module, and nodemon is very beneficial for developing.

tutorial:
<h2>1. Discord bot API & Installation </h2>
[discord developer portal](https://discord.com/developers/applications), create your own application.

Select "bot" in the left navigation bar, and create a bot. 
<br>Scroll down and **check "public bot", "presence intent", "server memebers intent" & "message content intent"**.
<br>At the bottom of the page, select **"adminstrator"** for the "bot permissions", such that your bot have enabled all functions.
<br><p> $${\color{red}****PRESS \space \space SAVE \space \space CHANGES!****}$$</p>

<br/>Then go to "installation", **check "guild install" and UNCHECK "user install"**.
Scroll down to "default install settings", add **applications.commands** and **bot** these two tags to the scopes and **adminstrator** to permissions.
<br><p> $${\color{red}****PRESS \space \space SAVE \space \space CHANGES!****}$$</p>

<br/>Lastly, go to "OAuth2". In "OAuth2 URL Generator", check **"bot"**, **"application.commands"** and for permissions, check **adminstrator**.
<br><p> $${\color{red}****PRESS \space \space SAVE \space \space CHANGES!****}$$</p>

<h2>2. Package Installations </h2>


<h2> 3. configuration </h2>
Configuration requires your bot token, clientID and guildID.
clientID is  

Example code:
```node.js
const SimpleDiscord = require("@yaley/simplediscord")

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
