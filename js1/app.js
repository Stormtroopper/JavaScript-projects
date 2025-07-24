class Calculator {
  constructor(prevEl, currEl) {
    this.prevEl = prevEl
    this.currEl = currEl
    this.clear()
  }

  clear() {
    this.current = ''
    this.previous = ''
    this.operation = null
  }

  delete() {
    this.current = this.current.slice(0, -1)
  }

  addNumber(num) {
    if (num === '.' && this.current.includes('.')) return
    this.current += num
  }

  setOperation(op) {
    if (!this.current) return
    if (this.previous) this.calculate()
    
    this.operation = op
    this.previous = this.current
    this.current = ''
  }

  calculate() {
    const prev = +this.previous
    const curr = +this.current
    
    if (isNaN(prev) || isNaN(curr)) return

    const operations = {
      '+': prev + curr,
      '-': prev - curr,
      '*': prev * curr,
      '÷': prev / curr
    }

    this.current = operations[this.operation] || 0
    this.operation = null
    this.previous = ''
  }

  formatNumber(num) {
    if (!num) return ''
    
    const [integer, decimal] = num.toString().split('.')
    const formattedInt = isNaN(+integer) ? '' : (+integer).toLocaleString()
    
    return decimal ? `${formattedInt}.${decimal}` : formattedInt
  }

  updateDisplay() {
    this.currEl.textContent = this.formatNumber(this.current)
    this.prevEl.textContent = this.operation 
      ? `${this.formatNumber(this.previous)} ${this.operation}` 
      : ''
  }
}

// Get DOM elements
const prevEl = document.querySelector('[data-previous-operand]')
const currEl = document.querySelector('[data-current-operand]')
const calc = new Calculator(prevEl, currEl)

// Add event listeners
document.querySelectorAll('[data-number]').forEach(btn => {
  btn.onclick = () => {
    calc.addNumber(btn.textContent)
    calc.updateDisplay()
  }
})

document.querySelectorAll('[data-operation]').forEach(btn => {
  btn.onclick = () => {
    calc.setOperation(btn.textContent)
    calc.updateDisplay()
  }
})

document.querySelector('[data-equals]').onclick = () => {
  calc.calculate()
  calc.updateDisplay()
}

document.querySelector('[data-all-clear]').onclick = () => {
  calc.clear()
  calc.updateDisplay()
}

document.querySelector('[data-delete]').onclick = () => {
  calc.delete()
  calc.updateDisplay()
}
