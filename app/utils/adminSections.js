export const MENU_ITEM_FIELDS = [
  { key: 'id', label: 'id (anchor เช่น about)' },
  { key: 'label', label: 'ข้อความเมนู' },
]

export const PROJECT_FIELDS = [
  { key: 'title', label: 'ชื่อโปรเจกต์' },
  { key: 'description', label: 'คำอธิบาย', type: 'textarea' },
  { key: 'image_url', label: 'รูปภาพ', type: 'file', uploadFolder: 'projects' },
  { key: 'github_url', label: 'URL GitHub' },
  { key: 'github_label', label: 'ข้อความปุ่ม GitHub' },
  { key: 'demo_url', label: 'URL Live Demo' },
  { key: 'demo_label', label: 'ข้อความปุ่ม Live Demo' },
]

export const CONTACT_FIELDS = [
  {
    key: 'type',
    label: 'ประเภท (email / facebook / line / phone / github / link)',
    hint: 'ถ้าเว้นไว้ระบบจะเดาให้อัตโนมัติ',
  },
  { key: 'label', label: 'ข้อความที่แสดง' },
  { key: 'value', label: 'ค่า/URL (สำหรับ email, phone, link)' },
]

export const SECTION_DEFS = [
  {
    id: 'nav',
    title: 'แถบเมนู',
    fields: [
      { key: 'title', label: 'ชื่อ/โลโก้' },
      { key: 'menu_items', label: 'รายการเมนู', type: 'json', itemFields: MENU_ITEM_FIELDS },
    ],
  },
  {
    id: 'hero',
    title: 'หน้าแรก (Hero)',
    fields: [
      { key: 'greeting', label: 'คำทักทาย' },
      { key: 'name', label: 'ชื่อ' },
      { key: 'role', label: 'ตำแหน่ง (ภาษาไทย)' },
      { key: 'role_en', label: 'ตำแหน่ง (ภาษาอังกฤษ)' },
      { key: 'description', label: 'คำอธิบายสั้น', type: 'textarea' },
      { key: 'avatar_url', label: 'รูปโปรไฟล์', type: 'file', uploadFolder: 'avatar' },
      { key: 'btn_cv_label', label: 'ข้อความปุ่มดาวน์โหลด CV' },
      { key: 'btn_cv_url', label: 'ไฟล์ CV', type: 'file', uploadFolder: 'files', accept: 'application/pdf' },
      { key: 'btn_contact_label', label: 'ข้อความปุ่มข้อมูลติดต่อ' },
      { key: 'btn_github_label', label: 'ข้อความปุ่ม GitHub' },
      { key: 'github_url', label: 'URL GitHub' },
    ],
  },
  {
    id: 'about',
    title: 'เกี่ยวกับ (About)',
    fields: [
      { key: 'eyebrow', label: 'ข้อความเล็ก (eyebrow)' },
      { key: 'title', label: 'หัวข้อ' },
      { key: 'image_url', label: 'รูปภาพ', type: 'file', uploadFolder: 'about' },
      { key: 'exp_title', label: 'หัวข้อประสบการณ์' },
      { key: 'exp_lines', label: 'รายละเอียดประสบการณ์ (บรรทัดละ 1 รายการ)', type: 'textarea' },
      { key: 'edu_title', label: 'หัวข้อการศึกษา' },
      { key: 'edu_lines', label: 'รายละเอียดการศึกษา (บรรทัดละ 1 รายการ)', type: 'textarea' },
      { key: 'text_lines', label: 'ข้อความแนะนำตัว (บรรทัดละ 1 ย่อหน้า)', type: 'textarea' },
    ],
  },
  {
    id: 'experience',
    title: 'ประสบการณ์ / ทักษะ',
    fields: [
      { key: 'eyebrow', label: 'ข้อความเล็ก (eyebrow)' },
      { key: 'title', label: 'หัวข้อ' },
      { key: 'frontend_title', label: 'หัวข้อ Frontend' },
      { key: 'frontend_skills', label: 'ทักษะ Frontend (บรรทัดละ 1 รายการ)', type: 'textarea' },
      { key: 'backend_title', label: 'หัวข้อ Backend' },
      { key: 'backend_skills', label: 'ทักษะ Backend (บรรทัดละ 1 รายการ)', type: 'textarea' },
    ],
  },
  {
    id: 'projects',
    title: 'โปรเจกต์',
    fields: [
      { key: 'eyebrow', label: 'ข้อความเล็ก (eyebrow)' },
      { key: 'title', label: 'หัวข้อ' },
      { key: 'items', label: 'รายการโปรเจกต์', type: 'json', itemFields: PROJECT_FIELDS },
    ],
  },
  {
    id: 'contact',
    title: 'ติดต่อ',
    fields: [
      { key: 'eyebrow', label: 'ข้อความเล็ก (eyebrow)' },
      { key: 'title', label: 'หัวข้อ' },
      { key: 'items', label: 'ช่องทางติดต่อ', type: 'json', itemFields: CONTACT_FIELDS },
    ],
  },
  {
    id: 'footer',
    title: 'ท้ายเว็บ',
    fields: [{ key: 'text', label: 'ข้อความลิขสิทธิ์' }],
  },
]