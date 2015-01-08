/**
 * Created by ZTn on 05/01/2015.
 */

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
    $('#elite-container').loadTemplate('tpl/getting-started.html');
    $('.web-service-url').html('<a href="' + getWebServiceUrl() + '">' + getWebServiceUrl() + '</a>');

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
        }
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
