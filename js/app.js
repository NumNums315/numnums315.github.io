//updated Model July 5th 11:32 ss
var username = "bigparserwebtest@gmail.com";
var password = "Lot'sOfLittleSquares";
var gridId = "5980a7f9eead2105727275ed";

angular.module('grid', []).controller('gridController', ['$scope', function ($scope) {
    $scope.hero = {
        centerimgsrc: "",
        buttons: [],
        err: [] //this is the new version
    }

    $scope.features = {
        icons: [],
        headers: [],
        texts: [],
        err: []
    }
    
    $scope.dividers = {
        pimg: "",
        err: []
    }

    $scope.Testimonials = {
        images: [],
        titles: [],
        texts: [],
        err: []
    }

    $scope.err = [];

    $.ajax({
        type: "POST",
        url: "https://www.bigparser.com/APIServices/api/common/login",
        data: JSON.stringify({
            "emailId": username,
            "password": password
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $.ajax({
                type: "POST",
                url: "https://www.bigparser.com/APIServices/api/query/table",
                data: JSON.stringify({
                    "gridId": gridId,
                    "keywords": [],
                    "rowCount": 200,
                    "selectColumnsStoreName": [],
                    "tags": [],
                }),
                contentType: "application/json; charset=utf-8",
                headers: {
                    'authId': data.authId,
                },
                dataType: "json",
                success: function (data) {
                    define(data)
                }
            });
        }
    });
    /*function define(data){
      alert("CHECK");
    }
    */
    function define(data) {
        var i = 0;
        while (data.rows[i] != null && data.rows[i] != "") {
            var row = data.rows[i];
            var id = row.data[0].replace(" Section", "").replace("Start ", "");
            switch (id) {
                case "Hero": //Start Hero Section
                    i++; //skip element attribute
                    row = data.rows[i];
                    var scope = $scope.hero;

                    while (!row.data[0].includes("End")) {
                        var lab = row.data[0];
                        var val = row.data[1];
                        var vis = row.data[2];
                        var len = lab.split(" ").length;
                        if (vis == "yes") {
                            switch (lab.split(" ")[len - 1]) {
                                case "Button":
                                    scope.buttons.push({
                                        label: lab.replace(" Button", ""),
                                        link: val
                                    });
                                    break;
                                case "Image":
                                    console.log("pushing image" + val)
                                    scope.centerimgsrc = val;
                                    break;
                                default:
                                    scope.err.push({
                                        label: lab,
                                        value: val
                                    });
                                    break;
                            }
                        }
                        i++;
                        row = data.rows[i];
                    }
                    i++;
                    break; //skip to next section


                case "Features":
                    i++; //skip element attribute
                    row = data.rows[i];
                    var scope = $scope.features;

                    while (!row.data[0].includes("End")) {
                        var lab = row.data[0];
                        var val = row.data[1];
                        var vis = row.data[2];
                        var len = lab.split(" ").length;

                        if (vis == "yes") {
                            switch (lab.split(" ")[len - 1]) {
                                case "Icon":
                                    scope.icons.push(val);
                                    break;
                                case "Header":
                                    scope.headers.push(val);
                                    break;
                                case "Text":
                                    scope.texts.push({
                                        class: lab.replace(" Text", "").toLowerCase(),
                                        content: val
                                    });
                                    break;
                                default:
                                    scope.err.push({
                                        label: lab,
                                        value: val
                                    });
                                    break;
                            }
                        }
                        i++;
                        row = data.rows[i];
                    }
                    i++;
                    break; //skip to next section

                case "Dividers":
                    i++; //skip element attribute
                    row = data.rows[i];
                    var scope = $scope.dividers;

                    while (!row.data[0].includes("End")) {
                        var lab = row.data[0];
                        var val = row.data[1];
                        var vis = row.data[2];
                        var len = lab.split(" ").length;

                        if (vis == "yes") {
                            switch (lab.split(" ")[len - 1]) {
                                case "Image":
                                    pimgsrc = "val";
                                    break;
                                default:
                                    scope.err.push({
                                        label: lab,
                                        value: val
                                    });
                                    break;
                            }
                        }
                        i++;
                        row = data.rows[i];
                    }
                    i++;
                    break; //skip to next section

                case "Testimonials":
                    i++; //skip element attribute
                    row = data.rows[i];
                    var scope = $scope.Testimonials;

                    while (!row.data[0].includes("End")) {
                        var lab = row.data[0];
                        var val = row.data[1];
                        var vis = row.data[2];
                        var len = lab.split(" ").length;

                        if (vis == "yes") {
                            switch (lab.split(" ")[len - 1]) {
                                case "Image":
                                    scope.images.push(val);
                                    break;
                                case "Header":
                                    scope.titles.push(val);
                                    break;
                                case "Text":
                                    scope.texts.push({
                                        class: lab.replace(" Text", "").toLowerCase(),
                                        content: val
                                    });
                                    break;
                                default:
                                    scope.err.push({
                                        label: lab,
                                        value: val
                                    });
                                    break;
                            }
                        }
                        i++;
                        row = data.rows[i];
                    }
                    i++;
                    break; //skip to next section
                default:
                    $scope.err.push({
                        label: row.data[0],
                        value: row.data[1]
                    });
                    i++;
                    break;
            }
        }
        temp = $scope;
        $scope.$apply();
        jsinit();
    }

    function jsinit() {
        $('.parallax').parallax();

        $(".button-collapse").sideNav();

        $('#menu').pushpin({
            top: $(window).height(),
        });

        $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
            // On-page links
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
                location.hostname == this.hostname
            ) {
                // Figure out element to scroll to
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                // Does a scroll target exist?
                if (target.length) {
                    // Only prevent default if animation is actually gonna happen
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        // Callback after animation
                        // Must change focus!
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });
    }
}]);
