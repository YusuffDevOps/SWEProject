/**
 * Root js file for the server. it connects the rest of the file created for the
 * server together.
 *
 * Author: Agowun Muhammad Altaf (A00448118)
 * Author: Mainuddin Alam Irteja (A00446752)
 */

// import express library to create a router to connect to the main server file
const express = require("express");
// import the library used to interact with the database
const mongoose = require("mongoose");
// create the server
const server = express();
// store the port for the server to be run on
const port = 3026;

// refer to the routes created in other files
// refer to the species.js file which contains the routes for species
const speciesRouter = require("./Routes/species");
// refer to the store.js file which contains the routes for store
const storeRouter = require("./Routes/store");
// refer to the contacts.js file which contains the routes for contacts
const contactsRouter = require("./Routes/contacts");
// refer to the quiz.js file which contains the routes for quiz
const quizRouter = require("./Routes/quiz");
// refer to the map.js file which contains the routes for map
const mapRouter = require("./Routes/map");

// build the connection string
let head = "mongodb://";
let user = "group23E";
let password = "41AustriaLeaderThin";
let localHost = "127.0.0.1";
let localPort = "27017";
let database = "group23E";
let connectionString = `${head}${user}:${password}@${localHost}:${localPort}/${database}`;

// code provided by Prof Terry
// set JSON recognition
server.use(express.json());
// set incoming name:value pairs to be any type
server.use(express.urlencoded({
  extended: true
}));

let allowCrossDomain = function(req, res, next) {
  // allow any origin
  res.header("Access-Control-Allow-Origin", "*");
  // allow any method
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  // accept only headers with Content-Type included
  res.header("Access-Control-Allow-Headers", "Content-Type");
  // link express process to next operation
  next();
};

// set allowable domain characteristics
server.use(allowCrossDomain);

try {
  // connect to the database
  mongoose.connect(connectionString);

  // listen to request to /map
  server.use("/map", mapRouter);

  // listen to request to /species
  server.use("/species", speciesRouter);

  // listen to request to /store
  server.use("/store", storeRouter);

  // listen to request to /contacts
  server.use("/contacts", contactsRouter);

  // listen to request to /quiz
  server.use("/quiz", quizRouter);

  // start listening on the port
  server.listen(port, function() {
    console.log(`Listening on port ${port}.`);
  });
} catch (error) {
  // handle error on the server
  console.error("Server Error", error);
}

const app = express();
app.get('/search', (req, res) => {
  const query = req.query.query; // 获取搜索查询
  const searchResults = performGlobalSearch(query); // 执行全局搜索

  // 返回搜索结果
  res.json({
    results: searchResults
  });
});

// 示例：搜索整个项目的HTML文件
function performGlobalSearch(query) {
  const fs = require('fs');
  const path = require('path');
  const searchResults = [];

  // 搜索项目目录下的HTML文件
  const projectDirectory = __dirname; // 项目根目录
  const htmlFiles = getAllHTMLFiles(projectDirectory);
  console.log('Searching for HTML files...');
  //console.log(projectDirectory);
  console.log(htmlFiles);
  for (const file of htmlFiles) {
    try {
      const fileContent = fs.readFileSync(file, 'utf-8');

      // 检查文件内容中是否包含搜索关键词
      if (fileContent.toLowerCase().includes(query.toLowerCase())) {
        const relativePath = path.relative(projectDirectory, file);

        searchResults.push({
          fileName: path.basename(file),
          content: fileContent,
          path: relativePath
        });
      }
    } catch (error) {
      console.error(`Error reading file: ${file}`, error);
    }
  }

  //console.log('Search results:', searchResults);

  return searchResults;
}

// 获取项目目录下的所有HTML文件
function getAllHTMLFiles(directory) {
  //console.log('Searching for HTML files in directory:', directory);
  const fs = require('fs');
  const htmlFiles = [];

  function scanDirectory(currentDir) {
    const files = fs.readdirSync(currentDir);
    for (const file of files) {
      const filePath = path.join(currentDir, file);
      const stats = fs.statSync(filePath);
      if (stats.isFile() && path.extname(filePath).toLowerCase() === '.html') {
        htmlFiles.push(filePath);
      } else if (stats.isDirectory()) {
        // 如果是子目录，则递归扫描子目录
        scanDirectory(filePath);
      }
    }
  }

  scanDirectory(directory);

  return htmlFiles;
}