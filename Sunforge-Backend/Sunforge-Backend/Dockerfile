# Build
FROM golang:1.24.2-alpine AS build
WORKDIR /src

# Cache dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy source and build
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -o /out/sunforge ./cmd/api

# Run
FROM gcr.io/distroless/base-debian12
WORKDIR /app
ENV HTTP_ADDR=:5005
COPY --from=build /out/sunforge /app/sunforge
COPY .env.example /app/.env.example
EXPOSE 5005
ENTRYPOINT ["/app/sunforge"]
