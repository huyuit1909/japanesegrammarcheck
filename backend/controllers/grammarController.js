const axios = require('axios');
require('dotenv').config();

console.log('API Key:',process.env.COHERE_API_KEY);

const checkGrammar = async (req, res) => {
    const { text } = req.body;
    try {
      const response = await axios.post('https://api.cohere.ai/v1/generate', {
        prompt: `Please correct the following Japanese text to make it sound more natural. Only provide the corrected Japanese text, without any additional explanation:${text}`,
      }, {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`
        }
      });
      
      console.log(response.data); // Kiểm tra cấu trúc phản hồi từ Cohere
  
      if (response.data.generations && response.data.generations[0]) {
        const fullText = response.data.generations[0].text;
        const correctedText = fullText.split('\n\n')[0]; // Lấy phần trước \n\n

        res.json({ correctedText });
      } else {
        res.status(500).json({ error: 'API response format unexpected' });
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json({ error: 'Error processing the text' });
    }
  };

module.exports = { checkGrammar };