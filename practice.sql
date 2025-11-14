
-- practice.sql
-- Goals:
-- - ciw on column names
-- - ci, around lists
-- - ci( on SELECT(...)
-- - Use f, t, /, n to move around

-- DRILL 1: Column lists
SELECT
  id,
  email,
  name,
  created_at,
  updated_at,
  last_login_at,
  is_admin,
  is_active
FROM users
WHERE is_active = 1
ORDER BY created_at DESC;

-- DRILL 2: Refactor columns with ciw + * / n
SELECT
  u.id,
  u.name,
  u.email,
  u.is_admin,
  p.plan_name,
  p.price_monthly,
  s.last_seen_at,
  s.requests_count
FROM users u
JOIN subscriptions s
  ON s.user_id = u.id
JOIN plans p
  ON p.id = s.plan_id
WHERE
  u.is_active = 1
  AND (p.price_monthly >= 10 AND p.price_monthly <= 99)
ORDER BY
  s.last_seen_at DESC;

-- DRILL 3: Nested conditions
SELECT
  a.id,
  a.app_name,
  a.slug,
  a.created_at,
  a.is_public,
  m.metric_key,
  m.metric_value
FROM apps a
LEFT JOIN app_metrics m
  ON m.app_id = a.id
WHERE
  a.is_deleted = 0
  AND (
    (a.is_public = 1 AND a.star_count >= 10)
    OR
    (a.is_public = 0 AND a.owner_id = 1)
  )
  AND (
    m.metric_key IN ('requests_24h', 'errors_24h', 'latency_p95')
    OR m.metric_key IS NULL
  )
ORDER BY
  a.created_at DESC,
  m.metric_key ASC;

-- DRILL 4: INSERT/UPDATE for ci( and ci"
INSERT INTO apps (
  owner_id,
  app_name,
  slug,
  is_public,
  config_json
) VALUES (
  1,
  'Ship Daily Dashboard',
  'ship-daily-dashboard',
  1,
  '{"stack":"hono-htmx-sqlite","features":["metrics","auth","jobs"]}'
);

UPDATE users
SET
  name = 'Rafael V',
  email = 'rafael+shipdaily@example.com',
  is_admin = 1,
  updated_at = CURRENT_TIMESTAMP
WHERE id = 1;
