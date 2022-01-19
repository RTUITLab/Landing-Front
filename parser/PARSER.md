# Setup
> Python3 required
1. Clone this repo and open terminal in project directory.
2. Install requirements in virtual environment.

    on Windows:
    ```cmd
    cd parser
    python -m venv venv
    .\venv\Scripts\activate
    python -m pip install -U pip
    pip install -r requirements.txt
    ```
    on Linux:
    ```cmd
    cd parser
    python -m venv venv
    source venv/bin/activate
    python -m pip install -U pip
    pip install -r requirements.txt
    ```

# Run tests
Run this command from project directory:
```cmd
pytest
```

# Usage
```cmd
python main.py -h
```
```cmd
usage: main.py [-h] [-s SOURCE] [-t TARGET] -r REPO -b BRANCH

LANDING.md file parser

optional arguments:
  -h, --help            show this help message and exit
  -s SOURCE, --source SOURCE
                        path to read README.md (default: '.')
  -t TARGET, --target TARGET
                        path to save json file (default: '.')
  -r REPO, --repo REPO  repo full name [required]
  -b BRANCH, --branch BRANCH
                        default repo's branch [required]
```
