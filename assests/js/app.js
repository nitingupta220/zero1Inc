 fetch('https://newsd.co/campaigns.json', {
         header: {
             "Access-Control-Allow-Origin": "*"
         }
     })
     .then(function (response) {
         return response.json();
     })
     .then(function (response) {
         //                            console.log(response);
         var authors = response;
         var output = '';
         authors.forEach(function (author) {
             console.log(author['ads'][0]);
             output += `
                        <div class="col-4">
                            <div class="card">
                              <div class="card-body">
                                <img src="${author.ads[0].img}">
                                <h5 class="card-title">${author.ads[0].h1}</h5>
                              </div>
                            </div>
                        </div>
                            `
         })
         document.getElementById('results').innerHTML = output;
     })
     .catch(function (error) {
         console.log(error)
     })

 jQuery(function ($) {

     var $window = $(window); //  Window Object.
     var $featuredMedia = $("#featured-media"); //  The Video Container.
     var $featuredVideo = $("#featured-video"); //  The Youtube Video.

     var player; //  Youtube player object.
     var top = $featuredMedia.offset().top; //  The video position from the top of the document;
     var offset = Math.floor(top + ($featuredMedia.outerHeight() / 2)); // offset.


     //    Youtube frame API will trigger a function named onYouTubeIframeReady
     window.onYouTubeIframeAPIReady = function () {

         player = new YT.Player("featured-video", {
             events: {
                 //                this function will execute when the youtube player is play, paused or ended
                 "onStateChange": onPlayerStateChange
             }
         });
     };


     function onPlayerStateChange(event) {
         //                onPlayerStateChange will provide us usable pieces of data

         //        As you can see below, we represent the video state with some numbers, like 1 is when the video is playing, 2 is when the video is paused             and 3 is when the video ended.


         //         Run when the Youtube video state (play, pause, etc.) is changed.
         var isPlay = 1 === event.data;
         var isPause = 2 === event.data;
         var isEnd = 0 === event.data;

         if (isPlay) {
             $featuredVideo.removeClass("is-paused");
             $featuredVideo.toggleClass("is-playing");
         }

         if (isPause) {
             $featuredVideo.removeClass("is-playing");
             $featuredVideo.toggleClass("is-paused");
         }

         if (isEnd) {
             $featuredVideo.removeClass("is-playing", "is-paused");
         }
     }

     //    We are just floating the video when the video is playing, so for this first we will check that if the iframe is in playing state, means that it has the is-playing class or not.

     $window
         .on("resize", function () {
             top = $featuredMedia.offset().top;
             offset = Math.floor(top + ($featuredMedia.outerHeight() / 2));
         })

         .on("scroll", function () {
             $featuredVideo.toggleClass("is-sticky",
                 $window.scrollTop() > offset && $featuredVideo.hasClass("is-playing")
             );
         });
 });
