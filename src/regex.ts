export function match(regex: RegExp, str: string) {
  let m;
  const results = [];
  while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    results.push({ full_text: m.groups?.text.split("\\n").join(" ") });
  }
  return results;
}
