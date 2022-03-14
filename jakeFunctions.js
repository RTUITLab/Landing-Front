const { readdir } = require("fs").promises;
const { execSync, exec } = require("child_process");
const request = require("request");
const fs = require("fs");
const { resolve } = require("path/posix");
const { parseMD2 } = require("./MDParser");

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
    console.error("ParseDirectory", err);
  }
};

async function downloadImagesMain(buff, i, type = "projects") {
  if (buff.images) {
    let newImages = [];
    for (let j of buff.images) {
      if (j.match(/^(https?\:\/\/)/gim)) {
        newImages.push(
          `/images/${type}/` + i + "/" + j.match(/([^\/]*)$/gim)[0]
        );
        await download(
          j,
          `./src/images/${type}/` + i + "/" + j.match(/([^\/]*)$/gim)[0]
        );
      } else {
        await downloadImages(i, j);
        newImages.push(
          `/images/${type}/` + i + "/" + j.match(/([^\/]*)$/gim)[0]
        );
      }
    }
    buff.images = newImages;
  }
}

module.exports.generateAchievementsFile = function () {
  return new Promise(async (resolve, reject) => {
    if (!process.env.token) reject("No token specified");
    const dir = await readdir("./data/achievements");
    fs.rmSync("./src/images/achievements", { recursive: true, force: true });
    fs.mkdirSync("./src/images/achievements");
    let result = [];
    for (let i of dir) {
      fs.mkdirSync("./src/images/achievements/" + i);
      let buff = parseMD2(
        fs.readFileSync(`./data/achievements/${i}/info.md`, "utf-8")
      );
      buff.link = i;
      await downloadImagesMain(buff, i, "achievements");
      result.push(buff);
    }
    let file = "-\n\tconst achievementsData = " + JSON.stringify(result) + ";";
    fs.writeFileSync("./src/js/data/achievementsData.pug", file, "utf-8");
    if (process.platform === "win32") {
      generateAchievementTemplates(
        "rmdir /s /q .\\src\\achievements & mkdir .\\src\\achievements",
        resolve
      );
    } else {
      generateAchievementTemplates(
        "rm -rf ./src/achievements && mkdir ./src/achievements",
        resolve
      );
    }

    function generateAchievementTemplates(cmd, resolve) {
      exec(cmd, () => {
        for (let i in result) {
          fs.writeFileSync(
            `./src/achievements/${dir[i]}.pug`,
            "extends ../layout/achievementPageTemplate/achievementPageTemplate.pug\n\nblock variables\n\t-\n\t\tconst achievementData = " +
              JSON.stringify(result[i]),
            "utf-8"
          );
        }
        resolve();
      });
    }
  });
};

module.exports.generateProjectsFile = function () {
  return new Promise(async (resolve, reject) => {
    if (!process.env.token) reject("No token specified");
    const dir = await readdir("./data/projects");
    fs.rmSync("./src/images/projects", { recursive: true, force: true });
    fs.mkdirSync("./src/images/projects");
    let result = [];
    for (let i of dir) {
      fs.mkdirSync("./src/images/projects/" + i);
      let buff = parseMD2(
        fs.readFileSync(`./data/projects/${i}/LANDING.md`, "utf-8")
      );
      buff.link = i;
      await downloadImagesMain(buff, i);

      result.push(buff);
    }

    if (!fs.existsSync("./src/js/data")) {
      await fs.mkdirSync("./src/js/data");
    }
    let outputPug = "-\n\tconst data = " + JSON.stringify(result) + ";";
    let outputJs = `
        const data = ${JSON.stringify(result)};
        export default data;
        `;
    fs.writeFileSync("./src/js/data/projectsData.pug", outputPug, "utf-8");
    fs.writeFileSync("./src/js/data/projectsData.js", outputJs, "utf-8");
    if (process.platform === "win32") {
      generateProjectsTemplates(
        "rmdir /s /q .\\src\\projects & mkdir .\\src\\projects",
        resolve
      );
    } else {
      generateProjectsTemplates(
        "rm -rf ./src/projects && mkdir ./src/projects",
        resolve
      );
    }

    function generateProjectsTemplates(cmd, resolve) {
      exec(cmd, () => {
        for (let i in result) {
          fs.writeFileSync(
            `./src/projects/${dir[i]}.pug`,
            "extends ../layout/projectPageTemplate/projectPageTemplate.pug\n\nblock variables\n\t-\n\t\tlet obj = " +
              JSON.stringify(result[i]),
            "utf-8"
          );
        }
        resolve();
      });
    }
  });
};

const download = function (uri, filename) {
  return new Promise((resolve, reject) => {
    request.head(uri, function (err, res, body) {
      request(uri).pipe(fs.createWriteStream(filename)).on("close", resolve);
    });
  });
};

function secondDownloadMethod(i, j) {
  execSync(
    `curl -H \"Authorization: token ${
      process.env.token
    }\" -o ./src/images/projects/${i}/${
      j.match(/([^\/]*)$/gim)[0]
    } --ssl-no-revoke https://raw.githubusercontent.com/RTUITLab/${i}/master/${j}`,
    (error) => {}
  );
}

async function downloadImages(i, j) {
  let res = execSync(
    `curl -H "Authorization: token ${
      process.env.token
    }" --ssl-no-revoke --header 'Accept: application/vnd.github.v3.raw' -o ./src/images/projects/${i}/${
      j.match(/([^\/]*)$/gim)[0]
    } --location https://api.github.com/repos/rtuitlab/${i}/contents/${j}?ref=master`
  );
  try {
    let buff = JSON.parse(res);
    if (buff.download_url) {
      await download(
        buff.download_url,
        `./src/images/projects/${i}/${j.match(/([^\/]*)$/gim)[0]}`
      );
    } else {
      secondDownloadMethod(i, j);
    }
  } catch (e) {
    secondDownloadMethod(i, j);
  }
}
