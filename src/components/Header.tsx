import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon, CursorArrowRaysIcon } from '@heroicons/react/20/solid'
import { CalendarDaysIcon, ChartPieIcon, SignalSlashIcon } from '@heroicons/react/24/outline'

const solutions = [
  {
    name: 'Panel semanal',
    description: 'Vista semanal de tu negocio',
    href: '/dashboard',
    icon: CalendarDaysIcon
  },
  {
    name: 'Configurador de clases',
    description: 'Configura las clases semanales disponibles para tus clientes',
    href: '/slots/configurator',
    icon: ChartPieIcon
  },
  {
    name: 'Cerrar sesión',
    description: 'Edit, manage and create newly informed decisions',
    href: '/auth/logout',
    icon: SignalSlashIcon,
    form: true
  }
]

function LinkButton(props) {
  if (!props.item) {
    return null
  }

  if (props.item.form) {
    return (
      <div>
        <form action={props.item.href} method="POST">
          <button className="font-semibold text-gray-900">
            {props.item.name}
            <span className="absolute inset-0" />
          </button>
          <p className="mt-1 text-gray-600">{props.item.description}</p>
        </form>
      </div>
    )
  }
  return (
    <div>
      <a href={props.item.href} className="font-semibold text-gray-900">
        {props.item.name}
        <span className="absolute inset-0" />
      </a>
      <p className="mt-1 text-gray-600">{props.item.description}</p>
    </div>
  )
}

export default function Header() {
  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
        <span>MOTION-LEON</span>
        <ChevronDownIcon aria-hidden="true" className="size-5" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 shadow-lg ring-1 ring-gray-900/5 lg:max-w-3xl">
          <div className="grid grid-cols-1 gap-x-6 gap-y-1 p-4 lg:grid-cols-2">
            {solutions.map((item) => (
              <div
                key={item.name}
                className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
              >
                <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <item.icon
                    aria-hidden="true"
                    className="size-6 text-gray-600 group-hover:text-indigo-600"
                  />
                </div>
                <LinkButton item={item} />
              </div>
            ))}
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  )
}
