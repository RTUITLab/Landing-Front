import json
import re


def read_markdown_blocks(path: str):
    with open(path, "r", encoding="utf-8") as f:
        rawdata = f.read()

    blocks = {}
    for block in rawdata.split("---\n"):
        block = block.strip()
        title = block.split("\n")[0][2:].strip()
        if title:
            content = "\n".join(block.split("\n")[1:])
            blocks[title] = content.strip("\n")

    return blocks


def parse_description(content: str):
    return content.replace("```", "").strip("\n").replace("\t\t", "\t")


def parse_images(content: str, repoFullName: str, defaultBranch: str):
    images = []
    for image in content.split("\n"):
        url = image.split("(")[-1].split(")")[0]
        if not url.startswith("http"):
            url = f"https://github.com/{repoFullName}/raw/" +\
                f"{defaultBranch}/{url.strip('/')}"
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


if __name__ == "__main__":
    blocks = read_markdown_blocks("example.md")

    blocks["Description"] = parse_description(blocks["Description"])
    blocks["Images"] = parse_images(blocks["Images"],
                                    "RTUITLab/ITLab", "master")
    blocks["Videos"] = parse_videos(blocks["Videos"])
    blocks["Tags"] = parse_list(blocks["Tags"])
    blocks["Tech"] = parse_list(blocks["Tech"])
    blocks["Developers"] = parse_list(blocks["Developers"])
    blocks["SourceCode"] = parse_source_code(blocks["SourceCode"])
    with open("test.json", "w", encoding='utf-8') as f:
        _ = json.dump(blocks, f, ensure_ascii=False, indent=4)
