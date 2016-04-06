var logger = require('libs/log')(module);

exports.parse = function(str, line, parser, types, options, swig) {
  var variable = undefined;
  var styleName = undefined;
  var getStyleName = false;

  parser.on(types.WHITESPACE, function(token) {
    getStyleName = true;
  });

  parser.on(types.VAR, function(token) {
    if (!variable) {
      variable = token.match;
    }
  });

  parser.on(types.BRACKETOPEN, function(token) {
    if (!getStyleName) {
      variable += token.match;
    }
  });

  parser.on(types.BRACKETCLOSE, function(token) {
    if (!getStyleName) {
      variable += token.match;
    }
  });

  parser.on(types.DOTKEY, function(token) {
    if (!getStyleName) {
      variable += '.' + token.match;
    }
  });

  parser.on(types.STRING, function(token) {
    if (!getStyleName) {
      variable += token.match;
    } else {
      styleName = token.match;
    }
  });

  parser.on('end', function(token) {
    if (variable) {
      this.out.push(variable);
    }
    if (styleName) {
      this.out.push(styleName);
    }
  });

  return true;
};

exports.compile = function(compiler, args, content, parents, options, blockName) {
  var out = [];
  var variable = args[0];
  var styleName = args[1];
  out.push('(function () {\n');
  out.push('_output += "/image/style/" + _ctx.' + variable + '.id + "/" + ' +
    styleName + ' + "/" + _ctx.' + variable + '.getBaseName();\n');
  out.push('})();\n');

  return out.join('');
};

exports.ends = false;
exports.blockLevel = true;
