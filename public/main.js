let pigLatin = document.getElementsByClassName("pig");
let trash = document.getElementsByClassName("fa-ban");

Array.from(pigLatin).forEach(function (element) {
  element.addEventListener('click', function () {
    // const name = this.parentNode.parentNode.childNodes[1].innerText
    const word = this.parentNode.parentNode.childNodes[3].innerText
    console.log(word)
    let pigLatined = renamed(word)
    console.log(pigLatined)
    fetch('messages', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        'ogWord': word,
        'newWord': pigLatined,
      })
    })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload(true)
      })
  });
});


Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

function renamed(quote){
  let vowels = ['a', 'e', 'i', 'o', 'u'];
  let newStr = "";

  if (vowels.indexOf(quote[0]) > -1) {
      newStr = quote + "way";
      return newStr;
  } else {
      let firstMatch = quote.match(/[aeiou]/g) || 0;
      let vowel = quote.indexOf(firstMatch[0]);
      newStr = quote.substring(vowel) + quote.substring(0, vowel) + "ay";
      return newStr;
  }
}