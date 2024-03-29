import {range} from '../../core/utils'

export function shouldResize(evt) {
  return evt.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.type === 'cell'
}

export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)
  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}

export function nextSelector(key, {col, row}) {
  switch (key) {
    case 'Enter':
    case 'Tab':
    case 'ArrowDown':
      row++
      break
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      col--
      break
    case 'ArrowUp':
      row--
      break
  }

  return `[data-id="${row}:${col}"]`
}
