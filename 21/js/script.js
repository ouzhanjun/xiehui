// 页面加载完成后执行以下代码
window.onload = function() {
  // 导航栏链接点击事件处理，实现平滑滚动效果
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior:'smooth' });
      }
    });
  });

  // 项目详情链接点击事件处理（）
  const projectLinks = document.querySelectorAll('.project-link');
  projectLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      alert('跳转功能尚未实现请手动打开喔');
    });
  });

  // 为每个项目项设置自定义属性 --index，用于动画延迟控制
  const projectItems = document.querySelectorAll('.project-item');
  projectItems.forEach((item, index) => {
    item.style.setProperty('--index', index);
  });
};


