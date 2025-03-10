! function($, window, document, undefined) {
    "use strict";

    function Plugin(element, options) {
        this.element = element, this.settings = $.extend({}, defaults, options), this._defaults = defaults, this._name = pluginName, this.init()
    }

    function openPopUp(url, title, width, height) {
        var w = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
            h = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
            left = w / 2 - width / 2 + 10,
            top = h / 2 - height / 2 + 50;
        window.open(url, title, "scrollbars=yes, width=" + width + ", height=" + height + ", top=" + top + ", left=" + left).focus()
    }

    function title_case(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
    }

    function shorten(num) {
        return num >= 1e9 ? (num / 1e9).toFixed(1).replace(/\.0$/, "") + "G" : num >= 1e6 ? (num / 1e6).toFixed(1).replace(/\.0$/, "") + "M" : num >= 1e3 ? (num / 1e3).toFixed(1).replace(/\.0$/, "") + "K" : num
    }

    function setMobileCss(objects) {
        var width = getWidth();
        $.each(objects, function() {
            width < 961 ? $(this).css("width", 100 / objects.length + "%") : $(this).removeAttr("style")
        })
    }

    function checkPlacePosition($child, position, element, extraOffset) {
        if (getWidth() > 961 && $.inArray(position, ["content-right", "content-left"]) != -1) {
            var initialOffset = "content-right" === position ? element.offsetWidth : -75;
            $child.css("margin-left", initialOffset + extraOffset)
        } else $child.css("margin-left", 0)
    }

    function getWidth() {
        return window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width
    }

    function appendButtons(count, $component) {
        count && count > 0 && $component.append($("<span>", {
            class: "shareCount"
        }).append(shorten(count))).find("i").removeClass("margin-top-5")
    }

    function issetOrZero(fn) {
        var value;
        try {
            value = fn()
        } catch (e) {
            value = 0
        }
        return value
    }

    function setShareCount(network, url, $component, twitter_counter) {
        switch (network) {
           /* case "facebook":
                $.getJSON("https://graph.facebook.com/?id=" + url + "&callback=?", function(data) {
                    appendButtons(issetOrZero(function() {
                        return data.share.share_count
                    }), $component)
                });
                break;
            case "google-plus":
                $.getJSON("https://share.yandex.ru/gpp.xml?url=" + url + "&callback=?", function(count) {
                    appendButtons(count, $component)
                });
                break;
            case "linkedin":
                $.getJSON("https://www.linkedin.com/countserv/count/share?url=" + url + "&callback=?", function(data) {
                    appendButtons(issetOrZero(function() {
                        return data.count
                    }), $component)
                });
                break;
            case "odnoklassniki":
                $.getJSON("https://connect.ok.ru/dk?st.cmd=extLike&ref=" + url + "&callback=?", function() {}), window.ODKL = window.ODKL || {}, window.ODKL.updateCount = function(index, count) {
                    appendButtons(count, $component)
                };
                break;
            case "pinterest":
                $.getJSON("https://api.pinterest.com/v1/urls/count.json?url=" + url + "&callback=?", function(data) {
                    appendButtons(issetOrZero(function() {
                        return data.count
                    }), $component)
                });
                break;
            case "reddit":
                $.getJSON("https://www.reddit.com/api/info.json?url=" + url + "&jsonp=?", function(response) {
                    appendButtons(issetOrZero(function() {
                        return response.data.children[0].data.score
                    }), $component)
                });
                break;
            case "tumblr":
                $.getJSON("https://api.tumblr.com/v2/share/stats?url=" + url + "&callback=?", function(data) {
                    appendButtons(issetOrZero(function() {
                        return data.response.note_count
                    }), $component)
                });
                break;
            case "twitter":
                1 == twitter_counter && $.getJSON("https://opensharecount.com/count.json?url=" + url + "&callback=?", function(data) {
                    appendButtons(issetOrZero(function() {
                        return data.count
                    }), $component)
                });
                break;
            case "vk":
                $.getJSON("https://vk.com/share.php?act=count&index=1&url=" + url + "&callback=?", function() {}), window.VK = window.VK || {}, window.VK.Share = window.VK.Share || {}, window.VK.Share.count = function(index, count) {
                    appendButtons(count, $component)
                };
                break;*/
            default:
                return -1
        }
    }
    var pluginName = "floatingSocialShare",
        defaults = {
            place: "top-left",
            counter: !0,
            twitter_counter: !1,
            buttons: ["facebook", "twitter", "google-plus"],
            title: document.title,
            url: window.location.href,
            description: $('meta[name="description"]').attr("content") || "",
            media: $('meta[property="og:image"]').attr("content") || "",
            text: {
                default: "share with:"
            },
            text_title_case: !1,
            popup_width: 400,
            popup_height: 300,
            extra_offset: 15
        };
    $.extend(Plugin.prototype, {
        init: function() {
            $.inArray(this.settings.place, places) == -1 && (this.settings.place = this._defaults.place);
            var base = this,
                $template = $("<div>", {
                    id: "floatingSocialShare"
                }),
                $child = $("<div>", {
                    class: this.settings.place
                }).appendTo($template),
                _text_default = base.settings.text.default || base.settings.text;
            $.each(this.settings.buttons, function(index, value) {
                $.each(networks, function(k, v) {
                    if (value === k) {
                        var $icon = $("<i>", {
                                class: "margin-top-5 fa fa-" + value
                            }),
                            _href = v.url.replace("{url}", encodeURIComponent(base.settings.url)).replace("{title}", encodeURIComponent(base.settings.title)).replace("{description}", encodeURIComponent(base.settings.description)).replace("{media}", encodeURIComponent(base.settings.media)),
                            _text_value = base.settings.text[value] || _text_default + value,
                            _text_output = base.settings.text_title_case ? title_case(_text_value) : _text_value,
                            $component = $("<a>", {
                                title: base.settings.title,
                                class: v.className + " pop-upper"
                            }).attr("href", _href).attr("title", _text_output).append($icon);
                        return base.settings.counter === !0 && setShareCount(value, encodeURI(base.settings.url), $component, base.settings.twitter_counter), $child.append($component), !1
                    }
                })
            }), $template.appendTo(this.element);
            var popup = $(this.element).find(".pop-upper");
            popup.on("click", function(event) {
                event.preventDefault(), openPopUp($(this).attr("href"), $(this).attr("title"), base.settings.popup_width, base.settings.popup_height)
            }), setMobileCss(popup), checkPlacePosition($child, base.settings.place, base.element, base.settings.extra_offset), $(window).resize(function() {
                setMobileCss(popup), checkPlacePosition($child, base.settings.place, base.element, base.settings.extra_offset)
            })
        }
    });
    var places = ["content-left", "content-right", "top-left", "top-right"],
        networks = {
            envelope: {
                className: "envelope",
                url: "mailto:user@domain.com?subject={url}"
            },
            facebook: {
                className: "facebook",
                url: "https://www.facebook.com/sharer/sharer.php?u={url}&t={title}"
            },
            "google-plus": {
                className: "google-plus",
                url: "https://plus.google.com/share?url={url}"
            },
            linkedin: {
                className: "linkedin",
                url: "https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}&summary={description}&source="
            },
            odnoklassniki: {
                className: "odnoklassniki",
                url: "https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl={url}"
            },
            pinterest: {
                className: "pinterest",
                url: "https://pinterest.com/pin/create%2Fbutton/?url={url}&description={description}&media={media}"
            },
            reddit: {
                className: "reddit",
                url: "https://www.reddit.com/submit?url={url}&title={title}"
            },
            stumbleupon: {
                className: "stumbleupon",
                url: "https://www.stumbleupon.com/submit?url={url}&title={title}"
            },
            tumblr: {
                className: "tumblr",
                url: "https://www.tumblr.com/share/link?url={url}&name={title}&description={description}"
            },
            twitter: {
                className: "twitter",
                url: "https://twitter.com/home?status={title} {url}"
            },
            vk: {
                className: "vk",
                url: "https://vk.com/share.php?url={url}&title={title}&description={description}"
            },
            whatsapp: {
                className: "whatsapp",
                url: "whatsapp://send?text={url}"
            },
            message: {
                className: "envelope",
                url: "sms:?body={description}"
            },
            user: {
            	className:"user-md",
            	url:"http://eraktkosh.in/BLDAHIMS/bloodbank/nearbyBBRed.cnt"
            },
            tint:{
            	className:"tint",
            	url:"http://eraktkosh.in/BLDAHIMS/bloodbank/portalDonorLogin.cnt"
            }
        };
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            $.data(this, "plugin_" + pluginName) || $.data(this, "plugin_" + pluginName, new Plugin(this, options))
        })
    }
}(jQuery, window, document);