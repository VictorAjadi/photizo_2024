const express=require("express"),
      multer=require("multer"),
      Photizo=require("../model/photizo"),
      sendMail=require("../utils/mail")
const storage=multer.memoryStorage()
const upload = multer({
storage: storage,
limits: { fileSize: 15 * 1024 * 1024 }
});

const router = express.Router();
router.route("/").get((req,res,next)=>{
  res.render('index',{});
})
router.route("/register").get((req,res,next)=>{
    res.render("form",{})
})
router.route("/admin/UrO89GZnBXTuVToc/tomS6CdYNFXuIJhXCKdoOCbYSA=/table").get(async(req,res,next)=>{
    const photizoUser= await Photizo.find();
    res.render("table",{photizoUser})
})
router.route("/register").post(upload.single('file'),async(req,res,next)=>{
    if(!req.file){
     req.flash('error','Please upload your receipt image.');
     return res.status(400).redirect('/photizo/register');
    } 
    if (req.file.size > 460800) {//for acceptance of file up to 15kb only unless flag error
        req.flash('error', 'Image size exceeds 450kb limit.');
        return res.status(400).redirect('/photizo/register');
    }
    try{
        const photoBuffer = req.file.buffer; // Get the uploaded image buffer
        // Convert image buffer to base64
        const photoData = photoBuffer.toString('base64');
        const newBody={...req.body,...{photo: `data:image/png;base64,${photoData}`}}
        const checkEmail=await Photizo.findOne({email: req.body.email});
        if(checkEmail){
            //update the details of this user
            const updatedUser=await Photizo.findByIdAndUpdate(checkEmail._id,newBody,{new: true,runValidators: true})
            if(updatedUser){
                const mail = {
                        body: {
                            greeting: `Hello,${updatedUser.lastName} ${updatedUser.firstName}`,
                            intro: `Your details has successfully been updated,thanks for joining us.\n\nYour serial number remains the same : ${updatedUser.serialNo}`,
                            outro: 'If you have any questions or need assistance, feel free to reach out to us/mail this email.'
                        }
                    };
        
                    await sendMail({
                        email: updatedUser.email,
                        html: mail,
                        link: `${req.protocol}://${req.hostname}/`,
                        subject: `You have successfully updated your details.`
                    });  
                    req.flash('success',`${updatedUser.lastName} ${updatedUser.firstName} has successfully updated his/her photizo 2024 details.`);
                    return res.redirect('/photizo');
            }
        }else{
        const photizoUser=await Photizo.create(newBody);
        if(photizoUser){
          const mail = {
                body: {
                    greeting: `Hello,${photizoUser.lastName} ${photizoUser.firstName}`,
                    intro: `Welcome to Photizo 2024!\n\nThank you for joining us. We're excited to have you on board\n\nYour serial number is ${photizoUser.serialNo}`,
                    outro: 'If you have any questions or need assistance, feel free to reach out to us/mail this email.'
                }
            };

              await sendMail({
                email: photizoUser.email,
                html: mail,
                link: `${req.protocol}://${req.hostname}/`
              });  
            req.flash('success',`${photizoUser.lastName} ${photizoUser.firstName} have successfully registered for photizo 2024.`);
            return res.redirect('/photizo');
        }
     }
    }catch(err){
        console.log(err)
        if(err.name==='CastError'){
            const msg=`Invalid value for ${err.path} : ${err.value}`;
            req.flash('error',msg);
            return res.status(400).redirect('/photizo/register');
        }
         else if(err.code===11000){
            const msg=`The user with ${err.keyValue.name || err.keyValue.email } already exist.`;
            req.flash('error',msg);
            return res.status(400).redirect('/photizo/register');
        }
         else if(err.name==='ValidationError'){
            const msg=err.message;
            req.flash('error',msg);
            return res.status(400).redirect('/photizo/register');
        }       
         else if(err.name==='TokenExpiredError'){
            const msg=err.message;
            req.flash('error',msg);
            return res.status(400).redirect('/photizo/register');
        }
         else if(err.name==='JsonWebTokenError'){
            const msg=err.message;
            req.flash('error',msg);
            return res.status(400).redirect('/photizo/register');
        }else{
         req.flash('error',err.message || 'something went wrong,pls try again later.');
         return res.status(400).redirect('/photizo/register');
         }
    }
})

module.exports = router