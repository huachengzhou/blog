/** 2.7.6 | MIT Licensed */
;!(function (d) {
  'use strict'
  var t; var h = d.document; var m = { modules: {}, status: {}, timeout: 10, event: {} }; var r = function () {
    this.v = '2.7.6'
  }; var e = d.LAYUI_GLOBAL || {}; var v = (t = h.currentScript ? h.currentScript.src : (function () {
    for (var t, e = h.scripts, o = e.length - 1, r = o; r > 0; r--) {
      if (e[r].readyState === 'interactive') {
        t = e[r].src
        break
      }
    }
    return t || e[o].src
  }()), m.dir = e.dir || t.substring(0, t.lastIndexOf('/') + 1)); var g = function (t, e) {
    e = e || 'log', d.console && console[e] && console[e]('layui error hint: ' + t)
  }; var b = typeof opera !== 'undefined' && opera.toString() === '[object Opera]'; var N = m.builtin = {
    lay: 'lay',
    layer: 'layer',
    laydate: 'laydate',
    laypage: 'laypage',
    laytpl: 'laytpl',
    layedit: 'layedit',
    form: 'form',
    upload: 'upload',
    dropdown: 'dropdown',
    transfer: 'transfer',
    tree: 'tree',
    table: 'table',
    element: 'element',
    rate: 'rate',
    colorpicker: 'colorpicker',
    slider: 'slider',
    carousel: 'carousel',
    flow: 'flow',
    util: 'util',
    code: 'code',
    jquery: 'jquery',
    all: 'all',
    'layui.all': 'layui.all'
  }; var s = (r.prototype.cache = m, r.prototype.define = function (t, r) {
    return typeof t === 'function' && (r = t, t = []), this.use(t, function () {
      var o = function (t, e) {
        layui[t] = e, m.status[t] = !0
      }
      return typeof r === 'function' && r(function (t, e) {
        o(t, e), m.callback[t] = function () {
          r(o)
        }
      }), this
    }, null, 'define'), this
  }, r.prototype.use = function (o, t, e, r) {
    var n = this; var i = m.dir = m.dir || v; var a = h.getElementsByTagName('head')[0]
    var u = (o = typeof o === 'string' ? [o] : typeof o === 'function' ? (t = o, ['all']) : o, d.jQuery && jQuery.fn.on && (n.each(o, function (t, e) {
      e === 'jquery' && o.splice(t, 1)
    }), layui.jquery = layui.$ = jQuery), o[0]); var l = 0

    function s (t, e) {
      var o = navigator.platform === 'PLaySTATION 3' ? /^complete$/ : /^(complete|loaded)$/
      t.type !== 'load' && !o.test((t.currentTarget || t.srcElement).readyState) || (m.modules[u] = e, a.removeChild(p), (function r () {
        return ++l > 1e3 * m.timeout / 4 ? g(u + ' is not a valid module', 'error') : void (m.status[u] ? c() : setTimeout(r, 4))
      }()))
    }

    function c () {
      e.push(layui[u]), o.length > 1 ? n.use(o.slice(1), t, e, r) : typeof t === 'function' && (layui.jquery && typeof layui.jquery === 'function' && r !== 'define' ? layui.jquery(function () {
        t.apply(layui, e)
      }) : t.apply(layui, e))
    }

    if (e = e || [], m.host = m.host || (i.match(/\/\/([\s\S]+?)\//) || ['//' + location.host + '/'])[0], o.length === 0 || layui['layui.all'] && N[u]) return c(), n
    var p
    var y = (y = (N[u] ? i + 'modules/' : !/^\{\/\}/.test(n.modules[u]) && m.base || '') + (n.modules[u] || u) + '.js').replace(/^\{\/\}/, '')
    return !m.modules[u] && layui[u] && (m.modules[u] = y), m.modules[u] ? (function f () {
      return ++l > 1e3 * m.timeout / 4 ? g(u + ' is not a valid module', 'error') : void (typeof m.modules[u] === 'string' && m.status[u] ? c() : setTimeout(f, 4))
    }()) : ((p = h.createElement('script')).async = !0, p.charset = 'utf-8', p.src = y + ((i = !0 === m.version ? m.v || (new Date()).getTime() : m.version || '') ? '?v=' + i : ''), a.appendChild(p), !p.attachEvent || p.attachEvent.toString && p.attachEvent.toString().indexOf('[native code') < 0 || b ? p.addEventListener('load', function (t) {
      s(t, y)
    }, !1) : p.attachEvent('onreadystatechange', function (t) {
      s(t, y)
    }), m.modules[u] = y), n
  }, r.prototype.disuse = function (t) {
    var o = this
    return t = o.isArray(t) ? t : [t], o.each(t, function (t, e) {
      m.status[e], delete o[e], delete N[e], delete o.modules[e], delete m.status[e], delete m.modules[e]
    }), o
  }, r.prototype.getStyle = function (t, e) {
    t = t.currentStyle || d.getComputedStyle(t, null)
    return t[t.getPropertyValue ? 'getPropertyValue' : 'getAttribute'](e)
  }, r.prototype.link = function (o, r, t) {
    var n = this; var e = h.getElementsByTagName('head')[0]; var i = h.createElement('link')
    var t = ((t = typeof r === 'string' ? r : t) || o).replace(/\.|\//g, ''); var a = i.id = 'layuicss-' + t
    var u = 'creating'; var l = 0
    return i.rel = 'stylesheet', i.href = o + (m.debug ? '?v=' + (new Date()).getTime() : ''), i.media = 'all', h.getElementById(a) || e.appendChild(i), typeof r !== 'function' || (function s (t) {
      var e = h.getElementById(a)
      return ++l > 1e3 * m.timeout / 100 ? g(o + ' timeout') : void (parseInt(n.getStyle(e, 'width')) === 1989 ? (t === u && e.removeAttribute('lay-status'), e.getAttribute('lay-status') === u ? setTimeout(s, 100) : r()) : (e.setAttribute('lay-status', u), setTimeout(function () {
        s(u)
      }, 100)))
    }()), n
  }, r.prototype.addcss = function (t, e, o) {
    return layui.link(m.dir + 'css/' + t, e, o)
  }, m.callback = {}, r.prototype.factory = function (t) {
    if (layui[t]) return typeof m.callback[t] === 'function' ? m.callback[t] : null
  }, r.prototype.img = function (t, e, o) {
    var r = new Image()
    if (r.src = t, r.complete) return e(r)
    r.onload = function () {
      r.onload = null, typeof e === 'function' && e(r)
    }, r.onerror = function (t) {
      r.onerror = null, typeof o === 'function' && o(t)
    }
  }, r.prototype.config = function (t) {
    for (var e in t = t || {}) m[e] = t[e]
    return this
  }, r.prototype.modules = (function () {
    var t; var e = {}
    for (t in N) e[t] = N[t]
    return e
  }()), r.prototype.extend = function (t) {
    for (var e in t = t || {}) this[e] || this.modules[e] ? g(e + ' Module already exists', 'error') : this.modules[e] = t[e]
    return this
  }, r.prototype.router = r.prototype.hash = function (t) {
    var o = { path: [], search: {}, hash: ((t = t || location.hash).match(/[^#](#.*$)/) || [])[1] || '' }
    return /^#\//.test(t) && (t = t.replace(/^#\//, ''), o.href = '/' + t, t = t.replace(/([^#])(#.*$)/, '$1').split('/') || [], this.each(t, function (t, e) {
      /^\w+=/.test(e) ? (e = e.split('='), o.search[e[0]] = e[1]) : o.path.push(e)
    })), o
  }, r.prototype.url = function (t) {
    var n; var e; var o = this
    return {
      pathname: (t ? ((t.match(/\.[^.]+?\/.+/) || [])[0] || '').replace(/^[^\/]+/, '').replace(/\?.+/, '') : location.pathname).replace(/^\//, '').split('/'),
      search: (n = {}, e = (t ? ((t.match(/\?.+/) || [])[0] || '').replace(/\#.+/, '') : location.search).replace(/^\?+/, '').split('&'), o.each(e, function (t, e) {
        var o = e.indexOf('='); var r = o < 0 ? e.substr(0, e.length) : o !== 0 && e.substr(0, o)
        r && (n[r] = o > 0 ? e.substr(o + 1) : null)
      }), n),
      hash: o.router(t ? (t.match(/#.+/) || [])[0] || '/' : location.hash)
    }
  }, r.prototype.data = function (t, e, o) {
    if (t = t || 'layui', o = o || localStorage, d.JSON && d.JSON.parse) {
      if (e === null) return delete o[t]
      e = typeof e === 'object' ? e : { key: e }
      try {
        var r = JSON.parse(o[t])
      } catch (n) {
        r = {}
      }
      return 'value' in e && (r[e.key] = e.value), e.remove && delete r[e.key], o[t] = JSON.stringify(r), e.key ? r[e.key] : r
    }
  }, r.prototype.sessionData = function (t, e) {
    return this.data(t, e, sessionStorage)
  }, r.prototype.device = function (t) {
    var o = navigator.userAgent.toLowerCase(); var e = function (t) {
      var e = new RegExp(t + '/([^\\s\\_\\-]+)')
      return (t = (o.match(e) || [])[1]) || !1
    }; var r = {
      os: /windows/.test(o) ? 'windows' : /linux/.test(o) ? 'linux' : /iphone|ipod|ipad|ios/.test(o) ? 'ios' : /mac/.test(o) ? 'mac' : void 0,
      ie: !!(d.ActiveXObject || 'ActiveXObject' in d) && ((o.match(/msie\s(\d+)/) || [])[1] || '11'),
      weixin: e('micromessenger')
    }
    return t && !r[t] && (r[t] = e(t)), r.android = /android/.test(o), r.ios = r.os === 'ios', r.mobile = !(!r.android && !r.ios), r
  }, r.prototype.hint = function () {
    return { error: g }
  }, r.prototype._typeof = r.prototype.type = function (t) {
    return t === null ? String(t) : typeof t === 'object' || typeof t === 'function' ? (e = (e = Object.prototype.toString.call(t).match(/\s(.+)\]$/) || [])[1] || 'Object', new RegExp('\\b(Function|Array|Date|RegExp|Object|Error|Symbol)\\b').test(e) ? e.toLowerCase() : 'object') : typeof t
    var e
  }, r.prototype._isArray = r.prototype.isArray = function (t) {
    var e; var o = this.type(t)
    return !(!t || typeof t !== 'object' || t === d) && (e = 'length' in t && t.length, o === 'array' || e === 0 || typeof e === 'number' && e > 0 && e - 1 in t)
  }, r.prototype.each = function (t, o) {
    var e; var r = function (t, e) {
      return o.call(e[t], t, e[t])
    }
    if (typeof o !== 'function') return this
    if (this.isArray(t = t || [])) for (e = 0; e < t.length && !r(e, t); e++) ; else for (e in t) if (r(e, t)) break
    return this
  }, r.prototype.sort = function (t, n, e) {
    var o = JSON.parse(JSON.stringify(t || []))
    return this.type(t) !== 'object' || n ? typeof t !== 'object' ? [o] : (o.sort(function (t, e) {
      var o = t[n]; var r = e[n]
      if (!isNaN(t) && !isNaN(e)) return t - e
      if (!isNaN(t) && isNaN(e)) {
        if (!n || typeof e !== 'object') return -1
        o = t
      } else if (isNaN(t) && !isNaN(e)) {
        if (!n || typeof t !== 'object') return 1
        r = e
      }
      t = [!isNaN(o), !isNaN(r)]
      return t[0] && t[1] ? o && !r && r !== 0 ? 1 : !o && o !== 0 && r ? -1 : o - r : t[0] || t[1] ? t[0] || !t[1] ? -1 : !t[0] || t[1] ? 1 : void 0 : r < o ? 1 : o < r ? -1 : 0
    }), e && o.reverse(), o) : o
  }, r.prototype.stope = function (t) {
    t = t || d.event
    try {
      t.stopPropagation()
    } catch (e) {
      t.cancelBubble = !0
    }
  }, 'LAYUI-EVENT-REMOVE')
  r.prototype.onevent = function (t, e, o) {
    return typeof t !== 'string' || typeof o !== 'function' ? this : r.event(t, e, null, o)
  }, r.prototype.event = r.event = function (t, e, o, r) {
    var n = this; var i = null; var a = (e || '').match(/\((.*)\)$/) || []; var t = (t + '.' + e).replace(a[0], '')
    var u = a[1] || ''; var l = function (t, e) {
      !1 === (e && e.call(n, o)) && i === null && (i = !1)
    }
    return o === s ? (delete (n.cache.event[t] || {})[u], n) : r ? (m.event[t] = m.event[t] || {}, m.event[t][u] = [r], this) : (layui.each(m.event[t], function (t, e) {
      u === '{*}' ? layui.each(e, l) : (t === '' && layui.each(e, l), u && t === u && layui.each(e, l))
    }), i)
  }, r.prototype.on = function (t, e, o) {
    return this.onevent.call(this, e, t, o)
  }, r.prototype.off = function (t, e) {
    return this.event.call(this, e, t, s)
  }, d.layui = new r()
}(window))
layui.define(function (a) {
  var i = layui.cache
  layui.config({ dir: i.dir.replace(/lay\/dest\/$/, '') }), a('layui.all', layui.v)
})
!(function (l) {
  'use strict'
  var t; var f = l.document; var h = function (t) {
    return new i(t)
  }; var i = function (t) {
    for (var e = 0, n = typeof t === 'object' ? [t] : (this.selector = t, f.querySelectorAll(t || null)); e < n.length; e++) this.push(n[e])
  };
  (i.prototype = []).constructor = i, h.extend = function () {
    var t; var e = 1; var n = arguments; var o = function (t, e) {
      for (var n in t = t || (layui.type(e) === 'array' ? [] : {}), e) t[n] = e[n] && e[n].constructor === Object ? o(t[n], e[n]) : e[n]
      return t
    }
    for (n[0] = typeof n[0] === 'object' ? n[0] : {}, t = n.length; e < t; e++) typeof n[e] === 'object' && o(n[0], n[e])
    return n[0]
  }, h.v = '1.0.8', h.ie = (t = navigator.userAgent.toLowerCase(), !!(l.ActiveXObject || 'ActiveXObject' in l) && ((t.match(/msie\s(\d+)/) || [])[1] || '11')), h.layui = layui || {}, h.getPath = layui.cache.dir, h.stope = layui.stope, h.each = function () {
    return layui.each.apply(layui, arguments), this
  }, h.digit = function (t, e) {
    if (typeof t !== 'string' && typeof t !== 'number') return ''
    var n = ''
    e = e || 2
    for (var o = (t = String(t)).length; o < e; o++) n += '0'
    return t < Math.pow(10, e) ? n + t : t
  }, h.elem = function (t, e) {
    var n = f.createElement(t)
    return h.each(e || {}, function (t, e) {
      n.setAttribute(t, e)
    }), n
  }, h.hasScrollbar = function () {
    return f.body.scrollHeight > (l.innerHeight || f.documentElement.clientHeight)
  }, h.position = function (t, e, n) {
    var o, i, r, c, u, a, s
    e && (n = n || {}, t !== f && t !== h('body')[0] || (n.clickType = 'right'), u = n.clickType === 'right' ? {
      left: (u = n.e || l.event || {}).clientX,
      top: u.clientY,
      right: u.clientX,
      bottom: u.clientY
    } : t.getBoundingClientRect(), a = e.offsetWidth, s = e.offsetHeight, o = function (t) {
      return f.body[t = t ? 'scrollLeft' : 'scrollTop'] | f.documentElement[t]
    }, r = u.left, c = u.bottom, n.align === 'center' ? r -= (a - t.offsetWidth) / 2 : n.align === 'right' && (r = r - a + t.offsetWidth), (r = r + a + 5 > (i = function (t) {
      return f.documentElement[t ? 'clientWidth' : 'clientHeight']
    })('width') ? i('width') - a - 5 : r) < 5 && (r = 5), c + s + 5 > i() && (u.top > s + 5 ? c = u.top - s - 10 : n.clickType === 'right' ? (c = i() - s - 10) < 0 && (c = 0) : c = 5), (a = n.position) && (e.style.position = a), e.style.left = r + (a === 'fixed' ? 0 : o(1)) + 'px', e.style.top = c + (a === 'fixed' ? 0 : o()) + 'px', h.hasScrollbar() || (s = e.getBoundingClientRect(), !n.SYSTEM_RELOAD && s.bottom + 5 > i() && (n.SYSTEM_RELOAD = !0, setTimeout(function () {
      h.position(t, e, n)
    }, 50))))
  }, h.options = function (t, e) {
    t = h(t), e = e || 'lay-options'
    try {
      return new Function('return ' + (t.attr(e) || '{}'))()
    } catch (n) {
      return hint.error('parseerror\uff1a' + n, 'error'), {}
    }
  }, h.isTopElem = function (n) {
    var t = [f, h('body')[0]]; var o = !1
    return h.each(t, function (t, e) {
      if (e === n) return o = !0
    }), o
  }, i.addStr = function (n, t) {
    return n = n.replace(/\s+/, ' '), t = t.replace(/\s+/, ' ').split(' '), h.each(t, function (t, e) {
      new RegExp('\\b' + e + '\\b').test(n) || (n = n + ' ' + e)
    }), n.replace(/^\s|\s$/, '')
  }, i.removeStr = function (n, t) {
    return n = n.replace(/\s+/, ' '), t = t.replace(/\s+/, ' ').split(' '), h.each(t, function (t, e) {
      e = new RegExp('\\b' + e + '\\b')
      e.test(n) && (n = n.replace(e, ''))
    }), n.replace(/\s+/, ' ').replace(/^\s|\s$/, '')
  }, i.prototype.find = function (o) {
    var i = this; var r = 0; var c = []; var u = typeof o === 'object'
    return this.each(function (t, e) {
      for (var n = u ? e.contains(o) : e.querySelectorAll(o || null); r < n.length; r++) c.push(n[r])
      i.shift()
    }), u || (i.selector = (i.selector ? i.selector + ' ' : '') + o), h.each(c, function (t, e) {
      i.push(e)
    }), i
  }, i.prototype.each = function (t) {
    return h.each.call(this, this, t)
  }, i.prototype.addClass = function (n, o) {
    return this.each(function (t, e) {
      e.className = i[o ? 'removeStr' : 'addStr'](e.className, n)
    })
  }, i.prototype.removeClass = function (t) {
    return this.addClass(t, !0)
  }, i.prototype.hasClass = function (n) {
    var o = !1
    return this.each(function (t, e) {
      new RegExp('\\b' + n + '\\b').test(e.className) && (o = !0)
    }), o
  }, i.prototype.css = function (e, o) {
    var t = this; var i = function (t) {
      return isNaN(t) ? t : t + 'px'
    }
    return typeof e !== 'string' || o !== undefined ? t.each(function (t, n) {
      typeof e === 'object' ? h.each(e, function (t, e) {
        n.style[t] = i(e)
      }) : n.style[e] = i(o)
    }) : t.length > 0 ? t[0].style[e] : void 0
  }, i.prototype.width = function (n) {
    var o = this
    return n !== undefined ? o.each(function (t, e) {
      o.css('width', n)
    }) : o.length > 0 ? o[0].offsetWidth : void 0
  }, i.prototype.height = function (n) {
    var o = this
    return n !== undefined ? o.each(function (t, e) {
      o.css('height', n)
    }) : o.length > 0 ? o[0].offsetHeight : void 0
  }, i.prototype.attr = function (n, o) {
    var t = this
    return o !== undefined ? t.each(function (t, e) {
      e.setAttribute(n, o)
    }) : t.length > 0 ? t[0].getAttribute(n) : void 0
  }, i.prototype.removeAttr = function (n) {
    return this.each(function (t, e) {
      e.removeAttribute(n)
    })
  }, i.prototype.html = function (n) {
    var t = this
    return n !== undefined ? this.each(function (t, e) {
      e.innerHTML = n
    }) : t.length > 0 ? t[0].innerHTML : void 0
  }, i.prototype.val = function (n) {
    var t = this
    return n !== undefined ? this.each(function (t, e) {
      e.value = n
    }) : t.length > 0 ? t[0].value : void 0
  }, i.prototype.append = function (n) {
    return this.each(function (t, e) {
      typeof n === 'object' ? e.appendChild(n) : e.innerHTML = e.innerHTML + n
    })
  }, i.prototype.remove = function (n) {
    return this.each(function (t, e) {
      n ? e.removeChild(n) : e.parentNode.removeChild(e)
    })
  }, i.prototype.on = function (n, o) {
    return this.each(function (t, e) {
      e.attachEvent ? e.attachEvent('on' + n, function (t) {
        t.target = t.srcElement, o.call(e, t)
      }) : e.addEventListener(n, o, !1)
    })
  }, i.prototype.off = function (n, o) {
    return this.each(function (t, e) {
      e.detachEvent ? e.detachEvent('on' + n, o) : e.removeEventListener(n, o, !1)
    })
  }, l.lay = h, l.layui && layui.define && layui.define(function (t) {
    t('lay', h)
  })
}(window, window.document))
layui.define(function (e) {
  'use strict'
  var p = { open: '{{', close: '}}' }; var a = {
    exp: function (e) {
      return new RegExp(e, 'g')
    },
    query: function (e, r, n) {
      return l((r || '') + p.open + ['#([\\s\\S])+?', '([^{#}])*?'][e || 0] + p.close + (n || ''))
    },
    escape: function (e) {
      return e === undefined || e === null ? '' : /[<"'>]|&(?=#[a-zA-Z0-9]+)/g.test(e += '') ? e.replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;') : e
    },
    error: function (e, r) {
      var n = 'Laytpl Error: '
      return typeof console === 'object' && console.error(n + e + '\n' + (r || '')), n + e
    }
  }; var l = a.exp; var r = function (e) {
    this.tpl = e
  }; var n = (r.pt = r.prototype, window.errors = 0, r.pt.parse = function (e, r) {
    var n = e; var c = l('^' + p.open + '#', ''); var t = l(p.close + '$', '')
    e = '"use strict";var view = "' + (e = e.replace(/\s+|\r|\t|\n/g, ' ').replace(l(p.open + '#'), p.open + '# ').replace(l(p.close + '}'), '} ' + p.close).replace(/\\/g, '\\\\').replace(l(p.open + '!(.+?)!' + p.close), function (e) {
      return e = e.replace(l('^' + p.open + '!'), '').replace(l('!' + p.close), '').replace(l(p.open + '|' + p.close), function (e) {
        return e.replace(/(.)/g, '\\$1')
      })
    }).replace(/(?="|')/g, '\\').replace(a.query(), function (e) {
      return '";' + (e = e.replace(c, '').replace(t, '')).replace(/\\(.)/g, '$1') + ';view+="'
    }).replace(a.query(1), function (e) {
      var r = '"+laytpl.escape('
      return e.replace(/\s/g, '') === p.open + p.close ? '' : (e = e.replace(l(p.open + '|' + p.close), ''), /^=/.test(e) ? e = e.replace(/^=/, '') : /^-/.test(e) && (e = e.replace(/^-/, ''), r = '"+('), r + e.replace(/\\(.)/g, '$1') + ')+"')
    })) + '";return view;'
    try {
      return this.cache = e = new Function('d, laytpl', e), e(r, a)
    } catch (o) {
      return delete this.cache, a.error(o, n)
    }
  }, r.pt.render = function (e, r) {
    var n = this
    return e ? (e = n.cache ? n.cache(e, a) : n.parse(n.tpl, e), r ? void r(e) : e) : a.error('no data')
  }, function (e) {
    return typeof e !== 'string' ? a.error('Template not found') : new r(e)
  })
  n.config = function (e) {
    for (var r in e = e || {}) p[r] = e[r]
  }, n.v = '1.2.0', e('laytpl', n)
})
layui.define(function (e) {
  'use strict'
  var n = document; var u = 'getElementById'; var c = 'getElementsByTagName'; var a = 'layui-disabled'; var t = function (e) {
    var a = this
    a.config = e || {}, a.config.index = ++o.index, a.render(!0)
  }; var o = (t.prototype.type = function () {
    var e = this.config
    if (typeof e.elem === 'object') return e.elem.length === undefined ? 2 : 3
  }, t.prototype.view = function () {
    var t; var i; var r = this.config; var n = r.groups = 'groups' in r ? Number(r.groups) || 0 : 5
    var u = (r.layout = typeof r.layout === 'object' ? r.layout : ['prev', 'page', 'next'], r.count = Number(r.count) || 0, r.curr = Number(r.curr) || 1, r.limits = typeof r.limits === 'object' ? r.limits : [10, 20, 30, 40, 50], r.limit = Number(r.limit) || 10, r.pages = Math.ceil(r.count / r.limit) || 1, r.curr > r.pages ? r.curr = r.pages : r.curr < 1 && (r.curr = 1), n < 0 ? n = 1 : n > r.pages && (n = r.pages), r.prev = 'prev' in r ? r.prev : '&#x4E0A;&#x4E00;&#x9875;', r.next = 'next' in r ? r.next : '&#x4E0B;&#x4E00;&#x9875;', r.pages > n ? Math.ceil((r.curr + (n > 1 ? 1 : 0)) / (n > 0 ? n : 1)) : 1)
    var s = {
      prev: r.prev ? '<a href="javascript:;" class="layui-laypage-prev' + (r.curr == 1 ? ' ' + a : '') + '" data-page="' + (r.curr - 1) + '">' + r.prev + '</a>' : '',
      page: (function () {
        var e = []
        if (r.count < 1) return ''
        u > 1 && !1 !== r.first && n !== 0 && e.push('<a href="javascript:;" class="layui-laypage-first" data-page="1"  title="&#x9996;&#x9875;">' + (r.first || 1) + '</a>')
        var a = Math.floor((n - 1) / 2); var t = u > 1 ? r.curr - a : 1
        var i = u > 1 ? (a = r.curr + (n - a - 1)) > r.pages ? r.pages : a : n
        for (i - t < n - 1 && (t = i - n + 1), !1 !== r.first && t > 2 && e.push('<span class="layui-laypage-spr">&#x2026;</span>'); t <= i; t++) t === r.curr ? e.push('<span class="layui-laypage-curr"><em class="layui-laypage-em" ' + (/^#/.test(r.theme) ? 'style="background-color:' + r.theme + ';"' : '') + '></em><em>' + t + '</em></span>') : e.push('<a href="javascript:;" data-page="' + t + '">' + t + '</a>')
        return r.pages > n && r.pages > i && !1 !== r.last && (i + 1 < r.pages && e.push('<span class="layui-laypage-spr">&#x2026;</span>'), n !== 0 && e.push('<a href="javascript:;" class="layui-laypage-last" title="&#x5C3E;&#x9875;"  data-page="' + r.pages + '">' + (r.last || r.pages) + '</a>')), e.join('')
      }()),
      next: r.next ? '<a href="javascript:;" class="layui-laypage-next' + (r.curr == r.pages ? ' ' + a : '') + '" data-page="' + (r.curr + 1) + '">' + r.next + '</a>' : '',
      count: '<span class="layui-laypage-count">\u5171 ' + r.count + ' \u6761</span>',
      limit: (t = ['<span class="layui-laypage-limits"><select lay-ignore>'], layui.each(r.limits, function (e, a) {
        t.push('<option value="' + a + '"' + (a === r.limit ? 'selected' : '') + '>' + a + ' \u6761/\u9875</option>')
      }), t.join('') + '</select></span>'),
      refresh: ['<a href="javascript:;" data-page="' + r.curr + '" class="layui-laypage-refresh">', '<i class="layui-icon layui-icon-refresh"></i>', '</a>'].join(''),
      skip: ['<span class="layui-laypage-skip">&#x5230;&#x7B2C;', '<input type="text" min="1" value="' + r.curr + '" class="layui-input">', '&#x9875;<button type="button" class="layui-laypage-btn">&#x786e;&#x5b9a;</button>', '</span>'].join('')
    }
    return ['<div class="layui-box layui-laypage layui-laypage-' + (r.theme ? /^#/.test(r.theme) ? 'molv' : r.theme : 'default') + '" id="layui-laypage-' + r.index + '">', (i = [], layui.each(r.layout, function (e, a) {
      s[a] && i.push(s[a])
    }), i.join('')), '</div>'].join('')
  }, t.prototype.jump = function (e, a) {
    if (e) {
      var t = this; var i = t.config; var r = e.children; var n = e[c]('button')[0]; var u = e[c]('input')[0]
      var e = e[c]('select')[0]; var s = function () {
        var e = Number(u.value.replace(/\s|\D/g, ''))
        e && (i.curr = e, t.render())
      }
      if (a) return s()
      for (var l = 0, p = r.length; l < p; l++) {
        r[l].nodeName.toLowerCase() === 'a' && o.on(r[l], 'click', function () {
          var e = Number(this.getAttribute('data-page'))
          e < 1 || e > i.pages || (i.curr = e, t.render())
        })
      }
      e && o.on(e, 'change', function () {
        var e = this.value
        i.curr * e > i.count && (i.curr = Math.ceil(i.count / e)), i.limit = e, t.render()
      }), n && o.on(n, 'click', function () {
        s()
      })
    }
  }, t.prototype.skip = function (t) {
    var i, e
    t && (i = this, (e = t[c]('input')[0]) && o.on(e, 'keyup', function (e) {
      var a = this.value; var e = e.keyCode;
      /^(37|38|39|40)$/.test(e) || (/\D/.test(a) && (this.value = a.replace(/\D/, '')), e === 13 && i.jump(t, !0))
    }))
  }, t.prototype.render = function (e) {
    var a = this; var t = a.config; var i = a.type(); var r = a.view()
    var i = (i === 2 ? t.elem && (t.elem.innerHTML = r) : i === 3 ? t.elem.html(r) : n[u](t.elem) && (n[u](t.elem).innerHTML = r), t.jump && t.jump(t, e), n[u]('layui-laypage-' + t.index))
    a.jump(i), t.hash && !e && (location.hash = '!' + t.hash + '=' + t.curr), a.skip(i)
  }, {
    render: function (e) {
      return new t(e).index
    },
    index: layui.laypage ? layui.laypage.index + 1e4 : 0,
    on: function (a, e, t) {
      return a.attachEvent ? a.attachEvent('on' + e, function (e) {
        e.target = e.srcElement, t.call(a, e)
      }) : a.addEventListener(e, t, !1), this
    }
  })
  e('laypage', o)
})
!(function (i, r) {
  'use strict'
  var n = i.layui && layui.define; var l = {
    getPath: i.lay && lay.getPath ? lay.getPath : '',
    link: function (e, t, a) {
      u.path && i.lay && lay.layui && lay.layui.link(u.path + e, t, a)
    }
  }; var e = i.LAYUI_GLOBAL || {}; var u = {
    v: '5.3.1',
    config: { weekStart: 0 },
    index: i.laydate && i.laydate.v ? 1e5 : 0,
    path: e.laydate_dir || l.getPath,
    set: function (e) {
      var t = this
      return t.config = lay.extend({}, t.config, e), t
    },
    ready: function (e) {
      var t = 'laydate'; var a = (n ? 'modules/laydate/' : 'theme/') + 'default/laydate.css?v=' + u.v
      return n ? layui.addcss(a, e, t) : l.link(a, e, t), this
    }
  }; var s = function () {
    var t = this; var e = t.config.id
    return {
      hint: function (e) {
        t.hint.call(t, e)
      },
      config: (s.that[e] = t).config
    }
  }; var a = 'laydate'; var w = 'layui-this'; var x = 'laydate-disabled'; var h = [100, 2e5]; var p = 'layui-laydate-static'
  var M = 'layui-laydate-list'; var o = 'layui-laydate-hint'; var E = '.laydate-btns-confirm'; var C = 'laydate-time-text'
  var k = 'laydate-btns-time'; var f = 'layui-laydate-preview'; var g = function (e) {
    var t = this
    var a = (t.index = ++u.index, t.config = lay.extend({}, t.config, u.config, e), lay(e.elem || t.config.elem))
    if (a.length > 1) {
      return layui.each(a, function () {
        u.render(lay.extend({}, t.config, { elem: this }))
      }), t
    }
    (e = t.config).id = 'id' in e ? e.id : t.index, u.ready(function () {
      t.init()
    })
  }; var y = 'yyyy|y|MM|M|dd|d|HH|H|mm|m|ss|s'
  s.formatArr = function (e) {
    return (e || '').match(new RegExp(y + '|.', 'g')) || []
  }, g.isLeapYear = function (e) {
    return e % 4 == 0 && e % 100 != 0 || e % 400 == 0
  }, g.prototype.config = {
    type: 'date',
    range: !1,
    format: 'yyyy-MM-dd',
    value: null,
    isInitValue: !0,
    min: '1900-1-1',
    max: '2099-12-31',
    trigger: 'click',
    show: !1,
    showBottom: !0,
    isPreview: !0,
    btns: ['clear', 'now', 'confirm'],
    lang: 'cn',
    theme: 'default',
    position: null,
    calendar: !1,
    mark: {},
    holidays: null,
    zIndex: null,
    done: null,
    change: null
  }, g.prototype.lang = function () {
    var e = {
      cn: {
        weeks: ['\u65e5', '\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d'],
        time: ['\u65f6', '\u5206', '\u79d2'],
        timeTips: '\u9009\u62e9\u65f6\u95f4',
        startTime: '\u5f00\u59cb\u65f6\u95f4',
        endTime: '\u7ed3\u675f\u65f6\u95f4',
        dateTips: '\u8fd4\u56de\u65e5\u671f',
        month: ['\u4e00', '\u4e8c', '\u4e09', '\u56db', '\u4e94', '\u516d', '\u4e03', '\u516b', '\u4e5d', '\u5341', '\u5341\u4e00', '\u5341\u4e8c'],
        tools: { confirm: '\u786e\u5b9a', clear: '\u6e05\u7a7a', now: '\u73b0\u5728' },
        timeout: '\u7ed3\u675f\u65f6\u95f4\u4e0d\u80fd\u65e9\u4e8e\u5f00\u59cb\u65f6\u95f4<br>\u8bf7\u91cd\u65b0\u9009\u62e9',
        invalidDate: '\u4e0d\u5728\u6709\u6548\u65e5\u671f\u6216\u65f6\u95f4\u8303\u56f4\u5185',
        formatError: ['\u65e5\u671f\u683c\u5f0f\u4e0d\u5408\u6cd5<br>\u5fc5\u987b\u9075\u5faa\u4e0b\u8ff0\u683c\u5f0f\uff1a<br>', '<br>\u5df2\u4e3a\u4f60\u91cd\u7f6e'],
        preview: '\u5f53\u524d\u9009\u4e2d\u7684\u7ed3\u679c'
      },
      en: {
        weeks: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        time: ['Hours', 'Minutes', 'Seconds'],
        timeTips: 'Select Time',
        startTime: 'Start Time',
        endTime: 'End Time',
        dateTips: 'Select Date',
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        tools: { confirm: 'Confirm', clear: 'Clear', now: 'Now' },
        timeout: 'End time cannot be less than start Time<br>Please re-select',
        invalidDate: 'Invalid date',
        formatError: ['The date format error<br>Must be followed\uff1a<br>', '<br>It has been reset'],
        preview: 'The selected result'
      }
    }
    return e[this.config.lang] || e.cn
  }, g.prototype.init = function () {
    var r = this; var o = r.config; var e = o.position === 'static'
    var t = { year: 'yyyy', month: 'yyyy-MM', date: 'yyyy-MM-dd', time: 'HH:mm:ss', datetime: 'yyyy-MM-dd HH:mm:ss' }
    o.elem = lay(o.elem), o.eventElem = lay(o.eventElem), o.elem[0] && (r.rangeStr = o.range ? typeof o.range === 'string' ? o.range : '-' : '', layui.type(o.range) === 'array' && (r.rangeElem = [lay(o.range[0]), lay(o.range[1])]), t[o.type] || (i.console && console.error && console.error("laydate type error:'" + o.type + "' is not supported"), o.type = 'date'), o.format === t.date && (o.format = t[o.type] || t.date), r.format = s.formatArr(o.format), o.weekStart && !/^[0-6]$/.test(o.weekStart) && (t = r.lang(), o.weekStart = t.weeks.indexOf(o.weekStart), o.weekStart === -1 && (o.weekStart = 0)), r.EXP_IF = '', r.EXP_SPLIT = '', lay.each(r.format, function (e, t) {
      e = new RegExp(y).test(t) ? '\\d{' + (new RegExp(y).test(r.format[e === 0 ? e + 1 : e - 1] || '') ? /^yyyy|y$/.test(t) ? 4 : t.length : /^yyyy$/.test(t) ? '1,4' : /^y$/.test(t) ? '1,308' : '1,2') + '}' : '\\' + t
      r.EXP_IF = r.EXP_IF + e, r.EXP_SPLIT = r.EXP_SPLIT + '(' + e + ')'
    }), r.EXP_IF_ONE = new RegExp('^' + r.EXP_IF + '$'), r.EXP_IF = new RegExp('^' + (o.range ? r.EXP_IF + '\\s\\' + r.rangeStr + '\\s' + r.EXP_IF : r.EXP_IF) + '$'), r.EXP_SPLIT = new RegExp('^' + r.EXP_SPLIT + '$', ''), r.isInput(o.elem[0]) || o.trigger === 'focus' && (o.trigger = 'click'), o.elem.attr('lay-key') || (o.elem.attr('lay-key', r.index), o.eventElem.attr('lay-key', r.index)), o.mark = lay.extend({}, o.calendar && o.lang === 'cn' ? {
      '0-1-1': '\u5143\u65e6',
      '0-2-14': '\u60c5\u4eba',
      '0-3-8': '\u5987\u5973',
      '0-3-12': '\u690d\u6811',
      '0-4-1': '\u611a\u4eba',
      '0-5-1': '\u52b3\u52a8',
      '0-5-4': '\u9752\u5e74',
      '0-6-1': '\u513f\u7ae5',
      '0-9-10': '\u6559\u5e08',
      '0-10-1': '\u56fd\u5e86',
      '0-12-25': '\u5723\u8bde'
    } : {}, o.mark), lay.each(['min', 'max'], function (e, t) {
      var a; var n; var i = []; var l = []
      l = typeof o[t] === 'number' ? (n = o[t], a = new Date(), a = r.newDate({
        year: a.getFullYear(),
        month: a.getMonth(),
        date: a.getDate(),
        hours: '23',
        minutes: '59',
        seconds: '59'
      }).getTime(), i = [(n = new Date(n ? n < 864e5 ? a + 864e5 * n : n : a)).getFullYear(), n.getMonth() + 1, n.getDate()], [n.getHours(), n.getMinutes(), n.getSeconds()]) : (i = (o[t].match(/\d+-\d+-\d+/) || [''])[0].split('-'), (o[t].match(/\d+:\d+:\d+/) || [''])[0].split(':')), o[t] = {
        year: 0 | i[0] || (new Date()).getFullYear(),
        month: i[1] ? (0 | i[1]) - 1 : (new Date()).getMonth(),
        date: 0 | i[2] || (new Date()).getDate(),
        hours: 0 | l[0],
        minutes: 0 | l[1],
        seconds: 0 | l[2]
      }
    }), r.elemID = 'layui-laydate' + o.elem.attr('lay-key'), (o.show || e) && r.render(), e || r.events(), o.value && o.isInitValue && (layui.type(o.value) === 'date' ? r.setValue(r.parse(0, r.systemDate(o.value))) : r.setValue(o.value)))
  }, g.prototype.render = function () {
    var n; var e; var t = this; var o = t.config; var s = t.lang(); var i = o.position === 'static'; var a = t.elem = lay.elem('div', {
      id: t.elemID,
      class: ['layui-laydate', o.range ? ' layui-laydate-range' : '', i ? ' ' + p : '', o.theme && o.theme !== 'default' && !/^#/.test(o.theme) ? ' laydate-theme-' + o.theme : ''].join('')
    }); var y = t.elemMain = []; var d = t.elemHeader = []; var m = t.elemCont = []; var c = t.table = []
    var l = t.footer = lay.elem('div', { class: 'layui-laydate-footer' })
    o.zIndex && (a.style.zIndex = o.zIndex), lay.each(new Array(2), function (e) {
      if (!o.range && e > 0) return !0
      var a = lay.elem('div', { class: 'layui-laydate-header' })
      var t = [((t = lay.elem('i', { class: 'layui-icon laydate-icon laydate-prev-y' })).innerHTML = '&#xe65a;', t), ((t = lay.elem('i', { class: 'layui-icon laydate-icon laydate-prev-m' })).innerHTML = '&#xe603;', t), (t = lay.elem('div', { class: 'laydate-set-ym' }), n = lay.elem('span'), l = lay.elem('span'), t.appendChild(n), t.appendChild(l), t), ((n = lay.elem('i', { class: 'layui-icon laydate-icon laydate-next-m' })).innerHTML = '&#xe602;', n), ((l = lay.elem('i', { class: 'layui-icon laydate-icon laydate-next-y' })).innerHTML = '&#xe65b;', l)]
      var n = lay.elem('div', { class: 'layui-laydate-content' }); var i = lay.elem('table'); var l = lay.elem('thead')
      var r = lay.elem('tr')
      lay.each(t, function (e, t) {
        a.appendChild(t)
      }), l.appendChild(r), lay.each(new Array(6), function (a) {
        var n = i.insertRow(0)
        lay.each(new Array(7), function (e) {
          var t
          a === 0 && ((t = lay.elem('th')).innerHTML = s.weeks[(e + o.weekStart) % 7], r.appendChild(t)), n.insertCell(e)
        })
      }), i.insertBefore(l, i.children[0]), n.appendChild(i), y[e] = lay.elem('div', { class: 'layui-laydate-main laydate-main-list-' + e }), y[e].appendChild(a), y[e].appendChild(n), d.push(t), m.push(n), c.push(i)
    }), lay(l).html((e = [], n = [], o.type === 'datetime' && e.push('<span lay-type="datetime" class="' + k + '">' + s.timeTips + '</span>'), !o.range && o.type === 'datetime' || e.push('<span class="' + f + '" title="' + s.preview + '"></span>'), lay.each(o.btns, function (e, t) {
      var a = s.tools[t] || 'btn'
      o.range && t === 'now' || (i && t === 'clear' && (a = o.lang === 'cn' ? '\u91cd\u7f6e' : 'Reset'), n.push('<span lay-type="' + t + '" class="laydate-btns-' + t + '">' + a + '</span>'))
    }), e.push('<div class="laydate-footer-btns">' + n.join('') + '</div>'), e.join(''))), lay.each(y, function (e, t) {
      a.appendChild(t)
    }), o.showBottom && a.appendChild(l), /^#/.test(o.theme) && (e = lay.elem('style'), l = ['#{{id}} .layui-laydate-header{background-color:{{theme}};}', '#{{id}} .layui-this{background-color:{{theme}} !important;}'].join('').replace(/{{id}}/g, t.elemID).replace(/{{theme}}/g, o.theme), 'styleSheet' in e ? (e.setAttribute('type', 'text/css'), e.styleSheet.cssText = l) : e.innerHTML = l, lay(a).addClass('laydate-theme-molv'), a.appendChild(e)), t.remove(g.thisElemDate), u.thisId = o.id, i ? o.elem.append(a) : (r.body.appendChild(a), t.position()), t.checkDate().calendar(null, 0, 'init'), t.changeEvent(), g.thisElemDate = t.elemID, typeof o.ready === 'function' && o.ready(lay.extend({}, o.dateTime, { month: o.dateTime.month + 1 })), t.preview()
  }, g.prototype.remove = function (e) {
    var t = this; var a = t.config; var n = lay('#' + (e || t.elemID))
    return n[0] && (n.hasClass(p) || t.checkDate(function () {
      n.remove(), delete u.thisId, typeof a.close === 'function' && a.close(t)
    })), t
  }, g.prototype.position = function () {
    var e = this.config
    return lay.position(this.bindElem || e.elem[0], this.elem, { position: e.position }), this
  }, g.prototype.hint = function (e) {
    var t = this; var a = (t.config, lay.elem('div', { class: o }))
    t.elem && (a.innerHTML = e || '', lay(t.elem).find('.' + o).remove(), t.elem.appendChild(a), clearTimeout(t.hinTimer), t.hinTimer = setTimeout(function () {
      lay(t.elem).find('.' + o).remove()
    }, 3e3))
  }, g.prototype.getAsYM = function (e, t, a) {
    return a ? t-- : t++, t < 0 && (t = 11, e--), t > 11 && (t = 0, e++), [e, t]
  }, g.prototype.systemDate = function (e) {
    var t = e || new Date()
    return {
      year: t.getFullYear(),
      month: t.getMonth(),
      date: t.getDate(),
      hours: e ? e.getHours() : 0,
      minutes: e ? e.getMinutes() : 0,
      seconds: e ? e.getSeconds() : 0
    }
  }, g.prototype.checkDate = function (e) {
    var t; var o; var s = this; var y = (new Date(), s.config); var a = s.lang(); var n = y.dateTime = y.dateTime || s.systemDate()
    var i = s.bindElem || y.elem[0]; var l = (s.isInput(i), (function () {
      if (s.rangeElem) {
        var e = [s.rangeElem[0].val(), s.rangeElem[1].val()]
        if (e[0] && e[1]) return e.join(' ' + s.rangeStr + ' ')
      }
      return s.isInput(i) ? i.value : y.position === 'static' ? '' : lay(i).attr('lay-date')
    }())); var d = function (e) {
      e.year > h[1] && (e.year = h[1], o = !0), e.month > 11 && (e.month = 11, o = !0), e.seconds > 59 && (e.seconds = 0, e.minutes++, o = !0), e.minutes > 59 && (e.minutes = 0, e.hours++, o = !0), e.hours > 23 && (e.hours = 0, o = !0), t = u.getEndDate(e.month + 1, e.year), e.date > t && (e.date = t, o = !0)
    }; var r = function (n, i, l) {
      var r = ['startTime', 'endTime']
      i = (i.match(s.EXP_SPLIT) || []).slice(1), l = l || 0, y.range && (s[r[l]] = s[r[l]] || {}), lay.each(s.format, function (e, t) {
        var a = parseFloat(i[e])
        i[e].length < t.length && (o = !0), /yyyy|y/.test(t) ? (a < h[0] && (a = h[0], o = !0), n.year = a) : /MM|M/.test(t) ? (a < 1 && (a = 1, o = !0), n.month = a - 1) : /dd|d/.test(t) ? (a < 1 && (a = 1, o = !0), n.date = a) : /HH|H/.test(t) ? (a < 0 && (o = !(a = 0)), a > 23 && (a = 23, o = !0), n.hours = a, y.range && (s[r[l]].hours = a)) : /mm|m/.test(t) ? (a < 0 && (o = !(a = 0)), a > 59 && (a = 59, o = !0), n.minutes = a, y.range && (s[r[l]].minutes = a)) : /ss|s/.test(t) && (a < 0 && (o = !(a = 0)), a > 59 && (a = 59, o = !0), n.seconds = a, y.range && (s[r[l]].seconds = a))
      }), d(n)
    }
    if (e === 'limit') return d(n), s
    typeof (l = l || y.value) === 'string' && (l = l.replace(/\s+/g, ' ').replace(/^\s|\s$/g, ''))
    var m; var c = function () {
      var e, t, a
      y.range && (s.endDate = s.endDate || lay.extend({}, y.dateTime, (e = {}, t = y.dateTime, a = s.getAsYM(t.year, t.month), y.type === 'year' ? e.year = t.year + 1 : y.type !== 'time' && (e.year = a[0], e.month = a[1]), y.type !== 'datetime' && y.type !== 'time' || (e.hours = 23, e.minutes = e.seconds = 59), e)))
    }
    return c(), typeof l === 'string' && l ? s.EXP_IF.test(l) ? y.range ? (l = l.split(' ' + s.rangeStr + ' '), lay.each([y.dateTime, s.endDate], function (e, t) {
      r(t, l[e], e)
    })) : r(n, l) : (s.hint(a.formatError[0] + (y.range ? y.format + ' ' + s.rangeStr + ' ' + y.format : y.format) + a.formatError[1]), o = !0) : l && layui.type(l) === 'date' ? y.dateTime = s.systemDate(l) : (y.dateTime = s.systemDate(), delete s.startTime, delete s.endDate, c(), delete s.endTime), s.rangeElem && (a = [s.rangeElem[0].val(), s.rangeElem[1].val()], m = [y.dateTime, s.endDate], lay.each(a, function (e, t) {
      s.EXP_IF_ONE.test(t) && r(m[e], t, e)
    })), d(n), y.range && d(s.endDate), o && l && s.setValue(!y.range || s.endDate ? s.parse() : ''), s.getDateTime(n) > s.getDateTime(y.max) ? n = y.dateTime = lay.extend({}, y.max) : s.getDateTime(n) < s.getDateTime(y.min) && (n = y.dateTime = lay.extend({}, y.min)), y.range && ((s.getDateTime(s.endDate) < s.getDateTime(y.min) || s.getDateTime(s.endDate) > s.getDateTime(y.max)) && (s.endDate = lay.extend({}, y.max)), s.startTime = {
      hours: y.dateTime.hours,
      minutes: y.dateTime.minutes,
      seconds: y.dateTime.seconds
    }, s.endTime = { hours: s.endDate.hours, minutes: s.endDate.minutes, seconds: s.endDate.seconds }), e && e(), s
  }, g.prototype.mark = function (e, a) {
    var n; var t = this.config
    return lay.each(t.mark, function (e, t) {
      e = e.split('-')
      e[0] != a[0] && e[0] != 0 || e[1] != a[1] && e[1] != 0 || e[2] != a[2] || (n = t || a[2])
    }), n && e.html('<span class="laydate-day-mark">' + n + '</span>'), this
  }, g.prototype.holidays = function (n, i) {
    var e = this.config; var l = ['', 'work']
    return layui.type(e.holidays) !== 'array' || lay.each(e.holidays, function (a, e) {
      lay.each(e, function (e, t) {
        t === n.attr('lay-ymd') && n.html('<span class="laydate-day-holidays"' + (l[a] ? 'type="' + l[a] + '"' : '') + '>' + i[2] + '</span>')
      })
    }), this
  }, g.prototype.limit = function (e, t, a, i) {
    var l = this; var n = l.config; var r = {}; var a = (i ? 0 : 41) < a ? l.endDate : n.dateTime
    var a = lay.extend({}, a, t || {})
    return lay.each({ now: a, min: n.min, max: n.max }, function (e, a) {
      var n
      r[e] = l.newDate(lay.extend({
        year: a.year,
        month: a.month,
        date: a.date
      }, (n = {}, lay.each(i, function (e, t) {
        n[t] = a[t]
      }), n))).getTime()
    }), t = r.now < r.min || r.now > r.max, e && e[t ? 'addClass' : 'removeClass'](x), t
  }, g.prototype.thisDateTime = function (e) {
    var t = this.config
    return e ? this.endDate : t.dateTime
  }, g.prototype.calendar = function (e, t, a) {
    var i; var l; var r; var o = this; var n = o.config; var t = t ? 1 : 0; var s = e || o.thisDateTime(t); var y = new Date(); var d = o.lang()
    var m = n.type !== 'date' && n.type !== 'datetime'; var c = lay(o.table[t]).find('td')
    var t = lay(o.elemHeader[t][2]).find('span')
    return s.year < h[0] && (s.year = h[0], o.hint(d.invalidDate)), s.year > h[1] && (s.year = h[1], o.hint(d.invalidDate)), o.firstDate || (o.firstDate = lay.extend({}, s)), y.setFullYear(s.year, s.month, 1), i = (y.getDay() + (7 - n.weekStart)) % 7, l = u.getEndDate(s.month || 12, s.year), r = u.getEndDate(s.month + 1, s.year), lay.each(c, function (e, t) {
      var a = [s.year, s.month]; var n = 0;
      (t = lay(t)).removeAttr('class'), e < i ? (n = l - i + e, t.addClass('laydate-day-prev'), a = o.getAsYM(s.year, s.month, 'sub')) : i <= e && e < r + i ? (n = e - i) + 1 === s.date && t.addClass(w) : (n = e - r - i, t.addClass('laydate-day-next'), a = o.getAsYM(s.year, s.month)), a[1]++, a[2] = n + 1, t.attr('lay-ymd', a.join('-')).html(a[2]), o.mark(t, a).holidays(t, a).limit(t, {
        year: a[0],
        month: a[1] - 1,
        date: a[2]
      }, e)
    }), lay(t[0]).attr('lay-ym', s.year + '-' + (s.month + 1)), lay(t[1]).attr('lay-ym', s.year + '-' + (s.month + 1)), n.lang === 'cn' ? (lay(t[0]).attr('lay-type', 'year').html(s.year + ' \u5e74'), lay(t[1]).attr('lay-type', 'month').html(s.month + 1 + ' \u6708')) : (lay(t[0]).attr('lay-type', 'month').html(d.month[s.month]), lay(t[1]).attr('lay-type', 'year').html(s.year)), m && (n.range ? e && (o.listYM = [[n.dateTime.year, n.dateTime.month + 1], [o.endDate.year, o.endDate.month + 1]], o.list(n.type, 0).list(n.type, 1), n.type === 'time' ? o.setBtnStatus('\u65f6\u95f4', lay.extend({}, o.systemDate(), o.startTime), lay.extend({}, o.systemDate(), o.endTime)) : o.setBtnStatus(!0)) : (o.listYM = [[s.year, s.month + 1]], o.list(n.type, 0))), n.range && a === 'init' && !e && o.calendar(o.endDate, 1), n.range || o.limit(lay(o.footer).find(E), null, 0, ['hours', 'minutes', 'seconds']), o.setBtnStatus(), o
  }, g.prototype.list = function (t, n) {
    var i; var l; var e; var r; var o = this; var s = o.config; var y = s.dateTime; var d = o.lang()
    var a = s.range && s.type !== 'date' && s.type !== 'datetime'; var m = lay.elem('ul', {
      class: M + ' ' + {
        year: 'laydate-year-list',
        month: 'laydate-month-list',
        time: 'laydate-time-list'
      }[t]
    }); var c = o.elemHeader[n]; var u = lay(c[2]).find('span'); var h = o.elemCont[n || 0]; var p = lay(h).find('.' + M)[0]
    var f = s.lang === 'cn'; var g = f ? '\u5e74' : ''; var v = o.listYM[n] || {}; var T = ['hours', 'minutes', 'seconds']
    var D = ['startTime', 'endTime'][n]
    return v[0] < 1 && (v[0] = 1), t === 'year' ? (e = i = v[0] - 7, i < 1 && (e = i = 1), lay.each(new Array(15), function (e) {
      var t = lay.elem('li', { 'lay-ym': i }); var a = { year: i, month: 0, date: 1 }
      i == v[0] && lay(t).addClass(w), t.innerHTML = i + g, m.appendChild(t), o.limit(lay(t), a, n), i++
    }), lay(u[f ? 0 : 1]).attr('lay-ym', i - 8 + '-' + v[1]).html(e + g + ' - ' + (i - 1) + g)) : t === 'month' ? (lay.each(new Array(12), function (e) {
      var t = lay.elem('li', { 'lay-ym': e }); var a = { year: v[0], month: e, date: 1 }
      e + 1 == v[1] && lay(t).addClass(w), t.innerHTML = d.month[e] + (f ? '\u6708' : ''), m.appendChild(t), o.limit(lay(t), a, n)
    }), lay(u[f ? 0 : 1]).attr('lay-ym', v[0] + '-' + v[1]).html(v[0] + g)) : t === 'time' && (l = function () {
      lay(m).find('ol').each(function (a, e) {
        lay(e).find('li').each(function (e, t) {
          o.limit(lay(t), [{ hours: e }, { hours: o[D].hours, minutes: e }, {
            hours: o[D].hours,
            minutes: o[D].minutes,
            seconds: e
          }][a], n, [['hours'], ['hours', 'minutes'], ['hours', 'minutes', 'seconds']][a])
        })
      }), s.range || o.limit(lay(o.footer).find(E), o[D], 0, ['hours', 'minutes', 'seconds'])
    }, s.range ? o[D] || (o[D] = D === 'startTime' ? y : o.endDate) : o[D] = y, lay.each([24, 60, 60], function (t, e) {
      var a = lay.elem('li'); var n = ['<p>' + d.time[t] + '</p><ol>']
      lay.each(new Array(e), function (e) {
        n.push('<li' + (o[D][T[t]] === e ? ' class="' + w + '"' : '') + '>' + lay.digit(e, 2) + '</li>')
      }), a.innerHTML = n.join('') + '</ol>', m.appendChild(a)
    }), l()), p && h.removeChild(p), h.appendChild(m), t === 'year' || t === 'month' ? (lay(o.elemMain[n]).addClass('laydate-ym-show'), lay(m).find('li').on('click', function () {
      var e = 0 | lay(this).attr('lay-ym')
      lay(this).hasClass(x) || (n === 0 ? (y[t] = e, o.limit(lay(o.footer).find(E), null, 0)) : o.endDate[t] = e, s.type === 'year' || s.type === 'month' ? (lay(m).find('.' + w).removeClass(w), lay(this).addClass(w), s.type === 'month' && t === 'year' && (o.listYM[n][0] = e, a && ((n ? o.endDate : y).year = e), o.list('month', n))) : (o.checkDate('limit').calendar(null, n), o.closeList()), o.setBtnStatus(), s.range || (s.type === 'month' && t === 'month' || s.type === 'year' && t === 'year') && o.setValue(o.parse()).remove().done(), o.done(null, 'change'), lay(o.footer).find('.' + k).removeClass(x))
    })) : (e = lay.elem('span', { class: C }), r = function () {
      lay(m).find('ol').each(function (e) {
        var a = this; var t = lay(a).find('li')
        a.scrollTop = 30 * (o[D][T[e]] - 2), a.scrollTop <= 0 && t.each(function (e, t) {
          if (!lay(this).hasClass(x)) return a.scrollTop = 30 * (e - 2), !0
        })
      })
    }, u = lay(c[2]).find('.' + C), r(), e.innerHTML = s.range ? [d.startTime, d.endTime][n] : d.timeTips, lay(o.elemMain[n]).addClass('laydate-time-show'), u[0] && u.remove(), c[2].appendChild(e), lay(m).find('ol').each(function (t) {
      var a = this
      lay(a).find('li').on('click', function () {
        var e = 0 | this.innerHTML
        lay(this).hasClass(x) || (s.range ? o[D][T[t]] = e : y[T[t]] = e, lay(a).find('.' + w).removeClass(w), lay(this).addClass(w), l(), r(), !o.endDate && s.type !== 'time' || o.done(null, 'change'), o.setBtnStatus())
      })
    })), o
  }, g.prototype.listYM = [], g.prototype.closeList = function () {
    var a = this
    a.config
    lay.each(a.elemCont, function (e, t) {
      lay(this).find('.' + M).remove(), lay(a.elemMain[e]).removeClass('laydate-ym-show laydate-time-show')
    }), lay(a.elem).find('.' + C).remove()
  }, g.prototype.setBtnStatus = function (e, t, a) {
    var n = this; var i = n.config; var l = n.lang(); var r = lay(n.footer).find(E)
    i.range && i.type !== 'time' && (t = t || i.dateTime, a = a || n.endDate, i = n.newDate(t).getTime() > n.newDate(a).getTime(), n.limit(null, t) || n.limit(null, a) ? r.addClass(x) : r[i ? 'addClass' : 'removeClass'](x), e && i && n.hint(typeof e === 'string' ? l.timeout.replace(/\u65e5\u671f/g, e) : l.timeout))
  }, g.prototype.parse = function (e, t) {
    var a = this; var n = a.config
    var t = t || (e == 'end' ? lay.extend({}, a.endDate, a.endTime) : n.range ? lay.extend({}, n.dateTime, a.startTime) : n.dateTime)
    var t = u.parse(t, a.format, 1)
    return n.range && e === undefined ? t + ' ' + a.rangeStr + ' ' + a.parse('end') : t
  }, g.prototype.newDate = function (e) {
    return e = e || {}, new Date(e.year || 1, e.month || 0, e.date || 1, e.hours || 0, e.minutes || 0, e.seconds || 0)
  }, g.prototype.getDateTime = function (e) {
    return this.newDate(e).getTime()
  }, g.prototype.setValue = function (e) {
    var t = this; var a = t.config; var n = t.bindElem || a.elem[0]
    return a.position === 'static' || (e = e || '', t.isInput(n) ? lay(n).val(e) : (a = t.rangeElem) ? (layui.type(e) !== 'array' && (e = e.split(' ' + t.rangeStr + ' ')), a[0].val(e[0] || ''), a[1].val(e[1] || '')) : (lay(n).find('*').length === 0 && lay(n).html(e), lay(n).attr('lay-date', e))), t
  }, g.prototype.preview = function () {
    var e; var t = this; var a = t.config
    a.isPreview && (e = lay(t.elem).find('.' + f), a = !a.range || t.endDate ? t.parse() : '', e.html(a).css({ color: '#5FB878' }), setTimeout(function () {
      e.css({ color: '#666' })
    }, 300))
  }, g.prototype.done = function (e, t) {
    var a = this; var n = a.config; var i = lay.extend({}, lay.extend(n.dateTime, a.startTime))
    var l = lay.extend({}, lay.extend(a.endDate, a.endTime))
    return lay.each([i, l], function (e, t) {
      'month' in t && lay.extend(t, { month: t.month + 1 })
    }), a.preview(), e = e || [a.parse(), i, l], typeof n[t || 'done'] === 'function' && n[t || 'done'].apply(n, e), a
  }, g.prototype.choose = function (e, a) {
    var n = this; var i = n.config; var l = n.thisDateTime(a); var t = (lay(n.elem).find('td'), {
      year: 0 | (t = e.attr('lay-ymd').split('-'))[0],
      month: (0 | t[1]) - 1,
      date: 0 | t[2]
    })
    e.hasClass(x) || (lay.extend(l, t), i.range ? (lay.each(['startTime', 'endTime'], function (e, t) {
      n[t] = n[t] || {
        hours: e ? 23 : 0,
        minutes: e ? 59 : 0,
        seconds: e ? 59 : 0
      }, a === e && (n.getDateTime(lay.extend({}, l, n[t])) < n.getDateTime(i.min) ? (n[t] = {
        hours: i.min.hours,
        minutes: i.min.minutes,
        seconds: i.min.seconds
      }, lay.extend(l, n[t])) : n.getDateTime(lay.extend({}, l, n[t])) > n.getDateTime(i.max) && (n[t] = {
        hours: i.max.hours,
        minutes: i.max.minutes,
        seconds: i.max.seconds
      }, lay.extend(l, n[t])))
    }), n.calendar(null, a).done(null, 'change')) : i.position === 'static' ? n.calendar().done().done(null, 'change') : i.type === 'date' ? n.setValue(n.parse()).remove().done() : i.type === 'datetime' && n.calendar().done(null, 'change'))
  }, g.prototype.tool = function (e, t) {
    var a = this; var n = a.config; var i = a.lang(); var l = n.dateTime; var r = n.position === 'static'; var o = {
      datetime: function () {
        lay(e).hasClass(x) || (a.list('time', 0), n.range && a.list('time', 1), lay(e).attr('lay-type', 'date').html(a.lang().dateTips))
      },
      date: function () {
        a.closeList(), lay(e).attr('lay-type', 'datetime').html(a.lang().timeTips)
      },
      clear: function () {
        r && (lay.extend(l, a.firstDate), a.calendar()), n.range && (delete n.dateTime, delete a.endDate, delete a.startTime, delete a.endTime), a.setValue('').remove(), a.done(['', {}, {}])
      },
      now: function () {
        var e = new Date()
        lay.extend(l, a.systemDate(), {
          hours: e.getHours(),
          minutes: e.getMinutes(),
          seconds: e.getSeconds()
        }), a.setValue(a.parse()).remove(), r && a.calendar(), a.done()
      },
      confirm: function () {
        if (n.range) {
          if (lay(e).hasClass(x)) return a.hint(n.type === 'time' ? i.timeout.replace(/\u65e5\u671f/g, '\u65f6\u95f4') : i.timeout)
        } else if (lay(e).hasClass(x)) return a.hint(i.invalidDate)
        a.setValue(a.parse()).remove(), a.done()
      }
    }
    o[t] && o[t]()
  }, g.prototype.change = function (n) {
    var i = this; var l = i.config; var r = i.thisDateTime(n); var o = l.range && (l.type === 'year' || l.type === 'month')
    var s = i.elemCont[n || 0]; var y = i.listYM[n]; var e = function (e) {
      var t = lay(s).find('.laydate-year-list')[0]; var a = lay(s).find('.laydate-month-list')[0]
      return t && (y[0] = e ? y[0] - 15 : y[0] + 15, i.list('year', n)), a && (e ? y[0]-- : y[0]++, i.list('month', n)), (t || a) && (lay.extend(r, { year: y[0] }), o && (r.year = y[0]), l.range || i.done(null, 'change'), l.range || i.limit(lay(i.footer).find(E), { year: y[0] })), i.setBtnStatus(), t || a
    }
    return {
      prevYear: function () {
        e('sub') || (r.year--, i.checkDate('limit').calendar(null, n), i.done(null, 'change'))
      },
      prevMonth: function () {
        var e = i.getAsYM(r.year, r.month, 'sub')
        lay.extend(r, { year: e[0], month: e[1] }), i.checkDate('limit').calendar(null, n), i.done(null, 'change')
      },
      nextMonth: function () {
        var e = i.getAsYM(r.year, r.month)
        lay.extend(r, { year: e[0], month: e[1] }), i.checkDate('limit').calendar(null, n), i.done(null, 'change')
      },
      nextYear: function () {
        e() || (r.year++, i.checkDate('limit').calendar(null, n), i.done(null, 'change'))
      }
    }
  }, g.prototype.changeEvent = function () {
    var i = this
    i.config
    lay(i.elem).on('click', function (e) {
      lay.stope(e)
    }).on('mousedown', function (e) {
      lay.stope(e)
    }), lay.each(i.elemHeader, function (n, e) {
      lay(e[0]).on('click', function (e) {
        i.change(n).prevYear()
      }), lay(e[1]).on('click', function (e) {
        i.change(n).prevMonth()
      }), lay(e[2]).find('span').on('click', function (e) {
        var t = lay(this); var a = t.attr('lay-ym'); var t = t.attr('lay-type')
        a && (a = a.split('-'), i.listYM[n] = [0 | a[0], 0 | a[1]], i.list(t, n), lay(i.footer).find('.' + k).addClass(x))
      }), lay(e[3]).on('click', function (e) {
        i.change(n).nextMonth()
      }), lay(e[4]).on('click', function (e) {
        i.change(n).nextYear()
      })
    }), lay.each(i.table, function (e, t) {
      lay(t).find('td').on('click', function () {
        i.choose(lay(this), e)
      })
    }), lay(i.footer).find('span').on('click', function () {
      var e = lay(this).attr('lay-type')
      i.tool(this, e)
    })
  }, g.prototype.isInput = function (e) {
    return /input|textarea/.test(e.tagName.toLocaleLowerCase()) || /INPUT|TEXTAREA/.test(e.tagName)
  }, g.prototype.events = function () {
    var a = this; var n = a.config; var e = function (e, t) {
      e.on(n.trigger, function () {
        u.thisId !== n.id && (t && (a.bindElem = this), a.render())
      })
    }
    n.elem[0] && !n.elem[0].eventHandler && (e(n.elem, 'bind'), e(n.eventElem), n.elem[0].eventHandler = !0)
  }, s.that = {}, s.getThis = function (e) {
    var t = s.that[e]
    return !t && n && layui.hint().error(e ? a + " instance with ID '" + e + "' not found" : 'ID argument required'), t
  }, l.run = function (n) {
    n(r).on('mousedown', function (e) {
      var t, a
      !u.thisId || (t = s.getThis(u.thisId)) && (a = t.config, e.target !== a.elem[0] && e.target !== a.eventElem[0] && e.target !== n(a.closeStop)[0] && t.remove())
    }).on('keydown', function (e) {
      var t
      !u.thisId || (t = s.getThis(u.thisId)) && t.config.position !== 'static' && e.keyCode === 13 && n('#' + t.elemID)[0] && t.elemID === g.thisElemDate && (e.preventDefault(), n(t.footer).find(E)[0].click())
    }), n(i).on('resize', function () {
      if (u.thisId) {
        var e = s.getThis(u.thisId)
        if (e) return !(!e.elem || !n('.layui-laydate')[0]) && void e.position()
      }
    })
  }, u.render = function (e) {
    e = new g(e)
    return s.call(e)
  }, u.parse = function (a, n, i) {
    return a = a || {}, n = ((n = typeof n === 'string' ? s.formatArr(n) : n) || []).concat(), lay.each(n, function (e, t) {
      /yyyy|y/.test(t) ? n[e] = lay.digit(a.year, t.length) : /MM|M/.test(t) ? n[e] = lay.digit(a.month + (i || 0), t.length) : /dd|d/.test(t) ? n[e] = lay.digit(a.date, t.length) : /HH|H/.test(t) ? n[e] = lay.digit(a.hours, t.length) : /mm|m/.test(t) ? n[e] = lay.digit(a.minutes, t.length) : /ss|s/.test(t) && (n[e] = lay.digit(a.seconds, t.length))
    }), n.join('')
  }, u.getEndDate = function (e, t) {
    var a = new Date()
    return a.setFullYear(t || a.getFullYear(), e || a.getMonth() + 1, 1), new Date(a.getTime() - 864e5).getDate()
  }, u.close = function (e) {
    e = s.getThis(e || u.thisId)
    if (e) return e.remove()
  }, n ? (u.ready(), layui.define('lay', function (e) {
    u.path = layui.cache.dir, l.run(lay), e(a, u)
  })) : typeof define === 'function' && define.amd ? define(function () {
    return l.run(lay), u
  }) : (u.ready(), l.run(i.lay), i.laydate = u)
}(window, window.document))
!(function (e, t) {
  typeof module === 'object' && typeof module.exports === 'object' ? module.exports = e.document ? t(e) : function (e) {
    if (e.document) return t(e)
    throw new Error('jQuery requires a window with a document')
  } : t(e)
}(typeof window !== 'undefined' ? window : this, function (T, M) {
  var f = []; var g = T.document; var c = f.slice; var O = f.concat; var R = f.push; var P = f.indexOf; var B = {}; var W = B.toString
  var m = B.hasOwnProperty; var y = {}; var e = '1.12.4'; var C = function (e, t) {
    return new C.fn.init(e, t)
  }; var I = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g; var $ = /^-ms-/; var z = /-([\da-z])/gi; var X = function (e, t) {
    return t.toUpperCase()
  }

  function U (e) {
    var t = !!e && 'length' in e && e.length; var n = C.type(e)
    return n !== 'function' && !C.isWindow(e) && (n === 'array' || t === 0 || typeof t === 'number' && t > 0 && t - 1 in e)
  }

  C.fn = C.prototype = {
    jquery: e,
    constructor: C,
    selector: '',
    length: 0,
    toArray: function () {
      return c.call(this)
    },
    get: function (e) {
      return e != null ? e < 0 ? this[e + this.length] : this[e] : c.call(this)
    },
    pushStack: function (e) {
      e = C.merge(this.constructor(), e)
      return e.prevObject = this, e.context = this.context, e
    },
    each: function (e) {
      return C.each(this, e)
    },
    map: function (n) {
      return this.pushStack(C.map(this, function (e, t) {
        return n.call(e, t, e)
      }))
    },
    slice: function () {
      return this.pushStack(c.apply(this, arguments))
    },
    first: function () {
      return this.eq(0)
    },
    last: function () {
      return this.eq(-1)
    },
    eq: function (e) {
      var t = this.length; var e = +e + (e < 0 ? t : 0)
      return this.pushStack(e >= 0 && e < t ? [this[e]] : [])
    },
    end: function () {
      return this.prevObject || this.constructor()
    },
    push: R,
    sort: f.sort,
    splice: f.splice
  }, C.extend = C.fn.extend = function () {
    var e; var t; var n; var r; var i; var o = arguments[0] || {}; var a = 1; var s = arguments.length; var u = !1
    for (typeof o === 'boolean' && (u = o, o = arguments[a] || {}, a++), typeof o === 'object' || C.isFunction(o) || (o = {}), a === s && (o = this, a--); a < s; a++) if ((r = arguments[a]) != null) for (n in r) i = o[n], o !== (t = r[n]) && (u && t && (C.isPlainObject(t) || (e = C.isArray(t))) ? (i = e ? (e = !1, i && C.isArray(i) ? i : []) : i && C.isPlainObject(i) ? i : {}, o[n] = C.extend(u, i, t)) : t !== undefined && (o[n] = t))
    return o
  }, C.extend({
    expando: 'jQuery' + (e + Math.random()).replace(/\D/g, ''),
    isReady: !0,
    error: function (e) {
      throw new Error(e)
    },
    noop: function () {
    },
    isFunction: function (e) {
      return C.type(e) === 'function'
    },
    isArray: Array.isArray || function (e) {
      return C.type(e) === 'array'
    },
    isWindow: function (e) {
      return e != null && e == e.window
    },
    isNumeric: function (e) {
      var t = e && e.toString()
      return !C.isArray(e) && t - parseFloat(t) + 1 >= 0
    },
    isEmptyObject: function (e) {
      for (var t in e) return !1
      return !0
    },
    isPlainObject: function (e) {
      if (!e || C.type(e) !== 'object' || e.nodeType || C.isWindow(e)) return !1
      try {
        if (e.constructor && !m.call(e, 'constructor') && !m.call(e.constructor.prototype, 'isPrototypeOf')) return !1
      } catch (n) {
        return !1
      }
      if (!y.ownFirst) for (var t in e) return m.call(e, t)
      for (t in e) ;
      return t === undefined || m.call(e, t)
    },
    type: function (e) {
      return e == null ? e + '' : typeof e === 'object' || typeof e === 'function' ? B[W.call(e)] || 'object' : typeof e
    },
    globalEval: function (e) {
      e && C.trim(e) && (T.execScript || function (e) {
        T.eval.call(T, e)
      })(e)
    },
    camelCase: function (e) {
      return e.replace($, 'ms-').replace(z, X)
    },
    nodeName: function (e, t) {
      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    },
    each: function (e, t) {
      var n; var r = 0
      if (U(e)) for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++) ; else for (r in e) if (!1 === t.call(e[r], r, e[r])) break
      return e
    },
    trim: function (e) {
      return e == null ? '' : (e + '').replace(I, '')
    },
    makeArray: function (e, t) {
      t = t || []
      return e != null && (U(Object(e)) ? C.merge(t, typeof e === 'string' ? [e] : e) : R.call(t, e)), t
    },
    inArray: function (e, t, n) {
      var r
      if (t) {
        if (P) return P.call(t, e, n)
        for (r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0; n < r; n++) if (n in t && t[n] === e) return n
      }
      return -1
    },
    merge: function (e, t) {
      for (var n = +t.length, r = 0, i = e.length; r < n;) e[i++] = t[r++]
      if (n != n) for (; t[r] !== undefined;) e[i++] = t[r++]
      return e.length = i, e
    },
    grep: function (e, t, n) {
      for (var r = [], i = 0, o = e.length, a = !n; i < o; i++) !t(e[i], i) != a && r.push(e[i])
      return r
    },
    map: function (e, t, n) {
      var r; var i; var o = 0; var a = []
      if (U(e)) for (r = e.length; o < r; o++) (i = t(e[o], o, n)) != null && a.push(i); else for (o in e) (i = t(e[o], o, n)) != null && a.push(i)
      return O.apply([], a)
    },
    guid: 1,
    proxy: function (e, t) {
      var n, r
      return typeof t === 'string' && (r = e[t], t = e, e = r), C.isFunction(e) ? (n = c.call(arguments, 2), (r = function () {
        return e.apply(t || this, n.concat(c.call(arguments)))
      }).guid = e.guid = e.guid || C.guid++, r) : undefined
    },
    now: function () {
      return +new Date()
    },
    support: y
  }), typeof Symbol === 'function' && (C.fn[Symbol.iterator] = f[Symbol.iterator]), C.each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '), function (e, t) {
    B['[object ' + t + ']'] = t.toLowerCase()
  })
  var e = (function (M) {
    var e; var g; var b; var o; var O; var w; var R; var P; var T; var u; var l; var C; var E; var t; var N; var m; var r; var i; var y; var k = 'sizzle' + +new Date(); var v = M.document; var S = 0
    var B = 0; var W = le(); var I = le(); var A = le(); var $ = function (e, t) {
      return e === t && (l = !0), 0
    }; var z = {}.hasOwnProperty; var n = []; var X = n.pop; var U = n.push; var D = n.push; var V = n.slice; var j = function (e, t) {
      for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n
      return -1
    }
    var Y = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped'
    var a = '[\\x20\\t\\r\\n\\f]'; var s = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+'
    var J = '\\[' + a + '*(' + s + ')(?:' + a + '*([*^$|!~]?=)' + a + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + s + '))|)' + a + '*\\]'
    var G = ':(' + s + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + J + ')*)|.*)\\)|)'
    var K = new RegExp(a + '+', 'g'); var L = new RegExp('^' + a + '+|((?:^|[^\\\\])(?:\\\\.)*)' + a + '+$', 'g')
    var Q = new RegExp('^' + a + '*,' + a + '*'); var Z = new RegExp('^' + a + '*([>+~]|' + a + ')' + a + '*')
    var ee = new RegExp('=' + a + "*([^\\]'\"]*?)" + a + '*\\]', 'g'); var te = new RegExp(G)
    var ne = new RegExp('^' + s + '$'); var f = {
      ID: new RegExp('^#(' + s + ')'),
      CLASS: new RegExp('^\\.(' + s + ')'),
      TAG: new RegExp('^(' + s + '|[*])'),
      ATTR: new RegExp('^' + J),
      PSEUDO: new RegExp('^' + G),
      CHILD: new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + a + '*(even|odd|(([+-]|)(\\d*)n|)' + a + '*(?:([+-]|)' + a + '*(\\d+)|))' + a + '*\\)|)', 'i'),
      bool: new RegExp('^(?:' + Y + ')$', 'i'),
      needsContext: new RegExp('^' + a + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + a + '*((?:-\\d)?\\d*)' + a + '*\\)|)(?=[^-]|$)', 'i')
    }; var re = /^(?:input|select|textarea|button)$/i; var ie = /^h\d$/i; var c = /^[^{]+\{\s*\[native \w/
    var oe = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/; var ae = /[+~]/; var se = /'|\\/g
    var d = new RegExp('\\\\([\\da-f]{1,6}' + a + '?|(' + a + ')|.)', 'ig'); var p = function (e, t, n) {
      var r = '0x' + t - 65536
      return r != r || n ? t : r < 0 ? String.fromCharCode(65536 + r) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
    }; var ue = function () {
      C()
    }
    try {
      D.apply(n = V.call(v.childNodes), v.childNodes), n[v.childNodes.length].nodeType
    } catch (F) {
      D = {
        apply: n.length ? function (e, t) {
          U.apply(e, V.call(t))
        } : function (e, t) {
          for (var n = e.length, r = 0; e[n++] = t[r++];) ;
          e.length = n - 1
        }
      }
    }

    function H (e, t, n, r) {
      var i; var o; var a; var s; var u; var l; var c; var f; var d = t && t.ownerDocument; var p = t ? t.nodeType : 9
      if (n = n || [], typeof e !== 'string' || !e || p !== 1 && p !== 9 && p !== 11) return n
      if (!r && ((t ? t.ownerDocument || t : v) !== E && C(t), t = t || E, N)) {
        if (p !== 11 && (l = oe.exec(e))) {
          if (i = l[1]) {
            if (p === 9) {
              if (!(a = t.getElementById(i))) return n
              if (a.id === i) return n.push(a), n
            } else if (d && (a = d.getElementById(i)) && y(t, a) && a.id === i) return n.push(a), n
          } else {
            if (l[2]) return D.apply(n, t.getElementsByTagName(e)), n
            if ((i = l[3]) && g.getElementsByClassName && t.getElementsByClassName) return D.apply(n, t.getElementsByClassName(i)), n
          }
        }
        if (g.qsa && !A[e + ' '] && (!m || !m.test(e))) {
          if (p !== 1) d = t, f = e; else if (t.nodeName.toLowerCase() !== 'object') {
            for ((s = t.getAttribute('id')) ? s = s.replace(se, '\\$&') : t.setAttribute('id', s = k), o = (c = w(e)).length, u = ne.test(s) ? '#' + s : "[id='" + s + "']"; o--;) c[o] = u + ' ' + _(c[o])
            f = c.join(','), d = ae.test(e) && de(t.parentNode) || t
          }
          if (f) {
            try {
              return D.apply(n, d.querySelectorAll(f)), n
            } catch (h) {
            } finally {
              s === k && t.removeAttribute('id')
            }
          }
        }
      }
      return P(e.replace(L, '$1'), t, n, r)
    }

    function le () {
      var n = []

      function r (e, t) {
        return n.push(e + ' ') > b.cacheLength && delete r[n.shift()], r[e + ' '] = t
      }

      return r
    }

    function q (e) {
      return e[k] = !0, e
    }

    function h (e) {
      var t = E.createElement('div')
      try {
        return !!e(t)
      } catch (F) {
        return !1
      } finally {
        t.parentNode && t.parentNode.removeChild(t)
      }
    }

    function ce (e, t) {
      for (var n = e.split('|'), r = n.length; r--;) b.attrHandle[n[r]] = t
    }

    function fe (e, t) {
      var n = t && e
      var r = n && e.nodeType === 1 && t.nodeType === 1 && (~t.sourceIndex || 1 << 31) - (~e.sourceIndex || 1 << 31)
      if (r) return r
      if (n) for (; n = n.nextSibling;) if (n === t) return -1
      return e ? 1 : -1
    }

    function x (a) {
      return q(function (o) {
        return o = +o, q(function (e, t) {
          for (var n, r = a([], e.length, o), i = r.length; i--;) e[n = r[i]] && (e[n] = !(t[n] = e[n]))
        })
      })
    }

    function de (e) {
      return e && typeof e.getElementsByTagName !== 'undefined' && e
    }

    for (e in g = H.support = {}, O = H.isXML = function (e) {
      e = e && (e.ownerDocument || e).documentElement
      return !!e && e.nodeName !== 'HTML'
    }, C = H.setDocument = function (e) {
      var e = e ? e.ownerDocument || e : v
      return e !== E && e.nodeType === 9 && e.documentElement && (t = (E = e).documentElement, N = !O(E), (e = E.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener('unload', ue, !1) : e.attachEvent && e.attachEvent('onunload', ue)), g.attributes = h(function (e) {
        return e.className = 'i', !e.getAttribute('className')
      }), g.getElementsByTagName = h(function (e) {
        return e.appendChild(E.createComment('')), !e.getElementsByTagName('*').length
      }), g.getElementsByClassName = c.test(E.getElementsByClassName), g.getById = h(function (e) {
        return t.appendChild(e).id = k, !E.getElementsByName || !E.getElementsByName(k).length
      }), g.getById ? (b.find.ID = function (e, t) {
        if (typeof t.getElementById !== 'undefined' && N) return (e = t.getElementById(e)) ? [e] : []
      }, b.filter.ID = function (e) {
        var t = e.replace(d, p)
        return function (e) {
          return e.getAttribute('id') === t
        }
      }) : (delete b.find.ID, b.filter.ID = function (e) {
        var t = e.replace(d, p)
        return function (e) {
          e = typeof e.getAttributeNode !== 'undefined' && e.getAttributeNode('id')
          return e && e.value === t
        }
      }), b.find.TAG = g.getElementsByTagName ? function (e, t) {
        return typeof t.getElementsByTagName !== 'undefined' ? t.getElementsByTagName(e) : g.qsa ? t.querySelectorAll(e) : void 0
      } : function (e, t) {
        var n; var r = []; var i = 0; var o = t.getElementsByTagName(e)
        if (e !== '*') return o
        for (; n = o[i++];) n.nodeType === 1 && r.push(n)
        return r
      }, b.find.CLASS = g.getElementsByClassName && function (e, t) {
        if (typeof t.getElementsByClassName !== 'undefined' && N) return t.getElementsByClassName(e)
      }, r = [], m = [], (g.qsa = c.test(E.querySelectorAll)) && (h(function (e) {
        t.appendChild(e).innerHTML = "<a id='" + k + "'></a><select id='" + k + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && m.push('[*^$]=' + a + "*(?:''|\"\")"), e.querySelectorAll('[selected]').length || m.push('\\[' + a + '*(?:value|' + Y + ')'), e.querySelectorAll('[id~=' + k + '-]').length || m.push('~='), e.querySelectorAll(':checked').length || m.push(':checked'), e.querySelectorAll('a#' + k + '+*').length || m.push('.#.+[+~]')
      }), h(function (e) {
        var t = E.createElement('input')
        t.setAttribute('type', 'hidden'), e.appendChild(t).setAttribute('name', 'D'), e.querySelectorAll('[name=d]').length && m.push('name' + a + '*[*^$|!~]?='), e.querySelectorAll(':enabled').length || m.push(':enabled', ':disabled'), e.querySelectorAll('*,:x'), m.push(',.*:')
      })), (g.matchesSelector = c.test(i = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.msMatchesSelector)) && h(function (e) {
        g.disconnectedMatch = i.call(e, 'div'), i.call(e, "[s!='']:x"), r.push('!=', G)
      }), m = m.length && new RegExp(m.join('|')), r = r.length && new RegExp(r.join('|')), e = c.test(t.compareDocumentPosition), y = e || c.test(t.contains) ? function (e, t) {
        var n = e.nodeType === 9 ? e.documentElement : e; var t = t && t.parentNode
        return e === t || !(!t || t.nodeType !== 1 || !(n.contains ? n.contains(t) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(t)))
      } : function (e, t) {
        if (t) for (; t = t.parentNode;) if (t === e) return !0
        return !1
      }, $ = e ? function (e, t) {
        if (e === t) return l = !0, 0
        var n = !e.compareDocumentPosition - !t.compareDocumentPosition
        return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !g.sortDetached && t.compareDocumentPosition(e) === n ? e === E || e.ownerDocument === v && y(v, e) ? -1 : t === E || t.ownerDocument === v && y(v, t) ? 1 : u ? j(u, e) - j(u, t) : 0 : 4 & n ? -1 : 1)
      } : function (e, t) {
        if (e === t) return l = !0, 0
        var n; var r = 0; var i = e.parentNode; var o = t.parentNode; var a = [e]; var s = [t]
        if (!i || !o) return e === E ? -1 : t === E ? 1 : i ? -1 : o ? 1 : u ? j(u, e) - j(u, t) : 0
        if (i === o) return fe(e, t)
        for (n = e; n = n.parentNode;) a.unshift(n)
        for (n = t; n = n.parentNode;) s.unshift(n)
        for (; a[r] === s[r];) r++
        return r ? fe(a[r], s[r]) : a[r] === v ? -1 : s[r] === v ? 1 : 0
      }), E
    }, H.matches = function (e, t) {
      return H(e, null, null, t)
    }, H.matchesSelector = function (e, t) {
      if ((e.ownerDocument || e) !== E && C(e), t = t.replace(ee, "='$1']"), g.matchesSelector && N && !A[t + ' '] && (!r || !r.test(t)) && (!m || !m.test(t))) {
        try {
          var n = i.call(e, t)
          if (n || g.disconnectedMatch || e.document && e.document.nodeType !== 11) return n
        } catch (F) {
        }
      }
      return H(t, E, null, [e]).length > 0
    }, H.contains = function (e, t) {
      return (e.ownerDocument || e) !== E && C(e), y(e, t)
    }, H.attr = function (e, t) {
      (e.ownerDocument || e) !== E && C(e)
      var n = b.attrHandle[t.toLowerCase()]
      var n = n && z.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !N) : undefined
      return n !== undefined ? n : g.attributes || !N ? e.getAttribute(t) : (n = e.getAttributeNode(t)) && n.specified ? n.value : null
    }, H.error = function (e) {
      throw new Error('Syntax error, unrecognized expression: ' + e)
    }, H.uniqueSort = function (e) {
      var t; var n = []; var r = 0; var i = 0
      if (l = !g.detectDuplicates, u = !g.sortStable && e.slice(0), e.sort($), l) {
        for (; t = e[i++];) t === e[i] && (r = n.push(i))
        for (; r--;) e.splice(n[r], 1)
      }
      return u = null, e
    }, o = H.getText = function (e) {
      var t; var n = ''; var r = 0; var i = e.nodeType
      if (i) {
        if (i === 1 || i === 9 || i === 11) {
          if (typeof e.textContent === 'string') return e.textContent
          for (e = e.firstChild; e; e = e.nextSibling) n += o(e)
        } else if (i === 3 || i === 4) return e.nodeValue
      } else for (; t = e[r++];) n += o(t)
      return n
    }, (b = H.selectors = {
      cacheLength: 50,
      createPseudo: q,
      match: f,
      attrHandle: {},
      find: {},
      relative: {
        '>': { dir: 'parentNode', first: !0 },
        ' ': { dir: 'parentNode' },
        '+': { dir: 'previousSibling', first: !0 },
        '~': { dir: 'previousSibling' }
      },
      preFilter: {
        ATTR: function (e) {
          return e[1] = e[1].replace(d, p), e[3] = (e[3] || e[4] || e[5] || '').replace(d, p), e[2] === '~=' && (e[3] = ' ' + e[3] + ' '), e.slice(0, 4)
        },
        CHILD: function (e) {
          return e[1] = e[1].toLowerCase(), e[1].slice(0, 3) === 'nth' ? (e[3] || H.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * (e[3] === 'even' || e[3] === 'odd')), e[5] = +(e[7] + e[8] || e[3] === 'odd')) : e[3] && H.error(e[0]), e
        },
        PSEUDO: function (e) {
          var t; var n = !e[6] && e[2]
          return f.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || '' : n && te.test(n) && (t = w(n, !0)) && (t = n.indexOf(')', n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
        }
      },
      filter: {
        TAG: function (e) {
          var t = e.replace(d, p).toLowerCase()
          return e === '*' ? function () {
            return !0
          } : function (e) {
            return e.nodeName && e.nodeName.toLowerCase() === t
          }
        },
        CLASS: function (e) {
          var t = W[e + ' ']
          return t || (t = new RegExp('(^|' + a + ')' + e + '(' + a + '|$)')) && W(e, function (e) {
            return t.test(typeof e.className === 'string' && e.className || typeof e.getAttribute !== 'undefined' && e.getAttribute('class') || '')
          })
        },
        ATTR: function (t, n, r) {
          return function (e) {
            e = H.attr(e, t)
            return e == null ? n === '!=' : !n || (e += '', n === '=' ? e === r : n === '!=' ? e !== r : n === '^=' ? r && e.indexOf(r) === 0 : n === '*=' ? r && e.indexOf(r) > -1 : n === '$=' ? r && e.slice(-r.length) === r : n === '~=' ? (' ' + e.replace(K, ' ') + ' ').indexOf(r) > -1 : n === '|=' && (e === r || e.slice(0, r.length + 1) === r + '-'))
          }
        },
        CHILD: function (h, e, t, g, m) {
          var y = h.slice(0, 3) !== 'nth'; var v = h.slice(-4) !== 'last'; var x = e === 'of-type'
          return g === 1 && m === 0 ? function (e) {
            return !!e.parentNode
          } : function (e, t, n) {
            var r; var i; var o; var a; var s; var u; var l = y != v ? 'nextSibling' : 'previousSibling'; var c = e.parentNode
            var f = x && e.nodeName.toLowerCase(); var d = !n && !x; var p = !1
            if (c) {
              if (y) {
                for (; l;) {
                  for (a = e; a = a[l];) if (x ? a.nodeName.toLowerCase() === f : a.nodeType === 1) return !1
                  u = l = h === 'only' && !u && 'nextSibling'
                }
                return !0
              }
              if (u = [v ? c.firstChild : c.lastChild], v && d) {
                for (p = (s = (r = (i = (o = (a = c)[k] || (a[k] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === S && r[1]) && r[2], a = s && c.childNodes[s]; a = ++s && a && a[l] || (p = s = 0) || u.pop();) {
                  if (a.nodeType === 1 && ++p && a === e) {
                    i[h] = [S, s, p]
                    break
                  }
                }
              } else if (!1 === (p = d ? s = (r = (i = (o = (a = e)[k] || (a[k] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === S && r[1] : p)) for (; (a = ++s && a && a[l] || (p = s = 0) || u.pop()) && ((x ? a.nodeName.toLowerCase() !== f : a.nodeType !== 1) || !++p || (d && ((i = (o = a[k] || (a[k] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] = [S, p]), a !== e));) ;
              return (p -= m) === g || p % g == 0 && p / g >= 0
            }
          }
        },
        PSEUDO: function (e, o) {
          var t; var a = b.pseudos[e] || b.setFilters[e.toLowerCase()] || H.error('unsupported pseudo: ' + e)
          return a[k] ? a(o) : a.length > 1 ? (t = [e, e, '', o], b.setFilters.hasOwnProperty(e.toLowerCase()) ? q(function (e, t) {
            for (var n, r = a(e, o), i = r.length; i--;) e[n = j(e, r[i])] = !(t[n] = r[i])
          }) : function (e) {
            return a(e, 0, t)
          }) : a
        }
      },
      pseudos: {
        not: q(function (e) {
          var r = []; var i = []; var s = R(e.replace(L, '$1'))
          return s[k] ? q(function (e, t, n, r) {
            for (var i, o = s(e, null, r, []), a = e.length; a--;) (i = o[a]) && (e[a] = !(t[a] = i))
          }) : function (e, t, n) {
            return r[0] = e, s(r, null, n, i), r[0] = null, !i.pop()
          }
        }),
        has: q(function (t) {
          return function (e) {
            return H(t, e).length > 0
          }
        }),
        contains: q(function (t) {
          return t = t.replace(d, p), function (e) {
            return (e.textContent || e.innerText || o(e)).indexOf(t) > -1
          }
        }),
        lang: q(function (n) {
          return ne.test(n || '') || H.error('unsupported lang: ' + n), n = n.replace(d, p).toLowerCase(), function (e) {
            var t
            do {
              if (t = N ? e.lang : e.getAttribute('xml:lang') || e.getAttribute('lang')) return (t = t.toLowerCase()) === n || t.indexOf(n + '-') === 0
            } while ((e = e.parentNode) && e.nodeType === 1)
            return !1
          }
        }),
        target: function (e) {
          var t = M.location && M.location.hash
          return t && t.slice(1) === e.id
        },
        root: function (e) {
          return e === t
        },
        focus: function (e) {
          return e === E.activeElement && (!E.hasFocus || E.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
        },
        enabled: function (e) {
          return !1 === e.disabled
        },
        disabled: function (e) {
          return !0 === e.disabled
        },
        checked: function (e) {
          var t = e.nodeName.toLowerCase()
          return t === 'input' && !!e.checked || t === 'option' && !!e.selected
        },
        selected: function (e) {
          return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
        },
        empty: function (e) {
          for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1
          return !0
        },
        parent: function (e) {
          return !b.pseudos.empty(e)
        },
        header: function (e) {
          return ie.test(e.nodeName)
        },
        input: function (e) {
          return re.test(e.nodeName)
        },
        button: function (e) {
          var t = e.nodeName.toLowerCase()
          return t === 'input' && e.type === 'button' || t === 'button'
        },
        text: function (e) {
          return e.nodeName.toLowerCase() === 'input' && e.type === 'text' && ((e = e.getAttribute('type')) == null || e.toLowerCase() === 'text')
        },
        first: x(function () {
          return [0]
        }),
        last: x(function (e, t) {
          return [t - 1]
        }),
        eq: x(function (e, t, n) {
          return [n < 0 ? n + t : n]
        }),
        even: x(function (e, t) {
          for (var n = 0; n < t; n += 2) e.push(n)
          return e
        }),
        odd: x(function (e, t) {
          for (var n = 1; n < t; n += 2) e.push(n)
          return e
        }),
        lt: x(function (e, t, n) {
          for (var r = n < 0 ? n + t : n; --r >= 0;) e.push(r)
          return e
        }),
        gt: x(function (e, t, n) {
          for (var r = n < 0 ? n + t : n; ++r < t;) e.push(r)
          return e
        })
      }
    }).pseudos.nth = b.pseudos.eq, {
      radio: !0,
      checkbox: !0,
      file: !0,
      password: !0,
      image: !0
    }) {
      b.pseudos[e] = (function (t) {
        return function (e) {
          return e.nodeName.toLowerCase() === 'input' && e.type === t
        }
      }(e))
    }
    for (e in { submit: !0, reset: !0 }) {
      b.pseudos[e] = (function (n) {
        return function (e) {
          var t = e.nodeName.toLowerCase()
          return (t === 'input' || t === 'button') && e.type === n
        }
      }(e))
    }

    function pe () {
    }

    function _ (e) {
      for (var t = 0, n = e.length, r = ''; t < n; t++) r += e[t].value
      return r
    }

    function he (a, e, t) {
      var s = e.dir; var u = t && s === 'parentNode'; var l = B++
      return e.first ? function (e, t, n) {
        for (; e = e[s];) if (e.nodeType === 1 || u) return a(e, t, n)
      } : function (e, t, n) {
        var r; var i; var o = [S, l]
        if (n) {
          for (; e = e[s];) if ((e.nodeType === 1 || u) && a(e, t, n)) return !0
        } else {
          for (; e = e[s];) {
            if (e.nodeType === 1 || u) {
              if ((r = (i = (i = e[k] || (e[k] = {}))[e.uniqueID] || (i[e.uniqueID] = {}))[s]) && r[0] === S && r[1] === l) return o[2] = r[2]
              if ((i[s] = o)[2] = a(e, t, n)) return !0
            }
          }
        }
      }
    }

    function ge (i) {
      return i.length > 1 ? function (e, t, n) {
        for (var r = i.length; r--;) if (!i[r](e, t, n)) return !1
        return !0
      } : i[0]
    }

    function me (e, t, n, r, i) {
      for (var o, a = [], s = 0, u = e.length, l = t != null; s < u; s++) !(o = e[s]) || n && !n(o, r, i) || (a.push(o), l && t.push(s))
      return a
    }

    function ye (p, h, g, m, y, e) {
      return m && !m[k] && (m = ye(m)), y && !y[k] && (y = ye(y, e)), q(function (e, t, n, r) {
        var i; var o; var a; var s = []; var u = []; var l = t.length; var c = e || (function (e, t, n) {
          for (var r = 0, i = t.length; r < i; r++) H(e, t[r], n)
          return n
        }(h || '*', n.nodeType ? [n] : n, [])); var f = !p || !e && h ? c : me(c, s, p, n, r)
        var d = g ? y || (e ? p : l || m) ? [] : t : f
        if (g && g(f, d, n, r), m) for (i = me(d, u), m(i, [], n, r), o = i.length; o--;) (a = i[o]) && (d[u[o]] = !(f[u[o]] = a))
        if (e) {
          if (y || p) {
            if (y) {
              for (i = [], o = d.length; o--;) (a = d[o]) && i.push(f[o] = a)
              y(null, d = [], i, r)
            }
            for (o = d.length; o--;) (a = d[o]) && (i = y ? j(e, a) : s[o]) > -1 && (e[i] = !(t[i] = a))
          }
        } else d = me(d === t ? d.splice(l, d.length) : d), y ? y(null, t, d, r) : D.apply(t, d)
      })
    }

    return pe.prototype = b.filters = b.pseudos, b.setFilters = new pe(), w = H.tokenize = function (e, t) {
      var n; var r; var i; var o; var a; var s; var u; var l = I[e + ' ']
      if (l) return t ? 0 : l.slice(0)
      for (a = e, s = [], u = b.preFilter; a;) {
        for (o in n && !(r = Q.exec(a)) || (r && (a = a.slice(r[0].length) || a), s.push(i = [])), n = !1, (r = Z.exec(a)) && (n = r.shift(), i.push({
          value: n,
          type: r[0].replace(L, ' ')
        }), a = a.slice(n.length)), b.filter) {
          !(r = f[o].exec(a)) || u[o] && !(r = u[o](r)) || (n = r.shift(), i.push({
            value: n,
            type: o,
            matches: r
          }), a = a.slice(n.length))
        }
        if (!n) break
      }
      return t ? a.length : a ? H.error(e) : I(e, s).slice(0)
    }, R = H.compile = function (e, t) {
      var n; var m; var y; var v; var x; var r; var i = []; var o = []; var a = A[e + ' ']
      if (!a) {
        for (n = (t = t || w(e)).length; n--;) {
          ((a = (function f (e) {
            for (var r, t, n, i = e.length, o = b.relative[e[0].type], a = o || b.relative[' '], s = o ? 1 : 0, u = he(function (e) {
                return e === r
              }, a, !0), l = he(function (e) {
                return j(r, e) > -1
              }, a, !0), c = [function (e, t, n) {
                return e = !o && (n || t !== T) || ((r = t).nodeType ? u : l)(e, t, n), r = null, e
              }]; s < i; s++) {
              if (t = b.relative[e[s].type]) c = [he(ge(c), t)]; else {
                if ((t = b.filter[e[s].type].apply(null, e[s].matches))[k]) {
                  for (n = ++s; n < i && !b.relative[e[n].type]; n++) ;
                  return ye(s > 1 && ge(c), s > 1 && _(e.slice(0, s - 1).concat({ value: e[s - 2].type === ' ' ? '*' : '' })).replace(L, '$1'), t, s < n && f(e.slice(s, n)), n < i && f(e = e.slice(n)), n < i && _(e))
                }
                c.push(t)
              }
            }
            return ge(c)
          }(t[n])))[k] ? i : o).push(a)
        }
        (a = A(e, (m = o, v = (y = i).length > 0, x = m.length > 0, r = function (e, t, n, r, i) {
          var o; var a; var s; var u = 0; var l = '0'; var c = e && []; var f = []; var d = T; var p = e || x && b.find.TAG('*', i)
          var h = S += d == null ? 1 : Math.random() || 0.1; var g = p.length
          for (i && (T = t === E || t || i); l !== g && (o = p[l]) != null; l++) {
            if (x && o) {
              for (a = 0, t || o.ownerDocument === E || (C(o), n = !N); s = m[a++];) {
                if (s(o, t || E, n)) {
                  r.push(o)
                  break
                }
              }
              i && (S = h)
            }
            v && ((o = !s && o) && u--, e && c.push(o))
          }
          if (u += l, v && l !== u) {
            for (a = 0; s = y[a++];) s(c, f, t, n)
            if (e) {
              if (u > 0) for (; l--;) c[l] || f[l] || (f[l] = X.call(r))
              f = me(f)
            }
            D.apply(r, f), i && !e && f.length > 0 && u + y.length > 1 && H.uniqueSort(r)
          }
          return i && (S = h, T = d), c
        }, v ? q(r) : r))).selector = e
      }
      return a
    }, P = H.select = function (e, t, n, r) {
      var i; var o; var a; var s; var u; var l = typeof e === 'function' && e; var c = !r && w(e = l.selector || e)
      if (n = n || [], c.length === 1) {
        if ((o = c[0] = c[0].slice(0)).length > 2 && (a = o[0]).type === 'ID' && g.getById && t.nodeType === 9 && N && b.relative[o[1].type]) {
          if (!(t = (b.find.ID(a.matches[0].replace(d, p), t) || [])[0])) return n
          l && (t = t.parentNode), e = e.slice(o.shift().value.length)
        }
        for (i = f.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !b.relative[s = a.type]);) {
          if ((u = b.find[s]) && (r = u(a.matches[0].replace(d, p), ae.test(o[0].type) && de(t.parentNode) || t))) {
            if (o.splice(i, 1), e = r.length && _(o)) break
            return D.apply(n, r), n
          }
        }
      }
      return (l || R(e, c))(r, t, !N, n, !t || ae.test(e) && de(t.parentNode) || t), n
    }, g.sortStable = k.split('').sort($).join('') === k, g.detectDuplicates = !!l, C(), g.sortDetached = h(function (e) {
      return 1 & e.compareDocumentPosition(E.createElement('div'))
    }), h(function (e) {
      return e.innerHTML = "<a href='#'></a>", e.firstChild.getAttribute('href') === '#'
    }) || ce('type|href|height|width', function (e, t, n) {
      if (!n) return e.getAttribute(t, t.toLowerCase() === 'type' ? 1 : 2)
    }), g.attributes && h(function (e) {
      return e.innerHTML = '<input/>', e.firstChild.setAttribute('value', ''), e.firstChild.getAttribute('value') === ''
    }) || ce('value', function (e, t, n) {
      if (!n && e.nodeName.toLowerCase() === 'input') return e.defaultValue
    }), h(function (e) {
      return e.getAttribute('disabled') == null
    }) || ce(Y, function (e, t, n) {
      if (!n) return !0 === e[t] ? t.toLowerCase() : (n = e.getAttributeNode(t)) && n.specified ? n.value : null
    }), H
  }(T))
  var r = (C.find = e, C.expr = e.selectors, C.expr[':'] = C.expr.pseudos, C.uniqueSort = C.unique = e.uniqueSort, C.text = e.getText, C.isXMLDoc = e.isXML, C.contains = e.contains, function (e, t, n) {
    for (var r = [], i = n !== undefined; (e = e[t]) && e.nodeType !== 9;) {
      if (e.nodeType === 1) {
        if (i && C(e).is(n)) break
        r.push(e)
      }
    }
    return r
  }); var V = function (e, t) {
    for (var n = []; e; e = e.nextSibling) e.nodeType === 1 && e !== t && n.push(e)
    return n
  }; var Y = C.expr.match.needsContext; var J = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/; var G = /^.[^:#\[\.,]*$/

  function K (e, n, r) {
    if (C.isFunction(n)) {
      return C.grep(e, function (e, t) {
        return !!n.call(e, t, e) !== r
      })
    }
    if (n.nodeType) {
      return C.grep(e, function (e) {
        return e === n !== r
      })
    }
    if (typeof n === 'string') {
      if (G.test(n)) return C.filter(n, e, r)
      n = C.filter(n, e)
    }
    return C.grep(e, function (e) {
      return C.inArray(e, n) > -1 !== r
    })
  }

  C.filter = function (e, t, n) {
    var r = t[0]
    return n && (e = ':not(' + e + ')'), t.length === 1 && r.nodeType === 1 ? C.find.matchesSelector(r, e) ? [r] : [] : C.find.matches(e, C.grep(t, function (e) {
      return e.nodeType === 1
    }))
  }, C.fn.extend({
    find: function (e) {
      var t; var n = []; var r = this; var i = r.length
      if (typeof e !== 'string') {
        return this.pushStack(C(e).filter(function () {
          for (t = 0; t < i; t++) if (C.contains(r[t], this)) return !0
        }))
      }
      for (t = 0; t < i; t++) C.find(e, r[t], n)
      return (n = this.pushStack(i > 1 ? C.unique(n) : n)).selector = this.selector ? this.selector + ' ' + e : e, n
    },
    filter: function (e) {
      return this.pushStack(K(this, e || [], !1))
    },
    not: function (e) {
      return this.pushStack(K(this, e || [], !0))
    },
    is: function (e) {
      return !!K(this, typeof e === 'string' && Y.test(e) ? C(e) : e || [], !1).length
    }
  })
  var Q; var Z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/; var ee = ((C.fn.init = function (e, t, n) {
    if (!e) return this
    if (n = n || Q, typeof e !== 'string') return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : C.isFunction(e) ? typeof n.ready !== 'undefined' ? n.ready(e) : e(C) : (e.selector !== undefined && (this.selector = e.selector, this.context = e.context), C.makeArray(e, this))
    if (!(r = e.charAt(0) === '<' && e.charAt(e.length - 1) === '>' && e.length >= 3 ? [null, e, null] : Z.exec(e)) || !r[1] && t) return (!t || t.jquery ? t || n : this.constructor(t)).find(e)
    if (r[1]) {
      if (t = t instanceof C ? t[0] : t, C.merge(this, C.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : g, !0)), J.test(r[1]) && C.isPlainObject(t)) for (var r in t) C.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r])
      return this
    }
    if ((n = g.getElementById(r[2])) && n.parentNode) {
      if (n.id !== r[2]) return Q.find(e)
      this.length = 1, this[0] = n
    }
    return this.context = g, this.selector = e, this
  }).prototype = C.fn, Q = C(g), /^(?:parents|prev(?:Until|All))/)
  var te = { children: !0, contents: !0, next: !0, prev: !0 }

  function ne (e, t) {
    for (; (e = e[t]) && e.nodeType !== 1;) ;
    return e
  }

  C.fn.extend({
    has: function (e) {
      var t; var n = C(e, this); var r = n.length
      return this.filter(function () {
        for (t = 0; t < r; t++) if (C.contains(this, n[t])) return !0
      })
    },
    closest: function (e, t) {
      for (var n, r = 0, i = this.length, o = [], a = Y.test(e) || typeof e !== 'string' ? C(e, t || this.context) : 0; r < i; r++) {
        for (n = this[r]; n && n !== t; n = n.parentNode) {
          if (n.nodeType < 11 && (a ? a.index(n) > -1 : n.nodeType === 1 && C.find.matchesSelector(n, e))) {
            o.push(n)
            break
          }
        }
      }
      return this.pushStack(o.length > 1 ? C.uniqueSort(o) : o)
    },
    index: function (e) {
      return e ? typeof e === 'string' ? C.inArray(this[0], C(e)) : C.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    },
    add: function (e, t) {
      return this.pushStack(C.uniqueSort(C.merge(this.get(), C(e, t))))
    },
    addBack: function (e) {
      return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
    }
  }), C.each({
    parent: function (e) {
      e = e.parentNode
      return e && e.nodeType !== 11 ? e : null
    },
    parents: function (e) {
      return r(e, 'parentNode')
    },
    parentsUntil: function (e, t, n) {
      return r(e, 'parentNode', n)
    },
    next: function (e) {
      return ne(e, 'nextSibling')
    },
    prev: function (e) {
      return ne(e, 'previousSibling')
    },
    nextAll: function (e) {
      return r(e, 'nextSibling')
    },
    prevAll: function (e) {
      return r(e, 'previousSibling')
    },
    nextUntil: function (e, t, n) {
      return r(e, 'nextSibling', n)
    },
    prevUntil: function (e, t, n) {
      return r(e, 'previousSibling', n)
    },
    siblings: function (e) {
      return V((e.parentNode || {}).firstChild, e)
    },
    children: function (e) {
      return V(e.firstChild)
    },
    contents: function (e) {
      return C.nodeName(e, 'iframe') ? e.contentDocument || e.contentWindow.document : C.merge([], e.childNodes)
    }
  }, function (r, i) {
    C.fn[r] = function (e, t) {
      var n = C.map(this, i, e)
      return (t = r.slice(-5) !== 'Until' ? e : t) && typeof t === 'string' && (n = C.filter(t, n)), this.length > 1 && (te[r] || (n = C.uniqueSort(n)), ee.test(r) && (n = n.reverse())), this.pushStack(n)
    }
  })
  var re; var ie; var E = /\S+/g

  function oe () {
    g.addEventListener ? (g.removeEventListener('DOMContentLoaded', i), T.removeEventListener('load', i)) : (g.detachEvent('onreadystatechange', i), T.detachEvent('onload', i))
  }

  function i () {
    !g.addEventListener && T.event.type !== 'load' && g.readyState !== 'complete' || (oe(), C.ready())
  }

  for (ie in C.Callbacks = function (r) {
    var e, n
    r = typeof r === 'string' ? (e = r, n = {}, C.each(e.match(E) || [], function (e, t) {
      n[t] = !0
    }), n) : C.extend({}, r)
    var i; var t; var o; var a; var s = []; var u = []; var l = -1; var c = function () {
      for (a = r.once, o = i = !0; u.length; l = -1) for (t = u.shift(); ++l < s.length;) !1 === s[l].apply(t[0], t[1]) && r.stopOnFalse && (l = s.length, t = !1)
      r.memory || (t = !1), i = !1, a && (s = t ? [] : '')
    }; var f = {
      add: function () {
        return s && (t && !i && (l = s.length - 1, u.push(t)), (function n (e) {
          C.each(e, function (e, t) {
            C.isFunction(t) ? r.unique && f.has(t) || s.push(t) : t && t.length && C.type(t) !== 'string' && n(t)
          })
        }(arguments)), t && !i && c()), this
      },
      remove: function () {
        return C.each(arguments, function (e, t) {
          for (var n; (n = C.inArray(t, s, n)) > -1;) s.splice(n, 1), n <= l && l--
        }), this
      },
      has: function (e) {
        return e ? C.inArray(e, s) > -1 : s.length > 0
      },
      empty: function () {
        return s = s && [], this
      },
      disable: function () {
        return a = u = [], s = t = '', this
      },
      disabled: function () {
        return !s
      },
      lock: function () {
        return a = !0, t || f.disable(), this
      },
      locked: function () {
        return !!a
      },
      fireWith: function (e, t) {
        return a || (t = [e, (t = t || []).slice ? t.slice() : t], u.push(t), i || c()), this
      },
      fire: function () {
        return f.fireWith(this, arguments), this
      },
      fired: function () {
        return !!o
      }
    }
    return f
  }, C.extend({
    Deferred: function (e) {
      var o = [['resolve', 'done', C.Callbacks('once memory'), 'resolved'], ['reject', 'fail', C.Callbacks('once memory'), 'rejected'], ['notify', 'progress', C.Callbacks('memory')]]
      var i = 'pending'; var a = {
        state: function () {
          return i
        },
        always: function () {
          return s.done(arguments).fail(arguments), this
        },
        then: function () {
          var i = arguments
          return C.Deferred(function (r) {
            C.each(o, function (e, t) {
              var n = C.isFunction(i[e]) && i[e]
              s[t[1]](function () {
                var e = n && n.apply(this, arguments)
                e && C.isFunction(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + 'With'](this === a ? r.promise() : this, n ? [e] : arguments)
              })
            }), i = null
          }).promise()
        },
        promise: function (e) {
          return e != null ? C.extend(e, a) : a
        }
      }; var s = {}
      return a.pipe = a.then, C.each(o, function (e, t) {
        var n = t[2]; var r = t[3]
        a[t[1]] = n.add, r && n.add(function () {
          i = r
        }, o[1 ^ e][2].disable, o[2][2].lock), s[t[0]] = function () {
          return s[t[0] + 'With'](this === s ? a : this, arguments), this
        }, s[t[0] + 'With'] = n.fireWith
      }), a.promise(s), e && e.call(s, s), s
    },
    when: function (e) {
      var i; var t; var n; var r = 0; var o = c.call(arguments); var a = o.length
      var s = a !== 1 || e && C.isFunction(e.promise) ? a : 0; var u = s === 1 ? e : C.Deferred()
      var l = function (t, n, r) {
        return function (e) {
          n[t] = this, r[t] = arguments.length > 1 ? c.call(arguments) : e, r === i ? u.notifyWith(n, r) : --s || u.resolveWith(n, r)
        }
      }
      if (a > 1) for (i = new Array(a), t = new Array(a), n = new Array(a); r < a; r++) o[r] && C.isFunction(o[r].promise) ? o[r].promise().progress(l(r, t, i)).done(l(r, n, o)).fail(u.reject) : --s
      return s || u.resolveWith(n, o), u.promise()
    }
  }), C.fn.ready = function (e) {
    return C.ready.promise().done(e), this
  }, C.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function (e) {
      e ? C.readyWait++ : C.ready(!0)
    },
    ready: function (e) {
      (!0 === e ? --C.readyWait : C.isReady) || (C.isReady = !0) !== e && --C.readyWait > 0 || (re.resolveWith(g, [C]), C.fn.triggerHandler && (C(g).triggerHandler('ready'), C(g).off('ready')))
    }
  }), C.ready.promise = function (e) {
    if (!re) {
      if (re = C.Deferred(), g.readyState === 'complete' || g.readyState !== 'loading' && !g.documentElement.doScroll) T.setTimeout(C.ready); else if (g.addEventListener) g.addEventListener('DOMContentLoaded', i), T.addEventListener('load', i); else {
        g.attachEvent('onreadystatechange', i), T.attachEvent('onload', i)
        var t = !1
        try {
          t = T.frameElement == null && g.documentElement
        } catch (n) {
        }
        t && t.doScroll && !(function r () {
          if (!C.isReady) {
            try {
              t.doScroll('left')
            } catch (n) {
              return T.setTimeout(r, 50)
            }
            oe(), C.ready()
          }
        }())
      }
    }
    return re.promise(e)
  }, C.ready.promise(), C(y)) break
  y.ownFirst = ie === '0', y.inlineBlockNeedsLayout = !1, C(function () {
    var e; var t; var n = g.getElementsByTagName('body')[0]
    n && n.style && (e = g.createElement('div'), (t = g.createElement('div')).style.cssText = 'position:absolute;border:0;width:0;height:0;top:0;left:-9999px', n.appendChild(t).appendChild(e), typeof e.style.zoom !== 'undefined' && (e.style.cssText = 'display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1', y.inlineBlockNeedsLayout = e = e.offsetWidth === 3, e && (n.style.zoom = 1)), n.removeChild(t))
  })
  e = g.createElement('div')
  y.deleteExpando = !0
  try {
    delete e.test
  } catch (yn) {
    y.deleteExpando = !1
  }
  var o; var v = function (e) {
    var t = C.noData[(e.nodeName + ' ').toLowerCase()]; var n = +e.nodeType || 1
    return (n === 1 || n === 9) && (!t || !0 !== t && e.getAttribute('classid') === t)
  }; var ae = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/; var se = /([A-Z])/g

  function ue (e, t, n) {
    if (n === undefined && e.nodeType === 1) {
      var r = 'data-' + t.replace(se, '-$1').toLowerCase()
      if (typeof (n = e.getAttribute(r)) === 'string') {
        try {
          n = n === 'true' || n !== 'false' && (n === 'null' ? null : +n + '' === n ? +n : ae.test(n) ? C.parseJSON(n) : n)
        } catch (i) {
        }
        C.data(e, t, n)
      } else n = undefined
    }
    return n
  }

  function le (e) {
    for (var t in e) if ((t !== 'data' || !C.isEmptyObject(e[t])) && t !== 'toJSON') return
    return 1
  }

  function ce (e, t, n, r) {
    if (v(e)) {
      var i; var o = C.expando; var a = e.nodeType; var s = a ? C.cache : e; var u = a ? e[o] : e[o] && o
      if (u && s[u] && (r || s[u].data) || n !== undefined || typeof t !== 'string') return s[u = u || (a ? e[o] = f.pop() || C.guid++ : o)] || (s[u] = a ? {} : { toJSON: C.noop }), typeof t !== 'object' && typeof t !== 'function' || (r ? s[u] = C.extend(s[u], t) : s[u].data = C.extend(s[u].data, t)), e = s[u], r || (e.data || (e.data = {}), e = e.data), n !== undefined && (e[C.camelCase(t)] = n), typeof t === 'string' ? (i = e[t]) == null && (i = e[C.camelCase(t)]) : i = e, i
    }
  }

  function fe (e, t, n) {
    if (v(e)) {
      var r; var i; var o = e.nodeType; var a = o ? C.cache : e; var s = o ? e[C.expando] : C.expando
      if (a[s]) {
        if (t && (r = n ? a[s] : a[s].data)) {
          i = (t = C.isArray(t) ? t.concat(C.map(t, C.camelCase)) : t in r || (t = C.camelCase(t)) in r ? [t] : t.split(' ')).length
          for (; i--;) delete r[t[i]]
          if (n ? !le(r) : !C.isEmptyObject(r)) return
        }
        (n || (delete a[s].data, le(a[s]))) && (o ? C.cleanData([e], !0) : y.deleteExpando || a != a.window ? delete a[s] : a[s] = undefined)
      }
    }
  }

  C.extend({
    cache: {},
    noData: { 'applet ': !0, 'embed ': !0, 'object ': 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' },
    hasData: function (e) {
      return !!(e = e.nodeType ? C.cache[e[C.expando]] : e[C.expando]) && !le(e)
    },
    data: function (e, t, n) {
      return ce(e, t, n)
    },
    removeData: function (e, t) {
      return fe(e, t)
    },
    _data: function (e, t, n) {
      return ce(e, t, n, !0)
    },
    _removeData: function (e, t) {
      return fe(e, t, !0)
    }
  }), C.fn.extend({
    data: function (e, t) {
      var n; var r; var i; var o = this[0]; var a = o && o.attributes
      if (e !== undefined) {
        return typeof e === 'object' ? this.each(function () {
          C.data(this, e)
        }) : arguments.length > 1 ? this.each(function () {
          C.data(this, e, t)
        }) : o ? ue(o, e, C.data(o, e)) : undefined
      }
      if (this.length && (i = C.data(o), o.nodeType === 1 && !C._data(o, 'parsedAttrs'))) {
        for (n = a.length; n--;) a[n] && (r = a[n].name).indexOf('data-') === 0 && ue(o, r = C.camelCase(r.slice(5)), i[r])
        C._data(o, 'parsedAttrs', !0)
      }
      return i
    },
    removeData: function (e) {
      return this.each(function () {
        C.removeData(this, e)
      })
    }
  }), C.extend({
    queue: function (e, t, n) {
      var r
      if (e) return r = C._data(e, t = (t || 'fx') + 'queue'), n && (!r || C.isArray(n) ? r = C._data(e, t, C.makeArray(n)) : r.push(n)), r || []
    },
    dequeue: function (e, t) {
      t = t || 'fx'
      var n = C.queue(e, t); var r = n.length; var i = n.shift(); var o = C._queueHooks(e, t)
      i === 'inprogress' && (i = n.shift(), r--), i && (t === 'fx' && n.unshift('inprogress'), delete o.stop, i.call(e, function () {
        C.dequeue(e, t)
      }, o)), !r && o && o.empty.fire()
    },
    _queueHooks: function (e, t) {
      var n = t + 'queueHooks'
      return C._data(e, n) || C._data(e, n, {
        empty: C.Callbacks('once memory').add(function () {
          C._removeData(e, t + 'queue'), C._removeData(e, n)
        })
      })
    }
  }), C.fn.extend({
    queue: function (t, n) {
      var e = 2
      return typeof t !== 'string' && (n = t, t = 'fx', e--), arguments.length < e ? C.queue(this[0], t) : n === undefined ? this : this.each(function () {
        var e = C.queue(this, t, n)
        C._queueHooks(this, t), t === 'fx' && e[0] !== 'inprogress' && C.dequeue(this, t)
      })
    },
    dequeue: function (e) {
      return this.each(function () {
        C.dequeue(this, e)
      })
    },
    clearQueue: function (e) {
      return this.queue(e || 'fx', [])
    },
    promise: function (e, t) {
      var n; var r = 1; var i = C.Deferred(); var o = this; var a = this.length; var s = function () {
        --r || i.resolveWith(o, [o])
      }
      for (typeof e !== 'string' && (t = e, e = undefined), e = e || 'fx'; a--;) (n = C._data(o[a], e + 'queueHooks')) && n.empty && (r++, n.empty.add(s))
      return s(), i.promise(t)
    }
  }), y.shrinkWrapBlocks = function () {
    return o != null ? o : (o = !1, (t = g.getElementsByTagName('body')[0]) && t.style ? (e = g.createElement('div'), (n = g.createElement('div')).style.cssText = 'position:absolute;border:0;width:0;height:0;top:0;left:-9999px', t.appendChild(n).appendChild(e), typeof e.style.zoom !== 'undefined' && (e.style.cssText = '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1', e.appendChild(g.createElement('div')).style.width = '5px', o = e.offsetWidth !== 3), t.removeChild(n), o) : void 0)
    var e, t, n
  }
  var e = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source; var de = new RegExp('^(?:([+-])=|)(' + e + ')([a-z%]*)$', 'i')
  var s = ['Top', 'Right', 'Bottom', 'Left']; var pe = function (e, t) {
    return C.css(e = t || e, 'display') === 'none' || !C.contains(e.ownerDocument, e)
  }

  function he (e, t, n, r) {
    var i; var o = 1; var a = 20; var s = r ? function () {
      return r.cur()
    } : function () {
      return C.css(e, t, '')
    }; var u = s(); var l = n && n[3] || (C.cssNumber[t] ? '' : 'px')
    var c = (C.cssNumber[t] || l !== 'px' && +u) && de.exec(C.css(e, t))
    if (c && c[3] !== l) for (l = l || c[3], n = n || [], c = +u || 1; c /= o = o || '.5', C.style(e, t, c + l), o !== (o = s() / u) && o !== 1 && --a;) ;
    return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i
  }

  var d = function (e, t, n, r, i, o, a) {
    var s = 0; var u = e.length; var l = n == null
    if (C.type(n) === 'object') for (s in i = !0, n) d(e, t, s, n[s], !0, o, a); else if (r !== undefined && (i = !0, C.isFunction(r) || (a = !0), t = l ? a ? (t.call(e, r), null) : (l = t, function (e, t, n) {
      return l.call(C(e), n)
    }) : t)) for (; s < u; s++) t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)))
    return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
  }; var ge = /^(?:checkbox|radio)$/i; var me = /<([\w:-]+)/; var ye = /^$|\/(?:java|ecma)script/i; var ve = /^\s+/
  var xe = 'abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video'

  function be (e) {
    var t = xe.split('|'); var n = e.createDocumentFragment()
    if (n.createElement) for (; t.length;) n.createElement(t.pop())
    return n
  }

  S = g.createElement('div'), k = g.createDocumentFragment(), q = g.createElement('input'), S.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", y.leadingWhitespace = S.firstChild.nodeType === 3, y.tbody = !S.getElementsByTagName('tbody').length, y.htmlSerialize = !!S.getElementsByTagName('link').length, y.html5Clone = g.createElement('nav').cloneNode(!0).outerHTML !== '<:nav></:nav>', q.type = 'checkbox', q.checked = !0, k.appendChild(q), y.appendChecked = q.checked, S.innerHTML = '<textarea>x</textarea>', y.noCloneChecked = !!S.cloneNode(!0).lastChild.defaultValue, k.appendChild(S), (q = g.createElement('input')).setAttribute('type', 'radio'), q.setAttribute('checked', 'checked'), q.setAttribute('name', 't'), S.appendChild(q), y.checkClone = S.cloneNode(!0).cloneNode(!0).lastChild.checked, y.noCloneEvent = !!S.addEventListener, S[C.expando] = 1, y.attributes = !S.getAttribute(C.expando)
  var x = {
    option: [1, "<select multiple='multiple'>", '</select>'],
    legend: [1, '<fieldset>', '</fieldset>'],
    area: [1, '<map>', '</map>'],
    param: [1, '<object>', '</object>'],
    thead: [1, '<table>', '</table>'],
    tr: [2, '<table><tbody>', '</tbody></table>'],
    col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
    td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
    _default: y.htmlSerialize ? [0, '', ''] : [1, 'X<div>', '</div>']
  }

  function b (e, t) {
    var n; var r; var i = 0
    var o = typeof e.getElementsByTagName !== 'undefined' ? e.getElementsByTagName(t || '*') : typeof e.querySelectorAll !== 'undefined' ? e.querySelectorAll(t || '*') : undefined
    if (!o) for (o = [], n = e.childNodes || e; (r = n[i]) != null; i++) !t || C.nodeName(r, t) ? o.push(r) : C.merge(o, b(r, t))
    return t === undefined || t && C.nodeName(e, t) ? C.merge([e], o) : o
  }

  function we (e, t) {
    for (var n, r = 0; (n = e[r]) != null; r++) C._data(n, 'globalEval', !t || C._data(t[r], 'globalEval'))
  }

  x.optgroup = x.option, x.tbody = x.tfoot = x.colgroup = x.caption = x.thead, x.th = x.td
  var Te = /<|&#?\w+;/; var Ce = /<tbody/i

  function Ee (e) {
    ge.test(e.type) && (e.defaultChecked = e.checked)
  }

  function Ne (e, t, n, r, i) {
    for (var o, a, s, u, l, c, f, d = e.length, p = be(t), h = [], g = 0; g < d; g++) {
      if ((a = e[g]) || a === 0) {
        if (C.type(a) === 'object') C.merge(h, a.nodeType ? [a] : a); else if (Te.test(a)) {
          for (u = u || p.appendChild(t.createElement('div')), l = (me.exec(a) || ['', ''])[1].toLowerCase(), f = x[l] || x._default, u.innerHTML = f[1] + C.htmlPrefilter(a) + f[2], o = f[0]; o--;) u = u.lastChild
          if (!y.leadingWhitespace && ve.test(a) && h.push(t.createTextNode(ve.exec(a)[0])), !y.tbody) for (o = (a = l !== 'table' || Ce.test(a) ? f[1] !== '<table>' || Ce.test(a) ? 0 : u : u.firstChild) && a.childNodes.length; o--;) C.nodeName(c = a.childNodes[o], 'tbody') && !c.childNodes.length && a.removeChild(c)
          for (C.merge(h, u.childNodes), u.textContent = ''; u.firstChild;) u.removeChild(u.firstChild)
          u = p.lastChild
        } else h.push(t.createTextNode(a))
      }
    }
    for (u && p.removeChild(u), y.appendChecked || C.grep(b(h, 'input'), Ee), g = 0; a = h[g++];) if (r && C.inArray(a, r) > -1) i && i.push(a); else if (s = C.contains(a.ownerDocument, a), u = b(p.appendChild(a), 'script'), s && we(u), n) for (o = 0; a = u[o++];) ye.test(a.type || '') && n.push(a)
    return u = null, p
  }

  var ke; var Se; var Ae = g.createElement('div')
  for (ke in {
    submit: !0,
    change: !0,
    focusin: !0
  }) (y[ke] = (Se = 'on' + ke) in T) || (Ae.setAttribute(Se, 't'), y[ke] = !1 === Ae.attributes[Se].expando)
  var De = /^(?:input|select|textarea)$/i; var je = /^key/; var Le = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
  var He = /^(?:focusinfocus|focusoutblur)$/; var qe = /^([^.]*)(?:\.(.+)|)/

  function _e () {
    return !0
  }

  function u () {
    return !1
  }

  function Fe () {
    try {
      return g.activeElement
    } catch (e) {
    }
  }

  function Me (e, t, n, r, i, o) {
    var a, s
    if (typeof t === 'object') {
      for (s in typeof n !== 'string' && (r = r || n, n = undefined), t) Me(e, s, n, r, t[s], o)
      return e
    }
    if (r == null && i == null ? (i = n, r = n = undefined) : i == null && (typeof n === 'string' ? (i = r, r = undefined) : (i = r, r = n, n = undefined)), !1 === i) i = u; else if (!i) return e
    return o === 1 && (a = i, (i = function (e) {
      return C().off(e), a.apply(this, arguments)
    }).guid = a.guid || (a.guid = C.guid++)), e.each(function () {
      C.event.add(this, t, i, r, n)
    })
  }

  C.event = {
    global: {},
    add: function (e, t, n, r, i) {
      var o; var a; var s; var u; var l; var c; var f; var d; var p; var h = C._data(e)
      if (h) {
        for (n.handler && (n = (s = n).handler, i = s.selector), n.guid || (n.guid = C.guid++), (o = h.events) || (o = h.events = {}), (l = h.handle) || ((l = h.handle = function (e) {
          return void 0 === C || e && C.event.triggered === e.type ? undefined : C.event.dispatch.apply(l.elem, arguments)
        }).elem = e), a = (t = (t || '').match(E) || ['']).length; a--;) {
          f = p = (d = qe.exec(t[a]) || [])[1], d = (d[2] || '').split('.').sort(), f && (u = C.event.special[f] || {}, f = (i ? u.delegateType : u.bindType) || f, u = C.event.special[f] || {}, p = C.extend({
            type: f,
            origType: p,
            data: r,
            handler: n,
            guid: n.guid,
            selector: i,
            needsContext: i && C.expr.match.needsContext.test(i),
            namespace: d.join('.')
          }, s), (c = o[f]) || ((c = o[f] = []).delegateCount = 0, u.setup && !1 !== u.setup.call(e, r, d, l) || (e.addEventListener ? e.addEventListener(f, l, !1) : e.attachEvent && e.attachEvent('on' + f, l))), u.add && (u.add.call(e, p), p.handler.guid || (p.handler.guid = n.guid)), i ? c.splice(c.delegateCount++, 0, p) : c.push(p), C.event.global[f] = !0)
        }
      }
    },
    remove: function (e, t, n, r, i) {
      var o; var a; var s; var u; var l; var c; var f; var d; var p; var h; var g; var m = C.hasData(e) && C._data(e)
      if (m && (c = m.events)) {
        for (l = (t = (t || '').match(E) || ['']).length; l--;) {
          if (p = g = (s = qe.exec(t[l]) || [])[1], h = (s[2] || '').split('.').sort(), p) {
            for (f = C.event.special[p] || {}, d = c[p = (r ? f.delegateType : f.bindType) || p] || [], s = s[2] && new RegExp('(^|\\.)' + h.join('\\.(?:.*\\.|)') + '(\\.|$)'), u = o = d.length; o--;) a = d[o], !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && (r !== '**' || !a.selector) || (d.splice(o, 1), a.selector && d.delegateCount--, f.remove && f.remove.call(e, a))
            u && !d.length && (f.teardown && !1 !== f.teardown.call(e, h, m.handle) || C.removeEvent(e, p, m.handle), delete c[p])
          } else for (p in c) C.event.remove(e, p + t[l], n, r, !0)
        }
        C.isEmptyObject(c) && (delete m.handle, C._removeData(e, 'events'))
      }
    },
    trigger: function (e, t, n, r) {
      var i; var o; var a; var s; var u; var l; var c = [n || g]; var f = m.call(e, 'type') ? e.type : e
      var d = m.call(e, 'namespace') ? e.namespace.split('.') : []; var p = u = n = n || g
      if (n.nodeType !== 3 && n.nodeType !== 8 && !He.test(f + C.event.triggered) && (f.indexOf('.') > -1 && (f = (d = f.split('.')).shift(), d.sort()), o = f.indexOf(':') < 0 && 'on' + f, (e = e[C.expando] ? e : new C.Event(f, typeof e === 'object' && e)).isTrigger = r ? 2 : 3, e.namespace = d.join('.'), e.rnamespace = e.namespace ? new RegExp('(^|\\.)' + d.join('\\.(?:.*\\.|)') + '(\\.|$)') : null, e.result = undefined, e.target || (e.target = n), t = t == null ? [e] : C.makeArray(t, [e]), s = C.event.special[f] || {}, r || !s.trigger || !1 !== s.trigger.apply(n, t))) {
        if (!r && !s.noBubble && !C.isWindow(n)) {
          for (a = s.delegateType || f, He.test(a + f) || (p = p.parentNode); p; p = p.parentNode) c.push(p), u = p
          u === (n.ownerDocument || g) && c.push(u.defaultView || u.parentWindow || T)
        }
        for (l = 0; (p = c[l++]) && !e.isPropagationStopped();) e.type = l > 1 ? a : s.bindType || f, (i = (C._data(p, 'events') || {})[e.type] && C._data(p, 'handle')) && i.apply(p, t), (i = o && p[o]) && i.apply && v(p) && (e.result = i.apply(p, t), !1 === e.result && e.preventDefault())
        if (e.type = f, !r && !e.isDefaultPrevented() && (!s._default || !1 === s._default.apply(c.pop(), t)) && v(n) && o && n[f] && !C.isWindow(n)) {
          (u = n[o]) && (n[o] = null), C.event.triggered = f
          try {
            n[f]()
          } catch (h) {
          }
          C.event.triggered = undefined, u && (n[o] = u)
        }
        return e.result
      }
    },
    dispatch: function (e) {
      e = C.event.fix(e)
      var t; var n; var r; var i; var o; var a = c.call(arguments); var s = (C._data(this, 'events') || {})[e.type] || []
      var u = C.event.special[e.type] || {}
      if ((a[0] = e).delegateTarget = this, !u.preDispatch || !1 !== u.preDispatch.call(this, e)) {
        for (o = C.event.handlers.call(this, e, s), t = 0; (r = o[t++]) && !e.isPropagationStopped();) for (e.currentTarget = r.elem, n = 0; (i = r.handlers[n++]) && !e.isImmediatePropagationStopped();) e.rnamespace && !e.rnamespace.test(i.namespace) || (e.handleObj = i, e.data = i.data, (i = ((C.event.special[i.origType] || {}).handle || i.handler).apply(r.elem, a)) !== undefined && !1 === (e.result = i) && (e.preventDefault(), e.stopPropagation()))
        return u.postDispatch && u.postDispatch.call(this, e), e.result
      }
    },
    handlers: function (e, t) {
      var n; var r; var i; var o; var a = []; var s = t.delegateCount; var u = e.target
      if (s && u.nodeType && (e.type !== 'click' || isNaN(e.button) || e.button < 1)) {
        for (; u != this; u = u.parentNode || this) {
          if (u.nodeType === 1 && (!0 !== u.disabled || e.type !== 'click')) {
            for (r = [], n = 0; n < s; n++) r[i = (o = t[n]).selector + ' '] === undefined && (r[i] = o.needsContext ? C(i, this).index(u) > -1 : C.find(i, this, null, [u]).length), r[i] && r.push(o)
            r.length && a.push({ elem: u, handlers: r })
          }
        }
      }
      return s < t.length && a.push({ elem: this, handlers: t.slice(s) }), a
    },
    fix: function (e) {
      if (e[C.expando]) return e
      var t; var n; var r; var i = e.type; var o = e; var a = this.fixHooks[i]
      for (a || (this.fixHooks[i] = a = Le.test(i) ? this.mouseHooks : je.test(i) ? this.keyHooks : {}), r = a.props ? this.props.concat(a.props) : this.props, e = new C.Event(o), t = r.length; t--;) e[n = r[t]] = o[n]
      return e.target || (e.target = o.srcElement || g), e.target.nodeType === 3 && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, a.filter ? a.filter(e, o) : e
    },
    props: 'altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(' '),
    fixHooks: {},
    keyHooks: {
      props: 'char charCode key keyCode'.split(' '),
      filter: function (e, t) {
        return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e
      }
    },
    mouseHooks: {
      props: 'button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement'.split(' '),
      filter: function (e, t) {
        var n; var r; var i = t.button; var o = t.fromElement
        return e.pageX == null && t.clientX != null && (r = (n = e.target.ownerDocument || g).documentElement, n = n.body, e.pageX = t.clientX + (r && r.scrollLeft || n && n.scrollLeft || 0) - (r && r.clientLeft || n && n.clientLeft || 0), e.pageY = t.clientY + (r && r.scrollTop || n && n.scrollTop || 0) - (r && r.clientTop || n && n.clientTop || 0)), !e.relatedTarget && o && (e.relatedTarget = o === e.target ? t.toElement : o), e.which || i === undefined || (e.which = 1 & i ? 1 : 2 & i ? 3 : 4 & i ? 2 : 0), e
      }
    },
    special: {
      load: { noBubble: !0 },
      focus: {
        trigger: function () {
          if (this !== Fe() && this.focus) {
            try {
              return this.focus(), !1
            } catch (e) {
            }
          }
        },
        delegateType: 'focusin'
      },
      blur: {
        trigger: function () {
          if (this === Fe() && this.blur) return this.blur(), !1
        },
        delegateType: 'focusout'
      },
      click: {
        trigger: function () {
          if (C.nodeName(this, 'input') && this.type === 'checkbox' && this.click) return this.click(), !1
        },
        _default: function (e) {
          return C.nodeName(e.target, 'a')
        }
      },
      beforeunload: {
        postDispatch: function (e) {
          e.result !== undefined && e.originalEvent && (e.originalEvent.returnValue = e.result)
        }
      }
    },
    simulate: function (e, t, n) {
      e = C.extend(new C.Event(), n, { type: e, isSimulated: !0 })
      C.event.trigger(e, null, t), e.isDefaultPrevented() && n.preventDefault()
    }
  }, C.removeEvent = g.removeEventListener ? function (e, t, n) {
    e.removeEventListener && e.removeEventListener(t, n)
  } : function (e, t, n) {
    t = 'on' + t
    e.detachEvent && (typeof e[t] === 'undefined' && (e[t] = null), e.detachEvent(t, n))
  }, C.Event = function (e, t) {
    if (!(this instanceof C.Event)) return new C.Event(e, t)
    e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === undefined && !1 === e.returnValue ? _e : u) : this.type = e, t && C.extend(this, t), this.timeStamp = e && e.timeStamp || C.now(), this[C.expando] = !0
  }, C.Event.prototype = {
    constructor: C.Event,
    isDefaultPrevented: u,
    isPropagationStopped: u,
    isImmediatePropagationStopped: u,
    preventDefault: function () {
      var e = this.originalEvent
      this.isDefaultPrevented = _e, e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
    },
    stopPropagation: function () {
      var e = this.originalEvent
      this.isPropagationStopped = _e, e && !this.isSimulated && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
    },
    stopImmediatePropagation: function () {
      var e = this.originalEvent
      this.isImmediatePropagationStopped = _e, e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation()
    }
  }, C.each({
    mouseenter: 'mouseover',
    mouseleave: 'mouseout',
    pointerenter: 'pointerover',
    pointerleave: 'pointerout'
  }, function (e, i) {
    C.event.special[e] = {
      delegateType: i,
      bindType: i,
      handle: function (e) {
        var t; var n = e.relatedTarget; var r = e.handleObj
        return n && (n === this || C.contains(this, n)) || (e.type = r.origType, t = r.handler.apply(this, arguments), e.type = i), t
      }
    }
  }), y.submit || (C.event.special.submit = {
    setup: function () {
      if (C.nodeName(this, 'form')) return !1
      C.event.add(this, 'click._submit keypress._submit', function (e) {
        e = e.target, e = C.nodeName(e, 'input') || C.nodeName(e, 'button') ? C.prop(e, 'form') : undefined
        e && !C._data(e, 'submit') && (C.event.add(e, 'submit._submit', function (e) {
          e._submitBubble = !0
        }), C._data(e, 'submit', !0))
      })
    },
    postDispatch: function (e) {
      e._submitBubble && (delete e._submitBubble, this.parentNode && !e.isTrigger && C.event.simulate('submit', this.parentNode, e))
    },
    teardown: function () {
      if (C.nodeName(this, 'form')) return !1
      C.event.remove(this, '._submit')
    }
  }), y.change || (C.event.special.change = {
    setup: function () {
      if (De.test(this.nodeName)) {
        return this.type !== 'checkbox' && this.type !== 'radio' || (C.event.add(this, 'propertychange._change', function (e) {
          e.originalEvent.propertyName === 'checked' && (this._justChanged = !0)
        }), C.event.add(this, 'click._change', function (e) {
          this._justChanged && !e.isTrigger && (this._justChanged = !1), C.event.simulate('change', this, e)
        })), !1
      }
      C.event.add(this, 'beforeactivate._change', function (e) {
        e = e.target
        De.test(e.nodeName) && !C._data(e, 'change') && (C.event.add(e, 'change._change', function (e) {
          !this.parentNode || e.isSimulated || e.isTrigger || C.event.simulate('change', this.parentNode, e)
        }), C._data(e, 'change', !0))
      })
    },
    handle: function (e) {
      var t = e.target
      if (this !== t || e.isSimulated || e.isTrigger || t.type !== 'radio' && t.type !== 'checkbox') return e.handleObj.handler.apply(this, arguments)
    },
    teardown: function () {
      return C.event.remove(this, '._change'), !De.test(this.nodeName)
    }
  }), y.focusin || C.each({ focus: 'focusin', blur: 'focusout' }, function (n, r) {
    var i = function (e) {
      C.event.simulate(r, e.target, C.event.fix(e))
    }
    C.event.special[r] = {
      setup: function () {
        var e = this.ownerDocument || this; var t = C._data(e, r)
        t || e.addEventListener(n, i, !0), C._data(e, r, (t || 0) + 1)
      },
      teardown: function () {
        var e = this.ownerDocument || this; var t = C._data(e, r) - 1
        t ? C._data(e, r, t) : (e.removeEventListener(n, i, !0), C._removeData(e, r))
      }
    }
  }), C.fn.extend({
    on: function (e, t, n, r) {
      return Me(this, e, t, n, r)
    },
    one: function (e, t, n, r) {
      return Me(this, e, t, n, r, 1)
    },
    off: function (e, t, n) {
      var r, i
      if (e && e.preventDefault && e.handleObj) return r = e.handleObj, C(e.delegateTarget).off(r.namespace ? r.origType + '.' + r.namespace : r.origType, r.selector, r.handler), this
      if (typeof e !== 'object') {
        return !1 !== t && typeof t !== 'function' || (n = t, t = undefined), !1 === n && (n = u), this.each(function () {
          C.event.remove(this, e, n, t)
        })
      }
      for (i in e) this.off(i, t, e[i])
      return this
    },
    trigger: function (e, t) {
      return this.each(function () {
        C.event.trigger(e, t, this)
      })
    },
    triggerHandler: function (e, t) {
      var n = this[0]
      if (n) return C.event.trigger(e, t, n, !0)
    }
  })
  var Oe = / jQuery\d+="(?:null|\d+)"/g; var Re = new RegExp('<(?:' + xe + ')[\\s/>]', 'i')
  var Pe = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi; var Be = /<script|<style|<link/i
  var We = /checked\s*(?:[^=]|=\s*.checked.)/i; var Ie = /^true\/(.*)/; var $e = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
  var ze = be(g).appendChild(g.createElement('div'))

  function Xe (e, t) {
    return C.nodeName(e, 'table') && C.nodeName(t.nodeType !== 11 ? t : t.firstChild, 'tr') ? e.getElementsByTagName('tbody')[0] || e.appendChild(e.ownerDocument.createElement('tbody')) : e
  }

  function Ue (e) {
    return e.type = (C.find.attr(e, 'type') !== null) + '/' + e.type, e
  }

  function Ve (e) {
    var t = Ie.exec(e.type)
    return t ? e.type = t[1] : e.removeAttribute('type'), e
  }

  function Ye (e, t) {
    if (t.nodeType === 1 && C.hasData(e)) {
      var n; var r; var i; var e = C._data(e); var o = C._data(t, e); var a = e.events
      if (a) for (n in delete o.handle, o.events = {}, a) for (r = 0, i = a[n].length; r < i; r++) C.event.add(t, n, a[n][r])
      o.data && (o.data = C.extend({}, o.data))
    }
  }

  function w (n, r, i, o) {
    r = O.apply([], r)
    var e; var t; var a; var s; var u; var l; var c = 0; var f = n.length; var d = f - 1; var p = r[0]; var h = C.isFunction(p)
    if (h || f > 1 && typeof p === 'string' && !y.checkClone && We.test(p)) {
      return n.each(function (e) {
        var t = n.eq(e)
        h && (r[0] = p.call(this, e, t.html())), w(t, r, i, o)
      })
    }
    if (f && (e = (l = Ne(r, n[0].ownerDocument, !1, n, o)).firstChild, l.childNodes.length === 1 && (l = e), e || o)) {
      for (a = (s = C.map(b(l, 'script'), Ue)).length; c < f; c++) t = l, c !== d && (t = C.clone(t, !0, !0), a && C.merge(s, b(t, 'script'))), i.call(n[c], t, c)
      if (a) for (u = s[s.length - 1].ownerDocument, C.map(s, Ve), c = 0; c < a; c++) t = s[c], ye.test(t.type || '') && !C._data(t, 'globalEval') && C.contains(u, t) && (t.src ? C._evalUrl && C._evalUrl(t.src) : C.globalEval((t.text || t.textContent || t.innerHTML || '').replace($e, '')))
      l = e = null
    }
    return n
  }

  function Je (e, t, n) {
    for (var r, i = t ? C.filter(t, e) : e, o = 0; (r = i[o]) != null; o++) n || r.nodeType !== 1 || C.cleanData(b(r)), r.parentNode && (n && C.contains(r.ownerDocument, r) && we(b(r, 'script')), r.parentNode.removeChild(r))
    return e
  }

  C.extend({
    htmlPrefilter: function (e) {
      return e.replace(Pe, '<$1></$2>')
    },
    clone: function (e, t, n) {
      var r; var i; var o; var a; var s; var u = C.contains(e.ownerDocument, e)
      if (y.html5Clone || C.isXMLDoc(e) || !Re.test('<' + e.nodeName + '>') ? o = e.cloneNode(!0) : (ze.innerHTML = e.outerHTML, ze.removeChild(o = ze.firstChild)), !(y.noCloneEvent && y.noCloneChecked || e.nodeType !== 1 && e.nodeType !== 11 || C.isXMLDoc(e))) {
        for (r = b(o), s = b(e), a = 0; (i = s[a]) != null; ++a) {
          if (r[a]) {
            f = c = l = p = d = void 0
            var l; var c; var f; var d = i; var p = r[a]
            if (p.nodeType === 1) {
              if (l = p.nodeName.toLowerCase(), !y.noCloneEvent && p[C.expando]) {
                for (c in (f = C._data(p)).events) C.removeEvent(p, c, f.handle)
                p.removeAttribute(C.expando)
              }
              l === 'script' && p.text !== d.text ? (Ue(p).text = d.text, Ve(p)) : l === 'object' ? (p.parentNode && (p.outerHTML = d.outerHTML), y.html5Clone && d.innerHTML && !C.trim(p.innerHTML) && (p.innerHTML = d.innerHTML)) : l === 'input' && ge.test(d.type) ? (p.defaultChecked = p.checked = d.checked, p.value !== d.value && (p.value = d.value)) : l === 'option' ? p.defaultSelected = p.selected = d.defaultSelected : l !== 'input' && l !== 'textarea' || (p.defaultValue = d.defaultValue)
            }
          }
        }
      }
      if (t) if (n) for (s = s || b(e), r = r || b(o), a = 0; (i = s[a]) != null; a++) Ye(i, r[a]); else Ye(e, o)
      return (r = b(o, 'script')).length > 0 && we(r, !u && b(e, 'script')), r = s = i = null, o
    },
    cleanData: function (e, t) {
      for (var n, r, i, o, a = 0, s = C.expando, u = C.cache, l = y.attributes, c = C.event.special; (n = e[a]) != null; a++) {
        if ((t || v(n)) && (o = (i = n[s]) && u[i])) {
          if (o.events) for (r in o.events) c[r] ? C.event.remove(n, r) : C.removeEvent(n, r, o.handle)
          u[i] && (delete u[i], l || typeof n.removeAttribute === 'undefined' ? n[s] = undefined : n.removeAttribute(s), f.push(i))
        }
      }
    }
  }), C.fn.extend({
    domManip: w,
    detach: function (e) {
      return Je(this, e, !0)
    },
    remove: function (e) {
      return Je(this, e)
    },
    text: function (e) {
      return d(this, function (e) {
        return e === undefined ? C.text(this) : this.empty().append((this[0] && this[0].ownerDocument || g).createTextNode(e))
      }, null, e, arguments.length)
    },
    append: function () {
      return w(this, arguments, function (e) {
        this.nodeType !== 1 && this.nodeType !== 11 && this.nodeType !== 9 || Xe(this, e).appendChild(e)
      })
    },
    prepend: function () {
      return w(this, arguments, function (e) {
        var t
        this.nodeType !== 1 && this.nodeType !== 11 && this.nodeType !== 9 || (t = Xe(this, e)).insertBefore(e, t.firstChild)
      })
    },
    before: function () {
      return w(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this)
      })
    },
    after: function () {
      return w(this, arguments, function (e) {
        this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
      })
    },
    empty: function () {
      for (var e, t = 0; (e = this[t]) != null; t++) {
        for (e.nodeType === 1 && C.cleanData(b(e, !1)); e.firstChild;) e.removeChild(e.firstChild)
        e.options && C.nodeName(e, 'select') && (e.options.length = 0)
      }
      return this
    },
    clone: function (e, t) {
      return e = e != null && e, t = t == null ? e : t, this.map(function () {
        return C.clone(this, e, t)
      })
    },
    html: function (e) {
      return d(this, function (e) {
        var t = this[0] || {}; var n = 0; var r = this.length
        if (e === undefined) return t.nodeType === 1 ? t.innerHTML.replace(Oe, '') : undefined
        if (typeof e === 'string' && !Be.test(e) && (y.htmlSerialize || !Re.test(e)) && (y.leadingWhitespace || !ve.test(e)) && !x[(me.exec(e) || ['', ''])[1].toLowerCase()]) {
          e = C.htmlPrefilter(e)
          try {
            for (; n < r; n++) (t = this[n] || {}).nodeType === 1 && (C.cleanData(b(t, !1)), t.innerHTML = e)
            t = 0
          } catch (i) {
          }
        }
        t && this.empty().append(e)
      }, null, e, arguments.length)
    },
    replaceWith: function () {
      var n = []
      return w(this, arguments, function (e) {
        var t = this.parentNode
        C.inArray(this, n) < 0 && (C.cleanData(b(this)), t && t.replaceChild(e, this))
      }, n)
    }
  }), C.each({
    appendTo: 'append',
    prependTo: 'prepend',
    insertBefore: 'before',
    insertAfter: 'after',
    replaceAll: 'replaceWith'
  }, function (e, a) {
    C.fn[e] = function (e) {
      for (var t, n = 0, r = [], i = C(e), o = i.length - 1; n <= o; n++) t = n === o ? this : this.clone(!0), C(i[n])[a](t), R.apply(r, t.get())
      return this.pushStack(r)
    }
  })
  var Ge; var Ke = { HTML: 'block', BODY: 'block' }

  function Qe (e, t) {
    e = C(t.createElement(e)).appendTo(t.body), t = C.css(e[0], 'display')
    return e.detach(), t
  }

  function Ze (e) {
    var t = g; var n = Ke[e]
    return n || ((n = Qe(e, t)) !== 'none' && n || ((t = ((Ge = (Ge || C("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement))[0].contentWindow || Ge[0].contentDocument).document).write(), t.close(), n = Qe(e, t), Ge.detach()), Ke[e] = n), n
  }

  var n; var et; var tt; var nt; var rt; var it; var ot; var a; var at = /^margin/; var st = new RegExp('^(' + e + ')(?!px)[a-z%]+$', 'i')
  var ut = function (e, t, n, r) {
    var i; var o = {}
    for (i in t) o[i] = e.style[i], e.style[i] = t[i]
    for (i in r = n.apply(e, r || []), t) e.style[i] = o[i]
    return r
  }; var lt = g.documentElement

  function t () {
    var e; var t = g.documentElement
    t.appendChild(ot), a.style.cssText = '-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%', n = tt = it = !1, et = rt = !0, T.getComputedStyle && (e = T.getComputedStyle(a), n = (e || {}).top !== '1%', it = (e || {}).marginLeft === '2px', tt = (e || { width: '4px' }).width === '4px', a.style.marginRight = '50%', et = (e || { marginRight: '4px' }).marginRight === '4px', (e = a.appendChild(g.createElement('div'))).style.cssText = a.style.cssText = '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0', e.style.marginRight = e.style.width = '0', a.style.width = '1px', rt = !parseFloat((T.getComputedStyle(e) || {}).marginRight), a.removeChild(e)), a.style.display = 'none', (nt = a.getClientRects().length === 0) && (a.style.display = '', a.innerHTML = '<table><tr><td></td><td>t</td></tr></table>', a.childNodes[0].style.borderCollapse = 'separate', (e = a.getElementsByTagName('td'))[0].style.cssText = 'margin:0;border:0;padding:0;display:none', (nt = e[0].offsetHeight === 0) && (e[0].style.display = '', e[1].style.display = 'none', nt = e[0].offsetHeight === 0)), t.removeChild(ot)
  }

  ot = g.createElement('div'), (a = g.createElement('div')).style && (a.style.cssText = 'float:left;opacity:.5', y.opacity = a.style.opacity === '0.5', y.cssFloat = !!a.style.cssFloat, a.style.backgroundClip = 'content-box', a.cloneNode(!0).style.backgroundClip = '', y.clearCloneStyle = a.style.backgroundClip === 'content-box', (ot = g.createElement('div')).style.cssText = 'border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute', a.innerHTML = '', ot.appendChild(a), y.boxSizing = a.style.boxSizing === '' || a.style.MozBoxSizing === '' || a.style.WebkitBoxSizing === '', C.extend(y, {
    reliableHiddenOffsets: function () {
      return n == null && t(), nt
    },
    boxSizingReliable: function () {
      return n == null && t(), tt
    },
    pixelMarginRight: function () {
      return n == null && t(), et
    },
    pixelPosition: function () {
      return n == null && t(), n
    },
    reliableMarginRight: function () {
      return n == null && t(), rt
    },
    reliableMarginLeft: function () {
      return n == null && t(), it
    }
  }))
  var l; var p; var ct = /^(top|right|bottom|left)$/

  function ft (e, t) {
    return {
      get: function () {
        if (!e()) return (this.get = t).apply(this, arguments)
        delete this.get
      }
    }
  }

  T.getComputedStyle ? (l = function (e) {
    var t = e.ownerDocument.defaultView
    return (t = t && t.opener ? t : T).getComputedStyle(e)
  }, p = function (e, t, n) {
    var r; var i; var o = e.style
    return (i = (n = n || l(e)) ? n.getPropertyValue(t) || n[t] : undefined) !== '' && i !== undefined || C.contains(e.ownerDocument, e) || (i = C.style(e, t)), n && !y.pixelMarginRight() && st.test(i) && at.test(t) && (e = o.width, t = o.minWidth, r = o.maxWidth, o.minWidth = o.maxWidth = o.width = i, i = n.width, o.width = e, o.minWidth = t, o.maxWidth = r), i === undefined ? i : i + ''
  }) : lt.currentStyle && (l = function (e) {
    return e.currentStyle
  }, p = function (e, t, n) {
    var r; var i; var o; var a = e.style
    return (n = (n = n || l(e)) ? n[t] : undefined) == null && a && a[t] && (n = a[t]), st.test(n) && !ct.test(t) && (r = a.left, (o = (i = e.runtimeStyle) && i.left) && (i.left = e.currentStyle.left), a.left = t === 'fontSize' ? '1em' : n, n = a.pixelLeft + 'px', a.left = r, o && (i.left = o)), n === undefined ? n : n + '' || 'auto'
  })
  var dt = /alpha\([^)]*\)/i; var pt = /opacity\s*=\s*([^)]*)/i; var ht = /^(none|table(?!-c[ea]).+)/
  var gt = new RegExp('^(' + e + ')(.*)$', 'i'); var mt = { position: 'absolute', visibility: 'hidden', display: 'block' }
  var yt = { letterSpacing: '0', fontWeight: '400' }; var vt = ['Webkit', 'O', 'Moz', 'ms']
  var xt = g.createElement('div').style

  function bt (e) {
    if (e in xt) return e
    for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = vt.length; n--;) if ((e = vt[n] + t) in xt) return e
  }

  function wt (e, t) {
    for (var n, r, i, o = [], a = 0, s = e.length; a < s; a++) (r = e[a]).style && (o[a] = C._data(r, 'olddisplay'), n = r.style.display, t ? (o[a] || n !== 'none' || (r.style.display = ''), r.style.display === '' && pe(r) && (o[a] = C._data(r, 'olddisplay', Ze(r.nodeName)))) : (i = pe(r), (n && n !== 'none' || !i) && C._data(r, 'olddisplay', i ? n : C.css(r, 'display'))))
    for (a = 0; a < s; a++) !(r = e[a]).style || t && r.style.display !== 'none' && r.style.display !== '' || (r.style.display = t ? o[a] || '' : 'none')
    return e
  }

  function Tt (e, t, n) {
    var r = gt.exec(t)
    return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || 'px') : t
  }

  function Ct (e, t, n, r, i) {
    for (var o = n === (r ? 'border' : 'content') ? 4 : t === 'width' ? 1 : 0, a = 0; o < 4; o += 2) n === 'margin' && (a += C.css(e, n + s[o], !0, i)), r ? (n === 'content' && (a -= C.css(e, 'padding' + s[o], !0, i)), n !== 'margin' && (a -= C.css(e, 'border' + s[o] + 'Width', !0, i))) : (a += C.css(e, 'padding' + s[o], !0, i), n !== 'padding' && (a += C.css(e, 'border' + s[o] + 'Width', !0, i)))
    return a
  }

  function Et (e, t, n) {
    var r = !0; var i = t === 'width' ? e.offsetWidth : e.offsetHeight; var o = l(e)
    var a = y.boxSizing && C.css(e, 'boxSizing', !1, o) === 'border-box'
    if (i <= 0 || i == null) {
      if (((i = p(e, t, o)) < 0 || i == null) && (i = e.style[t]), st.test(i)) return i
      r = a && (y.boxSizingReliable() || i === e.style[t]), i = parseFloat(i) || 0
    }
    return i + Ct(e, t, n || (a ? 'border' : 'content'), r, o) + 'px'
  }

  function h (e, t, n, r, i) {
    return new h.prototype.init(e, t, n, r, i)
  }

  C.extend({
    cssHooks: {
      opacity: {
        get: function (e, t) {
          if (t) return (t = p(e, 'opacity')) === '' ? '1' : t
        }
      }
    },
    cssNumber: {
      animationIterationCount: !0,
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: { float: y.cssFloat ? 'cssFloat' : 'styleFloat' },
    style: function (e, t, n, r) {
      if (e && e.nodeType !== 3 && e.nodeType !== 8 && e.style) {
        var i; var o; var a; var s = C.camelCase(t); var u = e.style
        if (t = C.cssProps[s] || (C.cssProps[s] = bt(s) || s), a = C.cssHooks[t] || C.cssHooks[s], n === undefined) return a && 'get' in a && (i = a.get(e, !1, r)) !== undefined ? i : u[t]
        if ((o = typeof n) === 'string' && (i = de.exec(n)) && i[1] && (n = he(e, t, i), o = 'number'), n != null && n == n && (o === 'number' && (n += i && i[3] || (C.cssNumber[s] ? '' : 'px')), y.clearCloneStyle || n !== '' || t.indexOf('background') !== 0 || (u[t] = 'inherit'), !(a && 'set' in a && (n = a.set(e, n, r)) === undefined))) {
          try {
            u[t] = n
          } catch (l) {
          }
        }
      }
    },
    css: function (e, t, n, r) {
      var i; var o = C.camelCase(t)
      return t = C.cssProps[o] || (C.cssProps[o] = bt(o) || o), (i = (i = (o = C.cssHooks[t] || C.cssHooks[o]) && 'get' in o ? o.get(e, !0, n) : i) === undefined ? p(e, t, r) : i) === 'normal' && t in yt && (i = yt[t]), n === '' || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i
    }
  }), C.each(['height', 'width'], function (e, i) {
    C.cssHooks[i] = {
      get: function (e, t, n) {
        if (t) {
          return ht.test(C.css(e, 'display')) && e.offsetWidth === 0 ? ut(e, mt, function () {
            return Et(e, i, n)
          }) : Et(e, i, n)
        }
      },
      set: function (e, t, n) {
        var r = n && l(e)
        return Tt(0, t, n ? Ct(e, i, n, y.boxSizing && C.css(e, 'boxSizing', !1, r) === 'border-box', r) : 0)
      }
    }
  }), y.opacity || (C.cssHooks.opacity = {
    get: function (e, t) {
      return pt.test((t && e.currentStyle ? e.currentStyle : e.style).filter || '') ? 0.01 * parseFloat(RegExp.$1) + '' : t ? '1' : ''
    },
    set: function (e, t) {
      var n = e.style; var e = e.currentStyle; var r = C.isNumeric(t) ? 'alpha(opacity=' + 100 * t + ')' : ''
      var i = e && e.filter || n.filter || '';
      ((n.zoom = 1) <= t || t === '') && C.trim(i.replace(dt, '')) === '' && n.removeAttribute && (n.removeAttribute('filter'), t === '' || e && !e.filter) || (n.filter = dt.test(i) ? i.replace(dt, r) : i + ' ' + r)
    }
  }), C.cssHooks.marginRight = ft(y.reliableMarginRight, function (e, t) {
    if (t) return ut(e, { display: 'inline-block' }, p, [e, 'marginRight'])
  }), C.cssHooks.marginLeft = ft(y.reliableMarginLeft, function (e, t) {
    if (t) {
      return (parseFloat(p(e, 'marginLeft')) || (C.contains(e.ownerDocument, e) ? e.getBoundingClientRect().left - ut(e, { marginLeft: 0 }, function () {
        return e.getBoundingClientRect().left
      }) : 0)) + 'px'
    }
  }), C.each({ margin: '', padding: '', border: 'Width' }, function (i, o) {
    C.cssHooks[i + o] = {
      expand: function (e) {
        for (var t = 0, n = {}, r = typeof e === 'string' ? e.split(' ') : [e]; t < 4; t++) n[i + s[t] + o] = r[t] || r[t - 2] || r[0]
        return n
      }
    }, at.test(i) || (C.cssHooks[i + o].set = Tt)
  }), C.fn.extend({
    css: function (e, t) {
      return d(this, function (e, t, n) {
        var r; var i; var o = {}; var a = 0
        if (C.isArray(t)) {
          for (r = l(e), i = t.length; a < i; a++) o[t[a]] = C.css(e, t[a], !1, r)
          return o
        }
        return n !== undefined ? C.style(e, t, n) : C.css(e, t)
      }, e, t, arguments.length > 1)
    },
    show: function () {
      return wt(this, !0)
    },
    hide: function () {
      return wt(this)
    },
    toggle: function (e) {
      return typeof e === 'boolean' ? e ? this.show() : this.hide() : this.each(function () {
        pe(this) ? C(this).show() : C(this).hide()
      })
    }
  }), ((C.Tween = h).prototype = {
    constructor: h,
    init: function (e, t, n, r, i, o) {
      this.elem = e, this.prop = n, this.easing = i || C.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (C.cssNumber[n] ? '' : 'px')
    },
    cur: function () {
      var e = h.propHooks[this.prop]
      return (e && e.get ? e : h.propHooks._default).get(this)
    },
    run: function (e) {
      var t; var n = h.propHooks[this.prop]
      return this.options.duration ? this.pos = t = C.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), (n && n.set ? n : h.propHooks._default).set(this), this
    }
  }).init.prototype = h.prototype, (h.propHooks = {
    _default: {
      get: function (e) {
        return e.elem.nodeType !== 1 || e.elem[e.prop] != null && e.elem.style[e.prop] == null ? e.elem[e.prop] : (e = C.css(e.elem, e.prop, '')) && e !== 'auto' ? e : 0
      },
      set: function (e) {
        C.fx.step[e.prop] ? C.fx.step[e.prop](e) : e.elem.nodeType !== 1 || e.elem.style[C.cssProps[e.prop]] == null && !C.cssHooks[e.prop] ? e.elem[e.prop] = e.now : C.style(e.elem, e.prop, e.now + e.unit)
      }
    }
  }).scrollTop = h.propHooks.scrollLeft = {
    set: function (e) {
      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
    }
  }, C.easing = {
    linear: function (e) {
      return e
    },
    swing: function (e) {
      return 0.5 - Math.cos(e * Math.PI) / 2
    },
    _default: 'swing'
  }, C.fx = h.prototype.init, C.fx.step = {}
  var N; var Nt; var k; var S; var kt = /^(?:toggle|show|hide)$/; var St = /queueHooks$/

  function At () {
    return T.setTimeout(function () {
      N = undefined
    }), N = C.now()
  }

  function Dt (e, t) {
    var n; var r = { height: e }; var i = 0
    for (t = t ? 1 : 0; i < 4; i += 2 - t) r['margin' + (n = s[i])] = r['padding' + n] = e
    return t && (r.opacity = r.width = e), r
  }

  function jt (e, t, n) {
    for (var r, i = (A.tweeners[t] || []).concat(A.tweeners['*']), o = 0, a = i.length; o < a; o++) if (r = i[o].call(n, t, e)) return r
  }

  function A (i, e, t) {
    var n; var o; var r; var a; var s; var u; var l; var c = 0; var f = A.prefilters.length; var d = C.Deferred().always(function () {
      delete p.elem
    }); var p = function () {
      if (o) return !1
      for (var e = N || At(), e = Math.max(0, h.startTime + h.duration - e), t = 1 - (e / h.duration || 0), n = 0, r = h.tweens.length; n < r; n++) h.tweens[n].run(t)
      return d.notifyWith(i, [h, t, e]), t < 1 && r ? e : (d.resolveWith(i, [h]), !1)
    }; var h = d.promise({
      elem: i,
      props: C.extend({}, e),
      opts: C.extend(!0, { specialEasing: {}, easing: C.easing._default }, t),
      originalProperties: e,
      originalOptions: t,
      startTime: N || At(),
      duration: t.duration,
      tweens: [],
      createTween: function (e, t) {
        t = C.Tween(i, h.opts, e, t, h.opts.specialEasing[e] || h.opts.easing)
        return h.tweens.push(t), t
      },
      stop: function (e) {
        var t = 0; var n = e ? h.tweens.length : 0
        if (o) return this
        for (o = !0; t < n; t++) h.tweens[t].run(1)
        return e ? (d.notifyWith(i, [h, 1, 0]), d.resolveWith(i, [h, e])) : d.rejectWith(i, [h, e]), this
      }
    }); var g = h.props; var m = g; var y = h.opts.specialEasing
    for (r in m) if (s = y[a = C.camelCase(r)], u = m[r], C.isArray(u) && (s = u[1], u = m[r] = u[0]), r !== a && (m[a] = u, delete m[r]), (l = C.cssHooks[a]) && 'expand' in l) for (r in u = l.expand(u), delete m[a], u) r in m || (m[r] = u[r], y[r] = s); else y[a] = s
    for (; c < f; c++) if (n = A.prefilters[c].call(h, i, g, h.opts)) return C.isFunction(n.stop) && (C._queueHooks(h.elem, h.opts.queue).stop = C.proxy(n.stop, n)), n
    return C.map(g, jt, h), C.isFunction(h.opts.start) && h.opts.start.call(i, h), C.fx.timer(C.extend(p, {
      elem: i,
      anim: h,
      queue: h.opts.queue
    })), h.progress(h.opts.progress).done(h.opts.done, h.opts.complete).fail(h.opts.fail).always(h.opts.always)
  }

  C.Animation = C.extend(A, {
    tweeners: {
      '*': [function (e, t) {
        var n = this.createTween(e, t)
        return he(n.elem, e, de.exec(t), n), n
      }]
    },
    tweener: function (e, t) {
      for (var n, r = 0, i = (e = C.isFunction(e) ? (t = e, ['*']) : e.match(E)).length; r < i; r++) n = e[r], A.tweeners[n] = A.tweeners[n] || [], A.tweeners[n].unshift(t)
    },
    prefilters: [function (t, e, n) {
      var r; var i; var o; var a; var s; var u; var l; var c = this; var f = {}; var d = t.style; var p = t.nodeType && pe(t); var h = C._data(t, 'fxshow')
      for (r in n.queue || ((s = C._queueHooks(t, 'fx')).unqueued == null && (s.unqueued = 0, u = s.empty.fire, s.empty.fire = function () {
        s.unqueued || u()
      }), s.unqueued++, c.always(function () {
        c.always(function () {
          s.unqueued--, C.queue(t, 'fx').length || s.empty.fire()
        })
      })), t.nodeType === 1 && ('height' in e || 'width' in e) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], ((l = C.css(t, 'display')) === 'none' ? C._data(t, 'olddisplay') || Ze(t.nodeName) : l) === 'inline' && C.css(t, 'float') === 'none' && (y.inlineBlockNeedsLayout && Ze(t.nodeName) !== 'inline' ? d.zoom = 1 : d.display = 'inline-block')), n.overflow && (d.overflow = 'hidden', y.shrinkWrapBlocks() || c.always(function () {
        d.overflow = n.overflow[0], d.overflowX = n.overflow[1], d.overflowY = n.overflow[2]
      })), e) {
        if (i = e[r], kt.exec(i)) {
          if (delete e[r], o = o || i === 'toggle', i === (p ? 'hide' : 'show')) {
            if (i !== 'show' || !h || h[r] === undefined) continue
            p = !0
          }
          f[r] = h && h[r] || C.style(t, r)
        } else l = undefined
      }
      if (C.isEmptyObject(f)) (l === 'none' ? Ze(t.nodeName) : l) === 'inline' && (d.display = l); else {
        for (r in h ? 'hidden' in h && (p = h.hidden) : h = C._data(t, 'fxshow', {}), o && (h.hidden = !p), p ? C(t).show() : c.done(function () {
          C(t).hide()
        }), c.done(function () {
          for (var e in C._removeData(t, 'fxshow'), f) C.style(t, e, f[e])
        }), f) a = jt(p ? h[r] : 0, r, c), r in h || (h[r] = a.start, p && (a.end = a.start, a.start = r === 'width' || r === 'height' ? 1 : 0))
      }
    }],
    prefilter: function (e, t) {
      t ? A.prefilters.unshift(e) : A.prefilters.push(e)
    }
  }), C.speed = function (e, t, n) {
    var r = e && typeof e === 'object' ? C.extend({}, e) : {
      complete: n || !n && t || C.isFunction(e) && e,
      duration: e,
      easing: n && t || t && !C.isFunction(t) && t
    }
    return r.duration = C.fx.off ? 0 : typeof r.duration === 'number' ? r.duration : r.duration in C.fx.speeds ? C.fx.speeds[r.duration] : C.fx.speeds._default, r.queue != null && !0 !== r.queue || (r.queue = 'fx'), r.old = r.complete, r.complete = function () {
      C.isFunction(r.old) && r.old.call(this), r.queue && C.dequeue(this, r.queue)
    }, r
  }, C.fn.extend({
    fadeTo: function (e, t, n, r) {
      return this.filter(pe).css('opacity', 0).show().end().animate({ opacity: t }, e, n, r)
    },
    animate: function (t, e, n, r) {
      var i = C.isEmptyObject(t); var o = C.speed(e, n, r); var e = function () {
        var e = A(this, C.extend({}, t), o);
        (i || C._data(this, 'finish')) && e.stop(!0)
      }
      return e.finish = e, i || !1 === o.queue ? this.each(e) : this.queue(o.queue, e)
    },
    stop: function (i, e, o) {
      var a = function (e) {
        var t = e.stop
        delete e.stop, t(o)
      }
      return typeof i !== 'string' && (o = e, e = i, i = undefined), e && !1 !== i && this.queue(i || 'fx', []), this.each(function () {
        var e = !0; var t = i != null && i + 'queueHooks'; var n = C.timers; var r = C._data(this)
        if (t) r[t] && r[t].stop && a(r[t]); else for (t in r) r[t] && r[t].stop && St.test(t) && a(r[t])
        for (t = n.length; t--;) n[t].elem !== this || i != null && n[t].queue !== i || (n[t].anim.stop(o), e = !1, n.splice(t, 1))
        !e && o || C.dequeue(this, i)
      })
    },
    finish: function (a) {
      return !1 !== a && (a = a || 'fx'), this.each(function () {
        var e; var t = C._data(this); var n = t[a + 'queue']; var r = t[a + 'queueHooks']; var i = C.timers
        var o = n ? n.length : 0
        for (t.finish = !0, C.queue(this, a, []), r && r.stop && r.stop.call(this, !0), e = i.length; e--;) i[e].elem === this && i[e].queue === a && (i[e].anim.stop(!0), i.splice(e, 1))
        for (e = 0; e < o; e++) n[e] && n[e].finish && n[e].finish.call(this)
        delete t.finish
      })
    }
  }), C.each(['toggle', 'show', 'hide'], function (e, r) {
    var i = C.fn[r]
    C.fn[r] = function (e, t, n) {
      return e == null || typeof e === 'boolean' ? i.apply(this, arguments) : this.animate(Dt(r, !0), e, t, n)
    }
  }), C.each({
    slideDown: Dt('show'),
    slideUp: Dt('hide'),
    slideToggle: Dt('toggle'),
    fadeIn: { opacity: 'show' },
    fadeOut: { opacity: 'hide' },
    fadeToggle: { opacity: 'toggle' }
  }, function (e, r) {
    C.fn[e] = function (e, t, n) {
      return this.animate(r, e, t, n)
    }
  }), C.timers = [], C.fx.tick = function () {
    var e; var t = C.timers; var n = 0
    for (N = C.now(); n < t.length; n++) (e = t[n])() || t[n] !== e || t.splice(n--, 1)
    t.length || C.fx.stop(), N = undefined
  }, C.fx.timer = function (e) {
    C.timers.push(e), e() ? C.fx.start() : C.timers.pop()
  }, C.fx.interval = 13, C.fx.start = function () {
    Nt = Nt || T.setInterval(C.fx.tick, C.fx.interval)
  }, C.fx.stop = function () {
    T.clearInterval(Nt), Nt = null
  }, C.fx.speeds = { slow: 600, fast: 200, _default: 400 }, C.fn.delay = function (r, e) {
    return r = C.fx && C.fx.speeds[r] || r, this.queue(e = e || 'fx', function (e, t) {
      var n = T.setTimeout(e, r)
      t.stop = function () {
        T.clearTimeout(n)
      }
    })
  }, k = g.createElement('input'), q = g.createElement('div'), S = g.createElement('select'), e = S.appendChild(g.createElement('option')), (q = g.createElement('div')).setAttribute('className', 't'), q.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", F = q.getElementsByTagName('a')[0], k.setAttribute('type', 'checkbox'), q.appendChild(k), (F = q.getElementsByTagName('a')[0]).style.cssText = 'top:1px', y.getSetAttribute = q.className !== 't', y.style = /top/.test(F.getAttribute('style')), y.hrefNormalized = F.getAttribute('href') === '/a', y.checkOn = !!k.value, y.optSelected = e.selected, y.enctype = !!g.createElement('form').enctype, S.disabled = !0, y.optDisabled = !e.disabled, (k = g.createElement('input')).setAttribute('value', ''), y.input = k.getAttribute('value') === '', k.value = 't', k.setAttribute('type', 'radio'), y.radioValue = k.value === 't'
  var Lt = /\r/g; var Ht = /[\x20\t\r\n\f]+/g
  C.fn.extend({
    val: function (t) {
      var n; var e; var r; var i = this[0]
      return arguments.length ? (r = C.isFunction(t), this.each(function (e) {
        this.nodeType === 1 && ((e = r ? t.call(this, e, C(this).val()) : t) == null ? e = '' : typeof e === 'number' ? e += '' : C.isArray(e) && (e = C.map(e, function (e) {
          return e == null ? '' : e + ''
        })), (n = C.valHooks[this.type] || C.valHooks[this.nodeName.toLowerCase()]) && 'set' in n && n.set(this, e, 'value') !== undefined || (this.value = e))
      })) : i ? (n = C.valHooks[i.type] || C.valHooks[i.nodeName.toLowerCase()]) && 'get' in n && (e = n.get(i, 'value')) !== undefined ? e : typeof (e = i.value) === 'string' ? e.replace(Lt, '') : e == null ? '' : e : void 0
    }
  }), C.extend({
    valHooks: {
      option: {
        get: function (e) {
          var t = C.find.attr(e, 'value')
          return t != null ? t : C.trim(C.text(e)).replace(Ht, ' ')
        }
      },
      select: {
        get: function (e) {
          for (var t, n = e.options, r = e.selectedIndex, i = e.type === 'select-one' || r < 0, o = i ? null : [], a = i ? r + 1 : n.length, s = r < 0 ? a : i ? r : 0; s < a; s++) {
            if (((t = n[s]).selected || s === r) && (y.optDisabled ? !t.disabled : t.getAttribute('disabled') === null) && (!t.parentNode.disabled || !C.nodeName(t.parentNode, 'optgroup'))) {
              if (t = C(t).val(), i) return t
              o.push(t)
            }
          }
          return o
        },
        set: function (e, t) {
          for (var n, r, i = e.options, o = C.makeArray(t), a = i.length; a--;) {
            if (r = i[a], C.inArray(C.valHooks.option.get(r), o) > -1) {
              try {
                r.selected = n = !0
              } catch (s) {
                r.scrollHeight
              }
            } else r.selected = !1
          }
          return n || (e.selectedIndex = -1), i
        }
      }
    }
  }), C.each(['radio', 'checkbox'], function () {
    C.valHooks[this] = {
      set: function (e, t) {
        if (C.isArray(t)) return e.checked = C.inArray(C(e).val(), t) > -1
      }
    }, y.checkOn || (C.valHooks[this].get = function (e) {
      return e.getAttribute('value') === null ? 'on' : e.value
    })
  })
  var D; var qt; var j = C.expr.attrHandle; var _t = /^(?:checked|selected)$/i; var L = y.getSetAttribute; var Ft = y.input
  var Mt = (C.fn.extend({
    attr: function (e, t) {
      return d(this, C.attr, e, t, arguments.length > 1)
    },
    removeAttr: function (e) {
      return this.each(function () {
        C.removeAttr(this, e)
      })
    }
  }), C.extend({
    attr: function (e, t, n) {
      var r; var i; var o = e.nodeType
      if (o !== 3 && o !== 8 && o !== 2) return typeof e.getAttribute === 'undefined' ? C.prop(e, t, n) : (o === 1 && C.isXMLDoc(e) || (t = t.toLowerCase(), i = C.attrHooks[t] || (C.expr.match.bool.test(t) ? qt : D)), n !== undefined ? n === null ? void C.removeAttr(e, t) : i && 'set' in i && (r = i.set(e, n, t)) !== undefined ? r : (e.setAttribute(t, n + ''), n) : !(i && 'get' in i && (r = i.get(e, t)) !== null) && (r = C.find.attr(e, t)) == null ? undefined : r)
    },
    attrHooks: {
      type: {
        set: function (e, t) {
          var n
          if (!y.radioValue && t === 'radio' && C.nodeName(e, 'input')) return n = e.value, e.setAttribute('type', t), n && (e.value = n), t
        }
      }
    },
    removeAttr: function (e, t) {
      var n; var r; var i = 0; var o = t && t.match(E)
      if (o && e.nodeType === 1) for (; n = o[i++];) r = C.propFix[n] || n, C.expr.match.bool.test(n) ? Ft && L || !_t.test(n) ? e[r] = !1 : e[C.camelCase('default-' + n)] = e[r] = !1 : C.attr(e, n, ''), e.removeAttribute(L ? n : r)
    }
  }), qt = {
    set: function (e, t, n) {
      return !1 === t ? C.removeAttr(e, n) : Ft && L || !_t.test(n) ? e.setAttribute(!L && C.propFix[n] || n, n) : e[C.camelCase('default-' + n)] = e[n] = !0, n
    }
  }, C.each(C.expr.match.bool.source.match(/\w+/g), function (e, t) {
    var o = j[t] || C.find.attr
    Ft && L || !_t.test(t) ? j[t] = function (e, t, n) {
      var r, i
      return n || (i = j[t], j[t] = r, r = o(e, t, n) != null ? t.toLowerCase() : null, j[t] = i), r
    } : j[t] = function (e, t, n) {
      if (!n) return e[C.camelCase('default-' + t)] ? t.toLowerCase() : null
    }
  }), Ft && L || (C.attrHooks.value = {
    set: function (e, t, n) {
      if (!C.nodeName(e, 'input')) return D && D.set(e, t, n)
      e.defaultValue = t
    }
  }), L || (D = {
    set: function (e, t, n) {
      var r = e.getAttributeNode(n)
      if (r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)), r.value = t += '', n === 'value' || t === e.getAttribute(n)) return t
    }
  }, j.id = j.name = j.coords = function (e, t, n) {
    if (!n) return (n = e.getAttributeNode(t)) && n.value !== '' ? n.value : null
  }, C.valHooks.button = {
    get: function (e, t) {
      t = e.getAttributeNode(t)
      if (t && t.specified) return t.value
    },
    set: D.set
  }, C.attrHooks.contenteditable = {
    set: function (e, t, n) {
      D.set(e, t !== '' && t, n)
    }
  }, C.each(['width', 'height'], function (e, n) {
    C.attrHooks[n] = {
      set: function (e, t) {
        if (t === '') return e.setAttribute(n, 'auto'), t
      }
    }
  })), y.style || (C.attrHooks.style = {
    get: function (e) {
      return e.style.cssText || undefined
    },
    set: function (e, t) {
      return e.style.cssText = t + ''
    }
  }), /^(?:input|select|textarea|button|object)$/i); var Ot = /^(?:a|area)$/i; var Rt = (C.fn.extend({
    prop: function (e, t) {
      return d(this, C.prop, e, t, arguments.length > 1)
    },
    removeProp: function (t) {
      return t = C.propFix[t] || t, this.each(function () {
        try {
          this[t] = undefined, delete this[t]
        } catch (e) {
        }
      })
    }
  }), C.extend({
    prop: function (e, t, n) {
      var r; var i; var o = e.nodeType
      if (o !== 3 && o !== 8 && o !== 2) return o === 1 && C.isXMLDoc(e) || (t = C.propFix[t] || t, i = C.propHooks[t]), n !== undefined ? i && 'set' in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n : i && 'get' in i && (r = i.get(e, t)) !== null ? r : e[t]
    },
    propHooks: {
      tabIndex: {
        get: function (e) {
          var t = C.find.attr(e, 'tabindex')
          return t ? parseInt(t, 10) : Mt.test(e.nodeName) || Ot.test(e.nodeName) && e.href ? 0 : -1
        }
      }
    },
    propFix: { for: 'htmlFor', class: 'className' }
  }), y.hrefNormalized || C.each(['href', 'src'], function (e, t) {
    C.propHooks[t] = {
      get: function (e) {
        return e.getAttribute(t, 4)
      }
    }
  }), y.optSelected || (C.propHooks.selected = {
    get: function (e) {
      e = e.parentNode
      return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
    },
    set: function (e) {
      e = e.parentNode
      e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex)
    }
  }), C.each(['tabIndex', 'readOnly', 'maxLength', 'cellSpacing', 'cellPadding', 'rowSpan', 'colSpan', 'useMap', 'frameBorder', 'contentEditable'], function () {
    C.propFix[this.toLowerCase()] = this
  }), y.enctype || (C.propFix.enctype = 'encoding'), /[\t\r\n\f]/g)

  function H (e) {
    return C.attr(e, 'class') || ''
  }

  C.fn.extend({
    addClass: function (t) {
      var e; var n; var r; var i; var o; var a; var s = 0
      if (C.isFunction(t)) {
        return this.each(function (e) {
          C(this).addClass(t.call(this, e, H(this)))
        })
      }
      if (typeof t === 'string' && t) {
        for (e = t.match(E) || []; n = this[s++];) {
          if (a = H(n), r = n.nodeType === 1 && (' ' + a + ' ').replace(Rt, ' ')) {
            for (o = 0; i = e[o++];) r.indexOf(' ' + i + ' ') < 0 && (r += i + ' ')
            a !== (a = C.trim(r)) && C.attr(n, 'class', a)
          }
        }
      }
      return this
    },
    removeClass: function (t) {
      var e; var n; var r; var i; var o; var a; var s = 0
      if (C.isFunction(t)) {
        return this.each(function (e) {
          C(this).removeClass(t.call(this, e, H(this)))
        })
      }
      if (!arguments.length) return this.attr('class', '')
      if (typeof t === 'string' && t) {
        for (e = t.match(E) || []; n = this[s++];) {
          if (a = H(n), r = n.nodeType === 1 && (' ' + a + ' ').replace(Rt, ' ')) {
            for (o = 0; i = e[o++];) for (; r.indexOf(' ' + i + ' ') > -1;) r = r.replace(' ' + i + ' ', ' ')
            a !== (a = C.trim(r)) && C.attr(n, 'class', a)
          }
        }
      }
      return this
    },
    toggleClass: function (i, t) {
      var o = typeof i
      return typeof t === 'boolean' && o == 'string' ? t ? this.addClass(i) : this.removeClass(i) : C.isFunction(i) ? this.each(function (e) {
        C(this).toggleClass(i.call(this, e, H(this), t), t)
      }) : this.each(function () {
        var e, t, n, r
        if (o == 'string') for (t = 0, n = C(this), r = i.match(E) || []; e = r[t++];) n.hasClass(e) ? n.removeClass(e) : n.addClass(e); else i !== undefined && o != 'boolean' || ((e = H(this)) && C._data(this, '__className__', e), C.attr(this, 'class', !e && !1 !== i && C._data(this, '__className__') || ''))
      })
    },
    hasClass: function (e) {
      for (var t, n = 0, r = ' ' + e + ' '; t = this[n++];) if (t.nodeType === 1 && (' ' + H(t) + ' ').replace(Rt, ' ').indexOf(r) > -1) return !0
      return !1
    }
  }), C.each('blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu'.split(' '), function (e, n) {
    C.fn[n] = function (e, t) {
      return arguments.length > 0 ? this.on(n, null, e, t) : this.trigger(n)
    }
  }), C.fn.extend({
    hover: function (e, t) {
      return this.mouseenter(e).mouseleave(t || e)
    }
  })
  var q = T.location; var Pt = C.now(); var Bt = /\?/
  var Wt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g
  var It = (C.parseJSON = function (e) {
    if (T.JSON && T.JSON.parse) return T.JSON.parse(e + '')
    var i; var o = null; var t = C.trim(e + '')
    return t && !C.trim(t.replace(Wt, function (e, t, n, r) {
      return (o = i && t ? 0 : o) === 0 ? e : (i = n || t, o += !r - !n, '')
    })) ? Function('return ' + t)() : C.error('Invalid JSON: ' + e)
  }, C.parseXML = function (e) {
    var t
    if (!e || typeof e !== 'string') return null
    try {
      T.DOMParser ? t = (new T.DOMParser()).parseFromString(e, 'text/xml') : ((t = new T.ActiveXObject('Microsoft.XMLDOM')).async = 'false', t.loadXML(e))
    } catch (n) {
      t = undefined
    }
    return t && t.documentElement && !t.getElementsByTagName('parsererror').length || C.error('Invalid XML: ' + e), t
  }, /#.*$/); var $t = /([?&])_=[^&]*/; var zt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm; var Xt = /^(?:GET|HEAD)$/; var Ut = /^\/\//
  var Vt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/; var Yt = {}; var Jt = {}; var Gt = '*/'.concat('*')
  var Kt = q.href; var _ = Vt.exec(Kt.toLowerCase()) || []

  function Qt (o) {
    return function (e, t) {
      typeof e !== 'string' && (t = e, e = '*')
      var n; var r = 0; var i = e.toLowerCase().match(E) || []
      if (C.isFunction(t)) for (; n = i[r++];) n.charAt(0) === '+' ? (n = n.slice(1) || '*', (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t)
    }
  }

  function Zt (t, r, i, o) {
    var a = {}; var s = t === Jt

    function u (e) {
      var n
      return a[e] = !0, C.each(t[e] || [], function (e, t) {
        t = t(r, i, o)
        return typeof t !== 'string' || s || a[t] ? s ? !(n = t) : void 0 : (r.dataTypes.unshift(t), u(t), !1)
      }), n
    }

    return u(r.dataTypes[0]) || !a['*'] && u('*')
  }

  function en (e, t) {
    var n; var r; var i = C.ajaxSettings.flatOptions || {}
    for (r in t) t[r] !== undefined && ((i[r] ? e : n = n || {})[r] = t[r])
    return n && C.extend(!0, e, n), e
  }

  function tn (e, t, n, r) {
    var i; var o; var a; var s; var u; var l = {}; var c = e.dataTypes.slice()
    if (c[1]) for (a in e.converters) l[a.toLowerCase()] = e.converters[a]
    for (o = c.shift(); o;) {
      if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift()) {
        if (o === '*') o = u; else if (u !== '*' && u !== o) {
          if (!(a = l[u + ' ' + o] || l['* ' + o])) {
            for (i in l) {
              if ((s = i.split(' '))[1] === o && (a = l[u + ' ' + s[0]] || l['* ' + s[0]])) {
                !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]))
                break
              }
            }
          }
          if (!0 !== a) {
            if (a && e.throws) t = a(t); else {
              try {
                t = a(t)
              } catch (f) {
                return { state: 'parsererror', error: a ? f : 'No conversion from ' + u + ' to ' + o }
              }
            }
          }
        }
      }
    }
    return { state: 'success', data: t }
  }

  function nn (e) {
    if (!C.contains(e.ownerDocument || g, e)) return !0
    for (; e && e.nodeType === 1;) {
      if (((t = e).style && t.style.display || C.css(t, 'display')) === 'none' || e.type === 'hidden') return !0
      e = e.parentNode
    }
    var t
    return !1
  }

  C.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: Kt,
      type: 'GET',
      isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(_[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      accepts: {
        '*': Gt,
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript'
      },
      contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
      responseFields: { xml: 'responseXML', text: 'responseText', json: 'responseJSON' },
      converters: { '* text': String, 'text html': !0, 'text json': C.parseJSON, 'text xml': C.parseXML },
      flatOptions: { url: !0, context: !0 }
    },
    ajaxSetup: function (e, t) {
      return t ? en(en(e, C.ajaxSettings), t) : en(C.ajaxSettings, e)
    },
    ajaxPrefilter: Qt(Yt),
    ajaxTransport: Qt(Jt),
    ajax: function (e, t) {
      typeof e === 'object' && (t = e, e = undefined)
      var n; var u; var l; var c; var f; var d; var r; var p = C.ajaxSetup({}, t = t || {}); var h = p.context || p
      var g = p.context && (h.nodeType || h.jquery) ? C(h) : C.event; var m = C.Deferred()
      var y = C.Callbacks('once memory'); var v = p.statusCode || {}; var i = {}; var o = {}; var x = 0; var a = 'canceled'; var b = {
        readyState: 0,
        getResponseHeader: function (e) {
          var t
          if (x === 2) {
            if (!r) for (r = {}; t = zt.exec(l);) r[t[1].toLowerCase()] = t[2]
            t = r[e.toLowerCase()]
          }
          return t == null ? null : t
        },
        getAllResponseHeaders: function () {
          return x === 2 ? l : null
        },
        setRequestHeader: function (e, t) {
          var n = e.toLowerCase()
          return x || (e = o[n] = o[n] || e, i[e] = t), this
        },
        overrideMimeType: function (e) {
          return x || (p.mimeType = e), this
        },
        statusCode: function (e) {
          if (e) if (x < 2) for (var t in e) v[t] = [v[t], e[t]]; else b.always(e[b.status])
          return this
        },
        abort: function (e) {
          e = e || a
          return d && d.abort(e), s(0, e), this
        }
      }
      if (m.promise(b).complete = y.add, b.success = b.done, b.error = b.fail, p.url = ((e || p.url || Kt) + '').replace(It, '').replace(Ut, _[1] + '//'), p.type = t.method || t.type || p.method || p.type, p.dataTypes = C.trim(p.dataType || '*').toLowerCase().match(E) || [''], p.crossDomain == null && (e = Vt.exec(p.url.toLowerCase()), p.crossDomain = !(!e || e[1] === _[1] && e[2] === _[2] && (e[3] || (e[1] === 'http:' ? '80' : '443')) === (_[3] || (_[1] === 'http:' ? '80' : '443')))), p.data && p.processData && typeof p.data !== 'string' && (p.data = C.param(p.data, p.traditional)), Zt(Yt, p, t, b), x === 2) return b
      for (n in (f = C.event && p.global) && C.active++ == 0 && C.event.trigger('ajaxStart'), p.type = p.type.toUpperCase(), p.hasContent = !Xt.test(p.type), u = p.url, p.hasContent || (p.data && (u = p.url += (Bt.test(u) ? '&' : '?') + p.data, delete p.data), !1 === p.cache && (p.url = $t.test(u) ? u.replace($t, '$1_=' + Pt++) : u + (Bt.test(u) ? '&' : '?') + '_=' + Pt++)), p.ifModified && (C.lastModified[u] && b.setRequestHeader('If-Modified-Since', C.lastModified[u]), C.etag[u] && b.setRequestHeader('If-None-Match', C.etag[u])), (p.data && p.hasContent && !1 !== p.contentType || t.contentType) && b.setRequestHeader('Content-Type', p.contentType), b.setRequestHeader('Accept', p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + (p.dataTypes[0] !== '*' ? ', ' + Gt + '; q=0.01' : '') : p.accepts['*']), p.headers) b.setRequestHeader(n, p.headers[n])
      if (p.beforeSend && (!1 === p.beforeSend.call(h, b, p) || x === 2)) return b.abort()
      for (n in a = 'abort', { success: 1, error: 1, complete: 1 }) b[n](p[n])
      if (d = Zt(Jt, p, t, b)) {
        if (b.readyState = 1, f && g.trigger('ajaxSend', [b, p]), x === 2) return b
        p.async && p.timeout > 0 && (c = T.setTimeout(function () {
          b.abort('timeout')
        }, p.timeout))
        try {
          x = 1, d.send(i, s)
        } catch (w) {
          if (!(x < 2)) throw w
          s(-1, w)
        }
      } else s(-1, 'No Transport')

      function s (e, t, n, r) {
        var i; var o; var a; var s = t
        x !== 2 && (x = 2, c && T.clearTimeout(c), d = undefined, l = r || '', b.readyState = e > 0 ? 4 : 0, r = e >= 200 && e < 300 || e === 304, n && (a = (function (e, t, n) {
          for (var r, i, o, a, s = e.contents, u = e.dataTypes; u[0] === '*';) u.shift(), i === undefined && (i = e.mimeType || t.getResponseHeader('Content-Type'))
          if (i) {
            for (a in s) {
              if (s[a] && s[a].test(i)) {
                u.unshift(a)
                break
              }
            }
          }
          if (u[0] in n) o = u[0]; else {
            for (a in n) {
              if (!u[0] || e.converters[a + ' ' + u[0]]) {
                o = a
                break
              }
              r = r || a
            }
            o = o || r
          }
          if (o) return o !== u[0] && u.unshift(o), n[o]
        }(p, b, n))), a = tn(p, a, b, r), r ? (p.ifModified && ((n = b.getResponseHeader('Last-Modified')) && (C.lastModified[u] = n), (n = b.getResponseHeader('etag')) && (C.etag[u] = n)), e === 204 || p.type === 'HEAD' ? s = 'nocontent' : e === 304 ? s = 'notmodified' : (s = a.state, i = a.data, r = !(o = a.error))) : (o = s, !e && s || (s = 'error', e < 0 && (e = 0))), b.status = e, b.statusText = (t || s) + '', r ? m.resolveWith(h, [i, s, b]) : m.rejectWith(h, [b, s, o]), b.statusCode(v), v = undefined, f && g.trigger(r ? 'ajaxSuccess' : 'ajaxError', [b, p, r ? i : o]), y.fireWith(h, [b, s]), f && (g.trigger('ajaxComplete', [b, p]), --C.active || C.event.trigger('ajaxStop')))
      }

      return b
    },
    getJSON: function (e, t, n) {
      return C.get(e, t, n, 'json')
    },
    getScript: function (e, t) {
      return C.get(e, undefined, t, 'script')
    }
  }), C.each(['get', 'post'], function (e, i) {
    C[i] = function (e, t, n, r) {
      return C.isFunction(t) && (r = r || n, n = t, t = undefined), C.ajax(C.extend({
        url: e,
        type: i,
        dataType: r,
        data: t,
        success: n
      }, C.isPlainObject(e) && e))
    }
  }), C._evalUrl = function (e) {
    return C.ajax({ url: e, type: 'GET', dataType: 'script', cache: !0, async: !1, global: !1, throws: !0 })
  }, C.fn.extend({
    wrapAll: function (t) {
      return C.isFunction(t) ? this.each(function (e) {
        C(this).wrapAll(t.call(this, e))
      }) : (this[0] && (e = C(t, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && e.insertBefore(this[0]), e.map(function () {
        for (var e = this; e.firstChild && e.firstChild.nodeType === 1;) e = e.firstChild
        return e
      }).append(this)), this)
      var e
    },
    wrapInner: function (n) {
      return C.isFunction(n) ? this.each(function (e) {
        C(this).wrapInner(n.call(this, e))
      }) : this.each(function () {
        var e = C(this); var t = e.contents()
        t.length ? t.wrapAll(n) : e.append(n)
      })
    },
    wrap: function (t) {
      var n = C.isFunction(t)
      return this.each(function (e) {
        C(this).wrapAll(n ? t.call(this, e) : t)
      })
    },
    unwrap: function () {
      return this.parent().each(function () {
        C.nodeName(this, 'body') || C(this).replaceWith(this.childNodes)
      }).end()
    }
  }), C.expr.filters.hidden = function (e) {
    return y.reliableHiddenOffsets() ? e.offsetWidth <= 0 && e.offsetHeight <= 0 && !e.getClientRects().length : nn(e)
  }, C.expr.filters.visible = function (e) {
    return !C.expr.filters.hidden(e)
  }
  var rn = /%20/g; var on = /\[\]$/; var an = /\r?\n/g; var sn = /^(?:submit|button|image|reset|file)$/i
  var un = /^(?:input|select|textarea|keygen)/i
  C.param = function (e, t) {
    var n; var r = []; var i = function (e, t) {
      t = C.isFunction(t) ? t() : t == null ? '' : t, r[r.length] = encodeURIComponent(e) + '=' + encodeURIComponent(t)
    }
    if (t === undefined && (t = C.ajaxSettings && C.ajaxSettings.traditional), C.isArray(e) || e.jquery && !C.isPlainObject(e)) {
      C.each(e, function () {
        i(this.name, this.value)
      })
    } else {
      for (n in e) {
        !(function o (n, e, r, i) {
          if (C.isArray(e)) {
            C.each(e, function (e, t) {
              r || on.test(n) ? i(n, t) : o(n + '[' + (typeof t === 'object' && t != null ? e : '') + ']', t, r, i)
            })
          } else if (r || C.type(e) !== 'object') i(n, e); else for (var t in e) o(n + '[' + t + ']', e[t], r, i)
        }(n, e[n], t, i))
      }
    }
    return r.join('&').replace(rn, '+')
  }, C.fn.extend({
    serialize: function () {
      return C.param(this.serializeArray())
    },
    serializeArray: function () {
      return this.map(function () {
        var e = C.prop(this, 'elements')
        return e ? C.makeArray(e) : this
      }).filter(function () {
        var e = this.type
        return this.name && !C(this).is(':disabled') && un.test(this.nodeName) && !sn.test(e) && (this.checked || !ge.test(e))
      }).map(function (e, t) {
        var n = C(this).val()
        return n == null ? null : C.isArray(n) ? C.map(n, function (e) {
          return { name: t.name, value: e.replace(an, '\r\n') }
        }) : { name: t.name, value: n.replace(an, '\r\n') }
      }).get()
    }
  }), C.ajaxSettings.xhr = T.ActiveXObject !== undefined ? function () {
    return this.isLocal ? dn() : g.documentMode > 8 ? fn() : /^(get|post|head|put|delete|options)$/i.test(this.type) && fn() || dn()
  } : fn
  var ln = 0; var cn = {}; var F = C.ajaxSettings.xhr()

  function fn () {
    try {
      return new T.XMLHttpRequest()
    } catch (e) {
    }
  }

  function dn () {
    try {
      return new T.ActiveXObject('Microsoft.XMLHTTP')
    } catch (e) {
    }
  }

  T.attachEvent && T.attachEvent('onunload', function () {
    for (var e in cn) cn[e](undefined, !0)
  }), y.cors = !!F && 'withCredentials' in F, (F = y.ajax = !!F) && C.ajaxTransport(function (l) {
    var c
    if (!l.crossDomain || y.cors) {
      return {
        send: function (e, a) {
          var t; var s = l.xhr(); var u = ++ln
          if (s.open(l.type, l.url, l.async, l.username, l.password), l.xhrFields) for (t in l.xhrFields) s[t] = l.xhrFields[t]
          for (t in l.mimeType && s.overrideMimeType && s.overrideMimeType(l.mimeType), l.crossDomain || e['X-Requested-With'] || (e['X-Requested-With'] = 'XMLHttpRequest'), e) e[t] !== undefined && s.setRequestHeader(t, e[t] + '')
          s.send(l.hasContent && l.data || null), c = function (e, t) {
            var n, r, i
            if (c && (t || s.readyState === 4)) {
              if (delete cn[u], c = undefined, s.onreadystatechange = C.noop, t) s.readyState !== 4 && s.abort(); else {
                i = {}, n = s.status, typeof s.responseText === 'string' && (i.text = s.responseText)
                try {
                  r = s.statusText
                } catch (o) {
                  r = ''
                }
                n || !l.isLocal || l.crossDomain ? n === 1223 && (n = 204) : n = i.text ? 200 : 404
              }
            }
            i && a(n, r, i, s.getAllResponseHeaders())
          }, l.async ? s.readyState === 4 ? T.setTimeout(c) : s.onreadystatechange = cn[u] = c : c()
        },
        abort: function () {
          c && c(undefined, !0)
        }
      }
    }
  }), C.ajaxSetup({
    accepts: { script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript' },
    contents: { script: /\b(?:java|ecma)script\b/ },
    converters: {
      'text script': function (e) {
        return C.globalEval(e), e
      }
    }
  }), C.ajaxPrefilter('script', function (e) {
    e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = 'GET', e.global = !1)
  }), C.ajaxTransport('script', function (t) {
    var r, i
    if (t.crossDomain) {
      return i = g.head || C('head')[0] || g.documentElement, {
        send: function (e, n) {
          (r = g.createElement('script')).async = !0, t.scriptCharset && (r.charset = t.scriptCharset), r.src = t.url, r.onload = r.onreadystatechange = function (e, t) {
            !t && r.readyState && !/loaded|complete/.test(r.readyState) || (r.onload = r.onreadystatechange = null, r.parentNode && r.parentNode.removeChild(r), r = null, t || n(200, 'success'))
          }, i.insertBefore(r, i.firstChild)
        },
        abort: function () {
          r && r.onload(undefined, !0)
        }
      }
    }
  })
  var pn = []; var hn = /(=)\?(?=&|$)|\?\?/; var gn = (C.ajaxSetup({
    jsonp: 'callback',
    jsonpCallback: function () {
      var e = pn.pop() || C.expando + '_' + Pt++
      return this[e] = !0, e
    }
  }), C.ajaxPrefilter('json jsonp', function (e, t, n) {
    var r; var i; var o
    var a = !1 !== e.jsonp && (hn.test(e.url) ? 'url' : typeof e.data === 'string' && (e.contentType || '').indexOf('application/x-www-form-urlencoded') === 0 && hn.test(e.data) && 'data')
    if (a || e.dataTypes[0] === 'jsonp') {
      return r = e.jsonpCallback = C.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace(hn, '$1' + r) : !1 !== e.jsonp && (e.url += (Bt.test(e.url) ? '&' : '?') + e.jsonp + '=' + r), e.converters['script json'] = function () {
        return o || C.error(r + ' was not called'), o[0]
      }, e.dataTypes[0] = 'json', i = T[r], T[r] = function () {
        o = arguments
      }, n.always(function () {
        i === undefined ? C(T).removeProp(r) : T[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, pn.push(r)), o && C.isFunction(i) && i(o[0]), o = i = undefined
      }), 'script'
    }
  }), C.parseHTML = function (e, t, n) {
    if (!e || typeof e !== 'string') return null
    typeof t === 'boolean' && (n = t, t = !1), t = t || g
    var r = J.exec(e); var n = !n && []
    return r ? [t.createElement(r[1])] : (r = Ne([e], t, n), n && n.length && C(n).remove(), C.merge([], r.childNodes))
  }, C.fn.load)

  function mn (e) {
    return C.isWindow(e) ? e : e.nodeType === 9 && (e.defaultView || e.parentWindow)
  }

  return C.fn.load = function (e, t, n) {
    if (typeof e !== 'string' && gn) return gn.apply(this, arguments)
    var r; var i; var o; var a = this; var s = e.indexOf(' ')
    return s > -1 && (r = C.trim(e.slice(s, e.length)), e = e.slice(0, s)), C.isFunction(t) ? (n = t, t = undefined) : t && typeof t === 'object' && (i = 'POST'), a.length > 0 && C.ajax({
      url: e,
      type: i || 'GET',
      dataType: 'html',
      data: t
    }).done(function (e) {
      o = arguments, a.html(r ? C('<div>').append(C.parseHTML(e)).find(r) : e)
    }).always(n && function (e, t) {
      a.each(function () {
        n.apply(this, o || [e.responseText, t, e])
      })
    }), this
  }, C.each(['ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError', 'ajaxSuccess', 'ajaxSend'], function (e, t) {
    C.fn[t] = function (e) {
      return this.on(t, e)
    }
  }), C.expr.filters.animated = function (t) {
    return C.grep(C.timers, function (e) {
      return t === e.elem
    }).length
  }, C.offset = {
    setOffset: function (e, t, n) {
      var r; var i; var o; var a; var s = C.css(e, 'position'); var u = C(e); var l = {}
      s === 'static' && (e.style.position = 'relative'), o = u.offset(), r = C.css(e, 'top'), a = C.css(e, 'left'), s = (s === 'absolute' || s === 'fixed') && C.inArray('auto', [r, a]) > -1 ? (i = (s = u.position()).top, s.left) : (i = parseFloat(r) || 0, parseFloat(a) || 0), (t = C.isFunction(t) ? t.call(e, n, C.extend({}, o)) : t).top != null && (l.top = t.top - o.top + i), t.left != null && (l.left = t.left - o.left + s), 'using' in t ? t.using.call(e, l) : u.css(l)
    }
  }, C.fn.extend({
    offset: function (t) {
      if (arguments.length) {
        return t === undefined ? this : this.each(function (e) {
          C.offset.setOffset(this, t, e)
        })
      }
      var e; var n = { top: 0, left: 0 }; var r = this[0]; var i = r && r.ownerDocument
      return i ? (e = i.documentElement, C.contains(e, r) ? (typeof r.getBoundingClientRect !== 'undefined' && (n = r.getBoundingClientRect()), r = mn(i), {
        top: n.top + (r.pageYOffset || e.scrollTop) - (e.clientTop || 0),
        left: n.left + (r.pageXOffset || e.scrollLeft) - (e.clientLeft || 0)
      }) : n) : void 0
    },
    position: function () {
      var e, t, n, r
      if (this[0]) {
        return n = {
          top: 0,
          left: 0
        }, r = this[0], C.css(r, 'position') === 'fixed' ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), (n = C.nodeName(e[0], 'html') ? n : e.offset()).top += C.css(e[0], 'borderTopWidth', !0), n.left += C.css(e[0], 'borderLeftWidth', !0)), {
          top: t.top - n.top - C.css(r, 'marginTop', !0),
          left: t.left - n.left - C.css(r, 'marginLeft', !0)
        }
      }
    },
    offsetParent: function () {
      return this.map(function () {
        for (var e = this.offsetParent; e && !C.nodeName(e, 'html') && C.css(e, 'position') === 'static';) e = e.offsetParent
        return e || lt
      })
    }
  }), C.each({ scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' }, function (t, i) {
    var o = /Y/.test(i)
    C.fn[t] = function (e) {
      return d(this, function (e, t, n) {
        var r = mn(e)
        if (n === undefined) return r ? i in r ? r[i] : r.document.documentElement[t] : e[t]
        r ? r.scrollTo(o ? C(r).scrollLeft() : n, o ? n : C(r).scrollTop()) : e[t] = n
      }, t, e, arguments.length, null)
    }
  }), C.each(['top', 'left'], function (e, n) {
    C.cssHooks[n] = ft(y.pixelPosition, function (e, t) {
      if (t) return t = p(e, n), st.test(t) ? C(e).position()[n] + 'px' : t
    })
  }), C.each({ Height: 'height', Width: 'width' }, function (o, a) {
    C.each({ padding: 'inner' + o, content: a, '': 'outer' + o }, function (r, e) {
      C.fn[e] = function (e, t) {
        var n = arguments.length && (r || typeof e !== 'boolean')
        var i = r || (!0 === e || !0 === t ? 'margin' : 'border')
        return d(this, function (e, t, n) {
          var r
          return C.isWindow(e) ? e.document.documentElement['client' + o] : e.nodeType === 9 ? (r = e.documentElement, Math.max(e.body['scroll' + o], r['scroll' + o], e.body['offset' + o], r['offset' + o], r['client' + o])) : n === undefined ? C.css(e, t, i) : C.style(e, t, n, i)
        }, a, n ? e : undefined, n, null)
      }
    })
  }), C.fn.extend({
    bind: function (e, t, n) {
      return this.on(e, null, t, n)
    },
    unbind: function (e, t) {
      return this.off(e, null, t)
    },
    delegate: function (e, t, n, r) {
      return this.on(t, e, n, r)
    },
    undelegate: function (e, t, n) {
      return arguments.length === 1 ? this.off(e, '**') : this.off(t, e || '**', n)
    }
  }), C.fn.size = function () {
    return this.length
  }, C.fn.andSelf = C.fn.addBack, layui.define(function (e) {
    e('jquery', layui.$ = C)
  }), C
}))
!(function (p) {
  'use strict'
  var h; var f; var e; var n = p.layui && layui.define; var c = {
    getPath: (e = document.currentScript ? document.currentScript.src : (function () {
      for (var e, t = document.scripts, i = t.length - 1, n = i; n > 0; n--) {
        if (t[n].readyState === 'interactive') {
          e = t[n].src
          break
        }
      }
      return e || t[i].src
    }()), (p.LAYUI_GLOBAL || {}).layer_dir || e.substring(0, e.lastIndexOf('/') + 1)),
    config: {},
    end: {},
    minIndex: 0,
    minLeft: [],
    btn: ['&#x786E;&#x5B9A;', '&#x53D6;&#x6D88;'],
    type: ['dialog', 'page', 'iframe', 'loading', 'tips'],
    getStyle: function (e, t) {
      e = e.currentStyle || p.getComputedStyle(e, null)
      return e[e.getPropertyValue ? 'getPropertyValue' : 'getAttribute'](t)
    },
    link: function (e, i, t) {
      var n, a, o, s, r, l
      m.path && (n = document.getElementsByTagName('head')[0], a = document.createElement('link'), o = ((t = typeof i === 'string' ? i : t) || e).replace(/\.|\//g, ''), s = 'layuicss-' + o, r = 'creating', l = 0, a.rel = 'stylesheet', a.href = m.path + e, a.id = s, document.getElementById(s) || n.appendChild(a), typeof i === 'function' && (function f (e) {
        var t = document.getElementById(s)
        return ++l > 100 ? p.console && console.error(o + '.css: Invalid') : void (parseInt(c.getStyle(t, 'width')) === 1989 ? (e === r && t.removeAttribute('lay-status'), t.getAttribute('lay-status') === r ? setTimeout(f, 100) : i()) : (t.setAttribute('lay-status', r), setTimeout(function () {
          f(r)
        }, 100)))
      }()))
    }
  }; var m = {
    v: '3.5.1',
    ie: (e = navigator.userAgent.toLowerCase(), !!(p.ActiveXObject || 'ActiveXObject' in p) && ((e.match(/msie\s(\d+)/) || [])[1] || '11')),
    index: p.layer && p.layer.v ? 1e5 : 0,
    path: c.getPath,
    config: function (e, t) {
      return m.cache = c.config = h.extend({}, c.config, e = e || {}), m.path = c.config.path || m.path, typeof e.extend === 'string' && (e.extend = [e.extend]), c.config.path && m.ready(), e.extend && (n ? layui.addcss('modules/layer/' + e.extend) : c.link('theme/' + e.extend)), this
    },
    ready: function (e) {
      var t = 'layer'; var i = (n ? 'modules/layer/' : 'theme/') + 'default/layer.css?v=' + m.v
      return n ? layui.addcss(i, e, t) : c.link(i, e, t), this
    },
    alert: function (e, t, i) {
      var n = typeof t === 'function'
      return m.open(h.extend({ content: e, yes: i = n ? t : i }, n ? {} : t))
    },
    confirm: function (e, t, i, n) {
      var a = typeof t === 'function'
      return a && (n = i, i = t), m.open(h.extend({ content: e, btn: c.btn, yes: i, btn2: n }, a ? {} : t))
    },
    msg: function (e, t, i) {
      var n = typeof t === 'function'; var a = c.config.skin; var a = (a ? a + ' ' + a + '-msg' : '') || 'layui-layer-msg'
      var o = d.anim.length - 1
      return n && (i = t), m.open(h.extend({
        content: e,
        time: 3e3,
        shade: !1,
        skin: a,
        title: !1,
        closeBtn: !1,
        btn: !1,
        resize: !1,
        end: i
      }, n && !c.config.skin ? {
        skin: a + ' layui-layer-hui',
        anim: o
      } : ((t = t || {}).icon !== -1 && (void 0 !== t.icon || c.config.skin) || (t.skin = a + ' ' + (t.skin || 'layui-layer-hui')), t)))
    },
    load: function (e, t) {
      return m.open(h.extend({ type: 3, icon: e || 0, resize: !1, shade: 0.01 }, t))
    },
    tips: function (e, t, i) {
      return m.open(h.extend({
        type: 4,
        content: [e, t],
        closeBtn: !1,
        time: 3e3,
        shade: !1,
        resize: !1,
        fixed: !1,
        maxWidth: 260
      }, i))
    }
  }; var t = function (e) {
    var t = this; var i = function () {
      t.creat()
    }
    t.index = ++m.index, t.config.maxWidth = h(f).width() - 30, t.config = h.extend({}, t.config, c.config, e), document.body ? i() : setTimeout(function () {
      i()
    }, 30)
  }
  var d = (t.pt = t.prototype, ['layui-layer', '.layui-layer-title', '.layui-layer-main', '.layui-layer-dialog', 'layui-layer-iframe', 'layui-layer-content', 'layui-layer-btn', 'layui-layer-close'])
  var i = (d.anim = ['layer-anim-00', 'layer-anim-01', 'layer-anim-02', 'layer-anim-03', 'layer-anim-04', 'layer-anim-05', 'layer-anim-06'], d.SHADE = 'layui-layer-shade', d.MOVE = 'layui-layer-move', t.pt.config = {
    type: 0,
    shade: 0.3,
    fixed: !0,
    move: d[1],
    title: '&#x4FE1;&#x606F;',
    offset: 'auto',
    area: 'auto',
    closeBtn: 1,
    time: 0,
    zIndex: 19891014,
    maxWidth: 360,
    anim: 0,
    isOutAnim: !0,
    minStack: !0,
    icon: -1,
    moveType: 1,
    resize: !0,
    scrollbar: !0,
    tips: 2
  }, t.pt.vessel = function (e, t) {
    var i = this.index; var n = this.config; var a = n.zIndex + i; var o = typeof n.title === 'object'
    var s = n.maxmin && (n.type === 1 || n.type === 2)
    var o = n.title ? '<div class="layui-layer-title" style="' + (o ? n.title[1] : '') + '">' + (o ? n.title[0] : n.title) + '</div>' : ''
    return n.zIndex = a, t([n.shade ? '<div class="' + d.SHADE + '" id="' + d.SHADE + i + '" times="' + i + '" style="z-index:' + (a - 1) + '; "></div>' : '', '<div class="' + d[0] + ' layui-layer-' + c.type[n.type] + (n.type != 0 && n.type != 2 || n.shade ? '' : ' layui-layer-border') + ' ' + (n.skin || '') + '" id="' + d[0] + i + '" type="' + c.type[n.type] + '" times="' + i + '" showtime="' + n.time + '" conType="' + (e ? 'object' : 'string') + '" style="z-index: ' + a + '; width:' + n.area[0] + ';height:' + n.area[1] + ';position:' + (n.fixed ? 'fixed;' : 'absolute;') + '">' + (e && n.type != 2 ? '' : o) + '<div id="' + (n.id || '') + '" class="layui-layer-content' + (n.type == 0 && n.icon !== -1 ? ' layui-layer-padding' : '') + (n.type == 3 ? ' layui-layer-loading' + n.icon : '') + '">' + (n.type == 0 && n.icon !== -1 ? '<i class="layui-layer-ico layui-layer-ico' + n.icon + '"></i>' : '') + ((n.type != 1 || !e) && n.content || '') + '</div><span class="layui-layer-setwin">' + (i = s ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : '', n.closeBtn && (i += '<a class="layui-layer-ico ' + d[7] + ' ' + d[7] + (n.title ? n.closeBtn : n.type == 4 ? '1' : '2') + '" href="javascript:;"></a>'), i) + '</span>' + (n.btn ? (function () {
      var e = ''
      typeof n.btn === 'string' && (n.btn = [n.btn])
      for (var t = 0, i = n.btn.length; t < i; t++) e += '<a class="' + d[6] + t + '">' + n.btn[t] + '</a>'
      return '<div class="' + d[6] + ' layui-layer-btn-' + (n.btnAlign || '') + '">' + e + '</div>'
    }()) : '') + (n.resize ? '<span class="layui-layer-resize"></span>' : '') + '</div>'], o, h('<div class="' + d.MOVE + '" id="' + d.MOVE + '"></div>')), this
  }, t.pt.creat = function () {
    var e; var n = this; var a = n.config; var o = n.index; var s = typeof (l = a.content) === 'object'; var r = h('body')
    if (!a.id || !h('#' + a.id)[0]) {
      switch (typeof a.area === 'string' && (a.area = a.area === 'auto' ? ['', ''] : [a.area, '']), a.shift && (a.anim = a.shift), m.ie == 6 && (a.fixed = !1), a.type) {
        case 0:
          a.btn = 'btn' in a ? a.btn : c.btn[0], m.closeAll('dialog')
          break
        case 2:
          var l = a.content = s ? a.content : [a.content || '', 'auto']
          a.content = '<iframe scrolling="' + (a.content[1] || 'auto') + '" allowtransparency="true" id="' + d[4] + o + '" name="' + d[4] + o + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + a.content[0] + '"></iframe>'
          break
        case 3:
          delete a.title, delete a.closeBtn, a.icon === -1 && a.icon, m.closeAll('loading')
          break
        case 4:
          s || (a.content = [a.content, 'body']), a.follow = a.content[1], a.content = a.content[0] + '<i class="layui-layer-TipsG"></i>', delete a.title, a.tips = typeof a.tips === 'object' ? a.tips : [a.tips, !0], a.tipsMore || m.closeAll('tips')
      }
      n.vessel(s, function (e, t, i) {
        r.append(e[0]), s ? a.type == 2 || a.type == 4 ? h('body').append(e[1]) : l.parents('.' + d[0])[0] || (l.data('display', l.css('display')).show().addClass('layui-layer-wrap').wrap(e[1]), h('#' + d[0] + o).find('.' + d[5]).before(t)) : r.append(e[1]), h('#' + d.MOVE)[0] || r.append(c.moveElem = i), n.layero = h('#' + d[0] + o), n.shadeo = h('#' + d.SHADE + o), a.scrollbar || d.html.css('overflow', 'hidden').attr('layer-full', o)
      }).auto(o), n.shadeo.css({
        'background-color': a.shade[1] || '#000',
        opacity: a.shade[0] || a.shade
      }), a.type == 2 && m.ie == 6 && n.layero.find('iframe').attr('src', l[0]), a.type == 4 ? n.tips() : (n.offset(), parseInt(c.getStyle(document.getElementById(d.MOVE), 'z-index')) || (n.layero.css('visibility', 'hidden'), m.ready(function () {
        n.offset(), n.layero.css('visibility', 'visible')
      }))), a.fixed && f.on('resize', function () {
        n.offset(), (/^\d+%$/.test(a.area[0]) || /^\d+%$/.test(a.area[1])) && n.auto(o), a.type == 4 && n.tips()
      }), a.time <= 0 || setTimeout(function () {
        m.close(n.index)
      }, a.time), n.move().callback(), d.anim[a.anim] && (e = 'layer-anim ' + d.anim[a.anim], n.layero.addClass(e).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        h(this).removeClass(e)
      })), a.isOutAnim && n.layero.data('isOutAnim', !0)
    }
  }, t.pt.auto = function (e) {
    var t = this.config; var i = h('#' + d[0] + e)
    var n = (t.area[0] === '' && t.maxWidth > 0 && (m.ie && m.ie < 8 && t.btn && i.width(i.innerWidth()), i.outerWidth() > t.maxWidth && i.width(t.maxWidth)), [i.innerWidth(), i.innerHeight()])
    var a = i.find(d[1]).outerHeight() || 0; var o = i.find('.' + d[6]).outerHeight() || 0; var e = function (e) {
      (e = i.find(e)).height(n[1] - a - o - 2 * (0 | parseFloat(e.css('padding-top'))))
    }
    return t.type === 2 ? e('iframe') : t.area[1] === '' ? t.maxHeight > 0 && i.outerHeight() > t.maxHeight ? (n[1] = t.maxHeight, e('.' + d[5])) : t.fixed && n[1] >= f.height() && (n[1] = f.height(), e('.' + d[5])) : e('.' + d[5]), this
  }, t.pt.offset = function () {
    var e = this; var t = e.config; var i = e.layero; var n = [i.outerWidth(), i.outerHeight()]
    var a = typeof t.offset === 'object'
    e.offsetTop = (f.height() - n[1]) / 2, e.offsetLeft = (f.width() - n[0]) / 2, a ? (e.offsetTop = t.offset[0], e.offsetLeft = t.offset[1] || e.offsetLeft) : t.offset !== 'auto' && (t.offset === 't' ? e.offsetTop = 0 : t.offset === 'r' ? e.offsetLeft = f.width() - n[0] : t.offset === 'b' ? e.offsetTop = f.height() - n[1] : t.offset === 'l' ? e.offsetLeft = 0 : t.offset === 'lt' ? (e.offsetTop = 0, e.offsetLeft = 0) : t.offset === 'lb' ? (e.offsetTop = f.height() - n[1], e.offsetLeft = 0) : t.offset === 'rt' ? (e.offsetTop = 0, e.offsetLeft = f.width() - n[0]) : t.offset === 'rb' ? (e.offsetTop = f.height() - n[1], e.offsetLeft = f.width() - n[0]) : e.offsetTop = t.offset), t.fixed || (e.offsetTop = /%$/.test(e.offsetTop) ? f.height() * parseFloat(e.offsetTop) / 100 : parseFloat(e.offsetTop), e.offsetLeft = /%$/.test(e.offsetLeft) ? f.width() * parseFloat(e.offsetLeft) / 100 : parseFloat(e.offsetLeft), e.offsetTop += f.scrollTop(), e.offsetLeft += f.scrollLeft()), i.attr('minLeft') && (e.offsetTop = f.height() - (i.find(d[1]).outerHeight() || 0), e.offsetLeft = i.css('left')), i.css({
      top: e.offsetTop,
      left: e.offsetLeft
    })
  }, t.pt.tips = function () {
    var e = this.config; var t = this.layero; var i = [t.outerWidth(), t.outerHeight()]; var n = h(e.follow); var a = {
      width: (n = n[0] ? n : h('body')).outerWidth(),
      height: n.outerHeight(),
      top: n.offset().top,
      left: n.offset().left
    }; var o = t.find('.layui-layer-TipsG'); var n = e.tips[0]
    e.tips[1] || o.remove(), a.autoLeft = function () {
      a.left + i[0] - f.width() > 0 ? (a.tipLeft = a.left + a.width - i[0], o.css({
        right: 12,
        left: 'auto'
      })) : a.tipLeft = a.left
    }, a.where = [function () {
      a.autoLeft(), a.tipTop = a.top - i[1] - 10, o.removeClass('layui-layer-TipsB').addClass('layui-layer-TipsT').css('border-right-color', e.tips[1])
    }, function () {
      a.tipLeft = a.left + a.width + 10, a.tipTop = a.top, o.removeClass('layui-layer-TipsL').addClass('layui-layer-TipsR').css('border-bottom-color', e.tips[1])
    }, function () {
      a.autoLeft(), a.tipTop = a.top + a.height + 10, o.removeClass('layui-layer-TipsT').addClass('layui-layer-TipsB').css('border-right-color', e.tips[1])
    }, function () {
      a.tipLeft = a.left - i[0] - 10, a.tipTop = a.top, o.removeClass('layui-layer-TipsR').addClass('layui-layer-TipsL').css('border-bottom-color', e.tips[1])
    }], a.where[n - 1](), n === 1 ? a.top - (f.scrollTop() + i[1] + 16) < 0 && a.where[2]() : n === 2 ? f.width() - (a.left + a.width + i[0] + 16) > 0 || a.where[3]() : n === 3 ? a.top - f.scrollTop() + a.height + i[1] + 16 - f.height() > 0 && a.where[0]() : n === 4 && i[0] + 16 - a.left > 0 && a.where[1](), t.find('.' + d[5]).css({
      'background-color': e.tips[1],
      'padding-right': e.closeBtn ? '30px' : ''
    }), t.css({ left: a.tipLeft - (e.fixed ? f.scrollLeft() : 0), top: a.tipTop - (e.fixed ? f.scrollTop() : 0) })
  }, t.pt.move = function () {
    var o = this; var s = o.config; var e = h(document); var r = o.layero; var t = r.find(s.move)
    var i = r.find('.layui-layer-resize'); var l = {}
    return s.move && t.css('cursor', 'move'), t.on('mousedown', function (e) {
      e.preventDefault(), s.move && (l.moveStart = !0, l.offset = [e.clientX - parseFloat(r.css('left')), e.clientY - parseFloat(r.css('top'))], c.moveElem.css('cursor', 'move').show())
    }), i.on('mousedown', function (e) {
      e.preventDefault(), l.resizeStart = !0, l.offset = [e.clientX, e.clientY], l.area = [r.outerWidth(), r.outerHeight()], c.moveElem.css('cursor', 'se-resize').show()
    }), e.on('mousemove', function (e) {
      var t, i, n, a
      l.moveStart && (n = e.clientX - l.offset[0], a = e.clientY - l.offset[1], t = r.css('position') === 'fixed', e.preventDefault(), l.stX = t ? 0 : f.scrollLeft(), l.stY = t ? 0 : f.scrollTop(), s.moveOut || (t = f.width() - r.outerWidth() + l.stX, i = f.height() - r.outerHeight() + l.stY, t < (n = n < l.stX ? l.stX : n) && (n = t), i < (a = a < l.stY ? l.stY : a) && (a = i)), r.css({
        left: n,
        top: a
      })), s.resize && l.resizeStart && (n = e.clientX - l.offset[0], a = e.clientY - l.offset[1], e.preventDefault(), m.style(o.index, {
        width: l.area[0] + n,
        height: l.area[1] + a
      }), l.isResize = !0, s.resizing && s.resizing(r))
    }).on('mouseup', function (e) {
      l.moveStart && (delete l.moveStart, c.moveElem.hide(), s.moveEnd && s.moveEnd(r)), l.resizeStart && (delete l.resizeStart, c.moveElem.hide())
    }), o
  }, t.pt.callback = function () {
    var t = this; var i = t.layero; var n = t.config
    t.openLayer(), n.success && (n.type == 2 ? i.find('iframe').on('load', function () {
      n.success(i, t.index, t)
    }) : n.success(i, t.index, t)), m.ie == 6 && t.IE6(i), i.find('.' + d[6]).children('a').on('click', function () {
      var e = h(this).index()
      e === 0 ? n.yes ? n.yes(t.index, i) : n.btn1 ? n.btn1(t.index, i) : m.close(t.index) : !1 !== (n['btn' + (e + 1)] && n['btn' + (e + 1)](t.index, i)) && m.close(t.index)
    }), i.find('.' + d[7]).on('click', function () {
      !1 !== (n.cancel && n.cancel(t.index, i)) && m.close(t.index)
    }), n.shadeClose && t.shadeo.on('click', function () {
      m.close(t.index)
    }), i.find('.layui-layer-min').on('click', function () {
      !1 !== (n.min && n.min(i, t.index)) && m.min(t.index, n)
    }), i.find('.layui-layer-max').on('click', function () {
      h(this).hasClass('layui-layer-maxmin') ? (m.restore(t.index), n.restore && n.restore(i, t.index)) : (m.full(t.index, n), setTimeout(function () {
        n.full && n.full(i, t.index)
      }, 100))
    }), n.end && (c.end[t.index] = n.end)
  }, c.reselect = function () {
    h.each(h('select'), function (e, t) {
      var i = h(this)
      i.parents('.' + d[0])[0] || i.attr('layer') == 1 && h('.' + d[0]).length < 1 && i.removeAttr('layer').show()
    })
  }, t.pt.IE6 = function (e) {
    h('select').each(function (e, t) {
      var i = h(this)
      i.parents('.' + d[0])[0] || i.css('display') !== 'none' && i.attr({ layer: '1' }).hide()
    })
  }, t.pt.openLayer = function () {
    m.zIndex = this.config.zIndex, m.setTop = function (e) {
      return m.zIndex = parseInt(e[0].style.zIndex), e.on('mousedown', function () {
        m.zIndex++, e.css('z-index', m.zIndex + 1)
      }), m.zIndex
    }
  }, c.record = function (e) {
    var t = [e.width(), e.height(), e.position().top, e.position().left + parseFloat(e.css('margin-left'))]
    e.find('.layui-layer-max').addClass('layui-layer-maxmin'), e.attr({ area: t })
  }, c.rescollbar = function (e) {
    d.html.attr('layer-full') == e && (d.html[0].style.removeProperty ? d.html[0].style.removeProperty('overflow') : d.html[0].style.removeAttribute('overflow'), d.html.removeAttr('layer-full'))
  }, (p.layer = m).getChildFrame = function (e, t) {
    return t = t || h('.' + d[4]).attr('times'), h('#' + d[0] + t).find('iframe').contents().find(e)
  }, m.getFrameIndex = function (e) {
    return h('#' + e).parents('.' + d[4]).attr('times')
  }, m.iframeAuto = function (e) {
    var t, i, n
    e && (t = m.getChildFrame('html', e).outerHeight(), i = (e = h('#' + d[0] + e)).find(d[1]).outerHeight() || 0, n = e.find('.' + d[6]).outerHeight() || 0, e.css({ height: t + i + n }), e.find('iframe').css({ height: t }))
  }, m.iframeSrc = function (e, t) {
    h('#' + d[0] + e).find('iframe').attr('src', t)
  }, m.style = function (e, t, i) {
    var e = h('#' + d[0] + e); var n = e.find('.layui-layer-content'); var a = e.attr('type')
    var o = e.find(d[1]).outerHeight() || 0; var s = e.find('.' + d[6]).outerHeight() || 0
    e.attr('minLeft')
    a !== c.type[3] && a !== c.type[4] && (i || (parseFloat(t.width) <= 260 && (t.width = 260), parseFloat(t.height) - o - s <= 64 && (t.height = 64 + o + s)), e.css(t), s = e.find('.' + d[6]).outerHeight() || 0, a === c.type[2] ? e.find('iframe').css({ height: parseFloat(t.height) - o - s }) : n.css({ height: parseFloat(t.height) - o - s - parseFloat(n.css('padding-top')) - parseFloat(n.css('padding-bottom')) }))
  }, m.min = function (e, t) {
    t = t || {}
    var i = h('#' + d[0] + e); var n = h('#' + d.SHADE + e); var a = i.find(d[1]).outerHeight() || 0
    var o = i.attr('minLeft') || 181 * c.minIndex + 'px'; var s = i.css('position')
    var r = { width: 180, height: a, position: 'fixed', overflow: 'hidden' }
    c.record(i), c.minLeft[0] && (o = c.minLeft[0], c.minLeft.shift()), t.minStack && (r.left = o, r.top = f.height() - a, i.attr('minLeft') || c.minIndex++, i.attr('minLeft', o)), i.attr('position', s), m.style(e, r, !0), i.find('.layui-layer-min').hide(), i.attr('type') === 'page' && i.find(d[4]).hide(), c.rescollbar(e), n.hide()
  }, m.restore = function (e) {
    var t = h('#' + d[0] + e); var i = h('#' + d.SHADE + e); var n = t.attr('area').split(',')
    t.attr('type')
    m.style(e, {
      width: parseFloat(n[0]),
      height: parseFloat(n[1]),
      top: parseFloat(n[2]),
      left: parseFloat(n[3]),
      position: t.attr('position'),
      overflow: 'visible'
    }, !0), t.find('.layui-layer-max').removeClass('layui-layer-maxmin'), t.find('.layui-layer-min').show(), t.attr('type') === 'page' && t.find(d[4]).show(), c.rescollbar(e), i.show()
  }, m.full = function (t) {
    var i = h('#' + d[0] + t)
    c.record(i), d.html.attr('layer-full') || d.html.css('overflow', 'hidden').attr('layer-full', t), clearTimeout(void 0), setTimeout(function () {
      var e = i.css('position') === 'fixed'
      m.style(t, {
        top: e ? 0 : f.scrollTop(),
        left: e ? 0 : f.scrollLeft(),
        width: f.width(),
        height: f.height()
      }, !0), i.find('.layui-layer-min').hide()
    }, 100)
  }, m.title = function (e, t) {
    h('#' + d[0] + (t || m.index)).find(d[1]).html(e)
  }, m.close = function (a, o) {
    var s; var e; var r = h('#' + d[0] + a); var l = r.attr('type')
    r[0] && (s = 'layui-layer-wrap', e = function () {
      if (l === c.type[1] && r.attr('conType') === 'object') {
        r.children(':not(.' + d[5] + ')').remove()
        for (var e = r.find('.' + s), t = 0; t < 2; t++) e.unwrap()
        e.css('display', e.data('display')).removeClass(s)
      } else {
        if (l === c.type[2]) {
          try {
            var i = h('#' + d[4] + a)[0]
            i.contentWindow.document.write(''), i.contentWindow.close(), r.find('.' + d[5])[0].removeChild(i)
          } catch (n) {
          }
        }
        r[0].innerHTML = '', r.remove()
      }
      typeof c.end[a] === 'function' && c.end[a](), delete c.end[a], typeof o === 'function' && o()
    }, r.data('isOutAnim') && r.addClass('layer-anim layer-anim-close'), h('#layui-layer-moves, #' + d.SHADE + a).remove(), m.ie == 6 && c.reselect(), c.rescollbar(a), r.attr('minLeft') && (c.minIndex--, c.minLeft.push(r.attr('minLeft'))), m.ie && m.ie < 10 || !r.data('isOutAnim') ? e() : setTimeout(function () {
      e()
    }, 200))
  }, m.closeAll = function (n, a) {
    typeof n === 'function' && (a = n, n = null)
    var o = h('.' + d[0])
    h.each(o, function (e) {
      var t = h(this); var i = n ? t.attr('type') === n : 1
      i && m.close(t.attr('times'), e === o.length - 1 ? a : null)
    }), o.length === 0 && typeof a === 'function' && a()
  }, m.cache || {}); var g = function (e) {
    return i.skin ? ' ' + i.skin + ' ' + i.skin + '-' + e : ''
  }
  m.prompt = function (i, n) {
    var e = ''
    typeof (i = i || {}) === 'function' && (n = i), i.area && (e = 'style="width: ' + (t = i.area)[0] + '; height: ' + t[1] + ';"', delete i.area)
    var a
    var t = i.formType == 2 ? '<textarea class="layui-layer-input"' + e + '></textarea>' : '<input type="' + (i.formType == 1 ? 'password' : 'text') + '" class="layui-layer-input">'
    var o = i.success
    return delete i.success, m.open(h.extend({
      type: 1,
      btn: ['&#x786E;&#x5B9A;', '&#x53D6;&#x6D88;'],
      content: t,
      skin: 'layui-layer-prompt' + g('prompt'),
      maxWidth: f.width(),
      success: function (e) {
        (a = e.find('.layui-layer-input')).val(i.value || '').focus(), typeof o === 'function' && o(e)
      },
      resize: !1,
      yes: function (e) {
        var t = a.val()
        t === '' ? a.focus() : t.length > (i.maxlength || 500) ? m.tips('&#x6700;&#x591A;&#x8F93;&#x5165;' + (i.maxlength || 500) + '&#x4E2A;&#x5B57;&#x6570;', a, { tips: 1 }) : n && n(t, e, a)
      }
    }, i))
  }, m.tab = function (n) {
    var a = (n = n || {}).tab || {}; var o = 'layui-this'; var s = n.success
    return delete n.success, m.open(h.extend({
      type: 1,
      skin: 'layui-layer-tab' + g('tab'),
      resize: !1,
      title: (function () {
        var e = a.length; var t = 1; var i = ''
        if (e > 0) for (i = '<span class="' + o + '">' + a[0].title + '</span>'; t < e; t++) i += '<span>' + a[t].title + '</span>'
        return i
      }()),
      content: '<ul class="layui-layer-tabmain">' + (function () {
        var e = a.length; var t = 1; var i = ''
        if (e > 0) for (i = '<li class="layui-layer-tabli ' + o + '">' + (a[0].content || 'no content') + '</li>'; t < e; t++) i += '<li class="layui-layer-tabli">' + (a[t].content || 'no  content') + '</li>'
        return i
      }()) + '</ul>',
      success: function (e) {
        var t = e.find('.layui-layer-title').children(); var i = e.find('.layui-layer-tabmain').children()
        t.on('mousedown', function (e) {
          e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
          var e = h(this); var t = e.index()
          e.addClass(o).siblings().removeClass(o), i.eq(t).show().siblings().hide(), typeof n.change === 'function' && n.change(t)
        }), typeof s === 'function' && s(e)
      }
    }, n))
  }, m.photos = function (i, e, n) {
    var a = {}
    if ((i = i || {}).photos) {
      var t = !(typeof i.photos === 'string' || i.photos instanceof h); var o = t ? i.photos : {}; var s = o.data || []
      var r = o.start || 0; var l = (a.imgIndex = 1 + (0 | r), i.img = i.img || 'img', i.success)
      if (delete i.success, t) {
        if (s.length === 0) return m.msg('&#x6CA1;&#x6709;&#x56FE;&#x7247;')
      } else {
        var f = h(i.photos); var c = function () {
          s = [], f.find(i.img).each(function (e) {
            var t = h(this)
            t.attr('layer-index', e), s.push({
              alt: t.attr('alt'),
              pid: t.attr('layer-pid'),
              src: t.attr('layer-src') || t.attr('src'),
              thumb: t.attr('src')
            })
          })
        }
        if (c(), s.length === 0) return
        if (e || f.on('click', i.img, function () {
          c()
          var e = h(this).attr('layer-index')
          m.photos(h.extend(i, { photos: { start: e, data: s, tab: i.tab }, full: i.full }), !0)
        }), !e) return
      }
      a.imgprev = function (e) {
        a.imgIndex--, a.imgIndex < 1 && (a.imgIndex = s.length), a.tabimg(e)
      }, a.imgnext = function (e, t) {
        a.imgIndex++, a.imgIndex > s.length && (a.imgIndex = 1, t) || a.tabimg(e)
      }, a.keyup = function (e) {
        var t
        a.end || (t = e.keyCode, e.preventDefault(), t === 37 ? a.imgprev(!0) : t === 39 ? a.imgnext(!0) : t === 27 && m.close(a.index))
      }, a.tabimg = function (e) {
        if (!(s.length <= 1)) return o.start = a.imgIndex - 1, m.close(a.index), m.photos(i, !0, e)
      }, a.event = function () {
        a.bigimg.find('.layui-layer-imgprev').on('click', function (e) {
          e.preventDefault(), a.imgprev(!0)
        }), a.bigimg.find('.layui-layer-imgnext').on('click', function (e) {
          e.preventDefault(), a.imgnext(!0)
        }), h(document).on('keyup', a.keyup)
      }, a.loadi = m.load(1, { shade: !('shade' in i) && 0.9, scrollbar: !1 })
      var t = s[r].src; var d = function (e) {
        var t
        m.close(a.loadi), n && (i.anim = -1), a.index = m.open(h.extend({
          type: 1,
          id: 'layui-layer-photos',
          area: (e = [e.width, e.height], t = [h(p).width() - 100, h(p).height() - 100], !i.full && (e[0] > t[0] || e[1] > t[1]) && ((t = [e[0] / t[0], e[1] / t[1]])[1] < t[0] ? (e[0] = e[0] / t[0], e[1] = e[1] / t[0]) : t[0] < t[1] && (e[0] = e[0] / t[1], e[1] = e[1] / t[1])), [e[0] + 'px', e[1] + 'px']),
          title: !1,
          shade: 0.9,
          shadeClose: !0,
          closeBtn: !1,
          move: '.layui-layer-phimg img',
          moveType: 1,
          scrollbar: !1,
          moveOut: !0,
          anim: 5,
          isOutAnim: !1,
          skin: 'layui-layer-photos' + g('photos'),
          content: '<div class="layui-layer-phimg"><img src="' + s[r].src + '" alt="' + (s[r].alt || '') + '" layer-pid="' + s[r].pid + '">' + (s.length > 1 ? '<div class="layui-layer-imgsee"><span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span><div class="layui-layer-imgbar" style="display:' + (n ? 'block' : '') + '"><span class="layui-layer-imgtit"><a href="javascript:;">' + (s[r].alt || '') + '</a><em>' + a.imgIndex + ' / ' + s.length + '</em></span></div></div>' : '') + '</div>',
          success: function (e, t) {
            a.bigimg = e.find('.layui-layer-phimg'), a.imgsee = e.find('.layui-layer-imgbar'), a.event(e), i.tab && i.tab(s[r], e), typeof l === 'function' && l(e)
          },
          end: function () {
            a.end = !0, h(document).off('keyup', a.keyup)
          }
        }, i))
      }; var u = function () {
        m.close(a.loadi), m.msg('&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;', {
          time: 3e4,
          btn: ['&#x4E0B;&#x4E00;&#x5F20;', '&#x4E0D;&#x770B;&#x4E86;'],
          yes: function () {
            s.length > 1 && a.imgnext(!0, !0)
          }
        })
      }; var y = new Image();
      (y.src = t, y.complete) ? d(y) : (y.onload = function () {
        y.onload = null, d(y)
      }, y.onerror = function (e) {
        y.onerror = null, u(e)
      })
    }
  }, c.run = function (e) {
    f = (h = e)(p), d.html = h('html'), m.open = function (e) {
      return new t(e).index
    }
  }, p.layui && layui.define ? (m.ready(), layui.define('jquery', function (e) {
    m.path = layui.cache.dir, c.run(layui.$), e('layer', p.layer = m)
  })) : typeof define === 'function' && define.amd ? define(['jquery'], function () {
    return c.run(p.jQuery), m
  }) : (m.ready(), c.run(p.jQuery))
}(window))
layui.define('jquery', function (e) {
  'use strict'
  var u = layui.$; var a = layui.hint(); var o = {
    fixbar: function (t) {
      var e; var i; var n = 'layui-fixbar'; var o = 'layui-fixbar-top'; var a = u(document); var r = u('body')
      var l = ((t = u.extend({ showHeight: 200 }, t)).bar1 = !0 === t.bar1 ? '&#xe606;' : t.bar1, t.bar2 = !0 === t.bar2 ? '&#xe607;' : t.bar2, t.bgcolor = t.bgcolor ? 'background-color:' + t.bgcolor : '', [t.bar1, t.bar2, '&#xe604;'])
      var l = u(['<ul class="' + n + '">', t.bar1 ? '<li class="layui-icon" lay-type="bar1" style="' + t.bgcolor + '">' + l[0] + '</li>' : '', t.bar2 ? '<li class="layui-icon" lay-type="bar2" style="' + t.bgcolor + '">' + l[1] + '</li>' : '', '<li class="layui-icon ' + o + '" lay-type="top" style="' + t.bgcolor + '">' + l[2] + '</li>', '</ul>'].join(''))
      var c = l.find('.' + o); var g = function () {
        a.scrollTop() >= t.showHeight ? e || (c.show(), e = 1) : e && (c.hide(), e = 0)
      }
      u('.' + n)[0] || (typeof t.css === 'object' && l.css(t.css), r.append(l), g(), l.find('li').on('click', function () {
        var e = u(this).attr('lay-type')
        e === 'top' && u('html,body').animate({ scrollTop: 0 }, 200), t.click && t.click.call(this, e)
      }), a.on('scroll', function () {
        clearTimeout(i), i = setTimeout(function () {
          g()
        }, 100)
      }))
    },
    countdown: function (e, t, i) {
      var n = this; var o = typeof t === 'function'; var a = new Date(e).getTime()
      var r = new Date(!t || o ? (new Date()).getTime() : t).getTime(); var a = a - r
      var l = [Math.floor(a / 864e5), Math.floor(a / 36e5) % 24, Math.floor(a / 6e4) % 60, Math.floor(a / 1e3) % 60]
      var o = (o && (i = t), setTimeout(function () {
        n.countdown(e, r + 1e3, i)
      }, 1e3))
      return i && i(a > 0 ? l : [0, 0, 0, 0], t, o), a <= 0 && clearTimeout(o), o
    },
    timeAgo: function (e, t) {
      var i = this; var n = [[], []]; var o = (new Date()).getTime() - new Date(e).getTime()
      return o > 26784e5 ? (o = new Date(e), n[0][0] = i.digit(o.getFullYear(), 4), n[0][1] = i.digit(o.getMonth() + 1), n[0][2] = i.digit(o.getDate()), t || (n[1][0] = i.digit(o.getHours()), n[1][1] = i.digit(o.getMinutes()), n[1][2] = i.digit(o.getSeconds())), n[0].join('-') + ' ' + n[1].join(':')) : o >= 864e5 ? (o / 1e3 / 60 / 60 / 24 | 0) + '\u5929\u524d' : o >= 36e5 ? (o / 1e3 / 60 / 60 | 0) + '\u5c0f\u65f6\u524d' : o >= 18e4 ? (o / 1e3 / 60 | 0) + '\u5206\u949f\u524d' : o < 0 ? '\u672a\u6765' : '\u521a\u521a'
    },
    digit: function (e, t) {
      var i = ''
      t = t || 2
      for (var n = (e = String(e)).length; n < t; n++) i += '0'
      return e < Math.pow(10, t) ? i + (0 | e) : e
    },
    toDateString: function (e, t) {
      if (e === null || e === '') return ''
      var i = this; var n = new Date((function () {
        if (e) return !isNaN(e) && typeof e === 'string' ? parseInt(e) : e
      }()) || new Date()); var o = [i.digit(n.getFullYear(), 4), i.digit(n.getMonth() + 1), i.digit(n.getDate())]
      var i = [i.digit(n.getHours()), i.digit(n.getMinutes()), i.digit(n.getSeconds())]
      return n.getDate() ? (t = t || 'yyyy-MM-dd HH:mm:ss').replace(/yyyy/g, o[0]).replace(/MM/g, o[1]).replace(/dd/g, o[2]).replace(/HH/g, i[0]).replace(/mm/g, i[1]).replace(/ss/g, i[2]) : (a.error('Invalid Msec for "util.toDateString(Msec)"'), '')
    },
    escape: function (e) {
      return e === undefined || e === null ? '' : /[<"'>]|&(?=#[a-zA-Z0-9]+)/g.test(e += '') ? e.replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;') : e
    },
    unescape: function (e) {
      return e !== undefined && e !== null || (e = ''), (e += '').replace(/\&amp;/g, '&').replace(/\&lt;/g, '<').replace(/\&gt;/g, '>').replace(/\&#39;/g, "'").replace(/\&quot;/g, '"')
    },
    toVisibleArea: function (e) {
      var t, i, n, o, a, r, l, c;
      (e = u.extend({
        margin: 160,
        duration: 200,
        type: 'y'
      }, e)).scrollElem[0] && e.thisElem[0] && (t = e.scrollElem, l = e.thisElem, n = (a = e.type === 'y') ? 'top' : 'left', o = t[i = a ? 'scrollTop' : 'scrollLeft'](), a = t[a ? 'height' : 'width'](), r = t.offset()[n], c = {}, ((l = l.offset()[n] - r) > a - e.margin || l < e.margin) && (c[i] = l - a / 2 + o, t.animate(c, e.duration)))
    },
    event: function (i, n, e) {
      var t = u('body')
      return e = e || 'click', n = o.event[i] = u.extend(!0, o.event[i], n) || {}, o.event.UTIL_EVENT_CALLBACK = o.event.UTIL_EVENT_CALLBACK || {}, t.off(e, '*[' + i + ']', o.event.UTIL_EVENT_CALLBACK[i]), o.event.UTIL_EVENT_CALLBACK[i] = function () {
        var e = u(this); var t = e.attr(i)
        typeof n[t] === 'function' && n[t].call(this, e)
      }, t.on(e, '*[' + i + ']', o.event.UTIL_EVENT_CALLBACK[i]), n
    }
  }
  o.on = o.event, e('util', o)
})
layui.define(['jquery', 'laytpl', 'lay'], function (e) {
  'use strict'
  var n; var i; var t; var s = layui.$; var m = layui.laytpl; var a = layui.hint(); var l = layui.device().mobile ? 'click' : 'mousedown'
  var o = 'dropdown'; var r = 'layui_' + o + '_index'; var c = {
    config: {},
    index: layui[o] ? layui[o].index + 1e4 : 0,
    set: function (e) {
      var i = this
      return i.config = s.extend({}, i.config, e), i
    },
    on: function (e, i) {
      return layui.onevent.call(this, o, e, i)
    }
  }; var p = function () {
    var i = this; var e = i.config; var t = e.id
    return p.that[t] = i, {
      config: e,
      reload: function (e) {
        i.reload.call(i, e)
      }
    }
  }; var u = 'layui-menu-item-up'; var d = 'layui-menu-item-down'; var y = 'layui-menu-body-title'; var f = 'layui-menu-item-group'
  var g = 'layui-menu-item-parent'; var h = 'layui-menu-item-checked'; var v = 'layui-menu-item-checked2'
  var w = 'layui-menu-body-panel'; var C = 'layui-menu-body-panel-left'; var V = '.' + f + '>.' + y; var k = function (e) {
    var i = this
    i.index = ++c.index, i.config = s.extend({}, i.config, c.config, e), i.init()
  }
  k.prototype.config = {
    trigger: 'click',
    content: '',
    className: '',
    style: '',
    show: !1,
    isAllowSpread: !0,
    isSpreadItem: !0,
    data: [],
    delay: 300
  }, k.prototype.reload = function (e) {
    var i = this
    i.config = s.extend({}, i.config, e), i.init(!0)
  }, k.prototype.init = function (e) {
    var i = this; var t = i.config; var n = t.elem = s(t.elem)
    return n.length > 1 ? (layui.each(n, function () {
      c.render(s.extend({}, t, { elem: this }))
    }), i) : !e && n[0] && n.data(r) ? (n = p.getThis(n.data(r))) ? n.reload(t) : void 0 : (t.id = 'id' in t ? t.id : i.index, t.show && i.render(e), void i.events())
  }, k.prototype.render = function (e) {
    var n = this; var u = n.config; var i = s('body'); var d = function (r, e) {
      return layui.each(e, function (e, i) {
        var t; var n = i.child && i.child.length > 0; var a = ('isSpreadItem' in i ? i : u).isSpreadItem
        var l = i.templet ? m(i.templet).render(i) : u.templet ? m(u.templet).render(i) : i.title
        var o = (n && (i.type = i.type || 'parent'), i.type ? {
          group: 'group',
          parent: 'parent',
          '-': '-'
        }[i.type] || 'parent' : '');
        (o === '-' || i.title || i.id || n) && ((l = s(['<li' + (t = {
          group: 'layui-menu-item-group' + (u.isAllowSpread ? a ? ' layui-menu-item-down' : ' layui-menu-item-up' : ''),
          parent: g,
          '-': 'layui-menu-item-divider'
        }, n || o ? ' class="' + t[o] + '"' : '') + '>', (t = 'href' in i ? '<a href="' + i.href + '" target="' + (i.target || '_self') + '">' + l + '</a>' : l, n ? '<div class="' + y + '">' + t + (o === 'parent' ? '<i class="layui-icon layui-icon-right"></i>' : o === 'group' && u.isAllowSpread ? '<i class="layui-icon layui-icon-' + (a ? 'up' : 'down') + '"></i>' : '') + '</div>' : '<div class="' + y + '">' + t + '</div>'), '</li>'].join(''))).data('item', i), n && (a = s('<div class="layui-panel layui-menu-body-panel"></div>'), t = s('<ul></ul>'), o === 'parent' ? (a.append(d(t, i.child)), l.append(a)) : l.append(d(t, i.child))), r.append(l))
      }), r
    }
    var t = ['<div class="layui-dropdown layui-border-box layui-panel layui-anim layui-anim-downbit">', '</div>'].join('')
    !(e = u.trigger !== 'contextmenu' && !lay.isTopElem(u.elem[0]) ? e : !0) && u.elem.data(r + '_opened') || (n.elemView = s(t), n.elemView.append(u.content || (e = s('<ul class="layui-menu layui-dropdown-menu"></ul>'), u.data.length > 0 ? d(e, u.data) : e.html('<li class="layui-menu-item-none">no menu</li>'), e)), u.className && n.elemView.addClass(u.className), u.style && n.elemView.attr('style', u.style), c.thisId = u.id, n.remove(), i.append(n.elemView), u.elem.data(r + '_opened', !0), n.position(), (p.prevElem = n.elemView).data('prevElem', u.elem), n.elemView.find('.layui-menu').on(l, function (e) {
      layui.stope(e)
    }), n.elemView.find('.layui-menu li').on('click', function (e) {
      var i = s(this); var t = i.data('item') || {}
      t.child && t.child.length > 0 || t.type === '-' || (n.remove(), typeof u.click === 'function' && u.click(t, i))
    }), n.elemView.find(V).on('click', function (e) {
      var i = s(this).parent()
      (i.data('item') || {}).type === 'group' && u.isAllowSpread && p.spread(i)
    }), u.trigger === 'mouseenter' && n.elemView.on('mouseenter', function () {
      clearTimeout(p.timer)
    }).on('mouseleave', function () {
      n.delayRemove()
    }))
  }, k.prototype.position = function (e) {
    var i = this.config
    lay.position(i.elem[0], this.elemView[0], {
      position: i.position,
      e: this.e,
      clickType: i.trigger === 'contextmenu' ? 'right' : null,
      align: i.align || null
    })
  }, k.prototype.remove = function () {
    this.config
    var e = p.prevElem
    e && (e.data('prevElem') && e.data('prevElem').data(r + '_opened', !1), e.remove())
  }, k.prototype.delayRemove = function () {
    var e = this; var i = e.config
    clearTimeout(p.timer), p.timer = setTimeout(function () {
      e.remove()
    }, i.delay)
  }, k.prototype.events = function () {
    var i = this; var t = i.config
    t.trigger === 'hover' && (t.trigger = 'mouseenter'), i.prevElem && i.prevElem.off(t.trigger, i.prevElemCallback), i.prevElem = t.elem, i.prevElemCallback = function (e) {
      clearTimeout(p.timer), i.e = e, i.render(), e.preventDefault(), typeof t.ready === 'function' && t.ready(i.elemView, t.elem, i.e.target)
    }, t.elem.on(t.trigger, i.prevElemCallback), t.trigger === 'mouseenter' && t.elem.on('mouseleave', function () {
      i.delayRemove()
    })
  }, p.that = {}, p.getThis = function (e) {
    var i = p.that[e]
    return i || a.error(e ? o + " instance with ID '" + e + "' not found" : 'ID argument required'), i
  }, p.spread = function (e) {
    var i = e.children('.' + y).find('.layui-icon')
    e.hasClass(u) ? (e.removeClass(u).addClass(d), i.removeClass('layui-icon-down').addClass('layui-icon-up')) : (e.removeClass(d).addClass(u), i.removeClass('layui-icon-up').addClass('layui-icon-down'))
  }, n = s(window), i = s(document), n.on('resize', function () {
    if (c.thisId) {
      var e = p.getThis(c.thisId)
      if (e) {
        if (!e.elemView[0] || !s('.layui-dropdown')[0]) return !1
        e.config.trigger === 'contextmenu' ? e.remove() : e.position()
      }
    }
  }), i.on(l, function (e) {
    var i, t
    !c.thisId || (i = p.getThis(c.thisId)) && (t = i.config, !lay.isTopElem(t.elem[0]) && t.trigger !== 'contextmenu' && (e.target === t.elem[0] || t.elem.find(e.target)[0] || e.target === i.elemView[0] || i.elemView && i.elemView.find(e.target)[0]) || i.remove())
  }), t = '.layui-menu:not(.layui-dropdown-menu) li', i.on('click', t, function (e) {
    var i = s(this); var t = i.parents('.layui-menu').eq(0); var n = i.hasClass(f) || i.hasClass(g)
    var a = t.attr('lay-filter') || t.attr('id'); var l = lay.options(this)
    i.hasClass('layui-menu-item-divider') || n || (t.find('.' + h).removeClass(h), t.find('.' + v).removeClass(v), i.addClass(h), i.parents('.' + g).addClass(v), layui.event.call(this, o, 'click(' + a + ')', l))
  }), i.on('click', t + V, function (e) {
    var i = s(this).parents('.' + f + ':eq(0)'); var t = lay.options(i[0])
    'isAllowSpread' in t && !t.isAllowSpread || p.spread(i)
  }), t = '.layui-menu .' + g, i.on('mouseenter', t, function (e) {
    var i; var t = s(this).find('.' + w)
    t[0] && ((i = t[0].getBoundingClientRect()).right > n.width() && (t.addClass(C), (i = t[0].getBoundingClientRect()).left < 0 && t.removeClass(C)), i.bottom > n.height() && t.eq(0).css('margin-top', -(i.bottom - n.height() + 5)))
  }).on('mouseleave', t, function (e) {
    var i = s(this).children('.' + w)
    i.removeClass(C), i.css('margin-top', 0)
  }), c.reload = function (e, i) {
    e = p.getThis(e)
    return e ? (e.reload(i), p.call(e)) : this
  }, c.render = function (e) {
    e = new k(e)
    return p.call(e)
  }, e(o, c)
})
layui.define('jquery', function (e) {
  'use strict'
  var h = layui.$; var t = {
    config: {},
    index: layui.slider ? layui.slider.index + 1e4 : 0,
    set: function (e) {
      var i = this
      return i.config = h.extend({}, i.config, e), i
    },
    on: function (e, i) {
      return layui.onevent.call(this, a, e, i)
    }
  }; var a = 'slider'; var c = 'layui-disabled'; var y = 'layui-slider-bar'; var g = 'layui-slider-wrap'; var b = 'layui-slider-wrap-btn'
  var x = 'layui-slider-tips'; var T = 'layui-slider-input-txt'; var w = 'layui-slider-hover'; var i = function (e) {
    var i = this
    i.index = ++t.index, i.config = h.extend({}, i.config, t.config, e), i.render()
  }
  i.prototype.config = {
    type: 'default',
    min: 0,
    max: 100,
    value: 0,
    step: 1,
    showstep: !1,
    tips: !0,
    input: !1,
    range: !1,
    height: 200,
    disabled: !1,
    theme: '#009688'
  }, i.prototype.render = function () {
    var a; var n = this; var l = n.config
    var e = (l.step < 1 && (l.step = 1), l.max < l.min && (l.max = l.min + l.step), l.range ? (l.value = typeof l.value === 'object' ? l.value : [l.min, l.value], i = Math.min(l.value[0], l.value[1]), s = Math.max(l.value[0], l.value[1]), l.value[0] = i > l.min ? i : l.min, l.value[1] = s > l.min ? s : l.min, l.value[0] = l.value[0] > l.max ? l.max : l.value[0], l.value[1] = l.value[1] > l.max ? l.max : l.value[1], i = Math.floor((l.value[0] - l.min) / (l.max - l.min) * 100), t = (s = Math.floor((l.value[1] - l.min) / (l.max - l.min) * 100)) - i + '%', i += '%', s += '%') : (typeof l.value === 'object' && (l.value = Math.min.apply(null, l.value)), l.value < l.min && (l.value = l.min), l.value > l.max && (l.value = l.max), t = Math.floor((l.value - l.min) / (l.max - l.min) * 100) + '%'), l.disabled ? '#c2c2c2' : l.theme)
    var i = '<div class="layui-slider ' + (l.type === 'vertical' ? 'layui-slider-vertical' : '') + '">' + (l.tips ? '<div class="' + x + '"></div>' : '') + '<div class="layui-slider-bar" style="background:' + e + '; ' + (l.type === 'vertical' ? 'height' : 'width') + ':' + t + ';' + (l.type === 'vertical' ? 'bottom' : 'left') + ':' + (i || 0) + ';"></div><div class="layui-slider-wrap" style="' + (l.type === 'vertical' ? 'bottom' : 'left') + ':' + (i || t) + ';"><div class="layui-slider-wrap-btn" style="border: 2px solid ' + e + ';"></div></div>' + (l.range ? '<div class="layui-slider-wrap" style="' + (l.type === 'vertical' ? 'bottom' : 'left') + ':' + s + ';"><div class="layui-slider-wrap-btn" style="border: 2px solid ' + e + ';"></div></div>' : '') + '</div>'
    var t = h(l.elem); var s = t.next('.layui-slider')
    if (s[0] && s.remove(), n.elemTemp = h(i), l.range ? (n.elemTemp.find('.' + g).eq(0).data('value', l.value[0]), n.elemTemp.find('.' + g).eq(1).data('value', l.value[1])) : n.elemTemp.find('.' + g).data('value', l.value), t.html(n.elemTemp), l.type === 'vertical' && n.elemTemp.height(l.height + 'px'), l.showstep) {
      for (var o = (l.max - l.min) / l.step, r = '', u = 1; u < 1 + o; u++) {
        var d = 100 * u / o
        d < 100 && (r += '<div class="layui-slider-step" style="' + (l.type === 'vertical' ? 'bottom' : 'left') + ':' + d + '%"></div>')
      }
      n.elemTemp.append(r)
    }
    l.input && !l.range && (e = h('<div class="layui-slider-input layui-input"><div class="layui-slider-input-txt"><input type="text" class="layui-input"></div><div class="layui-slider-input-btn"><i class="layui-icon layui-icon-up"></i><i class="layui-icon layui-icon-down"></i></div></div>'), t.css('position', 'relative'), t.append(e), t.find('.' + T).children('input').val(l.value), l.type === 'vertical' ? e.css({
      left: 0,
      top: -48
    }) : n.elemTemp.css('margin-right', e.outerWidth() + 15)), l.disabled ? (n.elemTemp.addClass(c), n.elemTemp.find('.' + b).addClass(c)) : n.slide(), n.elemTemp.find('.' + b).on('mouseover', function () {
      var e = l.type === 'vertical' ? l.height : n.elemTemp[0].offsetWidth; var i = n.elemTemp.find('.' + g)
      var t = (l.type === 'vertical' ? e - h(this).parent()[0].offsetTop - i.height() : h(this).parent()[0].offsetLeft) / e * 100
      var i = h(this).parent().data('value'); var e = l.setTips ? l.setTips(i) : i
      n.elemTemp.find('.' + x).html(e), clearTimeout(a), a = setTimeout(function () {
        l.type === 'vertical' ? n.elemTemp.find('.' + x).css({
          bottom: t + '%',
          'margin-bottom': '20px',
          display: 'inline-block'
        }) : n.elemTemp.find('.' + x).css({ left: t + '%', display: 'inline-block' })
      }, 300)
    }).on('mouseout', function () {
      clearTimeout(a), n.elemTemp.find('.' + x).css('display', 'none')
    })
  }, i.prototype.slide = function (e, i, t) {
    var o = this.config; var r = this.elemTemp; var u = function () {
      return o.type === 'vertical' ? o.height : r[0].offsetWidth
    }; var d = r.find('.' + g); var s = r.next('.layui-slider-input'); var c = s.children('.' + T).children('input').val()
    var m = 100 / ((o.max - o.min) / Math.ceil(o.step)); var v = function (e, i) {
      e = (e = Math.ceil(e) * m > 100 ? Math.ceil(e) * m : Math.round(e) * m) > 100 ? 100 : e, d.eq(i).css(o.type === 'vertical' ? 'bottom' : 'left', e + '%')
      var t; var a = p(d[0].offsetLeft); var n = o.range ? p(d[1].offsetLeft) : 0
      var l = (o.type === 'vertical' ? (r.find('.' + x).css({
        bottom: e + '%',
        'margin-bottom': '20px'
      }), a = p(u() - d[0].offsetTop - d.height()), n = o.range ? p(u() - d[1].offsetTop - d.height()) : 0) : r.find('.' + x).css('left', e + '%'), a = a > 100 ? 100 : a, n = n > 100 ? 100 : n, Math.min(a, n))
      var a = Math.abs(a - n); var n = (o.type === 'vertical' ? r.find('.' + y).css({
        height: a + '%',
        bottom: l + '%'
      }) : r.find('.' + y).css({ width: a + '%', left: l + '%' }), o.min + Math.round((o.max - o.min) * e / 100))
      c = n, s.children('.' + T).children('input').val(c), d.eq(i).data('value', n), r.find('.' + x).html(o.setTips ? o.setTips(n) : n), o.range && (t = [d.eq(0).data('value'), d.eq(1).data('value')])[0] > t[1] && t.reverse(), o.change && o.change(o.range ? t : n)
    }; var p = function (e) {
      var i = e / u() * 100 / m; var t = Math.round(i) * m
      return t = e == u() ? Math.ceil(i) * m : t
    }; var f = h(['<div class="layui-auxiliar-moving" id="LAY-slider-moving"></div'].join(''))
    if (e === 'set') return v(i, t)
    r.find('.' + b).each(function (l) {
      var s = h(this)
      s.on('mousedown', function (e) {
        e = e || window.event
        var i; var t; var a = s.parent()[0].offsetLeft; var n = e.clientX
        o.type === 'vertical' && (a = u() - s.parent()[0].offsetTop - d.height(), n = e.clientY)
        e = function (e) {
          e = e || window.event
          var i = a + (o.type === 'vertical' ? n - e.clientY : e.clientX - n)
          var i = (i = (i = i < 0 ? 0 : i) > u() ? u() : i) / u() * 100 / m
          v(i, l), s.addClass(w), r.find('.' + x).show(), e.preventDefault()
        }, i = function () {
          s.removeClass(w), r.find('.' + x).hide()
        }, t = function () {
          i && i(), f.remove()
        }, h('#LAY-slider-moving')[0] || h('body').append(f), f.on('mousemove', e), f.on('mouseup', t).on('mouseleave', t)
      })
    }), r.on('click', function (e) {
      var i = h('.' + b); var t = h(this)
      !i.is(event.target) && i.has(event.target).length === 0 && i.length && (t = (i = (i = (i = o.type === 'vertical' ? u() - e.clientY + t.offset().top - h(window).scrollTop() : e.clientX - t.offset().left - h(window).scrollLeft()) < 0 ? 0 : i) > u() ? u() : i) / u() * 100 / m, i = o.range ? o.type === 'vertical' ? Math.abs(i - parseInt(h(d[0]).css('bottom'))) > Math.abs(i - parseInt(h(d[1]).css('bottom'))) ? 1 : 0 : Math.abs(i - d[0].offsetLeft) > Math.abs(i - d[1].offsetLeft) ? 1 : 0 : 0, v(t, i), e.preventDefault())
    }), s.children('.layui-slider-input-btn').children('i').each(function (i) {
      h(this).on('click', function () {
        c = s.children('.' + T).children('input').val()
        var e = ((c = i == 1 ? c - o.step < o.min ? o.min : Number(c) - o.step : Number(c) + o.step > o.max ? o.max : Number(c) + o.step) - o.min) / (o.max - o.min) * 100 / m
        v(e, 0)
      })
    })
    var a = function () {
      var e = this.value
      var e = (e = (e = (e = isNaN(e) ? 0 : e) < o.min ? o.min : e) > o.max ? o.max : e, ((this.value = e) - o.min) / (o.max - o.min) * 100 / m)
      v(e, 0)
    }
    s.children('.' + T).children('input').on('keydown', function (e) {
      e.keyCode === 13 && (e.preventDefault(), a.call(this))
    }).on('change', a)
  }, i.prototype.events = function () {
    this.config
  }, t.render = function (e) {
    e = new i(e)
    return (function () {
      var t = this; var a = t.config
      return {
        setValue: function (e, i) {
          return a.value = e, t.slide('set', e, i || 0)
        },
        config: a
      }
    }.call(e))
  }, e(a, t)
})
layui.define(['jquery', 'lay'], function (e) {
  'use strict'
  var k = layui.jquery; var n = layui.lay; var r = layui.device().mobile ? 'click' : 'mousedown'; var l = {
    config: {},
    index: layui.colorpicker ? layui.colorpicker.index + 1e4 : 0,
    set: function (e) {
      var i = this
      return i.config = k.extend({}, i.config, e), i
    },
    on: function (e, i) {
      return layui.onevent.call(this, 'colorpicker', e, i)
    }
  }; var t = 'layui-colorpicker'; var c = '.layui-colorpicker-main'; var y = 'layui-icon-down'; var x = 'layui-icon-close'
  var P = 'layui-colorpicker-trigger-span'; var C = 'layui-colorpicker-trigger-i'; var B = 'layui-colorpicker-side-slider'
  var w = 'layui-colorpicker-basis'; var D = 'layui-colorpicker-alpha-bgcolor'; var j = 'layui-colorpicker-alpha-slider'
  var E = 'layui-colorpicker-basis-cursor'; var F = 'layui-colorpicker-main-input'; var H = function (e) {
    var i = { h: 0, s: 0, b: 0 }; var o = Math.min(e.r, e.g, e.b); var r = Math.max(e.r, e.g, e.b); var n = r - o
    return i.b = r, i.s = r != 0 ? 255 * n / r : 0, i.s != 0 ? e.r == r ? i.h = (e.g - e.b) / n : e.g == r ? i.h = 2 + (e.b - e.r) / n : i.h = 4 + (e.r - e.g) / n : i.h = -1, r == o && (i.h = 0), i.h *= 60, i.h < 0 && (i.h += 360), i.s *= 100 / 255, i.b *= 100 / 255, i
  }; var M = function (e) {
    var i; var o = {}; var r = e.h; var n = 255 * e.s / 100; var e = 255 * e.b / 100
    return n == 0 ? o.r = o.g = o.b = e : (e = r % 60 * ((i = e) - (n = (255 - n) * e / 255)) / 60, (r = r == 360 ? 0 : r) < 60 ? (o.r = i, o.b = n, o.g = n + e) : r < 120 ? (o.g = i, o.b = n, o.r = i - e) : r < 180 ? (o.g = i, o.r = n, o.b = n + e) : r < 240 ? (o.b = i, o.r = n, o.g = i - e) : r < 300 ? (o.b = i, o.g = n, o.r = n + e) : r < 360 ? (o.r = i, o.g = n, o.b = i - e) : (o.r = 0, o.g = 0, o.b = 0)), {
      r: Math.round(o.r),
      g: Math.round(o.g),
      b: Math.round(o.b)
    }
  }; var f = function (e) {
    var e = M(e); var o = [e.r.toString(16), e.g.toString(16), e.b.toString(16)]
    return k.each(o, function (e, i) {
      i.length == 1 && (o[e] = '0' + i)
    }), o.join('')
  }; var Y = function (e) {
    e = e.match(/[0-9]{1,3}/g) || []
    return { r: e[0], g: e[1], b: e[2] }
  }; var I = k(window); var a = k(document); var s = function (e) {
    this.index = ++l.index, this.config = k.extend({}, this.config, l.config, e), this.render()
  }
  s.prototype.config = {
    color: '',
    size: null,
    alpha: !1,
    format: 'hex',
    predefine: !1,
    colors: ['#009688', '#5FB878', '#1E9FFF', '#FF5722', '#FFB800', '#01AAED', '#999', '#c00', '#ff8c00', '#ffd700', '#90ee90', '#00ced1', '#1e90ff', '#c71585', 'rgb(0, 186, 189)', 'rgb(255, 120, 0)', 'rgb(250, 212, 0)', '#393D49', 'rgba(0,0,0,.5)', 'rgba(255, 69, 0, 0.68)', 'rgba(144, 240, 144, 0.5)', 'rgba(31, 147, 255, 0.73)']
  }, s.prototype.render = function () {
    var e = this; var i = e.config; var o = k(i.elem)
    if (o.length > 1) {
      return layui.each(o, function () {
        l.render(k.extend({}, i, { elem: this }))
      }), e
    }
    k.extend(i, n.options(o[0]))
    var o = k(['<div class="layui-unselect layui-colorpicker">', '<span ' + (i.format == 'rgb' && i.alpha ? 'class="layui-colorpicker-trigger-bgcolor"' : '') + '>', '<span class="layui-colorpicker-trigger-span" ', 'lay-type="' + (i.format == 'rgb' ? i.alpha ? 'rgba' : 'torgb' : '') + '" ', 'style="' + (o = '', i.color ? (o = i.color, (i.color.match(/[0-9]{1,3}/g) || []).length > 3 && (i.alpha && i.format == 'rgb' || (o = '#' + f(H(Y(i.color))))), 'background: ' + o) : o) + '">', '<i class="layui-icon layui-colorpicker-trigger-i ' + (i.color ? y : x) + '"></i>', '</span>', '</span>', '</div>'].join(''))
    var r = i.elem = k(i.elem)
    i.size && o.addClass('layui-colorpicker-' + i.size), r.addClass('layui-inline').html(e.elemColorBox = o), e.color = e.elemColorBox.find('.' + P)[0].style.background, e.events()
  }, s.prototype.renderPicker = function () {
    var o; var e = this; var i = e.config; var r = e.elemColorBox[0]
    var i = e.elemPicker = k(['<div id="layui-colorpicker' + e.index + '" data-index="' + e.index + '" class="layui-anim layui-anim-downbit layui-colorpicker-main">', '<div class="layui-colorpicker-main-wrapper">', '<div class="layui-colorpicker-basis">', '<div class="layui-colorpicker-basis-white"></div>', '<div class="layui-colorpicker-basis-black"></div>', '<div class="layui-colorpicker-basis-cursor"></div>', '</div>', '<div class="layui-colorpicker-side">', '<div class="layui-colorpicker-side-slider"></div>', '</div>', '</div>', '<div class="layui-colorpicker-main-alpha ' + (i.alpha ? 'layui-show' : '') + '">', '<div class="layui-colorpicker-alpha-bgcolor">', '<div class="layui-colorpicker-alpha-slider"></div>', '</div>', '</div>', i.predefine ? (o = ['<div class="layui-colorpicker-main-pre">'], layui.each(i.colors, function (e, i) {
      o.push(['<div class="layui-colorpicker-pre' + ((i.match(/[0-9]{1,3}/g) || []).length > 3 ? ' layui-colorpicker-pre-isalpha' : '') + '">', '<div style="background:' + i + '"></div>', '</div>'].join(''))
    }), o.push('</div>'), o.join('')) : '', '<div class="layui-colorpicker-main-input">', '<div class="layui-inline">', '<input type="text" class="layui-input">', '</div>', '<div class="layui-btn-container">', '<button class="layui-btn layui-btn-primary layui-btn-sm" colorpicker-events="clear">\u6e05\u7a7a</button>', '<button class="layui-btn layui-btn-sm" colorpicker-events="confirm">\u786e\u5b9a</button>', '</div', '</div>', '</div>'].join(''))
    e.elemColorBox.find('.' + P)[0]
    k(c)[0] && k(c).data('index') == e.index ? e.removePicker(s.thisElemInd) : (e.removePicker(s.thisElemInd), k('body').append(i)), s.thisElemInd = e.index, s.thisColor = r.style.background, e.position(), e.pickerEvents()
  }, s.prototype.removePicker = function (e) {
    this.config
    return k('#layui-colorpicker' + (e || this.index)).remove(), this
  }, s.prototype.position = function () {
    var e = this; var i = e.config
    return n.position(e.bindElem || e.elemColorBox[0], e.elemPicker[0], { position: i.position, align: 'center' }), e
  }, s.prototype.val = function () {
    var e; var i = this; var o = (i.config, i.elemColorBox.find('.' + P)); var r = i.elemPicker.find('.' + F)
    var n = o[0].style.backgroundColor
    n ? (e = H(Y(n)), o = o.attr('lay-type'), i.select(e.h, e.s, e.b), o === 'torgb' && r.find('input').val(n), o === 'rgba' && (e = Y(n), (n.match(/[0-9]{1,3}/g) || []).length == 3 ? (r.find('input').val('rgba(' + e.r + ', ' + e.g + ', ' + e.b + ', 1)'), i.elemPicker.find('.' + j).css('left', 280)) : (r.find('input').val(n), o = 280 * n.slice(n.lastIndexOf(',') + 1, n.length - 1), i.elemPicker.find('.' + j).css('left', o)), i.elemPicker.find('.' + D)[0].style.background = 'linear-gradient(to right, rgba(' + e.r + ', ' + e.g + ', ' + e.b + ', 0), rgb(' + e.r + ', ' + e.g + ', ' + e.b + '))')) : (i.select(0, 100, 100), r.find('input').val(''), i.elemPicker.find('.' + D)[0].style.background = '', i.elemPicker.find('.' + j).css('left', 280))
  }, s.prototype.side = function () {
    var n = this; var l = n.config; var t = n.elemColorBox.find('.' + P); var c = t.attr('lay-type')
    var a = n.elemPicker.find('.layui-colorpicker-side'); var e = n.elemPicker.find('.' + B)
    var s = n.elemPicker.find('.' + w); var r = n.elemPicker.find('.' + E); var d = n.elemPicker.find('.' + D)
    var f = n.elemPicker.find('.' + j); var u = e[0].offsetTop / 180 * 360; var p = 100 - (r[0].offsetTop + 3) / 180 * 100
    var g = (r[0].offsetLeft + 3) / 260 * 100; var h = Math.round(f[0].offsetLeft / 280 * 100) / 100
    var v = n.elemColorBox.find('.' + C); var i = n.elemPicker.find('.layui-colorpicker-pre').children('div')
    var b = function (e, i, o, r) {
      n.select(e, i, o)
      e = M({ h: e, s: i, b: o })
      v.addClass(y).removeClass(x), t[0].style.background = 'rgb(' + e.r + ', ' + e.g + ', ' + e.b + ')', c === 'torgb' && n.elemPicker.find('.' + F).find('input').val('rgb(' + e.r + ', ' + e.g + ', ' + e.b + ')'), c === 'rgba' && (f.css('left', 280 * r), n.elemPicker.find('.' + F).find('input').val('rgba(' + e.r + ', ' + e.g + ', ' + e.b + ', ' + r + ')'), t[0].style.background = 'rgba(' + e.r + ', ' + e.g + ', ' + e.b + ', ' + r + ')', d[0].style.background = 'linear-gradient(to right, rgba(' + e.r + ', ' + e.g + ', ' + e.b + ', 0), rgb(' + e.r + ', ' + e.g + ', ' + e.b + '))'), l.change && l.change(n.elemPicker.find('.' + F).find('input').val())
    }; var o = k(['<div class="layui-auxiliar-moving" id="LAY-colorpicker-moving"></div>'].join(''))
    var m = function (e) {
      k('#LAY-colorpicker-moving')[0] || k('body').append(o), o.on('mousemove', e), o.on('mouseup', function () {
        o.remove()
      }).on('mouseleave', function () {
        o.remove()
      })
    }
    e.on('mousedown', function (e) {
      var r = this.offsetTop; var n = e.clientY
      m(function (e) {
        var i = r + (e.clientY - n); var o = a[0].offsetHeight
        var o = (i = o < (i = i < 0 ? 0 : i) ? o : i) / 180 * 360
        b(u = o, g, p, h), e.preventDefault()
      }), e.preventDefault()
    }), a.on('click', function (e) {
      var i = e.clientY - k(this).offset().top
      var i = (i = (i = i < 0 ? 0 : i) > this.offsetHeight ? this.offsetHeight : i) / 180 * 360
      b(u = i, g, p, h), e.preventDefault()
    }), r.on('mousedown', function (e) {
      var l = this.offsetTop; var t = this.offsetLeft; var c = e.clientY; var a = e.clientX
      layui.stope(e), m(function (e) {
        var i = l + (e.clientY - c); var o = t + (e.clientX - a); var r = s[0].offsetHeight - 3
        var n = s[0].offsetWidth - 3; var n = ((o = n < (o = o < -3 ? -3 : o) ? n : o) + 3) / 260 * 100
        var o = 100 - ((i = r < (i = i < -3 ? -3 : i) ? r : i) + 3) / 180 * 100
        b(u, g = n, p = o, h), e.preventDefault()
      }), e.preventDefault()
    }), s.on('mousedown', function (e) {
      var i = e.clientY - k(this).offset().top - 3 + I.scrollTop()
      var o = e.clientX - k(this).offset().left - 3 + I.scrollLeft()
      var o = ((i = i < -3 ? -3 : i) > this.offsetHeight - 3 && (i = this.offsetHeight - 3), ((o = (o = o < -3 ? -3 : o) > this.offsetWidth - 3 ? this.offsetWidth - 3 : o) + 3) / 260 * 100)
      var i = 100 - (i + 3) / 180 * 100
      b(u, g = o, p = i, h), layui.stope(e), e.preventDefault(), r.trigger(e, 'mousedown')
    }), f.on('mousedown', function (e) {
      var r = this.offsetLeft; var n = e.clientX
      m(function (e) {
        var i = r + (e.clientX - n); var o = d[0].offsetWidth
        var o = (o < (i = i < 0 ? 0 : i) && (i = o), Math.round(i / 280 * 100) / 100)
        b(u, g, p, h = o), e.preventDefault()
      }), e.preventDefault()
    }), d.on('click', function (e) {
      var i = e.clientX - k(this).offset().left
      var i = ((i = i < 0 ? 0 : i) > this.offsetWidth && (i = this.offsetWidth), Math.round(i / 280 * 100) / 100)
      b(u, g, p, h = i), e.preventDefault()
    }), i.each(function () {
      k(this).on('click', function () {
        k(this).parent('.layui-colorpicker-pre').addClass('selected').siblings().removeClass('selected')
        var e = this.style.backgroundColor; var i = H(Y(e)); var o = e.slice(e.lastIndexOf(',') + 1, e.length - 1)
        u = i.h, g = i.s, p = i.b, (e.match(/[0-9]{1,3}/g) || []).length == 3 && (o = 1), h = o, b(i.h, i.s, i.b, o)
      })
    })
  }, s.prototype.select = function (e, i, o, r) {
    var n = this; var l = (n.config, f({ h: e, s: 100, b: 100 })); var t = f({ h: e, s: i, b: o }); var e = e / 360 * 180
    var o = 180 - o / 100 * 180 - 3; var i = i / 100 * 260 - 3
    n.elemPicker.find('.' + B).css('top', e), n.elemPicker.find('.' + w)[0].style.background = '#' + l, n.elemPicker.find('.' + E).css({
      top: o,
      left: i
    }), r !== 'change' && n.elemPicker.find('.' + F).find('input').val('#' + t)
  }, s.prototype.pickerEvents = function () {
    var c = this; var a = c.config; var s = c.elemColorBox.find('.' + P); var d = c.elemPicker.find('.' + F + ' input'); var o = {
      clear: function (e) {
        s[0].style.background = '', c.elemColorBox.find('.' + C).removeClass(y).addClass(x), c.color = '', a.done && a.done(''), c.removePicker()
      },
      confirm: function (e, i) {
        var o; var r; var n = d.val(); var l = n; var t = {}
        if (n.indexOf(',') > -1 ? (t = H(Y(n)), c.select(t.h, t.s, t.b), s[0].style.background = l = '#' + f(t), (n.match(/[0-9]{1,3}/g) || []).length > 3 && s.attr('lay-type') === 'rgba' && (o = 280 * n.slice(n.lastIndexOf(',') + 1, n.length - 1), c.elemPicker.find('.' + j).css('left', o), l = s[0].style.background = n)) : ((o = (o = n).indexOf('#') > -1 ? o.substring(1) : o).length == 3 && (o = (r = o.split(''))[0] + r[0] + r[1] + r[1] + r[2] + r[2]), r = {
          r: (o = parseInt(o, 16)) >> 16,
          g: (65280 & o) >> 8,
          b: 255 & o
        }, t = H(r), s[0].style.background = l = '#' + f(t), c.elemColorBox.find('.' + C).removeClass(x).addClass(y)), i === 'change') return c.select(t.h, t.s, t.b, i), void (a.change && a.change(l))
        c.color = n, a.done && a.done(n), c.removePicker()
      }
    }
    c.elemPicker.on('click', '*[colorpicker-events]', function () {
      var e = k(this); var i = e.attr('colorpicker-events')
      o[i] && o[i].call(this, e)
    }), d.on('keyup', function (e) {
      var i = k(this)
      o.confirm.call(this, i, e.keyCode === 13 ? null : 'change')
    })
  }, s.prototype.events = function () {
    var i = this; var e = i.config; var o = i.elemColorBox.find('.' + P)
    i.elemColorBox.on('click', function () {
      i.renderPicker(), k(c)[0] && (i.val(), i.side())
    }), e.elem[0] && !i.elemColorBox[0].eventHandler && (a.on(r, function (e) {
      k(e.target).hasClass(t) || k(e.target).parents('.' + t)[0] || k(e.target).hasClass(c.replace(/\./g, '')) || k(e.target).parents(c)[0] || i.elemPicker && (i.color ? (e = H(Y(i.color)), i.select(e.h, e.s, e.b)) : i.elemColorBox.find('.' + C).removeClass(y).addClass(x), o[0].style.background = i.color || '', i.removePicker())
    }), I.on('resize', function () {
      if (!i.elemPicker || !k(c)[0]) return !1
      i.position()
    }), i.elemColorBox[0].eventHandler = !0)
  }, l.render = function (e) {
    e = new s(e)
    return (function () {
      return { config: this.config }
    }.call(e))
  }, e('colorpicker', l)
})
layui.define('jquery', function (t) {
  'use strict'
  var u = layui.$; var d = (layui.hint(), layui.device()); var c = 'element'; var r = 'layui-this'; var y = 'layui-show'
  var i = function () {
    this.config = {}
  }; var h = (i.prototype.set = function (t) {
    return u.extend(!0, this.config, t), this
  }, i.prototype.on = function (t, i) {
    return layui.onevent.call(this, c, t, i)
  }, i.prototype.tabAdd = function (t, i) {
    var a; var t = u('.layui-tab[lay-filter=' + t + ']'); var e = t.children('.layui-tab-title')
    var l = e.children('.layui-tab-bar'); var t = t.children('.layui-tab-content')
    var n = '<li' + (a = [], layui.each(i, function (t, i) {
      /^(title|content)$/.test(t) || a.push('lay-' + t + '="' + i + '"')
    }), a.length > 0 && a.unshift(''), a.join(' ')) + '>' + (i.title || 'unnaming') + '</li>'
    return l[0] ? l.before(n) : e.append(n), t.append('<div class="layui-tab-item">' + (i.content || '') + '</div>'), C.hideTabMore(!0), C.tabAuto(), this
  }, i.prototype.tabDelete = function (t, i) {
    t = u('.layui-tab[lay-filter=' + t + ']').children('.layui-tab-title').find('>li[lay-id="' + i + '"]')
    return C.tabDelete(null, t), this
  }, i.prototype.tabChange = function (t, i) {
    t = u('.layui-tab[lay-filter=' + t + ']').children('.layui-tab-title').find('>li[lay-id="' + i + '"]')
    return C.tabClick.call(t[0], null, null, t), this
  }, i.prototype.tab = function (a) {
    a = a || {}, e.on('click', a.headerElem, function (t) {
      var i = u(this).index()
      C.tabClick.call(this, t, i, null, a)
    })
  }, i.prototype.progress = function (t, i) {
    var a = 'layui-progress'; var t = u('.' + a + '[lay-filter=' + t + ']').find('.' + a + '-bar')
    var a = t.find('.' + a + '-text')
    return t.css('width', i).attr('lay-percent', i), a.text(i), this
  }, '.layui-nav'); var f = 'layui-nav-item'; var l = 'layui-nav-bar'; var p = 'layui-nav-tree'; var b = 'layui-nav-child'
  var v = 'layui-nav-more'; var m = 'layui-anim layui-anim-upbit'; var C = {
    tabClick: function (t, i, a, e) {
      e = e || {}
      var a = a || u(this); var i = i || a.parent().children('li').index(a)
      var l = e.headerElem ? a.parent() : a.parents('.layui-tab').eq(0)
      var e = e.bodyElem ? u(e.bodyElem) : l.children('.layui-tab-content').children('.layui-tab-item')
      var n = a.find('a'); var n = n.attr('href') !== 'javascript:;' && n.attr('target') === '_blank'
      var s = typeof a.attr('lay-unselect') === 'string'; var o = l.attr('lay-filter')
      n || s || (a.addClass(r).siblings().removeClass(r), e.eq(i).addClass(y).siblings().removeClass(y)), layui.event.call(this, c, 'tab(' + o + ')', {
        elem: l,
        index: i
      })
    },
    tabDelete: function (t, i) {
      var i = i || u(this).parent(); var a = i.index(); var e = i.parents('.layui-tab').eq(0)
      var l = e.children('.layui-tab-content').children('.layui-tab-item'); var n = e.attr('lay-filter')
      i.hasClass(r) && (i.next()[0] && i.next().is('li') ? C.tabClick.call(i.next()[0], null, a + 1) : i.prev()[0] && i.prev().is('li') && C.tabClick.call(i.prev()[0], null, a - 1)), i.remove(), l.eq(a).remove(), setTimeout(function () {
        C.tabAuto()
      }, 50), layui.event.call(this, c, 'tabDelete(' + n + ')', { elem: e, index: a })
    },
    tabAuto: function () {
      var e = 'layui-tab-bar'; var l = 'layui-tab-close'; var n = this
      u('.layui-tab').each(function () {
        var t = u(this); var i = t.children('.layui-tab-title')
        var a = (t.children('.layui-tab-content').children('.layui-tab-item'), 'lay-stope="tabmore"')
        var a = u('<span class="layui-unselect layui-tab-bar" ' + a + '><i ' + a + ' class="layui-icon">&#xe61a;</i></span>')
        n === window && d.ie != 8 && C.hideTabMore(!0), t.attr('lay-allowClose') && i.find('li').each(function () {
          var t; var i = u(this)
          i.find('.' + l)[0] || ((t = u('<i class="layui-icon layui-icon-close layui-unselect ' + l + '"></i>')).on('click', C.tabDelete), i.append(t))
        }), typeof t.attr('lay-unauto') !== 'string' && (i.prop('scrollWidth') > i.outerWidth() + 1 ? i.find('.' + e)[0] || (i.append(a), t.attr('overflow', ''), a.on('click', function (t) {
          i[this.title ? 'removeClass' : 'addClass']('layui-tab-more'), this.title = this.title ? '' : '\u6536\u7f29'
        })) : (i.find('.' + e).remove(), t.removeAttr('overflow')))
      })
    },
    hideTabMore: function (t) {
      var i = u('.layui-tab-title')
      !0 !== t && u(t.target).attr('lay-stope') === 'tabmore' || (i.removeClass('layui-tab-more'), i.find('.layui-tab-bar').attr('title', ''))
    },
    clickThis: function () {
      var t = u(this); var i = t.parents(h); var a = i.attr('lay-filter'); var e = t.parent(); var l = t.siblings('.' + b)
      var n = typeof e.attr('lay-unselect') === 'string'
      t.attr('href') !== 'javascript:;' && t.attr('target') === '_blank' || n || l[0] || (i.find('.' + r).removeClass(r), e.addClass(r)), i.hasClass(p) && (l.removeClass(m), l[0] && (e[l.css('display') === 'none' ? 'addClass' : 'removeClass'](f + 'ed'), i.attr('lay-shrink') === 'all' && e.siblings().removeClass(f + 'ed'))), layui.event.call(this, c, 'nav(' + a + ')', t)
    },
    collapse: function () {
      var t = u(this); var i = t.find('.layui-colla-icon'); var a = t.siblings('.layui-colla-content')
      var e = t.parents('.layui-collapse').eq(0); var l = e.attr('lay-filter'); var n = a.css('display') === 'none'
      typeof e.attr('lay-accordion') === 'string' && ((e = e.children('.layui-colla-item').children('.' + y)).siblings('.layui-colla-title').children('.layui-colla-icon').html('&#xe602;'), e.removeClass(y)), a[n ? 'addClass' : 'removeClass'](y), i.html(n ? '&#xe61a;' : '&#xe602;'), layui.event.call(this, c, 'collapse(' + l + ')', {
        title: t,
        content: a,
        show: n
      })
    }
  }; var a = (i.prototype.render = i.prototype.init = function (t, i) {
    var a = i ? '[lay-filter="' + i + '"]' : ''; var i = {
      tab: function () {
        C.tabAuto.call({})
      },
      nav: function () {
        var s = {}; var o = {}; var c = {}; var r = 'layui-nav-title'
        u(h + a).each(function (t) {
          var i = u(this); var a = u('<span class="' + l + '"></span>'); var e = i.find('.' + f)
          i.find('.' + l)[0] || (i.append(a), (i.hasClass(p) ? e.find('dd,>.' + r) : e).on('mouseenter', function () {
            !(function (t, i, a) {
              var e; var l = u(this); var n = l.find('.' + b)
              i.hasClass(p) ? n[0] || (e = l.children('.' + r), t.css({
                top: l.offset().top - i.offset().top,
                height: (e[0] ? e : l).outerHeight(),
                opacity: 1
              })) : (n.addClass(m), n.hasClass('layui-nav-child-c') && n.css({ left: -(n.outerWidth() - l.width()) / 2 }), n[0] ? t.css({
                left: t.position().left + t.width() / 2,
                width: 0,
                opacity: 0
              }) : t.css({
                left: l.position().left + parseFloat(l.css('marginLeft')),
                top: l.position().top + l.height() - t.height()
              }), s[a] = setTimeout(function () {
                t.css({ width: n[0] ? 0 : l.width(), opacity: n[0] ? 0 : 1 })
              }, d.ie && d.ie < 10 ? 0 : 200), clearTimeout(c[a]), n.css('display') === 'block' && clearTimeout(o[a]), o[a] = setTimeout(function () {
                n.addClass(y), l.find('.' + v).addClass(v + 'd')
              }, 300))
            }.call(this, a, i, t))
          }).on('mouseleave', function () {
            i.hasClass(p) ? a.css({
              height: 0,
              opacity: 0
            }) : (clearTimeout(o[t]), o[t] = setTimeout(function () {
              i.find('.' + b).removeClass(y), i.find('.' + v).removeClass(v + 'd')
            }, 300))
          }), i.on('mouseleave', function () {
            clearTimeout(s[t]), c[t] = setTimeout(function () {
              i.hasClass(p) || a.css({ width: 0, left: a.position().left + a.width() / 2, opacity: 0 })
            }, 200)
          })), e.find('a').each(function () {
            var t = u(this)
            t.parent()
            t.siblings('.' + b)[0] && !t.children('.' + v)[0] && t.append('<i class="layui-icon layui-icon-down ' + v + '"></i>'), t.off('click', C.clickThis).on('click', C.clickThis)
          })
        })
      },
      breadcrumb: function () {
        u('.layui-breadcrumb' + a).each(function () {
          var t = u(this); var i = 'lay-separator'; var a = t.attr(i) || '/'; var e = t.find('a')
          e.next('span[' + i + ']')[0] || (e.each(function (t) {
            t !== e.length - 1 && u(this).after('<span ' + i + '>' + a + '</span>')
          }), t.css('visibility', 'visible'))
        })
      },
      progress: function () {
        var e = 'layui-progress'
        u('.' + e + a).each(function () {
          var t = u(this); var i = t.find('.layui-progress-bar'); var a = i.attr('lay-percent')
          i.css('width', /^.+\/.+$/.test(a) ? 100 * new Function('return ' + a)() + '%' : a), t.attr('lay-showPercent') && setTimeout(function () {
            i.html('<span class="' + e + '-text">' + a + '</span>')
          }, 350)
        })
      },
      collapse: function () {
        u('.layui-collapse' + a).each(function () {
          u(this).find('.layui-colla-item').each(function () {
            var t = u(this); var i = t.find('.layui-colla-title')
            var t = t.find('.layui-colla-content').css('display') === 'none'
            i.find('.layui-colla-icon').remove(), i.append('<i class="layui-icon layui-colla-icon">' + (t ? '&#xe602;' : '&#xe61a;') + '</i>'), i.off('click', C.collapse).on('click', C.collapse)
          })
        })
      }
    }
    return i[t] ? i[t]() : layui.each(i, function (t, i) {
      i()
    })
  }, new i()); var e = u(document)
  u(function () {
    a.render()
  })
  e.on('click', '.layui-tab-title li', C.tabClick), e.on('click', C.hideTabMore), u(window).on('resize', C.tabAuto), t(c, a)
})
layui.define('layer', function (e) {
  'use strict'
  var v = layui.$; var t = layui.layer; var r = layui.hint(); var y = layui.device(); var i = {
    config: {},
    set: function (e) {
      var t = this
      return t.config = v.extend({}, t.config, e), t
    },
    on: function (e, t) {
      return layui.onevent.call(this, n, e, t)
    }
  }; var n = 'upload'; var o = 'layui-upload-file'; var a = 'layui-upload-form'; var F = 'layui-upload-iframe'
  var b = 'layui-upload-choose'; var x = function (e) {
    var t = this
    t.config = v.extend({}, t.config, i.config, e), t.render()
  }
  x.prototype.config = {
    accept: 'images',
    exts: '',
    auto: !0,
    bindAction: '',
    url: '',
    force: '',
    field: 'file',
    acceptMime: '',
    method: 'post',
    data: {},
    drag: !0,
    size: 0,
    number: 0,
    multiple: !1
  }, x.prototype.render = function (e) {
    var t = this;
    (e = t.config).elem = v(e.elem), e.bindAction = v(e.bindAction), t.file(), t.events()
  }, x.prototype.file = function () {
    var e = this; var t = e.config
    var i = e.elemFile = v(['<input class="' + o + '" type="file" accept="' + t.acceptMime + '" name="' + t.field + '"', t.multiple ? ' multiple' : '', '>'].join(''))
    var n = t.elem.next();
    (n.hasClass(o) || n.hasClass(a)) && n.remove(), y.ie && y.ie < 10 && t.elem.wrap('<div class="layui-upload-wrap"></div>'), e.isFile() ? (e.elemFile = t.elem, t.field = t.elem[0].name) : t.elem.after(i), y.ie && y.ie < 10 && e.initIE()
  }, x.prototype.initIE = function () {
    var i; var e = this.config
    var t = v('<iframe id="' + F + '" class="' + F + '" name="' + F + '" frameborder="0"></iframe>')
    var n = v(['<form target="' + F + '" class="' + a + '" method="post" key="set-mine" enctype="multipart/form-data" action="' + e.url + '">', '</form>'].join(''))
    v('#' + F)[0] || v('body').append(t), e.elem.next().hasClass(a) || (this.elemFile.wrap(n), e.elem.next('.' + a).append((i = [], layui.each(e.data, function (e, t) {
      t = typeof t === 'function' ? t() : t, i.push('<input type="hidden" name="' + e + '" value="' + t + '">')
    }), i.join(''))))
  }, x.prototype.msg = function (e) {
    return t.msg(e, { icon: 2, shift: 6 })
  }, x.prototype.isFile = function () {
    var e = this.config.elem[0]
    if (e) return e.tagName.toLocaleLowerCase() === 'input' && e.type === 'file'
  }, x.prototype.preview = function (n) {
    window.FileReader && layui.each(this.chooseFiles, function (e, t) {
      var i = new FileReader()
      i.readAsDataURL(t), i.onload = function () {
        n && n(e, t, this.result)
      }
    })
  }, x.prototype.upload = function (i, e) {
    var n; var o; var t; var a; var l = this; var r = l.config; var u = l.elemFile[0]; var c = function () {
      var t = 0; var o = 0; var e = i || l.files || l.chooseFiles || u.files; var a = function () {
        r.multiple && t + o === l.fileLength && typeof r.allDone === 'function' && r.allDone({
          total: l.fileLength,
          successful: t,
          failed: o
        })
      }
      layui.each(e, function (i, e) {
        var n = new FormData(); var e = (n.append(r.field, e), layui.each(r.data, function (e, t) {
          t = typeof t === 'function' ? t() : t, n.append(e, t)
        }), {
          url: r.url,
          type: 'post',
          data: n,
          contentType: !1,
          processData: !1,
          dataType: 'json',
          headers: r.headers || {},
          success: function (e) {
            t++, f(i, e), a()
          },
          error: function (e) {
            o++, l.msg('Request URL is abnormal: ' + (e.statusText || 'error')), p(i), a()
          }
        })
        typeof r.progress === 'function' && (e.xhr = function () {
          var e = v.ajaxSettings.xhr()
          return e.upload.addEventListener('progress', function (e) {
            var t
            e.lengthComputable && (t = Math.floor(e.loaded / e.total * 100), r.progress(t, (r.item || r.elem)[0], e, i))
          }), e
        }), v.ajax(e)
      })
    }; var s = function () {
      var n = v('#' + F)
      l.elemFile.parent().submit(), clearInterval(x.timer), x.timer = setInterval(function () {
        var e; var t = n.contents().find('body')
        try {
          e = t.text()
        } catch (i) {
          l.msg('Cross-domain requests are not supported'), clearInterval(x.timer), p()
        }
        e && (clearInterval(x.timer), t.html(''), f(0, e))
      }, 30)
    }; var f = function (e, t) {
      if (l.elemFile.next('.' + b).remove(), u.value = '', r.force === 'json' && typeof t !== 'object') {
        try {
          t = JSON.parse(t)
        } catch (i) {
          return t = {}, l.msg('Please return JSON data format')
        }
      }
      typeof r.done === 'function' && r.done(t, e || 0, function (e) {
        l.upload(e)
      })
    }; var p = function (e) {
      r.auto && (u.value = ''), typeof r.error === 'function' && r.error(e || 0, function (e) {
        l.upload(e)
      })
    }; var d = r.exts; var m = (o = [], layui.each(i || l.chooseFiles, function (e, t) {
      o.push(t.name)
    }), o); var h = {
      preview: function (e) {
        l.preview(e)
      },
      upload: function (e, t) {
        var i = {}
        i[e] = t, l.upload(i)
      },
      pushFile: function () {
        return l.files = l.files || {}, layui.each(l.chooseFiles, function (e, t) {
          l.files[e] = t
        }), l.files
      },
      resetFile: function (e, t, i) {
        t = new File([t], i)
        l.files = l.files || {}, l.files[e] = t
      }
    }; var g = {
      file: '\u6587\u4ef6',
      images: '\u56fe\u7247',
      video: '\u89c6\u9891',
      audio: '\u97f3\u9891'
    }[r.accept] || '\u6587\u4ef6'; var m = m.length === 0 ? u.value.match(/[^\/\\]+\..+/g) || [] || '' : m
    if (m.length !== 0) {
      switch (r.accept) {
        case 'file':
          layui.each(m, function (e, t) {
            if (d && !RegExp('.\\.(' + d + ')$', 'i').test(escape(t))) return n = !0
          })
          break
        case 'video':
          layui.each(m, function (e, t) {
            if (!RegExp('.\\.(' + (d || 'avi|mp4|wma|rmvb|rm|flash|3gp|flv') + ')$', 'i').test(escape(t))) return n = !0
          })
          break
        case 'audio':
          layui.each(m, function (e, t) {
            if (!RegExp('.\\.(' + (d || 'mp3|wav|mid') + ')$', 'i').test(escape(t))) return n = !0
          })
          break
        default:
          layui.each(m, function (e, t) {
            if (!RegExp('.\\.(' + (d || 'jpg|png|gif|bmp|jpeg') + ')$', 'i').test(escape(t))) return n = !0
          })
      }
      if (n) return l.msg('\u9009\u62e9\u7684' + g + '\u4e2d\u5305\u542b\u4e0d\u652f\u6301\u7684\u683c\u5f0f'), u.value = ''
      if (e !== 'choose' && !r.auto || (r.choose && r.choose(h), e !== 'choose')) {
        if (l.fileLength = (t = 0, g = i || l.files || l.chooseFiles || u.files, layui.each(g, function () {
          t++
        }), t), r.number && l.fileLength > r.number) return l.msg('\u540c\u65f6\u6700\u591a\u53ea\u80fd\u4e0a\u4f20: ' + r.number + ' \u4e2a\u6587\u4ef6<br>\u60a8\u5f53\u524d\u5df2\u7ecf\u9009\u62e9\u4e86: ' + l.fileLength + ' \u4e2a\u6587\u4ef6')
        if (r.size > 0 && !(y.ie && y.ie < 10)) {
          if (layui.each(l.chooseFiles, function (e, t) {
            t.size > 1024 * r.size && (t = (t = r.size / 1024) >= 1 ? t.toFixed(2) + 'MB' : r.size + 'KB', u.value = '', a = t)
          }), a) return l.msg('\u6587\u4ef6\u5927\u5c0f\u4e0d\u80fd\u8d85\u8fc7 ' + a)
        }
        if (!r.before || !1 !== r.before(h)) y.ie ? (y.ie > 9 ? c : s)() : c()
      }
    }
  }, x.prototype.reload = function (e) {
    delete (e = e || {}).elem, delete e.bindAction;
    (e = this.config = v.extend({}, this.config, i.config, e)).elem.next().attr({
      name: e.name,
      accept: e.acceptMime,
      multiple: e.multiple
    })
  }, x.prototype.events = function () {
    var n = this; var o = n.config; var a = function (e) {
      n.chooseFiles = {}, layui.each(e, function (e, t) {
        var i = (new Date()).getTime()
        n.chooseFiles[i + '-' + e] = t
      })
    }; var l = function (e, t) {
      var i = n.elemFile
      var e = (o.item || o.elem, e.length > 1 ? e.length + '\u4e2a\u6587\u4ef6' : (e[0] || {}).name || i[0].value.match(/[^\/\\]+\..+/g) || [] || '')
      i.next().hasClass(b) && i.next().remove(), n.upload(null, 'choose'), n.isFile() || o.choose || i.after('<span class="layui-inline ' + b + '">' + e + '</span>')
    }
    o.elem.off('upload.start').on('upload.start', function () {
      var e = v(this); var t = e.attr('lay-data')
      if (t) {
        try {
          t = new Function('return ' + t)(), n.config = v.extend({}, o, t)
        } catch (i) {
          r.error('Upload element property lay-data configuration item has a syntax error: ' + t)
        }
      }
      n.config.item = e, n.elemFile[0].click()
    }), y.ie && y.ie < 10 || o.elem.off('upload.over').on('upload.over', function () {
      v(this).attr('lay-over', '')
    }).off('upload.leave').on('upload.leave', function () {
      v(this).removeAttr('lay-over')
    }).off('upload.drop').on('upload.drop', function (e, t) {
      var i = v(this); var t = t.originalEvent.dataTransfer.files || []
      i.removeAttr('lay-over'), a(t), o.auto ? n.upload() : l(t)
    }), n.elemFile.off('upload.change').on('upload.change', function () {
      var e = this.files || []
      a(e), o.auto ? n.upload() : l(e)
    }), o.bindAction.off('upload.action').on('upload.action', function () {
      n.upload()
    }), o.elem.data('haveEvents') || (n.elemFile.on('change', function () {
      v(this).trigger('upload.change')
    }), o.elem.on('click', function () {
      n.isFile() || v(this).trigger('upload.start')
    }), o.drag && o.elem.on('dragover', function (e) {
      e.preventDefault(), v(this).trigger('upload.over')
    }).on('dragleave', function (e) {
      v(this).trigger('upload.leave')
    }).on('drop', function (e) {
      e.preventDefault(), v(this).trigger('upload.drop', e)
    }), o.bindAction.on('click', function () {
      v(this).trigger('upload.action')
    }), o.elem.data('haveEvents', !0))
  }, i.render = function (e) {
    e = new x(e)
    return (function () {
      var t = this
      return {
        upload: function (e) {
          t.upload.call(t, e)
        },
        reload: function (e) {
          t.reload.call(t, e)
        },
        config: t.config
      }
    }.call(e))
  }, e(n, i)
})
layui.define(['layer', 'util'], function (e) {
  'use strict'
  var C = layui.$; var h = layui.layer; var d = layui.util; var l = layui.hint(); var w = (layui.device(), 'form'); var o = '.layui-form'
  var T = 'layui-this'; var $ = 'layui-hide'; var E = 'layui-disabled'; var t = function () {
    this.config = {
      verify: {
        required: [/[\S]+/, '\u5fc5\u586b\u9879\u4e0d\u80fd\u4e3a\u7a7a'],
        phone: [/^1\d{10}$/, '\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7'],
        email: [/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, '\u90ae\u7bb1\u683c\u5f0f\u4e0d\u6b63\u786e'],
        url: [/^(#|(http(s?)):\/\/|\/\/)[^\s]+\.[^\s]+$/, '\u94fe\u63a5\u683c\u5f0f\u4e0d\u6b63\u786e'],
        number: function (e) {
          if (!e || isNaN(e)) return '\u53ea\u80fd\u586b\u5199\u6570\u5b57'
        },
        date: [/^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/, '\u65e5\u671f\u683c\u5f0f\u4e0d\u6b63\u786e'],
        identity: [/(^\d{15}$)|(^\d{17}(x|X|\d)$)/, '\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u8eab\u4efd\u8bc1\u53f7']
      },
      autocomplete: null
    }
  }; var i = (t.prototype.set = function (e) {
    return C.extend(!0, this.config, e), this
  }, t.prototype.verify = function (e) {
    return C.extend(!0, this.config.verify, e), this
  }, t.prototype.getFormElem = function (e) {
    return C(o + (e ? '[lay-filter="' + e + '"]' : ''))
  }, t.prototype.on = function (e, t) {
    return layui.onevent.call(this, w, e, t)
  }, t.prototype.val = function (e, i) {
    return this.getFormElem(e).each(function (e, t) {
      var a = C(this)
      layui.each(i, function (e, t) {
        var i; var e = a.find('[name="' + e + '"]')
        e[0] && ((i = e[0].type) === 'checkbox' ? e[0].checked = t : i === 'radio' ? e.each(function () {
          this.value == t && (this.checked = !0)
        }) : e.val(t))
      })
    }), r.render(null, e), this.getValue(e)
  }, t.prototype.getValue = function (e, t) {
    t = t || this.getFormElem(e)
    var a = {}; var n = {}; var e = t.find('input,select,textarea')
    return layui.each(e, function (e, t) {
      var i
      C(this)
      t.name = (t.name || '').replace(/^\s*|\s*&/, ''), t.name && (/^.*\[\]$/.test(t.name) && (i = t.name.match(/^(.*)\[\]$/g)[0], a[i] = 0 | a[i], i = t.name.replace(/^(.*)\[\]$/, '$1[' + a[i]++ + ']')), /^checkbox|radio$/.test(t.type) && !t.checked || (n[i || t.name] = t.value))
    }), n
  }, t.prototype.render = function (e, t) {
    var i = this.config; var a = C(o + (t ? '[lay-filter="' + t + '"]' : '')); var n = {
      input: function (e) {
        e = e || a.find('input,textarea')
        i.autocomplete && e.attr('autocomplete', i.autocomplete)
      },
      select: function (e) {
        var p; var c = '\u8bf7\u9009\u62e9'; var m = 'layui-form-select'; var g = 'layui-select-title'
        var k = 'layui-select-none'; var x = ''; var e = e || a.find('select'); var b = function (e, t) {
          C(e.target).parent().hasClass(g) && !t || (C('.' + m).removeClass(m + 'ed ' + m + 'up'), p && x && p.val(x)), p = null
        }; var u = function (a, e, t) {
          var s; var r; var i; var n; var o; var l; var c = C(this); var u = a.find('.' + g); var d = u.find('input'); var f = a.find('dl')
          var h = f.children('dd'); var y = f.children('dt'); var v = this.selectedIndex
          e || (r = c.attr('lay-search'), i = function () {
            var e = a.offset().top + a.outerHeight() + 5 - q.scrollTop(); var t = f.outerHeight()
            v = c[0].selectedIndex, a.addClass(m + 'ed'), h.removeClass($), y.removeClass($), s = null, h.eq(v).addClass(T).siblings().removeClass(T), e + t > q.height() && t <= e && a.addClass(m + 'up'), o()
          }, n = function (e) {
            a.removeClass(m + 'ed ' + m + 'up'), d.blur(), s = null, e || l(d.val(), function (e) {
              var t = c[0].selectedIndex
              e && (x = C(c[0].options[t]).html(), t === 0 && x === d.attr('placeholder') && (x = ''), d.val(x || ''))
            })
          }, o = function () {
            var e; var t; var i = f.children('dd.' + T)
            i[0] && (e = i.position().top, t = f.height(), i = i.height(), t < e && f.scrollTop(e + f.scrollTop() - t + i - 5), e < 0 && f.scrollTop(e + f.scrollTop() - 5))
          }, u.on('click', function (e) {
            a.hasClass(m + 'ed') ? n() : (b(e, !0), i()), f.find('.' + k).remove()
          }), u.find('.layui-edge').on('click', function () {
            d.focus()
          }), d.on('keyup', function (e) {
            e.keyCode === 9 && i()
          }).on('keydown', function (l) {
            var e = l.keyCode; var r = (e === 9 && n(), function (a, n) {
              l.preventDefault()
              var e = (function () {
                var e = f.children('dd.' + T)
                if (f.children('dd.' + $)[0] && a === 'next') {
                  var t = f.children('dd:not(.' + $ + ',.' + E + ')'); var i = t.eq(0).index()
                  if (i >= 0 && i < e.index() && !t.hasClass(T)) return t.eq(0).prev()[0] ? t.eq(0).prev() : f.children(':last')
                }
                return n && n[0] ? n : s && s[0] ? s : e
              }()); var t = e[a](); var i = e[a]('dd:not(.' + $ + ')')
              return t[0] ? (s = e[a](), i[0] && !i.hasClass(E) || !s[0] ? (i.addClass(T).siblings().removeClass(T), void o()) : r(a, s)) : s = null
            })
            e === 38 && r('prev'), e === 40 && r('next'), e === 13 && (l.preventDefault(), f.children('dd.' + T).trigger('click'))
          }), l = function (a, e, n) {
            var l = 0; var t = (layui.each(h, function () {
              var e = C(this); var t = e.text()
              var i = (r !== 'cs' && (t = t.toLowerCase(), a = a.toLowerCase()), t.indexOf(a) === -1);
              (a === '' || n === 'blur' ? a !== t : i) && l++, n === 'keyup' && e[i ? 'addClass' : 'removeClass']($)
            }), n === 'keyup' && layui.each(y, function () {
              var e = C(this); var t = e.nextUntil('dt').filter('dd')
              e[t.length == t.filter('.' + $).length ? 'addClass' : 'removeClass']($)
            }), l === h.length)
            return e(t), t
          }, t && d.on('keyup', function (e) {
            var t = this.value; var e = e.keyCode
            if (e === 9 || e === 13 || e === 37 || e === 38 || e === 39 || e === 40) return !1
            l(t, function (e) {
              e ? f.find('.' + k)[0] || f.append('<p class="' + k + '">\u65e0\u5339\u914d\u9879</p>') : f.find('.' + k).remove()
            }, 'keyup'), t === '' && f.find('.' + k).remove(), o()
          }).on('blur', function (e) {
            var t = c[0].selectedIndex
            p = d, x = C(c[0].options[t]).html(), t === 0 && x === d.attr('placeholder') && (x = ''), setTimeout(function () {
              l(d.val(), function (e) {
                x || d.val('')
              }, 'blur')
            }, 200)
          }), h.on('click', function () {
            var e = C(this); var t = e.attr('lay-value'); var i = c.attr('lay-filter')
            return e.hasClass(E) || (e.hasClass('layui-select-tips') ? d.val('') : (d.val(e.text()), e.addClass(T)), e.siblings().removeClass(T), c.val(t).removeClass('layui-form-danger'), layui.event.call(this, w, 'select(' + i + ')', {
              elem: c[0],
              value: t,
              othis: a
            }), n(!0)), !1
          }), a.find('dl>dt').on('click', function (e) {
            return !1
          }), C(document).off('click', b).on('click', b))
        }
        e.each(function (e, t) {
          var i = C(this); var a = i.next('.' + m); var n = this.disabled; var l = t.value
          var r = C(t.options[t.selectedIndex]); var t = t.options[0]
          if (typeof i.attr('lay-ignore') === 'string') return i.show()
          var s; var o = typeof i.attr('lay-search') === 'string'; var t = t && !t.value && t.innerHTML || c
          var r = C(['<div class="' + (o ? '' : 'layui-unselect ') + m, (n ? ' layui-select-disabled' : '') + '">', '<div class="' + g + '">', '<input type="text" placeholder="' + d.escape(C.trim(t)) + '" value="' + d.escape(C.trim(l ? r.html() : '')) + '"' + (!n && o ? '' : ' readonly') + ' class="layui-input' + (o ? '' : ' layui-unselect') + (n ? ' ' + E : '') + '">', '<i class="layui-edge"></i></div>', '<dl class="layui-anim layui-anim-upbit' + (i.find('optgroup')[0] ? ' layui-select-group' : '') + '">', (t = i.find('*'), s = [], layui.each(t, function (e, t) {
            e !== 0 || t.value ? t.tagName.toLowerCase() === 'optgroup' ? s.push('<dt>' + t.label + '</dt>') : s.push('<dd lay-value="' + d.escape(t.value) + '" class="' + (l === t.value ? T : '') + (t.disabled ? ' ' + E : '') + '">' + C.trim(t.innerHTML) + '</dd>') : s.push('<dd lay-value="" class="layui-select-tips">' + C.trim(t.innerHTML || c) + '</dd>')
          }), s.length === 0 && s.push('<dd lay-value="" class="' + E + '">\u6ca1\u6709\u9009\u9879</dd>'), s.join('') + '</dl>'), '</div>'].join(''))
          a[0] && a.remove(), i.after(r), u.call(this, r, n, o)
        })
      },
      checkbox: function (e) {
        var o = {
          checkbox: ['layui-form-checkbox', 'layui-form-checked', 'checkbox'],
          _switch: ['layui-form-switch', 'layui-form-onswitch', 'switch']
        }; var e = e || a.find('input[type=checkbox]')
        e.each(function (e, t) {
          var i = C(this); var a = i.attr('lay-skin'); var n = (i.attr('lay-text') || '').split('|')
          var l = this.disabled; var r = o[a = a === 'switch' ? '_' + a : a] || o.checkbox
          if (typeof i.attr('lay-ignore') === 'string') return i.show()
          var s = i.next('.' + r[0])
          var t = C(['<div class="layui-unselect ' + r[0], t.checked ? ' ' + r[1] : '', l ? ' layui-checkbox-disabled ' + E : '', '"', a ? ' lay-skin="' + a + '"' : '', '>', (l = {
            checkbox: [t.title.replace(/\s/g, '') ? '<span>' + t.title + '</span>' : '', '<i class="layui-icon layui-icon-ok"></i>'].join(''),
            _switch: '<em>' + ((t.checked ? n[0] : n[1]) || '') + '</em><i></i>'
          })[a] || l.checkbox, '</div>'].join(''))
          s[0] && s.remove(), i.after(t), (function (i, a) {
            var n = C(this)
            i.on('click', function () {
              var e = n.attr('lay-filter'); var t = (n.attr('lay-text') || '').split('|')
              n[0].disabled || (n[0].checked ? (n[0].checked = !1, i.removeClass(a[1]).find('em').text(t[1])) : (n[0].checked = !0, i.addClass(a[1]).find('em').text(t[0])), layui.event.call(n[0], w, a[2] + '(' + e + ')', {
                elem: n[0],
                value: n[0].value,
                othis: i
              }))
            })
          }.call(this, t, r))
        })
      },
      radio: function (e) {
        var r = 'layui-form-radio'; var s = ['&#xe643;', '&#xe63f;']; var e = e || a.find('input[type=radio]')
        e.each(function (e, t) {
          var i = C(this); var a = i.next('.' + r); var n = this.disabled
          if (typeof i.attr('lay-ignore') === 'string') return i.show()
          a[0] && a.remove()
          n = C(['<div class="layui-unselect ' + r, t.checked ? ' ' + r + 'ed' : '', (n ? ' layui-radio-disabled ' + E : '') + '">', '<i class="layui-anim layui-icon">' + s[t.checked ? 0 : 1] + '</i>', '<div>' + (a = t.title || '', a = typeof i.next().attr('lay-radio') === 'string' ? i.next().html() : a) + '</div>', '</div>'].join(''))
          i.after(n), (function (a) {
            var n = C(this); var l = 'layui-anim-scaleSpring'
            a.on('click', function () {
              var e = n[0].name; var t = n.parents(o); var i = n.attr('lay-filter')
              var e = t.find('input[name=' + e.replace(/(\.|#|\[|\])/g, '\\$1') + ']')
              n[0].disabled || (layui.each(e, function () {
                var e = C(this).next('.' + r)
                this.checked = !1, e.removeClass(r + 'ed'), e.find('.layui-icon').removeClass(l).html(s[1])
              }), n[0].checked = !0, a.addClass(r + 'ed'), a.find('.layui-icon').addClass(l).html(s[0]), layui.event.call(n[0], w, 'radio(' + i + ')', {
                elem: n[0],
                value: n[0].value,
                othis: a
              }))
            })
          }.call(this, n))
        })
      }
    }
    return layui.type(e) === 'object' ? e.each(function (e, t) {
      var i = C(t)
      i.closest(o).length && (t.tagName === 'SELECT' ? n.select(i) : t.tagName === 'INPUT' && ((t = t.type) === 'checkbox' || t === 'radio' ? n[t](i) : n.input(i)))
    }) : e ? n[e] ? n[e]() : l.error('\u4e0d\u652f\u6301\u7684 "' + e + '" \u8868\u5355\u6e32\u67d3') : layui.each(n, function (e, t) {
      t()
    }), this
  }, t.prototype.validate = function (e) {
    var u = null; var d = r.config.verify; var f = 'layui-form-danger'
    return !(e = C(e))[0] || (e.attr('lay-verify') !== undefined || !1 !== this.validate(e.find('*[lay-verify]'))) && (layui.each(e, function (e, r) {
      var s = C(this); var t = (s.attr('lay-verify') || '').split('|'); var o = s.attr('lay-verType'); var c = s.val()
      if (s.removeClass(f), layui.each(t, function (e, t) {
        var i = ''; var a = d[t]
        if (a) {
          var n = typeof a === 'function' ? i = a(c, r) : !a[0].test(c)
          var l = r.tagName.toLowerCase() === 'select' || /^checkbox|radio$/.test(r.type); var i = i || a[1]
          if (t === 'required' && (i = s.attr('lay-reqText') || i), n) {
            return o === 'tips' ? h.tips(i, typeof s.attr('lay-ignore') !== 'string' && l ? s.next() : s, { tips: 1 }) : o === 'alert' ? h.alert(i, {
              title: '\u63d0\u793a',
              shadeClose: !0
            }) : /\bstring|number\b/.test(typeof i) && h.msg(i, { icon: 5, shift: 6 }), setTimeout(function () {
              (l ? s.next().find('input') : r).focus()
            }, 7), s.addClass(f), u = !0
          }
        }
      }), u) return u
    }), !u)
  }, t.prototype.submit = function (e, t) {
    var i = C(this); var e = typeof e === 'string' ? e : i.attr('lay-filter')
    var a = this.getFormElem ? this.getFormElem(e) : i.parents(o).eq(0); var n = a.find('*[lay-verify]')
    if (!r.validate(n)) return !1
    n = r.getValue(null, a), a = {
      elem: this.getFormElem ? window.event && window.event.target : this,
      form: (this.getFormElem ? a : i.parents('form'))[0],
      field: n
    }
    return typeof t === 'function' && t(a), layui.event.call(this, w, 'submit(' + e + ')', a)
  }); var r = new t(); var t = C(document); var q = C(window)
  C(function () {
    r.render()
  }), t.on('reset', o, function () {
    var e = C(this).attr('lay-filter')
    setTimeout(function () {
      r.render(null, e)
    }, 50)
  }), t.on('submit', o, i).on('click', '*[lay-submit]', i), e(w, r)
})
layui.define(['laytpl', 'laypage', 'form', 'util'], function (e) {
  'use strict'
  var m = layui.$; var v = layui.laytpl; var c = layui.laypage; var g = layui.layer; var y = layui.form; var b = layui.util
  var f = layui.hint(); var h = layui.device(); var x = {
    config: { checkName: 'LAY_CHECKED', indexName: 'LAY_TABLE_INDEX', disabledName: 'LAY_DISABLED' },
    cache: {},
    index: layui.table ? layui.table.index + 1e4 : 0,
    set: function (e) {
      var t = this
      return t.config = m.extend({}, t.config, e), t
    },
    on: function (e, t) {
      return layui.onevent.call(this, C, e, t)
    }
  }; var p = function () {
    var a = this; var e = a.config; var i = e.id || e.index
    return i && (p.that[i] = a, p.config[i] = e), {
      config: e,
      reload: function (e, t) {
        a.reload.call(a, e, t)
      },
      reloadData: function (e, t) {
        x.reloadData(i, e, t)
      },
      setColsWidth: function () {
        a.setColsWidth.call(a)
      },
      resize: function () {
        a.resize.call(a)
      }
    }
  }; var l = function (e) {
    var t = p.config[e]
    return t || f.error(e ? "The table instance with ID '" + e + "' not found" : 'ID argument required'), t || null
  }; var k = function (e) {
    var t = this.config || {}; var a = (e = e || {}).item3; var i = e.content
    var t = (('escape' in a ? a : t).escape && (i = b.escape(i)), e.text && a.exportTemplet || a.templet || a.toolbar)
    return t && (i = typeof t === 'function' ? t.call(a, e.tplData, e.obj) : v(m(t).html() || String(i)).render(m.extend({ LAY_COL: a }, e.tplData))), e.text ? m('<div>' + i + '</div>').text() : i
  }; var C = 'table'; var w = 'layui-hide'; var r = 'layui-hide-v'; var d = 'layui-none'; var s = 'layui-table-view'
  var u = '.layui-table-header'; var T = '.layui-table-body'; var L = '.layui-table-pageview'; var N = '.layui-table-sort'
  var D = 'layui-table-edit'; var A = 'layui-table-hover'; var E = 'layui-table-col-special'; var _ = 'LAY_TABLE_MOVE_DICT'
  var t = function (e) {
    return ['<table cellspacing="0" cellpadding="0" border="0" class="layui-table" ', '{{# if(d.data.skin){ }}lay-skin="{{=d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{=d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>', '<thead>', '{{# layui.each(d.data.cols, function(i1, item1){ }}', '<tr>', '{{# layui.each(item1, function(i2, item2){ }}', '{{# if(item2.fixed && item2.fixed !== "right"){ left = true; } }}', '{{# if(item2.fixed === "right"){ right = true; } }}', (e = e || {}).fixed && e.fixed !== 'right' ? '{{# if(item2.fixed && item2.fixed !== "right"){ }}' : e.fixed === 'right' ? '{{# if(item2.fixed === "right"){ }}' : '', '{{# var isSort = !(item2.colGroup) && item2.sort; }}', '<th data-field="{{= item2.field||i2 }}" data-key="{{=d.index}}-{{=i1}}-{{=i2}}" {{# if( item2.parentKey){ }}data-parentkey="{{= item2.parentKey }}"{{# } }} {{# if(item2.minWidth){ }}data-minwidth="{{=item2.minWidth}}"{{# } }} {{#if(item2.colspan){}} colspan="{{=item2.colspan}}"{{#} if(item2.rowspan){}} rowspan="{{=item2.rowspan}}"{{#}}} {{# if(item2.unresize || item2.colGroup){ }}data-unresize="true"{{# } }} class="{{# if(item2.hide){ }}layui-hide{{# } }}{{# if(isSort){ }} layui-unselect{{# } }}{{# if(!item2.field){ }} layui-table-col-special{{# } }}">', '<div class="layui-table-cell laytable-cell-', '{{# if(item2.colGroup){ }}', 'group', '{{# } else { }}', '{{=d.index}}-{{=i1}}-{{=i2}}', '{{# if(item2.type !== "normal"){ }}', ' laytable-cell-{{= item2.type }}', '{{# } }}', '{{# } }}', '" {{#if(item2.align){}}align="{{=item2.align}}"{{#}}}>', '{{# if(item2.type === "checkbox"){ }}', '<input type="checkbox" name="layTableCheckbox" lay-skin="primary" lay-filter="layTableAllChoose" {{# if(item2[d.data.checkName]){ }}checked{{# }; }}>', '{{# } else { }}', '<span>{{-item2.title||""}}</span>', '{{# if(isSort){ }}', '<span class="layui-table-sort layui-inline"><i class="layui-edge layui-table-sort-asc" title="\u5347\u5e8f"></i><i class="layui-edge layui-table-sort-desc" title="\u964d\u5e8f"></i></span>', '{{# } }}', '{{# } }}', '</div>', '</th>', e.fixed ? '{{# }; }}' : '', '{{# }); }}', '</tr>', '{{# }); }}', '</thead>', '</table>'].join('')
  }
  var a = ['<table cellspacing="0" cellpadding="0" border="0" class="layui-table" ', '{{# if(d.data.skin){ }}lay-skin="{{=d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{=d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>', '<tbody></tbody>', '</table>'].join('')
  var j = [, '{{# if(d.data.toolbar){ }}', '<div class="layui-table-tool">', '<div class="layui-table-tool-temp"></div>', '<div class="layui-table-tool-self"></div>', '</div>', '{{# } }}', '<div class="layui-table-box">', '{{# if(d.data.loading){ }}', '<div class="layui-table-init" style="background-color: #fff;">', '<i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>', '</div>', '{{# } }}', '{{# var left, right; }}', '<div class="layui-table-header">', t(), '</div>', '<div class="layui-table-body layui-table-main">', a, '</div>', '{{# if(left){ }}', '<div class="layui-table-fixed layui-table-fixed-l">', '<div class="layui-table-header">', t({ fixed: !0 }), '</div>', '<div class="layui-table-body">', a, '</div>', '</div>', '{{# }; }}', '{{# if(right){ }}', '<div class="layui-table-fixed layui-table-fixed-r layui-hide">', '<div class="layui-table-header">', t({ fixed: 'right' }), '<div class="layui-table-mend"></div>', '</div>', '<div class="layui-table-body">', a, '</div>', '</div>', '{{# }; }}', '</div>', '{{# if(d.data.totalRow){ }}', '<div class="layui-table-total">', '<table cellspacing="0" cellpadding="0" border="0" class="layui-table" ', '{{# if(d.data.skin){ }}lay-skin="{{=d.data.skin}}"{{# } }} {{# if(d.data.size){ }}lay-size="{{=d.data.size}}"{{# } }} {{# if(d.data.even){ }}lay-even{{# } }}>', '<tbody><tr><td><div class="layui-table-cell" style="visibility: hidden;">Total</div></td></tr></tbody>', '</table>', '</div>', '{{# } }}', '<div class="layui-table-column layui-table-page layui-hide">', '<div class="layui-inline layui-table-pageview" id="layui-table-page{{=d.index}}"></div>', '</div>', '<style>', '{{# layui.each(d.data.cols, function(i1, item1){', 'layui.each(item1, function(i2, item2){ }}', '.laytable-cell-{{=d.index}}-{{=i1}}-{{=i2}}{ ', '{{# if(item2.width){ }}', 'width: {{=item2.width}}px;', '{{# } }}', ' }', '{{# });', '}); }}', '{{# if(d.data.lineStyle){', 'var cellClassName = ".layui-table-view-"+ d.index +" .layui-table-body .layui-table .layui-table-cell";', '}}', '{{= cellClassName }}{', 'display: -webkit-box; -webkit-box-align: center; white-space: normal; {{- d.data.lineStyle }} ', '}', '{{= cellClassName }}:hover{overflow: auto;}', '{{# } }}', '{{# if(d.data.css){ }}', '{{- d.data.css }}', '{{# } }}', '</style>'].join('')
  var R = m(window); var S = m(document); var i = function (e) {
    this.index = ++x.index, this.config = m.extend({}, this.config, x.config, e), this.render()
  }; var F = (i.prototype.config = {
    limit: 10,
    loading: !0,
    escape: !0,
    cellMinWidth: 60,
    editTrigger: 'click',
    defaultToolbar: ['filter', 'exports', 'print'],
    autoSort: !0,
    text: { none: '\u65e0\u6570\u636e' }
  }, i.prototype.render = function (e) {
    var t = this; var a = t.config
    if (a.elem = m(a.elem), a.where = a.where || {}, a.id = a.id || a.elem.attr('id') || t.index, a.request = m.extend({
      pageName: 'page',
      limitName: 'limit'
    }, a.request), a.response = m.extend({
      statusName: 'code',
      statusCode: 0,
      msgName: 'msg',
      dataName: 'data',
      totalRowName: 'totalRow',
      countName: 'count'
    }, a.response), typeof a.page === 'object' && (a.limit = a.page.limit || a.limit, a.limits = a.page.limits || a.limits, t.page = a.page.curr = a.page.curr || 1, delete a.page.elem, delete a.page.jump), !a.elem[0]) return t
    if (e === 'reloadData') return t.pullData(t.page, { type: 'reloadData' })
    a.height && /^full-\d+$/.test(a.height) && (t.fullHeightGap = a.height.split('-')[1], a.height = R.height() - t.fullHeightGap), t.setInit()
    var i; var l; var e = a.elem; var n = e.next('.' + s); var o = t.elem = m('<div></div>')
    o.addClass((i = [s, s + '-' + t.index, 'layui-form', 'layui-border-box'], a.className && i.push(a.className), i.join(' '))).attr({
      'lay-filter': 'LAY-TABLE-FORM-DF-' + t.index,
      'lay-id': a.id,
      style: (i = [], a.width && i.push('width:' + a.width + 'px;'), a.height && i.push('height:' + a.height + 'px;'), i.join(''))
    }).html(v(j).render({
      data: a,
      index: t.index
    })), a.index = t.index, t.key = a.id || a.index, n[0] && n.remove(), e.after(o), t.layTool = o.find('.layui-table-tool'), t.layBox = o.find('.layui-table-box'), t.layHeader = o.find(u), t.layMain = o.find('.layui-table-main'), t.layBody = o.find(T), t.layFixed = o.find('.layui-table-fixed'), t.layFixLeft = o.find('.layui-table-fixed-l'), t.layFixRight = o.find('.layui-table-fixed-r'), t.layTotal = o.find('.layui-table-total'), t.layPage = o.find('.layui-table-page'), t.renderToolbar(), t.renderPagebar(), t.fullSize(), a.cols.length > 1 && (i = t.layFixed.find(u).find('th'), l = t.layHeader.first(), layui.each(i, function (e, t) {
      (t = m(t)).height(l.find('th[data-key="' + t.attr('data-key') + '"]').height() + 'px')
    })), t.pullData(t.page), t.events()
  }, i.prototype.initOpts = function (e) {
    this.config
    e.checkbox && (e.type = 'checkbox'), e.space && (e.type = 'space'), e.type || (e.type = 'normal'), e.type !== 'normal' && (e.unresize = !0, e.width = e.width || {
      checkbox: 50,
      radio: 50,
      space: 30,
      numbers: 60
    }[e.type])
  }, i.prototype.setInit = function (e) {
    var l; var a; var c = this; var r = c.config
    if (r.clientWidth = r.width || (l = function (e) {
      var t; var a = (e = e || r.elem.parent()).width()
      try {
        t = e.css('display') === 'none'
      } catch (i) {
      }
      return !e[0] || a && !t ? a : l(e.parent())
    })(), e === 'width') return r.clientWidth
    r.css && r.css.indexOf(s) === -1 && (a = r.css.split('}'), layui.each(a, function (e, t) {
      t && (a[e] = '.' + s + '-' + c.index + ' ' + t)
    }), r.css = a.join('}'))
    var d = function (a, e, i, l) {
      var n, o
      l ? (l.key = a + '-' + i, l.hide = l.hide || !1, l.colspan = l.colspan || 1, l.rowspan = l.rowspan || 1, c.initOpts(l), (n = a + (parseInt(l.rowspan) || 1)) < r.cols.length ? (l.colGroup = !0, o = 0, layui.each(r.cols[n], function (e, t) {
        t.HAS_PARENT || o >= 1 && o == (l.colspan || 1) || (t.HAS_PARENT = !0, t.parentKey = a + '-' + i, o += parseInt(t.colspan > 1 ? t.colspan : 1), d(n, r.cols[n], e, t))
      })) : l.colGroup = !1) : e.splice(i, 1)
    }
    layui.each(r.cols, function (a, i) {
      if (a) return !0
      layui.each(i, function (e, t) {
        d(a, i, e, t)
      })
    })
  }, i.prototype.renderToolbar = function () {
    var e = this.config
    var t = ['<div class="layui-inline" lay-event="add"><i class="layui-icon layui-icon-add-1"></i></div>', '<div class="layui-inline" lay-event="update"><i class="layui-icon layui-icon-edit"></i></div>', '<div class="layui-inline" lay-event="delete"><i class="layui-icon layui-icon-delete"></i></div>'].join('')
    var a = this.layTool.find('.layui-table-tool-temp')
    var i = (e.toolbar === 'default' ? a.html(t) : typeof e.toolbar === 'string' && (t = m(e.toolbar).html() || '') && a.html(v(t).render(e)), {
      filter: {
        title: '\u7b5b\u9009\u5217',
        layEvent: 'LAYTABLE_COLS',
        icon: 'layui-icon-cols'
      },
      exports: { title: '\u5bfc\u51fa', layEvent: 'LAYTABLE_EXPORT', icon: 'layui-icon-export' },
      print: { title: '\u6253\u5370', layEvent: 'LAYTABLE_PRINT', icon: 'layui-icon-print' }
    }); var l = []
    typeof e.defaultToolbar === 'object' && layui.each(e.defaultToolbar, function (e, t) {
      t = typeof t === 'string' ? i[t] : t
      t && l.push('<div class="layui-inline" title="' + t.title + '" lay-event="' + t.layEvent + '"><i class="layui-icon ' + t.icon + '"></i></div>')
    }), this.layTool.find('.layui-table-tool-self').html(l.join(''))
  }, i.prototype.renderPagebar = function () {
    var e; var t = this.config; var a = this.layPagebar = m('<div class="layui-inline layui-table-pagebar"></div>')
    t.pagebar && ((e = m(t.pagebar).html() || '') && a.append(v(e).render(t)), this.layPage.append(a))
  }, i.prototype.setParentCol = function (e, t) {
    var a = this.config; var i = this.layHeader.find('th[data-key="' + a.index + '-' + t + '"]')
    var l = parseInt(i.attr('colspan')) || 0
    i[0] && (t = t.split('-'), t = a.cols[t[0]][t[1]], e ? l-- : l++, i.attr('colspan', l), i[l < 1 ? 'addClass' : 'removeClass'](w), t.colspan = l, t.hide = l < 1, (a = i.data('parentkey')) && this.setParentCol(e, a))
  }, i.prototype.setColsPatch = function () {
    var a = this; var e = a.config
    layui.each(e.cols, function (e, t) {
      layui.each(t, function (e, t) {
        t.hide && a.setParentCol(t.hide, t.parentKey)
      })
    })
  }, i.prototype.setColsWidth = function () {
    var t; var a; var i = this; var o = i.config; var l = 0; var c = 0; var r = 0; var d = 0; var s = i.setInit('width')
    var e = (i.eachCols(function (e, t) {
      t.hide || l++
    }), s = s - (o.skin === 'line' || o.skin === 'nob' ? 2 : l + 1) - i.getScrollWidth(i.layMain[0]) - 1, function (n) {
      layui.each(o.cols, function (e, l) {
        layui.each(l, function (e, t) {
          var a = 0; var i = t.minWidth || o.cellMinWidth
          t ? t.colGroup || t.hide || (n ? r && r < i && (c--, a = i) : (a = t.width || 0, /\d+%$/.test(a) ? (a = Math.floor(parseFloat(a) / 100 * s)) < i && (a = i) : a || (t.width = a = 0, c++)), t.hide && (a = 0), d += a) : l.splice(e, 1)
        })
      }), d < s && c && (r = (s - d) / c)
    }); var n = (e(), e(!0), i.autoColNums = c, i.eachCols(function (e, t) {
      var a = t.minWidth || o.cellMinWidth
      t.colGroup || t.hide || (t.width === 0 ? i.getCssRule(o.index + '-' + t.key, function (e) {
        e.style.width = Math.floor(a <= r ? r : a) + 'px'
      }) : /\d+%$/.test(t.width) && i.getCssRule(o.index + '-' + t.key, function (e) {
        e.style.width = Math.floor(parseFloat(t.width) / 100 * s) + 'px'
      }))
    }), i.layMain.width() - i.getScrollWidth(i.layMain[0]) - i.layMain.children('table').outerWidth())
    i.autoColNums && -l <= n && n <= l && (e = (a = (t = function (e) {
      return !(e = e || i.layHeader.eq(0).find('thead th:last-child')).data('field') && e.prev()[0] ? t(e.prev()) : e
    })()).data('key'), i.getCssRule(e, function (e) {
      var t = e.style.width || a.outerWidth()
      e.style.width = parseFloat(t) + n + 'px', i.layMain.height() - i.layMain.prop('clientHeight') > 0 && (e.style.width = parseFloat(e.style.width) - 1 + 'px')
    })), i.loading(!0)
  }, i.prototype.resize = function () {
    this.fullSize(), this.setColsWidth(), this.scrollPatch()
  }, i.prototype.reload = function (e, t, a) {
    var i = this
    e = e || {}, delete i.haveInit, layui.each(e, function (e, t) {
      layui.type(t) === 'array' && delete i.config[e]
    }), i.config = m.extend(t, {}, i.config, e), i.render(a)
  }, i.prototype.errorView = function (e) {
    var t = this; var a = t.layMain.find('.' + d); var e = m('<div class="' + d + '">' + (e || 'Error') + '</div>')
    a[0] && (t.layNone.remove(), a.remove()), t.layFixed.addClass(w), t.layMain.find('tbody').html(''), t.layMain.append(t.layNone = e), t.layTotal.addClass(r), t.layPage.find(L).addClass(r), x.cache[t.key] = [], t.syncCheckAll()
  }, i.prototype.page = 1, i.prototype.pullData = function (t, a) {
    var e; var i = this; var l = i.config; var n = l.request; var o = l.response; var c = function () {
      typeof l.initSort === 'object' && i.sort(l.initSort.field, l.initSort.type)
    }
    a = a || {}, typeof l.before === 'function' && l.before(l), i.startTime = (new Date()).getTime(), l.url ? ((e = {})[n.pageName] = t, e[n.limitName] = l.limit, n = m.extend(e, l.where), l.contentType && l.contentType.indexOf('application/json') == 0 && (n = JSON.stringify(n)), i.loading(), m.ajax({
      type: l.method || 'get',
      url: l.url,
      contentType: l.contentType,
      data: n,
      dataType: l.dataType || 'json',
      jsonpCallback: l.jsonpCallback,
      headers: l.headers || {},
      success: function (e) {
        (e = typeof l.parseData === 'function' ? l.parseData(e) || e : e)[o.statusName] != o.statusCode ? (i.renderForm(), i.errorView(e[o.msgName] || '\u8fd4\u56de\u7684\u6570\u636e\u4e0d\u7b26\u5408\u89c4\u8303\uff0c\u6b63\u786e\u7684\u6210\u529f\u72b6\u6001\u7801\u5e94\u4e3a\uff1a"' + o.statusName + '": ' + o.statusCode)) : (i.renderData({
          res: e,
          curr: t,
          count: e[o.countName],
          type: a.type
        }), c(), l.time = (new Date()).getTime() - i.startTime + ' ms'), i.setColsWidth(), typeof l.done === 'function' && l.done(e, t, e[o.countName])
      },
      error: function (e, t) {
        i.errorView('\u8bf7\u6c42\u5f02\u5e38\uff0c\u9519\u8bef\u63d0\u793a\uff1a' + t), i.renderForm(), i.setColsWidth(), typeof l.error === 'function' && l.error(e, t)
      }
    })) : layui.type(l.data) === 'array' && (e = t * l.limit - l.limit, (n = {})[o.dataName] = l.data.concat().splice(e, l.limit), n[o.countName] = l.data.length, typeof l.totalRow === 'object' && (n[o.totalRowName] = m.extend({}, l.totalRow)), i.renderData({
      res: n,
      curr: t,
      count: n[o.countName],
      type: a.type
    }), c(), i.setColsWidth(), typeof l.done === 'function' && l.done(n, t, n[o.countName]))
  }, i.prototype.eachCols = function (e) {
    return x.eachCols(null, e, this.config.cols), this
  }, i.prototype.col = function (e) {
    try {
      return e = e.split('-'), this.config.cols[e[1]][e[2]]
    } catch (t) {
      return f.error(t), {}
    }
  }, i.prototype.renderData = function (e) {
    var u = this; var y = u.config; var t = e.res; var l = e.curr; var a = e.count; var n = e.sort; var i = t[y.response.dataName] || []
    var t = t[y.response.totalRowName]; var h = []; var f = []; var p = []; var o = function () {
      var s
      if (y.HAS_SET_COLS_PATCH || u.setColsPatch(), y.HAS_SET_COLS_PATCH = !0, !n && u.sortKey) return u.sort(u.sortKey.field, u.sortKey.sort, !0)
      layui.each(i, function (o, c) {
        var a = []; var i = []; var r = []; var d = o + y.limit * (l - 1) + 1
        layui.type(c) === 'array' && c.length === 0 || (n || (c[x.config.indexName] = o), u.eachCols(function (e, l) {
          var e = l.field || e; var t = y.index + '-' + l.key; var n = c[e]
          n !== undefined && n !== null || (n = ''), l.colGroup || (t = ['<td data-field="' + e + '" data-key="' + t + '" ' + (e = [], l.templet && e.push('data-content="' + b.escape(n) + '"'), l.toolbar && e.push('data-off="true"'), l.event && e.push('lay-event="' + l.event + '"'), l.minWidth && e.push('data-minwidth="' + l.minWidth + '"'), e.join(' ')) + ' class="' + (e = [], l.hide && e.push(w), l.field || e.push(E), e.join(' ')) + '">', '<div class="layui-table-cell laytable-cell-' + (l.type === 'normal' ? t : t + ' laytable-cell-' + l.type) + '"' + (l.align ? ' align="' + l.align + '"' : '') + (e = [], l.style && e.push('style="' + l.style + '"'), e.join(' ')) + '>' + (function () {
            var e; var t = m.extend(!0, { LAY_INDEX: d, LAY_COL: l }, c); var a = x.config.checkName
            var i = x.config.disabledName
            switch (l.type) {
              case 'checkbox':
                return '<input type="checkbox" name="layTableCheckbox" lay-skin="primary" ' + (e = [], l[a] && (c[a] = l[a], l[a] && (e[0] = 'checked')), t[a] && (e[0] = 'checked'), t[i] && e.push('disabled'), e.join(' ')) + '>'
              case 'radio':
                return t[a] && (s = o), '<input type="radio" name="layTableRadio_' + y.index + '" ' + (e = [], t[a] && (e[0] = 'checked'), t[i] && e.push('disabled'), e.join(' ')) + ' lay-type="layTableRadio">'
              case 'numbers':
                return d
            }
            return l.toolbar ? v(m(l.toolbar).html() || '').render(t) : k.call(u, {
              item3: l,
              content: n,
              tplData: t
            })
          }()), '</div></td>'].join(''), a.push(t), l.fixed && l.fixed !== 'right' && i.push(t), l.fixed === 'right' && r.push(t))
        }), h.push('<tr data-index="' + o + '">' + a.join('') + '</tr>'), f.push('<tr data-index="' + o + '">' + i.join('') + '</tr>'), p.push('<tr data-index="' + o + '">' + r.join('') + '</tr>'))
      }), y.scrollPos === 'fixed' && e.type === 'reloadData' || u.layBody.scrollTop(0), y.scrollPos === 'reset' && u.layBody.scrollLeft(0), u.layMain.find('.' + d).remove(), u.layMain.find('tbody').html(h.join('')), u.layFixLeft.find('tbody').html(f.join('')), u.layFixRight.find('tbody').html(p.join('')), u.renderForm(), typeof s === 'number' && u.setThisRowChecked(s), u.syncCheckAll(), u.fullSize(), u.haveInit ? u.scrollPatch() : setTimeout(function () {
        u.scrollPatch()
      }, 50), u.haveInit = !0, g.close(u.tipsIndex)
    }
    return x.cache[u.key] = i, u.layTotal[i.length == 0 ? 'addClass' : 'removeClass'](r), u.layPage[y.page || y.pagebar ? 'removeClass' : 'addClass'](w), u.layPage.find(L)[!y.page || a == 0 || i.length === 0 && l == 1 ? 'addClass' : 'removeClass'](r), i.length === 0 ? (u.renderForm(), u.errorView(y.text.none)) : (u.layFixLeft.removeClass(w), n ? o() : (o(), u.renderTotal(i, t), u.layTotal && u.layTotal.removeClass(w), void (y.page && (y.page = m.extend({
      elem: 'layui-table-page' + y.index,
      count: a,
      limit: y.limit,
      limits: y.limits || [10, 20, 30, 40, 50, 60, 70, 80, 90],
      groups: 3,
      layout: ['prev', 'page', 'next', 'skip', 'count', 'limit'],
      prev: '<i class="layui-icon">&#xe603;</i>',
      next: '<i class="layui-icon">&#xe602;</i>',
      jump: function (e, t) {
        t || (u.page = e.curr, y.limit = e.limit, u.pullData(e.curr))
      }
    }, y.page), y.page.count = a, c.render(y.page)))))
  }, i.prototype.renderTotal = function (e, o) {
    var c; var r = this; var d = r.config; var s = {}
    d.totalRow && (layui.each(e, function (e, i) {
      layui.type(i) === 'array' && i.length === 0 || r.eachCols(function (e, t) {
        var e = t.field || e; var a = i[e]
        t.totalRow && (s[e] = (s[e] || 0) + (parseFloat(a) || 0))
      })
    }), r.dataTotal = {}, c = [], r.eachCols(function (e, t) {
      var a; var e = t.field || e; var i = o && o[t.field]
      var l = (a = t.totalRowText || '', n = 'totalRowDecimals' in t ? t.totalRowDecimals : 2, n = parseFloat(s[e]).toFixed(n), (l = { LAY_COL: t })[e] = n, n = t.totalRow && k.call(r, {
        item3: t,
        content: n,
        tplData: l
      }) || a, i || n)
      var n = ['<td data-field="' + e + '" data-key="' + d.index + '-' + t.key + '" ' + (a = [], t.align && a.push('align="' + t.align + '"'), t.minWidth && a.push('data-minwidth="' + t.minWidth + '"'), a.join(' ')) + ' class="' + (n = [], t.hide && n.push(w), t.field || n.push(E), n.join(' ')) + '">', '<div class="layui-table-cell laytable-cell-' + (a = d.index + '-' + t.key, t.type === 'normal' ? a : a + ' laytable-cell-' + t.type) + '"' + (n = [], t.style && n.push('style="' + t.style + '"'), n.join(' ')) + '>' + (typeof (a = t.totalRow || d.totalRow) === 'string' ? v(a).render(m.extend({
        TOTAL_NUMS: i || s[e],
        LAY_COL: t
      }, t)) : l), '</div></td>'].join('')
      t.field && (r.dataTotal[e] = l), c.push(n)
    }), r.layTotal.find('tbody').html('<tr>' + c.join('') + '</tr>'))
  }, i.prototype.getColElem = function (e, t) {
    var a = this.config
    return e.eq(0).find('.laytable-cell-' + a.index + '-' + t + ':eq(0)')
  }, i.prototype.renderForm = function (e) {
    this.config
    var t = this.elem.attr('lay-filter')
    y.render(e, t)
  }, i.prototype.setThisRowChecked = function (e) {
    this.config
    var t = 'layui-table-click'
    this.layBody.find('tr[data-index="' + e + '"]').addClass(t).siblings('tr').removeClass(t)
  }, i.prototype.sort = function (l, e, t, a) {
    var i; var n = this; var o = {}; var c = n.config; var r = c.elem.attr('lay-filter'); var d = x.cache[n.key]
    typeof l === 'string' && (s = l, n.layHeader.find('th').each(function (e, t) {
      var a = m(this); var i = a.data('field')
      if (i === l) return l = a, s = i, !1
    }))
    try {
      var s = s || l.data('field'); var u = l.data('key')
      if (n.sortKey && !t && s === n.sortKey.field && e === n.sortKey.sort) return
      var y = n.layHeader.find('th .laytable-cell-' + u).find(N)
      n.layHeader.find('th').find(N).removeAttr('lay-sort'), y.attr('lay-sort', e || null), n.layFixed.find('th')
    } catch (h) {
      f.error("Table modules: sort field '" + s + "' not matched")
    }
    n.sortKey = {
      field: s,
      sort: e
    }, c.autoSort && (e === 'asc' ? i = layui.sort(d, s) : e === 'desc' ? i = layui.sort(d, s, !0) : (i = layui.sort(d, x.config.indexName), delete n.sortKey, delete c.initSort)), o[c.response.dataName] = i || d, n.renderData({
      res: o,
      curr: n.page,
      count: n.count,
      sort: !0
    }), a && (c.initSort = { field: s, type: e }, layui.event.call(l, C, 'sort(' + r + ')', c.initSort))
  }, i.prototype.loading = function (e) {
    var t = this
    t.config.loading && (e ? (t.layInit && t.layInit.remove(), delete t.layInit, t.layBox.find('.layui-table-init').remove()) : (t.layInit = m(['<div class="layui-table-init">', '<i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i>', '</div>'].join('')), t.layBox.append(t.layInit)))
  }, i.prototype.setCheckData = function (e, t) {
    var a = this.config; var i = x.cache[this.key]
    i[e] && layui.type(i[e]) !== 'array' && (i[e][a.checkName] = t)
  }, i.prototype.syncCheckAll = function () {
    var e = this; var i = e.config; var t = e.layHeader.find('input[name="layTableCheckbox"]'); var a = function (a) {
      return e.eachCols(function (e, t) {
        t.type === 'checkbox' && (t[i.checkName] = a)
      }), a
    }
    t[0] && (x.checkStatus(e.key).isAll ? (t[0].checked || (t.prop('checked', !0), e.renderForm('checkbox')), a(!0)) : (t[0].checked && (t.prop('checked', !1), e.renderForm('checkbox')), a(!1)))
  }, i.prototype.getCssRule = function (a, i) {
    var e = this.elem.find('style')[0]; var e = e.sheet || e.styleSheet || {}; var e = e.cssRules || e.rules
    layui.each(e, function (e, t) {
      if (t.selectorText === '.laytable-cell-' + a) return i(t), !0
    })
  }, i.prototype.fullSize = function () {
    var e = this; var t = e.config; var a = t.height
    e.fullHeightGap && (a = R.height() - e.fullHeightGap, e.elem.css('height', a = a < 135 ? 135 : a)), a && (a = parseFloat(a) - (e.layHeader.outerHeight() || 38), t.toolbar && (a -= e.layTool.outerHeight() || 50), t.totalRow && (a -= e.layTotal.outerHeight() || 40), (t.page || t.pagebar) && (a -= e.layPage.outerHeight() || 43), e.layMain.outerHeight(a))
  }, i.prototype.getScrollWidth = function (e) {
    var t = 0
    return e ? t = e.offsetWidth - e.clientWidth : ((e = document.createElement('div')).style.width = '100px', e.style.height = '100px', e.style.overflowY = 'scroll', document.body.appendChild(e), t = e.offsetWidth - e.clientWidth, document.body.removeChild(e)), t
  }, i.prototype.scrollPatch = function () {
    var e = this; var t = e.layMain.children('table'); var a = e.layMain.width() - e.layMain.prop('clientWidth')
    var i = e.layMain.height() - e.layMain.prop('clientHeight')
    var l = (e.getScrollWidth(e.layMain[0]), t.outerWidth() - e.layMain.width()); var n = function (e) {
      var t
      a && i ? (e = e.eq(0)).find('.layui-table-patch')[0] || ((t = m('<th class="layui-table-patch"><div class="layui-table-cell"></div></th>')).find('div').css({ width: a }), e.find('tr').append(t)) : e.find('.layui-table-patch').remove()
    }
    n(e.layHeader), n(e.layTotal)
    n = e.layMain.height() - i
    e.layFixed.find(T).css('height', t.height() >= n ? n : 'auto'), e.layFixRight[l > 0 ? 'removeClass' : 'addClass'](w), e.layFixRight.css('right', a - 1)
  }, i.prototype.events = function () {
    var s = this; var r = s.config; var d = r.elem.attr('lay-filter'); var e = s.layHeader.find('th'); var u = '.layui-table-cell'
    var i = m('body'); var l = {}; var n = (s.layTool.on('click', '*[lay-event]', function (e) {
      var a; var i = m(this); var t = i.attr('lay-event'); var l = function (e) {
        var t = m(e.list); var a = m('<ul class="layui-table-tool-panel"></ul>')
        a.html(t), r.height && a.css('max-height', r.height - (s.layTool.outerHeight() || 50)), i.find('.layui-table-tool-panel')[0] || i.append(a), s.renderForm(), a.on('click', function (e) {
          layui.stope(e)
        }), e.done && e.done(a, t)
      }
      switch (layui.stope(e), S.trigger('table.tool.panel.remove'), g.close(s.tipsIndex), t) {
        case 'LAYTABLE_COLS':
          l({
            list: (a = [], s.eachCols(function (e, t) {
              t.field && t.type == 'normal' && a.push('<li><input type="checkbox" name="' + t.field + '" data-key="' + t.key + '" data-parentkey="' + (t.parentKey || '') + '" lay-skin="primary" ' + (t.hide ? '' : 'checked') + ' title="' + b.escape(t.title || t.field) + '" lay-filter="LAY_TABLE_TOOL_COLS"></li>')
            }), a.join('')),
            done: function () {
              y.on('checkbox(LAY_TABLE_TOOL_COLS)', function (e) {
                var e = m(e.elem); var i = this.checked; var l = e.data('key'); var n = e.data('parentkey')
                layui.each(r.cols, function (a, e) {
                  layui.each(e, function (e, t) {
                    a + '-' + e === l && (e = t.hide, t.hide = !i, s.elem.find('*[data-key="' + r.index + '-' + l + '"]')[i ? 'removeClass' : 'addClass'](w), e != t.hide && s.setParentCol(!i, n), s.resize())
                  })
                })
              })
            }
          })
          break
        case 'LAYTABLE_EXPORT':
          h.ie ? g.tips('\u5bfc\u51fa\u529f\u80fd\u4e0d\u652f\u6301 IE\uff0c\u8bf7\u7528 Chrome \u7b49\u9ad8\u7ea7\u6d4f\u89c8\u5668\u5bfc\u51fa', this, { tips: 3 }) : l({
            list: ['<li data-type="csv">\u5bfc\u51fa csv \u683c\u5f0f\u6587\u4ef6</li>', '<li data-type="xls">\u5bfc\u51fa xls \u683c\u5f0f\u6587\u4ef6</li>'].join(''),
            done: function (e, t) {
              t.on('click', function () {
                var e = m(this).data('type')
                x.exportFile.call(s, r.id, null, e)
              })
            }
          })
          break
        case 'LAYTABLE_PRINT':
          var n = window.open('about:blank', '_blank')
          var o = ['<style>', 'body{font-size: 12px; color: #5F5F5F;}', 'table{width: 100%; border-collapse: collapse; border-spacing: 0;}', 'th,td{line-height: 20px; padding: 9px 15px; border: 1px solid #ccc; text-align: left; font-size: 12px; color: #5F5F5F;}', 'a{color: #5F5F5F; text-decoration:none;}', '*.layui-hide{display: none}', '</style>'].join('')
          var c = m(s.layHeader.html())
          c.append(s.layMain.find('table').html()), c.append(s.layTotal.find('table').html()), c.find('th.layui-table-patch').remove(), c.find('thead>tr>th.' + E).filter(function (e, t) {
            return !m(t).children('.laytable-cell-group').length
          }).remove(), c.find('tbody>tr>td.' + E).remove(), n.document.write(o + c.prop('outerHTML')), n.document.close(), n.print(), n.close()
      }
      layui.event.call(this, C, 'toolbar(' + d + ')', m.extend({ event: t, config: r }, {}))
    }), s.layPagebar.on('click', '*[lay-event]', function (e) {
      var t = m(this).attr('lay-event')
      layui.event.call(this, C, 'pagebar(' + d + ')', m.extend({ event: t, config: r }, {}))
    }), e.on('mousemove', function (e) {
      var t = m(this); var a = t.offset().left; var e = e.clientX - a
      t.data('unresize') || p.eventMoveElem || (l.allowResize = t.width() - e <= 10, i.css('cursor', l.allowResize ? 'col-resize' : ''))
    }).on('mouseleave', function () {
      m(this)
      p.eventMoveElem || i.css('cursor', '')
    }).on('mousedown', function (e) {
      var t; var a = m(this)
      l.allowResize && (t = a.data('key'), e.preventDefault(), l.offset = [e.clientX, e.clientY], s.getCssRule(t, function (e) {
        var t = e.style.width || a.outerWidth()
        l.rule = e, l.ruleWidth = parseFloat(t), l.minWidth = a.data('minwidth') || r.cellMinWidth
      }), a.data(_, l), p.eventMoveElem = a)
    }), p.docEvent || S.on('mousemove', function (e) {
      var t
      p.eventMoveElem && (t = p.eventMoveElem.data(_) || {}, p.eventMoveElem.data('resizing', 1), e.preventDefault(), t.rule && ((e = t.ruleWidth + e.clientX - t.offset[0]) < t.minWidth && (e = t.minWidth), t.rule.style.width = e + 'px', g.close(s.tipsIndex)))
    }).on('mouseup', function (e) {
      p.eventMoveElem && (l = {}, i.css('cursor', ''), s.scrollPatch(), p.eventMoveElem.removeData(_), delete p.eventMoveElem)
    }), p.docEvent = !0, e.on('click', function (e) {
      var t = m(this); var a = t.find(N); var i = a.attr('lay-sort')
      if (!a[0] || t.data('resizing') === 1) return t.removeData('resizing')
      s.sort(t, i === 'asc' ? 'desc' : i === 'desc' ? null : 'asc', null, !0)
    }).find(N + ' .layui-edge ').on('click', function (e) {
      var t = m(this); var a = t.index(); var t = t.parents('th').eq(0).data('field')
      layui.stope(e), a === 0 ? s.sort(t, 'asc', null, !0) : s.sort(t, 'desc', null, !0)
    }), s.commonMember = function (e) {
      var t = m(this).parents('tr').eq(0).data('index'); var r = s.layBody.find('tr[data-index="' + t + '"]')
      var d = (d = x.cache[s.key] || [])[t] || {}
      return m.extend({
        tr: r,
        data: x.clearCacheKey(d),
        del: function () {
          x.cache[s.key][t] = [], r.remove(), s.scrollPatch()
        },
        update: function (e, c) {
          e = e || {}, layui.each(e, function (i, l) {
            var n = r.children('td[data-field="' + i + '"]'); var o = n.children(u)
            i in d && (d[i] = l), s.eachCols(function (e, t) {
              var a
              t.field == i ? (o.html(k.call(s, {
                item3: t,
                content: l,
                tplData: d
              })), n.data('content', l)) : c && (t.templet || t.toolbar) && (e = r.children('td[data-field="' + (t.field || e) + '"]'), a = d[t.field], e.children(u).html(k.call(s, {
                item3: t,
                content: a,
                tplData: d
              })), e.data('content', a))
            })
          }), s.renderForm()
        }
      }, e)
    }); var t = (s.elem.on('click', 'input[name="layTableCheckbox"]+', function () {
      var e = m(this).prev(); var t = s.layBody.find('input[name="layTableCheckbox"]')
      var a = e.parents('tr').eq(0).data('index'); var i = e[0].checked
      var l = e.attr('lay-filter') === 'layTableAllChoose'
      e[0].disabled || (l ? (t.each(function (e, t) {
        t.checked = i, s.setCheckData(e, i)
      }), s.syncCheckAll(), s.renderForm('checkbox')) : (s.setCheckData(a, i), s.syncCheckAll()), layui.event.call(e[0], C, 'checkbox(' + d + ')', n.call(e[0], {
        checked: i,
        type: l ? 'all' : 'one'
      })))
    }), s.elem.on('click', 'input[lay-type="layTableRadio"]+', function () {
      var e = m(this).prev(); var t = e[0].checked; var a = x.cache[s.key]; var i = e.parents('tr').eq(0).data('index')
      layui.each(a, function (e, t) {
        i === e ? t[r.checkName] = !0 : delete t[r.checkName]
      }), s.setThisRowChecked(i), layui.event.call(this, C, 'radio(' + d + ')', n.call(this, { checked: t }))
    }), s.layBody.on('mouseenter', 'tr', function () {
      var e = m(this); var t = e.index()
      e.data('off') || s.layBody.find('tr:eq(' + t + ')').addClass(A)
    }).on('mouseleave', 'tr', function () {
      var e = m(this); var t = e.index()
      e.data('off') || s.layBody.find('tr:eq(' + t + ')').removeClass(A)
    }).on('click', 'tr', function () {
      t.call(this, 'row')
    }).on('dblclick', 'tr', function () {
      t.call(this, 'rowDouble')
    }), function (e) {
      var t = m(this)
      t.data('off') || layui.event.call(this, C, e + '(' + d + ')', n.call(t.children('td')[0]))
    }); var o = (s.layBody.on('change', '.' + D, function () {
      var e = m(this); var t = this.value; var a = e.parent().data('field'); var e = e.parents('tr').eq(0).data('index')
      x.cache[s.key][e][a] = t, layui.event.call(this, C, 'edit(' + d + ')', n.call(this, { value: t, field: a }))
    }).on('blur', '.' + D, function () {
      var e; var t = m(this); var a = t.parent(); var i = a.data('key'); var l = t.closest('tr').data('index')
      var l = x.cache[s.key][l]
      t.siblings(u).html((e = t[0].value, k.call(s, {
        item3: s.col(i),
        content: e,
        tplData: l
      }))), a.data('content', t[0].value), t.remove()
    }), s.layBody.on(r.editTrigger, 'td', function (e) {
      var t; var a; var i; var l; var n = m(this)
      n.data('off') || (t = n.data('field'), l = n.data('key'), l = s.col(l), a = n.closest('tr').data('index'), a = x.cache[s.key][a], i = n.children(u), (l = typeof l.edit === 'function' ? l.edit(a) : l.edit) && ((l = m(l === 'textarea' ? '<textarea class="layui-input ' + D + '"></textarea>' : '<input class="layui-input ' + D + '">'))[0].value = n.data('content') || a[t] || i.text(), n.find('.' + D)[0] || n.append(l), l.focus(), layui.stope(e)))
    }).on('mouseenter', 'td', function () {
      a.call(this)
    }).on('mouseleave', 'td', function () {
      a.call(this, 'hide')
    }), 'layui-table-grid-down'); var a = function (e) {
      var t = m(this); var a = t.children(u)
      t.data('off') || (e ? t.find('.layui-table-grid-down').remove() : !(a.prop('scrollWidth') > a.outerWidth() || a.find('br').length > 0) || r.lineStyle || a.find('.' + o)[0] || t.append('<div class="' + o + '"><i class="layui-icon layui-icon-down"></i></div>'))
    }; var c = (s.layBody.on('click', '.' + o, function (e) {
      var t = m(this).parent().children(u)
      s.tipsIndex = g.tips(['<div class="layui-table-tips-main" style="margin-top: -' + (t.height() + 23) + 'px;' + (r.size === 'sm' ? 'padding: 4px 15px; font-size: 12px;' : r.size === 'lg' ? 'padding: 14px 15px;' : '') + '">', t.html(), '</div>', '<i class="layui-icon layui-table-tips-c layui-icon-close"></i>'].join(''), t[0], {
        tips: [3, ''],
        time: -1,
        anim: -1,
        maxWidth: h.ios || h.android ? 300 : s.elem.width() / 2,
        isOutAnim: !1,
        skin: 'layui-table-tips',
        success: function (e, t) {
          e.find('.layui-table-tips-c').on('click', function () {
            g.close(t)
          })
        }
      }), layui.stope(e)
    }), function (e) {
      var t = m(this); var a = t.parents('tr').eq(0).data('index')
      layui.event.call(this, C, (e || 'tool') + '(' + d + ')', n.call(this, { event: t.attr('lay-event') })), s.setThisRowChecked(a)
    })
    s.layBody.on('click', '*[lay-event]', function (e) {
      c.call(this), layui.stope(e)
    }).on('dblclick', '*[lay-event]', function (e) {
      c.call(this, 'toolDouble'), layui.stope(e)
    }), s.layMain.on('scroll', function () {
      var e = m(this); var t = e.scrollLeft(); var e = e.scrollTop()
      s.layHeader.scrollLeft(t), s.layTotal.scrollLeft(t), s.layFixed.find(T).scrollTop(e), g.close(s.tipsIndex)
    }), R.on('resize', function () {
      s.resize()
    })
  }, S.on('click', function () {
    S.trigger('table.remove.tool.panel')
  }), S.on('table.remove.tool.panel', function () {
    m('.layui-table-tool-panel').remove()
  }), x.init = function (a, i) {
    i = i || {}
    var e = m(a ? 'table[lay-filter="' + a + '"]' : '.layui-table[lay-data]')
    var c = 'Table element property lay-data configuration item has a syntax error: '
    return e.each(function () {
      var e = m(this); var t = e.attr('lay-data')
      try {
        t = new Function('return ' + t)()
      } catch (l) {
        f.error(c + t, 'error')
      }
      var n = []; var o = m.extend({
        elem: this,
        cols: [],
        data: [],
        skin: e.attr('lay-skin'),
        size: e.attr('lay-size'),
        even: typeof e.attr('lay-even') === 'string'
      }, x.config, i, t)
      a && e.hide(), e.find('thead>tr').each(function (i) {
        o.cols[i] = [], m(this).children().each(function (e) {
          var t = m(this); var a = t.attr('lay-data')
          try {
            a = new Function('return ' + a)()
          } catch (l) {
            return f.error(c + a)
          }
          t = m.extend({
            title: t.text(),
            colspan: t.attr('colspan') || 1,
            rowspan: t.attr('rowspan') || 1
          }, a)
          t.colspan < 2 && n.push(t), o.cols[i].push(t)
        })
      }), e.find('tbody>tr').each(function (e) {
        var a = m(this); var l = {}
        a.children('td').each(function (e, t) {
          var a = m(this); var i = a.data('field')
          if (i) return l[i] = a.html()
        }), layui.each(n, function (e, t) {
          e = a.children('td').eq(e)
          l[t.field] = e.html()
        }), o.data[e] = l
      }), x.render(o)
    }), this
  }, p.that = {}, p.config = {}, function (a, i, e, l) {
    var n, o
    l.colGroup && (n = 0, a++, l.CHILD_COLS = [], o = e + (parseInt(l.rowspan) || 1), layui.each(i[o], function (e, t) {
      t.parentKey ? t.parentKey === l.key && (t.PARENT_COL_INDEX = a, l.CHILD_COLS.push(t), F(a, i, o, t)) : t.PARENT_COL_INDEX || n >= 1 && n == (l.colspan || 1) || (t.PARENT_COL_INDEX = a, l.CHILD_COLS.push(t), n += t.hide ? 0 : parseInt(t.colspan > 1 ? t.colspan : 1), F(a, i, o, t))
    }))
  })
  x.eachCols = function (e, a, i) {
    var e = p.config[e] || {}; var l = []; var n = (i = m.extend(!0, [], i || e.cols), layui.each(i, function (a, e) {
      if (a) return !0
      layui.each(e, function (e, t) {
        F(0, i, a, t), t.PARENT_COL_INDEX || l.push(t)
      })
    }), function (e) {
      layui.each(e || l, function (e, t) {
        if (t.CHILD_COLS) return n(t.CHILD_COLS)
        typeof a === 'function' && a(e, t)
      })
    })
    n()
  }, x.checkStatus = function (e) {
    var a = 0; var i = 0; var l = []; var e = x.cache[e] || []
    return layui.each(e, function (e, t) {
      layui.type(t) === 'array' ? i++ : t[x.config.checkName] && (a++, t[x.config.disabledName] || l.push(x.clearCacheKey(t)))
    }), { data: l, isAll: !!e.length && a === e.length - i }
  }, x.getData = function (e) {
    var a = []; var e = x.cache[e] || []
    return layui.each(e, function (e, t) {
      layui.type(t) !== 'array' && a.push(x.clearCacheKey(t))
    }), a
  }, x.exportFile = function (e, t, a) {
    t = t || x.clearCacheKey(x.cache[e])
    var c; var i; var l; var r; var n = (a = typeof a === 'object' ? a : (n = {}, a && (n.type = a), n)).type || 'csv'
    var d = p.that[e]; var o = p.config[e] || {}; var s = { csv: 'text/csv', xls: 'application/vnd.ms-excel' }[n]
    var u = document.createElement('a')
    if (h.ie) return f.error('IE_NOT_SUPPORT_EXPORTS')
    u.href = 'data:' + s + ';charset=utf-8,\ufeff' + encodeURIComponent((c = [], i = [], l = [], r = {}, layui.each(t, function (l, n) {
      var o = []
      typeof e === 'object' ? (layui.each(e, function (e, t) {
        l == 0 && c.push(t || '')
      }), layui.each(x.clearCacheKey(n), function (e, t) {
        o.push('"' + (t || '') + '"')
      })) : x.eachCols(e, function (e, t) {
        var a, i
        t.field && t.type == 'normal' && (t.hide ? l == 0 && (r[t.field] = !0) : (a = n[t.field], i = d.layBody.find('tr[data-index="' + l + '"]>td'), a !== undefined && a !== null || (a = ''), l == 0 && c.push(t.title || ''), o.push('"' + k.call(d, {
          item3: t,
          content: a,
          tplData: n,
          text: 'text',
          obj: d.commonMember.call(i.eq(0), {
            td: function (e) {
              return i.filter('[data-field="' + e + '"]')
            }
          })
        }) + '"')))
      }), i.push(o.join(','))
    }), d && layui.each(d.dataTotal, function (e, t) {
      r[e] || l.push(t)
    }), c.join(',') + '\r\n' + i.join('\r\n') + '\r\n' + l.join(','))), u.download = (a.title || o.title || 'table_' + (o.index || '')) + '.' + n, document.body.appendChild(u), u.click(), document.body.removeChild(u)
  }, x.resize = function (e) {
    e ? l(e) && p.that[e].resize() : layui.each(p.that, function () {
      this.resize()
    })
  }, x.reload = function (e, t, a, i) {
    if (l(e)) return e = p.that[e], e.reload(t, a, i), p.call(e)
  }, x.reloadData = function () {
    var a = m.extend([], arguments)
    var i = (a[3] = 'reloadData', new RegExp('^(' + ['data', 'url', 'method', 'contentType', 'dataType', 'jsonpCallback', 'headers', 'where', 'page', 'limit', 'request', 'response', 'parseData', 'scrollPos'].join('|') + ')$'))
    return layui.each(a[1], function (e, t) {
      i.test(e) || delete a[1][e]
    }), x.reload.apply(null, a)
  }, x.render = function (e) {
    e = new i(e)
    return p.call(e)
  }, x.clearCacheKey = function (e) {
    return delete (e = m.extend({}, e))[x.config.checkName], delete e[x.config.indexName], delete e[x.config.disabledName], e
  }, m(function () {
    x.init()
  }), e(C, x)
})
layui.define('form', function (e) {
  'use strict'
  var u = layui.$; var i = layui.form; var p = layui.layer; var n = 'tree'; var a = {
    config: {},
    index: layui[n] ? layui[n].index + 1e4 : 0,
    set: function (e) {
      var i = this
      return i.config = u.extend({}, i.config, e), i
    },
    on: function (e, i) {
      return layui.onevent.call(this, n, e, i)
    }
  }; var t = function () {
    var i = this; var e = i.config; var n = e.id || i.index
    return t.that[n] = i, {
      config: t.config[n] = e,
      reload: function (e) {
        i.reload.call(i, e)
      },
      getChecked: function () {
        return i.getChecked.call(i)
      },
      setChecked: function (e) {
        return i.setChecked.call(i, e)
      }
    }
  }; var y = 'layui-hide'; var d = 'layui-disabled'; var f = 'layui-tree-set'; var C = 'layui-tree-iconClick'
  var k = 'layui-icon-addition'; var v = 'layui-icon-subtraction'; var m = 'layui-tree-entry'; var x = 'layui-tree-main'
  var b = 'layui-tree-txt'; var g = 'layui-tree-pack'; var w = 'layui-tree-spread'; var N = 'layui-tree-setLineShort'
  var T = 'layui-tree-showLine'; var L = 'layui-tree-lineExtend'; var l = function (e) {
    var i = this
    i.index = ++a.index, i.config = u.extend({}, i.config, a.config, e), i.render()
  }
  l.prototype.config = {
    data: [],
    showCheckbox: !1,
    showLine: !0,
    accordion: !1,
    onlyIconControl: !1,
    isJump: !1,
    edit: !1,
    text: { defaultNodeName: '\u672a\u547d\u540d', none: '\u65e0\u6570\u636e' }
  }, l.prototype.reload = function (e) {
    var n = this
    layui.each(e, function (e, i) {
      layui.type(i) === 'array' && delete n.config[e]
    }), n.config = u.extend(!0, {}, n.config, e), n.render()
  }, l.prototype.render = function () {
    var e = this; var i = e.config
    var n = (e.checkids = [], u('<div class="layui-tree' + (i.showCheckbox ? ' layui-form' : '') + (i.showLine ? ' layui-tree-line' : '') + '" lay-filter="LAY-tree-' + e.index + '"></div>'))
    var a = (e.tree(n), i.elem = u(i.elem))
    if (a[0]) {
      if (e.key = i.id || e.index, e.elem = n, e.elemNone = u('<div class="layui-tree-emptyText">' + i.text.none + '</div>'), a.html(e.elem), e.elem.find('.layui-tree-set').length == 0) return e.elem.append(e.elemNone)
      i.showCheckbox && e.renderForm('checkbox'), e.elem.find('.layui-tree-set').each(function () {
        var e = u(this)
        e.parent('.layui-tree-pack')[0] || e.addClass('layui-tree-setHide'), !e.next()[0] && e.parents('.layui-tree-pack').eq(1).hasClass('layui-tree-lineExtend') && e.addClass(N), e.next()[0] || e.parents('.layui-tree-set').eq(0).next()[0] || e.addClass(N)
      }), e.events()
    }
  }, l.prototype.renderForm = function (e) {
    i.render(e, 'LAY-tree-' + this.index)
  }, l.prototype.tree = function (l, e) {
    var r = this; var c = r.config; var e = e || c.data
    layui.each(e, function (e, i) {
      var n = i.children && i.children.length > 0
      var a = u('<div class="layui-tree-pack" ' + (i.spread ? 'style="display: block;"' : '') + '></div>')
      var t = u(['<div data-id="' + i.id + '" class="layui-tree-set' + (i.spread ? ' layui-tree-spread' : '') + (i.checked ? ' layui-tree-checkedFirst' : '') + '">', '<div class="layui-tree-entry">', '<div class="layui-tree-main">', c.showLine ? n ? '<span class="layui-tree-iconClick layui-tree-icon"><i class="layui-icon ' + (i.spread ? 'layui-icon-subtraction' : 'layui-icon-addition') + '"></i></span>' : '<span class="layui-tree-iconClick"><i class="layui-icon layui-icon-file"></i></span>' : '<span class="layui-tree-iconClick"><i class="layui-tree-iconArrow ' + (n ? '' : y) + '"></i></span>', c.showCheckbox ? '<input type="checkbox" name="' + (i.field || 'layuiTreeCheck_' + i.id) + '" same="layuiTreeCheck" lay-skin="primary" ' + (i.disabled ? 'disabled' : '') + ' value="' + i.id + '">' : '', c.isJump && i.href ? '<a href="' + i.href + '" target="_blank" class="' + b + '">' + (i.title || i.label || c.text.defaultNodeName) + '</a>' : '<span class="' + b + (i.disabled ? ' ' + d : '') + '">' + (i.title || i.label || c.text.defaultNodeName) + '</span>', '</div>', (function () {
        if (!c.edit) return ''
        var n = {
          add: '<i class="layui-icon layui-icon-add-1"  data-type="add"></i>',
          update: '<i class="layui-icon layui-icon-edit" data-type="update"></i>',
          del: '<i class="layui-icon layui-icon-delete" data-type="del"></i>'
        }; var a = ['<div class="layui-btn-group layui-tree-btnGroup">']
        return !0 === c.edit && (c.edit = ['update', 'del']), typeof c.edit === 'object' ? (layui.each(c.edit, function (e, i) {
          a.push(n[i] || '')
        }), a.join('') + '</div>') : void 0
      }()), '</div></div>'].join(''))
      n && (t.append(a), r.tree(a, i.children)), l.append(t), t.prev('.' + f)[0] && t.prev().children('.layui-tree-pack').addClass('layui-tree-showLine'), n || t.parent('.layui-tree-pack').addClass('layui-tree-lineExtend'), r.spread(t, i), c.showCheckbox && (i.checked && r.checkids.push(i.id), r.checkClick(t, i)), c.edit && r.operate(t, i)
    })
  }, l.prototype.spread = function (a, e) {
    var t = this.config; var i = a.children('.' + m); var n = i.children('.' + x); var l = i.find('.' + C); var i = i.find('.' + b)
    var r = t.onlyIconControl ? l : n; var c = ''
    r.on('click', function (e) {
      var i = a.children('.' + g)
      var n = (r.children('.layui-icon')[0] ? r : r.find('.layui-tree-icon')).children('.layui-icon')
      i[0] ? a.hasClass(w) ? (a.removeClass(w), i.slideUp(200), n.removeClass(v).addClass(k)) : (a.addClass(w), i.slideDown(200), n.addClass(v).removeClass(k), t.accordion && ((i = a.siblings('.' + f)).removeClass(w), i.children('.' + g).slideUp(200), i.find('.layui-tree-icon').children('.layui-icon').removeClass(v).addClass(k))) : c = 'normal'
    }), i.on('click', function () {
      u(this).hasClass(d) || (c = a.hasClass(w) ? t.onlyIconControl ? 'open' : 'close' : t.onlyIconControl ? 'close' : 'open', t.click && t.click({
        elem: a,
        state: c,
        data: e
      }))
    })
  }, l.prototype.setCheckbox = function (e, i, n) {
    this.config
    var t; var l = n.prop('checked')
    n.prop('disabled') || (typeof i.children !== 'object' && !e.find('.' + g)[0] || e.find('.' + g).find('input[same="layuiTreeCheck"]').each(function () {
      this.disabled || (this.checked = l)
    }), (t = function (e) {
      var i, n, a
      e.parents('.' + f)[0] && (n = (e = e.parent('.' + g)).parent(), a = e.prev().find('input[same="layuiTreeCheck"]'), l ? a.prop('checked', l) : (e.find('input[same="layuiTreeCheck"]').each(function () {
        this.checked && (i = !0)
      }), i || a.prop('checked', !1)), t(n))
    })(e), this.renderForm('checkbox'))
  }, l.prototype.checkClick = function (n, a) {
    var t = this; var l = t.config
    n.children('.' + m).children('.' + x).on('click', 'input[same="layuiTreeCheck"]+', function (e) {
      layui.stope(e)
      var e = u(this).prev(); var i = e.prop('checked')
      e.prop('disabled') || (t.setCheckbox(n, a, e), l.oncheck && l.oncheck({ elem: n, checked: i, data: a }))
    })
  }, l.prototype.operate = function (c, d) {
    var s = this; var o = s.config; var e = c.children('.' + m); var h = e.children('.' + x)
    e.children('.layui-tree-btnGroup').on('click', '.layui-icon', function (e) {
      layui.stope(e)
      var i; var e = u(this).data('type'); var a = c.children('.' + g); var t = { data: d, type: e, elem: c }
      if (e == 'add') {
        a[0] || (o.showLine ? (h.find('.' + C).addClass('layui-tree-icon'), h.find('.' + C).children('.layui-icon').addClass(k).removeClass('layui-icon-file')) : h.find('.layui-tree-iconArrow').removeClass(y), c.append('<div class="layui-tree-pack"></div>'))
        var n; var l = o.operate && o.operate(t); var r = {}
        if (r.title = o.text.defaultNodeName, r.id = l, s.tree(c.children('.' + g), [r]), o.showLine && (a[0] ? (a.hasClass(L) || a.addClass(L), c.find('.' + g).each(function () {
          u(this).children('.' + f).last().addClass(N)
        }), (a.children('.' + f).last().prev().hasClass(N) ? a.children('.' + f).last().prev() : a.children('.' + f).last()).removeClass(N), !c.parent('.' + g)[0] && c.next()[0] && a.children('.' + f).last().removeClass(N)) : (l = c.siblings('.' + f), n = 1, r = c.parent('.' + g), layui.each(l, function (e, i) {
          u(i).children('.' + g)[0] || (n = 0)
        }), n == 1 ? (l.children('.' + g).addClass(T), l.children('.' + g).children('.' + f).removeClass(N), c.children('.' + g).addClass(T), r.removeClass(L), r.children('.' + f).last().children('.' + g).children('.' + f).last().addClass(N)) : c.children('.' + g).children('.' + f).addClass(N))), !o.showCheckbox) return
        h.find('input[same="layuiTreeCheck"]')[0].checked && (c.children('.' + g).children('.' + f).last().find('input[same="layuiTreeCheck"]')[0].checked = !0), s.renderForm('checkbox')
      } else {
        e == 'update' ? (l = h.children('.' + b).html(), h.children('.' + b).html(''), h.append('<input type="text" class="layui-tree-editInput">'), h.children('.layui-tree-editInput').val(l).focus(), i = function (e) {
          var i = (i = e.val().trim()) || o.text.defaultNodeName
          e.remove(), h.children('.' + b).html(i), t.data.title = i, o.operate && o.operate(t)
        }, h.children('.layui-tree-editInput').blur(function () {
          i(u(this))
        }), h.children('.layui-tree-editInput').on('keydown', function (e) {
          e.keyCode === 13 && (e.preventDefault(), i(u(this)))
        })) : p.confirm('\u786e\u8ba4\u5220\u9664\u8be5\u8282\u70b9 "<span style="color: #999;">' + (d.title || '') + '</span>" \u5417\uff1f', function (e) {
          if (o.operate && o.operate(t), t.status = 'remove', p.close(e), !c.prev('.' + f)[0] && !c.next('.' + f)[0] && !c.parent('.' + g)[0]) return c.remove(), void s.elem.append(s.elemNone)
          var l, n, i
          c.siblings('.' + f).children('.' + m)[0] ? (o.showCheckbox && (l = function (e) {
            var i, n, a, t
            e.parents('.' + f)[0] && (i = e.siblings('.' + f).children('.' + m), n = (e = e.parent('.' + g).prev()).find('input[same="layuiTreeCheck"]')[0], a = 1, (t = 0) == n.checked && (i.each(function (e, i) {
              i = u(i).find('input[same="layuiTreeCheck"]')[0]
              i.checked != 0 || i.disabled || (a = 0), i.disabled || (t = 1)
            }), a == 1 && t == 1 && (n.checked = !0, s.renderForm('checkbox'), l(e.parent('.' + f)))))
          })(c), o.showLine && (e = c.siblings('.' + f), n = 1, i = c.parent('.' + g), layui.each(e, function (e, i) {
            u(i).children('.' + g)[0] || (n = 0)
          }), n == 1 ? (a[0] || (i.removeClass(L), e.children('.' + g).addClass(T), e.children('.' + g).children('.' + f).removeClass(N)), (c.next()[0] ? i.children('.' + f).last() : c.prev()).children('.' + g).children('.' + f).last().addClass(N), c.next()[0] || c.parents('.' + f)[1] || c.parents('.' + f).eq(0).next()[0] || c.prev('.' + f).addClass(N)) : !c.next()[0] && c.hasClass(N) && c.prev().addClass(N))) : (e = c.parent('.' + g).prev(), o.showLine ? (e.find('.' + C).removeClass('layui-tree-icon'), e.find('.' + C).children('.layui-icon').removeClass(v).addClass('layui-icon-file'), (i = e.parents('.' + g).eq(0)).addClass(L), i.children('.' + f).each(function () {
            u(this).children('.' + g).children('.' + f).last().addClass(N)
          })) : e.find('.layui-tree-iconArrow').addClass(y), c.parents('.' + f).eq(0).removeClass(w), c.parent('.' + g).remove()), c.remove()
        })
      }
    })
  }, l.prototype.events = function () {
    var i = this; var t = i.config
    i.elem.find('.layui-tree-checkedFirst')
    i.setChecked(i.checkids), i.elem.find('.layui-tree-search').on('keyup', function () {
      var e = u(this); var n = e.val(); var e = e.nextAll(); var a = []
      e.find('.' + b).each(function () {
        var i; var e = u(this).parents('.' + m)
        u(this).html().indexOf(n) != -1 && (a.push(u(this).parent()), (i = function (e) {
          e.addClass('layui-tree-searchShow'), e.parent('.' + g)[0] && i(e.parent('.' + g).parent('.' + f))
        })(e.parent('.' + f)))
      }), e.find('.' + m).each(function () {
        var e = u(this).parent('.' + f)
        e.hasClass('layui-tree-searchShow') || e.addClass(y)
      }), e.find('.layui-tree-searchShow').length == 0 && i.elem.append(i.elemNone), t.onsearch && t.onsearch({ elem: a })
    }), i.elem.find('.layui-tree-search').on('keydown', function () {
      u(this).nextAll().find('.' + m).each(function () {
        u(this).parent('.' + f).removeClass('layui-tree-searchShow ' + y)
      }), u('.layui-tree-emptyText')[0] && u('.layui-tree-emptyText').remove()
    })
  }, l.prototype.getChecked = function () {
    var e = this.config; var i = []; var n = []; var t = (this.elem.find('.layui-form-checked').each(function () {
      i.push(u(this).prev()[0].value)
    }), function (e, a) {
      layui.each(e, function (e, n) {
        layui.each(i, function (e, i) {
          if (n.id == i) return delete (i = u.extend({}, n)).children, a.push(i), n.children && (i.children = [], t(n.children, i.children)), !0
        })
      })
    })
    return t(u.extend({}, e.data), n), n
  }, l.prototype.setChecked = function (l) {
    this.config
    this.elem.find('.' + f).each(function (e, i) {
      var n = u(this).data('id'); var a = u(i).children('.' + m).find('input[same="layuiTreeCheck"]'); var t = a.next()
      if (typeof l === 'number') {
        if (n == l) return a[0].checked || t.click(), !1
      } else {
        typeof l === 'object' && layui.each(l, function (e, i) {
          if (i == n && !a[0].checked) return t.click(), !0
        })
      }
    })
  }, t.that = {}, t.config = {}, a.reload = function (e, i) {
    e = t.that[e]
    return e.reload(i), t.call(e)
  }, a.getChecked = function (e) {
    return t.that[e].getChecked()
  }, a.setChecked = function (e, i) {
    return t.that[e].setChecked(i)
  }, a.render = function (e) {
    e = new l(e)
    return t.call(e)
  }, e(n, a)
})
layui.define(['laytpl', 'form'], function (e) {
  'use strict'
  var s = layui.$; var n = layui.laytpl; var t = layui.form; var a = 'transfer'; var i = {
    config: {},
    index: layui[a] ? layui[a].index + 1e4 : 0,
    set: function (e) {
      var t = this
      return t.config = s.extend({}, t.config, e), t
    },
    on: function (e, t) {
      return layui.onevent.call(this, a, e, t)
    }
  }; var l = function () {
    var t = this; var e = t.config; var a = e.id || t.index
    return l.that[a] = t, {
      config: l.config[a] = e,
      reload: function (e) {
        t.reload.call(t, e)
      },
      getData: function () {
        return t.getData.call(t)
      }
    }
  }; var d = 'layui-hide'; var h = 'layui-btn-disabled'; var r = 'layui-none'; var c = 'layui-transfer-box'
  var u = 'layui-transfer-header'; var o = 'layui-transfer-search'; var f = 'layui-transfer-data'; var y = function (e) {
    return ['<div class="layui-transfer-box" data-index="' + (e = e || {}).index + '">', '<div class="layui-transfer-header">', '<input type="checkbox" name="' + e.checkAllName + '" lay-filter="layTransferCheckbox" lay-type="all" lay-skin="primary" title="{{ d.data.title[' + e.index + "] || 'list" + (e.index + 1) + "' }}\">", '</div>', '{{# if(d.data.showSearch){ }}', '<div class="layui-transfer-search">', '<i class="layui-icon layui-icon-search"></i>', '<input type="input" class="layui-input" placeholder="\u5173\u952e\u8bcd\u641c\u7d22">', '</div>', '{{# } }}', '<ul class="layui-transfer-data"></ul>', '</div>'].join('')
  }; var p = ['<div class="layui-transfer layui-form layui-border-box" lay-filter="LAY-transfer-{{ d.index }}">', y({
    index: 0,
    checkAllName: 'layTransferLeftCheckAll'
  }), '<div class="layui-transfer-active">', '<button type="button" class="layui-btn layui-btn-sm layui-btn-primary layui-btn-disabled" data-index="0">', '<i class="layui-icon layui-icon-next"></i>', '</button>', '<button type="button" class="layui-btn layui-btn-sm layui-btn-primary layui-btn-disabled" data-index="1">', '<i class="layui-icon layui-icon-prev"></i>', '</button>', '</div>', y({
    index: 1,
    checkAllName: 'layTransferRightCheckAll'
  }), '</div>'].join(''); var v = function (e) {
    var t = this
    t.index = ++i.index, t.config = s.extend({}, t.config, i.config, e), t.render()
  }
  v.prototype.config = {
    title: ['\u5217\u8868\u4e00', '\u5217\u8868\u4e8c'],
    width: 200,
    height: 360,
    data: [],
    value: [],
    showSearch: !1,
    id: '',
    text: { none: '\u65e0\u6570\u636e', searchNone: '\u65e0\u5339\u914d\u6570\u636e' }
  }, v.prototype.reload = function (e) {
    var t = this
    t.config = s.extend({}, t.config, e), t.render()
  }, v.prototype.render = function () {
    var e = this; var t = e.config; var a = e.elem = s(n(p).render({ data: t, index: e.index })); var i = t.elem = s(t.elem)
    i[0] && (t.data = t.data || [], t.value = t.value || [], e.key = t.id || e.index, i.html(e.elem), e.layBox = e.elem.find('.' + c), e.layHeader = e.elem.find('.' + u), e.laySearch = e.elem.find('.' + o), e.layData = a.find('.' + f), e.layBtn = a.find('.layui-transfer-active .layui-btn'), e.layBox.css({
      width: t.width,
      height: t.height
    }), e.layData.css({ height: (i = t.height - e.layHeader.outerHeight(), t.showSearch && (i -= e.laySearch.outerHeight()), i - 2) }), e.renderData(), e.events())
  }, v.prototype.renderData = function () {
    var e = this; var i = (e.config, [{ checkName: 'layTransferLeftCheck', views: [] }, {
      checkName: 'layTransferRightCheck',
      views: []
    }])
    e.parseData(function (e) {
      var t = e.selected ? 1 : 0
      var a = ['<li>', '<input type="checkbox" name="' + i[t].checkName + '" lay-skin="primary" lay-filter="layTransferCheckbox" title="' + e.title + '"' + (e.disabled ? ' disabled' : '') + (e.checked ? ' checked' : '') + ' value="' + e.value + '">', '</li>'].join('')
      i[t].views.push(a), delete e.selected
    }), e.layData.eq(0).html(i[0].views.join('')), e.layData.eq(1).html(i[1].views.join('')), e.renderCheckBtn()
  }, v.prototype.renderForm = function (e) {
    t.render(e, 'LAY-transfer-' + this.index)
  }, v.prototype.renderCheckBtn = function (r) {
    var c = this; var o = c.config
    r = r || {}, c.layBox.each(function (e) {
      var t = s(this); var a = t.find('.' + f); var t = t.find('.' + u).find('input[type="checkbox"]')
      var i = a.find('input[type="checkbox"]'); var n = 0; var l = !1
      i.each(function () {
        var e = s(this).data('hide');
        (this.checked || this.disabled || e) && n++, this.checked && !e && (l = !0)
      }), t.prop('checked', l && n === i.length), c.layBtn.eq(e)[l ? 'removeClass' : 'addClass'](h), r.stopNone || (i = a.children('li:not(.' + d + ')').length, c.noneView(a, i ? '' : o.text.none))
    }), c.renderForm('checkbox')
  }, v.prototype.noneView = function (e, t) {
    var a = s('<p class="layui-none">' + (t || '') + '</p>')
    e.find('.' + r)[0] && e.find('.' + r).remove(), t.replace(/\s/g, '') && e.append(a)
  }, v.prototype.setValue = function () {
    var e = this.config; var t = []
    return this.layBox.eq(1).find('.' + f + ' input[type="checkbox"]').each(function () {
      s(this).data('hide') || t.push(this.value)
    }), e.value = t, this
  }, v.prototype.parseData = function (t) {
    var i = this.config; var n = []
    return layui.each(i.data, function (e, a) {
      a = (typeof i.parseData === 'function' ? i.parseData(a) : a) || a, n.push(a = s.extend({}, a)), layui.each(i.value, function (e, t) {
        t == a.value && (a.selected = !0)
      }), t && t(a)
    }), i.data = n, this
  }, v.prototype.getData = function (e) {
    var t = this.config; var i = []
    return this.setValue(), layui.each(e || t.value, function (e, a) {
      layui.each(t.data, function (e, t) {
        delete t.selected, a == t.value && i.push(t)
      })
    }), i
  }, v.prototype.transfer = function (e, t) {
    var a; var i = this; var n = i.config; var l = i.layBox.eq(e); var r = []
    var t = (t ? ((a = (t = t).find('input[type="checkbox"]'))[0].checked = !1, l.siblings('.' + c).find('.' + f).append(t.clone()), t.remove(), r.push(a[0].value), i.setValue()) : l.each(function (e) {
      s(this).find('.' + f).children('li').each(function () {
        var e = s(this); var t = e.find('input[type="checkbox"]'); var a = t.data('hide')
        t[0].checked && !a && (t[0].checked = !1, l.siblings('.' + c).find('.' + f).append(e.clone()), e.remove(), r.push(t[0].value)), i.setValue()
      })
    }), i.renderCheckBtn(), l.siblings('.' + c).find('.' + o + ' input'))
    t.val() !== '' && t.trigger('keyup'), n.onchange && n.onchange(i.getData(r), e)
  }, v.prototype.events = function () {
    var n = this; var l = n.config
    n.elem.on('click', 'input[lay-filter="layTransferCheckbox"]+', function () {
      var e = s(this).prev(); var t = e[0].checked; var a = e.parents('.' + c).eq(0).find('.' + f)
      e[0].disabled || (e.attr('lay-type') === 'all' && a.find('input[type="checkbox"]').each(function () {
        this.disabled || (this.checked = t)
      }), setTimeout(function () {
        n.renderCheckBtn({ stopNone: !0 })
      }, 0))
    }), n.elem.on('dblclick', '.' + f + '>li', function (e) {
      var t = s(this); var a = t.children('input[type="checkbox"]'); var i = t.parent().parent()
      a[0].disabled || n.transfer(i.data('index'), t)
    }), n.layBtn.on('click', function () {
      var e = s(this); var t = e.data('index')
      e.hasClass(h) || n.transfer(t)
    }), n.laySearch.find('input').on('keyup', function () {
      var i = this.value; var e = s(this).parents('.' + o).eq(0).siblings('.' + f); var t = e.children('li')
      var t = (t.each(function () {
        var e = s(this); var t = e.find('input[type="checkbox"]'); var a = t[0].title
        var a = (l.showSearch !== 'cs' && (a = a.toLowerCase(), i = i.toLowerCase()), a.indexOf(i) !== -1)
        e[a ? 'removeClass' : 'addClass'](d), t.data('hide', !a)
      }), n.renderCheckBtn(), t.length === e.children('li.' + d).length)
      n.noneView(e, t ? l.text.searchNone : '')
    })
  }, l.that = {}, l.config = {}, i.reload = function (e, t) {
    e = l.that[e]
    return e.reload(t), l.call(e)
  }, i.getData = function (e) {
    return l.that[e].getData()
  }, i.render = function (e) {
    e = new v(e)
    return l.call(e)
  }, e(a, i)
})
layui.define('jquery', function (e) {
  'use strict'
  var a = layui.$; var n = (layui.hint(), layui.device(), {
    config: {},
    set: function (e) {
      var i = this
      return i.config = a.extend({}, i.config, e), i
    },
    on: function (e, i) {
      return layui.onevent.call(this, d, e, i)
    }
  }); var d = 'carousel'; var r = 'layui-this'; var s = 'layui-carousel-left'; var u = 'layui-carousel-right'
  var c = 'layui-carousel-prev'; var m = 'layui-carousel-next'; var t = 'layui-carousel-arrow'; var l = 'layui-carousel-ind'
  var i = function (e) {
    var i = this
    i.config = a.extend({}, i.config, n.config, e), i.render()
  }
  i.prototype.config = {
    width: '600px',
    height: '280px',
    full: !1,
    arrow: 'hover',
    indicator: 'inside',
    autoplay: !0,
    interval: 3e3,
    anim: '',
    trigger: 'click',
    index: 0
  }, i.prototype.render = function () {
    var e = this; var i = e.config
    i.elem = a(i.elem), i.elem[0] && (e.elemItem = i.elem.find('>*[carousel-item]>*'), i.index < 0 && (i.index = 0), i.index >= e.elemItem.length && (i.index = e.elemItem.length - 1), i.interval < 800 && (i.interval = 800), i.full ? i.elem.css({
      position: 'fixed',
      width: '100%',
      height: '100%',
      zIndex: 9999
    }) : i.elem.css({
      width: i.width,
      height: i.height
    }), i.elem.attr('lay-anim', i.anim), e.elemItem.eq(i.index).addClass(r), e.elemItem.length <= 1 || (e.indicator(), e.arrow(), e.autoplay(), e.events()))
  }, i.prototype.reload = function (e) {
    var i = this
    clearInterval(i.timer), i.config = a.extend({}, i.config, e), i.render()
  }, i.prototype.prevIndex = function () {
    var e = this.config.index - 1
    return e = e < 0 ? this.elemItem.length - 1 : e
  }, i.prototype.nextIndex = function () {
    var e = this.config.index + 1
    return e = e >= this.elemItem.length ? 0 : e
  }, i.prototype.addIndex = function (e) {
    var i = this.config
    i.index = i.index + (e = e || 1), i.index >= this.elemItem.length && (i.index = 0)
  }, i.prototype.subIndex = function (e) {
    var i = this.config
    i.index = i.index - (e = e || 1), i.index < 0 && (i.index = this.elemItem.length - 1)
  }, i.prototype.autoplay = function () {
    var e = this; var i = e.config
    i.autoplay && (clearInterval(e.timer), e.timer = setInterval(function () {
      e.slide()
    }, i.interval))
  }, i.prototype.arrow = function () {
    var i = this; var e = i.config
    var n = a(['<button class="layui-icon ' + t + '" lay-type="sub">' + (e.anim === 'updown' ? '&#xe619;' : '&#xe603;') + '</button>', '<button class="layui-icon ' + t + '" lay-type="add">' + (e.anim === 'updown' ? '&#xe61a;' : '&#xe602;') + '</button>'].join(''))
    e.elem.attr('lay-arrow', e.arrow), e.elem.find('.' + t)[0] && e.elem.find('.' + t).remove(), e.elem.append(n), n.on('click', function () {
      var e = a(this).attr('lay-type')
      i.slide(e)
    })
  }, i.prototype.indicator = function () {
    var i; var n = this; var t = n.config
    var e = n.elemInd = a(['<div class="' + l + '"><ul>', (i = [], layui.each(n.elemItem, function (e) {
      i.push('<li' + (t.index === e ? ' class="layui-this"' : '') + '></li>')
    }), i.join('')), '</ul></div>'].join(''))
    t.elem.attr('lay-indicator', t.indicator), t.elem.find('.' + l)[0] && t.elem.find('.' + l).remove(), t.elem.append(e), t.anim === 'updown' && e.css('margin-top', -e.height() / 2), e.find('li').on(t.trigger === 'hover' ? 'mouseover' : t.trigger, function () {
      var e = a(this).index()
      e > t.index ? n.slide('add', e - t.index) : e < t.index && n.slide('sub', t.index - e)
    })
  }, i.prototype.slide = function (e, i) {
    var n = this; var t = n.elemItem; var a = n.config; var l = a.index; var o = a.elem.attr('lay-filter')
    n.haveSlide || (e === 'sub' ? (n.subIndex(i), t.eq(a.index).addClass(c), setTimeout(function () {
      t.eq(l).addClass(u), t.eq(a.index).addClass(u)
    }, 50)) : (n.addIndex(i), t.eq(a.index).addClass(m), setTimeout(function () {
      t.eq(l).addClass(s), t.eq(a.index).addClass(s)
    }, 50)), setTimeout(function () {
      t.removeClass(r + ' ' + c + ' ' + m + ' ' + s + ' ' + u), t.eq(a.index).addClass(r), n.haveSlide = !1
    }, 300), n.elemInd.find('li').eq(a.index).addClass(r).siblings().removeClass(r), n.haveSlide = !0, e = {
      index: a.index,
      prevIndex: l,
      item: t.eq(a.index)
    }, typeof a.change === 'function' && a.change(e), layui.event.call(this, d, 'change(' + o + ')', e))
  }, i.prototype.events = function () {
    var e = this; var i = e.config
    i.elem.data('haveEvents') || (i.elem.on('mouseenter', function () {
      e.config.autoplay !== 'always' && clearInterval(e.timer)
    }).on('mouseleave', function () {
      e.config.autoplay !== 'always' && e.autoplay()
    }), i.elem.data('haveEvents', !0))
  }, n.render = function (e) {
    return new i(e)
  }, e(d, n)
})
layui.define('jquery', function (e) {
  'use strict'
  var u = layui.jquery; var l = {
    config: {},
    index: layui.rate ? layui.rate.index + 1e4 : 0,
    set: function (e) {
      var a = this
      return a.config = u.extend({}, a.config, e), a
    },
    on: function (e, a) {
      return layui.onevent.call(this, i, e, a)
    }
  }; var i = 'rate'; var c = 'layui-icon-rate'; var r = 'layui-icon-rate-solid'; var o = 'layui-icon-rate-half'
  var s = 'layui-icon-rate-solid layui-icon-rate-half'; var f = 'layui-icon-rate layui-icon-rate-half'; var a = function (e) {
    var a = this
    a.index = ++l.index, a.config = u.extend({}, a.config, l.config, e), a.render()
  }
  a.prototype.config = {
    length: 5,
    text: !1,
    readonly: !1,
    half: !1,
    value: 0,
    theme: ''
  }, a.prototype.render = function () {
    for (var e = this, a = e.config, l = a.theme ? 'style="color: ' + a.theme + ';"' : '', i = (a.elem = u(a.elem), a.value > a.length && (a.value = a.length), parseInt(a.value) === a.value || a.half || (a.value = Math.ceil(a.value) - a.value < 0.5 ? Math.ceil(a.value) : Math.floor(a.value)), '<ul class="layui-rate" ' + (a.readonly ? 'readonly' : '') + '>'), n = 1; n <= a.length; n++) {
      var t = '<li class="layui-inline"><i class="layui-icon ' + (n > Math.floor(a.value) ? c : r) + '" ' + l + '></i></li>'
      a.half && parseInt(a.value) !== a.value && n == Math.ceil(a.value) ? i = i + '<li><i class="layui-icon layui-icon-rate-half" ' + l + '></i></li>' : i += t
    }
    i += '</ul>' + (a.text ? '<span class="layui-inline">' + a.value + '\u661f' : '') + '</span>'
    var o = a.elem; var s = o.next('.layui-rate')
    s[0] && s.remove(), e.elemTemp = u(i), a.span = e.elemTemp.next('span'), a.setText && a.setText(a.value), o.html(e.elemTemp), o.addClass('layui-inline'), a.readonly || e.action()
  }, a.prototype.setvalue = function (e) {
    this.config.value = e, this.render()
  }, a.prototype.action = function () {
    var i = this.config; var n = this.elemTemp; var t = n.find('i').width()
    n.children('li').each(function (e) {
      var a = e + 1; var l = u(this)
      l.on('click', function (e) {
        i.value = a, i.half && e.pageX - u(this).offset().left <= t / 2 && (i.value = i.value - 0.5), i.text && n.next('span').text(i.value + '\u661f'), i.choose && i.choose(i.value), i.setText && i.setText(i.value)
      }), l.on('mousemove', function (e) {
        n.find('i').each(function () {
          u(this).addClass(c).removeClass(s)
        }), n.find('i:lt(' + a + ')').each(function () {
          u(this).addClass(r).removeClass(f)
        }), i.half && e.pageX - u(this).offset().left <= t / 2 && l.children('i').addClass(o).removeClass(r)
      }), l.on('mouseleave', function () {
        n.find('i').each(function () {
          u(this).addClass(c).removeClass(s)
        }), n.find('i:lt(' + Math.floor(i.value) + ')').each(function () {
          u(this).addClass(r).removeClass(f)
        }), i.half && parseInt(i.value) !== i.value && n.children('li:eq(' + Math.floor(i.value) + ')').children('i').addClass(o).removeClass('layui-icon-rate-solid layui-icon-rate')
      })
    })
  }, a.prototype.events = function () {
    this.config
  }, l.render = function (e) {
    e = new a(e)
    return (function () {
      var a = this
      return {
        setvalue: function (e) {
          a.setvalue.call(a, e)
        },
        config: a.config
      }
    }.call(e))
  }, e(i, l)
})
layui.define('jquery', function (l) {
  'use strict'
  var g = layui.$; var e = function (l) {
  }
  e.prototype.load = function (l) {
    var t; var i; var n; var e; var r; var o; var a; var c; var m; var s; var u; var f; var y; var d = this; var p = 0; var h = g((l = l || {}).elem)
    if (h[0]) {
      return e = g(l.scrollElem || document), r = l.mb || 50, o = !('isAuto' in l) || l.isAuto, a = l.end || '\u6ca1\u6709\u66f4\u591a\u4e86', c = l.scrollElem && l.scrollElem !== document, m = '<cite>\u52a0\u8f7d\u66f4\u591a</cite>', s = g('<div class="layui-flow-more"><a href="javascript:;">' + m + '</a></div>'), h.find('.layui-flow-more')[0] || h.append(s), u = function (l, e) {
        l = g(l), s.before(l), (e = e == 0 || null) ? s.html(a) : s.find('a').html(m), i = e, t = null, y && y()
      }, f = function () {
        t = !0, s.find('a').html('<i class="layui-anim layui-anim-rotate layui-anim-loop layui-icon ">&#xe63e;</i>'), typeof l.done === 'function' && l.done(++p, u)
      }, f(), s.find('a').on('click', function () {
        g(this)
        i || t || f()
      }), l.isLazyimg && (y = d.lazyimg({
        elem: l.elem + ' img',
        scrollElem: l.scrollElem
      })), o && e.on('scroll', function () {
        var e = g(this); var o = e.scrollTop()
        n && clearTimeout(n), !i && h.width() && (n = setTimeout(function () {
          var l = (c ? e : g(window)).height();
          (c ? e.prop('scrollHeight') : document.documentElement.scrollHeight) - o - l <= r && (t || f())
        }, 100))
      }), d
    }
  }, e.prototype.lazyimg = function (l) {
    var e; var c = this; var m = 0; var s = g((l = l || {}).scrollElem || document); var u = l.elem || 'img'
    var f = l.scrollElem && l.scrollElem !== document; var y = function (e, l) {
      var o; var t = s.scrollTop(); var l = t + l; var i = f ? e.offset().top - s.offset().top + t : e.offset().top
      t <= i && i <= l && e.attr('lay-src') && (o = e.attr('lay-src'), layui.img(o, function () {
        var l = c.lazyimg.elem.eq(m)
        e.attr('src', o).removeAttr('lay-src'), l[0] && n(l), m++
      }, function () {
        c.lazyimg.elem.eq(m)
        e.removeAttr('lay-src')
      }))
    }; var n = function (l, e) {
      var o = (f ? e || s : g(window)).height(); var t = s.scrollTop(); var i = t + o
      if (c.lazyimg.elem = g(u), l) y(l, o); else {
        for (var n = 0; n < c.lazyimg.elem.length; n++) {
          var r = c.lazyimg.elem.eq(n); var a = f ? r.offset().top - s.offset().top + t : r.offset().top
          if (y(r, o), m = n, i < a) break
        }
      }
    }
    return n(), s.on('scroll', function () {
      var l = g(this)
      e && clearTimeout(e), e = setTimeout(function () {
        n(null, l)
      }, 50)
    }), n
  }, l('flow', new e())
})
layui.define(['layer', 'form'], function (t) {
  'use strict'
  var u = layui.$; var c = layui.layer; var a = layui.form; var d = (layui.hint(), layui.device()); var i = 'layedit'
  var y = 'layui-disabled'; var e = function () {
    this.index = 0, this.config = {
      tool: ['strong', 'italic', 'underline', 'del', '|', 'left', 'center', 'right', '|', 'link', 'unlink'],
      hideTool: [],
      height: 280
    }
  }; var f = (e.prototype.set = function (t) {
    return u.extend(!0, this.config, t), this
  }, e.prototype.on = function (t, e) {
    return layui.onevent(i, t, e)
  }, e.prototype.build = function (t, e) {
    e = e || {}
    var i; var l; var a = this; var n = a.config; var o = 'layui-layedit'; var s = u(typeof t === 'string' ? '#' + t : t)
    var r = 'LAY_layedit_' + ++a.index; var c = s.next('.' + o); var n = u.extend({}, n, e)
    var e = (i = [], l = {}, layui.each(n.hideTool, function (t, e) {
      l[e] = !0
    }), layui.each(n.tool, function (t, e) {
      C[e] && !l[e] && i.push(C[e])
    }), i.join(''))
    var o = u(['<div class="' + o + '">', '<div class="layui-unselect layui-layedit-tool">' + e + '</div>', '<div class="layui-layedit-iframe">', '<iframe id="' + r + '" name="' + r + '" textarea="' + t + '" frameborder="0"></iframe>', '</div>', '</div>'].join(''))
    return d.ie && d.ie < 8 ? s.removeClass('layui-hide').addClass('layui-show') : (c[0] && c.remove(), f.call(a, o, s[0], n), s.addClass('layui-hide').after(o), a.index)
  }, e.prototype.getContent = function (t) {
    t = n(t)
    if (t[0]) return l(t[0].document.body.innerHTML)
  }, e.prototype.getText = function (t) {
    t = n(t)
    if (t[0]) return u(t[0].document.body).text()
  }, e.prototype.setContent = function (t, e, i) {
    var l = n(t)
    l[0] && (i ? u(l[0].document.body).append(e) : u(l[0].document.body).html(e), layedit.sync(t))
  }, e.prototype.sync = function (t) {
    t = n(t)
    t[0] && u('#' + t[1].attr('textarea')).val(l(t[0].document.body.innerHTML))
  }, e.prototype.getSelection = function (t) {
    var t = n(t)
    if (t[0]) return t = p(t[0].document), document.selection ? t.text : t.toString()
  }, function (a, n, o) {
    var s = this; var r = a.find('iframe')
    r.css({ height: o.height }).on('load', function () {
      var t = r.contents(); var e = r.prop('contentWindow'); var i = t.find('head')
      // l = u(["<style>", "*{margin: 0; padding: 0;}", "body{padding: 10px; line-height: 20px; overflow-x: hidden; word-wrap: break-word; font: 14px Helvetica Neue,Helvetica,PingFang SC,Microsoft YaHei,Tahoma,Arial,sans-serif; -webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; box-sizing: border-box !important;}", "a{color:#01AAED; text-decoration:none;}a:hover{color:#c00}", "p{margin-bottom: 10px;}", "img{display: inline-block; border: none; vertical-align: middle;}", "pre{margin: 10px 0; padding: 10px; line-height: 20px; border: 1px solid #ddd; border-left-width: 6px; background-color: #F2F2F2; color: #333; font-family: Courier New; font-size: 12px;}", "</style>"].join("")),
      var l = u(['<style>', '*{margin: 0; padding: 0;}', 'body{padding: 10px; line-height: 20px; overflow-x: hidden; word-wrap: break-word;  -webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; box-sizing: border-box !important;}', 'a{color:#01AAED; text-decoration:none;}a:hover{color:#c00}', 'p{margin-bottom: 10px;}', 'img{display: inline-block; border: none; vertical-align: middle;}', 'pre{margin: 10px 0; padding: 10px; line-height: 20px; border: 1px solid #ddd; border-left-width: 6px; background-color: #F2F2F2; color: #333; font-family: Courier New; font-size: 12px;}', '</style>'].join(''))
      var t = t.find('body')
      i.append(l), t.attr('contenteditable', 'true').css({ 'min-height': o.height }).html(n.value || ''), m.apply(s, [e, r, n, o]), g.call(s, e, a, o)
    })
  }); var n = function (t) {
    t = u('#LAY_layedit_' + t)
    return [t.prop('contentWindow'), t]
  }; var l = function (t) {
    return t = d.ie == 8 ? t.replace(/<.+>/g, function (t) {
      return t.toLowerCase()
    }) : t
  }; var m = function (e, t, i, l) {
    var a = e.document; var n = u(a.body)
    n.on('keydown', function (t) {
      if (t.keyCode === 13) {
        var e = p(a)
        if (h(e).parentNode.tagName.toLowerCase() === 'pre') return t.shiftKey ? void 0 : (c.msg('\u8bf7\u6682\u65f6\u7528shift+enter'), !1)
        a.execCommand('formatBlock', !1, '<p>')
      }
    }), u(i).parents('form').on('submit', function () {
      var t = n.html()
      d.ie == 8 && (t = t.replace(/<.+>/g, function (t) {
        return t.toLowerCase()
      })), i.value = t
    }), n.on('paste', function (t) {
      a.execCommand('formatBlock', !1, '<p>'), setTimeout(function () {
        o.call(e, n), i.value = n.html()
      }, 100)
    })
  }; var o = function (t) {
    this.document
    t.find('*[style]').each(function () {
      var t = this.style.textAlign
      this.removeAttribute('style'), u(this).css({ 'text-align': t || '' })
    }), t.find('table').addClass('layui-table'), t.find('script,link').remove()
  }; var p = function (t) {
    return t.selection ? t.selection.createRange() : t.getSelection().getRangeAt(0)
  }; var h = function (t) {
    return t.endContainer || t.parentElement().childNodes[0]
  }; var v = function (t, e, i) {
    var l; var a; var n = this.document; var o = document.createElement(t)
    for (l in e) o.setAttribute(l, e[l])
    o.removeAttribute('text'), n.selection ? (a = i.text || e.text, t === 'a' && !a || (a && (o.innerHTML = a), i.pasteHTML(u(o).prop('outerHTML')), i.select())) : (a = i.toString() || e.text, t === 'a' && !a || (a && (o.innerHTML = a), i.deleteContents(), i.insertNode(o)))
  }; var b = function (e, t) {
    var i = this.document; var l = 'layedit-tool-active'; var i = h(p(i)); var a = function (t) {
      return e.find('.layedit-tool-' + t)
    }
    t && t[t.hasClass(l) ? 'removeClass' : 'addClass'](l), e.find('>i').removeClass(l), a('unlink').addClass(y), u(i).parents().each(function () {
      var t = this.tagName.toLowerCase(); var e = this.style.textAlign
      t !== 'b' && t !== 'strong' || a('b').addClass(l), t !== 'i' && t !== 'em' || a('i').addClass(l), t === 'u' && a('u').addClass(l), t === 'strike' && a('d').addClass(l), t === 'p' && a(e === 'center' ? 'center' : e === 'right' ? 'right' : 'left').addClass(l), t === 'a' && (a('link').addClass(l), a('unlink').removeClass(y))
    })
  }; var g = function (a, t, e) {
    var n = a.document; var o = u(n.body); var s = {
      link: function (i) {
        var t = h(i); var l = u(t).parent()
        x.call(o, { href: l.attr('href'), target: l.attr('target') }, function (t) {
          var e = l[0]
          e.tagName === 'A' ? e.href = t.url : v.call(a, 'a', { target: t.target, href: t.url, text: t.url }, i)
        })
      },
      unlink: function (t) {
        n.execCommand('unlink')
      },
      code: function (e) {
        k.call(o, function (t) {
          v.call(a, 'pre', { text: t.code, 'lay-lang': t.lang }, e)
        })
      },
      help: function () {
        c.open({
          type: 2,
          title: '\u5e2e\u52a9',
          area: ['600px', '380px'],
          shadeClose: !0,
          shade: 0.1,
          skin: 'layui-layer-msg',
          content: ['', 'no']
        })
      }
    }; var r = t.find('.layui-layedit-tool'); var i = function () {
      var t; var e = u(this); var i = e.attr('layedit-event'); var l = e.attr('lay-command')
      e.hasClass(y) || (o.focus(), (t = p(n)).commonAncestorContainer, l ? (n.execCommand(l), /justifyLeft|justifyCenter|justifyRight/.test(l) && n.execCommand('formatBlock', !1, '<p>'), setTimeout(function () {
        o.focus()
      }, 10)) : s[i] && s[i].call(this, t), b.call(a, r, e))
    }; var l = /image/
    r.find('>i').on('mousedown', function () {
      var t = u(this).attr('layedit-event')
      l.test(t) || i.call(this)
    }).on('click', function () {
      var t = u(this).attr('layedit-event')
      l.test(t) && i.call(this)
    }), o.on('click', function () {
      b.call(a, r)
    })
  }; var x = function (t, i) {
    var l = this; var t = c.open({
      type: 1,
      id: 'LAY_layedit_link',
      area: '350px',
      shade: 0.05,
      shadeClose: !0,
      moveType: 1,
      title: '\u8d85\u94fe\u63a5',
      skin: 'layui-layer-msg',
      content: ['<ul class="layui-form" style="margin: 15px;">', '<li class="layui-form-item">', '<label class="layui-form-label" style="width: 60px;">URL</label>', '<div class="layui-input-block" style="margin-left: 90px">', '<input name="url" lay-verify="url" value="' + (t.href || '') + '" autofocus="true" autocomplete="off" class="layui-input">', '</div>', '</li>', '<li class="layui-form-item">', '<label class="layui-form-label" style="width: 60px;">\u6253\u5f00\u65b9\u5f0f</label>', '<div class="layui-input-block" style="margin-left: 90px">', '<input type="radio" name="target" value="_self" class="layui-input" title="\u5f53\u524d\u7a97\u53e3"' + (t.target !== '_self' && t.target ? '' : 'checked') + '>', '<input type="radio" name="target" value="_blank" class="layui-input" title="\u65b0\u7a97\u53e3" ' + (t.target === '_blank' ? 'checked' : '') + '>', '</div>', '</li>', '<li class="layui-form-item" style="text-align: center;">', '<button type="button" lay-submit lay-filter="layedit-link-yes" class="layui-btn"> \u786e\u5b9a </button>', '<button style="margin-left: 20px;" type="button" class="layui-btn layui-btn-primary"> \u53d6\u6d88 </button>', '</li>', '</ul>'].join(''),
      success: function (t, e) {
        a.render('radio'), t.find('.layui-btn-primary').on('click', function () {
          c.close(e), l.focus()
        }), a.on('submit(layedit-link-yes)', function (t) {
          c.close(x.index), i && i(t.field)
        })
      }
    })
    x.index = t
  }; var k = function (i) {
    var l = this; var t = c.open({
      type: 1,
      id: 'LAY_layedit_code',
      area: '550px',
      shade: 0.05,
      shadeClose: !0,
      moveType: 1,
      title: '\u63d2\u5165\u4ee3\u7801',
      skin: 'layui-layer-msg',
      content: ['<ul class="layui-form layui-form-pane" style="margin: 15px;">', '<li class="layui-form-item">', '<label class="layui-form-label">\u8bf7\u9009\u62e9\u8bed\u8a00</label>', '<div class="layui-input-block">', '<select name="lang">', '<option value="JavaScript">JavaScript</option>', '<option value="HTML">HTML</option>', '<option value="CSS">CSS</option>', '<option value="Java">Java</option>', '<option value="PHP">PHP</option>', '<option value="C#">C#</option>', '<option value="Python">Python</option>', '<option value="Ruby">Ruby</option>', '<option value="Go">Go</option>', '</select>', '</div>', '</li>', '<li class="layui-form-item layui-form-text">', '<label class="layui-form-label">\u4ee3\u7801</label>', '<div class="layui-input-block">', '<textarea name="code" lay-verify="required" autofocus="true" class="layui-textarea" style="height: 200px;"></textarea>', '</div>', '</li>', '<li class="layui-form-item" style="text-align: center;">', '<button type="button" lay-submit lay-filter="layedit-code-yes" class="layui-btn"> \u786e\u5b9a </button>', '<button style="margin-left: 20px;" type="button" class="layui-btn layui-btn-primary"> \u53d6\u6d88 </button>', '</li>', '</ul>'].join(''),
      success: function (t, e) {
        a.render('select'), t.find('.layui-btn-primary').on('click', function () {
          c.close(e), l.focus()
        }), a.on('submit(layedit-code-yes)', function (t) {
          c.close(k.index), i && i(t.field)
        })
      }
    })
    k.index = t
  }; var C = {
    html: '<i class="layui-icon layedit-tool-html" title="HTML\u6e90\u4ee3\u7801" lay-command="html" layedit-event="html"">&#xe64b;</i><span class="layedit-tool-mid"></span>',
    strong: '<i class="layui-icon layedit-tool-b" title="\u52a0\u7c97" lay-command="Bold" layedit-event="b"">&#xe62b;</i>',
    italic: '<i class="layui-icon layedit-tool-i" title="\u659c\u4f53" lay-command="italic" layedit-event="i"">&#xe644;</i>',
    underline: '<i class="layui-icon layedit-tool-u" title="\u4e0b\u5212\u7ebf" lay-command="underline" layedit-event="u"">&#xe646;</i>',
    del: '<i class="layui-icon layedit-tool-d" title="\u5220\u9664\u7ebf" lay-command="strikeThrough" layedit-event="d"">&#xe64f;</i>',
    '|': '<span class="layedit-tool-mid"></span>',
    left: '<i class="layui-icon layedit-tool-left" title="\u5de6\u5bf9\u9f50" lay-command="justifyLeft" layedit-event="left"">&#xe649;</i>',
    center: '<i class="layui-icon layedit-tool-center" title="\u5c45\u4e2d\u5bf9\u9f50" lay-command="justifyCenter" layedit-event="center"">&#xe647;</i>',
    right: '<i class="layui-icon layedit-tool-right" title="\u53f3\u5bf9\u9f50" lay-command="justifyRight" layedit-event="right"">&#xe648;</i>',
    link: '<i class="layui-icon layedit-tool-link" title="\u63d2\u5165\u94fe\u63a5" layedit-event="link"">&#xe64c;</i>',
    unlink: '<i class="layui-icon layedit-tool-unlink layui-disabled" title="\u6e05\u9664\u94fe\u63a5" lay-command="unlink" layedit-event="unlink"">&#xe64d;</i>',
    face: '<i class="layui-icon layedit-tool-face" title="\u8868\u60c5" layedit-event="face"">&#xe650;</i>',
    image: '<i class="layui-icon layedit-tool-image" title="\u56fe\u7247" layedit-event="image">&#xe64a;<input type="file" name="file"></i>',
    code: '<i class="layui-icon layedit-tool-code" title="\u63d2\u5165\u4ee3\u7801" layedit-event="code">&#xe64e;</i>',
    help: '<i class="layui-icon layedit-tool-help" title="\u5e2e\u52a9" layedit-event="help">&#xe607;</i>'
  }; var e = new e()
  t(i, e)
})
layui.define(['lay', 'util'], function (e) {
  'use strict'
  var d = layui.$; var o = layui.util; var u = 'layui-code-title'
  var l = { elem: '.layui-code', title: '&lt;/&gt;', about: '', ln: !0 }
  e('code', function (e) {
    var c = e = d.extend({}, l, e)
    e.elem = d(e.elem), e.elem[0] && layui.each(e.elem.get().reverse(), function (e, l) {
      var t; var a = d(l); var i = (i = a.html(), d.trim(i).replace(/^\n|\n$/, ''))
      var l = d.extend({}, c, lay.options(l), (t = {}, layui.each(['title', 'height', 'encode', 'skin', 'about'], function (e, l) {
        var i = a.attr('lay-' + l)
        typeof i === 'string' && (t[l] = i)
      }), t)); var s = l.ln ? 'ol' : 'ul'; var s = d('<' + s + ' class="layui-code-' + s + '">')
      var n = d('<div class="' + u + '">')
      a.addClass('layui-code-view layui-box'), l.skin && (l.skin === 'notepad' && (l.skin = 'dark'), a.addClass('layui-code-' + l.skin)), i = (i = l.encode ? o.escape(i) : i).replace(/[\r\t\n]+/g, '</li><li>'), a.html(s.html('<li>' + i + '</li>')), a.children('.' + u)[0] || (n.html(l.title + (l.about ? '<div class="layui-code-about">' + l.about + '</div>' : '')), a.prepend(n)), (i = Math.floor(s.find('li').length / 100)) > 0 && s.css('margin-left', i + 'px'), l.height && s.css('max-height', l.height)
    })
  })
}).addcss('modules/code.css?v=3', 'skincodecss')
