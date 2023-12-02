<script setup>
import { ref, onMounted } from 'vue'
import { order } from '../main.js'

var total = ref (0)

onMounted (function ()
{
  for (var item of order.value)
  {
    total.value += item.count * item.price
  }
})


function cancelAll ()
{
  order.value = []
  total.value = 0
}
</script>

<template>

<div class='-outer -big-spacer'>
  <div class='-inner -thin-spaced'>
    <p v-if='order.length == 0'>Empty yet…</p>
    <ul v-else class='-order-list -thin-spaced'>
      <li v-for='item in order' :key='item.id'>
        <div class='id'>{{ item.id }}</div>
        <div class='name'>{{ item.name }}</div>
        <div class='count'>{{ item.count }} шт.</div>
        <div class='price'>{{ item.price * item.count }}₽</div>
      </li>
    </ul>
    <p class='-price-total -big-spacer'>Итого: {{ total }}₽</p>
    <p><button class='-cancelator' @click='cancelAll'>Отменить всё</button></p>
  </div>
</div>

</template>


<style>
.-cancelator
{ width: auto;
  margin: auto;
  --input-size: 24px; }


.-order-list li + li
{ border-top: 1px solid var(--line-color);
  padding-top: 11px; }

.-order-list .id::before
{ content: '#'; }

.-order-list .name
{ font-weight: 600; }

@media (max-width: 639px)
{


  .-order-list .count::before
  { content: 'Количество: '; }

  .-order-list .price::before
  { content: 'Цена: '; }
}
@media (min-width: 640px)
{
  .-order-list li
  { display: flex;
    gap: 12px; }

  .-order-list .id
  { flex: 0 0 5ch; }

  .-order-list .name
  { flex: 1 1 240px; }

  .-order-list .count
  { flex: 0 0 6ch;
    text-align: end; }

  .-order-list .price
  { flex: 0 0 10ch;
    text-align: end; }
}


.-price-total
{ text-align: center; }
</style>