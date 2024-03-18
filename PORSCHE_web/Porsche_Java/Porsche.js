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
})


window.addEventListener('scroll', function() {
    var element = document.getElementById('concept');
    var scrollPosition = window.pageYOffset;
    if (scrollPosition >= 300) {
        element.classList.add('concept-911');
    } else {
        element.classList.remove('concept-911');
    }
});