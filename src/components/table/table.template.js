const CODES = {
  A: 65,
  Z: 90
}

function toCell() {
  return `<div class="cell" contenteditable></div>`
}

function toClumn(col) {
  return `<div class="column">${col}</div>`
}

function createRow(index, content) {
  return `<div class="row">
    <div class="row-info">${index ? index : ''}</div>
    <div class="row-data">${content}</div>
  </div>`
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 33) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  // prettier-ignore
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toClumn)
      .join('')

  console.log('cols', cols)

  rows.push(createRow(null, cols))

  for (let i = 0; i < rowsCount; i++) {
    // prettier-ignore
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')

    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
