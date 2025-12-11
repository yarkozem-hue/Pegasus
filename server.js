const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'messages.json');

function ensureDataFile(){
  if(!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
  if(!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}

ensureDataFile();

app.use(express.static(path.join(__dirname, 'public')));

// Simple in-memory admin tokens (not persisted) and credentials from env
const adminTokens = new Map();
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'password';

function generateToken(){
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function requireAdmin(req, res, next){
  const auth = req.headers.authorization || '';
  if(!auth.startsWith('Bearer ')) return res.status(401).json({ error: 'unauthorized' });
  const token = auth.slice(7);
  if(!adminTokens.has(token)) return res.status(401).json({ error: 'unauthorized' });
  next();
}

// Admin login: returns token when username/password correct
app.post('/api/admin/login', (req, res)=>{
  const { username, password } = req.body || {};
  if(username === ADMIN_USER && password === ADMIN_PASS){
    const token = generateToken();
    adminTokens.set(token, { createdAt: Date.now() });
    // tokens expire in memory after 1 day
    setTimeout(()=> adminTokens.delete(token), 24 * 3600 * 1000);
    return res.json({ token });
  }
  res.status(401).json({ error: 'invalid_credentials' });
});

// Admin endpoints
app.get('/api/admin/messages', requireAdmin, (req, res)=>{
  try{
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const items = JSON.parse(raw || '[]');
    res.json(items);
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'read_error' });
  }
});

app.delete('/api/admin/messages', requireAdmin, (req, res)=>{
  try{
    fs.writeFileSync(DATA_FILE, '[]', 'utf8');
    res.json({ ok: true });
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'delete_error' });
  }
});

app.get('/api/admin/export', requireAdmin, (req, res)=>{
  try{
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const items = JSON.parse(raw || '[]');
    const csv = ['id,name,email,message,createdAt']
      .concat(items.map(i=>[
        i.id,
        '"'+String(i.name).replace(/"/g,'""')+'"',
        '"'+String(i.email).replace(/"/g,'""')+'"',
        '"'+String(i.message).replace(/"/g,'""')+'"',
        i.createdAt
      ].join(',')))
      .join('\n');
    res.setHeader('Content-Type','text/csv');
    res.setHeader('Content-Disposition','attachment; filename="messages.csv"');
    res.send(csv);
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'export_error' });
  }
});

app.get('/api/messages', (req, res)=>{
  try{
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const items = JSON.parse(raw || '[]');
    res.json(items);
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'read_error' });
  }
});

app.post('/api/contact', (req, res)=>{
  const { name, email, message } = req.body || {};
  if(!name || !email || !message) return res.status(400).json({ error: 'missing_fields' });

  const item = { id: Date.now(), name, email, message, createdAt: new Date().toISOString() };
  try{
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const arr = JSON.parse(raw || '[]');
    arr.push(item);
    fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2), 'utf8');
    res.status(201).json(item);
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'write_error' });
  }
});

app.delete('/api/messages', (req, res)=>{
  try{
    fs.writeFileSync(DATA_FILE, '[]', 'utf8');
    res.json({ ok: true });
  }catch(e){
    console.error(e);
    res.status(500).json({ error: 'delete_error' });
  }
});

const PORT = process.env.PORT || 5174;
app.listen(PORT, ()=>{
  console.log('Server listening on', PORT);
});
