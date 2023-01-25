const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const morgan = require('morgan')
const busboy = require('busboy')
const fs = require('fs-extra')

const app = express()

app.set("view-engine", 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'uploads')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan("dev"))

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.locals.err = req.errUser || ''
    next()
})

app.get('/', (req, res) => {
    res.render('index.ejs', {
        pageTitle: 'Uploading large files test',
    })
})

const fileStoragePath = path.join(__dirname, 'uploads')
fs.ensureDirSync(fileStoragePath)

app.post('/upload', (req, res, next) => {

    let storageFileName = `large_one_${Date.now()}`

    const bb = busboy({
        headers: req.headers,
        // Set the limit of your choicee
        // limits: {
        //     fileSize: 5242880
        // }
    })

    let redirected = false;

    bb
        .on("file", (name, file, info) => {

            storageFileName = `${storageFileName}${path.extname(info.filename)}`
            file.on("error", () => {
                console.log('\x1b[41m', 'An error occured')
                redirected = true;
                return res.redirect('/')
            })

            if (!info.filename) {
                console.log('\x1b[41m', 'File missing')
                redirected = true;
                return res.redirect('/')
            }

            file.on("limit", () => {
                console.log('\x1b[41m', 'File Limit exceeded')
                redirected = true;
                return res.redirect('/')
            })
            const saveTo = path.join(fileStoragePath, storageFileName)

            return file.pipe(fs.createWriteStream(saveTo))
        })
        .on('close', () => {
            if (!redirected) {
                return res.redirect('/')
            }
            fs.unlink(path.join(fileStoragePath, storageFileName))
        })

    req.pipe(bb)
})

app.listen(8080, () => console.log('listening'))