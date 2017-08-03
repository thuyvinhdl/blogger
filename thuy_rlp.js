! function() {
    var e = /\blang(?:uage)?-(?!\*)(\w+)\b/i,
        t = self.Prism = {
            languages: {
                insertBefore: function(e, a, n, r) {
                    r = r || t.languages;
                    var i = r[e],
                        s = {};
                    for (var g in i)
                        if (i.hasOwnProperty(g)) {
                            if (g == a)
                                for (var l in n) n.hasOwnProperty(l) && (s[l] = n[l]);
                            s[g] = i[g]
                        }
                    return r[e] = s
                },
                DFS: function(e, a) {
                    for (var n in e) a.call(e, n, e[n]), "[object Object]" === Object.prototype.toString.call(e) && t.languages.DFS(e[n], a)
                }
            },
            highlightAll: function(e, a) {
                for (var n, r = document.querySelectorAll('code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'), i = 0; n = r[i++];) t.highlightElement(n, e === !0, a)
            },
            highlightElement: function(n, r, i) {
                for (var s, g, l = n; l && !e.test(l.className);) l = l.parentNode;
                if (l && (s = (l.className.match(e) || [, ""])[1], g = t.languages[s]), g) {
                    n.className = n.className.replace(e, "").replace(/\s+/g, " ") + " language-" + s, l = n.parentNode, /pre/i.test(l.nodeName) && (l.className = l.className.replace(e, "").replace(/\s+/g, " ") + " language-" + s);
                    var o = n.textContent.trim();
                    if (o) {
                        o = o.replace(/&/g, "&").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\u00a0/g, " ");
                        var c = {
                            element: n,
                            language: s,
                            grammar: g,
                            code: o
                        };
                        if (t.hooks.run("before-highlight", c), r && self.Worker) {
                            var u = new Worker(t.filename);
                            u.onmessage = function(e) {
                                c.highlightedCode = a.stringify(JSON.parse(e.data)), c.element.innerHTML = c.highlightedCode, i && i.call(c.element), t.hooks.run("after-highlight", c)
                            }, u.postMessage(JSON.stringify({
                                language: c.language,
                                code: c.code
                            }))
                        } else c.highlightedCode = t.highlight(c.code, c.grammar), c.element.innerHTML = c.highlightedCode, i && i.call(n), t.hooks.run("after-highlight", c)
                    }
                }
            },
            highlight: function(e, n) {
                return a.stringify(t.tokenize(e, n))
            },
            tokenize: function(e, a) {
                var n = t.Token,
                    r = [e],
                    i = a.rest;
                if (i) {
                    for (var s in i) a[s] = i[s];
                    delete a.rest
                }
                e: for (var s in a)
                    if (a.hasOwnProperty(s) && a[s]) {
                        var g = a[s],
                            l = g.inside,
                            o = !!g.lookbehind || 0;
                        g = g.pattern || g;
                        for (var c = 0; c < r.length; c++) {
                            var u = r[c];
                            if (r.length > e.length) break e;
                            if (!(u instanceof n)) {
                                g.lastIndex = 0;
                                var p = g.exec(u);
                                if (p) {
                                    o && (o = p[1].length);
                                    var h = p.index - 1 + o,
                                        p = p[0].slice(o),
                                        d = p.length,
                                        f = h + d,
                                        m = u.slice(0, h + 1),
                                        b = u.slice(f + 1),
                                        y = [c, 1];
                                    m && y.push(m);
                                    var v = new n(s, l ? t.tokenize(p, l) : p);
                                    y.push(v), b && y.push(b), Array.prototype.splice.apply(r, y)
                                }
                            }
                        }
                    }
                return r
            },
            hooks: {
                all: {},
                add: function(e, a) {
                    var n = t.hooks.all;
                    n[e] = n[e] || [], n[e].push(a)
                },
                run: function(e, a) {
                    var n = t.hooks.all[e];
                    if (n && n.length)
                        for (var r, i = 0; r = n[i++];) r(a)
                }
            }
        },
        a = t.Token = function(e, t) {
            this.type = e, this.content = t
        };
    if (a.stringify = function(e) {
            if ("string" == typeof e) return e;
            if ("[object Array]" == Object.prototype.toString.call(e)) {
                for (var n = 0; n < e.length; n++) e[n] = a.stringify(e[n]);
                return e.join("")
            }
            var r = {
                type: e.type,
                content: a.stringify(e.content),
                tag: "span",
                classes: ["token", e.type],
                attributes: {}
            };
            "comment" == r.type && (r.attributes.spellcheck = "true"), t.hooks.run("wrap", r);
            var i = "";
            for (var s in r.attributes) i += s + '="' + (r.attributes[s] || "") + '"';
            return "<" + r.tag + ' class="' + r.classes.join(" ") + '" ' + i + ">" + r.content + "</" + r.tag + ">"
        }, !self.document) return void self.addEventListener("message", function(e) {
        var a = JSON.parse(e.data),
            n = a.language,
            r = a.code;
        self.postMessage(JSON.stringify(t.tokenize(r, t.languages[n]))), self.close()
    }, !1);
    var n = document.getElementsByTagName("script");
    n = n[n.length - 1], n && (t.filename = n.src, document.addEventListener && !n.hasAttribute("data-manual") && document.addEventListener("DOMContentLoaded", t.highlightAll))
}(), Prism.languages.markup = {
    comment: /&lt;!--[\w\W]*?--(&gt;|&gt;)/g,
    prolog: /&lt;\?.+?\?&gt;/,
    doctype: /&lt;!DOCTYPE.+?&gt;/,
    cdata: /&lt;!\[CDATA\[[\w\W]+?]]&gt;/i,
    tag: {
        pattern: /&lt;\/?[\w:-]+\s*[\w\W]*?&gt;/gi,
        inside: {
            tag: {
                pattern: /^&lt;\/?[\w:-]+/i,
                inside: {
                    punctuation: /^&lt;\/?/,
                    namespace: /^[\w-]+?:/
                }
            },
            "attr-value": {
                pattern: /=(('|")[\w\W]*?(\2)|[^\s>]+)/gi,
                inside: {
                    punctuation: /=/g
                }
            },
            punctuation: /\/?&gt;/g,
            "attr-name": {
                pattern: /[\w:-]+/g,
                inside: {
                    namespace: /^[\w-]+?:/
                }
            }
        }
    },
    entity: /&#?[\da-z]{1,8};/gi
}, Prism.hooks.add("wrap", function(e) {
    "entity" === e.type && (e.attributes.title = e.content.replace(/&/, "&"))
}), Prism.languages.css = {
    comment: /\/\*[\w\W]*?\*\//g,
    atrule: /@[\w-]+?(\s+.+)?(?=\s*{|\s*;)/gi,
    url: /url\((["']?).*?\1\)/gi,
    selector: /[^\{\}\s][^\{\}]*(?=\s*\{)/g,
    property: /(\b|\B)[a-z-]+(?=\s*:)/gi,
    string: /("|')(\\?.)*?\1/g,
    important: /\B!important\b/gi,
    ignore: /&(lt|gt|amp);/gi,
    punctuation: /[\{\};:]/g
}, Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    style: {
        pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/style(>|&gt;)/gi,
        inside: {
            tag: {
                pattern: /(&lt;|<)style[\w\W]*?(>|&gt;)|(&lt;|<)\/style(>|&gt;)/gi,
                inside: Prism.languages.markup.tag.inside
            },
            rest: Prism.languages.css
        }
    }
}), Prism.languages.javascript = {
    comment: {
        pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,
        lookbehind: !0
    },
    string: /("|')(\\?.)*?\1/g,
    regex: {
        pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
        lookbehind: !0
    },
    keyword: /\b(var|let|if|else|while|do|for|return|in|instanceof|function|new|with|typeof|try|catch|finally|null|break|continue)\b/g,
    "boolean": /\b(true|false)\b/g,
    number: /\b-?(0x)?\d*\.?\d+\b/g,
    operator: /[-+]{1,2}|!|=?&lt;|=?&gt;|={1,2}|(&){1,2}|\|?\||\?|\*|\//g,
    ignore: /&(lt|gt|amp);/gi,
    punctuation: /[{}[\];(),.:]/g
}, Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    script: {
        pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)[\w\W]*?(&lt;|<)\/script(>|&gt;)/gi,
        inside: {
            tag: {
                pattern: /(&lt;|<)script[\w\W]*?(>|&gt;)|(&lt;|<)\/script(>|&gt;)/gi,
                inside: Prism.languages.markup.tag.inside
            },
            rest: Prism.languages.javascript
        }
    }
}), Prism.languages.java = {
    comment: {
        pattern: /(^|[^\\])(\/\*[\w\W]*?\*\/|\/\/.*?(\r?\n|$))/g,
        lookbehind: !0
    },
    string: /("|')(\\?.)*?\1/g,
    keyword: /\b(abstract|continue|for|new|switch|assert|default|goto|package|synchronized|boolean|do|if|private|this|break|double|implements|protected|throw|byte|else|import|public|throws|case|enum|instanceof|return|transient|catch|extends|int|short|try|char|final|interface|static|void|class|finally|long|strictfp|volatile|const|float|native|super|while)\b/g,
    "boolean": /\b(true|false)\b/g,
    number: /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp\-]+\b|\b\d*\.?\d+[e]?[\d]*[df]\b|\W\d*\.?\d+\b/gi,
    operator: {
        pattern: /([^\.]|^)([-+]{1,2}|!|=?&lt;|=?&gt;|={1,2}|(&){1,2}|\|?\||\?|\*|\/|%|\^|(&lt;){2}|($gt;){2,3}|:|~)/g,
        lookbehind: !0
    },
    ignore: /&(lt|gt|amp);/gi,
    punctuation: /[{}[\];(),.:]/g
};
