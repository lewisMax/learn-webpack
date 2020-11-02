let sum = (...args) => args.reduce((t, v) => t + v, 0)
console.log(sum(1, 2, 3, 4, 5))
import './test.css'
import './test.scss'

if (module && module.hot) {
  module.hot.accept()
}

let obj = {
  name: 'cjy'
}
console.log(obj.name)
console.log(obj?.meta?.age)
console.log(NaN ?? 'haah')
// code split
import(/* webpackChunkName: 'test' */'./test').then(console.log)