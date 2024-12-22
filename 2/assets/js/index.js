// 切换菜单内容
document.querySelectorAll('.navbar ul li').forEach(item => {
  item.addEventListener('click', () => {
    const target = item.getAttribute('data-target');
    console.log("123");
    // 切换内容
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(target).classList.add('active');
  });
});



// 动态文字效果
const dynamicText = document.querySelector('.dynamic-text');
let textArray = ["Web Developer", "Creative Thinker", "Problem Solver"];
let textIndex = 0;
setInterval(() => {
  dynamicText.textContent = textArray[textIndex];
  textIndex = (textIndex + 1) % textArray.length;
}, 3000);

// 动态技能条
document.querySelectorAll('.progress-bar').forEach(bar => {
  const progress = bar.getAttribute('data-progress');
  bar.style.setProperty('--progress', `${progress}%`);
  bar.style.width = `${progress}%`;
});



// 获取 DOM 元素
const themeToggleButton = document.getElementById("theme-toggle");
const bodyElement = document.body;
const navElement = document.querySelector("nav");

// 检查是否有保存的主题选择
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  bodyElement.classList.add(savedTheme);
  navElement.classList.add(savedTheme);
  themeToggleButton.textContent = savedTheme === "dark-theme" ? "☀️" : "🌙";
}

// 主题切换逻辑
themeToggleButton.addEventListener("click", () => {
  // 切换 body 和 nav 的主题类
  const isDarkTheme = bodyElement.classList.toggle("dark-theme");
  navElement.classList.toggle("dark-theme");

  // 切换按钮图标
  themeToggleButton.textContent = isDarkTheme ? "☀️" : "🌙";

  // 保存选择到 localStorage
  localStorage.setItem("theme", isDarkTheme ? "dark-theme" : "");
});



//项目卡片
// 项目信息
const projectDetails = {
  1: {
    title: "Project One",
    description: "C#+UI BLL DLL",
    image: "assets/images/P1.jpg",
  },
  2: {
    title: "Project Two",
    description: "HTML+CSS+Jquery+Node.JS+MySQL",
    image: "assets/images/P2.jpg",
  },
  3: {
    title: "More Project",
    description: "Please stay tuned.",
    
  },
};

// 获取模态框元素
const modal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalImage = document.getElementById("modal-image");
const closeModal = document.querySelector(".close-modal");

// 添加按钮点击事件
document.querySelectorAll(".view-project").forEach((button) => {
  button.addEventListener("click", () => {
    const projectId = button.dataset.project;
    const project = projectDetails[projectId];

    // 更新模态框内容
    modalTitle.innerText = project.title;
    modalDescription.innerText = project.description;
    modalImage.src = project.image;

    // 显示模态框
    modal.classList.remove("hidden");
    modal.style.display = "flex";
  });
});

// 关闭模态框
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});




// 语言切换
// 语言内容对象
// 语言内容对象
const languages = {
  en: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    greeting: "Welcome to My Creative Space",
    aboutMe: "Hi, I'm Mr.Tang",
    description: "A passionate developer specializing in front-end and back-end separation, dedicated to learning cutting-edge technologies. Skilled in leveraging the latest tools and frameworks to build modern web applications.",
    skillsTitle: "My Skills",
    projectsTitle: "My Projects",
    contactMe: "Contact Me",
    sendButton: "Send",
  },
  zh: {
    home: "首页",
    about: "关于我",
    skills: "技能",
    projects: "项目",
    contact: "联系我",
    greeting: "欢迎来到我的创意空间",
    aboutMe: "你好，我是唐泽洋",
    description: "一位充满激情的前后端分离式开发者和热爱学习最新前沿的技术，擅长使用最新技术构建现代化Web应用程序",
    skillsTitle: "我的技能",
    projectsTitle: "我的项目",
    contactMe: "联系我们",
    sendButton: "发送",
  },
};

// 切换语言函数
function switchLanguage(lang) {
  document.querySelector('[data-target="home"]').innerText = languages[lang].home;
  document.querySelector('[data-target="about"]').innerText = languages[lang].about;
  document.querySelector('[data-target="skills"]').innerText = languages[lang].skills;
  document.querySelector('[data-target="projects"]').innerText = languages[lang].projects;
  document.querySelector('[data-target="contact"]').innerText = languages[lang].contact;
  document.querySelector('#home h1').innerText = languages[lang].greeting;
  document.querySelector('#about h2').innerText = languages[lang].aboutMe;
  document.querySelector('#about p').innerText = languages[lang].description;
  document.querySelector('#skills h2').innerText = languages[lang].skillsTitle;
  document.querySelector('#projects h2').innerText = languages[lang].projectsTitle;
  document.querySelector('#contact h2').innerText = languages[lang].contactMe;
  document.querySelector('#contact button').innerText = languages[lang].sendButton;
}

// 初始化默认语言
document.addEventListener("DOMContentLoaded", () => {
  const languageToggle = document.getElementById("language-toggle");

  // 切换语言事件监听
  languageToggle.addEventListener("change", (e) => {
    const selectedLanguage = e.target.value;
    switchLanguage(selectedLanguage);
  });

  // 初始化为默认语言 (英文)
  switchLanguage("en");
});



