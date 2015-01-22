/**
 * Created by ZTn on 05/01/2015.
 */

var allCategories;
var allGoods;

function setWebServiceUrl(url) {
    localStorage.setItem("web-service-url", url);
}

function getWebServiceUrl() {
    var defaultUrl = "http://localhost:8080/";
    var webServiceUrl = localStorage.getItem("web-service-url");
    if (!webServiceUrl) {
        setWebServiceUrl(defaultUrl);
        webServiceUrl = defaultUrl;
    }
    return webServiceUrl;
}

function setErrorMessage(message) {
    if (message) {
        setErrorMessageTemplate('#error-template', {message: message});
    }
    else {
        $('#messages-container').empty();
    }
}

function setErrorMessageTemplate(template, data) {
    if (template) {
        $('#messages-container').loadTemplate(template, data);
    }
    else {
        $('#messages-container').empty();
    }
}

function initializeApplication() {
    // Initialize UI
    $('#elite-container').loadTemplate('tpl/getting-started.html');
    $('.web-service-url').html('<a href="' + getWebServiceUrl() + '">' + getWebServiceUrl() + '</a>');

    // Default template formatters
    $.addTemplateFormatter({
        integer: function (value, template) {
            if (!value || value == 0) {
                return '';
            }
            return numeral(value).format('0,0');
        },
        float: function (value, template) {
            if (!value || value == 0) {
                return '';
            }
            return numeral(value).format('0,0.00');
        },
        categoryId: function (value, template) {
            if (!value || value == 0) {
                return '';
            }
            var categories = allCategories.where(function (c) {
                return '' + c.idGoodsCategory == value
            });
            if (categories) {
                return categories[0].name;
            }
            return value;
        }
    });

    // Load categories
    $.ajax({
        type: "GET", url: getWebServiceUrl() + "goods/categories", dataType: "json"
    }).done(function (data) {
        console.log(data);
        allCategories = data;
        localStorage.setItem('categories', JSON.stringify(data));
    }).fail(function () {
        setErrorMessage('The request to web service failed (<a href="' + getWebServiceUrl() + url + '">' + getWebServiceUrl() + url + '</a>).');
    });

    // Load goods
    $.ajax({
        type: "GET", url: getWebServiceUrl() + "goods/designations", dataType: "json"
    }).done(function (data) {
        console.log(data);
        allGoods = data;
        localStorage.setItem('goods', JSON.stringify(data));
    }).fail(function () {
        setErrorMessage('The request to web service failed (<a href="' + getWebServiceUrl() + url + '">' + getWebServiceUrl() + url + '</a>).');
    });
}

function initializeNavMenuItem(target) {
    // Item action
    $(target).on('click', function (e) {
        var $this = $(this);
        var target = $this.attr('ztn-target');
        var template = $this.attr('ztn-template');

        // Load template
        $(target).loadTemplate(template, {});

        // Tab toggle
        e.preventDefault()
        $(this).tab('show')

        // Remove error messages
        setErrorMessage(null);

        return false
    });
}

/*
 function initializeRequestButton(filter) {
 if (!filter) {
 filter = '[ztn-request]';
 }

 // Button action
 $(filter).on('click', function (e) {
 var $this = $(this);
 var url = $this.attr('ztn-href');
 var target = $this.attr('ztn-target');
 var template = $this.attr('ztn-template');

 $.ajax({
 type: "GET", url: getWebServiceUrl() + url, dataType: "json"
 }).done(function (data) {
 console.log(data);
 // Remove error messages
 setErrorMessage(null);
 // Load template
 $(target).loadTemplate(template, data, {
 success: function () {
 initializeSolarSystemViewRequest();
 }
 });
 }).fail(function () {
 setErrorMessage('The request to web service failed (<a href="' + getWebServiceUrl() + url + '">' + getWebServiceUrl() + url + '</a>).');
 });

 return false
 });
 }
 */

function setRequestEvent(filter, eventName) {
    $(filter).on(eventName, function (e) {
        var $this = $(this);
        var url = $this.attr('ztn-href');
        var params = $this.attr('ztn-params');
        var target = $this.attr('ztn-target');
        var template = $this.attr('ztn-template');

        // Build target url
        if (params) {
            params = eval('(' + params + ')');
            if (typeof params == "object") {
                params = [params];
            }
            if ($.isArray(params)) {
                for (var i = 0; i < params.length; i++) {
                    url = url.replace("{" + params[i].id + "}", $(params[i].ref).val());
                }
            }
        }

        console.log(url);

        // Start the request
        $.ajax({
            type: "GET", url: getWebServiceUrl() + url, dataType: "json"
        }).done(function (data) {
            console.log(data);
            // Remove error messages
            setErrorMessage(null);
            // Load template
            $(target).loadTemplate(template, data, {
                success: function () {
                    initializeSolarSystemViewRequest();
                }
            });
        }).fail(function () {
            setErrorMessage('The request to web service failed (<a href="' + getWebServiceUrl() + url + '">' + getWebServiceUrl() + url + '</a>).');
        });

        return false
    });
}

function initializeRequestButton(filter) {
    if (!filter) {
        filter = 'button [ztn-request]';
    }

    // Button action
    setRequestEvent(filter, 'click');
}

function initializeRequestInput(filter) {
    if (!filter) {
        filter = 'input [ztn-request]';
    }

    $(filter).on('keypress', function (e) {
        if (e.keyCode == 13) {
            $(this).trigger("enter");
        }
    });

    // Input action
    setRequestEvent(filter, 'enter');
}

function initializeSolarSystemViewRequest() {
    $('[ztn-system-id]').on('click', function (e) {
        var $this = $(this);
        var url = $this.attr('ztn-href');
        var target = $this.attr('ztn-target');
        var template = $this.attr('ztn-template');

        setErrorMessage('Solar system view is not yet implemented.');

        return false
    });
}
