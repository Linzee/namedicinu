import slugify from 'slugify';

export const slugify_faculty = (node) => {
  return "f-" + slugify(node.shortTitle||"", {
    remove: '.'
  })
};

export const fix_nbsp = (title) => {
  return title ? title.replaceAll('&nbsp;', "\u00A0") : title;
}
