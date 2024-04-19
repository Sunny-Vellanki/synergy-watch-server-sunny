const express= require("express");
const app=express();
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const mongoose=require("mongoose");
const cors=require("cors")
const middleware=require("./middleware/jwtauth")
const Videos=require("./models/VideoDetails");
const Userdetails = require("./models/signupdetails");

app.use(express.json());
app.use(cors());

//mangodb connect to database link and connect and play
mongoose.connect(`mongodb+srv://sunny:sunnyh123@cluster0.x0yawgr.mongodb.net/SynergyProject?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>{
    console.log("database connected")
}).catch((err)=>{
    console.log(err)
})

app.post("/send-video-details",async(req,res)=>{
    try{
        const sendvideoDetails=await Videos.create(req.body);
        return res.status(201).json({message :"video details saved sucessfully",sendvideoDetails});
        // res.status(200).json({ message: 'Song created successfully' });

    }catch(error){
console.log(error);
    }
})

app.get("/get-video-details", async (req, res) => {

    try{
    
    const videos =await Videos.find({});
    
    res.status(200).json(videos);
    }
    
    catch (error) {
    
    console.log(error);
    }})


    app.get("/individualvideo/:id", async (req, res) => {
        try {
          // const id = req.params.id;
          const { id } = req.params;
          const video = await Videos.findById({ _id: id });
          res.status(200).json(video);
      
        } catch (error) {
          console.log(error);
        }
      })

app.post("/signup", async(req,res)=>{
    try {

        const { email, password } =req.body;
        
        const checkUser =await Userdetails.findOne({email: email});
        
        if (checkUser) {
        
        return res.status(404).json({ message: "user already exists"}); }
        
        if (req.body.password !== req.body.confirmpassword) {
        
        return res.status(404).json({message: "passwords doesnot match"});
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        req.body.password =hashedPassword;
        
        console.log("hello", password);
        
        const newUser = new Userdetails(req.body);
        
        await newUser.save();
        
        res.status(200).json({ message: "user signedup successfully"});
    }
        
        catch (error) {
        
        console.log(error);
}
});



app.post('/login', async (req, res) => {

    try {
    
    const {email, password}= req.body;
    
    const userExist= await Userdetails.findOne({email: email });
    
    if (!userExist) {
    
    return res.status(406).json('User doesnot exist');
    }
    
    const passwordMatched =await bcrypt.compare(password, userExist.password);
     if (!passwordMatched) {
    
    return res.status(401).send('invalid password')
 }
    
    const token = jwt.sign({mail: userExist.email}, "secretToken", {expiresIn: "1hr"});
     res.status(200).json({token, message: "loggedin successfully"})
    
  }   catch (error){
    
    console.log(error);
    
    }
})


// api to get trending videos
app.get("/trendingvideos", async (req, res) => {
    try {
      const trendingVideos = await Videos.find({ category: "Trending" });
      return res.status(200).json({ trendingVideos: trendingVideos });
    } catch (error) {
      console.log(error);
    }
  });
  
  // api to get gaming videosserver/server.js
  app.get("/gamingvideos", async (req, res) => {
    try {
      const gamingVideos = await Videos.find({ category: "Gaming" });
      return res.status(200).json({ gamingVideos: gamingVideos });
    } catch (error) {
      console.log(error);
    }
  });

  // api to get saved videos
app.get("/savedvideos", async (req, res) => {
    try {
      const savedVideos = await Videos.find({ savedStatus: "Saved" });
      return res.status(200).json({ savedVideos: savedVideos });
    } catch (error) {
      console.log(error);
    }
  });

  // api to update the saved status
app.put("/videos/:id/save", async (req, res) => {

    const { id } = req.params;
    console.log(id);
    const { savedStatus } = req.body;
    console.log(savedStatus);
    try {
      const updatedVideo = await Videos.findByIdAndUpdate(
        id,
        { savedStatus },
        { new: true }
      );
      if (!updatedVideo) {
        return res.status(404).json("video not found");
      }
  
      res.json(updatedVideo);
    } catch (error) {
      console.log(error);
    }
  });
const port=4455;
app.listen(port,()=>console.log(`server running at ${port}`)); 