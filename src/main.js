import './code/main.css'
import './code/form.css'
import { createApp, ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './components/App.vue'
import News from './components/News.vue'
import NewsOpen from './components/NewsOpen.vue'
import Menu from './components/Menu.vue'
import Cart from './components/Cart.vue'


var app = createApp (App)
var router = createRouter (
{
  history: createWebHistory (),
  routes:
  [
    { name: 'news', path: '/', component: News },
    { name: 'newsopen', path: '/news-:id', component: NewsOpen },
    { name: 'menu', path: '/menu', component: Menu },
    { name: 'cart', path: '/cart', component: Cart }
  ]
})



export var news = ref (0)
export var newsOpen = ref (0)

export async function fetchNews ()
{
  var data = await fetch ('./json/news.json', {method: 'POST'})
  var news = await data.json ()
  await time (1000)
  return news
}

export var foods = ref (0)
export async function fetchFoods ()
{
  var data = await fetch ('./json/food.json', {method: 'POST'})
  var foods = await data.json ()
  await time (1000)
  return foods
}
export var order = ref ([])

export var cat = ref ('all')



app.use (router)
app.mount ('#app')



function time (ms) { return new Promise ((res) => setTimeout (res, ms)) }