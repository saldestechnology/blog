import fs from "fs";
import path from "path";
import matter from "gray-matter";

const dirFiles = fs.readdirSync(path.join(process.cwd(), "posts"), {
  withFileTypes: true,
});

export const getPosts = (_: number): Array<Post> => {
  const posts = dirFiles
    .map((file) => {
      if (!file.name.endsWith(".mdx")) return;

      const fileContent = fs.readFileSync(
        path.join(process.cwd(), "posts", file.name),
        "utf-8"
      );
      const { data, content } = matter(fileContent);

      const slug = file.name.replace(/.mdx$/, "");
      return { data, content, slug };
    })
    .filter((post) => post);

  return posts as Array<Post>;
};

export const getPost = (slug: string) => {
  const post = dirFiles
    .map((file) => {
      if (!file.name.endsWith(".mdx")) return;

      if (!file.name.match(slug)) return;

      const fileContent = fs.readFileSync(
        path.join(process.cwd(), "posts", file.name),
        "utf-8"
      );
      const { data, content } = matter(fileContent);

      return { data, content, slug };
    })
    .filter((post) => post);

  return post as Array<Post>;
};
