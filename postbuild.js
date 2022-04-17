const fs = require("fs");
const path = require("path");
const replace = require("replace-in-file");
const escapeRegExp = require("lodash.escaperegexp");


let ENV_PATH = process.argv[2]
if (!ENV_PATH) ENV_PATH = ""
// the directory in which you're outputting your ./build/projects
let baseDir = "./build/" + ENV_PATH;
// the name for the directory where your static files will be moved to
let staticDir = "static";
// the directory where your built files (css and JavaScript) will be moved  to
let assetsDir = "dist";

// if the staticDir directory isn't there, create it
if (!fs.existsSync(path.join(__dirname, baseDir, staticDir))) {
	fs.mkdirSync(path.join(__dirname, baseDir, staticDir));
}

// same for the assetsDir directory
if (!fs.existsSync(path.join(__dirname, baseDir, assetsDir))) {
	fs.mkdirSync(path.join(__dirname, baseDir, assetsDir));
}

// Loop through the baseDir directory
fs.readdir(`./${baseDir}`, (err, files) => {
	// store all files in custom arrays by type
	let html = [];
	let js = [];
	let css = [];
	let maps = [];
	let staticAssets = [];

	files.forEach((file) => {
		// first HTML files
		if (file.match(/.+\.(html)$/)) {
			console.log("html match", file);
			html.push(file);
		} else if (file.match(/.+\.(js)$/)) {
			// then JavaScripts
			js.push(file);
		} else if (file.match(/.+\.(map)$/)) {
			// then CSS
			maps.push(file);
		} else if (file.match(/.+\.(css)$/)) {
			// then sourcemaps
			css.push(file);
		} else if (file.match(/.+\..+$/)) {
			// all other files, exclude current directory and directory one level up
			staticAssets.push(file);
		}
	});
	// check what went where
	console.log("html", html, "css", css, "js", js, "staticAssets", staticAssets);

	// create an array for all compiled assets
	let assets = css.concat(js).concat(maps);

	// replace all other resources in html
	html.forEach((file) => {
		staticAssets.forEach((name) => {
			let options = {
				files: path.join("./build/" + ENV_PATH, file),
				from: new RegExp(escapeRegExp(name), "g"),
				to: "/" + staticDir + "/" + name.split("/").at(-1),
			};
			try {
				let changedFiles = replace.sync(options);
				console.log("Modified files:", changedFiles.join(", "));
			} catch (error) {
				console.error("Error occurred:", error);
			}
		});
		assets.forEach((name) => {
			let options = {
				files: path.join("./build/" + ENV_PATH, file),
				from: new RegExp(escapeRegExp(name), "g"),
				to: "/" + assetsDir + "/" + name.split("/").at(-1),
			};
			try {
				let changedFiles = replace.sync(options);
				console.log("Modified files:", changedFiles.join(", "));
			} catch (error) {
				console.error("Error occurred:", error);
			}
		});
	});

	// replace map links in js
	js.forEach((file) => {
		maps.forEach((name) => {
			let options = {
				files: path.join("./build/" + ENV_PATH, file), from: name, to: "../" + assetsDir + "/" + name.split("/").at(-1),
			};
			try {
				let changedFiles = replace.sync(options);
				console.log("Modified files:", changedFiles.join(", "));
			} catch (error) {
				console.error("Error occurred:", error);
			}
		});
	});

	// replace links in css
	css.forEach((file) => {
		staticAssets.forEach((name) => {
			let options = {
				files: path.join("./build/" + ENV_PATH, file),
				from: new RegExp(escapeRegExp(name), "g"),
				to: "../" + staticDir + "/" + name.split("/").at(-1),
			};
			try {
				let changedFiles = replace.sync(options);
				console.log("Modified files:", changedFiles.join(", "));
			} catch (error) {
				console.error("Error occurred:", error);
			}
		});
	});

	// move js and css and maps
	assets.forEach((name) => {
		fs.rename(path.join(__dirname, "./build/" + ENV_PATH, name), path.join(__dirname, "./build", assetsDir, name), function (err) {
			if (err) throw err;
			console.log(`Successfully moved ${name}`);
		});
	});
	// move staticAssets
	staticAssets.forEach((name) => {
		fs.rename(path.join(__dirname, "./build/" + ENV_PATH, name), path.join(__dirname, "./build", staticDir, name), function (err) {
			if (err) throw err;
			console.log(`Successfully moved ${name}`);
		});
	});
});
