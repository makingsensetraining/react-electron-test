import { withProps, lifecycle, setDisplayName, compose, pure } from 'recompose';

export * from 'recompose';

// Wrappers

export const withInit = (trackingProps, initFunc) => lifecycle({
  componentWillMount() {
    initFunc(this.props);
  },
  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line
    for (let name of trackingProps) {
      // eslint-disable-next-line
      if (this.props[name] !== nextProps[name]) {
        return initFunc(nextProps);
      }
    }
    return undefined;
  },
});

export const withDestroy = func => lifecycle({
  componentWillUnmount: func,
});


export const withImmutables = (...porpNames) =>
withProps(props =>
  porpNames.reduce((result, name) =>
  ({ ...result, [name]: props[name] && props[name].toJS() }),
  {}
));

export const withShallowImmutables = (...porpNames) =>
withProps(props =>
  porpNames.reduce((result, name) =>
  ({ ...result, [name]: props[name] && props[name].toObject() }),
  {}
));

// Componsers

export const composeImpure = (...hocs) => component =>
compose(
    setDisplayName(component.name || 'Component'),
    ...hocs
)(component);

export const composePure = (...hocs) => component =>
composeImpure(...hocs, pure)(component);
