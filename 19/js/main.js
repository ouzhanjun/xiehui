// 初始化动画库
AOS.init({
    duration: 1000,
    once: true
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 导航栏滚动效果
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// 滚动视差效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const aboutImage = document.querySelector('.image-wrapper');
    if (aboutImage) {
        aboutImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// 数字增长动画
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// 当元素进入视口时触发数字动画
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numberElement = entry.target.querySelector('.number');
            if (numberElement && numberElement.innerHTML === '0') {
                const finalValue = numberElement.getAttribute('data-value');
                if (finalValue !== '∞') {
                    animateValue(numberElement, 0, parseInt(finalValue), 2000);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.highlight-item').forEach(item => {
    observer.observe(item);
});

// 技能进度条动画
const animateSkillBars = () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress-bar');
                const progress = entry.target.dataset.progress;
                progressBar.style.transform = `scaleX(${progress / 100})`;
            }
        });
    }, { threshold: 0.5 });

    skillItems.forEach(item => observer.observe(item));
};

// 添加鼠标悬停效果
const addSkillHoverEffects = () => {
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    });
};

// 初始化技能部分的动画
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
    addSkillHoverEffects();
});

// 项目过滤功能
const initProjectFilters = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新按钮状态
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 过滤项目
            const filterValue = btn.dataset.filter;
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.dataset.category === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
};

// 添加项目卡片动画
const addProjectCardEffects = () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
};

// 初始化项目展示部分
document.addEventListener('DOMContentLoaded', () => {
    initProjectFilters();
    addProjectCardEffects();
});

// 联系表单处理
const initContactForm = () => {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // 这里添加表单提交逻辑
            const formData = {
                name: form.querySelector('#name').value,
                email: form.querySelector('#email').value,
                subject: form.querySelector('#subject').value,
                message: form.querySelector('#message').value
            };
            
            // 示例：打印表单数据
            console.log('Form submitted:', formData);
            
            // 这里可以添加发送邮件或其他处理逻辑
            
            // 重置表单
            form.reset();
            
            // 显示成功消息
            alert('消息已发送！');
        });
    }
};

// 添加输入框焦点动画
const addInputEffects = () => {
    const inputs = document.querySelectorAll('.input-group input, .input-group textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
};

// 初始化联系部分
document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    addInputEffects();
});

// 微信二维码弹窗控制
const initWechatModal = () => {
    const modal = document.getElementById('wechatModal');
    const wechatLink = document.querySelector('.social-link[data-type="wechat"]');
    const closeBtn = modal.querySelector('.close-btn');

    // 打开弹窗
    wechatLink.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    });

    // 关闭弹窗的三种方式
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
};

// 地图功能
const initMap = () => {
    const locationCard = document.querySelector('.location-card');
    const mapModal = document.getElementById('mapModal');
    const closeBtn = mapModal.querySelector('.close-btn');
    let map = null;

    // 打开地图
    locationCard.addEventListener('click', () => {
        mapModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // 延迟初始化地图，确保容器已显示
        setTimeout(() => {
            if (!map) {
                map = new AMap.Map('map', {
                    zoom: 11,
                    center: [113.264385, 23.129112] // 广州坐标
                });
                
                // 添加标记
                new AMap.Marker({
                    position: [113.264385, 23.129112],
                    map: map
                });
            }
        }, 100);
    });

    // 关闭地图
    closeBtn.addEventListener('click', () => {
        mapModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    mapModal.addEventListener('click', (e) => {
        if (e.target === mapModal) {
            mapModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
};

// 添加语言切换功能
const translations = {
    zh: {
        nav: {
            home: '首页',
            about: '关于',
            skills: '技能',
            projects: '项目',
            contact: '联系'
        },
        hero: {
            greeting: '您好，我是',
            title: '全栈开发工程师 / 前端设计师 / 人工智能爱好者'
        },
        about: {
            title: '自我评价',
            intro: '热衷于探索前沿技术，专注于创造优秀的用户体验。我是一名充满激情的开发者，致力于将创意转化为现实。善于学习和接受新事物，具备良好的团队协作能力和问题解决能力。',
            education: {
                title: '教育背景',
                degree: '大专学历',
                major: '软件工程 - 广州白云学院'
            },
            specialties: {
                title: '专业方向',
                fullstack: {
                    title: '全栈开发',
                    desc: '专注于现代化Web应用开发，熟悉前后端技术栈'
                },
                ui: {
                    title: 'UI设计',
                    desc: '注重用户体验，擅长创造美观实用的界面设计'
                },
                ai: {
                    title: '人工智能',
                    desc: '对AI领域充满热情，持续学习最新技术发展'
                }
            },
            highlights: {
                experience: '年开发经验',
                projects: '实战项目',
                passion: '学习热情'
            }
        },
        skills: {
            title: '专业技能',
            frontend: {
                title: '前端开发',
                details: {
                    responsive: '响应式设计',
                    animation: '动画效果',
                    preprocessor: 'CSS预处理器',
                    es6: 'ES6+特性',
                    async: '异步编程',
                    dom: 'DOM操作',
                    component: '组件开发',
                    state: '状态管理',
                    routing: '路由控制'
                }
            },
            backend: {
                title: '后端开发',
                details: {
                    api: 'Web API开发',
                    database: '数据库集成',
                    mvc: 'MVC架构',
                    dataProcess: '数据处理',
                    automation: '自动化脚本',
                    webDev: 'Web开发'
                }
            },
            tools: {
                title: '开发工具'
            },
            awards: {
                title: '荣誉奖项',
                items: [
                    {
                        name: '2023年广东省计算机设计大赛',
                        type: '省级二等奖',
                        desc: '作品：基于深度学习的图像识别系统'
                    },
                    {
                        name: '2023年全国大学生创新业大赛',
                        type: '校级特等奖',
                        desc: '项目：智能校园管理系统'
                    },
                    {
                        name: '2022年互联网+创新创业大赛',
                        type: '省级三等奖',
                        desc: '项目：智能家居控制系统'
                    }
                ]
            }
        },
        projects: {
            title: '项目展示',
            filters: {
                all: '全部',
                web: 'Web应用',
                mobile: '移动端',
                admin: '管理后台'
            },
            details: {
                preview: '预览',
                source: '源码',
                stack: '技术栈'
            }
        },
        contact: {
            title: '联系我',
            email: '邮箱',
            phone: '电话',
            address: '地址',
            location: '中国，广州',
            form: {
                name: '您的姓名',
                email: '您的邮箱',
                subject: '主题',
                message: '留言内容',
                send: '发送消息'
            },
            wechat: {
                title: '扫描二维码添加微信'
            }
        },
        footer: {
            copyright: '© 2024 黄越强. All Rights Reserved.',
            motto: '「持续学习，不断进步」'
        }
    },
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            skills: 'Skills',
            projects: 'Projects',
            contact: 'Contact'
        },
        hero: {
            greeting: 'Hi, I am',
            title: 'Full Stack Developer / Frontend Designer / AI Enthusiast'
        },
        about: {
            title: 'About Me',
            intro: 'Passionate about exploring cutting-edge technologies and creating excellent user experiences. I am a dedicated developer committed to turning ideas into reality. Quick learner with strong teamwork and problem-solving abilities.',
            education: {
                title: 'Education',
                degree: 'Associate Degree',
                major: 'Software Engineering - Guangzhou Baiyun University'
            },
            specialties: {
                title: 'Specialties',
                fullstack: {
                    title: 'Full Stack',
                    desc: 'Focus on modern web development with full-stack expertise'
                },
                ui: {
                    title: 'UI Design',
                    desc: 'Create beautiful and functional user interfaces'
                },
                ai: {
                    title: 'AI',
                    desc: 'Passionate about AI, continuously learning new technologies'
                }
            },
            highlights: {
                experience: 'Years Experience',
                projects: 'Projects',
                passion: 'Learning Passion'
            }
        },
        skills: {
            title: 'Professional Skills',
            frontend: {
                title: 'Frontend Development',
                details: {
                    responsive: 'Responsive Design',
                    animation: 'Animation',
                    preprocessor: 'CSS Preprocessor',
                    es6: 'ES6+ Features',
                    async: 'Async Programming',
                    dom: 'DOM Manipulation',
                    component: 'Component Development',
                    state: 'State Management',
                    routing: 'Routing'
                }
            },
            backend: {
                title: 'Backend Development',
                details: {
                    api: 'Web API Development',
                    database: 'Database Integration',
                    mvc: 'MVC Architecture',
                    dataProcess: 'Data Processing',
                    automation: 'Automation Scripts',
                    webDev: 'Web Development'
                }
            },
            tools: {
                title: 'Development Tools'
            },
            awards: {
                title: 'Awards & Honors',
                items: [
                    {
                        name: '2023 Guangdong Computer Design Competition',
                        type: 'Provincial Second Prize',
                        desc: 'Project: Deep Learning Based Image Recognition System'
                    },
                    {
                        name: '2023 National College Student Innovation Competition',
                        type: 'School Special Prize',
                        desc: 'Project: Smart Campus Management System'
                    },
                    {
                        name: '2022 Internet+ Innovation & Entrepreneurship Competition',
                        type: 'Provincial Third Prize',
                        desc: 'Project: Smart Home Control System'
                    }
                ]
            }
        },
        projects: {
            title: 'Projects',
            filters: {
                all: 'All',
                web: 'Web Apps',
                mobile: 'Mobile',
                admin: 'Admin System'
            },
            details: {
                preview: 'Preview',
                source: 'Source',
                stack: 'Tech Stack'
            }
        },
        contact: {
            title: 'Contact Me',
            email: 'Email',
            phone: 'Phone',
            address: 'Address',
            location: 'Guangzhou, China',
            form: {
                name: 'Your Name',
                email: 'Your Email',
                subject: 'Subject',
                message: 'Message',
                send: 'Send Message'
            },
            wechat: {
                title: 'Scan QR Code to Add WeChat'
            }
        },
        footer: {
            copyright: '© 2024 Yueqiang Huang. All Rights Reserved.',
            motto: '"Keep Learning, Keep Growing"'
        }
    }
};

const updateContent = (currentLang) => {
    // 导航
    document.querySelectorAll('.nav-links a').forEach((link, index) => {
        const key = Object.keys(translations.zh.nav)[index];
        link.textContent = translations[currentLang].nav[key];
    });

    // 首页
    document.querySelector('.hero-content h1 span:first-child').textContent = 
        translations[currentLang].hero.greeting;
    document.querySelector('.hero-content p').textContent = 
        translations[currentLang].hero.title;

    // 关于部分
    document.querySelector('.about-content h2').textContent = 
        translations[currentLang].about.title;
    document.querySelector('.about-content .intro').textContent = 
        translations[currentLang].about.intro;
    
    // 教育背景
    document.querySelector('.education h3').textContent = 
        translations[currentLang].about.education.title;
    document.querySelector('.timeline-item h4').textContent = 
        translations[currentLang].about.education.degree;
    document.querySelector('.timeline-item p').textContent = 
        translations[currentLang].about.education.major;

    // 专业方向
    document.querySelector('.specialties h3').textContent = 
        translations[currentLang].about.specialties.title;
    
    const specialtyItems = document.querySelectorAll('.specialty-item');
    specialtyItems[0].querySelector('h4').textContent = 
        translations[currentLang].about.specialties.fullstack.title;
    specialtyItems[0].querySelector('p').textContent = 
        translations[currentLang].about.specialties.fullstack.desc;
    
    specialtyItems[1].querySelector('h4').textContent = 
        translations[currentLang].about.specialties.ui.title;
    specialtyItems[1].querySelector('p').textContent = 
        translations[currentLang].about.specialties.ui.desc;
    
    specialtyItems[2].querySelector('h4').textContent = 
        translations[currentLang].about.specialties.ai.title;
    specialtyItems[2].querySelector('p').textContent = 
        translations[currentLang].about.specialties.ai.desc;

    // 技能部分
    document.querySelector('.skills .section-title').textContent = 
        translations[currentLang].skills.title;
    
    // 项目部分
    document.querySelector('.projects .section-title').textContent = 
        translations[currentLang].projects.title;
    
    // 联系部分
    document.querySelector('.contact .section-title').textContent = 
        translations[currentLang].contact.title;
    
    // 表单
    document.querySelectorAll('.input-group label').forEach(label => {
        const inputId = label.getAttribute('for');
        label.textContent = translations[currentLang].contact.form[inputId];
    });
    
    document.querySelector('.submit-btn').textContent = 
        translations[currentLang].contact.form.send;

    // 页脚
    document.querySelector('.footer-content p:first-child').textContent = 
        translations[currentLang].footer.copyright;
    document.querySelector('.footer-quote').textContent = 
        translations[currentLang].footer.motto;

    // 更新荣誉奖项
    document.querySelector('.awards-section h3').textContent = 
        translations[currentLang].skills.awards.title;
    
    const awardCards = document.querySelectorAll('.award-card');
    awardCards.forEach((card, index) => {
        const award = translations[currentLang].skills.awards.items[index];
        card.querySelector('h4').textContent = award.name;
        card.querySelector('.award-type').textContent = award.type;
        card.querySelector('.award-desc').textContent = award.desc;
    });
};

const initLanguageSwitch = () => {
    const langSwitch = document.getElementById('langSwitch');
    let currentLang = 'zh';

    langSwitch.addEventListener('click', () => {
        currentLang = currentLang === 'zh' ? 'en' : 'zh';
        const langText = currentLang === 'zh' ? 'EN' : '中';
        langSwitch.querySelector('.lang-text').textContent = langText;
        
        updateContent(currentLang);
    });
};

// 在 DOMContentLoaded 中初始化
document.addEventListener('DOMContentLoaded', () => {
    // ... 其他初始化代码
    initWechatModal();
    initMap();
    initLanguageSwitch();
}); 