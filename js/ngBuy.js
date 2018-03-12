var spectralSolution = angular.module('spectralSolution',[]);












//Buy Controller
//
spectralSolution.controller('buyController', ['$scope', '$location', '$anchorScroll',
  function($scope, $location, $anchorScroll) {
    console.log("Hello Buy");
    // Declare scope Variables
    $scope.formData = {
      name: "",
      email:"",
      phone:"",
      company: "",
      address:""
    };
    $scope.submitThankYouHide = true;
    $scope.submitCompletedHide = false;

    $scope.buyNow = function(buyPackage) {
      console.log('Buy');
      console.log(buyPackage);
      $scope.package = buyPackage;
      $scope.submitThankYouHide = true;
      $scope.submitCompletedHide = false;
    };

    $scope.submit = function() {
      console.log('Submit');
      console.log($scope.formData);
      // change hidden buy now elements
      $scope.submitThankYouHide = false;
      $scope.submitCompletedHide = true;
    };

  }]);

  //solutions Controller
  //
  spectralSolution.controller('solutionsController', ['$scope', '$location', '$anchorScroll',
    function($scope, $location, $anchorScroll) {

      // Scroll Smoothing
      // -----------------------------------------
      var scrollTo = function(eID) {

              // This scrolling function
              // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

              var startY = currentYPosition();
              var stopY = elmYPosition(eID);
              var distance = stopY > startY ? stopY - startY : startY - stopY;
              if (distance < 100) {
                  scrollTo(0, stopY); return;
              }
              var speed = Math.round(distance / 100);
              if (speed >= 20) speed = 20;
              // Speed
              var step = Math.round(distance / 25);
              // Step
              var leapY = stopY > startY ? startY + step : startY - step;
              var timer = 0;
              if (stopY > startY) {
                  for ( var i=startY; i<stopY; i+=step ) {
                      setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                      leapY += step; if (leapY > stopY) leapY = stopY; timer++;
                  } return;
              }
              for ( var i=startY; i>stopY; i-=step ) {
                  setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                  leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
              }

              function currentYPosition() {
                  // Firefox, Chrome, Opera, Safari
                  if (self.pageYOffset) return self.pageYOffset;
                  // Internet Explorer 6 - standards mode
                  if (document.documentElement && document.documentElement.scrollTop)
                      return document.documentElement.scrollTop;
                  // Internet Explorer 6, 7 and 8
                  if (document.body.scrollTop) return document.body.scrollTop;
                  return 0;
              }

              function elmYPosition(eID) {
                  var elm = document.getElementById(eID);
                  var y = elm.offsetTop;
                  var node = elm;
                  while (node.offsetParent && node.offsetParent != document.body) {
                      node = node.offsetParent;
                      y += node.offsetTop;
                  } return y;
              }

          };

      // -----------------------------------------
      // End Scroll smoothing

      console.log("Hello Solutions");

      $scope.pageScroll = function(scrollID) {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        console.log('SCROLL !');
        console.log(scrollID);

        // Call the scroll actions
        $location.hash(scrollID);
        //
        // $anchorScroll();
        scrollTo(scrollID);
      };
    }]);
