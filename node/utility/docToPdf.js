const path = require("path");
const fs = require("fs").promises;
const libre = require("libreoffice-convert");
libre.convertAsync = require("util").promisify(libre.convert);

const convertDocToPdf = async (fileName, filePath) => {
  const ext = ".pdf";
  const inputPath = path.join(__basedir, `${filePath}${fileName}`);
  const newFile = `${filePath}${fileName}-convert${ext}`;
  const outputPath = path.join(__basedir, newFile);
  const docxBuf = await fs.readFile(inputPath);
  let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);
  await fs.writeFile(outputPath, pdfBuf);
  return newFile;
};

module.exports = { convertDocToPdf };
