const express = require('express')
const fs = require('fs')
// express로 서버를 만듦
const app = express()
const port = 3000
const cors = require('cors')
const template=require('./lib/template.js')

app.get('/', (req, res)=>{
    let {name}=req.query

    fs.readdir('pages', (err, files)=>{
        let list=template.list(files)
        fs.readFile(`pages/${name}`, 'utf8', (err, data)=>{
            let control=`<a href="/create">create</a> <a href="/update?name=${name}">update</a>
            <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${name}">
                <button type="submit">delete</button>
            </form>
            `
            if(name===undefined){
                name='sunrin'
                data='Welcome'
                control=`<a href="/create">create</a>`
            }

            const html=template.HTML(name, list, `<h2>${name}페이지</h2> <p>${data}</p>`, control)
            res.send(html)
        })
    })
})

app.get('/update', (req, res)=>{
    let {name}=req.query

    fs.readdir('pages', (err, files)=>{
        let list=template.list(files)
        
        fs.readFile(`pages/${name}`, 'utf8', (err, content)=>{
            let control=`<a href="/create">create</a> <a href="/update?name=${name}">update</a>
            <form action="delete_process" method="post">
                <input type="hidden" name="id" value="${name}">
                <button type="submit">delete</button>
            </form>`
            const data = template.update(name, content)
            const html=template.HTML(name, list, `<h2>${name}페이지</h2> <p>${data}</p>`, control)
            res.send(html)
        })
    })
})

app.get('/create', (req, res)=>{
    fs.readdir('pages', (err, files)=>{
        const name = 'create'
        const list = template.list(files)
        const data = template.create()
        const html = template.HTML(name, list, data, '')

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
app.post('/update_process', (req, res)=>{
    // res.send('성공')
    let body = ''
    req.on('data', (data)=>{
        // 누가 클라이언트에서 데이터를 입력한 걸 잘라서 body에 저장함
        body =body+data
    })
    req.on('end', ()=>{
        const post = qs.parse(body)
        const id = post.id
        const title = post.title
        // console.log(post)
        const description = port.description
        fs.rename(`pages/${id}`, `pages/${title}`, (err)=>{
            fs.watchFile(`page/${title}`, description, 'utf-8', (err)=>{
                res.redirect(302, `/?name=${title}`) //처리 후 다른 페이지로 이동
            })
        })
    })
})
app.post('/delete_process', (req, res)=>{
    // res.send('성공')
    let body = ''
    req.on('data', (data)=>{
        // 누가 클라이언트에서 데이터를 입력한 걸 잘라서 body에 저장함
        body =body+data
    })
    req.on('end', ()=>{
        const post = qs.parse(body)
        const id = post.id

        fs.unlink(`pages/${id}`, (err)=>{
            res.redirect(302, `/`)
        })
    })
})

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})
