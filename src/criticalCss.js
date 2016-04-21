import React, { Component, PropTypes } from 'react';

function getDisplayName(ComposedComponent) {
  return ComposedComponent.displayName || ComposedComponent.name || 'Component';
}

function criticalCss(...styles) {
  return (ComposedComponent) => class UniversalStyles extends Component {
    static contextTypes = {
      insertCss: PropTypes.func.isRequired,
    };

    static displayName = `criticalCss(${getDisplayName(ComposedComponent)})`;
    static ComposedComponent = ComposedComponent;

    componentWillMount() {
      this.removeCss = this.context.insertCss.apply(undefined, styles);
    }

    componentWillUnmount() {
      setTimeout(this.removeCss, 0);
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  };
}

export default criticalCss;
