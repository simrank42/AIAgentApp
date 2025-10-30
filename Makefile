.PHONY: dev lint fmt test migrate

dev:
\tuvicorn app.main:app --reload --host 0.0.0.0 --port 8000

lint:
\truff check app

fmt:
\tblack app
\truff check --fix app || true

test:
\tpytest -q

migrate:
\talembic revision --autogenerate -m "update"
\talembic upgrade head
