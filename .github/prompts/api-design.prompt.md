---
title: "Express API Design"
description: "Design guidelines for new Express.js endpoints"
tags: ["express", "typescript", "api", "design"]
---

# Express API Design

Design a new Express.js endpoint based on these requirements.

## Requirements Checklist

### Endpoint Basic Info
- [ ] HTTP Method (GET/POST/PUT/DELETE)
- [ ] URL path following REST conventions
- [ ] Request/Response TypeScript interfaces
- [ ] Error response format

### Implementation Details
- [ ] Authentication needs
- [ ] Input validation rules
- [ ] Error handling approach

### Testing Strategy
- [ ] Unit test scenarios
- [ ] Integration test setup
- [ ] Mock requirements

## Example Structure

```typescript
interface RequestDTO {
  // request properties
}

interface ResponseDTO {
  // response properties
}

app.method("/path", async (req: Request<RequestDTO>, res: Response) => {
  try {
    // implementation
  } catch (error) {
    // error handling
  }
});
```

## Notes
- Follow project TypeScript standards
- Use express-validator for validation
- Include error middleware
- Add test coverage
