FROM python:3.12-slim AS base

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install poetry and configure it
RUN pip install poetry
RUN poetry config virtualenvs.create false

# Copy dependency files first for better caching
COPY pyproject.toml poetry.lock ./

# Install dependencies
RUN poetry install --no-root

# Copy application code
COPY . .

# Migration target
FROM base AS migration
CMD ["python", "library_backend/manage.py", "migrate"]

FROM migration AS createsuperuser
CMD bash -c "python library_backend/manage.py migrate && python library_backend/manage.py createsuperuser --noinput || true"

FROM createsuperuser AS development
CMD ["python", "library_backend/manage.py", "runserver", "0.0.0.0:8000"]