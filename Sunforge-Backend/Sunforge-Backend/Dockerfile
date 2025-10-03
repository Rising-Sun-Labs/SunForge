# Build 
FROM golang:1.24.2 AS builder

# Set working directory
WORKDIR /app

# Copy only Go module files first for caching
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy only the main source files (packages), ignoring Non-go files
COPY ./ ./

# Build all packages in the repo
# -buildvcs=false speed up builds for very large repos
RUN CGO_ENABLED=0 GOOS=linux go build -o /docker-gs-ping -buildvcs=false ./...

# Final Stage
FROM alpine:latest

# Create non-root user 
RUN adduser -D -u 1000 appuser
USER appuser

# Set working directory
WORKDIR /home/appuser

# Copy the binary from the builder
COPY --from=builder /docker-gs-ping .

# Expose application port
EXPOSE 5005

# Run the binary
CMD [ "./docker-gs-ping" ]

# Development stage:
FROM golang:1.24.2 AS dev

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .

# Expose port:
EXPOSE 5005

# Run in dev
CMD [ "sh", "-c", "go run ./..." ]