import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {parse} from '@core/parse'

import {createTable} from './table.template'
import {resizeHandler} from './table.resize'
import {shouldResize, isCell, matrix, nextSelector} from './table.fuctions'
import {TableSelection} from './TableSelection'

import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constants'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return createTable(40, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', value => {
      this.selection.current.attr('data-value', value).text(parse(value))
      this.updateTextInStore(value)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(
          actions.applyStyle({
            value,
            ids: this.selection.selectedIds
          })
      )
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(evt) {
    try {
      const data = await resizeHandler(this.$root, evt)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('resize error', e.message)
    }
  }

  onMousedown(evt) {
    if (shouldResize(evt)) {
      this.resizeTable(evt)
    } else if (isCell(evt)) {
      const $target = $(evt.target)
      if (evt.shiftKey) {
        const $cells = matrix($target, this.selection.current).map(id =>
          this.$root.find(`[data-id="${id}"]`)
        )

        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(evt) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp'
    ]

    const {key} = evt

    if (keys.includes(key) && !evt.shiftKey) {
      evt.preventDefault()

      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))

      if ($next.$el) {
        $next.focus()
        this.selectCell($next)
      }
    }
  }

  updateTextInStore(value) {
    this.$dispatch(
        actions.changeText({
          id: this.selection.current.id(),
          value
        })
    )
  }

  onInput(event) {
    // this.$emit('table:input', $(event.target))
    const text = $(event.target).text()
    this.selection.current.attr('data-value', text)
    this.updateTextInStore(text)
  }
}
