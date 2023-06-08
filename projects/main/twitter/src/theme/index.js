import variables from './theme.module.scss';

// function to filter an object by key prefix
const filterByPrefix = (obj, prefix) =>
  Object.keys(obj)
    .filter((key) => key.startsWith(prefix))
    .reduce((res, key) => ((res[key] = obj[key]), res), {});

// function to remove prefix from object keys
const removePrefix = (obj, prefix) =>
  Object.keys(obj).reduce((res, key) => {
    res[key.replace(prefix, '')] = obj[key];
    return res;
  }, {});

const grays = filterByPrefix(variables, 'gray-');
const colors = filterByPrefix(variables, 'color-');
const themeColorsPrefixed = filterByPrefix(variables, 'theme-color-');
const themeColors = removePrefix(themeColorsPrefixed, 'theme-color-');
const fonts = filterByPrefix(variables, 'font-');
const spacers = filterByPrefix(variables, 'spacer-');
const borderWidths = filterByPrefix(variables, 'border-width-');
const borderRadiusPrefixed = filterByPrefix(variables, 'border-radius-');
const borderRadius = removePrefix(borderRadiusPrefixed, 'border-radius-');

const theme = {
  colors: {
    white: variables['white'],
    ...grays,
    black: variables['black'],
    ...colors,
    ...themeColors,
  },
  fonts: ['14px', ...Object.values(fonts)],
  space: Object.values(spacers),
  border: {
    radius: {
      ...borderRadius,
    },
    width: Object.values(borderWidths),
  },
};

export default theme;
