import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';

export default {
  extensions: [
    'less',
    'scss',
    'css',
  ],

  filter: WebpackIsomorphicToolsPlugin.style_loader_filter,
  path: WebpackIsomorphicToolsPlugin.style_loader_path_extractor,
  parser: WebpackIsomorphicToolsPlugin.css_modules_loader_parser,
};
