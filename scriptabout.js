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

    // Simplified welcome alert code
const welcome = document.querySelector(".welcome-alert");

if (welcome) {
    setTimeout(() => {
        welcome.style.display = "none";
    }, 3000);
}

welcome?.addEventListener("click", () => {
    welcome.style.display = "none";
});
  
    // const welcome = document.querySelector(".welcome-alert");
    // const welcomeCls = document.querySelector(".welcome");
    // const welcomeOnload = localStorage.getItem("welcome");

    // if (welcomeOnload && welcomeOnload === "d-none") {
    //     welcome.classList.add("d-none");
    // }

    // setTimeout(() => {
    //     welcome.classList.add("d-none");
    //     localStorage.setItem("welcome", "d-none");
    // }, 3000);

    // welcomeCls.addEventListener("click", e => {
    //     const touch = e.target;
    //     if (touch.classList.contains("welcome")) {
    //         setTimeout(() => {
    //             welcome.classList.add("d-none");
    //             localStorage.setItem("welcome", "d-none");
    //         }, 500);
    //     }
    // });
};


const checkBgMode = (mode) => {
    if(mode) {
        switch(mode) {
            case 'light-mode':
                navLogo.src = `${domain}/images/logo3.png`;
                footerLogo.src = `${domain}/images/logo3.png`;
            break;
            case 'dark-mode':
                body.classList.add("dark");
                navLogo.src = `${domain}/images/logo3.png`;
                footerLogo.src = `${domain}/images/logo3.png`;
            break;
            default:
                return;
        }
    }
}

// Light & Dark mode, Real Time | Localstorage Changes
const modeLD = (() => {
    let httpRequest;
    modeToggle.addEventListener('click', makeRequest);
    
    function makeRequest() {
        httpRequest = new XMLHttpRequest();
    
        if (!httpRequest) {
            console.log('Cannot create an XMLHTTP instance');
            return false;
        }
        
        httpRequest.onreadystatechange = showContents;
        httpRequest.onerror = handleRequestError; // Add this line
        
        let path = window.location.pathname;
        let page = path.split("/").pop();
        httpRequest.open('GET', `${page}`);
        httpRequest.send();
    }
    
    function showContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                let mode = localStorage.getItem("mode");
                checkBgMode(mode);
            } else {
                console.log('There was a problem with the request.');
                handleRequestError(); // Handle the error
            }
        }
    }

    // Define a function to handle errors
    function handleRequestError() {
        // Implement your error handling logic here
        console.log('An error occurred during the request.');
        // You can display an error message to the user or take other appropriate actions.
    }
})();

// const modeLD = (() => {
//     let httpRequest;
    // modeToggle.addEventListener('click', makeRequest);
    
    // function makeRequest() {
    //     httpRequest = new XMLHttpRequest();
    
    //     if (!httpRequest) {
    //         console.log('Cannot create an XMLHTTP instance');
    //         return false;
    //     }
        
    //     httpRequest.onreadystatechange = showContents;
        
    //     let path = window.location.pathname;
    //     let page = path.split("/").pop();
    //     httpRequest.open('GET', `${page}`);
    //     httpRequest.send();
    // }
    
    // function showContents() {
    //     if (httpRequest.readyState === XMLHttpRequest.DONE) {
    //         if (httpRequest.status === 200) {
    //             let mode = localStorage.getItem("mode");
    //             checkBgMode(mode);
    //         } else {
    //             console.log('There was a problem with the request.');
    //         }
    //     }
    // }
// })();

// dark and light mode   
modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    modeToggle.classList.toggle("active");
    if(!window.location.host) window.location.href=window.location.href;

    if(!body.classList.contains("dark")) {
        localStorage.setItem("mode", "light-mode");
    } else {
        localStorage.setItem("mode", "dark-mode");
    }
});


// searchBox
searchToggle.addEventListener("click", () => {
    searchToggle.classList.toggle("active");
});

// Checkout
const checkOut = document.querySelector(".shopping-cart");
checkOut.onclick = () => {
    location.href = `${domain}/cart.html`;
};


// mobile nav
navOpen.addEventListener("click", () => {
    nav.classList.toggle("active");
});


// Drop Down
const dropDown = document.querySelectorAll(".js-sub_menu");
const showDn = document.querySelectorAll(".sub-menu");
const iconDn = document.querySelectorAll(".uil-angle-down");

function handleClick(event) {
    const { target } = event;
    const className = "active",
    iconClass = "opened";

    let myContent = null;
    let icon = null;
    showDn.forEach(elem => {
        if (target.parentNode.contains(elem)) {
            myContent = elem;
        } else {
            elem.classList.remove(className);
        }
    });

    if (myContent) myContent.classList.toggle(className);
    iconDn.forEach(elem => {
        if (target.parentNode.contains(elem)) {
            icon = elem;
        } else {
            elem.classList.remove(iconClass);
        }
    });
    if (icon) icon.classList.toggle(iconClass);
}

dropDown.forEach(elem => elem.addEventListener("click",  handleClick));

// Back to Top
const showOnPx = 100;
const backToTopButton = document.querySelector(".back-to-top");
const pageProgressBar = document.querySelector(".progress");

const scrollContainer = () => {
  return document.documentElement || document.body;
};

const goToTop = () => {
  document.body.scrollIntoView({
    behavior: "smooth"
  });
};

document.addEventListener("scroll", () => {
//   console.log("Scroll Height: ", scrollContainer().scrollHeight);
//   console.log("Client Height: ", scrollContainer().clientHeight);

  const scrolledPercentage =
    (scrollContainer().scrollTop /
      (scrollContainer().scrollHeight - scrollContainer().clientHeight)) *
    100;

  pageProgressBar.style.width = `${scrolledPercentage}%`;

  if (scrollContainer().scrollTop > showOnPx) {
    backToTopButton.classList.remove("hidden");
  } else {
    backToTopButton.classList.add("hidden");
  }
});

backToTopButton.addEventListener("click", goToTop);

// Cookie
const cookieWrb = document.querySelector(".cookie"),
btnAction = cookieWrb.querySelector(".btn-actions button");

if(window.location.host) {
    btnAction.onclick = () => {
        // set cookie for 1 month and after that time expire automatically
        document.cookie = "OraKs=com; max-age=" + 60 * 60 * 24 * 30;
        if(document.cookie) {
            setTimeout(() => {
                cookieWrb.classList.add("hide");
            }, 500);
        } else {
            alert("Cookie can't be set!");
        }
    }
    
    let checkforCookie = document.cookie.indexOf("OraKs=com");
    checkforCookie != -1 ? cookieWrb.classList.add("hide") : cookieWrb.classList.remove("hide");
} else {
    cookieWrb.classList.add("hide");
}

// Year
year.innerText = new Date().getFullYear();
