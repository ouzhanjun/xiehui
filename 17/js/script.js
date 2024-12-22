   // 示例：点击按钮显示隐藏内容
   document.addEventListener('DOMContentLoaded', function() {
    var btn = document.createElement('button');
    btn.textContent = '显示更多';
    btn.addEventListener('click', function() {
        // 添加显示更多内容的逻辑
    });
    document.body.appendChild(btn);
});