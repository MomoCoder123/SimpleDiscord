const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { Client, GatewayIntentBits, Collection, MessageActionRow, MessageButton } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")

let client
let commands = []
let botConfig = {}

// Initialize the bot and store configuration variables
function config(options = {}) {
  client = new Client({
    intents: options.intents || [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ]
  })
  client.commands = new Collection()

  botConfig.token = options.token
  botConfig.clientId = options.clientId
  botConfig.guildId = options.guildId

  console.log("Client initialized and configuration set.")
}

// Create a command with options
function createCommand({ name, description, stringOptions = [], userOptions = [] }) {
  const command = new SlashCommandBuilder().setName(name).setDescription(description)

  stringOptions.forEach(option => {
    command.addStringOption(opt =>
      opt.setName(option.name)
        .setDescription(option.description)
        .setRequired(option.required || false)
        .addChoices(...(option.choices || []))
    )
  })

  userOptions.forEach(option => {
    command.addUserOption(opt =>
      opt.setName(option.name)
        .setDescription(option.description)
        .setRequired(option.required || false)
    )
  })

  return command
}

// Set up commands
function setCommands(commandList = []) {
  commands = commandList.map(cmd => cmd.toJSON())
  commandList.forEach(cmd => {
    client.commands.set(cmd.name, cmd)
  })
  console.log("Commands set.")
}

// Launch the bot using stored configuration
async function launchBot() {
  if (!client) {
    throw new Error("Client is not initialized. Call config() first.")
  }

  const { token, clientId, guildId } = botConfig
  if (!token || !clientId || !guildId) {
    throw new Error("Token, clientId, and guildId must be set in config() before launching the bot.")
  }

  const rest = new REST({ version: "9" }).setToken(token)
  try {
    console.log("Started refreshing application (/) commands.")
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands
    })
    console.log("Successfully reloaded application (/) commands.")
  } catch (error) {
    console.error(error)
  }

  client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand() && !interaction.isButton()) return

    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName)
      if (!command) return

      try {
        await command.execute(interaction)
      } catch (error) {
        console.error(error)
        await interaction.reply({ content: "There was an error executing this command!", ephemeral: true })
      }
    }

    if (interaction.isButton()) {
      const handler = client.buttonHandlers?.[interaction.customId]
      if (handler) {
        try {
          await handler(interaction)
        } catch (error) {
          console.error(error)
          await interaction.reply({ content: "There was an error handling this button!", ephemeral: true })
        }
      }
    }
  })

  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
  })

  client.login(token)
}

// Helper function to create buttons
function createButton({ customId, label, style = "PRIMARY" }) {
  return new MessageButton().setCustomId(customId).setLabel(label).setStyle(style)
}

// Helper function to create rows of buttons
function createButtonRow(buttons = []) {
  return new MessageActionRow().addComponents(buttons)
}

// Register button handlers
function registerButtonHandler(customId, handler) {
  if (!client.buttonHandlers) {
    client.buttonHandlers = {}
  }
  client.buttonHandlers[customId] = handler
}

module.exports = {
  config,
  createCommand,
  setCommands,
  launchBot,
  createButton,
  createButtonRow,
  registerButtonHandler
}
