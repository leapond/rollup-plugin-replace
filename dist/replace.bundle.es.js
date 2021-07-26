import { createFilter } from '@rollup/pluginutils';

var optionsDefault = {
      include: '**/*.(js|ts|css|html|vue|car)',
      LEAPOND: false
    },
    warn = console.warn.bind(console, '[LEAPOND:replace]:');
/**
 * @param options
 * @return {*|boolean|null|{code, map: {mappings: string}}|{transform(*, *=): (null|{code: *, map: {mappings: string}}), name: string}}
 */
function leapondReplace(options) {
  if (!options) {
    console.warn('missed options');
    return
  }

  if (arguments.length === 2) {
    options = {rules: [[options, arguments[1]]]};
  } else if (Array.isArray(options)) {
    if (Array.isArray(options[0])) { options = {rules: options}; } else { options = {rules: [options]}; }
  }

  if (options.LEAPOND) {
    if (!Array.isArray(options.rules)) { options.rules = []; }
    options.rules.unshift([/(\/\*+\s*<DEV\s*)\*+\/[\s\S]*?\/\*+(\s*DEV>\s*\*+\/)/mg, '']);
  }

  if (!Array.isArray(options.rules) || !options.rules.length) { return warn('rules missed') || false }

  var filteredRules = [];
  options.rules.forEach(function (r) {
    if (!Array.isArray(r) || r.length < 2) { return warn('wrong rule 0:', r) }
    var finder = r[0];
    if (!finder || ((typeof finder !== 'string' && Object.prototype.toString.call(finder) !== '[object RegExp]'))) { return warn('wrong rule 1:', r) }
    if (typeof finder === 'string') { r[0] = new RegExp(finder, 'mg'); } else if (Object.prototype.toString.call(finder) !== '[object RegExp]') { return warn('wrong rule 2:', r) }
    filteredRules.push(r);
  });

  if (!filteredRules.length) { return warn('rules missed 3') || false }

  options.rules = filteredRules;

  options = Object.assign({}, optionsDefault, options);

  var filter = createFilter(options.include, options.exclude);

  return {
    name: 'leapond-replace',
    transform: function transform(code, id) {
      if (!filter(id)) { return null; }
      options.rules.forEach(function (r) { return code = code.replace(r[0], r[1]); });

      return {
        code: code,
        map: {mappings: ''}
      };
    }
  };
}

export default leapondReplace;
//# sourceMappingURL=replace.bundle.es.js.map
