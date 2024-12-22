// 当页面载入的时候加载这个函数
    window.onload = function()
    {

    // 获取大盒子的内容 为content的第一个元素 也就是ul中的内容
    var content = this.document.getElementsByClassName("content")[0];

    // 获取ul中的li
    var li = content.getElementsByTagName("li");

    // 函数传入两个参数，(i,j)
    function fun(i, j)
    {//转换图片函数，就是把透明度改了一下        
        li[i].style.opacity=1;
        li[j].style.opacity=0;

        // 然后也把小图标的颜色改一下
        // 把图标改成白色
        // 如果图片数量发生改变 那么下面的3也要变成图片的数量
        li[i + 3].style.backgroundColor = "#ffffff";

        // 把图标改成透明
        li[j + 3].style.backgroundColor = "#00000000";
    }

    // 默认情况下轮播图为第一张
    fun(0, 1);//初始化下
    var i = 0;
    function auto()
    {//轮播循环函数
        i ++;
        // 当数组越界的时候
        if(i >= 3)
        {
        // 置为0
            i = 0;
            // 然后递归重新开始
            // 这里的2位3-1的意思
            fun(0, 2);
        }
        else
        {
            // 反之递归
            fun(i, i - 1);
        } 
    }
    // 设置变化的时间
    timer = this.setInterval(auto, 2000);

    // 设置鼠标在轮播图上的时候 轮播图就停止播放
    content.onmouseover = function () 
    { 
        //鼠标划上去，停止轮播
        clearInterval(timer);
    }

    // 设置鼠标在轮播图上的时候 轮播图就继续播放
    content.onmouseout = function () 
    { 
        //鼠标划出，继续轮播
        timer = setInterval(auto, 2000); //调用定时器
    }
    var j = 0;
    for(; j < 3; j++)
    {
        //点击小图标也可以转换图片
        li[j + 3].index = j;
        // 当点击小图标进行的函数
        li[j + 3].onclick = function()
        {
            fun(this.index, i)
            i = this.index;
        }
    }
}