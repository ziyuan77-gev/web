//[https://github.com/xhdndmm/web]
//[https://xhdndmm.cn/]
async function show_runtime() {
    setTimeout(show_runtime, 1000);

    try {
        const response = await fetch('/time_api');
        const data = await response.json();
        console.log("Fetched data:", data);

        if (data.time_api) { 
            const startDate = new Date("2024-06-28T12:32:00Z");
            const ntpDate = new Date(data.time_api);

            const timeDiff = ntpDate - startDate;
            const msPerSecond = 1000;
            const msPerMinute = msPerSecond * 60;
            const msPerHour = msPerMinute * 60;
            const msPerDay = msPerHour * 24;
            const msPerYear = msPerDay * 365.25;

            const years = Math.floor(timeDiff / msPerYear);
            const days = Math.floor((timeDiff % msPerYear) / msPerDay);
            const hours = Math.floor((timeDiff % msPerDay) / msPerHour);
            const minutes = Math.floor((timeDiff % msPerHour) / msPerMinute);
            const seconds = Math.floor((timeDiff % msPerMinute) / msPerSecond);

            document.getElementById('runtime_span').innerHTML = `网站在各种灾难中运行了: ${years}年 ${days}天 ${hours}小时 ${minutes}分 ${seconds}秒`;
        }
    } catch (error) {
        console.error('请求失败:', error);
    }
}

function setupNavigation() {
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                setTimeout(() => {
                    target.classList.add('active');
                }, 100); 
            }
        });
    });
}

window.onload = function() {
    show_runtime();
    setupNavigation();
    document.querySelector('.section').classList.add('active');
    
    const center = document.querySelector('.center');
    setTimeout(() => {
        center.classList.add('loaded');
    }, 100);

    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    const fontSize = 15;
    const columns = Math.floor(W / fontSize);  
    const drops = Array(columns).fill(0);

    const str = "0123456789qwertyuiopasdfghjklzxcvbnm";

    function draw() {
        context.fillStyle = "rgba(0,0,0,0.05)";
        context.fillRect(0, 0, W, H);
        context.font = `${fontSize}px arial`;
        context.fillStyle = "green";

        for (let i = 0; i < columns; i++) {
            const index = Math.floor(Math.random() * str.length);
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            context.fillText(str[index], x, y);

            if (y >= canvas.height && Math.random() > 0.92) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    function randColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
    }

    draw();
    setInterval(draw, 30);
}