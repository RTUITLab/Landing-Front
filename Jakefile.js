const exec = require("child_process").exec;
const fs = require("fs");
const {parseMD2} = require("./MDParser");
const {readdir} = require("fs").promises;
const ENV_PATH = "./.env";
const ENV_BUILD_YEAR_ROW = `BUILD_YEAR=${new Date().getFullYear()}`;
const ENV_BUILD_YEAR_REGEX = /^BUILD_YEAR=.*$/m;
var parseMD = require("./MDParser").parseMD;
var ParseDirectory = require("./jakeFunctions").ParseDirectory;
var GenerateProjectsFile = require("./jakeFunctions").generateProjectsFile;
var generateAchievementsFile = require("./jakeFunctions").generateAchievementsFile;
var minifyPath = require("./jakeFunctions").minifyPath;


desc("Build Landing Front for production");
task("default", [
	"generate projects file",
	"parse achievements.md", "parse staff.md", "parse equipment.md", "createEnv",
	"buildFrontProd",
	"minify build"
	// "create service-worker",
], function () {
});

desc("Generate projects file");
task("generate projects file", GenerateProjectsFile);

desc("Creating achievements.json file from /info/achievements.md");
task("parse achievements.md", generateAchievementsFile);

/**
 *  equipment
 */
desc("Creating equipment.json file from /info/equipment.md");
task("parse equipment.md", function () {
	return new Promise((resolve, reject) => {
		let data = fs.readFileSync("./data/equipment/equipment.md", "utf-8");
		let list = parseMD(data);
		let result = [];
		let buff = [];
		for (let i of list) {
			buff.push(i);
			if (buff.length === 8) {
				result.push(buff);
				buff = [];
			}
		}
		result.push(buff);
		buff = [];
		let file = "-\n\tconst equipmentData = " + JSON.stringify(result);
		fs.writeFileSync("./src/js/data/equipment.pug", file, "utf-8");
		resolve();
	});
});
/**
 *  ------------------------
 */

/**
 *  STAFF.MD
 */
desc("Creating staff.json file from /info/staff.md");
task("parse staff.md", function () {
	return new Promise((resolve, reject) => {
		let data = fs.readFileSync("./data/staff/staff.md", "utf-8");
		let list = parseMD(data);
		let file = "-\n\tconst staffData = " + JSON.stringify(list);
		fs.writeFileSync("./src/js/data/staff.pug", file, "utf-8");
		resolve();
	});
});
/**
 *  ------------------------
 */

/**
 *  service-worker
 */

desc("Create new service-worker.js file from serviceWorkerSample.js with new cache version and new caching links");
task("create service-worker", function () {
	return new Promise((resolve, reject) => {
		let list = [];

		ParseDirectory(() => {
			list.splice(list.indexOf("/service-worker.js"), 1);
			list.splice(list.indexOf("/robots.txt"), 1);
			list.splice(list.indexOf("/index.html"), 1);
			list.push("/");

			let data = fs.readFileSync("./info/serviceWorkerSample.js", "utf-8");
			let dataSample = data;
			let version = data.matchAll(/(var CACHE_NAME = )\'v(\d*)\';/gm);
			let versionParse = version.next().value;
			let newVersion = versionParse[0].replace("v" + versionParse[2].toString(), "v" + (Number(versionParse[2]) + 1).toString());
			data = data
				.replace("// THIS MESSAGE FOR PARSER #urls", JSON.stringify(list)
					.replace(/(\[|\])/gm, "")
					.replaceAll(",", ",\n\t\t\t\t\t\t\t"))
				.replace(versionParse[0], newVersion);

			fs.writeFileSync("./build/service-worker.js", data, "utf-8");
			fs.writeFileSync("./info/serviceWorkerSample.js", dataSample.replace(versionParse[0], newVersion), "utf-8");
			resolve();
		}, list, "build");
	});
});
/**
 *  --------------------------
 */

/**
 *  .env file
 */
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
					.filter((val) => !val.match(ENV_BUILD_YEAR_REGEX))
					.join("\n");
				data = `${ENV_BUILD_YEAR_ROW}\n${data}`;
			} else {
				data = ENV_BUILD_YEAR_ROW;
			}
			fs.writeFileSync(ENV_PATH, data);
		} catch (error) {
			console.error(error);
		}
		resolve(true);
	});
});
/**
 *  ------------------------
 */

desc("Build Landing Front prod");
task("buildFrontProd", function () {
	return new Promise((resolve, reject) => {
		let command = "rm -rf build " + "&& parcel build ./src/index.pug --out-dir build --public-url ./ --no-minify --no-cache " + "&& parcel build ./src/projects/*.pug --out-dir build/projects --public-url ./ --no-minify --no-cache " + "&& parcel build ./src/achievements/*.pug --out-dir build/achievements --public-url ./ --no-minify --no-cache "
			+ "&& cp -a ./src/images ./build/images "
			+ "&& node ./postbuild.js && node ./postbuild.js projects && node ./postbuild.js achievements"
			+ "&& cp -a ./robots.txt ./build/"
			+ "&& exit 0";
		if (process.platform === "win32") command = "rmdir /s /q \"build\" 2> nul "
			+ "& mkdir build " + "&& parcel build ./src/index.pug --out-dir build --public-url ./ --no-minify --no-cache "
			+ "&& parcel build ./src/projects/*.pug --out-dir build/projects --public-url ./ --no-minify --no-cache "
			+ "&& parcel build ./src/achievements/*.pug --out-dir build/achievements --public-url ./ --no-minify --no-cache "
			+ "&& mkdir .\\build\\images "
			+ "&& xcopy /E .\\src\\images .\\build\\images\\ "
			+ "&& node .\\postbuild.js && node .\\postbuild.js projects && node .\\postbuild.js achievements"
			+ "&& xcopy .\\robots.txt .\\build\\"
			+ "&& exit 0";
		exec(command, (err, stdout, stderr) => {
			if (err) {
				console.error(stderr);
				reject(stderr);
			}
			resolve(true);
		});
	});
});

task("minify build",function(){
	return new Promise(async (_) => {
		await minifyPath('./build/achievements')
		await minifyPath('./build/projects')
		await minifyPath('./build/dist')
		await minifyPath('./build/')
		_()
	})
})