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
    let tagsLines = match.replace(match.split('\n')[0], '').match(tagRegex);
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
    current.name = match.split('\n')[0].replace('#', '').trim();
  }
};

module.exports.parseMD2 = function(str) {
  function clearString(strData, saveBreaks) {
    if (!strData) return '';
    let str = strData.trim();
    if (saveBreaks) {
      str = str
        .replaceAll(/(\\n)/gim, '\\n')
        .replaceAll(/([\n\r])/gim, '\\n');
    } else {
      str = str
        .replaceAll(/(\\n)/gim, ' ')
        .replaceAll(/(\n){1}/gim, '\n')
        .replaceAll(/\s{2,}/gim, ' ');
    }


    if (str.match(/^(\`){1,}.*(\`){1,}$/gim)) {
      str = str
        .replaceAll(/^(\`)*/gim, '')
        .replaceAll(/(\`){1,}$/gim, '')
        .trim();
    }
    return str;
  }

  function getNameRegex(str) {
    return new RegExp(`\\#\\s*(${str})`, 'gmi');
  }

  let result = {};
  let strArray = str.split(/^((\-\-\-)*\n*\#)/gim);
  strArray = strArray.filter((e) => !!e).map((e) => '#' + e).map((e) => e.replaceAll(/^(\-\-\-)/gmi, ''));

  let names = [];
  strArray.forEach((e) => {
    let find = /#\s*(.*)/gim.exec(e);
    if (find) {
      names.push(find[1]);
    } else {
      names.push('');
    }
  });
  names.forEach((e, i) => {
    switch (e.toLowerCase()) {
      case 'title':
      case 'description':
      case 'shortdescription':
      case 'date':
      default:
        if (e.toLowerCase() === 'longdescription') result[e.toLowerCase()] = clearString(clearString(strArray[i], true).split(getNameRegex(e))[2], true); else result[e.toLowerCase()] = clearString(clearString(strArray[i], false).split(getNameRegex(e))[2], false);
        break;
      case 'tags':
      case 'members':
      case 'images':
      case 'videos':
      case 'techs':
      case 'tech':
      case 'developers':
        let regexp = /\s*\*\s{1,}/gim;
        if (!strArray[i].split(getNameRegex(e))[2].match(regexp)) {
          regexp = /\s*\-\s{1,}/gim;
        }
        result[e.toLowerCase()] = clearString(strArray[i].split(getNameRegex(e))[2])
          .split(regexp)
          .filter((e) => !!e)
          .map((e) => {
            if (e.match(/!\[.*\]\(/gim)) {
              return e.replaceAll(/!\[.*\]\(/gim, '').replace(/\)$/gim, '');
            } else {
              return e;
            }
          });
        break;
      case 'sourcecode':
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
  delete result[''];
  return result;
};