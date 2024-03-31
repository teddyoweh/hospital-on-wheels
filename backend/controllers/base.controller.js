const OpenAI = require('openai');
const axios = require('axios');
const FormData = require('form-data');
// import { ElevenLabsClient  } from "elevenlabs";
const {ElevenLabsClient} = require('elevenlabs');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const { PassThrough } = require('stream');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const elevenlabsClient = new ElevenLabsClient({
  apiKey: process.env.elevenlabs_api_key,
 
});

 
cloudinary.config({
  cloud_name: process.env.cloudinary_cloud_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret
});
 
//openai.api_key = '';
async function generateAndUploadAudio(text,res,field,why,summary) {
    console.log('Generating audio for:', text);
    try {
      // Generate audio using Eleven Labs
      console.log(typeof text,'text type')
      const audio = await elevenlabsClient.generate({
        text: text,
        voice:"Ellie",
        model_id: "eleven_multilingual_v2"

        // voice: new Voice({
        //   voiceId: 'TWUKKXAylkYxxlPe4gx0' // Replace with the voice ID you want to use
        // })
      });
      const tempAudioFileName = `./temp_audio_${Date.now()}.mp3`;
      const writeStream = fs.createWriteStream(tempAudioFileName);
      
      writeStream.on('finish', async () => {
          console.log('Audio generated:', tempAudioFileName);
          try {
              const cloudinaryResponse = await cloudinary.uploader.upload(tempAudioFileName, {
                  resource_type: 'video',
                  upload_preset: 'e4rpkaay' // Replace with your Cloudinary upload preset
              });
 
              const audioUrl = cloudinaryResponse.secure_url;
              console.log('Audio uploaded to Cloudinary:', audioUrl);
          
           
          
              return res.status(200).json({ field, why, summary,audioUrl,who:'bot' });
          } catch (error) {
              console.error('Error uploading to Cloudinary:', error);
          }
      });
      
      audio.pipe(writeStream);
      
      

  
  
      // Write audio to a temporary file

    
    } catch (error) {
      console.error('Failed to generate and upload audio to Cloudinary:', error);
      throw error;
    }
  }
async function generatePrompt(prompt,res) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: 'system', content: `
            you are a chatbot that selects a field based of a users symptoms/ problems
            and say why you chose that field say it very smart, use punctations, pause and very cool, like an actual conversation and sound like a human, use uhhs and sound like you are thinking, also you should summarize the field and how it relates to my issue.
            
            The list contains information about professionals in various fields of nursing. Here are the different fields represented in the list:
  
            1. Pediatric Nursing
            2. Pediatric Oncology Nursing
            3. Neonatal Nursing
            4. Pediatric Intensive Care Nursing
            5. General Pediatric Nursing
            
            this are the fields, the response should be in this json  format
            
            {
                "field": "",
                "why": "",
                "summary": ""
            }
          ` },
          { role: 'user', content: `heres the prompt ${prompt}` }
        ],
        response_format: { type: 'json_object' }
      });
 
      const { field, why, summary } = JSON.parse(response.choices[0].message.content);
 
 await generateAndUploadAudio(why,res,field,why,summary) 
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
  

  async function chatBotController(req, res) {
    const { message } = req.body;
    try {
      const response = await generatePrompt(message,res);
 
 
    
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'An error occurred' });
    }
  }




  async function uploadReport(req,res){
    const {report,userid} = req.body;
    User.findOneAndUpdate({_id:userid},{$push:{reports:report}},{new:true}).then((data)=>{
        res.json(data);
    }
    )
    .catch((err)=>{
        res.json(err);
    })

  }
    async function getReports(req,res){
        const {userid} = req.body;
        User.findOne({_id:userid}).then((data)=>{
            res.json(data.reports);
        }
        )
        .catch((err)=>{
            res.json(err);
        })
    }
  module.exports = { chatBotController,getReports,uploadReport }