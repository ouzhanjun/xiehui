<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
    <nav class="fixed w-full bg-opacity-90 bg-gray-900 backdrop-blur-sm z-50">
      <div class="container mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="text-2xl font-bold text-white">您的名字</div>
          <div class="hidden md:flex space-x-8">
            <a href="#home" class="text-gray-300 hover:text-white transition">首页</a>
            <a href="#about" class="text-gray-300 hover:text-white transition">关于</a>
            <a href="#skills" class="text-gray-300 hover:text-white transition">技能</a>
            <a href="#projects" class="text-gray-300 hover:text-white transition">项目</a>
            <a href="#contact" class="text-gray-300 hover:text-white transition">联系</a>
          </div>
        </div>
      </div>
    </nav>

    <section id="home" class="h-screen flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-white mb-4">
          <span class="block" v-motion-slide-visible-bottom>您好，我是</span>
          <span class="block text-blue-500" v-motion-slide-visible-bottom>您的名字</span>
        </h1>
        <p class="text-xl text-gray-400" v-motion-slide-visible-bottom>
          全栈开发工程师 / UI设计师 / 技术专家
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'

onMounted(() => {
  gsap.from(".text-6xl span", {
    duration: 1,
    y: 100,
    opacity: 0,
    stagger: 0.2,
    ease: "power4.out"
  })
})
</script> 