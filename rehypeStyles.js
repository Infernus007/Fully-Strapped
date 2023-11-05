// styles.js
import styles from "./astro.config.mjs";

export default async function getStyles() {
  const module = await import(styles);
  const some = module.default.markdown.rehypePlugins[0][1];

  return some;
}
