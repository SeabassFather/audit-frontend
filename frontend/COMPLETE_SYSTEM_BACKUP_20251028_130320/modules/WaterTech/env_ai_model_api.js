const express = require('express');
const bodyParser = require('body-parser');
const { AuditDNAEnvAI } = require('./ai_env_traceability_model_js'); // You can port Python logic to JS

const app = express();
app.use(bodyParser.json());

const ai = new AuditDNAEnvAI();

app.post('/api/ai/analyze', (req, res) => {
  const { water = {}, soil = {}, fertilizer = {}, environment = {} } = req.body;
  const result = ai.analyze(water, soil, fertilizer, environment);
  res.json(result);
});

app.listen(8000, () => console.log('AI model API running on port 8000'));