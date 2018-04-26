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
      address:"",
      contactMethod: "none",
      acreage: "0"
    };

    $scope.submitThankYouHide = true;
    $scope.submitCompletedHide = false;

    $scope.hideName = true;
    $scope.hidePhone = true;
    $scope.hideEmail = true;

    $scope.buyNow = function(buyPackage) {
      console.log('Buy');
      console.log(buyPackage);
      $scope.package = buyPackage;
      $scope.submitThankYouHide = true;
      $scope.submitCompletedHide = false;
    };


    // phone number regex pattern
    $scope.phoneFormat = ()=>{

      // var phoneLength = $scope.formData.phone.toString().length;

      number = String($scope.formData.phone);
      number = number.replace(/[^0-9]*/g, '');
      var formattedNumber = number;
      number = number[0] == '1' ? number.slice(1) : number;

      var area = number.substring(0, 3);
      var front = number.substring(3, 6);
      var end = number.substring(6, 10);

      if (front) {
          formattedNumber = ("(" + area + ") " + front);
      }
      if (end) {
          formattedNumber += ("-" + end);
      }

      $scope.formData.phone = formattedNumber;

      if (formattedNumber.length >= 14) {
        $scope.formData.phoneValid = true;
      }
      else {
        $scope.formData.phoneValid = false;
      }
    };



    $scope.submit = function() {
      console.log('submit');

      if (($scope.formData.email && $scope.formData.email && $scope.formData.acreage != 0 && $scope.formData.phoneValid)) {
        console.log('Submit Success');
        console.log($scope.formData);
        // change hidden buy now elements
        $scope.submitThankYouHide = false;
        $scope.submitCompletedHide = true;

        // Record an event to keen
        // Keen setup
        Keen.ready(function(){
          var client = new Keen({
            projectId: '5aa84b9bc9e77c00018ede6c',
            writeKey: '5F4E27752330B29935F96E9ED5C38D13EA7168EBEE5C886D6AF95D2F8E994F865BD3675009A76592C1F898BBF4E5BC9AF938053E99D5CF45005367BBF7CBF9CD6ECAF892314100DDFD5838391B688F3F5E12E942B4ED9FE43894FA51B99D5B59'
          });

          client.recordEvent('buy-now', {
            solutionPackage: $scope.package,
            customerInfo: $scope.formData
          });
          console.log('Keen recorded');
        });
      }
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
