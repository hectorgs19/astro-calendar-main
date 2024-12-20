import { db, User, Slot } from 'astro:db'

// https://astro.build/db/seed
export default async function seed() {
  /*await db.insert(User).values([
    {
      id: 1,
      row: '3',
      column: '1',
      color: 'green'
    },
    {
      id: 2,
      row: '4',
      column: '1',
      color: 'red'
    },
    {
      id: 3,
      row: '5',
      column: '1',
      color: 'red'
    },
    {
      id: 4,
      row: '6',
      column: '1',
      color: 'red'
    },
    {
      id: 5,
      row: '8',
      column: '1',
      color: 'red'
    },
    {
      id: 6,
      row: '9',
      column: '1',
      color: 'red'
    },
    {
      id: 7,
      row: '10',
      column: '1',
      color: 'green'
    },
    {
      id: 8,
      row: '11',
      column: '1',
      color: 'red'
    },
    {
      id: 9,
      row: '12',
      column: '1',
      color: 'green'
    },
    {
      id: 10,
      row: '13',
      column: '1',
      color: 'red'
    },
    {
      id: 11,
      row: '1',
      column: '2',
      color: 'red'
    },
    {
      id: 12,
      row: '2',
      column: '2',
      color: 'green'
    },
    {
      id: 13,
      row: '3',
      column: '2',
      color: 'red'
    },
    {
      id: 14,
      row: '4',
      column: '2',
      color: 'green'
    },
    {
      id: 15,
      row: '5',
      column: '2',
      color: 'red'
    },
    {
      id: 16,
      row: '6',
      column: '2',
      color: 'green'
    },
    {
      id: 17,
      row: '8',
      column: '2',
      color: 'red'
    },
    {
      id: 18,
      row: '9',
      column: '2',
      color: 'red'
    },
    {
      id: 19,
      row: '10',
      column: '2',
      color: 'red'
    },
    {
      id: 20,
      row: '11',
      column: '2',
      color: 'red'
    },
    {
      id: 21,
      row: '12',
      column: '2',
      color: 'red'
    },
    {
      id: 22,
      row: '13',
      column: '2',
      color: 'green'
    },
    {
      id: 23,
      row: '1',
      column: '3',
      color: 'red'
    },
    {
      id: 24,
      row: '2',
      column: '3',
      color: 'red'
    },
    {
      id: 25,
      row: '3',
      column: '3',
      color: 'red'
    },
    {
      id: 26,
      row: '4',
      column: '3',
      color: 'red'
    },
    {
      id: 27,
      row: '5',
      column: '3',
      color: 'red'
    },
    {
      id: 28,
      row: '6',
      column: '3',
      color: 'red'
    },
    {
      id: 29,
      row: '8',
      column: '3',
      color: 'red'
    },
    {
      id: 30,
      row: '9',
      column: '3',
      color: 'red'
    },
    {
      id: 31,
      row: '10',
      column: '3',
      color: 'green'
    },
    {
      id: 32,
      row: '11',
      column: '3',
      color: 'red'
    },
    {
      id: 33,
      row: '12',
      column: '3',
      color: 'green'
    },
    {
      id: 34,
      row: '13',
      column: '3',
      color: 'red'
    },
    {
      id: 35,
      row: '1',
      column: '4',
      color: 'red'
    },
    {
      id: 36,
      row: '2',
      column: '4',
      color: 'red'
    },
    {
      id: 37,
      row: '3',
      column: '4',
      color: 'red'
    },
    {
      id: 38,
      row: '4',
      column: '4',
      color: 'red'
    },
    {
      id: 39,
      row: '5',
      column: '4',
      color: 'red'
    },
    {
      id: 40,
      row: '6',
      column: '4',
      color: 'green'
    },
    {
      id: 41,
      row: '8',
      column: '4',
      color: 'red'
    },
    {
      id: 42,
      row: '9',
      column: '4',
      color: 'green'
    },
    {
      id: 43,
      row: '10',
      column: '4',
      color: 'red'
    },
    {
      id: 44,
      row: '11',
      column: '4',
      color: 'red'
    },
    {
      id: 45,
      row: '12',
      column: '4',
      color: 'red'
    },
    {
      id: 46,
      row: '13',
      column: '4',
      color: 'red'
    },
    {
      id: 47,
      row: '1',
      column: '5',
      color: 'red'
    },
    {
      id: 48,
      row: '2',
      column: '5',
      color: 'red'
    },
    {
      id: 49,
      row: '3',
      column: '5',
      color: 'green'
    },
    {
      id: 50,
      row: '4',
      column: '5',
      color: 'red'
    },
    {
      id: 51,
      row: '5',
      column: '5',
      color: 'red'
    },
    {
      id: 52,
      row: '6',
      column: '5',
      color: 'red'
    },
    {
      id: 53,
      row: '8',
      column: '5',
      color: 'red'
    },
    {
      id: 54,
      row: '9',
      column: '5',
      color: 'red'
    },
    {
      id: 55,
      row: '10',
      column: '5',
      color: 'green'
    },
    {
      id: 56,
      row: '11',
      column: '5',
      color: 'red'
    }
  ])*/
}
