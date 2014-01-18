var assert = require('assert');
var execFile = require('child_process').execFile;
var fs = require('fs');
var path = require('path');
var should = require('should');

var tests = [
  {
    dir: 'jquery-requirejs',
    condenseDir: 'jquery',
    wantConcreteDefPathsFile: 'core_cdp.json',
    condenseArgs: [
      '--flat',
      '--plugin', 'requirejs',
      '--plugin', 'override=[{"node":{"type":"MemberExpression","object":{"type":"Identifier","name":"jQuery"},"property":"extend"},"def":{"!hint":true,"jQuery":{"!type":"fn()","!hint":true,"extend":{"!type":"fn(object: ?) -> !this","!effects": ["copy !0 !this", "log jQuery.prototype.extend"]},"fn":{"!hint":true,"extend":{"!type":"fn(object: ?) -> !this","!effects": ["copy !0 !this", "log jQuery.extend"]}}}},"add":true}]',
      'src/core.js', 'src/core/access.js', 'src/core/init.js', 'src/core/parseHTML.js', 'src/core/ready.js', 'src/core/var/rsingleTag.js',
      'src/ajax.js', 'src/ajax/jsonp.js', 'src/ajax/load.js', 'src/ajax/parseJSON.js', 'src/ajax/parseXML.js', 'src/ajax/script.js', 'src/ajax/xhr.js', 'src/ajax/var/nonce.js', 'src/ajax/var/rquery.js',
      'src/attributes.js', 'src/attributes/attr.js', 'src/attributes/classes.js', 'src/attributes/prop.js', 'src/attributes/support.js', 'src/attributes/val.js',
      'src/css.js', 'src/css/addGetHookIf.js', 'src/css/curCSS.js', 'src/css/defaultDisplay.js', 'src/css/hiddenVisibleSelectors.js', 'src/css/support.js', 'src/css/swap.js', 'src/css/var/cssExpand.js', 'src/css/var/getStyles.js', 'src/css/var/isHidden.js', 'src/css/var/rmargin.js', 'src/css/var/rnumnonpx.js',
      'src/data.js', 'src/data/accepts.js', 'src/data/Data.js', 'src/data/var/data_priv.js', 'src/data/var/data_user.js',
      'src/deferred.js',
      'src/dimensions.js',
      'src/effects.js', 'src/effects/animatedSelector.js', 'src/effects/Tween.js',
      'src/event.js', 'src/event/alias.js', 'src/event/support.js',
      'src/intro.js',
      // Don't include this file--it eliminates lots of other funcs.
      // 'src/jquery.js',
      'src/manipulation.js', 'src/manipulation/_evalUrl.js', 'src/manipulation/support.js', 'src/manipulation/var/rcheckableType.js',
      'src/offset.js',
      'src/outro.js',
      'src/queue.js', 'src/queue/delay.js',
      'src/selector.js',
      'src/serialize.js',
      'src/traversing.js', 'src/traversing/findFilter.js', 'src/traversing/var/rneedsContext.js',
      'src/var/arr.js', 'src/var/class2type.js', 'src/var/concat.js', 'src/var/hasOwn.js', 'src/var/indexOf.js', 'src/var/pnum.js', 'src/var/push.js', 'src/var/rnotwhite.js', 'src/var/slice.js', 'src/var/strundefined.js', 'src/var/support.js', 'src/var/toString.js', 'src/var/trim.js',
      'src/wrap.js',
    ],
  },
];

function condense(args, opts, cb) {
  args.unshift(path.join(__dirname, 'node_modules/tern/bin/condense'));
  opts.maxBuffer = 1024*2000;
  execFile(process.execPath /* node */, args, opts, function(err, stdout, stderr) {
    if (stderr) console.error(stderr);
    if (err) cb(err);
    else cb(null, JSON.parse(stdout));
  });
}

function readJSONFile(file, cb) {
  fs.readFile(file, function(err, data) {
    if (err) cb(err);
    else cb(null, JSON.parse(data));
  });
}

tests.forEach(function(test) {
  describe(test.dir, function() {
    var dir = path.join(__dirname, test.dir);
    var concreteDefPathsFile = path.join(dir, test.wantConcreteDefPathsFile);
    if (fs.existsSync(concreteDefPathsFile)) {
      it('should produce concrete definition paths', function(done) {
        readJSONFile(concreteDefPathsFile, function(err, want) {
          assert.ifError(err);
          condense(test.condenseArgs, {cwd: path.join(dir, test.condenseDir)}, function(err, condensed) {
            assert.ifError(err);
            var got = Object.keys(condensed).filter(function(p) { return p != '!name' && /^\!?[^!]+$/.test(p); }).sort();
            if (process.env['DEBUG']) console.error(JSON.stringify(got, null, 2));
            if (process.env['EXP']) fs.writeFileSync(concreteDefPathsFile, JSON.stringify(got, null, 2));
            want.should.equal(got);
            done();
          });
        });
      });
    }
  });
});
