let sum = (...args) => args.reduce((t, v) => t + v, 0)
console.log(sum(1, 2, 3, 4))
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
import('./test').then(console.log)