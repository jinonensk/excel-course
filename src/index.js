import {Excel} from '@/components/excel/Excel'
import {Formula} from '@/components/formula/Formula'
import {Header} from '@/components/header/Header'
import {Table} from '@/components/table/Table'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {debounce, storage} from './core/utils'
import {store} from './redux'

import './scss/index.scss'

const stateListener = debounce(state => {
  console.log('App State: ', state)
  storage('excel-state', state)
}, 300)

store.subscribe(stateListener)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()
