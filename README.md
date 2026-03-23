# Real-time Chat App Project

Project chat app (React + Node.js + Socket.IO) với kiến trúc dữ liệu kết hợp:
- `Oracle`: dữ liệu quan hệ cố định (users, friendships, conversations, conversation_members)
- `MongoDB`: dữ liệu linh hoạt dạng log tin nhắn (`messages`)
- `Redis`: sẵn sàng cho realtime scaling/caching (Level 4)

## 1) Cấu trúc source code

```text
chat-app-project/
├─ client/                     # React + Vite + TypeScript
├─ server/                     # Node.js + Express + Socket.IO
│  ├─ db/oracle/init.sql       # Script tạo user/schema/table Oracle
│  ├─ routes/                  # API routes
│  ├─ src/
│  │  ├─ config/
│  │  │  ├─ db.js              # Kết nối MongoDB
│  │  │  └─ oracle.js          # Kết nối Oracle
│  │  ├─ controllers/
│  │  │  └─ authController.js
│  │  ├─ repositories/
│  │  │  └─ userRepoOracle.js  # Truy vấn Oracle cho user
│  │  └─ models/
│  │     └─ Messages.js        # Schema MongoDB cho tin nhắn
│  └─ server.js                # Entry point backend
├─ docker-compose.yml          # Chạy full stack bằng Docker
└─ README.md
```

## 2) Công nghệ đang dùng

### Backend (`server`)
- `express`, `socket.io`
- `mongoose` (MongoDB)
- `oracledb` (Oracle)
- `bcrypt`, `jsonwebtoken`, `dotenv`, `cors`
- `nodemon` (dev)

### Frontend (`client`)
- `react`, `react-router-dom`
- `vite`, `typescript`
- `tailwindcss` + postcss stack (đã cài)

## 3) Biến môi trường cần thiết

### 3.1 File `server/.env` (chạy backend local)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/chat_app_db
JWT_SECRET=my_super_secret_key_for_jwt
ORACLE_USER=chatapp
ORACLE_PASSWORD=chatapp
ORACLE_CONNECT_STRING=localhost:1521/FREEPDB1
```

### 3.2 Khi chạy bằng Docker Compose
Trong `docker-compose.yml`, service `server` đã override sẵn:
- `MONGO_URI=mongodb://mongodb:27017/chat_app_db`
- `ORACLE_CONNECT_STRING=oracle:1521/FREEPDB1`

=> Không cần sửa thêm nếu chạy full stack bằng Compose.

## 4) Cài thư viện cần thiết

## 4.1 Cài cho backend

```bash
cd server
npm install
```

## 4.2 Cài cho frontend

```bash
cd client
npm install
```

## 4.3 Cài ở root (nếu cần)
Root `package.json` hiện chỉ có devDependencies TypeScript types, không ảnh hưởng trực tiếp runtime app.

```bash
cd ..
npm install
```

## 5) Tạo database/schema (Oracle + Mongo)

## 5.1 Oracle

### Cách A (khuyến nghị): tự động qua Docker Compose
- File `server/db/oracle/init.sql` sẽ tự chạy khi Oracle container khởi tạo lần đầu.
- Script này tạo:
  - user/schema `chatapp`
  - bảng `users`
  - bảng `friendships`
  - bảng `conversations`
  - bảng `conversation_members`
  - index/constraint liên quan

### Cách B: chạy tay script SQL (khi cần chạy lại)

```bash
docker exec -it chat_oracle bash
sqlplus / as sysdba @/container-entrypoint-initdb.d/init.sql
```

> Lưu ý: nếu thay đổi script init mà Oracle đã có volume cũ, cần xóa volume để init lại từ đầu.

## 5.2 MongoDB
- Mongo không cần script tạo schema trước.
- Database `chat_app_db` và collection sẽ tự tạo khi app ghi dữ liệu lần đầu.

## 6) Lệnh chạy dự án

## 6.1 Chạy toàn bộ bằng Docker Compose (đơn giản nhất)

Tại thư mục root project:

```bash
docker compose up -d --build
```

Kiểm tra trạng thái:

```bash
docker compose ps
```

Xem log:

```bash
docker compose logs -f server
docker compose logs -f oracle
```

Dừng:

```bash
docker compose down
```

Dừng + xóa volume (reset DB sạch):

```bash
docker compose down -v
```

## 6.2 Chạy local tách server/client (không compose cho app)

### Bước 1: chạy DB containers trước
Chạy tối thiểu Mongo + Oracle + Redis:

```bash
docker compose up -d mongodb oracle redis
```

### Bước 2: chạy backend local

```bash
cd server
npm run dev
```

### Bước 3: chạy frontend local

```bash
cd client
npm run dev
```

## 7) Thứ tự chạy chuẩn (trước/sau)

### Luồng chuẩn lần đầu (khuyến nghị)
1. `docker compose down -v` (nếu muốn reset sạch)
2. `docker compose up -d --build`
3. `docker compose ps` (xác nhận `chat_server`, `chat_oracle`, `chat_mongodb`, `chat_redis` đều Up)
4. Test API backend:
   - `GET http://localhost:5000/api/`
   - `POST http://localhost:5000/api/auth/register`
5. Chạy frontend (`client`) nếu chưa chạy trong container:
   - `npm install`
   - `npm run dev`

### Luồng dev hằng ngày (nhanh)
1. `docker compose up -d mongodb oracle redis`
2. `cd server && npm run dev`
3. `cd client && npm run dev`

## 8) API hiện có

### Health
- `GET /api/` -> `Chat App Server is running`

### Auth
- `POST /api/auth/register`
  - body:

```json
{
  "email": "user@example.com",
  "login_name": "user1",
  "password_hash": "123456",
  "display_name": "User One",
  "avatar_url": "",
  "is_active": true
}
```

## 9) Mapping dữ liệu: Oracle vs MongoDB

### Dùng Oracle (quan hệ/cố định)
- `users`
- `friendships`
- `conversations`
- `conversation_members`

### Dùng MongoDB (linh hoạt/log)
- `messages` (`server/src/models/Messages.js`)
  - `conversation_id` (Number - map từ Oracle conversation id)
  - `sender_id` (Number - map từ Oracle user id)
  - `type`, `content`, `media_attachments`, `read_by`, `created_at`

## 10) Ghi chú quan trọng

- File `server/src/models/User.js` có thể còn tồn tại từ giai đoạn cũ, nhưng luồng đăng ký hiện đang dùng Oracle repository (`userRepoOracle.js`).
- Nếu Oracle báo sai mật khẩu/quyền do volume cũ:
  - `docker compose down -v`
  - `docker compose up -d --build`
- `docker-compose.yml` có thể cảnh báo trường `version` obsolete; cảnh báo này không làm hỏng chạy app.

