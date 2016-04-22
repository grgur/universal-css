import path from 'path';
import { stringifyRequest } from 'loader-utils';

module.exports = function loader() {};
module.exports.pitch = function pitch(remainingRequest) {
  if (this.cacheable) {
    this.cacheable();
  }

  const insertCssPath = path.join(__dirname, './insertCss.js');
  const strRemainingRequest = stringifyRequest(this, `!!${remainingRequest}`);
  const strInsertCssPath = stringifyRequest(this, `!${insertCssPath}`);

  let output = `
    var content = require(${strRemainingRequest});
    var insertCss = require(${strInsertCssPath});

    if (typeof content === 'string') {
      content = [[module.id, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
  `;

  output += this.debug ? `
    if (module.hot && typeof window === 'object' && window.document) {
      var removeCss = function() {};
      module.hot.accept(${strRemainingRequest}, function() {
        content = require(${strRemainingRequest});

        if (typeof content === 'string') {
          content = [[module.id, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  ` : '';

  return output;
};
