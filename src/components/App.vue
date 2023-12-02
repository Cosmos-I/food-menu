<script setup>
import { order } from '../main.js'
import { ref, computed } from 'vue'


var total = computed (function ()
{var total = 0
  for (var item of order.value)
  {
    total += item.count
  }
  return total
})


function totalItems ()
{
  for (var item of order.value)
  {
    total.value += item.count
  }
}
</script>

<template>

  <div class='-outer'>
    <div class='-inner'>
      <img class='-logo' src='/media/logo.png' alt='Ешь и Пей. Ресторан доствки высокой кухни'>
    </div>
  </div>

  <div class='-outer -spacer -sticky'>
    <div class='-inner'>
      <div class='-menu -undecored-a'>
        <router-link :to='{ name: "news" }'>Акции</router-link>
        <router-link :to='{ name: "menu" }'>Меню</router-link>
        <router-link :to='{ name: "cart" }'>Заказано<sup v-if='total > 0' class='badge'>{{ total }}</sup></router-link>
      </div>
    </div>
  </div>

  <router-view></router-view>

  <!-- <router-view v-slot='{ Component, route }'>
    <transition name='fade'>
      <component :is='Component' :key='route.path'/>
    </transition>
  </router-view> -->

</template>

<!-- <style>
.fade-enter-active,
.fade-leave-active
{ transition: opacity 0.5s linear; }

.fade-enter-from,
.fade-leave-to
{ opacity: 0; }
</style> -->





<style>
.-logo
{ box-sizing: content-box;
  width: 150px;
  height: 130px;
  padding: 12px;
  margin: auto;
  border-block: 3px solid lightseagreen;
  border-inline: 3px double lightseagreen;
  user-select: none;
  -webkit-user-drag: none;
  filter: drop-shadow(0px 0px 3px #0003); }

.-sticky
{ position: sticky;
  top: 0;
  backdrop-filter: blur(3px);
  background-color: #eeec;
  outline: 1px solid #00808022;
  z-index: 2; }

.-menu
{ display: flex;
  gap: 12px 24px;
  justify-content: center;
  flex-wrap: wrap;
  padding: 12px 0;
  font-size: 22px;
  line-height: 24px;
  color: teal;
  --link-decoration-color: mediumturquoise; }

.-menu .badge
{ display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 14px;
  padding: 1px 3px;
  font-size: 12px;
  line-height: 1;
  background-color: tomato;
  color: white;
  border-radius: 1em;
  user-select: none; }
</style>