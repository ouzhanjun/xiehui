document.addEventListener('DOMContentLoaded', function() {
    // 轮播图功能
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    let currentSlide = 0;
    const slideCount = slides.length;

    // 显示指定索引的幻灯片
    function showSlide(index) {
        // 隐藏所有幻灯片
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        // 显示当前幻灯片
        slides[index].style.display = 'block';
    }

    // 自动轮播
    function autoSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
    }

    // 初始显示第一张幻灯片
    showSlide(currentSlide);

    let slideInterval = setInterval(autoSlide, 5000);

    // 上一张
    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        showSlide(currentSlide);
        slideInterval = setInterval(autoSlide, 5000);
    });

    // 下一张
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        currentSlide = (currentSlide + 1) % slideCount;
        showSlide(currentSlide);
        slideInterval = setInterval(autoSlide, 5000);
    });
}); 