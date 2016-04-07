var logger = require('libs/log')(module);

exports.parse = function(str, line, parser, types, options, swig) {
  var variable = undefined;
  var alias = undefined;
  var getAlias = false;

  parser.on(types.VAR, function(token) {

    if (!variable) {
      variable = token.match;
      return;
    }

    if (token.match === 'as') {
      getAlias = true;
      return;
    }

    if (variable) {
      if (getAlias) {
        alias = token.match;
      }
      return;
    }

  });

  parser.on(types.BRACKETOPEN, function(token) {
    if (!getAlias) {
      variable += token.match;
    }
  });

  parser.on(types.BRACKETCLOSE, function(token) {
    if (!getAlias) {
      variable += token.match;
    }
  });

  parser.on(types.DOTKEY, function(token) {
    if (!getAlias) {
      variable += '.' + token.match;
    }
  });

  parser.on(types.STRING, function(token) {
    if (!getAlias) {
      variable += token.match;
    }
  });

  parser.on('end', function(token) {
    if (variable) {
      this.out.push(variable);
    }
    if (alias) {
      this.out.push(alias);
    }
  });

  return true;
};

exports.compile = function(compiler, args, content, parents, options, blockName) {
  var out = [];

  out.push('(function () {\n');

  if (args.length > 1) {
    var variable = args[0];
    var alias = args[1];
    out.push('var backup = undefined;\n');
    out.push('if(_ctx.' + alias + '){\n');
    out.push('backup = _ctx.' + alias + ';\n');
    out.push('}\n');
    out.push('_ctx.' + alias + ' = _ctx.' + variable + ';\n');
    out.push(compiler(content, parents, options, blockName) + '\n');
    out.push('if(backup){\n');
    out.push('_ctx.' + alias + '= backup;\n');
    out.push('}else{\n');
    out.push('delete _ctx.' + alias + ';\n');
    out.push('}\n');
  } else if (args.length == 1) {
    var variable = args[0];
    out.push('var backup = _ctx;\n');
    out.push('_ctx = _ctx.' + variable + ';\n');
    out.push(compiler(content, parents, options, blockName) + '\n');
    out.push('_ctx = backup;\n');
  }

  out.push('})();\n');

  return out.join('');
};

exports.ends = true;
exports.blockLevel = true;
