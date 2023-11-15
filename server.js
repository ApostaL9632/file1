const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const DB = "./db/Users.sqlite"
const sqlite3 = require("sqlite3");
const cors = require("cors");
const main = require('./site/tradeFiles/tradeFiles.js');


app.use(express.json());
app.use(cors());


app.get('/', (request, response) => {
    response.send(main);
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

app.post('/uploads', upload.single('file'), function (req, res, next) {
    const file = req.file;
    if (!file) {
        return res.json({ message: 'выберите файл' });
    }
    return res.json({ message: 'готово' });
});

let db = new sqlite3.Database(DB, (err) => {
    if (err) {
        console.error(err.message);
        throw err
    }
    else {
        db.run(`CREATE TABLE Users (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            Name text,
            Password text
        )`,
            (err) => {
                if (err) {
                    console.error("работает");
                }
                else {
                    const insert = 'INSERT INTO Users (NAME, PASSWORD) VALUES (?,?)'
                    db.run(insert, ["ApostaL", "Shkodin"]);
                    console.log("Таблица создана");
                }
            })
    }
})



app.listen(8000, function () {
    console.log('запуск на 8000 порту');
});

