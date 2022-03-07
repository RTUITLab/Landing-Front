import argparse
import json
import os
import re
import requests
import shutil

from datetime import date


IMG_URLS = list()


def read_markdown_blocks(path: str):
    with open(path, "r", encoding="utf-8") as f:
        rawdata = f.read()

    blocks = {}
    for block in re.split("^#", rawdata, 0, re.MULTILINE):
        block = block.strip().strip("---")
        title = block.split("\n")[0].strip()
        if title:
            title = title[0].lower() + title[1:]
            content = "\n".join(block.split("\n")[1:])
            blocks[title] = content.strip("\n")

    return blocks


def parse_description(content: str):
    return "\n".join([
        s.strip() for s in content.replace("```", "").strip("\n").split("\n")
    ])


def parse_images(content: str, repo_full_name: str, default_branch: str):
    images = []
    for image in content.split("\n"):
        url = image.split("(")[-1].split(")")[0]
        if not url.startswith("http"):
            url = f"https://github.com/{repo_full_name}/raw/" +\
                f"{default_branch}/{url.strip('/')}"
        images.append(url.split('/')[-1])
        IMG_URLS.append(url)
    return images


def parse_videos(content: str):
    youtubeRegex = re.compile(r"(?<=https://youtu.be/)([^/]+)")
    videos = []
    for video in content.split("\n"):
        if not video:
            continue
        url = youtubeRegex.search(video[2:])
        if url:
            url = f"https://www.youtube.com/embed/{url.group(0)}"
            videos.append(url)
        else:
            print(f"::error ::Please provide a link to YouTube - {url}")
    return videos


def parse_list(content: str):
    data = []
    for line in content.split("\n"):
        data.append(line[2:])
    return data


def parse_source_code(content: str):
    data = []
    for line in content.split("\n")[2:]:
        c = line.split("|")
        data.append({
            "name": c[1].strip(),
            "link": c[2].strip()
        })
    return data


def save_images(save_dir: str):
    for image_url in IMG_URLS:
        response = requests.get(image_url)
        if response.status_code == 404:
            print(f"::error ::Access denied for image by {image_url}")
        else:
            image_name = image_url.split("/")[-1]
            image_path = os.path.join(save_dir, image_name)
            with open(image_path, "wb") as f:
                f.write(response.content)


def create_dir(repo_full_name: str, to_path: str, data: dict):
    project_name = repo_full_name.split("/")[1]
    project_dir = os.path.join(to_path, project_name)
    if os.path.exists(project_dir):
        shutil.rmtree(project_dir, ignore_errors=True)
    os.makedirs(project_dir)
    info_file_path = os.path.join(project_dir, "info.json")
    with open(info_file_path, "w", encoding="utf-8") as f:
        _ = json.dump(data, f, ensure_ascii=False, indent=4)
        f.write("\n")
    save_images(project_dir)
    return


def create_json(blocks: dict, repo: str, branch: str):
    try:
        blocks["description"] = parse_description(blocks["description"])
        print('::notice ::Read block "Description"')
    except KeyError:
        print('::error ::Provide block "Description"')

    try:
        blocks["images"] = parse_images(blocks["images"], repo, branch)
        print('::notice ::Read block "Images"')
    except KeyError:
        print('::error ::Provide block "Images"')

    try:
        blocks["videos"] = parse_videos(blocks["videos"])
        print('::notice ::Read block "Videos"')
    except KeyError:
        print('::error ::Provide block "Videos"')

    try:
        blocks["tags"] = parse_list(blocks["tags"])
        print('::notice ::Read block "Tags"')
    except KeyError:
        print('::error ::Provide block "Tags"')

    try:
        blocks["tech"] = parse_list(blocks["tech"])
        print('::notice ::Read block "Tech"')
    except KeyError:
        print('::error ::Provide block "Tech"')

    try:
        blocks["developers"] = parse_list(blocks["developers"])
        print('::notice ::Read block "Developers"')
    except KeyError:
        print('::error ::Provide block "Developers"')

    try:
        blocks["site"] = parse_description(blocks["site"])
        if not blocks["site"]:
            blocks["site"] = None
        print('::notice ::Read block "Site"')
    except KeyError:
        print('::error ::Provide block "Site"')

    try:
        blocks["sourceCode"] = parse_source_code(blocks["sourceCode"])
        print('::notice ::Read block "SourceCode"')
    except KeyError:
        print('::error ::Provide block "SourceCode"')


def run(source: str, target: str, repo: str, branch: str,
        f_name: str = "LANDING.md"):
    blocks = read_markdown_blocks(os.path.join(source, f_name))
    create_json(blocks, repo, branch)
    blocks["date"] = date.today().strftime("%d/%m/%Y")
    create_dir(repo, target, blocks)


if __name__ == "__main__":
    args_parser = argparse.ArgumentParser(
        description="LANDING.md file parser",
        # formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )

    args_parser.add_argument("-s", "--source",
                             help="path to read README.md (default: '.')",
                             default=".")
    args_parser.add_argument("-t", "--target",
                             help="path to save json file (default: '.')",
                             default=".")
    args_parser.add_argument("-r", "--repo", help="repo full name [required]",
                             required=True)
    args_parser.add_argument("-b", "--branch",
                             help="default repo's branch [required]",
                             required=True)
    args = args_parser.parse_args()

    run(args.source, args.target, args.repo, args.branch)
