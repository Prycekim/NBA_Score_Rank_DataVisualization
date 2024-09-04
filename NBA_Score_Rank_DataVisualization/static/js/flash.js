

document.addEventListener('DOMContentLoaded', function() {
    // 动画结束后，随机选择背景图
    const backgroundImages = ['../static/images/ocean.jpg', '../static/images/ocean1.jpg', '../static/images/ocean3.jpg'];

    const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

    document.body.style.backgroundImage = `url(${randomImage})`;
    // 在动画结束后隐藏欢迎屏幕
    const welcomeScreen = document.getElementById('welcome-screen');
    welcomeScreen.addEventListener('animationend', function() {
        welcomeScreen.style.display = 'none';

    });
});




