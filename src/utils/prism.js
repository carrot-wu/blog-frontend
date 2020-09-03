/* PrismJS 1.17.1
https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript+docker+less+typescript+nginx+scss+jsx+tsx+regex&plugins=line-numbers+normalize-whitespace */
/* eslint-disable */
/* PrismJS 1.17.1
https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript+docker+less+typescript+nginx+scss+jsx+tsx+regex&plugins=highlight-keywords+normalize-whitespace */
var _self =
    'undefined' != typeof window
      ? window
      : 'undefined' != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
      ? self
      : {},
  Prism = (function (u) {
    var c = /\blang(?:uage)?-([\w-]+)\b/i,
      r = 0;
    var _ = {
      manual: u.Prism && u.Prism.manual,
      disableWorkerMessageHandler:
        u.Prism && u.Prism.disableWorkerMessageHandler,
      util: {
        encode: function (e) {
          return e instanceof L
            ? new L(e.type, _.util.encode(e.content), e.alias)
            : Array.isArray(e)
            ? e.map(_.util.encode)
            : e
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/\u00a0/g, ' ');
        },
        type: function (e) {
          return Object.prototype.toString.call(e).slice(8, -1);
        },
        objId: function (e) {
          return (
            e.__id || Object.defineProperty(e, '__id', { value: ++r }), e.__id
          );
        },
        clone: function n(e, t) {
          var a,
            r,
            i = _.util.type(e);
          switch (((t = t || {}), i)) {
            case 'Object':
              if (((r = _.util.objId(e)), t[r])) return t[r];
              for (var o in ((a = {}), (t[r] = a), e))
                e.hasOwnProperty(o) && (a[o] = n(e[o], t));
              return a;
            case 'Array':
              return (
                (r = _.util.objId(e)),
                t[r]
                  ? t[r]
                  : ((a = []),
                    (t[r] = a),
                    e.forEach(function (e, r) {
                      a[r] = n(e, t);
                    }),
                    a)
              );
            default:
              return e;
          }
        },
        currentScript: function () {
          if ('undefined' == typeof document) return null;
          if ('currentScript' in document) return document.currentScript;
          try {
            throw new Error();
          } catch (e) {
            var r = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1];
            if (r) {
              var n = document.getElementsByTagName('script');
              for (var t in n) if (n[t].src == r) return n[t];
            }
            return null;
          }
        }
      },
      languages: {
        extend: function (e, r) {
          var n = _.util.clone(_.languages[e]);
          for (var t in r) n[t] = r[t];
          return n;
        },
        insertBefore: function (n, e, r, t) {
          var a = (t = t || _.languages)[n],
            i = {};
          for (var o in a)
            if (a.hasOwnProperty(o)) {
              if (o == e) for (var l in r) r.hasOwnProperty(l) && (i[l] = r[l]);
              r.hasOwnProperty(o) || (i[o] = a[o]);
            }
          var s = t[n];
          return (
            (t[n] = i),
            _.languages.DFS(_.languages, function (e, r) {
              r === s && e != n && (this[e] = i);
            }),
            i
          );
        },
        DFS: function e(r, n, t, a) {
          a = a || {};
          var i = _.util.objId;
          for (var o in r)
            if (r.hasOwnProperty(o)) {
              n.call(r, o, r[o], t || o);
              var l = r[o],
                s = _.util.type(l);
              'Object' !== s || a[i(l)]
                ? 'Array' !== s || a[i(l)] || ((a[i(l)] = !0), e(l, n, o, a))
                : ((a[i(l)] = !0), e(l, n, null, a));
            }
        }
      },
      plugins: {},
      highlightAll: function (e, r) {
        _.highlightAllUnder(document, e, r);
      },
      highlightAllUnder: function (e, r, n) {
        var t = {
          callback: n,
          selector:
            'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
        };
        _.hooks.run('before-highlightall', t);
        for (var a, i = e.querySelectorAll(t.selector), o = 0; (a = i[o++]); )
          _.highlightElement(a, !0 === r, t.callback);
      },
      highlightElement: function (e, r, n) {
        var t = (function (e) {
            for (; e && !c.test(e.className); ) e = e.parentNode;
            return e
              ? (e.className.match(c) || [, 'none'])[1].toLowerCase()
              : 'none';
          })(e),
          a = _.languages[t];
        e.className =
          e.className.replace(c, '').replace(/\s+/g, ' ') + ' language-' + t;
        var i = e.parentNode;
        i &&
          'pre' === i.nodeName.toLowerCase() &&
          (i.className =
            i.className.replace(c, '').replace(/\s+/g, ' ') + ' language-' + t);
        var o = { element: e, language: t, grammar: a, code: e.textContent };
        function l(e) {
          (o.highlightedCode = e),
            _.hooks.run('before-insert', o),
            (o.element.innerHTML = o.highlightedCode),
            _.hooks.run('after-highlight', o),
            _.hooks.run('complete', o),
            n && n.call(o.element);
        }
        if ((_.hooks.run('before-sanity-check', o), !o.code))
          return _.hooks.run('complete', o), void (n && n.call(o.element));
        if ((_.hooks.run('before-highlight', o), o.grammar))
          if (r && u.Worker) {
            var s = new Worker(_.filename);
            (s.onmessage = function (e) {
              l(e.data);
            }),
              s.postMessage(
                JSON.stringify({
                  language: o.language,
                  code: o.code,
                  immediateClose: !0
                })
              );
          } else l(_.highlight(o.code, o.grammar, o.language));
        else l(_.util.encode(o.code));
      },
      highlight: function (e, r, n) {
        var t = { code: e, grammar: r, language: n };
        return (
          _.hooks.run('before-tokenize', t),
          (t.tokens = _.tokenize(t.code, t.grammar)),
          _.hooks.run('after-tokenize', t),
          L.stringify(_.util.encode(t.tokens), t.language)
        );
      },
      matchGrammar: function (e, r, n, t, a, i, o) {
        for (var l in n)
          if (n.hasOwnProperty(l) && n[l]) {
            var s = n[l];
            s = Array.isArray(s) ? s : [s];
            for (var u = 0; u < s.length; ++u) {
              if (o && o == l + ',' + u) return;
              var c = s[u],
                g = c.inside,
                f = !!c.lookbehind,
                d = !!c.greedy,
                h = 0,
                m = c.alias;
              if (d && !c.pattern.global) {
                var p = c.pattern.toString().match(/[imsuy]*$/)[0];
                c.pattern = RegExp(c.pattern.source, p + 'g');
              }
              c = c.pattern || c;
              for (var y = t, v = a; y < r.length; v += r[y].length, ++y) {
                var k = r[y];
                if (r.length > e.length) return;
                if (!(k instanceof L)) {
                  if (d && y != r.length - 1) {
                    if (((c.lastIndex = v), !(O = c.exec(e)))) break;
                    for (
                      var b = O.index + (f && O[1] ? O[1].length : 0),
                        w = O.index + O[0].length,
                        A = y,
                        P = v,
                        x = r.length;
                      A < x && (P < w || (!r[A].type && !r[A - 1].greedy));
                      ++A
                    )
                      (P += r[A].length) <= b && (++y, (v = P));
                    if (r[y] instanceof L) continue;
                    (S = A - y), (k = e.slice(v, P)), (O.index -= v);
                  } else {
                    c.lastIndex = 0;
                    var O = c.exec(k),
                      S = 1;
                  }
                  if (O) {
                    f && (h = O[1] ? O[1].length : 0);
                    w = (b = O.index + h) + (O = O[0].slice(h)).length;
                    var j = k.slice(0, b),
                      N = k.slice(w),
                      E = [y, S];
                    j && (++y, (v += j.length), E.push(j));
                    var C = new L(l, g ? _.tokenize(O, g) : O, m, O, d);
                    if (
                      (E.push(C),
                      N && E.push(N),
                      Array.prototype.splice.apply(r, E),
                      1 != S && _.matchGrammar(e, r, n, y, v, !0, l + ',' + u),
                      i)
                    )
                      break;
                  } else if (i) break;
                }
              }
            }
          }
      },
      tokenize: function (e, r) {
        var n = [e],
          t = r.rest;
        if (t) {
          for (var a in t) r[a] = t[a];
          delete r.rest;
        }
        return _.matchGrammar(e, n, r, 0, 0, !1), n;
      },
      hooks: {
        all: {},
        add: function (e, r) {
          var n = _.hooks.all;
          (n[e] = n[e] || []), n[e].push(r);
        },
        run: function (e, r) {
          var n = _.hooks.all[e];
          if (n && n.length) for (var t, a = 0; (t = n[a++]); ) t(r);
        }
      },
      Token: L
    };
    function L(e, r, n, t, a) {
      (this.type = e),
        (this.content = r),
        (this.alias = n),
        (this.length = 0 | (t || '').length),
        (this.greedy = !!a);
    }
    if (
      ((u.Prism = _),
      (L.stringify = function (e, r) {
        if ('string' == typeof e) return e;
        if (Array.isArray(e))
          return e
            .map(function (e) {
              return L.stringify(e, r);
            })
            .join('');
        var n = {
          type: e.type,
          content: L.stringify(e.content, r),
          tag: 'span',
          classes: ['token', e.type],
          attributes: {},
          language: r
        };
        if (e.alias) {
          var t = Array.isArray(e.alias) ? e.alias : [e.alias];
          Array.prototype.push.apply(n.classes, t);
        }
        _.hooks.run('wrap', n);
        var a = Object.keys(n.attributes)
          .map(function (e) {
            return (
              e + '="' + (n.attributes[e] || '').replace(/"/g, '&quot;') + '"'
            );
          })
          .join(' ');
        return (
          '<' +
          n.tag +
          ' class="' +
          n.classes.join(' ') +
          '"' +
          (a ? ' ' + a : '') +
          '>' +
          n.content +
          '</' +
          n.tag +
          '>'
        );
      }),
      !u.document)
    )
      return (
        u.addEventListener &&
          (_.disableWorkerMessageHandler ||
            u.addEventListener(
              'message',
              function (e) {
                var r = JSON.parse(e.data),
                  n = r.language,
                  t = r.code,
                  a = r.immediateClose;
                u.postMessage(_.highlight(t, _.languages[n], n)),
                  a && u.close();
              },
              !1
            )),
        _
      );
    var e = _.util.currentScript();
    if (
      (e &&
        ((_.filename = e.src),
        e.hasAttribute('data-manual') && (_.manual = !0)),
      !_.manual)
    ) {
      function n() {
        _.manual || _.highlightAll();
      }
      var t = document.readyState;
      'loading' === t || ('interactive' === t && e && e.defer)
        ? document.addEventListener('DOMContentLoaded', n)
        : window.requestAnimationFrame
        ? window.requestAnimationFrame(n)
        : window.setTimeout(n, 16);
    }
    return _;
  })(_self);
'undefined' != typeof module && module.exports && (module.exports = Prism),
  'undefined' != typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: {
    pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:(?!<!--)[^"'\]]|"[^"]*"|'[^']*'|<!--[\s\S]*?-->)*\]\s*)?>/i,
    greedy: !0
  },
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
    greedy: !0,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/i,
        inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ }
      },
      'attr-value': {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
        inside: {
          punctuation: [/^=/, { pattern: /^(\s*)["']|["']$/, lookbehind: !0 }]
        }
      },
      punctuation: /\/?>/,
      'attr-name': {
        pattern: /[^\s>\/]+/,
        inside: { namespace: /^[^\s>\/:]+:/ }
      }
    }
  },
  entity: /&#?[\da-z]{1,8};/i
}),
  (Prism.languages.markup.tag.inside['attr-value'].inside.entity =
    Prism.languages.markup.entity),
  Prism.hooks.add('wrap', function (a) {
    'entity' === a.type &&
      (a.attributes.title = a.content.replace(/&amp;/, '&'));
  }),
  Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
    value: function (a, e) {
      var s = {};
      (s['language-' + e] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: Prism.languages[e]
      }),
        (s.cdata = /^<!\[CDATA\[|\]\]>$/i);
      var n = {
        'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s }
      };
      n['language-' + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] };
      var t = {};
      (t[a] = {
        pattern: RegExp(
          '(<__[\\s\\S]*?>)(?:<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\s*|[\\s\\S])*?(?=<\\/__>)'.replace(
            /__/g,
            a
          ),
          'i'
        ),
        lookbehind: !0,
        greedy: !0,
        inside: n
      }),
        Prism.languages.insertBefore('markup', 'cdata', t);
    }
  }),
  (Prism.languages.xml = Prism.languages.extend('markup', {})),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup);
!(function (s) {
  var t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
  (s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
      inside: { rule: /@[\w-]+/ }
    },
    url: {
      pattern: RegExp('url\\((?:' + t.source + '|[^\n\r()]*)\\)', 'i'),
      inside: { function: /^url/i, punctuation: /^\(|\)$/ }
    },
    selector: RegExp('[^{}\\s](?:[^{};"\']|' + t.source + ')*?(?=\\s*\\{)'),
    string: { pattern: t, greedy: !0 },
    property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
    important: /!important\b/i,
    function: /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:,]/
  }),
    (s.languages.css.atrule.inside.rest = s.languages.css);
  var e = s.languages.markup;
  e &&
    (e.tag.addInlined('style', 'css'),
    s.languages.insertBefore(
      'inside',
      'attr-value',
      {
        'style-attr': {
          pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
          inside: {
            'attr-name': { pattern: /^\s*style/i, inside: e.tag.inside },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            'attr-value': { pattern: /.+/i, inside: s.languages.css }
          },
          alias: 'language-css'
        }
      },
      e.tag
    ));
})(Prism);
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0
  },
  'class-name': {
    pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ }
  },
  keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/
};
(Prism.languages.javascript = Prism.languages.extend('clike', {
  'class-name': [
    Prism.languages.clike['class-name'],
    {
      pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
      lookbehind: !0
    }
  ],
  keyword: [
    { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
    {
      pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0
    }
  ],
  number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
  function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  operator: /--|\+\+|\*\*=?|=>|&&|\|\||[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?[.?]?|[~:]/
})),
  (Prism.languages.javascript[
    'class-name'
  ][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore('javascript', 'keyword', {
    regex: {
      pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*(?:$|[\r\n,.;})\]]))/,
      lookbehind: !0,
      greedy: !0
    },
    'function-variable': {
      pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
      alias: 'function'
    },
    parameter: [
      {
        pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript
      },
      {
        pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
        inside: Prism.languages.javascript
      },
      {
        pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
      },
      {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
      }
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
  }),
  Prism.languages.insertBefore('javascript', 'string', {
    'template-string': {
      pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
      greedy: !0,
      inside: {
        'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
          lookbehind: !0,
          inside: {
            'interpolation-punctuation': {
              pattern: /^\${|}$/,
              alias: 'punctuation'
            },
            rest: Prism.languages.javascript
          }
        },
        string: /[\s\S]+/
      }
    }
  }),
  Prism.languages.markup &&
    Prism.languages.markup.tag.addInlined('script', 'javascript'),
  (Prism.languages.js = Prism.languages.javascript);
(Prism.languages.docker = {
  keyword: {
    pattern: /(^\s*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)/im,
    lookbehind: !0
  },
  string: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
  comment: /#.*/,
  punctuation: /---|\.\.\.|[:[\]{}\-,|>?]/
}),
  (Prism.languages.dockerfile = Prism.languages.docker);
(Prism.languages.less = Prism.languages.extend('css', {
  comment: [/\/\*[\s\S]*?\*\//, { pattern: /(^|[^\\])\/\/.*/, lookbehind: !0 }],
  atrule: {
    pattern: /@[\w-]+?(?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};])*?(?=\s*\{)/,
    inside: { punctuation: /[:()]/ }
  },
  selector: {
    pattern: /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@])*?(?=\s*\{)/,
    inside: { variable: /@+[\w-]+/ }
  },
  property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
  operator: /[+\-*\/]/
})),
  Prism.languages.insertBefore('less', 'property', {
    variable: [
      { pattern: /@[\w-]+\s*:/, inside: { punctuation: /:/ } },
      /@@?[\w-]+/
    ],
    'mixin-usage': {
      pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,
      lookbehind: !0,
      alias: 'function'
    }
  });
(Prism.languages.typescript = Prism.languages.extend('javascript', {
  keyword: /\b(?:abstract|as|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|undefined|var|void|while|with|yield)\b/,
  builtin: /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/
})),
  (Prism.languages.ts = Prism.languages.typescript);
(Prism.languages.nginx = Prism.languages.extend('clike', {
  comment: { pattern: /(^|[^"{\\])#.*/, lookbehind: !0 },
  keyword: /\b(?:CONTENT_|DOCUMENT_|GATEWAY_|HTTP_|HTTPS|if_not_empty|PATH_|QUERY_|REDIRECT_|REMOTE_|REQUEST_|SCGI|SCRIPT_|SERVER_|http|events|accept_mutex|accept_mutex_delay|access_log|add_after_body|add_before_body|add_header|addition_types|aio|alias|allow|ancient_browser|ancient_browser_value|auth|auth_basic|auth_basic_user_file|auth_http|auth_http_header|auth_http_timeout|autoindex|autoindex_exact_size|autoindex_localtime|break|charset|charset_map|charset_types|chunked_transfer_encoding|client_body_buffer_size|client_body_in_file_only|client_body_in_single_buffer|client_body_temp_path|client_body_timeout|client_header_buffer_size|client_header_timeout|client_max_body_size|connection_pool_size|create_full_put_path|daemon|dav_access|dav_methods|debug_connection|debug_points|default_type|deny|devpoll_changes|devpoll_events|directio|directio_alignment|disable_symlinks|empty_gif|env|epoll_events|error_log|error_page|expires|fastcgi_buffer_size|fastcgi_buffers|fastcgi_busy_buffers_size|fastcgi_cache|fastcgi_cache_bypass|fastcgi_cache_key|fastcgi_cache_lock|fastcgi_cache_lock_timeout|fastcgi_cache_methods|fastcgi_cache_min_uses|fastcgi_cache_path|fastcgi_cache_purge|fastcgi_cache_use_stale|fastcgi_cache_valid|fastcgi_connect_timeout|fastcgi_hide_header|fastcgi_ignore_client_abort|fastcgi_ignore_headers|fastcgi_index|fastcgi_intercept_errors|fastcgi_keep_conn|fastcgi_max_temp_file_size|fastcgi_next_upstream|fastcgi_no_cache|fastcgi_param|fastcgi_pass|fastcgi_pass_header|fastcgi_read_timeout|fastcgi_redirect_errors|fastcgi_send_timeout|fastcgi_split_path_info|fastcgi_store|fastcgi_store_access|fastcgi_temp_file_write_size|fastcgi_temp_path|flv|geo|geoip_city|geoip_country|google_perftools_profiles|gzip|gzip_buffers|gzip_comp_level|gzip_disable|gzip_http_version|gzip_min_length|gzip_proxied|gzip_static|gzip_types|gzip_vary|if|if_modified_since|ignore_invalid_headers|image_filter|image_filter_buffer|image_filter_jpeg_quality|image_filter_sharpen|image_filter_transparency|imap_capabilities|imap_client_buffer|include|index|internal|ip_hash|keepalive|keepalive_disable|keepalive_requests|keepalive_timeout|kqueue_changes|kqueue_events|large_client_header_buffers|limit_conn|limit_conn_log_level|limit_conn_zone|limit_except|limit_rate|limit_rate_after|limit_req|limit_req_log_level|limit_req_zone|limit_zone|lingering_close|lingering_time|lingering_timeout|listen|location|lock_file|log_format|log_format_combined|log_not_found|log_subrequest|map|map_hash_bucket_size|map_hash_max_size|master_process|max_ranges|memcached_buffer_size|memcached_connect_timeout|memcached_next_upstream|memcached_pass|memcached_read_timeout|memcached_send_timeout|merge_slashes|min_delete_depth|modern_browser|modern_browser_value|mp4|mp4_buffer_size|mp4_max_buffer_size|msie_padding|msie_refresh|multi_accept|open_file_cache|open_file_cache_errors|open_file_cache_min_uses|open_file_cache_valid|open_log_file_cache|optimize_server_names|override_charset|pcre_jit|perl|perl_modules|perl_require|perl_set|pid|pop3_auth|pop3_capabilities|port_in_redirect|post_action|postpone_output|protocol|proxy|proxy_buffer|proxy_buffer_size|proxy_buffering|proxy_buffers|proxy_busy_buffers_size|proxy_cache|proxy_cache_bypass|proxy_cache_key|proxy_cache_lock|proxy_cache_lock_timeout|proxy_cache_methods|proxy_cache_min_uses|proxy_cache_path|proxy_cache_use_stale|proxy_cache_valid|proxy_connect_timeout|proxy_cookie_domain|proxy_cookie_path|proxy_headers_hash_bucket_size|proxy_headers_hash_max_size|proxy_hide_header|proxy_http_version|proxy_ignore_client_abort|proxy_ignore_headers|proxy_intercept_errors|proxy_max_temp_file_size|proxy_method|proxy_next_upstream|proxy_no_cache|proxy_pass|proxy_pass_error_message|proxy_pass_header|proxy_pass_request_body|proxy_pass_request_headers|proxy_read_timeout|proxy_redirect|proxy_redirect_errors|proxy_send_lowat|proxy_send_timeout|proxy_set_body|proxy_set_header|proxy_ssl_session_reuse|proxy_store|proxy_store_access|proxy_temp_file_write_size|proxy_temp_path|proxy_timeout|proxy_upstream_fail_timeout|proxy_upstream_max_fails|random_index|read_ahead|real_ip_header|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver|resolver_timeout|return|rewrite|root|rtsig_overflow_events|rtsig_overflow_test|rtsig_overflow_threshold|rtsig_signo|satisfy|satisfy_any|secure_link_secret|send_lowat|send_timeout|sendfile|sendfile_max_chunk|server|server_name|server_name_in_redirect|server_names_hash_bucket_size|server_names_hash_max_size|server_tokens|set|set_real_ip_from|smtp_auth|smtp_capabilities|so_keepalive|source_charset|split_clients|ssi|ssi_silent_errors|ssi_types|ssi_value_length|ssl|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_client_certificate|ssl_crl|ssl_dhparam|ssl_engine|ssl_prefer_server_ciphers|ssl_protocols|ssl_session_cache|ssl_session_timeout|ssl_verify_client|ssl_verify_depth|starttls|stub_status|sub_filter|sub_filter_once|sub_filter_types|tcp_nodelay|tcp_nopush|timeout|timer_resolution|try_files|types|types_hash_bucket_size|types_hash_max_size|underscores_in_headers|uninitialized_variable_warn|upstream|use|user|userid|userid_domain|userid_expires|userid_name|userid_p3p|userid_path|userid_service|valid_referers|variables_hash_bucket_size|variables_hash_max_size|worker_connections|worker_cpu_affinity|worker_priority|worker_processes|worker_rlimit_core|worker_rlimit_nofile|worker_rlimit_sigpending|working_directory|xclient|xml_entities|xslt_entities|xslt_stylesheet|xslt_types|ssl_session_tickets|ssl_stapling|ssl_stapling_verify|ssl_ecdh_curve|ssl_trusted_certificate|more_set_headers|ssl_early_data)\b/i
})),
  Prism.languages.insertBefore('nginx', 'keyword', { variable: /\$[a-z_]+/i });
(Prism.languages.scss = Prism.languages.extend('css', {
  comment: { pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/, lookbehind: !0 },
  atrule: {
    pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
    inside: { rule: /@[\w-]+/ }
  },
  url: /(?:[-a-z]+-)?url(?=\()/i,
  selector: {
    pattern: /(?=\S)[^@;{}()]?(?:[^@;{}()]|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,
    inside: {
      parent: { pattern: /&/, alias: 'important' },
      placeholder: /%[-\w]+/,
      variable: /\$[-\w]+|#\{\$[-\w]+\}/
    }
  },
  property: {
    pattern: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/,
    inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ }
  }
})),
  Prism.languages.insertBefore('scss', 'atrule', {
    keyword: [
      /@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i,
      { pattern: /( +)(?:from|through)(?= )/, lookbehind: !0 }
    ]
  }),
  Prism.languages.insertBefore('scss', 'important', {
    variable: /\$[-\w]+|#\{\$[-\w]+\}/
  }),
  Prism.languages.insertBefore('scss', 'function', {
    placeholder: { pattern: /%[-\w]+/, alias: 'selector' },
    statement: { pattern: /\B!(?:default|optional)\b/i, alias: 'keyword' },
    boolean: /\b(?:true|false)\b/,
    null: { pattern: /\bnull\b/, alias: 'keyword' },
    operator: {
      pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
      lookbehind: !0
    }
  }),
  (Prism.languages.scss.atrule.inside.rest = Prism.languages.scss);
!(function (i) {
  var t = i.util.clone(i.languages.javascript);
  (i.languages.jsx = i.languages.extend('markup', t)),
    (i.languages.jsx.tag.pattern = /<\/?(?:[\w.:-]+\s*(?:\s+(?:[\w.:-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s{'">=]+|\{(?:\{(?:\{[^}]*\}|[^{}])*\}|[^{}])+\}))?|\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}))*\s*\/?)?>/i),
    (i.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/i),
    (i.languages.jsx.tag.inside[
      'attr-value'
    ].pattern = /=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i),
    (i.languages.jsx.tag.inside.tag.inside[
      'class-name'
    ] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/),
    i.languages.insertBefore(
      'inside',
      'attr-name',
      {
        spread: {
          pattern: /\{\.{3}[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\}/,
          inside: { punctuation: /\.{3}|[{}.]/, 'attr-value': /\w+/ }
        }
      },
      i.languages.jsx.tag
    ),
    i.languages.insertBefore(
      'inside',
      'attr-value',
      {
        script: {
          pattern: /=(?:\{(?:\{(?:\{[^}]*\}|[^}])*\}|[^}])+\})/i,
          inside: {
            'script-punctuation': { pattern: /^=(?={)/, alias: 'punctuation' },
            rest: i.languages.jsx
          },
          alias: 'language-javascript'
        }
      },
      i.languages.jsx.tag
    );
  var o = function (t) {
      return t
        ? 'string' == typeof t
          ? t
          : 'string' == typeof t.content
          ? t.content
          : t.content.map(o).join('')
        : '';
    },
    p = function (t) {
      for (var n = [], e = 0; e < t.length; e++) {
        var a = t[e],
          s = !1;
        if (
          ('string' != typeof a &&
            ('tag' === a.type && a.content[0] && 'tag' === a.content[0].type
              ? '</' === a.content[0].content[0].content
                ? 0 < n.length &&
                  n[n.length - 1].tagName === o(a.content[0].content[1]) &&
                  n.pop()
                : '/>' === a.content[a.content.length - 1].content ||
                  n.push({
                    tagName: o(a.content[0].content[1]),
                    openedBraces: 0
                  })
              : 0 < n.length && 'punctuation' === a.type && '{' === a.content
              ? n[n.length - 1].openedBraces++
              : 0 < n.length &&
                0 < n[n.length - 1].openedBraces &&
                'punctuation' === a.type &&
                '}' === a.content
              ? n[n.length - 1].openedBraces--
              : (s = !0)),
          (s || 'string' == typeof a) &&
            0 < n.length &&
            0 === n[n.length - 1].openedBraces)
        ) {
          var g = o(a);
          e < t.length - 1 &&
            ('string' == typeof t[e + 1] || 'plain-text' === t[e + 1].type) &&
            ((g += o(t[e + 1])), t.splice(e + 1, 1)),
            0 < e &&
              ('string' == typeof t[e - 1] || 'plain-text' === t[e - 1].type) &&
              ((g = o(t[e - 1]) + g), t.splice(e - 1, 1), e--),
            (t[e] = new i.Token('plain-text', g, null, g));
        }
        a.content && 'string' != typeof a.content && p(a.content);
      }
    };
  i.hooks.add('after-tokenize', function (t) {
    ('jsx' !== t.language && 'tsx' !== t.language) || p(t.tokens);
  });
})(Prism);
var typescript = Prism.util.clone(Prism.languages.typescript);
Prism.languages.tsx = Prism.languages.extend('jsx', typescript);
!(function (n) {
  var e = { pattern: /\\[\\(){}[\]^$+*?|.]/, alias: 'escape' },
    a = /\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|c[a-zA-Z]|0[0-7]{0,2}|[123][0-7]{2}|.)/,
    r = /\\[wsd]|\.|\\p{[^{}]+}/i,
    i = '(?:[^\\\\-]|' + a.source + ')',
    s = RegExp(i + '-' + i),
    t = { pattern: /(<|')[^<>']+(?=[>']$)/, lookbehind: !0, alias: 'variable' },
    c = [
      /\\(?![123][0-7]{2})[1-9]/,
      { pattern: /\\k<[^<>']+>/, inside: { 'group-name': t } }
    ];
  (n.languages.regex = {
    charset: {
      pattern: /((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/,
      lookbehind: !0,
      inside: {
        'charset-negation': { pattern: /(^\[)\^/, lookbehind: !0 },
        'charset-punctuation': /^\[|\]$/,
        range: { pattern: s, inside: { escape: a, 'range-punctuation': /-/ } },
        'special-escape': e,
        charclass: r,
        backreference: c,
        escape: a
      }
    },
    'special-escape': e,
    charclass: r,
    backreference: c,
    anchor: /[$^]|\\[ABbGZz]/,
    escape: a,
    group: [
      {
        pattern: /\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/,
        inside: { 'group-name': t }
      },
      /\)/
    ],
    quantifier: /[+*?]|\{(?:\d+,?\d*)\}/,
    alternation: /\|/
  }),
    [
      'actionscript',
      'coffescript',
      'flow',
      'javascript',
      'typescript',
      'vala'
    ].forEach(function (e) {
      var a = n.languages[e];
      a &&
        (a.regex.inside = {
          'regex-flags': /[a-z]+$/,
          'regex-delimiter': /^\/|\/$/,
          'language-regex': { pattern: /[\s\S]+/, inside: n.languages.regex }
        });
    });
})(Prism);
('undefined' != typeof self && !self.Prism) ||
  ('undefined' != typeof global && !global.Prism) ||
  Prism.hooks.add('wrap', function (e) {
    'keyword' === e.type && e.classes.push('keyword-' + e.content);
  });
!(function () {
  var i =
    Object.assign ||
    function (e, n) {
      for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t]);
      return e;
    };
  function e(e) {
    this.defaults = i({}, e);
  }
  function l(e) {
    for (var n = 0, t = 0; t < e.length; ++t)
      e.charCodeAt(t) == '\t'.charCodeAt(0) && (n += 3);
    return e.length + n;
  }
  (e.prototype = {
    setDefaults: function (e) {
      this.defaults = i(this.defaults, e);
    },
    normalize: function (e, n) {
      for (var t in (n = i(this.defaults, n))) {
        var r = t.replace(/-(\w)/g, function (e, n) {
          return n.toUpperCase();
        });
        'normalize' !== t &&
          'setDefaults' !== r &&
          n[t] &&
          this[r] &&
          (e = this[r].call(this, e, n[t]));
      }
      return e;
    },
    leftTrim: function (e) {
      return e.replace(/^\s+/, '');
    },
    rightTrim: function (e) {
      return e.replace(/\s+$/, '');
    },
    tabsToSpaces: function (e, n) {
      return (n = 0 | n || 4), e.replace(/\t/g, new Array(++n).join(' '));
    },
    spacesToTabs: function (e, n) {
      return (n = 0 | n || 4), e.replace(RegExp(' {' + n + '}', 'g'), '\t');
    },
    removeTrailing: function (e) {
      return e.replace(/\s*?$/gm, '');
    },
    removeInitialLineFeed: function (e) {
      return e.replace(/^(?:\r?\n|\r)/, '');
    },
    removeIndent: function (e) {
      var n = e.match(/^[^\S\n\r]*(?=\S)/gm);
      return n && n[0].length
        ? (n.sort(function (e, n) {
            return e.length - n.length;
          }),
          n[0].length ? e.replace(RegExp('^' + n[0], 'gm'), '') : e)
        : e;
    },
    indent: function (e, n) {
      return e.replace(/^[^\S\n\r]*(?=\S)/gm, new Array(++n).join('\t') + '$&');
    },
    breakLines: function (e, n) {
      n = !0 === n ? 80 : 0 | n || 80;
      for (var t = e.split('\n'), r = 0; r < t.length; ++r)
        if (!(l(t[r]) <= n)) {
          for (var i = t[r].split(/(\s+)/g), o = 0, a = 0; a < i.length; ++a) {
            var s = l(i[a]);
            n < (o += s) && ((i[a] = '\n' + i[a]), (o = s));
          }
          t[r] = i.join('');
        }
      return t.join('\n');
    }
  }),
    'undefined' != typeof module && module.exports && (module.exports = e),
    'undefined' != typeof Prism &&
      ((Prism.plugins.NormalizeWhitespace = new e({
        'remove-trailing': !0,
        'remove-indent': !0,
        'left-trim': !0,
        'right-trim': !0
      })),
      Prism.hooks.add('before-sanity-check', function (e) {
        var n = Prism.plugins.NormalizeWhitespace;
        if (!e.settings || !1 !== e.settings['whitespace-normalization'])
          if ((e.element && e.element.parentNode) || !e.code) {
            var t = e.element.parentNode,
              r = /(?:^|\s)no-whitespace-normalization(?:\s|$)/;
            if (
              e.code &&
              t &&
              'pre' === t.nodeName.toLowerCase() &&
              !r.test(t.className) &&
              !r.test(e.element.className)
            ) {
              for (
                var i = t.childNodes, o = '', a = '', s = !1, l = 0;
                l < i.length;
                ++l
              ) {
                var c = i[l];
                c == e.element
                  ? (s = !0)
                  : '#text' === c.nodeName &&
                    (s ? (a += c.nodeValue) : (o += c.nodeValue),
                    t.removeChild(c),
                    --l);
              }
              if (e.element.children.length && Prism.plugins.KeepMarkup) {
                var u = o + e.element.innerHTML + a;
                (e.element.innerHTML = n.normalize(u, e.settings)),
                  (e.code = e.element.textContent);
              } else
                (e.code = o + e.code + a),
                  (e.code = n.normalize(e.code, e.settings));
            }
          } else e.code = n.normalize(e.code, e.settings);
      }));
})();
