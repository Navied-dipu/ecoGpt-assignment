# AGENTS.md

## Core Rules (always apply)

1. **Commit and push after every task. Never skip this.** When a task is finished, the
   last action is always a commit and a push. Never leave finished work uncommitted.
   ```bash
   git status --short
   git add <task files>
   git commit -m "<type>: <short summary>"   # e.g. feat:, fix:, refactor:, chore:
   git push
   ```
   Stage only files related to the task (never secrets, `node_modules`, `.env*`). Keep
   commits atomic: one task = one commit. Match the existing commit style
   (`git log --oneline -10`).
2. **Verify before commit.** After every change, run the project checks: `npm run lint`, `npx tsc --noEmit`, `npm run build`. Fix all errors/warnings they report.
3. **Self-review loop (required after each task).** After implementing a task, loop until clean:
   - Re-read the original requirement and verify every part is implemented (requirement checklist).
   - Hunt for bugs: edge cases, null/undefined, error handling, loading/empty states, a11y, mobile layout, stale state, incorrect types.
   - Fix each bug found, then re-run step 2 and repeat the loop. Stop only when a full pass finds no new issues.
4. **Report at the end:** what changed, verification results (`lint`/`tsc`/`build`), loop findings fixed, and the commit hash pushed.

## Stack & conventions

- Next.js 14 (App Router, TypeScript, Tailwind CSS)
- No `any`; no unused variables; no `console.log` left in committed code
- Follow the structure/style of neighboring files; do not add code comments unless asked
