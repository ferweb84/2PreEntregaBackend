import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    // console.log(file.fieldname)
    // if (file.fieldname === 'profile') {
    //   cb(null, `${__dirname}/public/images/profiles`)
    // } else
    //   if (file.fieldname === 'document') {
    //     cb(null, `${__dirname}/public/images/documents`)
    //   } else
    //     if (file.fieldname === 'products') {
    //       cb(null, `${__dirname}/public/images/products`)
    //     }
    // if(file.filename==="products"){
    //    cb(null, `${__dirname}/public/images`);
    // }
   
    let subfolder = ''
    if (
      file.fieldname === 'identification' ||
      file.fieldname === 'address' ||
      file.fieldname === 'statement'
    ) {
      subfolder = '/documents'
    }
     cb(null, `${__dirname}/public${subfolder}/${file.fieldname}`)

  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
export const uploader = multer({ storage });
export default __dirname;