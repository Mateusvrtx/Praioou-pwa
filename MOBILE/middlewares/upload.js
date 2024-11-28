const fs = require('fs');
const path = require('path');
const multer = require('multer');

function filtroDeImgs(req, file, cb) {
    if (file.mimetype.startsWith('image'))
        cb(null, true);
    else 
        cb('Por favor, apenas faça upload de imagens!', false); 
}

const armazenamento_Multer = multer.diskStorage({
    destination: (req, file, cb) => { 
        const pathDestino = path.join(__basedir, "resources", "static", "assets", "uploads"); 
        if (!fs.existsSync(pathDestino)) {
            fs.mkdirSync(pathDestino, { recursive: true });
        }
        cb(null, pathDestino);
    },
    filename: (req, file, cb) => { 
        cb(null, `${Date.now()}_projImgTeste_${file.originalname}`);
    }
});

const uploadMiddleware = multer({ 
    storage: armazenamento_Multer,
    fileFilter: filtroDeImgs
});

module.exports = uploadMiddleware;
