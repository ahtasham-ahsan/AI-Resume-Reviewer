import fs from 'fs';

export const parsePDF = async (filePath) => {
  try{
    const pdf = (await import('@bingsjs/pdf-parse')).default;
    const buffer = fs.readFileSync(filePath);
    const data = await pdf(buffer);
    return data.text;
  }
  catch(err){
    console.error("❌ Error parsing PDF:", err.message || err);
  }
};
