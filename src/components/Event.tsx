export default function Event(props) {
  const row = Number(props.row) * 17 + 2
  return (
    <li
      className={'relative mt-px flex sm:col-start-' + props.column}
      style={{ gridRow: row + ' / span 16' }}
    >
      <a
        href="#"
        className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs/5 hover:bg-blue-100"
      >
        <p className="order-1 font-semibold text-blue-700">Breakfast</p>
        <p className="text-blue-500 group-hover:text-blue-700">
          <time dateTime="2022-01-12T06:00">7:00 AM</time>
        </p>
      </a>
    </li>
  )
}
