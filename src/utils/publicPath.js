export function publicPath(path) {
  if (!path || /^(https?:|mailto:|tel:|#)/.test(path)) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}
