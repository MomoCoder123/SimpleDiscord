// make sure discord.js is installed well
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { Client, GatewayIntentsBits, Collection } = require("discord.js")
const client = new Client({
  intents:[
    GatewayIntentBits.Guilds
  ]
})
