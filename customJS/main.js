//------------------------------------- Sidebar---------------------------------
function toggleSidebar() {
  let list = document.querySelector("ul");
  let menuButton = document.getElementById("menuButton");

  if (menuButton.getAttribute("data-name") === "menu") {
    menuButton.setAttribute("data-name", "close");
    list.classList.add("left-[0px]");
    list.classList.add("opacity-100");
  } else {
    menuButton.setAttribute("data-name", "menu");
    list.classList.remove("left-[0px]");
    list.classList.remove("opacity-100");
  }
}

document.getElementById("menuButton").addEventListener("click", toggleSidebar);



//----------------------------AOS Initialization-------------------------------
AOS.init();

//------------------------------- Carousel display for Team -------------------------------


$('.team',).slick({
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });

  //------------------------------- Carousel display for Testimonials-------------------------------


$('.testimonial',).slick({
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 5000,
  speed: 300,
  slidesToShow: 2,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});


//--------------------------------Scroll to Top----------------------------------

const moveUp = document.querySelector('#moveUp');

window.addEventListener('scroll', checkHeight)

function checkHeight(){
    if (window.scrollY > 120){
        moveUp.style.display = "flex"
    } else{
        moveUp.style.display = "none"
    }
}

moveUp.addEventListener('click', () =>{
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})
