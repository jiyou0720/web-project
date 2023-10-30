const express = require('express')
const fs = require('fs')
// express로 서버를 만듦
const app = express()
const port = 3000
const cors = require('cors')
const template=require('./lib/template.js')

// const template = {
//     HTML:function(name, list, body){
//         return `<!DOCTYPE html>
//         <html lang="ko">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <meta http-equiv="X-UA-Compatible" content="ie=edge">
//             <title>sunrin</title>
//         </head>
//         <body>
//             <h1><a href="sunrin.html">선리인터넷고등학교</a></h1>
//             <!-- 메뉴부분 -->
//             <ol>
//                 <li><a href="infor.html">정보보호과</a></li>
//                 <li><a href="sw.html">소프트웨어과</a></li>
//                 <li><a href="it.html">IT경영과</a></li>
//                 <li><a href="design.html">콘텐츠디자인과</a></li>
//             </ol>
        
//             <h2>sunrin 페이지</h2>
//             <p>소개 내용</p>
//         </body>
//         </html>`
//     }, list:function(files){
//         let list = '<ol>'
//         for(i=0; i<files.length; i++){
//             lsit=list+`<li><a href="?name=${files[i]}>${files[i]}</a></li>`
//         }
//         list=list+'</ol>'
    
//         return list
//     }
// }

// function templateHTML(name, list, body){
//     return `<!DOCTYPE html>
//     <html lang="ko">
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <meta http-equiv="X-UA-Compatible" content="ie=edge">
//         <title>sunrin</title>
//     </head>
//     <body>
//         <h1><a href="sunrin.html">선리인터넷고등학교</a></h1>
//         <!-- 메뉴부분 -->
//         <ol>
//             <li><a href="infor.html">정보보호과</a></li>
//             <li><a href="sw.html">소프트웨어과</a></li>
//             <li><a href="it.html">IT경영과</a></li>
//             <li><a href="design.html">콘텐츠디자인과</a></li>
//         </ol>
    
//         <h2>sunrin 페이지</h2>
//         <p>소개 내용</p>
//     </body>
//     </html>`
// }

// function templateList(files){
//     let list = '<ol>'
//     for(i=0; i<files.length; i++){
//         lsit=list+`<li><a href="?name=${files[i]}>${files[i]}</a></li>`
//     }
//     list=list+'</ol>'

//     return list
// }

app.get('/', (req, res)=>{
    // const q=req.query
    // const name=q.name  =↓
    let {name}=req.query

    fs.readdir('pages', (err, files)=>{
        // let list = '<ol>'
        // for(i=0; i<files.length; i++){
        //     lsit=list+`<li><a href="?name=${files[i]}>${files[i]}</a></li>`
        // }
        // list=list+'</ol>'
        let list=template.list(files)

        fs.readFile(`pages/${name}`, 'utf8', (err, data)=>{
            if(name===undefined){
                name='sunrin'
                data='Welcome'
            }

            const html=template.HTML(name, list, `<h2>${name}페이지</h2> <p>${data}</p>`)
        // //     <!DOCTYPE html>
        // // <html lang="ko">
        // // <head>
        // //     <meta charset="UTF-8">
        // //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
        // //     <meta http-equiv="X-UA-Compatible" content="ie=edge">
        // //     <title>${name}</title>
        // // </head>
        // // <body>
        // //     <h1><a href="/">선리인터넷고등학교</a></h1>
        // //     <!-- 메뉴부분 -->
        // //     ${list}
        
        // //     <h2>${name} 페이지</h2>
        // //     <p>${data}</p>
        // // </body>
        // // </html>
        //     `
            res.send(html)
        })
    })
})

app.get('/create', (req, res)=>{
    fs.readdir('pages', (err, files)=>{
        const name = 'create'
        const list = template.list(files)
        const data = template.create()
        const html = template.HTML(name, list, data)

        res.send(html)
    })
})
const qs = require('querystring')
app.post('/create_process', (req, res)=>{
    // res.send('성공')
    let body = ''
    req.on('data', (data)=>{
        // 누가 클라이언트에서 데이터를 입력한 걸 잘라서 body에 저장함
        body =body+data
    })
    req.on('end', ()=>{
        const post = qs.parse(body)
        // console.log(post)
        const description = port.description
        fs.watchFile(`page/${title}`, description, 'utf-8', (err)=>{
            res.redirect(302, `/?name=${title}`) //처리 후 다른 페이지로 이동
        })
    })
})
app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})
