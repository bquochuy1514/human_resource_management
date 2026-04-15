# Contributing Guide

## Commit Convention

Dự án dùng **Conventional Commits**. Mỗi commit phải theo format:

```
<type>(<scope>): <subject>
```

### Type

| Type       | Khi nào dùng                                  |
| ---------- | --------------------------------------------- |
| `feat`     | Thêm feature mới                              |
| `fix`      | Sửa bug                                       |
| `refactor` | Refactor code, không thêm feature hay fix bug |
| `chore`    | Việc lặt vặt: config, dependency, tooling     |
| `docs`     | Chỉ thay đổi documentation                    |
| `test`     | Thêm hoặc sửa test                            |
| `perf`     | Cải thiện performance                         |

### Scope

Tên module bị ảnh hưởng, viết thường:

`employees` · `departments` · `attendance` · `leave-requests` · `dashboard` · `analytics` · `auth` · `prisma` · `common`

### Subject

- Viết thường, không viết hoa chữ đầu
- Không có dấu chấm ở cuối
- Dùng tiếng Anh
- Động từ ở thì hiện tại: `add`, `update`, `remove` — không phải `added`, `updated`

---

### Ví dụ commit tốt

```
feat(employees): add CRUD endpoints with search, filter, pagination
fix(auth): handle expired refresh token edge case
refactor(departments): extract validation logic to service layer
chore(prisma): add hashed_refresh_token field to User model
```

### Ví dụ commit tệ

```
update code
Fix bug
FEAT: Add employee
đã làm xong employee
```

---

## Branch Naming

```
feature/<tên-feature>
fix/<tên-bug>
refactor/<tên-module>
```

Ví dụ: `feature/attendance-checkin`, `fix/employee-pagination`

---

## Quy tắc chung

- Mỗi commit chỉ làm **1 việc** — không gộp nhiều feature vào 1 commit
- Commit thường xuyên, đừng để dồn quá nhiều thay đổi
- Không commit thẳng vào `main` — tạo branch và mở PR
