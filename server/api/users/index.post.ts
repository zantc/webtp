
import { addUser } from '~/server/services/userService'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const user = addUser(body.name)
  return user
})