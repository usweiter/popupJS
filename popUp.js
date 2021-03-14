window.addEventListener('DOMContentLoaded', () => {
  var popupTop = new PopUp()
  let popUpRight = new PopUp({
      popupPos:'right',
      popupElemsSelector:'[data-popup_position="right"]',
      })
  var popupLeft = new PopUp({
      popupPos:'left',
      popupElemsSelector:'[data-popup_position="left"]',
      })
  var popUpBottom = new PopUp({
      popupPos:'bottom',
      popupElemsSelector:'[data-popup_position="bottom"]',
    })
})

class PopUp{
  constructor(defaultValues=null){   
    this.defaultValues = defaultValues
    this.draft = {
      popupPos:'top',
      popupElemsSelector:'[data-popup_position="top"]',
      indent:2,
      actionOn:'mouseover',
      actionOff:'mouseout',
    }
    this.popups = document.querySelectorAll('.popup')

    // Checking defaultValues
    if(this.defaultValues == null){
      this.defaultValues = this.draft
    }else{
      this.defaultValues = Object.assign({}, this.draft, this.defaultValues)
    }

    if(this.defaultValues.actionOff == 'click'){
      document.addEventListener('click', (event =>{
        if(!event.target.classList.contains('popup_elem')){
          this.popups.forEach(item=>{
            item.classList.remove('fade')
          })
        }
      }))
    }
    //

    switch(this.defaultValues.popupPos){
      case 'top':
        this.popUpTop(this.defaultValues)
        break;
      case 'bottom':
        this.popUpBottom(this.defaultValues)
        break;
      case 'right':
        this.popUpRight(this.defaultValues)
        break;
      case 'left':
        this.popUpLeft(this.defaultValues)
        break;
    }
  }

  popUpTop(){
    const popupElems = document.querySelectorAll(this.defaultValues.popupElemsSelector)
    popupElems.forEach(item=>{
      const popup = item.querySelector('.popup')

      item.addEventListener(this.defaultValues.actionOn, (event)=>{
          popup.classList.add('fade') //Show popUp
      })

      item.addEventListener('mousemove', (event)=>{
          const target = event.target
          const popupHeight = popup.offsetHeight
          const popupWidth = Math.round(popup.getBoundingClientRect().width)
          const coordX = target.getBoundingClientRect().x + scrollX

          popup.style.top = '-' + (popupHeight + this.defaultValues.indent) + 'px'
          popup.style.left = '' + (event.pageX - coordX) + 'px'
      })

      item.addEventListener(this.defaultValues.actionOff, (event)=>{ //Hide popup
        popup.classList.remove('fade')
      })
    })
  }

  popUpRight(){
    const popupElems = document.querySelectorAll(this.defaultValues.popupElemsSelector)
    popupElems.forEach(item=>{
      const popup = item.querySelector('.popup')

      item.addEventListener(this.defaultValues.actionOn, ()=>{
          popup.classList.add('fade')
      })

      item.addEventListener('mousemove', (event)=>{
          const target = event.target
          const popupElemWidth = target.offsetWidth
          const coordY = target.getBoundingClientRect().top + window.scrollY
          const popupHeight = Math.round(popup.getBoundingClientRect().height)/2

          popup.style.left = '' + (popupElemWidth + this.defaultValues.indent) + 'px'
          popup.style.top = '' + (event.pageY - coordY) + 'px'
      })

      item.addEventListener(this.defaultValues.actionOff, ()=>{
          popup.classList.remove('fade')
      })
    })
  }

  popUpLeft(){
    const popupElems = document.querySelectorAll(this.defaultValues.popupElemsSelector)
    popupElems.forEach(item=>{
      const popup = item.querySelector('.popup')

      item.addEventListener(this.defaultValues.actionOn, ()=>{
          popup.classList.add('fade')
      })

      item.addEventListener('mousemove', (event)=>{
          const target = event.target
          const coordY = target.getBoundingClientRect().y + window.scrollY
          const popupWidth = Math.round(popup.getBoundingClientRect().width)
          const popupHeight = Math.round(popup.getBoundingClientRect().height)/2

          popup.style.left = '-' + (popupWidth + this.defaultValues.indent) + 'px'
          console.log(event.pageY, coordY)
          popup.style.top = '' + (event.pageY - coordY - popupHeight) + 'px'
      })

      item.addEventListener(this.defaultValues.actionOff, ()=>{
          popup.classList.remove('fade')
      })
    })
  }

  popUpBottom(){
    const popupElems = document.querySelectorAll(this.defaultValues.popupElemsSelector)
    popupElems.forEach(item=>{
      const popup = item.querySelector('.popup')

      item.addEventListener(this.defaultValues.actionOn, ()=>{
          popup.classList.add('fade')
      })

      item.addEventListener('mousemove', (event)=>{
          const target = event.target
          const popup_elem_height = target.offsetHeight
          const coordX = target.getBoundingClientRect().x + scrollX
          const popupWidth = Math.round(popup.getBoundingClientRect().width)/2

          popup.style.left = '' + (event.pageX - coordX - popupWidth) + 'px'
          popup.style.top = '' + (popup_elem_height + this.defaultValues.indent) + 'px'
      })

      item.addEventListener(this.defaultValues.actionOff, ()=>{
          popup.classList.remove('fade')
      })
    })
  }
}