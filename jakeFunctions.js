const { readdir } = require("fs").promises;
const { exec } = require("child_process");
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
        result.push(JSON.parse(xhr2.response));

        if (linksArr.length === result.length) {
          let outputPug = "-\n\tconst data = " + JSON.stringify(result) + ";";
          let outputJs = `
        const data = ${JSON.stringify(result)};
        export default data;
        `;
          fs.writeFileSync(
            "./src/js/data/projectsData.pug",
            outputPug,
            "utf-8"
          );
          fs.writeFileSync("./src/js/data/projectsData.js", outputJs, "utf-8");
          if (process.platform === "win32") {
            generateProjectsTemplates(
              'rmdir /s /q "./src/projects" & mkdir "./src/projects"',
              resolve
            );
          } else {
            generateProjectsTemplates(
              'rm -rf "./src/projects" & mkdir "./src/projects"',
              resolve
            );
          }
        }
      }
    }

    function generateProjectsTemplates(cmd, resolve) {
      exec(cmd, () => {
        for (let i of result) {
          fs.writeFileSync(
            `./src/projects/${generateProjectFileName(i.title)}.pug`,
            "extends ../layout/projectPageTemplate/projectPageTemplate.pug\n\nblock variables\n\t-\n\t\tlet obj = " +
              JSON.stringify(i),
            "utf-8"
          );
        }
        resolve();
      });
    }
  });
};

function generateProjectFileName(name) {
  return name.trim().toLowerCase().replaceAll(" ", "_");
}
