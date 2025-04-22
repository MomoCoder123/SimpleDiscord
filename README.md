# SimpleDiscord
Make sure dicord.js, nodemon are installed well. As discord.js is the core module, and nodemon is very beneficial for developing.

tutorial:
<h2>1. Discord bot API & Installation </h2>
Goto discord developer portal (https://discord.com/developers/applications), create your own application.

Select "bot" in the left navigation bar, and create a bot. 
<br>Scroll down and **check "public bot", "presence intent", "server memebers intent" & "message content intent"**.
<br>At the bottom of the page, select **"adminstrator"** for the "bot permissions", such that your bot have enabled all functions.
<br><p> $${\color{red}****PRESS \space \space SAVE \space \space CHANGES!****}$$</p>

<br/>Then go to "installation", **check "guild install" and UNCHECK "user install"**.
Scroll down to "default install settings", add **applications.commands** and **bot** these two tags to the scopes and **adminstrator** to permissions.
<br><p> $${\color{red}****PRESS \space \space SAVE \space \space CHANGES!****}$$</p>

<br/>Lastly, go to "OAuth2". In "OAuth2 URL Generator", check **"bot"**, **"application.commands"** and for permissions, check **adminstrator**.
<br><p> $${\color{red}****PRESS \space \space SAVE \space \space CHANGES!****}$$</p>

<br> scroll to the bottom, copy the **generated OAuth2 URL** and authorise your bot! 

<h2>2. Package Installations & Starting</h2>
Goto Github codespace/ Visual Studio Code. 
<br/>Open the terminal and run the following commands seperately

```
npm i @yaley/simplediscord discord.js
npm i -D nodemon
```

Go into the **package.json**, above "dependencies", insert this into your json-package.
``` json
"scripts": {
  "dev": "nodemon YOUR_FILE_NAME"
}
```
****Remember to replace YOUR_FILE_NAME into your .js file name!!!****

<h2> 3. configuration </h2>
Configuration requires your bot token, clientID and guildID.
<br>Bot token:

![picture](https://i.ibb.co/q3j2bJ2k/IMG-0054.jpg)


<br>clientID is the ID of your bot.


![picture](https://i.ibb.co/GQ3nVDNb/IMG-0053.jpg)

<br>guildID is the serverID of the server which you've added the bot into.

```node.js
const SimpleDiscord = require("@yaley/simplediscord") //init the package

//Init your bot token, clientID & guildID
SimpleDiscord.config({
  token: "your-bot-token",
  clientId: "your-client-id",
  guildId: "your-guild-id"
})

SimpleDiscord.launchBot()
```

Can you see your bot is online now? 
<br> If yes, then congrats! 
<br> If no, that means your bot token is wrong!

<h2> 4. Advanced bot building</h2>
<h3>Slash commands</h3>


```node.js
SimpleDiscord.createCommand()
```

creates a slash command, meaning users can send a command by typing `/`
<br>In every command, you need a name, a description, and an option. There are three types of options, user options, string options, and choices (used in string options). If you dont need any options or choices, just leave it `[]`. 

<br>the `required` attribute indicated that whether the user must type/ choose something in that input. Just leave it `[]` if it's not required.

Example:

```node.js
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
```


```node.js
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


```

**Note: no description/ requirement/ name is needed for choices!**

<br>We need command handling. We will set `myCommand.excute` into a `async half-function` that proccesses what will the bot do after receiving slash commands.

```node.js
greetCommand.execute = async interaction => { // half-function, NO NEED TO WRIE FUNCTION(){}
  const user = interaction.options.getUser("user") //gets the value of 'user'
  await interaction.reply(`Hello, ${user.username}!`) 'wait until the bot has sent reply message, such that there will be no crashes
}
```

**Note: `interaction.options.getUser("inputName").username` gives out the username of the input**
**<br> `interaction.options.getuser("inputName").id` gives out the id.**
To mention/tag someone, you can say "<@USER_id>" in `interaction.reply`.

```node.js
greetCommand.execute = async interaction => { 
  const user = interaction.options.getUser("user")
  await interaction.reply(`Hello, <@${user.id}>!`) //tags the user
}
```

+Additional knowledge: f-string in js 

```node.js
const somone = "you"
console.log(`Hello, ${someone}`)
```

**REMEMBER It IS ` NOT "**
Also, you need to add your command to the bot before lunching it!

```node.js
SimpleDiscord.setCommands([greetCommand, chooseCommand]) //store all commands in an array
SimpleDiscord.launchBot() //now I launch it :)
```

<h2>Button Handling</h2>
To insert buttons in your bot messages, you need to `SimpleDiscord.Button({ customId: "myId", label: "myName", style:"primary"})` 
<br> you can add more than one buttons, but it requires a button row. `simplediscord.createButtonRow([button1, button2, button3])`


<br>Example:

```node.js
const buttoncmd = SimpleDiscord.createCommand({ name: "buttons", descript: "BUTTONSSSSS!"})
buttoncmd.excute = async interaction => {
  const button1 = SimpleDiscord.createButton({
    customId: "Button 1",
    label: "Button 1",
    style: "primary"
  })

  const row = SimpleDiscord.createButtonrow([button1])
  await interaction.reply({
    content: "Hi, I have a button now!!!!",
    components: [row] //adds the button
  })
}
```

With `SimpleDiscord.registerButtonHandler`, you can handle the proccesses affter the button has been clicked.

```node.js
SimpleDiscord.registerButtonHandler("button1", async interaction => {
  await interaction.reply({ content: "hi, I'm button 1!", emphemeral: true })
})
```

<h2>Additional</h2>

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
