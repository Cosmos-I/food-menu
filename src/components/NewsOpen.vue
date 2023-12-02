<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { newsOpen, fetchNews } from '../main.js'


var router = useRouter ()
var route = useRoute ()


onMounted (async function ()
{
  if (!newsOpen.value  ||  newsOpen.id != route.params.id)
  {
    var news = await fetchNews ()
    newsOpen.value = news.find ((item) => item.id == route.params.id)
  }
})
</script>


<template>

<div class='-outer -big-spacer'>
  <div class='-inner -thin-spaced -news-open -clrfix'>
    <div class='-dual'>
      <h1>{{ newsOpen.name }}</h1>
      <p class='date'>{{ newsOpen.date }}</p>
    </div>
    <hr>
    <img class='pict' :src='"/media/news/" + newsOpen.pict' :alt='newsOpen.name'>
    <p class='desc'>{{ newsOpen.desc }}</p>
  </div>
</div>

</template>
