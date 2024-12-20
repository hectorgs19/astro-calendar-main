export default function Event(props) {
  const row = Number(props.row) * 2
  const column = 'sm:col-start-' + String(props.column)
  const color = 'bg-' + String(props.color) + '-50'
  const hoverColor = 'hover:bg-' + String(props.color) + '-100'
  return (
    <li
      className={'relative mt-px hidden sm:flex ' + column}
      style={{ gridRow: row + ' / span 2' }}
    >
      <a
        href="#"
        className={
          'group absolute inset-1 flex flex-col overflow-y-auto rounded-lg ' +
          color +
          ' p-2 text-xs/5 ' +
          hoverColor
        }
      >
        <p className="order-1 font-semibold text-slate-700">
          {'Fila: ' + row / 2 + ' | Columna: ' + column[column.length - 1]}
        </p>
        <p className="text-slate-500 group-hover:text-slate-700">
          <time dateTime="2022-01-12T06:00">7:00 AM</time>
        </p>
      </a>
    </li>
  )
}
