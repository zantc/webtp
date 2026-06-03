import { getUsers } from '~/server/services/userService'
import { apiServer } from '~/server/utils/apiServer'

export default apiServer(async (event) => {
  const user = event.context.user
  return await getUsers()
}, { auth: true })