let plan = document.getElementById('plane'); //获取飞机元素
//deg 飞机角度, ex 鼠标X轴, ey鼠标Y轴, vx vy 飞机元素的X，Y轴,  count 飞机移动的次数
let deg = 0,
	ex = 0,
	ey = 0,
	vx = 0,
	vy = 0,
	count = 0;
//当鼠标进入html 并移动时
window.addEventListener('mousemove', (e) => {
	//ex=鼠标的x轴 - 飞机元素X轴 - 飞机元素的像素宽度/2
	ex = e.x - plan.offsetLeft - plan.clientWidth / 2;
	ey = e.y - plan.offsetTop - plan.clientHeight / 2;
	
	deg = 360 * Math.atan(ey / ex) / (2 * Math.PI) + 45;
	//
	if (ex < 0) {
		deg += 180;
	}
	count = 0;
});

function draw() {
	plan.style.transform = 'rotate(' + deg + 'deg)';
	//count 移动多少次数 达到鼠标的位置   移动次数越小 移动越快
	if (count < 100) {
		//鼠标的位置分成100次累加
		vx += ex / 100;
		vy += ey / 100;
	}
	plan.style.left = vx + "px";
	plan.style.top = vy + "px";
	count++;
}
setInterval(draw, 1000 / 144);
