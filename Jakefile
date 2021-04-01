const exec = require("child_process").exec;
const fs = require("fs");
const ENV_PATH = "./.env";
const ENV_REACT_APP_BUILD_YEAR = "REACT_APP_BUILD_YEAR";

desc("Build Landing Front for production");
task("default", ["createEnv", "buildFrontProd"], function () { });

desc("Create .env file with year of build");
task("createEnv", function() {
    return new Promise((resolve) => {
        try {
            if (fs.existsSync(ENV_PATH)) {
                const data = fs.readFileSync(ENV_PATH, "utf8");
                let env_arr = data.replace(/\r/g, "").split("\n");
                env_arr = env_arr.filter((val) => val.indexOf(ENV_REACT_APP_BUILD_YEAR) === -1);
                env_arr.push(ENV_REACT_APP_BUILD_YEAR + `=${new Date().getFullYear()}`);
                const temp = env_arr.join("\n");
                console.info(temp);
                fs.writeFileSync(ENV_PATH, temp);
            } else {
                console.info(ENV_REACT_APP_BUILD_YEAR + `=${new Date().getFullYear()}`);
                fs.writeFileSync(ENV_PATH, ENV_REACT_APP_BUILD_YEAR + `=${new Date().getFullYear()}`);
            }
        } catch (error) {
            console.error(error);
        }
        resolve(true);
    });
});

desc("Build Landing Front prod")
task("buildFrontProd", function () {
    return new Promise((resolve, reject) => {
        exec("npm i && npm run buildToDeploy", (err, stdout, stderr) => {
            if (err) {
                console.error(stderr);
                reject(stderr);
            }

            console.log(stdout);
            resolve(true);
        });
    });
});