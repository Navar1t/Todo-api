
import express from 'express'
import cors from 'cors' //อนุญาตให้ frontend จากคนละ ไฟล์ เรียก API ได้
import { PrismaClient } from '@prisma/client'

const app = express()
const prisma = new PrismaClient() //ใช้สื่อสารกับฐานข้อมูล

app.use(cors())
app.use(express.json())


// ดึงข้อมูลทั้งหมดจากตาราง Todo
app.get('/todos', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({ orderBy: { id: 'asc' } }) // id จากน้อย > มาก
    res.json(todos)
  } catch (error) {
    console.error('GET /todos error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})
// ดึงข้อมูลทั้งหมดจากตาราง Todo


// ส่วนของสร้างงานขึ้นมาใหม่ใน list
app.post('/todos', async (req, res) => {
  const { work } = req.body
  if (!work || work.trim() === '') {
    return res.status(400).json({ error: 'work is required' })
  }

  try {
    const newTodo = await prisma.todo.create({ data: { work } }) // บันทึกลงฐานข้อมูล
    res.status(201).json(newTodo)
  } catch (error) {
    console.error('POST /todos error:', error)
    res.status(500).json({ error: 'Failed to create todo' })
  }
})
// ส่วนของสร้างงานขึ้นมาใหม่ใน list

// เปลี่ยนสถานะ
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params
  const { done } = req.body

  try {
    const updated = await prisma.todo.update({
      where: { id: Number(id) },
      data: { done: Boolean(done) }
    })
    res.json(updated)
  } catch (error) {
    console.error(`PUT /todos/${id} error:`, error)
    res.status(404).json({ error: 'Todo not found' })
  }
})
// เปลี่ยนสถานะ


// ลบงาน
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params

  try {
    await prisma.todo.delete({ where: { id: Number(id) } })
    res.json({ message: 'Todo deleted' })
  } catch (error) {
    console.error(`DELETE /todos/${id} error:`, error)
    res.status(404).json({ error: 'Todo not found' })
  }
})
// ลบงาน

// เริ่มเซิร์ฟเวอร์
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`))
