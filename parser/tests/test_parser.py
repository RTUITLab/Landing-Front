import json
import os

from main import read_markdown_blocks, create_json


def parse(source: str, repo: str, branch: str):
    blocks = read_markdown_blocks(os.path.join(
        os.path.dirname(__file__),
        source,
        "LANDING.md")
    )
    create_json(blocks, repo, branch)
    target_path = os.path.join(os.path.dirname(__file__), source,
                               "LANDING.json")
    with open(target_path, "r", encoding="utf-8") as f:
        decoder = json.JSONDecoder(strict=False)
        target = decoder.decode(f.read())
    target["description"] = "\n".join([
        s.strip() for s in target["description"].replace(
            "```", "").strip("\n").split("\n")
    ])
    assert blocks == target


def test_SC():
    parse("SC", "RTUITLab/SC", "master")


def test_ITLab():
    parse("ITLab", "RTUITLab/ITLab", "master")


def test_GeoHelper():
    parse("GeoHelper", "RTUITLab/GeoHelperUnity", "master")


def test_OculusHandTrackingKeyboard():
    parse(
        "Oculus-HandTracking-Keyboard",
        "RTUITLab/Oculus-HandTracking-Keyboard",
        "master"
    )


def test_EngineVR():
    parse("Engine-VR", "RTUITLab/Engine-VR", "master")


def test_WebVRShoot():
    parse("WebVRShoot", "RTUITLab/WebVRShoot", "master")
