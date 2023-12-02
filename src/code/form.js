document.querySelectorAll ('select, textarea, input').forEach (disableFocus)
document.querySelectorAll ('.-textarea textarea').forEach (replicateTextarea)
document.querySelectorAll ('[type=file]').forEach (fixCustomFile)
document.querySelectorAll ('[type=range]').forEach (fixRangeProgress)
var rangeWatcher = new ResizeObserver (onSliderResize)
document.querySelectorAll ('.-slider').forEach (initSlider)






function disableFocus (v)
{
  v.addEventListener ('mousedown', addClass)
  v.addEventListener ('blur', removeClass)
}
function addClass () { this.classList.add ('-murine') }
function removeClass () { this.classList.remove ('-murine') }



function replicateTextarea (v)
{
  v.addEventListener ('input', onTextareaInput)
  v.addEventListener ('focus', onTextareaInput, { once: true })
}
function onTextareaInput () { this.parentNode.dataset.replicatedValue = this.value }



function fixRangeProgress (v)
{
  if (v.closest ('.-slider, input-slider'))  return
  onRangeRedraw.call (v)
  v.addEventListener ('input', onRangeRedraw)
  v.addEventListener ('redrawrange', onRangeRedraw)
}
function onRangeRedraw ()
{
  var min = +this.min || 0
  var max = +this.max || 100
  var val = +this.value
  var size = (val - min) / (max - min) * 100
  if (getComputedStyle (this).direction == 'rtl')
    this.style.setProperty ('--start-dir', 'right')
  this.style.setProperty ('--range-progress-size', size + '%')
}



function fixCustomFile (v)
{
  if (!v.dataset.label)  v.dataset.label = 'Choose File'
  v.dataset.defaultLabel = v.dataset.label

  var label = v.closest ('.-file')
  if (label)  label.dataset.label = v.dataset.label

  v.addEventListener ('change', onFileChange)
  v.form?.addEventListener ('reset', onFileChange.bind (v))
}
function onFileChange (e)
{
  var files = this.files
  var bytes = 0
  var max = this.dataset.max |0

  for (let file of files)
    bytes += file.size

  if (e.type == 'reset'  ||  files.length == 0)
    this.dataset.label = this.dataset.defaultLabel || 'Choose File'
  else
  if (max  &&  bytes > max)
  {
    this.value = ''
    this.dataset.label = this.dataset.labelForMax || `Max size ${max} bytes`
  }
  else
  if (files.length == 1)
    this.dataset.label = files [0].name
  else
  {
    let s = this.dataset.labelForMultiple || '* files'
    this.dataset.label = s.replace ('*', files.length)
  }

  var label = this.closest ('.-file')
  if (label)  label.dataset.label = this.dataset.label
}


/*
new MutationObserver ((entries, observer) =>
{
  for (var entry of entries)
  for (var node of entry.addedNodes)
  {
    let { tagName : tag,  type,  nodeType } = node

    if (nodeType != Node.ELEMENT_NODE)
      continue

    if (tag == 'INPUT'  ||  tag == 'SELECT'  ||  tag == 'TEXTAREA')
      disableFocus (node)

    // if (tag == 'TEXTAREA')
    //   enableAutoExpand (node)
    if (node.classList.contains ('-textarea'))
      replicateTextarea (node)

    if (type == 'range'  &&  tag == 'INPUT'  &&  !isNativeProgress)
      fixCustomRange (node)

    if (type == 'file'  &&  tag == 'INPUT')
      fixCustomFile (node)
  }
})
.observe (document.documentElement,  { childList: true,  subtree: true })
*/






function initSlider (range)
{
  var min, max

  range.querySelectorAll ('[type=range]').forEach ((input, index) =>
  {
    if (index == 0)
    {
      min = input.min
      max = input.max
      onSliderInput.call (input)
      onSliderChange.call (input)
    }

    if (index > 1)  return

    if (input.min != min  ||  input.max != max)
      console.warn ('RangeInputs have different attributes [min] or [max]')

    input.addEventListener ('input', onSliderInput)
    input.addEventListener ('change', onSliderChange)
    input.addEventListener ('gotpointercapture', onSliderPointerCapture)
    input.addEventListener ('lostpointercapture', onSliderPointerCapture)
  })
  rangeWatcher.observe (range)
}


function onSliderResize (entries)
{
  for (var entry of entries)
    entry.target.style.setProperty ('--width', entry.target.offsetWidth + 'px')
}


function onSliderPointerCapture (e)
{
  this.closest ('.-slider')?.querySelector ('.w')?.classList.toggle ('captured', e.type == 'gotpointercapture')
}


function onSliderInput ()
{
  var range = this.closest ('.-slider')
  if (!range)  return

  var inputs = range.querySelectorAll ('[type=range]')
  if (inputs.length < 2)  return

  var len = (inputs [0].max == '' ? 100 : +inputs [0].max) - inputs [0].min
  var v1 = +inputs [0].value / len
  var v2 = +inputs [1].value / len
  var min = Math.min (v1, v2)*100 + '%'
  var max = Math.max (v1, v2)*100 + '%'

  range.style.setProperty ('--min', min)
  range.style.setProperty ('--max', max)
}


function onSliderChange ()
{
  var range = this.closest ('.-slider')
  if (!range)  return

  var inputs = range.querySelectorAll ('[type=range]')
  if (inputs.length < 2)  return

  var o1 = inputs [0]
  var o2 = inputs [1]

  if (+o1.value < +o2.value)  return

  o1.replaceWith (o2)
  range.append (o1)
}