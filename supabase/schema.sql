-- ============================================================
-- my-info profile site
-- ไปที่ Supabase Dashboard > SQL Editor แล้ววางรันทั้งหมดได้เลย
-- ============================================================

-- ---------- ตารางเก็บข้อความทุกชั้นของเว็บ ----------
create table if not exists public.site_content (
  id uuid primary key default gen_random_uuid(),
  section text not null,
  key text not null,
  value text not null default '',
  updated_at timestamptz not null default now(),
  unique (section, key)
);

-- ---------- ตารางบัญชีแอดมิน ----------
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password_hash text not null,
  updated_at timestamptz not null default now()
);

-- ---------- RLS ----------
alter table public.site_content enable row level security;
alter table public.admin_users enable row level security;

-- อ่านข้อมูลสาธารณะได้ (หน้าเว็บ profile)
drop policy if exists "public_read_site_content" on public.site_content;
create policy "public_read_site_content"
  on public.site_content for select
  using (true);

-- แก้ไข/เพิ่ม/ลบ ต้องมี header x-admin-secret ตรงกัน
drop policy if exists "admin_write_site_content" on public.site_content;
create policy "admin_write_site_content"
  on public.site_content for all
  using (request.headers['x-admin-secret'] = 'FrhB4HXu4PvSmj7YlnrVC3Up4UEAH7IG')
  with check (request.headers['x-admin-secret'] = 'FrhB4HXu4PvSmj7YlnrVC3Up4UEAH7IG');

-- อ่านบัญชี admin ต้องมี secret (สำหรับขั้นตอนล็อกอิน)
drop policy if exists "admin_read_admin_users" on public.admin_users;
create policy "admin_read_admin_users"
  on public.admin_users for select
  using (request.headers['x-admin-secret'] = 'FrhB4HXu4PvSmj7YlnrVC3Up4UEAH7IG');

-- ---------- บัญชีแอดมินเริ่มต้น ----------
-- username: admin / password: admin123  (เปลี่ยนได้ที่หน้าเว็บ-admin)
insert into public.admin_users (username, password_hash)
values ('admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9')
on conflict (username) do nothing;

-- ---------- ข้อมูลเริ่มต้น (seed) ----------
insert into public.site_content (section, key, value) values
  ('nav', 'title', 'Phutthisan Kongkha'),
  ('nav', 'menu_items', '[{"id":"about","label":"About"},{"id":"experience","label":"Experience"},{"id":"projects","label":"Projects"},{"id":"contact","label":"Contact"}]'),

  ('hero', 'greeting', 'สวัสดีครับ'),
  ('hero', 'name', 'นาย พุทธิสาร กองค้า'),
  ('hero', 'role', 'พัฒนาเว็บไซต์ในรูปแบบหน้าบ้านเป็นหลักครับ'),
  ('hero', 'role_en', '(Frontend Developer)'),
  ('hero', 'description', 'ผมเป็น Frontend Developer ที่ชื่นชอบการออกแบบและพัฒนาเว็บไซต์ให้สวยงาม ใช้งานง่าย และตอบสนองได้ดีบนทุกอุปกรณ์'),
  ('hero', 'avatar_url', '/avatar/IMG_3761.jpg'),
  ('hero', 'btn_cv_label', 'ดาวน์โหลด CV'),
  ('hero', 'btn_cv_url', '/resume_1036.pdf'),
  ('hero', 'btn_contact_label', 'ข้อมูลติดต่อ'),
  ('hero', 'btn_github_label', 'Git'),
  ('hero', 'github_url', 'https://github.com/Nagamiuko'),

  ('about', 'eyebrow', 'Get To Know More'),
  ('about', 'title', 'About Me'),
  ('about', 'image_url', '/avatar/IMG_5094.png'),
  ('about', 'exp_title', 'ประสบการณ์'),
  ('about', 'exp_lines', 'เคยเข้าร่วมการสอบ\nการเป็นนักพัฒนาระบบ\nโปรแกรมเมอร์ ระดับ 3 ของ บริษัท TPQI\nสถาบันคุณวุติวิชาชีพ'),
  ('about', 'edu_title', 'การศึกษา'),
  ('about', 'edu_lines', 'ณ ปัจจุบัน\nกำลังศึกษาอยู่ที่มหาวิทยาลัยมหาสารคาม\nคณะวิทยาการสารสนเทศ\nสาขาเทคโนโลยีสารสนเทศ'),
  ('about', 'text_lines', 'ตั้งแต่ผมเริ่มต้นเรียนการเป็น Web Developer มาได้ 2-3 ปี ผมก็มีความรู้สึกชอบมันมากยิ่งขึ้นในด้านการเขียนโปรแกรม และภาษาค่อนข้างหลากหลายให้เรียกใช้ในการเขียน\nแต่ส่วนใหญ่ผมใช้ JavaScript, HTML, CSS เพื่อเขียนหน้าเว็บ\nส่วนที่ผมชอบที่สุดคงเป็น React JS เพราะเป็น framework ที่เรียนรู้ได้ง่ายและสะดวกมากสำหรับทำ web frontend และการติดต่อกับ API ต่าง ๆ'),

  ('experience', 'eyebrow', 'Explore My'),
  ('experience', 'title', 'Experience'),
  ('experience', 'frontend_title', 'Frontend Developer'),
  ('experience', 'frontend_skills', 'HTML\nCSS\nSASS\nJavaScript\nReact JS'),
  ('experience', 'backend_title', 'Backend Developer'),
  ('experience', 'backend_skills', 'Node JS\nExpress JS\nMongoDB\nMySQL'),

  ('projects', 'eyebrow', 'Browse My Recent'),
  ('projects', 'title', 'Projects'),
  ('projects', 'items', '[{"title":"Web ComicBook Novels","description":"เว็บไซต์อ่านหนังสือการ์ตูนและนิยายออนไลน์ รองรับการใช้งานบนมือถือ","image_url":"/project/web.jpg","github_url":"https://github.com/Nagamiuko/project_final.git","github_label":"GitHub","demo_url":"https://project-final-eight.vercel.app/","demo_label":"Live Demo"}]'),

  ('contact', 'eyebrow', 'Get In Touch'),
  ('contact', 'title', 'Contact Me'),
  ('contact', 'items', '[{"type":"email","label":"puttisan.7353@gmail.com","value":"puttisan.7353@gmail.com"},{"type":"facebook","label":"Masaoli Tisan","value":"https://web.facebook.com/Miyalodont/"},{"type":"line","label":"Line ID : tisan_retrun","value":""},{"type":"phone","label":"0628607353","value":""}]'),

  ('footer', 'text', 'Copyright © 2024 Phutthisan KK. All Rights Reserved')
on conflict (section, key) do nothing;