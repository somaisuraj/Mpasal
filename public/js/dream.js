 debugger;

   let slider = document.getElementsByClassName('slider');
   let i = 0;
   let images = [];
   images[0] = 'slidehead0.jpg';
   images[1] = "./slider/slidehead0.jpg";
   images[2] = "./slider/slidehead0.jpg";

    function slideImg() {
      slider.src = images[i];
      if(i < images.length - 1) {
          i++;
      }i = 0;
      setTimeout("slideImg()", 3000);
    }
window.onload = slideImg;
