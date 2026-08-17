// ============================================================
// ค่าเริ่มต้นของทุกข้อความในเว็บ (ใช้เมื่อยังไม่มีข้อมูลใน DB)
// ไฟล์นี้ใช้ร่วมกันระหว่าง frontend (app), server และ seed
// ============================================================

export const DEFAULT_CONTENT = {
  nav: {
    title: 'Phutthisan Kongkha',
    menu_items: JSON.stringify([
      { id: 'about', label: 'About' },
      { id: 'experience', label: 'Experience' },
      { id: 'projects', label: 'Projects' },
      { id: 'contact', label: 'Contact' },
    ]),
  },
  hero: {
    greeting: 'สวัสดีครับ',
    name: 'นาย พุทธิสาร กองค้า',
    role: 'พัฒนาเว็บไซต์ในรูปแบบหน้าบ้านเป็นหลักครับ',
    role_en: '(Frontend Developer)',
    description:
      'ผมเป็น Frontend Developer ที่ชื่นชอบการออกแบบและพัฒนาเว็บไซต์ให้สวยงาม ใช้งานง่าย และตอบสนองได้ดีบนทุกอุปกรณ์',
    avatar_url: 'https://pub-22d98ac526904d728be682d613e786a1.r2.dev/avatar/IMG_3761.jpg',
    btn_cv_label: 'ดาวน์โหลด CV',
    btn_cv_url: 'https://pub-22d98ac526904d728be682d613e786a1.r2.dev/files/resume_1036.pdf',
    btn_contact_label: 'ข้อมูลติดต่อ',
    btn_github_label: 'Git',
    github_url: 'https://github.com/Nagamiuko',
  },
  about: {
    eyebrow: 'Get To Know More',
    title: 'About Me',
    image_url: 'https://pub-22d98ac526904d728be682d613e786a1.r2.dev/avatar/IMG_5094.png',
    exp_title: 'ประสบการณ์',
    exp_lines:
      'เคยเข้าร่วมการสอบ\nการเป็นนักพัฒนาระบบ\nโปรแกรมเมอร์ ระดับ 3 ของ บริษัท TPQI\nสถาบันคุณวุติวิชาชีพ',
    edu_title: 'การศึกษา',
    edu_lines:
      'ณ ปัจจุบัน\nกำลังศึกษาอยู่ที่มหาวิทยาลัยมหาสารคาม\nคณะวิทยาการสารสนเทศ\nสาขาเทคโนโลยีสารสนเทศ',
    text_lines:
      'ตั้งแต่ผมเริ่มต้นเรียนการเป็น Web Developer มาได้ 2-3 ปี ผมก็มีความรู้สึกชอบมันมากยิ่งขึ้นในด้านการเขียนโปรแกรม และภาษาค่อนข้างหลากหลายให้เรียกใช้ในการเขียน\nแต่ส่วนใหญ่ผมใช้ JavaScript, HTML, CSS เพื่อเขียนหน้าเว็บ\nส่วนที่ผมชอบที่สุดคงเป็น React JS เพราะเป็น framework ที่เรียนรู้ได้ง่ายและสะดวกมากสำหรับทำ web frontend และการติดต่อกับ API ต่าง ๆ',
  },
  experience: {
    eyebrow: 'Explore My',
    title: 'Experience',
    frontend_title: 'Frontend Developer',
    frontend_skills: 'HTML\nCSS\nSASS\nJavaScript\nReact JS',
    backend_title: 'Backend Developer',
    backend_skills: 'Node JS\nExpress JS\nMongoDB\nMySQL',
  },
  projects: {
    eyebrow: 'Browse My Recent',
    title: 'Projects',
    items: JSON.stringify([
      {
        title: 'Web ComicBook Novels',
        description: 'เว็บไซต์อ่านหนังสือการ์ตูนและนิยายออนไลน์ รองรับการใช้งานบนมือถือ',
        image_url: 'https://pub-22d98ac526904d728be682d613e786a1.r2.dev/projects/web.jpg',
        github_url: 'https://github.com/Nagamiuko/project_final.git',
        github_label: 'GitHub',
        demo_url: 'https://project-final-eight.vercel.app/',
        demo_label: 'Live Demo',
      },
    ]),
  },
  contact: {
    eyebrow: 'Get In Touch',
    title: 'Contact Me',
    items: JSON.stringify([
      { type: 'email', label: 'puttisan.7353@gmail.com', value: 'puttisan.7353@gmail.com' },
      { type: 'facebook', label: 'Masaoli Tisan', value: 'https://web.facebook.com/Miyalodont/' },
      { type: 'line', label: 'Line ID : tisan_retrun', value: '' },
      { type: 'phone', label: '0628607353', value: '' },
    ]),
  },
  footer: {
    text: 'Copyright © 2024 Phutthisan KK. All Rights Reserved',
  },
}

// ผสานแถวจาก DB ({ section, key, value }) เข้ากับค่าเริ่มต้น
export function mergeContent(rows = []) {
  const merged = JSON.parse(JSON.stringify(DEFAULT_CONTENT))
  for (const row of rows) {
    if (!row || !row.section || row.key == null) continue
    if (!merged[row.section]) merged[row.section] = {}
    merged[row.section][row.key] = row.value
  }
  return merged
}

export const parseList = (value) =>
  String(value || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

export const parseJson = (value, fallback = []) => {
  try {
    const parsed = JSON.parse(value || '')
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}