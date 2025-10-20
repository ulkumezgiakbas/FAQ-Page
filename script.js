const faqs = Array.from(document.querySelectorAll('.faq'))
const toggles = document.querySelectorAll('.faq-toggle')
const q = document.getElementById('q')
const expandAllBtn = document.getElementById('expandAll')
const collapseAllBtn = document.getElementById('collapseAll')

function setExpanded(card, on){
  const panel = card.querySelector('.faq-panel')
  card.setAttribute('aria-expanded', on ? 'true' : 'false')
  panel.style.maxHeight = on ? panel.scrollHeight + 'px' : 0
}

function toggleCard(card){
  const open = card.getAttribute('aria-expanded') === 'true'
  setExpanded(card, !open)
}

toggles.forEach(btn=>{
  btn.addEventListener('click', e=>{
    const card = e.currentTarget.closest('.faq')
    toggleCard(card)
  })
})

faqs.forEach(card=>{
  card.addEventListener('keydown', e=>{
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault()
      toggleCard(card)
    }
  })
})

q.addEventListener('input', ()=>{
  const term = q.value.trim().toLowerCase()
  faqs.forEach(card=>{
    const text = (card.querySelector('.faq-title').textContent + ' ' + card.querySelector('.faq-panel').textContent).toLowerCase()
    card.style.display = text.includes(term) ? '' : 'none'
  })
})

expandAllBtn.addEventListener('click', ()=> faqs.forEach(c=> setExpanded(c,true)))
collapseAllBtn.addEventListener('click', ()=> faqs.forEach(c=> setExpanded(c,false)))

window.addEventListener('load', ()=>{
  faqs.forEach((c,i)=> setExpanded(c, i===0))
})
