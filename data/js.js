async function show_runtime() {
    setTimeout(show_runtime, 1000);

    try {
        const response = await fetch('/time_api');
        const data = await response.json();
        console.log("Fetched data:", data);

        if (data.time_api) { 
            const startDate = new Date("2024-06-28T12:32:00Z"); //为了同步时间 把网站开始运行时间改为UTC
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

            document.getElementById('current_time_span').innerHTML = 
            "当前时间：" + ntpDate.toLocaleString('zh-CN', { hour12: false });
        } else {
            console.error("No time_api in response:", data);
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

    AOS.init({
        duration: 1000,
        once: true,
    });
}