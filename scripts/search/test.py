import os
import glob
import asyncio
import json
from markdown_it import MarkdownIt

# Prepare the directories
src_dir = os.path.join(os.getcwd(), "src")
public_dir = os.path.join(os.getcwd(), "public")
content_dir = os.path.join(src_dir, "content", "assets")
content_file_pattern = os.path.join(content_dir, "*.mdx")

if os.name == "nt":  # Windows
    content_file_pattern = content_file_pattern.replace("\\", "/")

index_file = os.path.join(public_dir, "search-index.json")


# Function to extract data from .mdx files
def get_slug_from_pathname(pathname):
    return os.path.splitext(os.path.basename(pathname))[0]


async def extract_mdx_data():
    content_file_paths = glob.glob(content_file_pattern)

    if content_file_paths:
        index = []

        for file_path in content_file_paths:
            with open(file_path, 'r', encoding='utf-8') as file:
                file_contents = file.read()

            parsed_data = graymatter.parse(file_contents)
            title = parsed_data['data'].get('title', '')
            description = parsed_data['data'].get('description', '')
            tags = parsed_data['data'].get('tags', [])
            content = parsed_data['content']

            index.append({
                'slug': get_slug_from_pathname(file_path),
                'category': 'blog',
                'title': title,
                'description': description,
                'tags': tags,
                'body': content
            })

        with open(index_file, 'w', encoding='utf-8') as output_file:
            json.dump(index, output_file, ensure_ascii=False)

        print(f"Indexed {len(index)} documents from {content_dir} to {index_file}")


# Run the asynchronous tasks
loop = asyncio.get_event_loop()
loop.run_until_complete(extract_mdx_data())
