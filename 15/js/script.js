// 页面加载完成后执行的函数
window.onload = function () {
  // 例如可以在这里添加一些动画效果相关的代码，以下是简单的改变导航栏链接颜色示例
  const navLinks = document.querySelectorAll('nav ul li a');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function () {
      this.style.color = '#ff6600';
    });
    link.addEventListener('mouseleave', function () {
      this.style.color = 'white';
    });
  });
  
  const images = document.querySelectorAll('.skill-icon img');
  
  images.forEach((image) => {
    image.addEventListener('mouseenter', function () {
      // 这里设置放大倍数为1.3倍，你可以根据需求自行调整
      this.style.width = this.offsetWidth * 1.3 + 'px';
      this.style.height = 'auto';
    });
  
    image.addEventListener('mouseleave', function () {
      this.style.width = ' 100px';
      this.style.height = 'auto';
    });
  });
  
  document.getElementById('toggleButton').addEventListener('click', function() {
      var sidebar = document.querySelector('.sidebar');
      if (sidebar.style.left === '0px') {
        sidebar.style.left = '-500px';
      } else {
        sidebar.style.left = '0px';
      }
    });
	
	// 获取按钮和页面内容的高度
	const backToTopButton = document.getElementById('backToTopButton');
	
	// 监听滚动事件
	window.addEventListener('scroll', function() {
	  const scrollHeight = window.pageYOffset || document.documentElement.scrollTop;
	  const windowHeight = window.innerHeight;
	
	  // 当页面滚动超过一定高度时显示按钮
	  if (scrollHeight > windowHeight*0.3) {
	    backToTopButton.style.display = 'block';
	  } else {
	    backToTopButton.style.display = 'none';
	  }
	});
	
	// 点击按钮返回顶部
	backToTopButton.addEventListener('click', function() {
	  window.scrollTo({top: 0, behavior: 'smooth'});
	});
	
	
	
	
	
};
