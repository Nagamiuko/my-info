# My Info - เว็บโปรไฟล์ส่วนตัว

เว็บโปรไฟล์ (Portfolio) สร้างด้วย **Nuxt 4 + Prisma ORM** ดีไซน์ใหม่ทันสมัย โทนสีฟ้าอ่อน-ขาว รองรับมือถือ และทุกข้อความบนเว็บแก้ไขได้เองผ่านหน้า **ผู้ดูแล (/web-admin)** โดยใช้ **Supabase Postgres** เป็นฐานข้อมูล

## เริ่มต้นใช้งาน

```bash
yarn install     # ติดตั้ง dependencies
yarn dev         # รันโหมดพัฒนา
yarn build       # build เพื่อ deploy (รันด้วย node .output/server/index.mjs)
```

## ตั้งค่าฐานข้อมูล

1. สร้างไฟล์ `.env` จาก `.env.example` แล้วใส่ค่าจริง

```
DATABASE_URL=postgresql://postgres.<project-ref>:<DB_PASSWORD>@aws-0-<region>.pooler.supabase.com:6543/postgres?pgbouncer=true
ADMIN_SESSION_SECRET=<random 32+ ตัวอักษร>
```

- `DATABASE_URL` หาได้จาก **Supabase Dashboard > Project Settings > Database > Connection string** (เลือกโหมด Transaction, พอร์ต 6543)
- `ADMIN_SESSION_SECRET` ใช้เข้ารหัส session ของแอดมิน ต้องยาวอย่างน้อย 32 ตัวอักษร (เช่น `openssl rand -base64 32`)

2. สร้างตารางและใส่ข้อมูลเริ่มต้น

```bash
yarn db:generate   # สร้าง Prisma Client หลังแก้ schema
yarn db:push       # สร้างตาราง site_content และ admin_users
yarn db:seed       # ใส่ข้อมูลเริ่มต้น + บัญชีแอดมิน
```

## การเข้าใช้งานหลังบ้าน

- เปิดหน้า `https://<เว็บของคุณ>/web-admin`
- แก้ข้อความได้ทุกส่วน: เมนู, Hero, About, ทักษะ, โปรเจกต์, ติดต่อ, ท้ายเว็บ
- กด **บันทึกการเปลี่ยนแปลง** เพื่อเขียนลงฐานข้อมูล (หน้าเว็บอัปเดตทันที)

> เปลี่ยนรหัสผ่านได้โดยแก้ `password_hash` ในตาราง `admin_users`
> (SHA-256 ของรหัสใหม่ เช่น `sha256('รหัสใหม่')`) หรือแก้ใน `prisma/seed.mjs` แล้วรัน `yarn db:seed`

## โครงสร้างเนื้อหา (site_content)

ตารางเก็บค่าแบบ `section + key + value`:

| section     | เนื้อหา                              |
| ----------- | ------------------------------------ |
| `nav`       | ชื่อเว็บ + รายการเมนู                 |
| `hero`      | คำทักทาย ชื่อ ตำแหน่ง ปุ่ม CV/GitHub |
| `about`     | เกี่ยวกับตัวเรา ประสบการณ์ การศึกษา   |
| `experience`| ทักษะ Frontend / Backend              |
| `projects`  | รายการโปรเจกต์                        |
| `contact`   | ช่องทางติดต่อ                         |
| `footer`    | ข้อความท้ายเว็บ                       |

ถ้าเชื่อมต่อฐานข้อมูลไม่ได้ เว็บจะใช้ค่าเริ่มต้นจาก `shared/contentDefaults.js` แทน

## API

| Method | Route            | คำอธิบาย                          |
| ------ | ---------------- | --------------------------------- |
| GET    | `/api/content`   | ดึงเนื้อหาทั้งหมด                   |
| POST   | `/api/content`   | บันทึกเนื้อหา (ต้อง login แอดมิน)  |
| POST   | `/api/admin/login`  | เข้าสู่ระบบแอดมิน                |
| POST   | `/api/admin/logout` | ออกจากระบบแอดมิน                |
| GET    | `/api/admin/me`  | ตรวจสอบสถานะ session แอดมิน       |

## โครงสร้างโปรเจกต์

```
app/
  pages/           # index.vue (หน้าแรก), web-admin.vue (หลังบ้าน)
  components/      # Nav, Footer, sections/*, admin/*
  composables/     # useContent, useAdmin
  utils/           # adminSections.js (นิยามฟอร์มแก้ไขเนื้อหา)
  assets/css/      # main.css (สไตล์ทั้งหมด)
shared/            # contentDefaults.js (ค่าเริ่มต้นของเนื้อหา)
server/
  api/             # REST API (content, admin)
  utils/           # prisma, session
prisma/            # schema.prisma, seed.mjs
```