const { readdir } = require("fs").promises;
const fs = require("fs");
const { resolve } = require("path/posix");

module.exports.parseMD = function parseMD(str) {
  const regex = /(\#\s*[^\n\r]*)([\n\r]*(\-\s*[^\:]*\:\s*[^\n\r]*))*/gim;
  const tagRegex = /\-\s*([^\:]*)\:\s*([^\n\r]*)/gim;
  let list = [];
  let m;
  let current = {};
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    m.forEach((match, groupIndex) => {
      if (groupIndex === 0) {
        parseTags(match);
      }
    });
  }
  if (Object.keys(current).length > 0) {
    list.push(current);
    current = {};
  }
  return list;

  function parseTags(match) {
    parseName(match);
    let tagsLines = match.replace(match.split("\n")[0], "").match(tagRegex);
    tagsLines.forEach((e) => {
      let tag = /^\-\s*([^\:]*)/gim.exec(e)[1];
      let value = /\-\s*[^\:]*\:\s*([^\n\r]*)/gim.exec(e)[1];
      current[tag] = value;
    });
  }

  function parseName(match) {
    if (Object.keys(current).length > 0) {
      list.push(current);
      current = {};
    }
    current.name = match.split("\n")[0].replace("#", "").trim();
  }
};

let count = 0;
module.exports.ParseDirectory = async function ParseDirectory(
  resolve,
  list,
  dirPath
) {
  try {
    const files = await readdir("./" + dirPath);
    for (const i of files) {
      let buff = "";
      if (fs.lstatSync("./" + dirPath + "/" + i).isDirectory()) {
        buff = "";
        count++;
        await ParseDirectory(resolve, list, dirPath + "/" + i).then(
          () => count--
        );
      } else {
        buff = "/" + dirPath + "/" + i;
      }
      buff = buff.replace(/\/build/gm, "");
      if (buff) {
        list.push(buff);
      }
    }
    if (count === 0) {
      resolve();
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports.generateProjectsFile = function () {
  return new Promise((resolve, reject) => {
    let result = [];
    var XMLHttpRequest = require("xhr2");
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://files.rtuitlab.dev/landing_src/projects_data/");
    xhr.send();
    xhr.onload = function () {
      if (xhr.status != 200) {
        console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
      } else {
        const links = xhr.response.match(/\<a\s*href=\"([^\"]*)/gim);
        let linksArr = [];
        for (let i of links) {
          let link = i.match(/([^\"]*)$/gim)[0];
          if (!link.toString().startsWith("..")) {
            linksArr.push(link);
          }
        }
        for (let i of linksArr) {
          let xhr2 = new XMLHttpRequest();

          xhr2.open(
            "GET",
            "https://files.rtuitlab.dev/landing_src/projects_data/" +
              i +
              "info.json"
          );
          xhr2.send();
          xhr2.onload = xhr2.onload = getProjectsResult.bind(
            this,
            xhr2,
            linksArr,
            i
          );
        }
      }
    };

    function getProjectsResult(xhr2, linksArr, projectName) {
      if (xhr2.status != 200) {
        console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        reject(xhr.status);
      } else {
        //downloadImages(xhr2.response, projectName)
        result.push(JSON.parse(xhr2.response));
        if (linksArr.length === result.length) {
          fs.writeFileSync(
            "./public/projects.json",
            JSON.stringify(result),
            "utf-8"
          );
          resolve();
        }
      }
    }
  });
};
