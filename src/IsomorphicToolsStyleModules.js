const defaultExtensions = [
  'less',
  'scss',
  'css',
];

export default (WebpackIsomorphicToolsPlugin, extensions=defaultExtensions) => ({
  extensions,
  filter: WebpackIsomorphicToolsPlugin.style_loader_filter,
  path: WebpackIsomorphicToolsPlugin.style_loader_path_extractor,
  parser: WebpackIsomorphicToolsPlugin.css_modules_loader_parser,
});
