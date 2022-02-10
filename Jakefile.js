const exec = require("child_process").exec;
const fs = require("fs");
const {readdir} = require("fs").promises
const ENV_PATH = "./.env";
const ENV_REACT_APP_BUILD_YEAR_ROW = `REACT_APP_BUILD_YEAR=${new Date().getFullYear()}`;
const ENV_REACT_APP_BUILD_YEAR_REGEX = /^REACT_APP_BUILD_YEAR=.*$/m;


desc("Build Landing Front for production");
task("default", ["parse staff.md","createEnv","buildFrontProd","create service-worker"], function () {
});


desc("Creating staff.json file from /other/staff.md")
task("parse staff.md",function (){

  return new Promise((resolve, reject)=>{

    function parseMD(str){
      const regex = /((\#\s[^\n]*))*\n*\-\s([^\:]*)\:\s(.*)/gm;

      let m;

      let list=[]
      let index=-1

      while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }
        if(m[2]!==undefined){
          index++
          list[index]={fio:m[2].replace(/^\#\s/gmi,"").replaceAll("\r","")}
        }
        for(let i=3; i<m.length;i++){
          list[index][m[i]]=m[i+1]
          i++
        }
      }

      return list
    }

    let data = fs.readFileSync("./other/staff.md","utf-8")
    let list = parseMD(data)
    fs.writeFileSync("./public/staff.json",JSON.stringify(list),"utf-8")
    resolve()
  })
})

let count = 0
async function ParseDirectory(resolve, list, dirPath) {
  try {
    const files = await readdir("./" + dirPath);
    for (const i of files) {
      let buff = ""
      if (fs.lstatSync("./" + dirPath + "/" + i).isDirectory()) {
        buff = ""
        count++
        await ParseDirectory(resolve, list, dirPath + "/" + i).then(() => count--)
      } else {
        buff = ("/" + dirPath + "/" + i)
      }
      buff = buff.replace(/\/build/gm, "")
      if(buff){
        list.push(buff)
      }
    }
    if (count === 0) {
      resolve()
    }
  } catch (err) {
    console.error(err);
  }
}

desc("Create new service-worker.js file from serviceWorkerSample.js with new cache version and new caching links")
task("create service-worker", function () {
  return new Promise((resolve, reject) => {
    let list = []

    ParseDirectory(() => {
      list.splice(list.indexOf("/service-worker.js"),1)
      list.splice(list.indexOf("/robots.txt"),1)
      list.splice(list.indexOf("/index.html"),1)
      list.push("/")

      let data = fs.readFileSync("./other/serviceWorkerSample.js", "utf-8")
      let dataSample = data
      let version = data.matchAll(/(var CACHE_NAME = )\'v(\d*)\';/gm)
      let versionParse=version.next().value
      let newVersion = versionParse[0].replace("v"+versionParse[2].toString(),"v"+(Number(versionParse[2])+1).toString())
      data = data.replace("// THIS MESSAGE FOR PARSER #urls", JSON.stringify(list)
        .replace(/(\[|\])/gm, "")
        .replaceAll(",", ",\n\t\t\t\t\t\t\t"))
        .replace(versionParse[0],newVersion)

      fs.writeFileSync("./build/service-worker.js", data, "utf-8")
      fs.writeFileSync("./other/serviceWorkerSample.js", dataSample.replace(versionParse[0],newVersion), "utf-8")
      resolve()
    }, list, "build")


  })
})

desc("Create .env file with year of build");
task("createEnv", function () {
  return new Promise((resolve) => {
    try {
      let data;
      if (fs.existsSync(ENV_PATH)) {
        data = fs.readFileSync(ENV_PATH, "utf8");
        data = data
          .replace(/\r/g, "")
          .split("\n")
          .filter(val => !val.match(ENV_REACT_APP_BUILD_YEAR_REGEX))
          .join("\n");
        data = `${ENV_REACT_APP_BUILD_YEAR_ROW}\n${data}`;
      } else {
        data = ENV_REACT_APP_BUILD_YEAR_ROW;
      }
      fs.writeFileSync(ENV_PATH, data);
    } catch (error) {
      console.error(error);
    }
    resolve(true);
  });
});

desc("Build Landing Front prod")
task("buildFrontProd", function () {
  return new Promise((resolve, reject) => {
    exec("npm ci && npm run build", (err, stdout, stderr) => {
      if (err) {
        console.error(stderr);
        reject(stderr);
      }

      console.log(stdout);
      resolve(true);
    });
  });
});
