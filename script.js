let domain = ".";

const body = document.querySelector("body"),
loader = document.querySelector(".loader"),
header = document.querySelector(".header"),
headerMain = document.querySelector(".header--main"),
nav = document.querySelector("nav.menu"),
modeToggle = document.querySelector(".dark-light"),
searchToggle = document.querySelector(".searchToggle"),
navOpen = document.querySelector(".open-nav"),
navClose = document.querySelector(".close-nav"),
navLogo = document.querySelector(".nav-logo"),
footerLogo = document.querySelector(".footer-logo"),
year = document.getElementById("year");

window.onscroll = () => {
    if (window.scrollY > 20) {
        header.classList.add("f-nav");
    } else {
        header.classList.remove("f-nav");
    }
};


    
  window.onload = () => {
    if (window.location.pathname.includes("/")) {
        domain = "..";

        const imgDir = document.querySelectorAll('img');
        imgDir.forEach(item => {
            if (item.getAttribute('src').indexOf('./images') < 1) {
                const nItem = item.getAttribute('src').replace('./images', '../images');
                item.src = nItem;
            }
        });
    }

    document.querySelector(".loader").classList.add("off");
    setTimeout(() => {
        document.querySelector(".loader").style.display = "none !important; opacity: 0; z-index: -1;";
    }, 700);

    const modeOnload = localStorage.getItem("mode");
    checkBgMode(modeOnload);
// Simplified Welcome Alert
const welcome = document.querySelector(".welcome-alert");
const welcomeCls = document.querySelector(".welcome");
const welcomeOnload = localStorage.getItem("welcome");

if (welcomeOnload === "d-none") {
    welcome.classList.add("d-none");
}

if (welcome) {
    setTimeout(() => {
        welcome.classList.add("d-none");
        localStorage.setItem("welcome", "d-none");
    }, 3000);

    welcomeCls.addEventListener("click", () => {
        setTimeout(() => {
            welcome.classList.add("d-none");
            localStorage.setItem("welcome", "d-none");
        }, 500);
    });
}

// Check Background Mode
const checkBgMode = (mode) => {
    if (mode) {
        const logoSrc = `${domain}/images/lupos-artLogobyDesigner.png`;
        if (mode === 'dark-mode') {
            body.classList.add("dark");
        }
        navLogo.src = logoSrc;
        footerLogo.src = logoSrc;
    }
};

// Mode Toggle and AJAX Request
const modeLD = (() => {
    const makeRequest = () => {
        const httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
            console.log('Cannot create an XMLHTTP instance');
            return;
        }

        httpRequest.onreadystatechange = () => {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    let mode = localStorage.getItem("mode");
                    checkBgMode(mode);
                } else {
                    console.log('There was a problem with the request.');
                }
            }
        };

        const path = window.location.pathname;
        const page = path.split("/").pop();
        httpRequest.open('GET', `${page}`);
        httpRequest.send();
    };

    modeToggle.addEventListener('click', makeRequest);
})();

// Toggle Dark and Light Mode
modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    modeToggle.classList.toggle("active");
    localStorage.setItem("mode", body.classList.contains("dark") ? "dark-mode" : "light-mode");
});

// Search Box Toggle
searchToggle.addEventListener("click", () => {
    searchToggle.classList.toggle("active");
});

// Checkout Redirect
const checkOut = document.querySelector(".shopping-cart");
checkOut.addEventListener("click", () => {
    location.href = `${domain}/cart.html`;
});

// Mobile Navigation Toggle
navOpen.addEventListener("click", () => {
    nav.classList.toggle("active");
});

// Dropdown Menu Toggle
const dropDowns = document.querySelectorAll(".js-sub_menu");
dropDowns.forEach(dropDown => {
    dropDown.addEventListener("click", (event) => {
        const target = event.target;
        const className = "active";
        const iconClass = "opened";

        showDn.forEach(menu => menu.classList.toggle(className, target.parentNode.contains(menu)));
        iconDn.forEach(icon => icon.classList.toggle(iconClass, target.parentNode.contains(icon)));
    });
});

// Back to Top Button and Progress Bar
const showOnPx = 100;
const backToTopButton = document.querySelector(".back-to-top");
const pageProgressBar = document.querySelector(".progress");

const scrollContainer = () => document.documentElement || document.body;

document.addEventListener("scroll", () => {
    const scrolledPercentage = (scrollContainer().scrollTop / (scrollContainer().scrollHeight - scrollContainer().clientHeight)) * 100;
    pageProgressBar.style.width = `${scrolledPercentage}%`;

    backToTopButton.classList.toggle("hidden", scrollContainer().scrollTop <= showOnPx);
});

backToTopButton.addEventListener("click", () => {
    document.body.scrollIntoView({ behavior: "smooth" });
});

// Cookie Handling
const cookieWrb = document.querySelector(".cookie");
const btnAction = cookieWrb.querySelector(".btn-actions button");

if (window.location.host) {
    btnAction.addEventListener("click", () => {
        document.cookie = "OraKs=com; max-age=" + 60 * 60 * 24 * 30;
        if (document.cookie) {
            setTimeout(() => cookieWrb.classList.add("hide"), 500);
        } else {
            alert("Cookie can't be set!");
        }
    });

    cookieWrb.classList.toggle("hide", document.cookie.indexOf("OraKs=com") !== -1);
} else {
    cookieWrb.classList.add("hide");
}

// Update Year
year.innerText = new Date().getFullYear();
