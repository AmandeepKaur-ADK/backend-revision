# Pagination

Offset-Based Pagination
This is the "standard" pagination most beginners use.

The Query: SELECT \* FROM posts ORDER BY created_at DESC LIMIT 10 OFFSET 1000;

How the DB works: The database must still fetch all 1010 rows, sort them, throw away the first 1000, and return the last 10.

The "Deep Offset" Problem: If you have 10 million rows and try to access page 50,000, the database will likely time out because it’s doing a massive amount of "disposable" work.

The "Drifting" Problem: If a user is on Page 1 and a new post is added, when they click "Page 2," the last item from Page 1 has now been pushed to the top of Page 2. The user sees a duplicate.

Cursor-Based Pagination (Keyset Pagination)
This is what Facebook, Slack, and Infinite Scroll apps use.

The Query: SELECT \* FROM posts WHERE id < 'last_id_from_previous_page' ORDER BY id DESC LIMIT 10;

How the DB works: If the id column is indexed (which it usually is), the database uses a B-Tree search to jump directly to that ID. It doesn't look at a single row before that point.

The UX Win: Since you are asking for "items older than X," it doesn't matter how many new items were added at the top; the "cursor" stays fixed in time.

# Filtering, Sorting, & Searching

Filtering: GET /cars?color=red&brand=toyota

Sorting: GET /cars?sort=-price,year (Minus sign usually means DESC).

Searching: GET /cars?q=fast+red+car

## Advanced Filtering: Design & Performance

In a production API, you don't just "filter"—you protect the database from expensive queries.

The Problem of "Unindexed" Filters
If a user filters by color=red and you don't have an index on the color column, the database performs a Full Table Scan.

Senior Strategy: Restrict filtering to specific "allowed" fields that are indexed.

The "Complex" Filter: What if they want color=red AND size=large? This requires a Composite Index (color, size) for maximum speed.

Filtering Patterns
Exact Match: ?status=active

Range (LHS Brackets): ?price[gte]=100&price[lte]=500 (Greater than or equal to). This is the standard for Stripe and other high-tier APIs.

Membership: ?category=electronics,books (Equivalent to SQL IN).

## Sorting: The "Index-Friendly" Approach

Sorting is expensive. If you sort by a non-indexed column, the database has to perform an "In-Memory Sort" (using filesort in MySQL), which is very slow.

Directional Sorting: Use prefixes like + (ASC) or - (DESC).

Example: GET /users?sort=-last_login,username

Default Sort: Every API should have a default sort (usually created_at or id) to ensure the results are Deterministic (they come back in the same order every time).

##Searching: Why LIKE %query% Fails
If you use WHERE name LIKE '%apple%', the database cannot use a standard B-Tree index. It has to check every single row.

The Professional Alternatives:
Full-Text Search (FTS): Built into Postgres and MySQL. It uses an "Inverted Index" (like the index at the back of a book) to find words instantly.

External Engines (Elasticsearch/Algolia): For massive scale. These engines are built specifically for searching and handle "Fuzzy Matching" (finding "Apple" even if the user typed "Aple").

## Security: The "Filter Injection" Trap

If you take query parameters and inject them directly into a database query string, you are vulnerable to SQL Injection.

The Fix: Always use Parameterized Queries (provided by drivers like pg or ORMs like Prisma/Sequelize).

##Summary of Best Practices
Always limit results: Never allow GET /users without a default LIMIT.

Whitelist allowed fields: Don't let users filter or sort by any column; only those you have indexed.

Use metadata: Include a meta object in your response so the frontend knows if there is a "next" page.
