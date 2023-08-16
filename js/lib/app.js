(function(EmailsInput, random) {
  'use strict'

  document.addEventListener('DOMContentLoaded', function() {
    const inputContainerNode = document.querySelector('#userSearch')
    const emailsInput = EmailsInput(inputContainerNode)

    window.emailsInput = emailsInput  //Expose instance for quick access in playground

    // document.querySelector('[data-action="add-email"]')
    //   .addEventListener('click', function() { emailsInput.add(random.email()) })

    // document.querySelector('[data-action="get-emails-count"]')
    //   .addEventListener('click', function() {
    //     const emails = emailsInput.getValue()
    //     alert('there are ' + emails.length + ' valid email(s)')
    //   })
  })

}(window.lib.userInput, window.lib.utils.random))
