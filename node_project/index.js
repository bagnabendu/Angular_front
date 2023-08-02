const express=require('express')
const body_parser=require('body-parser')
const mongoose=require('mongoose')
const cors=require('cors')
const app=express()
const multer=require('multer')
const path=require('path')
app.use(cors())


const port=3400

app.use(body_parser.urlencoded({extended:true}))
app.use(body_parser.json())
app.use('/uplode',express.static(path.join(__dirname,'uplode')))

const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uplode')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const fileFilter=(req,file,cb)=>{
    if (file.mimetype.includes('jpg')||
    file.mimetype.includes('png')||
    file.mimetype.includes('jpeg')) {
        cb(null,true)
    } else {
        cb(null,false)
    }
}
app.use(multer({storage:fileStorage,fileFilter:fileFilter,limits:{fieldSize:1024*1024*5}}).single('image'))

const approute=require('./route/web')
app.use(approute)

const dbcon="mongodb+srv://nabendumongodb:2h6KGtyXamQHxF6J@cluster0.k1maidj.mongodb.net/MEANPROJECT"
mongoose.connect(dbcon,({useNewUrlParser:true,UseUnifiedTopology:true}))
.then(result=>{
    app.listen(port,(req,res)=>{
        console.log(`server is running http://localhost:${port}`);
        console.log("database is connected");
    })
}).catch(err=>{
    console.log(err);
})

