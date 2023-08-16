var lib = window.lib || { }

lib.userInput = (function(utils) {
  'use strict'
  const keycode = { comma: 44, enter: 13, backspace: 8 }

  const userInput = function(inputContainerNode, options) {
    this._options = buildOptions(options)
    this._listeners = setEventListeners(inputContainerNode, this._options)
    this._inputContainerNode = inputContainerNode

    init(inputContainerNode, this._options)
  }

  userInput.prototype.add = function add(userName) {
    const refElement = this._inputContainerNode.querySelector('input')
    addChip(refElement, userName)
  }

  userInput.prototype.remove = function remove(userName) {
    getChips(this._inputContainerNode)
      .filter(function(chip) { return chip.firstChild.textContent === userName })
      .forEach(function(chip) { chip.remove() })
  }

  userInput.prototype.getValue = function getValue(options) {
    const chips = getChips(this._inputContainerNode)
    const includeInvalid = (options || { }).includeInvalid || false

    if (includeInvalid)
      return chips.map(function(chip) { return chip.firstChild.textContent })

    return chips
      .filter(function(chip) { return !chip.classList.contains('invalid') })
      .map(function(chip) { return chip.firstChild.textContent })
  }

  userInput.prototype.destroy = function destroy() {
    const inputContainerNode = this._inputContainerNode
    inputContainerNode.innerHTML = ''
    this._listeners.forEach(function (listener) {
      inputContainerNode.removeEventListener(listener.event, listener.handler, false)
    })
    this._listeners = []
  }

  return function() {
    const instance = Object.create(userInput.prototype)
    userInput.apply(instance, Array.prototype.slice.call(arguments))
    return instance
  }

  /*** Private functions - access through hoisting ***/

  function init(inputContainerNode, options) {
    inputContainerNode.innerHTML = ' \
      <div class="userNames userSearch"> \
        <input class="form-control me-1" type="search" role="userSearch" placeholder="' + options.placeholder + '"> \
      </div> \
    '
  }

  function buildOptions(givenOptions) {
    const options = givenOptions || { }
    options.placeholder = options.placeholder || 'Enter username'
    options.triggerKeyCodes = options.triggerKeyCodes || [keycode.enter, keycode.comma]
    options.pasteSplitPattern = options.pasteSplitPattern || /(?:,| )+/
    return options
  }

  function getChips(inputContainerNode) {
    return Array.prototype.slice.call(inputContainerNode.querySelectorAll('.userSearch .user-chip'))
  }

  function addChip(refElement, userName) {
    const trimmedEmail = userName && userName.trim()
    if (!trimmedEmail) return

    const chip = document.createElement('span')
    chip.setAttribute('role', 'user-chip')
    chip.classList.add('user-chip')
    chip.classList.add('py-1')
    // if (!isValidEmail(trimmedEmail))
    //   chip.classList.add('invalid')

    chip.innerHTML = '<span class="content">' + trimmedEmail + '</span><a href="#" class="remove">×</a>'

    refElement.parentNode.insertBefore(chip, refElement.nextSibling)
    refElement.value = ''
  }
    
  function setEventListeners(inputContainerNode, options) {
    const factory = utils.dom.makeEventListenerFactory(inputContainerNode)
    const addEventListener = factory.addEventListener

    addEventListener('click', function(event) {
      if (event.target.classList.contains('userSearch'))
        event.target.querySelector('input').focus()

      if (event.target.classList.contains('remove')) {
        inputContainerNode.querySelector('.userSearch').removeChild(event.target.parentNode)
      }
    })

    addEventListener('focusout', function(event) {
      addChip(event.target, event.target.value)
    })

    addEventListener('paste', function(event) {
      if (!event.target.matches('input')) 
        return 
      
      event.preventDefault()

      const chunks = event.clipboardData.getData('Text').split(options.pasteSplitPattern)
      if (chunks.length > 1) {
        chunks.forEach(function(chunk) { addChip(event.target, chunk) })
        return
      }

      const chunk = chunks[0]
      // if (isValidEmail(chunk)) {
        addChip(event.target, chunk)
      //   return }

      event.target.value += chunk
    })

    addEventListener('keypress', function(event) {
      if (options.triggerKeyCodes.indexOf(event.keyCode) < 0)
        return 
      event.preventDefault()
      addChip(event.target, event.target.value)
    })

    addEventListener('keydown', function(event) {
      if (event.keyCode === keycode.backspace && !event.target.value) {
        const chips = getChips(inputContainerNode)
        if (!chips.length) return
        const lastChip = chips[chips.length - 1]
        lastChip.remove()
      }
    })

    return factory.handlers
  }

  // function isValidEmail(userName) {
  //   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userName)
  // }

}(lib.utils))
