window.onload = function() {

    function setClock() {
        let time = document.querySelector('.time');
        let date = document.querySelector('.date');
        let dateinfo = new Date();
        let hour = dateinfo.getHours().toString().padStart(2, '0');
        let min = dateinfo.getMinutes().toString().padStart(2, '0');
        let sec = dateinfo.getSeconds().toString().padStart(2, '0');
        let year = dateinfo.getFullYear();
        let month = (dateinfo.getMonth() + 1).toString().padStart(2, '0');
        let day = dateinfo.getDate().toString().padStart(2, '0');
        date.innerHTML=`${year}.${month}.${day}`;
        time.innerHTML=`${hour} : ${min} : ${sec}`;
    }
    setInterval(setClock, 1000);

    initMap();
    const title = document.querySelector('.title');
    let writetask = document.querySelector('.writetask');
    let taskbutton = document.querySelector('.taskbutton');
    let checkboxlist = document.querySelector('.checkboxlist');
    const middlecontainer = document.querySelector('.middlecontainer');
    
    taskbutton.addEventListener('click', function() {
    taskbutton.classList.toggle('active'); 
    const checkboxlist = document.createElement('div');
    checkboxlist.setAttribute('class', 'checkboxlist');
    const new_checkbox = document.createElement('input');
    new_checkbox.type = 'checkbox';
    new_checkbox.setAttribute('class', 'checkbox');
    const label = document.createElement('label');
    const img = document.createElement('img');
    img.setAttribute('class', 'img');
    img.src="src/휴지통.png";
    label.setAttribute('class', 'checkboxlabel');
    
    new_checkbox.innerText=writetask.value;
    label.innerText=writetask.value;
    middlecontainer.appendChild(checkboxlist);
    checkboxlist.appendChild(new_checkbox);
    checkboxlist.appendChild(label);
    checkboxlist.appendChild(img);
    writetask.value="";

    new_checkbox.addEventListener("click", function() {
        if(new_checkbox.checked) {
            img.style.display='block';
            img.addEventListener('mouseover', function() {
                img.classList.toggle('imgclick');
            });
            img.addEventListener('click', function() {
                checkboxlist.remove();
            });
        } else {
            img.style.display='none';
        }
    });

});
const signin = document.querySelector('.container--signin');
const signin_email = document.querySelectorAll('.container--signin .input')[0];
const signin_pwd = document.querySelectorAll('.container--signin .input')[1];
const signin_btn = document.querySelector('.container--signin .btn');

signin_btn.addEventListener("click", function(e) {
    e.preventDefault();
    const email = signin_email.value;
    const pwd = signin_pwd.value;

    const userlist = JSON.parse(localStorage.getItem('users'));
    userlist.forEach(user => {
        if(user.email === email && user.password === pwd) {
            alert(`${user.name}님 반갑습니다.`);
            title.innerHTML=`${user.name}의 To do List`;
            writetask.placeholder =`${user.name}님 할 일을 기록하세요.`;
            signin.style.opacity='0';
            btnSignOut.style.display="block";
            btnSignOut.style.opacity=0.5;
        }
    });

    // if(Json.parse(localStorage.getItem('users').email) === email && Json.parse(localStorage.getItem('users').pwd) === pwd) {
    //     alert(`${localStorage.getItem('users').name} 님 반갑습니다.`);
    // } else {
    //     alert("회원가입 해주세요.");
    // }
});


const signup = document.querySelector('.container--signup');
const userinput = document.querySelectorAll('.container--signup .input')[0];
const emailinput = document.querySelectorAll('.container--signup .input')[1];
const pwdinput = document.querySelectorAll('.container--signup .input')[2];
const btn = document.querySelector('.container--signup .btn');
const leftcontainer2 = document.querySelector('.leftcontainer2');
const leftcontainer1 = document.querySelector('.leftcontainer1');
const btnSignitems = document.querySelectorAll('.btnSign button');
const btnSignOut= document.querySelector('.btnSignOut');
const colors = [
    "#ef5777",
    "#575fcf",
    "#4bcffa",
    "#34e7e4",
    "#0be881",
    "#f53b57",
    "#3c40c6",
    "#0fbcf9",
    "#00d8d6",
    "#05c46b",
    "#ffc048",
    "#ffdd59",
    "#ff5e57",
    "#d2dae2",
    "#485460",
    "#ffa801",
    "#ffd32a",
    "#ff3f34"
  ];

for(let i=0; i<btnSignitems.length; i++) {
    btnSignitems[i].addEventListener("click", function() {
        let random1 = Math.floor(Math.random()* colors.length);
        let random2 = Math.floor(Math.random()* colors.length);
        let background = `linear-gradient(${colors[random1]}, ${colors[random2]})`;
        btnSignitems[i].style.background = background;

        if(btnSignitems[i].innerHTML==="Sign In") { 
            leftcontainer1.classList.toggle("addanimation");
            if(leftcontainer1.classList.contains("addanimation")) {
                leftcontainer1.style.maxHeight = leftcontainer1.scrollHeight+"px"; 
            } 
            btnSignitems[i].style.display='none';
            btnSignitems[i+1].style.display='none';
        } else {
            leftcontainer2.classList.toggle("addanimation");
            if(leftcontainer2.classList.contains("addanimation")) {
                leftcontainer2.style.maxHeight = leftcontainer2.scrollHeight+"px"; 
            }
            btnSignitems[i-1].style.display='none';
            btnSignitems[i].style.display='none';

        }
    });
}

btn.addEventListener("click", function(e) {
    e.preventDefault();
    const user = userinput.value;
    const email = emailinput.value;
    const pwd = pwdinput.value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const isDuplicated = users.some((u) => u.email === email);

    if (isDuplicated) {
    alert("해당 이메일은 이미 가입되어 있습니다.");
    } else {
    const newUser = { name: user, email: email, password: pwd };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert("회원가입이 완료되었습니다.");
    leftcontainer2.style.opacity="0";
    setTimeout(function() {
        leftcontainer2.style.display = "none";
      }, 2000);

    }
    
});

const quotebtn = document.querySelector('.new-quote-btn');
const h1 = document.querySelector('.quotecontainer h1');
const quote = document.querySelector('.quote');

quotebtn.addEventListener("click", function(e) {
    fetch('https://api.quotable.io/random')
    .then(response => response.json())
    .then(data => {
        quotebtn.classList.toggle('active');
        h1.innerHTML=data.author;
        quote.innerHTML=data.content;
        // quoteEl.textContent = `"${data.content}" — ${data.author}`;
    })
    .catch(error => {
        // quoteEl.textContent = 'Sorry, something went wrong.';
        console.error(error);
    });
});




}

function initMap() {

    let weathercontainer = document.querySelector('.weather-container');
    navigator.geolocation.getCurrentPosition(function (postion) {

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${postion.coords.latitude}&lon=${postion.coords.longitude}&appid=0253e735f1704ac96f97ff71cd7e81bb&lang=kr`;
    fetch(url).then(response => response.json()).then(data => {
        const name = data.name;
        console.log(data);
        const temp = Math.ceil(Number(data.main.temp) - 273.15);
        const description = data.weather[0].description;
        weathercontainer.innerHTML = `
                <div>${name}</div>
                <div>${temp}°C</div>
                <div>${description}</div>
            `;
    });

    let map = document.querySelector('.map');
    navigator.geolocation.getCurrentPosition(function (position) {
    let option = {
        center: new kakao.maps.LatLng(postion.coords.latitude, postion.coords.longitude),
        level: 3   
    };
    let kakaomap = new kakao.maps.Map(map,option);
    kakaomap.panTo(option.center);
    let marker = new kakao.maps.Marker({
        position:option.center
    });

    marker.setMap(null);
    marker.setMap(kakaomap);
            
    }, function (error) {
        console.log(error);
    });
});

}



