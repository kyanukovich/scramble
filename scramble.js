/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/

const app = new Vue({
  el: '#app',
  data: {
    game: false,
    message: 'Press "Start"',
    words: ['DUCK', 'PIG', 'COW', 'HEN', 'GOAT', 'HORSE', 'DOG', 'CAT', 'ROOSTER', 'SHEEP'],
    word: '',
    scrambled: '',
    points: null,
    passes: null,
    strikes: null
  },
  methods: {
    start: function () {
      this.game = true
      this.words = ['DUCK', 'PIG', 'COW', 'HEN', 'GOAT', 'HORSE', 'DOG', 'CAT', 'ROOSTER', 'SHEEP']
      this.word = this.words.shift()
      this.scrambled = shuffle(this.word)
      this.points = 0
      this.passes = 3
      this.strikes = 0
      this.message = 'Guess this word!'
      document.getElementById('start').style.opacity = '0'
      document.getElementById('controls').style.opacity = '100'
      document.getElementById('input').value = ''
    },
    upperCase: function () {
      var $value = document.getElementById('input')
      $value.value = $value.value.toUpperCase()
    },
    guess: function () {
      if (this.game === true) {
        var $value = document.getElementById('input').value
        document.getElementById('input').value = ''
        if ($value === this.word) {
          this.points++
          this.message = 'Correct! Next one!'
          this.word = this.words.shift()
          if (this.word === undefined) {
            this.game = false
            document.getElementById('toggleGame').innerHTML = 'Restart'
            document.getElementById('start').style.opacity = '100'
            document.getElementById('controls').style.opacity = '0'
            this.scrambled = ' ¯\\_(ツ)_/¯'
            this.message = 'No more words! Want to restart?'
          } else {
            this.scrambled = shuffle(this.word)
          }
        } else if ($value === '') {
          this.message = 'You haven\'t input your guess!'
        } else {
          this.strikes++
          if (this.strikes === 3) {
            this.game = false
            document.getElementById('toggleGame').innerHTML = 'Restart'
            document.getElementById('start').style.opacity = '100'
            document.getElementById('controls').style.opacity = '0'
            this.scrambled = this.word
            this.message = 'You\'re out of tries! Want to restart?'
          } else {
            this.message = 'Incorrect! Try again!'
          }
        }
      }
    },
    pass: function () {
      document.getElementById('input').value = ''
      if (this.game === true) {
        if (this.passes === 0) {
          this.message = 'No more passes!'
        } else {
          this.passes--
          this.message = 'You get a pass! Next one!'
          this.word = this.words.shift()
          if (this.word === undefined) {
            this.game = false
            document.getElementById('toggleGame').innerHTML = 'Restart'
            document.getElementById('start').style.opacity = '100'
            document.getElementById('controls').style.opacity = '0'
            this.scrambled = ' ¯\\_(ツ)_/¯'
            this.message = 'No more word! Want to restart?'
          } else {
            this.scrambled = shuffle(this.word)
          }
        }
      }
    }
  }
})

/*
do {
  shuffle(this.scrambled)
}
while (this.scrambled === this.word)
*/
