// server/middleware/auth.ts

export default defineEventHandler(async (event) => {
  // Lấy token từ Header
  const token = getHeader(event, 'authorization')

  // Nếu không có token hoặc token sai
  if (!token || token !== 'Bearer your-secret-token') {
    return sendError(
      event,
      createError({ statusCode: 401, message: 'Unauthorized' })
    )
  }

  // Nếu hợp lệ thì tiếp tục cho chạy API
})
