const normalizePath = (path: string) => path.replace(/\/+$/, "");

const isNumeric = (seg: string) => /^\d+$/.test(seg);

type MenuItem = { url?: string; title?: string; children?: MenuItem[] };
type Crumb = { title: string; url: string };

// مقایسه با پشتیبانی از سگمنت داینامیک در تعریف منو (:id یا [id]) و اعداد
const segmentsMatch = (menuSegs: string[], pathSegs: string[]) => {
  if (menuSegs.length !== pathSegs.length) return false;
  return menuSegs.every((seg, i) => {
    const isDynamic =
      seg.startsWith(":") || (seg.startsWith("[") && seg.endsWith("]"));
    return isDynamic || isNumeric(seg) || seg === pathSegs[i];
  });
};

const findItemByPath = (
  items: MenuItem[],
  pathSegs: string[],
): MenuItem | undefined => {
  for (const item of items) {
    if (
      item.url &&
      segmentsMatch(
        normalizePath(item.url).split("/").filter(Boolean),
        pathSegs,
      )
    ) {
      return item;
    }
    if (item.children) {
      const found = findItemByPath(item.children, pathSegs);
      if (found) return found;
    }
  }
  return undefined;
};

export const useBreadcrumb = (pathname: string, menu: MenuItem[]): Crumb[] => {
  // const breadCrumbTitle = useBreadCrumbTitles((s) => s.breadCrumbTitle);

  const segments = normalizePath(pathname).split("/").filter(Boolean);

  const crumbs: Crumb[] = [];
  let acc = "";
  let dynamicIndex = 0; // اشاره‌گر روی آرایه‌ی store

  for (const segment of segments) {
    acc += "/" + segment;
    const accSegs = acc.split("/").filter(Boolean);

    if (isNumeric(segment)) {
      // به عدد رسیدیم: عنوان رو از store بردار
      // const title = breadCrumbTitle[dynamicIndex] ?? segment;
      dynamicIndex++;
      // crumbs.push({ title, url: acc });
    } else {
      const item = findItemByPath(menu, accSegs);
      if (item?.title) crumbs.push({ title: item.title, url: acc });
    }
  }

  return crumbs;
};
