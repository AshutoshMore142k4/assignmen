# Logic Document

## Smart Assign Logic

The Smart Assign feature automatically assigns a task to the user with the fewest active tasks. When the button is clicked, the backend queries all users and counts their active (non-completed) tasks. The user with the lowest count is selected. If there are multiple users with the same minimum count, the first found is chosen. If no users are available, the assignment is skipped. Every smart assignment is logged in the action log for traceability.

## Conflict Handling Logic

Optimistic locking is used for conflict resolution. Each task has a `version` field. When a user edits a task, the current version is sent with the update request. If the backend detects that the version in the database is different (i.e., another user has updated the task in the meantime), a conflict is detected. Both versions (the user's and the latest from the database) are sent to the client. The UI then prompts users to either merge changes or overwrite. All conflict events are logged for auditing.
