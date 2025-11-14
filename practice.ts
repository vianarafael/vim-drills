// practice.ts
// Goals:
// - ci( ci{ ci[ ci" ci'
// - ciw / * / n for refactors
// - f( f= f<, etc.

import { Hono } from "hono"

type User = {
  id: number
  name: string
  email: string
  createdAt: Date
  isAdmin: boolean
}

const app = new Hono()

// DRILL 1: ci( / ci{ / ci"
// Move inside each (), {}, "" and change.
// Do quick changes, then undo.
app.get("/users", async (c) => {
  const filter = c.req.query("filter") || "all"
  const limit = Number(c.req.query("limit") || "20")
  const showAdmin = c.req.query("admin") === "true"

  const users: User[] = [
    { id: 1, name: "rafael", email: "rafael@example.com", createdAt: new Date(), isAdmin: true },
    { id: 2, name: "alice", email: "alice@example.com", createdAt: new Date(), isAdmin: false },
    { id: 3, name: "bob", email: "bob@example.com", createdAt: new Date(), isAdmin: false },
  ]

  const filtered = users.filter((user) => {
    if (filter === "admins") return user.isAdmin
    if (filter === "non-admins") return !user.isAdmin
    return true
  }).slice(0, limit)

  return c.json({ filter, limit, showAdmin, users: filtered })
})

// DRILL 2: ciw + * / n
// Pick a word like "user" or "filter", rename via ciw, then jump with * / n.
function calculateScore(user: User, base: number): number {
  const ageFactor = user.isAdmin ? 2 : 1
  const nameLength = user.name.length
  const randomness = Math.random() * 10
  return base * ageFactor + nameLength + randomness
}

// DRILL 3: Arrays and objects
// Practice ci[ and ci{ on nested structures.
const permissions = [
  { role: "admin",  actions: ["create", "read", "update", "delete"] },
  { role: "editor", actions: ["create", "read", "update"] },
  { role: "viewer", actions: ["read"] },
]

function formatUserRow(user: User) {
  return {
    id: user.id,
    displayName: `${user.name} <${user.email}>`,
    flags: {
      isAdmin: user.isAdmin,
      isNew: user.createdAt > new Date("2025-01-01"),
    },
  }
}

// DRILL 4: Nested callbacks and arrows
// Play with ci( ci{ ci" on these.
const asyncJobs = [
  async function jobOne() {
    const data = await Promise.resolve("job-one-result")
    return data.toUpperCase()
  },
  async () => {
    const value = await Promise.resolve(42)
    return value * 2
  },
]

app.post("/score", async (c) => {
  const body = await c.req.json<Partial<User>>()
  const fakeUser: User = {
    id: body.id ?? 999,
    name: body.name ?? "anonymous",
    email: body.email ?? "unknown@example.com",
    createdAt: new Date(),
    isAdmin: body.isAdmin ?? false,
  }
  const baseScore = 10
  const score = calculateScore(fakeUser, baseScore)
  return c.json({ score, user: formatUserRow(fakeUser) })
})

export default app

