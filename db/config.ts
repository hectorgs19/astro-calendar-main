import { column, defineDb, defineTable } from 'astro:db'

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    google_id: column.text({ optional: true }),
    email: column.text({ unique: true, optional: false }),
    name: column.text({ optional: false }),
    is_admin: column.boolean({ optional: false })
  }
})

const User_Slot = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    user_id: column.text({ references: () => User.columns.id, optional: false }),
    slot_id: column.text({ references: () => Slot.columns.id, optional: false }),
    default: column.boolean({ optional: false, default: false })
  }
})

const Slot = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    start_date: column.date({ optional: false }),
    end_date: column.date({ optional: false })
  }
})

const Session = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    expiresAt: column.date(),
    userId: column.text({ references: () => User.columns.id })
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: { User, Slot, User_Slot, Session }
})
