สิ่งที่ติดตั้ง (`npm install`) 

====Frontend
`vue`                           Framework หลัก          
`axios`                         ใช้เรียก RESTful API    
`bootstrap`                     ตกแต่งหน้าตา UI         
`vite`                          Build tool สำหรับ Vue 3 


====Backend
`express`                       สร้าง RESTful API                        
`cors`                          อนุญาตให้ frontend เรียก backend         
`@prisma/client`                ใช้ Prisma เชื่อมฐานข้อมูล              
`prisma` (dev dependency)       CLI สำหรับสร้าง schema และ migrate       
`dotenv`                        โหลดตัวแปรจาก `.env` เช่น `DATABASE_URL` 


====PostgreSQL
`prisma init`                   สร้าง `schema.prisma`      
`npx prisma migrate dev`        สร้างตารางในฐานข้อมูล      
`DATABASE_URL` ใน `.env`        เชื่อมกับ PostgreSQL local 
`psql` ผ่าน SQL Shell            ใช้ดูข้อมูลในฐาน           
