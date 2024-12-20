export default function Event({ row, column, color, link }) {
  const gridRow = Number(row) * 2
  const columnClass = 'sm:col-start-' + String(column)
  const colorClass = 'bg-' + String(color) + '-50'
  const hoverColorClass = 'hover:bg-' + String(color) + '-100'

  return (
    <li
      className={'relative mt-px hidden sm:flex ' + columnClass}
      style={{ gridRow: gridRow + ' / span 2' }}
    >
      <a
        href={link} // Asegúrate de pasar el `link` correctamente
        className={
          'group absolute inset-1 flex flex-col overflow-y-auto rounded-lg ' +
          colorClass +
          ' p-2 text-xs/5 ' +
          hoverColorClass
        }
      >
        <p className="order-1 font-semibold text-slate-700">
          {'Fila: ' + row + ' | Columna: ' + column}
        </p>
        <p className="text-slate-500 group-hover:text-slate-700">
          <time dateTime="2022-01-12T06:00">7:00 AM</time>
        </p>
      </a>
    </li>
  )
}
