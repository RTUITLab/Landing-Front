import argparse
import json
import os
import re
import requests


def read_markdown_blocks(path: str):
    with open(path, "r", encoding="utf-8") as f:
        rawdata = f.read()

    blocks = {}
    for block in rawdata.split("---\n"):
        block = block.strip()
        title = block.split("\n")[0][2:].strip()
        if title:
            title = title[0].lower() + title[1:]
            content = "\n".join(block.split("\n")[1:])
            blocks[title] = content.strip("\n")

    return blocks


def parse_description(content: str):
    return content.replace("```", "").strip("\n").replace("\t\t", "\t")


def parse_images(content: str, repo_full_name: str, default_branch: str):
    images = []
    for image in content.split("\n"):
        url = image.split("(")[-1].split(")")[0]
        if not url.startswith("http"):
            url = f"https://github.com/{repo_full_name}/raw/" +\
                f"{default_branch}/{url.strip('/')}"
        images.append(url)
    return images


def parse_videos(content: str):
    youtubeRegex = re.compile(r"(?<=https://youtu.be/)([^/]+)")
    videos = []
    for video in content.split("\n"):
        url = youtubeRegex.search(video[2:])
        if url:
            url = f"https://www.youtube.com/embed/{url.group(0)}"
            videos.append(url)
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


def save_images(images: list, save_dir: str):
    for image_url in images:
        response = requests.get(image_url)
        image_name = image_url.split("/")[-1]
        image_path = os.path.join(save_dir, image_name)
        with open(image_path, "wb") as f:
            f.write(response.content)


def create_dir(repo_full_name: str, from_path: str, to_path: str, data: dict):
    project_name = repo_full_name.split("/")[1]
    project_dir = os.path.join(to_path, project_name)
    os.mkdir(project_dir)
    info_file_path = os.path.join(project_dir, "info.json")
    with open(info_file_path, "w", encoding="utf-8") as f:
        _ = json.dump(data, f, ensure_ascii=False, indent=4)
    save_images(data["images"], project_dir)
    return


if __name__ == "__main__":
    args_parser = argparse.ArgumentParser(
        description="Parser of LANDING.md file",
        formatter_class=argparse.ArgumentDefaultsHelpFormatter
    )

    args_parser.add_argument("-s", "--source", help="path to read README.md",
                             default=".")
    args_parser.add_argument("-t", "--target", help="path to save json file",
                             default=".")
    args_parser.add_argument("-r", "--repo", help="repo full name")
    args_parser.add_argument("-b", "--branch", help="default repo's branch")
    args = args_parser.parse_args()

    blocks = read_markdown_blocks(os.path.join(args.source, "LANDING.md"))

    blocks["description"] = parse_description(blocks["description"])
    blocks["images"] = parse_images(blocks["images"],
                                    args.repo, args.branch)
    blocks["videos"] = parse_videos(blocks["videos"])
    blocks["tags"] = parse_list(blocks["tags"])
    blocks["tech"] = parse_list(blocks["tech"])
    blocks["developers"] = parse_list(blocks["developers"])
    blocks["sourceCode"] = parse_source_code(blocks["sourceCode"])
    create_dir(args.repo, args.source, args.target, blocks)
