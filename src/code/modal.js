var log = console.log
var isHasSupport = CSS.supports ('selector(:has(.x))')
document.addEventListener ('pointerdown', onPointer)
document.addEventListener ('pointerup', onPointer)
document.querySelectorAll ('dialog.-modal').forEach (initModal)
window.addEventListener ('resize', onResize)
onResize ()


function initOpener (o) { o.addEventListener (o.tagName == 'FORM' ? 'submit' : 'click', onOpen) }
function initCloser (o) { o.addEventListener (o.tagName == 'FORM' ? 'submit' : 'click', onClose) }
function initModal (o)
{
  o.querySelectorAll ('[data-close]').forEach (initCloser)
  if (o.id)  document.querySelectorAll (`[data-modal="${ o.id }"]`).forEach (initOpener)
  if (!isHasSupport)  o.addEventListener ('close', onFirefox)
}


function onPointer (e)
{
  if (!e.isPrimary)  return

  var modal = Array.from (document.querySelectorAll ('.-modals > [open]')).at (-1)
  if (!modal)  return

  var isDoc = e.target == document.documentElement
  if (e.type == 'pointerdown')  return  modal.dataset.clicked = isDoc  ?  0  :  1
  if (isDoc  &&  modal.dataset.clicked == 0  &&  !modal.classList.contains ('important'))  modal.close ()
  modal.dataset.clicked = 0
}


function onClose ()
{
  if (this.dataset.close == 'all')
    document.querySelectorAll ('.-modal[open]').forEach ((v) => { v.close () })
  try { this.closest ('dialog').close () }
  catch { log ('Missing: closest dialog') }
}


function onOpen ()
{
  var o, id = this.dataset.modal

  try { o = document.getElementById (id) }
  catch { return log ('Error: dialog#' + id) }
  if (!o)  return log ('Missing: dialog#' + id)

  if (o.open == true)
  {
    // Modal was opened. It is not a good. How to proceed?

    // reopen dialog:
    // o.close ()
    // await new Promise ((res) => setTimeout (res, 300))

    // goto open dialog and close dialogs above:
    let a = Array.from (document.querySelectorAll ('.-modals > [open]'))
    for (let l = a.length-1, i = a.indexOf (o);  i<l;  --l)
      a [l].close ()
    return
  }

  if (o.classList.contains ('top')  ||  o.classList.contains ('bottom'))
    scrollHeight (o)

  o.parentNode.append (o)
  o.classList.add ('unpacked')

  setTimeout (() => requestAnimationFrame (() =>
  {
    o.showModal ()
    if (!isHasSupport)  onFirefox.call (o)
  }), 16)
  
}


function onResize ()
{
  for (var o of document.querySelectorAll ('.-modals'))
  {
    o.style.setProperty ('--odd-w-px',  (document.documentElement.clientWidth % 2) + 'px')
    o.style.setProperty ('--odd-h-px',  (document.documentElement.clientHeight % 2) + 'px')
  }
  document.querySelectorAll ('.-modal.bottom[open], .-modal.top[open]').forEach (scrollHeight)
}


function scrollHeight (o)
{
  var h = o.offsetHeight - o.clientHeight

  o.style.setProperty ('--scrollHeight', 'auto')

  for (var child of o.children)
    h += child.scrollHeight + child.offsetHeight - child.clientHeight

  o.style.setProperty ('--scrollHeight', h + 'px')
}

// export { initDialog }
// export function openModal (id)  { onOpen.call ({ dataset: { modal: id } }) }


function onFirefox ()
{
  var root = this.closest ('.-modals')
  if (!root)  return
  var dialogs = root.querySelectorAll ('.-modal[open]')
  root.classList.toggle ('has-open-in-ff', dialogs.length)
}