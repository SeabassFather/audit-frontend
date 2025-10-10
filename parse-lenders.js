const fs = require('fs');
const pdf = require('pdf-parse');

const filePath = process.argv[2] || './Lenders_List_Everwise.pdf';
const outPath = process.argv[3] || './lenders.json';

fs.readFile(filePath, async (err, dataBuffer) => {
  if (err) {
    console.error('PDF not found:', filePath);
    process.exit(1);
  }
  const data = await pdf(dataBuffer);

  // Split lines - you will need to adjust this for your actual PDF format!
  const lines = data.text.split('\n').filter(l => l.trim().length > 0);
  const lenders = [];
  for (const line of lines) {
    // Example: "Lender Name, Product, Contact, Location"
    const parts = line.split(',');
    if (parts.length >= 4) {
      lenders.push({
        name: parts[0].trim(),
        product: parts[1].trim(),
        contact: parts[2].trim(),
        location: parts.slice(3).join(',').trim(),
      });
    }
  }
  fs.writeFileSync(outPath, JSON.stringify(lenders, null, 2));
  console.log(`Extracted ${lenders.length} lenders to ${outPath}`);
});