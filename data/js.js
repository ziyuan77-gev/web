//这里是[https://xhdndmm.cn/]的JavaScript部分
//东西太多就不写注释了
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

            document.getElementById('runtime_span').innerHTML = "网站在各种灾难中运行了: " + 
                years + "年 " + 
                days + "天 " + 
                hours + "小时 " + 
                minutes + "分 " + 
                seconds + "秒";
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
            var target = document.querySelector(this.getAttribute('href'));
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

}

let animationFrameId;

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'lime';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }

    animationFrameId = requestAnimationFrame(draw);
}

function startMatrixRain() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops.length = Math.floor(canvas.width / fontSize);
    drops.fill(0);
    animationFrameId = requestAnimationFrame(draw);
}

function stopMatrixRain() {
    cancelAnimationFrame(animationFrameId);
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopMatrixRain();
    } else {
        startMatrixRain();
    }
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drops.length = Math.floor(canvas.width / fontSize);
    drops.fill(0);
});

window.onload = function () {
    show_runtime();
    setupNavigation();
    document.querySelector('.section').classList.add('active');

    const center = document.querySelector('.center');
    setTimeout(() => {
        center.classList.add('loaded');
    }, 100);

    startMatrixRain();
};
