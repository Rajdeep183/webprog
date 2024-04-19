//for menu bar
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");
const menuItems = document.querySelectorAll(".submenu-item");

menuBtn.addEventListener("click", () => {
    const isOpen = sidebar.classList.contains("show-sidebar");
    const overlay = document.getElementById("overlay");
    if (!isOpen) {
        sidebar.classList.add("show-sidebar");
        overlay.style.display = "block";
    } else {
        sidebar.classList.remove("show-sidebar");
        overlay.style.display = "none";
    }
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("show-sidebar");

    const submenus = document.querySelectorAll('.submenu');
    submenus.forEach(submenu => {
        submenu.classList.remove('show-submenu');
    });

    document.getElementById("overlay").style.display = "none";
});


menuItems.forEach((item) => {
    item.addEventListener("click", () => {

        const otherSubmenus = document.querySelectorAll(".submenu");
        otherSubmenus.forEach(submenu => {
            if (submenu !== item.nextElementSibling) {
                submenu.parentElement.classList.remove("show-submenu");
            }
        });
        menuItems.forEach(submenuItem => {
            submenuItem.classList.remove("active");
        });
        item.classList.add("active");

        const submenu = item.nextElementSibling;
        submenu.parentElement.classList.toggle("show-submenu");
    });
});
document.body.addEventListener("click", (event) => {
    if (!sidebar.contains(event.target) && event.target !== menuBtn) {
        sidebar.classList.remove("show-sidebar");
        document.getElementById("overlay").style.display = "none";
        const activeSubmenus = document.querySelectorAll(".submenu.show-submenu");
        activeSubmenus.forEach(submenu => {
            submenu.classList.remove("show-submenu");
        });
    }
});

let currentCarIndex = 0;
const cars = document.querySelectorAll('.car');
const infos = document.querySelectorAll('.info');
const GT3 = document.querySelector('.GT3');
const GT3R = document.querySelector('.GT3-with');
const backBtn = document.querySelector('.Back');

function showCar(index) {
    cars.forEach((car, idx) => {
        if (idx === index) {
            car.classList.add('active');
            car.style.left = '50%';
        } else {
            car.classList.remove('active');
            car.style.left = '-50%';
        }
    });

    infos.forEach((info, idx) => {
        if (idx === index) {
            info.classList.add('active');
        } else {
            info.classList.remove('active');
        }
    });

    if (index === 0) {
        document.querySelector('.prev').style.display = 'none';
        GT3.classList.add('active');
        document.querySelector('.next').style.display = 'block';
        GT3R.classList.remove('active');
        backBtn.style.display = 'none';
    } else {
        document.querySelector('.next').style.display = 'none';
        GT3R.classList.add('active');
        document.querySelector('.prev').style.display = 'block';
        GT3.classList.remove('active');
        backBtn.style.display = 'block';
    }
}

function prevCar() {
    currentCarIndex = (currentCarIndex - 1 + cars.length) % cars.length;
    showCar(currentCarIndex);
}

function nextCar() {
    currentCarIndex = (currentCarIndex + 1) % cars.length;
    showCar(currentCarIndex);
}

function BackCar() {
    currentCarIndex = 0;
    showCar(currentCarIndex);
}

showCar(currentCarIndex);

document.addEventListener('DOMContentLoaded', function() {

    function prevCar1() {
        currentCarIndex = (currentCarIndex - 1 + cars.length) % cars.length;
        showCar(currentCarIndex);
    }

    function nextCar1() {
        currentCarIndex = (currentCarIndex + 1) % cars.length;
        showCar(currentCarIndex);
    }

    document.getElementById('radio-1').addEventListener('click', prevCar1);
    document.getElementById('radio-2').addEventListener('click', nextCar1);
});

//for sticky bar 
var marker = document.querySelector('#marker');
var stickyItem = document.querySelectorAll('nav a');

function indicator(e) {
    marker.style.left = e.offsetLeft + "px";
    marker.style.width = e.offsetWidth + "px";
}

stickyItem.forEach(link => {
    link.addEventListener('click', (e) => {
        indicator(e.target);
    })
});

var shadow = document.querySelector('#models-shadowbox');
var shadowItem = document.querySelectorAll('section .modelsbox1');

function shadowindicator(f) {
    shadow.style.left = f.offsetLeft + "px";
    shadow.style.width = f.offsetWidth + "px";
}

shadowItem.forEach(lii => {
    lii.addEventListener('click', (event) => {
        var clickedBox = event.currentTarget;
        shadowItem.forEach(box => {
            if (box === clickedBox) {
                box.querySelector('.models-buttons').style.display = 'block';
                box.querySelector('.selected').style.display = 'block';
                localStorage.setItem('selectedBox', box.id);
            } else {
                box.querySelector('.models-buttons').style.display = 'none';
                box.querySelector('.selected').style.display = 'none';
            }
        });
        shadowindicator(clickedBox);
    });
});

// Function to check if element is in viewport
function isInViewport(element) {
    var rect = element.getBoundingClientRect();
    // Adjust the height of the viewport to trigger the animation
    var viewHeight = window.innerHeight * 0.3; // Change 0.3 to adjust the threshold
    return (
        rect.top >= -viewHeight &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to add animation class to elements when the first link comes into view
function animateFirstInView() {
    var detailLinks = document.querySelectorAll('.detail-links');
    var firstLinkInView = false;
    detailLinks.forEach(function(link) {
        if (!firstLinkInView && isInViewport(link)) {
            firstLinkInView = true;
        }
        if (firstLinkInView) {
            link.classList.add('animate');
        }
    });
}

// Call the animateFirstInView function when the page loads and when it scrolls
window.addEventListener('load', animateFirstInView);
window.addEventListener('scroll', animateFirstInView);

var marker = document.querySelector('#marker');
var sections = document.querySelectorAll('section');
var sectionHeights = [];

function updateMarker() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    for (var i = 0; i < sectionHeights.length; i++) {
        if (scrollTop >= sectionHeights[i]) {
            marker.style.left = document.querySelectorAll('.sticky-bar a')[i].offsetLeft + "px";
            marker.style.width = document.querySelectorAll('.sticky-bar a')[i].offsetWidth + "px";
        }
    }
}

function calculateSectionHeights() {
    sectionHeights = [];
    sections.forEach(section => {
        sectionHeights.push(section.offsetTop - 100);
    });
}
calculateSectionHeights();
updateMarker();
window.addEventListener('scroll', updateMarker);
window.addEventListener('resize', calculateSectionHeights);



document.getElementById("downloadButton").addEventListener("click", function() {
    // Fetch the PDF file
    fetch('Porsche models(1).pdf')
    .then(response => response.blob())
    .then(blob => {
        // Create a link element
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        
        // Set the filename for the download
        link.download = 'Porsche models.pdf';

        // Append the link to the body and trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
    });
});