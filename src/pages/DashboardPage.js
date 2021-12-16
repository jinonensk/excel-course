import {Page} from '@core/Page'
import {$} from '@core/dom'
import {storage} from '@core/utils'

// excel:123123
// excel:321
function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) continue

    keys.push(key)
  }
  return keys
}

function toHTML(key) {
  const model = storage(key)
  const id = key.split(':')[1]
  return `
    <li class="db__record">
      <a href="#excel/${id}">${model.title}</a>
      <strong>${new Date(model.openedDate).toLocaleDateString()} ${new Date(
    model.openedDate
).toLocaleTimeString()}</strong>
    </li>
  `
}

function createRecordsTable() {
  const keys = getAllKeys()

  if (!keys.length) return '<p>Вы пока не создали ни одной таблицы</p>'

  return `
    <div class="db__list-header">
      <span>Название таблицы</span>
      <span>Дата открытия</span>
    </div>

    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `
}

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString()

    return $.create('div', 'db').html(`
      <div class="db__header">
        <h1>Панель управления</h1>
      </div>

      <div class="db__new">
        <div class="db__view">
          <a href="#excel/${now}" class="db__create">Новая <br />Таблица</a>
        </div>
      </div>

      <div class="db__table db__view">
        ${createRecordsTable()}
      </div>
    `)
  }
}
