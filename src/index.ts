import axios from 'axios'
import Client from './client/Client'
const api = 'https://discord.com/api/v9'
const token = 'Nzg1ODgxOTk1NDc2ODYwOTc5.X8-TpA.cYGqnporjwOBgpalYIs7vQ7sCOo'

async function test() {
  const client = new Client(token, {
  })

  await client.login()
}

test()