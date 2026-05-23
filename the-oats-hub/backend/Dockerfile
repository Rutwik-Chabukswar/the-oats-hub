FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    POETRY_VERSION=1.7.0 \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_NO_INTERACTION=1

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl build-essential libpq-dev && \
    rm -rf /var/lib/apt/lists/*

# Install pip dependencies
WORKDIR /app
COPY requirements/ /app/requirements/
RUN pip install --no-cache-dir -r requirements/prod.txt

# Copy source code
COPY . /app

# Run server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
