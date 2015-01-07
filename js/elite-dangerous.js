/**
 * Created by Sylvain on 05/01/2015.
 */

function setWebServiceUrl(url) {
    localStorage.setItem("web-service-url", url);
}

function getWebServiceUrl() {
    var webServiceUrl = localStorage.getItem("web-service-url");
    if (!webServiceUrl) {
        setWebServiceUrl("http://localhost:8080/")
        webServiceUrl = "http://localhost:8080/";
    }
    return webServiceUrl;
}

function initializeNavMenuItem() {
    // Tab toggle
    $('body .navbar a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    })

    // Item action
    $('[ztn-nav-item]').on('click', function (e) {
        var $this = $(this);
        var target = $this.attr('ztn-target');
        var template = $this.attr('ztn-template');

        $(target).loadTemplate(template, {});

        return false
    });
}

function initializeRequestButton() {
    // Button action
    $('[ztn-request]').on('click', function (e) {
        var $this = $(this);
        var url = $this.attr('ztn-href');
        var target = $this.attr('ztn-target');
        var template = $this.attr('ztn-template');

        $.ajax({
            type: "GET", url: getWebServiceUrl() + url, dataType: "json"
        }).done(function (data) {
            console.log(data);
            $(target).loadTemplate(template, data);
        }).fail(function () {
            alert("An error occurred");
        });

        return false
    });
}