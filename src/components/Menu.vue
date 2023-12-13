<script setup>
import { onMounted } from 'vue'
import { foods, fetchFoods, order, cat } from '../main.js'


onMounted (async function ()
{
  if (foods.value == 0)
  {
    var foodList = await fetchFoods ()
    foods.value = foodList
  }
})


function inc (item)
{
  var currentOrder = order.value.find ((elm) => elm.id == item.id)
  if (!currentOrder)
  {
    order.value.push ({ id: item.id,  count: 1,  name: item.name, price: item.price })
  }
  else
  {
    currentOrder.count ++
  }
}

function dec (item)
{
  var currentOrder = order.value.find ((elm) => elm.id == item.id)
  if (currentOrder)
  {
    currentOrder.count --
    if (currentOrder.count <=0)
    {
      var i = order.value.indexOf (currentOrder)
      order.value.splice (i,1)
    }
  }
}

function getCount (item)
{
  var currentOrder = order.value.find ((elm) => elm.id == item.id)
  if (currentOrder)
    return currentOrder.count
  else
    return 0
}

function getSum (item)
{
  var currentOrder = order.value.find ((elm) => elm.id == item.id)
  if (currentOrder)
    return currentOrder.count * item.price
  else
    return 0
}


function inAccepted (s)
{
  if (cat.value == 'all')
    return true
  else
    return cat.value == s
}
</script>


<template>

<div class='-outer -big-spacer'>
  <div class='-inner -controls'>
    <div class='-toggle'>
      <input type='radio' name='iamcontrol' id='controls_all' value='all' v-model='cat'>
      <label for='controls_all'>Всё и сразу</label>
    </div>
    <div class='-toggle'>
      <input type='radio' name='iamcontrol' id='controls_water' value='water' v-model='cat'>
      <label for='controls_water'>Вода</label>
    </div>
    <div class='-toggle'>
      <input type='radio' name='iamcontrol' id='controls_beverage' value='beverage' v-model='cat'>
      <label for='controls_beverage'>Напитки</label>
    </div>
    <div class='-toggle'>
      <input type='radio' name='iamcontrol' id='controls_fish' value='fish' v-model='cat'>
      <label for='controls_fish'>Рыбов</label>
    </div>
    <div class='-toggle'>
      <input type='radio' name='iamcontrol' id='controls_meat' value='meat' v-model='cat'>
      <label for='controls_meat'>Мясо</label>
    </div>
    <div class='-toggle'>
      <input type='radio' name='iamcontrol' id='controls_pie' value='pie' v-model='cat'>
      <label for='controls_pie'>Пироги</label>
    </div>
    <div class='-toggle'>
      <input type='radio' name='iamcontrol' id='controls_pizza' value='pizza' v-model='cat'>
      <label for='controls_pizza'>Пицца</label>
    </div>
    <div class='-toggle'>
      <input type='radio' name='iamcontrol' id='controls_salad' value='salad' v-model='cat'>
      <label for='controls_salad'>Салаты</label>
    </div>
    <div class='-toggle'>
      <input type='radio' name='iamcontrol' id='controls_sausage' value='sausage' v-model='cat'>
      <label for='controls_sausage'>Сосиски</label>
    </div>
    <div class='-toggle'>
      <input type='radio' name='iamcontrol' id='controls_soup' value='soup' v-model='cat'>
      <label for='controls_soup'>Супы</label>
    </div>
  </div>
</div>

<div class='-outer -big-spacer'>
  <div class='-inner'>
    <p v-if='!foods'>Loading…</p>
    <ul v-else class='-food-list'>
      <template v-for='item in foods' :key='item.id'>
        <li v-show='inAccepted (item.cat)'>
          <div class='top'>
            <img :src='"/media/food/" + item.pict' :alt='item.name' loading='lazy'>
            <p class='price-per-one'>{{ item.price }}₽</p>
          </div>
          <div class='info' :class='{ inactive: getCount (item) <= 0 }'>
            <p class='name'>{{ item.name }}</p>
            <p class='price'>{{ getSum (item) }}₽</p>
            <p class='count'>
              <button class='sub' @click='dec (item)'>−</button>
              <span>{{ getCount (item) }}</span>
              <button class='add' @click='inc (item)'>+</button>
            </p>
          </div>
        </li>
      </template>
    </ul>
  </div>
</div>

</template>


<style>
.-controls
{ display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 130px), 1fr));
  gap: 6px 12px; }


.-food-list
{ display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(190px, 100%), 1fr));
  gap: 24px; }

.-food-list img
{ aspect-ratio: 1 / 1;
  border-radius: 6px 6px 0 0;
  background-color: lightgray;
  user-select: none;
  -webkit-user-drag: none; }

.-food-list li
{ display: flex;
  flex-direction: column;
  height: 100%;
  background-color: white;
  border-radius: 6px; }

.-food-list .info
{ padding: 12px;
  display: flex;
  flex-direction: column;
  height: 100%; }

.-food-list .info.inactive :where(.count .sub, .count span, .price)
{ opacity: 0.1; }


.-food-list .name
{ color: darkcyan;
  font-weight: 600;
  margin-bottom: auto; }

.-food-list .name,
.-food-list .price
{ text-align: center; }

.-food-list .price
{ margin-top: 24px; }

.-food-list .count
{ display: grid;
  grid-template-columns: 32px 1fr 32px;
  align-items: center; }

.-food-list .count button
{ --input-size: 32px;
  --button-bg-color: whitesmoke;
  border-radius: 6px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: math;
  color: var(--line-color); }

.-food-list .count button:hover
{ color: var(--focus-color); }

.-food-list .count span
{ padding: 0 12px;
  text-align: center; }

.-food-list .top
{ position: relative; }

.-food-list .top .price-per-one
{ position: absolute;
  top: 6px;
  right: 6px;
  padding: 6px;
  font-size: 24px;
  line-height: 24px;
  color: white;
  background-color: #0006;
  text-shadow: 1px 1px 0 #000;
  border-radius: 3px; }
</style>