import './module'
import './scss/index.scss'

async function f() {
  return await Promise.resolve('Async working!')
}

f().then(e => console.log(e))
