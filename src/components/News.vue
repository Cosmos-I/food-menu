<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { news, newsOpen, fetchNews } from '../main.js'


var router = useRouter ()
var cancel = () => {}


onUnmounted (cancel)
onMounted (async function ()
{
  if (news.value == 0)
    news.value = await fetchNews ()

  cancel = router.beforeEach (function (to)
  {
    if (to.name == 'newsopen')
      newsOpen.value = news.value.find ((item) => item.id == to.params.id)
  })
})
</script>


<template>

<div class='-outer -big-spacer'>
  <div class='-inner'>
    <p v-if='!news'>Loading…</p>
    <ul v-else class='-news-list'>
      <li v-for='item in news' :key='item.id'>
        <router-link :to='{ name: "newsopen",  params: { id: item.id }}'>
          <img :src='"/media/news/" + item.pict' :alt='item.name' loading='lazy'>
          <div class='info'>
            <div class='date'>{{ item.date }}</div>
            <div class='name'>{{ item.name }}</div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</div>

</template>


<style>
.-news-list
{ display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(190px, 100%), 1fr));
  gap: 24px; }

.-news-list .name
{ color: darkcyan;
  font-weight: 600; }

.-news-list img
{ aspect-ratio: 1 / 1;
  border-radius: 6px 6px 0 0;
  background-color: lightgray;
  user-select: none;
  -webkit-user-drag: none; }

.-news-list a
{ display: block;
  height: 100%;
  background-color: white;
  border-radius: 6px; }

.-news-list a:hover
{ box-shadow: 0 0 12px #0006; }

.-news-list .info
{ padding: 12px 12px 24px 12px; }

.-news-list .date
{ color: darkgray; }

@media (prefers-reduced-motion: no-preference)
{
  .-news-list a
  { transition: outline-offset 100ms linear, outline-color 100ms linear, box-shadow 100ms linear; }
}


.-news-open
{ background-color: white;
  padding: 24px 12px;
  border-radius: 6px; }

.-news-open hr
{ --line-color: #eee; }

.-news-open .pict
{ border-radius: 6px;
  background-color: lightgray;
  user-select: none;
  -webkit-user-drag: none; }

.-news-open .date
{ color: darkgray; }

.-news-open h1
{ flex: 1 1 320px;
  color: darkcyan; }


@media (min-width: 512px)
{
  .-news-open
  { padding: 24px; }

  .-news-open .pict
  { float: right;
    margin-left: 12px;
    width: 256px;
    aspect-ratio: 1 / 1; }
}
</style>