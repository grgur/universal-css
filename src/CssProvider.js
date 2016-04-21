import React, { Component, PropTypes } from 'react';


class InsertCssProvider extends Component {
  static propTypes = {
    insertCss: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  static childContextTypes = {
    insertCss: PropTypes.func,
  };

  static defaultProps = {
    insertCss: insertCssClient,
  };

  getChildContext() {
    return {
      insertCss: (styles) => {
        const { insertCss } = this.constructor;
        if (Array.isArray(styles)) {
          styles.forEach(insertCss);
        } else {
          insertCss(styles);
        }
      },
    };
  }

  render() {
    const { children } = this.props;
    return React.Children.only(children);
  }
}

export class CssProviderServer extends InsertCssProvider {
  static insertCss = insertCssServer;
}

export default class CssProvider extends InsertCssProvider {
  static insertCss = insertCssClient;
}

export const usedCss = [];
export function insertCssClient(styles) {
  if (usedCss.indexOf(styles) === -1) {
    styles._insertCss();
    usedCss.push(styles);
  }
}

export const cssRules = [];
export function insertCssServer(styles) {
  const style = styles._style;
  if (cssRules.indexOf(style) === -1) {
    cssRules.push(style);
  }
}

export function concatCssServer() {
  const cssString = cssRules.join('');
  cssRules.length = 0;
  return cssString;
}

export function inlineCss(html) {
  html.replace(/(<head\b[^>]*>)/i, `$1 ${concatCssServer()}`);
}
