const exec = require("child_process").exec;
const fs = require("fs");
const ENV_PATH = "./.env";
const ENV_REACT_APP_BUILD_YEAR_ROW = `REACT_APP_BUILD_YEAR=${new Date().getFullYear()}`;
const ENV_REACT_APP_BUILD_YEAR_REGEX = /^REACT_APP_BUILD_YEAR=.*$/m;


desc("Build Landing Front for production");
task("default", ["createEnv", "buildFrontProd"], function () { });

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
            console.info(data);
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
        exec("npm ci && npm run buildToDeploy", (err, stdout, stderr) => {
            if (err) {
                console.error(stderr);
                reject(stderr);
            }

            console.log(stdout);
            resolve(true);
        });
    });
});