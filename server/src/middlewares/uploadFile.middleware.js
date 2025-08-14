import multer from 'multer'

// storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/temp')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
});

const upload = multer({
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'text/csv') {
            cb(null, true)
        } else {
            cb(new Error('Only CSV files are allowed'), false)
        }
    },
    storage: storage
});

const uploadSingle = upload.single('file')

export const uploadFile = async (req, res, next) => {
    try {
        if (!req.file) {
            const error = new Error("File not found")
            error.statusCode = 404
            throw error;
        }
        
        uploadSingle(req, res, function (err) {
        if (err) {
            console.log(err);
            next(err)
        }

        console.log("Upload finished: ", req.file.originalname);
        next()
    })
    } catch (error) {
        next(error)
    }
}

