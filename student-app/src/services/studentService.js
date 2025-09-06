// a tiny service that persists to localStorage and simulates async calls
const STORAGE_KEY = 'students_v1';
const initial = [
  { id: '1', name: 'Alice', age: 20, course: 'Mathematics' },
  { id: '2', name: 'Bob', age: 22, course: 'Physics' }
];

function read() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return [...initial];
  }
  try { return JSON.parse(raw); } catch { return []; }
}

function save(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function delay(ms = 200) {
  return new Promise(res => setTimeout(res, ms));
}

export const studentService = {
  async getAll() {
    await delay();
    return read();
  },
  async getById(id) {
    await delay();
    return read().find(s => s.id === id) || null;
  },
  async create(student) {
    await delay();
    const list = read();
    const newStudent = { ...student, id: Date.now().toString() };
    list.push(newStudent);
    save(list);
    return newStudent;
  },
  async update(id, payload) {
    await delay();
    const list = read();
    const i = list.findIndex(s => s.id === id);
    if (i === -1) throw new Error('Not found');
    list[i] = { ...list[i], ...payload };
    save(list);
    return list[i];
  },
  async remove(id) {
    await delay();
    const list = read().filter(s => s.id !== id);
    save(list);
    return true;
  }
};
