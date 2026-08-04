#!/usr/bin/env python3
"""Generate the AON GitHub Pages sitemap from public HTML files."""

from __future__ import annotations

import argparse
import re
import subprocess
from datetime import date
from pathlib import Path
from xml.sax.saxutils import escape

BASE_URL = "https://kjp9204-oss.github.io/aonrehabcenter"
EXCLUDED_NAMES = {"paper-detail.html"}


def last_modified(root: Path, page: Path) -> str:
    relative = page.relative_to(root)
    result = subprocess.run(
        ["git", "log", "-1", "--format=%cs", "--", str(relative)],
        cwd=root,
        check=False,
        capture_output=True,
        text=True,
    )
    return result.stdout.strip() or date.today().isoformat()


def is_public(page: Path) -> bool:
    if page.name in EXCLUDED_NAMES or any(part.startswith(".") for part in page.parts):
        return False
    source = page.read_text(encoding="utf-8", errors="ignore")
    return not re.search(
        r'<meta[^>]+name=["\']robots["\'][^>]+content=["\'][^"\']*noindex',
        source,
        flags=re.IGNORECASE,
    )


def page_url(root: Path, page: Path) -> str:
    relative = page.relative_to(root).as_posix()
    if relative == "index.html":
        return f"{BASE_URL}/"
    if relative.endswith("/index.html"):
        return f"{BASE_URL}/{relative[:-10]}"
    return f"{BASE_URL}/{relative}"


def priority_for(url: str) -> str:
    if url == f"{BASE_URL}/":
        return "1.0"
    if url.endswith(("/posts/", "research-library.html", "about.html")):
        return "0.9"
    if "/posts/" in url or "/library/" in url:
        return "0.8"
    return "0.7"


def build(root: Path) -> str:
    pages = sorted(page for page in root.rglob("*.html") if is_public(page))
    entries = []
    for page in pages:
        url = page_url(root, page)
        entries.append(
            "\n".join(
                [
                    "  <url>",
                    f"    <loc>{escape(url)}</loc>",
                    f"    <lastmod>{last_modified(root, page)}</lastmod>",
                    "    <changefreq>monthly</changefreq>",
                    f"    <priority>{priority_for(url)}</priority>",
                    "  </url>",
                ]
            )
        )
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(entries)
        + "\n</urlset>\n"
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path.cwd())
    parser.add_argument("--output", type=Path, default=Path("sitemap.xml"))
    args = parser.parse_args()
    root = args.root.resolve()
    output = args.output if args.output.is_absolute() else root / args.output
    output.write_text(build(root), encoding="utf-8")


if __name__ == "__main__":
    main()
