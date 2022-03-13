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

module.exports.parseMD2 = function (str) {
  function clearString(strData) {
    if (!strData) return "";
    let str = strData
      .replaceAll(/(\\n)/gim, "")
      .replaceAll(/(\n){1}/gim, " ")
      .replaceAll(/\s{2,}/gim, " ")
      .trim();

    if (str.match(/^(\`){1,}.*(\`){1,}$/gim)) {
      str = str
        .replaceAll(/^(\`)*/gim, "")
        .replaceAll(/(\`){1,}$/gim, "")
        .trim();
    }
    return str;
  }
  function getNameRegex(str) {
    return new RegExp(`\\#\\s*(${str})`, "gmi");
  }

  let result = {};
  let strArray = str.split(/^\-\-\-$/gim);
  let names = [];
  strArray.forEach((e) => {
    let find = /#\s*(.*)/gim.exec(e);
    if (find) {
      names.push(find[1]);
    } else {
      names.push("");
    }
  });
  names.forEach((e, i) => {
    switch (e.toLowerCase()) {
      case "title":
      case "description":
      case "shortdescription":
      case "date":
      default:
        result[e.toLowerCase()] = clearString(
          clearString(strArray[i]).split(getNameRegex(e))[2]
        );
        break;
      case "tags":
      case "members":
      case "images":
      case "videos":
      case "techs":
      case "tech":
      case "developers":
        let regexp = /\s*\*\s{1,}/gim;
        if (!strArray[i].split(getNameRegex(e))[2].match(regexp)) {
          regexp = /\s*\-\s{1,}/gim;
        }
        result[e.toLowerCase()] = clearString(
          strArray[i].split(getNameRegex(e))[2]
        )
          .split(regexp)
          .filter((e) => !!e)
          .map((e) => {
            if (e.match(/!\[.*\]\(/gim)) {
              return e.replaceAll(/!\[.*\]\(/gim, "").replace(/\)$/gim, "");
            } else {
              return e;
            }
          });
        break;
      case "sourcecode":
        let m;
        let arr = [];
        const regex = /\|\s([^|]*)\|\s*([^\|]*)\|/gim;
        while ((m = regex.exec(strArray[i])) !== null) {
          if (m.index === regex.lastIndex) {
            regex.lastIndex++;
          }
          arr.push(m);
        }
        result[e.toLowerCase()] = [];
        if (arr.length > 2) {
          for (let i = 2; i < arr.length; i++) {
            let buff = {};
            buff[clearString(arr[0][1])] = clearString(arr[i][1]);
            buff[clearString(arr[0][2])] = clearString(arr[i][2]);
            result[e.toLowerCase()].push(buff);
          }
        }
        break;
    }
  });
  delete result[""];
  return result;
};

this.parseMD2(`

# Title
Сервис проектов RTUITLab

---
# Description
Сервис позволяет отслеживать проекты лаборатории, мониторить их прогресс
Возможность хранить файлы, относящиеся к проекту, оставлять новости
А также распределение ролей

---
# Tags
* Backend
* Golang

---
# Tech
* Go
* MongoDB

---
# Developers
* Демин Д.Д.
* Миронов Н.М.
* Лаптев И.А.
* Корольков А.Д.
* Баикин К.Е.

---

# Images
* ![list](landing/list.png)
* ![show_ArtWay](landing/show_ArtWay.png)
* ![show_ArtWay2](landing/show_ArtWay2.png)
* ![show_VIKA](landing/show_VIKA.png)
* ![edit_VIKA](landing/edit_VIKA.png)

---

# Videos

---

# Site
https://manage.rtuitlab.dev/projects

---

# SourceCode
| name     | link                                             |
| ---------| ------------------------------------------------ |
| Бекенд   | https://github.com/RTUITLab/ITLab-Projects       |
| Фронтенд | https://github.com/RTUITLab/ITLab-Projects-Front |


---


`);
