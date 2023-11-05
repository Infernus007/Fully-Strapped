import path from "path";
import { promises as fs } from "fs";
import { globby } from "globby";
import os from "os";
import grayMatter from "gray-matter";

(async function () {
  // prepare the dirs
  const srcDir = path.join(process.cwd(), "src");
  const publicDir = path.join(process.cwd(), "public");
  const contentDir = path.join(srcDir, "content", "assets");
  let contentFilePattern = path.join(contentDir, "*.mdx");
  if (os.platform().includes("win")) {
    contentFilePattern = contentFilePattern.replaceAll("\\", "/");
  }
  const indexFile =
    "C:/Users/Jash/OneDrive/Desktop/Fully-Straped/public/search-index.json";
  const getSlugFromPathname = (pathname) =>
    path.basename(pathname, path.extname(pathname));

  const contentFilePaths = await globby([
    "C:/Users/Jash/OneDrive/Desktop/Fully-Straped/src/content/assets/button.mdx",
    "C:/Users/Jash/OneDrive/Desktop/Fully-Straped/src/content/assets/tabs.mdx",
    "C:/Users/Jash/OneDrive/Desktop/Fully-Straped/src/content/assets/orbit.mdx",
    "C:/Users/Jash/OneDrive/Desktop/Fully-Straped/src/content/assets/menu.mdx",
    "C:/Users/Jash/OneDrive/Desktop/Fully-Straped/src/content/assets/input.mdx",
    "C:/Users/Jash/OneDrive/Desktop/Fully-Straped/src/content/assets/forms.mdx",
    "C:/Users/Jash/OneDrive/Desktop/Fully-Straped/src/content/assets/card.mdx",
  ]);
  console.log(contentFilePaths);

  if (contentFilePaths.length) {
    const files = contentFilePaths.map(
      async (filePath) => await fs.readFile(filePath, "utf8")
    );
    const fileContents = await Promise.all(files);

    console.log(fileContents);

    const index = [];
    let i = 0;
    for await (let file of files) {
      const {
        data: { title },
        content,
      } = grayMatter(file);
      index.push({
        slug: getSlugFromPathname(contentFilePaths[i]),
        title,
        body: content,
      });
      i++;
    }
    await fs.writeFile(indexFile, JSON.stringify(index));
    console.log(
      `Indexed ${index.length} documents from ${contentDir} to ${indexFile}`
    );
  }
})();
