import { Hono } from 'hono'
import { cors } from "hono/cors";
import { auth } from './lib/auth'
import { logger } from 'hono/logger'
const app = new Hono()

app.use(logger())

app.get('/', (c) => {
  return c.text('Auth API is running ...')
})

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  })
})

/**
 * Better Auth routes, see docs before changing
 * @link https://better-auth.com/docs
 */

app.use(
	"/api/auth/*", // or replace with "*" to enable cors for all routes
	cors({
		origin: "http://localhost:3000", // replace with your origin
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

export default app