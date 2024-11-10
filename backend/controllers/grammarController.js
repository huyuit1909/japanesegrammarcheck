const axios = require('axios');

const checkGrammar = async (req, res) => {
    const { text } = req.body;
    try {
      const response = await axios.post('https://api.cohere.ai/v1/generate', {
        prompt: `Please correct this phase as a native speaker in japanese. Just reply the corrected japananese no need to explain: ${text}`,
      }, {
        headers: {
          Authorization: `Bearer ${process.env.COHERE_API_KEY}`
        }
      });
      
      console.log(response.data); // Kiểm tra cấu trúc phản hồi từ Cohere
  
      if (response.data.generations && response.data.generations[0]) {
        const correctedText = response.data.generations[0].text;
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