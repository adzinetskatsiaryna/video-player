// video player
const progressVideo = document.querySelector('.progress-video');
const progressVolume = document.querySelector('.progress-volume');
const btnVolume = document.querySelector('.volume')
const video = document.querySelector('.video');
const buttonPlayMain = document.querySelector('.btn-play-main');
const btnPlayPause = document.querySelector('.play');
const btnFullScreen = document.querySelector('.btn-full-screen')
let volumeValue = 40 ;
progressVolume.value = volumeValue;

function toggleVideoStatus() {
    if (video.paused) {    
      video.play();
      // progressVolume.value = 10
      // progressVolume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progressVolume.value}%, #C4C4C4 ${progressVolume.value}%, #C4C4C4 100%)`
      // video.volume = progressVolume.value/100
    } else {      
      video.pause();
      
    }
};

function updateIcon() {
    if (video.paused) {
      btnPlayPause.classList.add('play');
      btnPlayPause.classList.remove('pause');
      buttonPlayMain.classList.add('btn-play-main')
      buttonPlayMain.classList.remove('button-main-hidden')
     
    } else {
      btnPlayPause.classList.add('pause');
      btnPlayPause.classList.remove('play');
      buttonPlayMain.classList.add('button-main-hidden')
      buttonPlayMain.classList.remove('btn-play-main')
      
    }
};

function videoVolume(){
  if (progressVolume.value === 0) {
		video.volume = 0;
	}
	video.volume = progressVolume.value / 100;  
}
video.addEventListener('timeupdate', videoVolume);

progressVolume.addEventListener('input', function(){
  const value = this.value
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
  if(value==0){
    btnVolume.classList.add('mute')
    btnVolume.classList.remove('volume')
  } else{
    btnVolume.classList.add('volume')
    btnVolume.classList.remove('mute') 
  }
})

function videoMute() {

  if (progressVolume.value > 0) {
    volumeValue = progressVolume.value;
    btnVolume.classList.add('mute')
    btnVolume.classList.remove('volume')
    progressVolume.value=0
    progressVolume.style.background = `linear-gradient(to right, #710707 0%, #C4C4C4 0%, #C4C4C4 0%, #C4C4C4 100%)`
    progressVolume.transition = '0.25s ease-in-out'
    
  } else if(progressVolume.value == 0 && volumeValue > 0){
    btnVolume.classList.remove('mute');
    btnVolume.classList.add('volume'); 
    progressVolume.value = volumeValue;
    progressVolume.style.background = `linear-gradient(to right, #710707 0%, #710707  ${volumeValue}%, #C4C4C4 ${volumeValue}%, #C4C4C4 100%)`  
  } else{
    volumeValue = 40;
    btnVolume.classList.remove('mute'); 
    btnVolume.classList.add('volume');
    progressVolume.value = volumeValue;
    progressVolume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${volumeValue}%, #C4C4C4 ${volumeValue}%, #C4C4C4 100%)`  
  }
}
btnVolume.addEventListener('click', videoMute);

// function videoMute() {

//   if (!video.muted) {
//     btnVolume.classList.add('mute')
//     btnVolume.classList.remove('volume')
//     progressVolume.value=0
//     progressVolume.style.background = `linear-gradient(to right, #C4C4C4 0%, #C4C4C4 100%, #C4C4C4 0%, #C4C4C4 100%)`
//     progressVolume.transition = '0.25s ease-in-out'
//       video.muted = true;
//   } else {
//     btnVolume.classList.remove('mute') 
//     btnVolume.classList.add('volume') 
//     progressVolume.value = 10
//     video.volume = progressVolume.value/100
//     progressVolume.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progressVolume.value}%, #C4C4C4 ${progressVolume.value}%, #C4C4C4 100%)`
//     video.muted = false;
//   }
// }

function fullscreen() {
	let isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null);

	if (!isInFullScreen) {
		if (video.requestFullscreen) {
			video.requestFullscreen();
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	}
}

function stopVideo() {
    video.currentTime = 0;
    setProgressTimer();
    video.pause();
};

function setProgressTimer() {
    progressVideo.value = (video.currentTime / video.duration) * 100;
    if (video.currentTime === video.duration) {
      progressVideo.value = 0;
      stopVideo();
    }
    progressVideo.style.background = `linear-gradient(to right, #710707 0%, #710707 ${progressVideo.value}%, #C4C4C4 ${progressVideo.value}%, #C4C4C4 100%)`
};

function seeked() {
    video.currentTime = (progressVideo.value / 100) * video.duration;
    let value = progressVideo.value
    if(video.currentTime){
      progressVideo.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
    }
    
}

document.addEventListener('keydown', function (e) {
	if (e.code == 'Space') {
		toggleVideoStatus();
	}
	if (e.code == 'KeyM') {
		videoMute();
	}
	if (e.code == 'ArrowRight') {
		video.currentTime += 5;
	}
	if (e.code == 'ArrowLeft') {
		video.currentTime -= 5;
	}
	if (e.code == 'KeyF') {
		fullscreen();
	}
	if (e.code == 'Period') {
		speedUp()
	}
	if (e.code == 'Comma') {
		speedDown()
	}
});

function speedUp(){
  video.play()
  video.playbackRate += 2
}
function speedDown(){
  video.play()
  video.playbackRate -= 2
}
function speedNormal(){
  video.play()
  video.playbackRate = 1
}

btnPlayPause.addEventListener('click', toggleVideoStatus);
buttonPlayMain.addEventListener('click', toggleVideoStatus);
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('play', updateIcon);
video.addEventListener('pause', updateIcon);
video.addEventListener('timeupdate', setProgressTimer);
progressVideo.addEventListener('input', seeked);
btnFullScreen.addEventListener('click', fullscreen);



// sliderVideo
const carousel = document.querySelector('.slider');
const slideList = document.querySelectorAll('.slider-list');
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const items=document.querySelectorAll('.slider-item');
const dots = document.querySelectorAll('.dot');
const activeVideo = document.querySelector('.active-video')
const innerCarousel = document.querySelector('.inner-carousel')

const gap = 40;
let slideIndex=0;
let numberOfItems=Array.from(items).length - 1;

let width = carousel.offsetWidth;
let videoWidth=document.querySelector('.slider-item').offsetWidth;
window.addEventListener("resize", e => (width = carousel.offsetWidth));

function newVideo(index){
  innerCarousel.scrollTo((videoWidth + gap)*index, 0); 
}

function activeDot (index) {
  for (dot of dots) {
    dot.classList.remove('active');
  }
  dots[index].classList.add('active');
};

function onChangeSlideVideo(i){
  newVideo(i)
  activeDot(i)
  activeVideo.src=videos[i].video
  video.poster=videos[i].poster
  video.load()
}

function nexSlide(){
  if(slideIndex >= numberOfItems ){
    slideIndex=0;
  }else{
    slideIndex ++ 
  } 
  onChangeSlideVideo(slideIndex)
}
function prevSlide (){
  if(slideIndex <= 0){
    slideIndex = numberOfItems;
  }else{
    slideIndex --
  } 
  onChangeSlideVideo(slideIndex)
}

dots.forEach((dot, indexDot) => {
  dot.addEventListener('click', () => {
    slideIndex = indexDot;
    onChangeSlideVideo(slideIndex)
  });
});
items.forEach((item, slideIndex)=>{
  item.addEventListener('click', ()=>{
    onChangeSlideVideo(slideIndex)
  })
})

next.addEventListener("click", nexSlide);
prev.addEventListener("click", prevSlide);

const videos= [
  {
    slideIndex: 0,
    video: './video/video.mp4',
    poster: './img/video_bg.jpg', 
  },
  {
    slideIndex: 1,
    video: './video/video1.mp4',
    poster: './img/poster1.jpg'    
  },
  {
    slideIndex: 2,
    video: './video/video2.mp4',
    poster: './img/poster2.jpg',   
  },
  {
    slideIndex: 3,
    video: './video/video3.mp4',
    poster: './img/poster3.jpg',
  },
  {slideIndex: 4,
    video: './video/video4.mp4',
    poster: './img/poster4.jpg',   
  }
];

function infinitSlids (){
  let firstSlide = items[0];
  let lastSlide = items[ items.length - 1 ];
  let firstSlideClone = firstSlide.cloneNode( true );
  let lastSlideClone = lastSlide.cloneNode( true );
  items.appendChild( firstSlideClone );
  items.insertBefore( lastSlideClone, firstSlide );

}


// youtube
// const videos= [
//   {slideIndex: 0,
//     video: '"https://www.youtube.com/embed/zp1BXPX8jcU"'   
//   },
//   {slideIndex: 1,
//     video: '"https://www.youtube.com/embed/Vi5D6FKhRmo"'    
//   },
//   {
//     slideIndex: 2,
//     video: '"https://www.youtube.com/embed/NOhDysLnTvY"'  
//   },
//   {slideIndex: 3,
//   video: '"https://www.youtube.com/embed/aWmJ5DgyWPI"'  
//   },
//   {slideIndex: 4,
//     video: 'src="https://www.youtube.com/embed/2OR0OCr6uRE"'  
//   }
// ];

