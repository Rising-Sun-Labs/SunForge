package util

import "github.com/google/uuid"

func PtrUUID(u uuid.UUID) *uuid.UUID { return &u }
