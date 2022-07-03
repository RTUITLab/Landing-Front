# Landing-Front

**Content:**

1. [Stack](#stack)
2. [Installation](#installation)
3. [Dev running](#dev-running)
4. [Production](#production)
5. [Deploy](#deploy)

## Stack

![Pug](https://img.shields.io/badge/Pug-FFF?style=for-the-badge&logo=pug&logoColor=A86454)
![Parcel](https://img.shields.io/badge/parcel-%230769AD.svg?style=for-the-badge&logo=parcel&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Jake](https://img.shields.io/badge/Jake-FE7A16?style=for-the-badge&logo=Jake&logoColor=white)

## Installation

You just need to install the npm packages: 
```
$ npm install
```

## Dev running

```
$ npm start
```

And then look main page in [http://localhost:3000/index.html](http://localhost:3000/index.html)

## Production

```
$ jake token=<your github access token>
```

The token is needed to get access to images from private repositories.

## Deploy

To change the **code**, you need to push the changes to the `master` branch, after which the project will be assembled 
into the `gh-pages-pr` branch and create a pull request from it to the `gh-pages`, 
which is the landing host.

To change the **content** of the landing page, you need to push the changes to the `data` branch, after which a pull 
request will be created to change the submodule in the `master` branch. Next, the project will be 
assembled (for more information in the previous paragraph).

More information about building a project and adding content 
[here](https://github.com/RTUITLab/Landing-Front/wiki/%D0%A1%D0%B1%D0%BE%D1%80%D0%BA%D0%B0-%D1%81%D0%B0%D0%B9%D1%82%D0%B0-(RC)).