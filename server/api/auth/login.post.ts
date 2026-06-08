import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  // 1. Lấy tên đăng nhập và mật khẩu từ form gửi lên
  const body = await readBody(event);
  const { username, password } = body;

  try {
    // 2. Kết nối Database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'webtp'
    });

    // 3. Tìm tài khoản trong bảng tai_khoan (chỉ lấy tài khoản có trang_thai = 1)
    const [rows]: any = await connection.execute(
      'SELECT id, ten_dang_nhap, ho_ten, vai_tro, mat_khau FROM tai_khoan WHERE ten_dang_nhap = ? AND mat_khau = ? AND trang_thai = 1',
      [username, password]
    );

    await connection.end();

    // 4. Nếu không tìm thấy dòng nào -> Sai thông tin
    if (rows.length === 0) {
      throw createError({ 
        statusCode: 401, 
        statusMessage: 'Tên đăng nhập hoặc mật khẩu không đúng!' 
      });
    }

    const user = rows[0];

    // 5. Nếu đúng, tạo chứng minh thư (JWT Token)
    // Lấy khóa bí mật từ file .env (JWT_SECRET=dev_secret_key) mà bạn đã có
    const secret = process.env.JWT_SECRET || 'dev_secret_key'; 
    
    // Nén thông tin id, quyền hạn vào trong token, hạn sử dụng 1 ngày
    const token = jwt.sign(
      { id: user.id, username: user.ten_dang_nhap, role: user.vai_tro },
      secret,
      { expiresIn: '1d' }
    );

    // 6. Trả Token và thông tin cơ bản về cho giao diện
    return {
      token: token,
      userInfo: {
        id: user.id,
        ten_dang_nhap: user.ten_dang_nhap,
        ho_ten: user.ho_ten,
        vai_tro: user.vai_tro
      }
    };

  } catch (error: any) {
    // Xử lý báo lỗi ra màn hình
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Lỗi kết nối Server/Database'
    });
  }
});
