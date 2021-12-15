import {toInlineStyles} from '@core/utils'
import {parse} from '@core/parse'
import {defaultStyles} from '@/constants'

const CODES = {
  A: 65,
  Z: 90
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(row, state) {
  return (_, col) => {
    const width = getWidth(state.colState, col)
    const id = `${row}:${col}`
    const data = state.dataState[id] || ''
    const styles = toInlineStyles({...defaultStyles, ...state.stylesState[id]})
    // const styles = state.stylesState[id]

    return `
      <div
        class="cell"
        style="${styles}; width: ${width}"
        contenteditable
        data-col="${col}"
        data-id="${id}"
        data-value="${data}"
        data-type="cell"
      >
        ${parse(data)}
      </div>`
  }
}

function toClumn({col, index, width}) {
  return `
  <div
    class="column"
    style="width: ${width}"
    data-type="resizable"
    data-col="${index}"
  >
    ${col}
    <div
      class="col-resize"
      data-resize="col"
    ></div>
  </div>`
}

function createRow(index, content, rowState) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = getHeight(rowState, index)
  return `
  <div
    class="row"
    data-type="resizable"
    data-row=${index}
    style="height: ${height}"
  >
    <div class="row-info">
      ${index ? index : ''}
      ${resize}
    </div>
    <div class="row-data">
      ${content}
    </div>
  </div>`
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
  return function(col, index) {
    return {
      col,
      index,
      width: getWidth(state.colState, index)
    }
  }
}

export function createTable(rowsCount = 33, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  // prettier-ignore
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toClumn)
      // .map((col, index) => {
      //   const width = getWidth(state.colState, index)
      //   return toClumn(col, index, width)
      // })
      .join('')

  rows.push(createRow(null, cols, {}))

  for (let row = 0; row < rowsCount; row++) {
    // prettier-ignore
    const cells = new Array(colsCount)
        .fill('')
        // .map((_, col) => toCell(row, col))
        .map(toCell(row, state))
        .join('')

    rows.push(createRow(row + 1, cells, state.rowState))
  }

  return rows.join('')
}
