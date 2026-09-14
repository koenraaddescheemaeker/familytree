
# Security Fixes: Generic Error Messages & Chat Input Validation

## Overview
This plan addresses the two warning-level security issues identified in the scan:
1. Edge functions exposing detailed error messages that could aid attackers
2. Missing server-side message size limits in the chat endpoint

---

## Issue 1: Verbose Error Messages in Edge Functions

### Problem
Multiple edge functions return detailed error messages to clients, including:
- Upstream API status codes and response bodies
- Internal error messages (`error.message`)
- Configuration error details

This information could help attackers understand the system architecture and target specific vulnerabilities.

### Affected Files
| File | Line(s) | Current Issue |
|------|---------|---------------|
| `elevenlabs-tts/index.ts` | 176-179, 200 | Returns upstream ElevenLabs API errors and full error messages |
| `send-update-notification/index.ts` | 343 | Exposes `error.message` in catch block |
| `notify-moderator/index.ts` | 177 | Exposes `error.message` in catch block |
| `get-registered-users/index.ts` | 108 | Exposes `error.message` in catch block |

### Solution
Replace verbose error responses with generic user-facing messages while keeping detailed logging server-side.

**Pattern to apply:**
```typescript
// BEFORE (vulnerable)
catch (error: any) {
  console.error("Error:", error);
  return new Response(
    JSON.stringify({ error: error.message }),  // ❌ Exposes internal details
    { status: 500 }
  );
}

// AFTER (secure)
catch (error) {
  console.error("Error:", error instanceof Error ? error.message : error);  // ✅ Log details server-side
  return new Response(
    JSON.stringify({ error: "An unexpected error occurred" }),  // ✅ Generic message to client
    { status: 500 }
  );
}
```

---

## Issue 2: Chat Endpoint Missing Message Size Limits

### Problem
The `family-history-chat` endpoint validates that messages is an array and limits history to 10 messages, but does NOT:
- Validate individual message structure (role, content)
- Enforce size limits per message
- Protect against very large messages causing token overflow or DoS

### Affected File
`supabase/functions/family-history-chat/index.ts` (lines 153-164)

### Solution
Add comprehensive message validation with:
- Type checking for role and content fields
- Maximum 10,000 characters per message content
- Rejection of messages with invalid structure

**Implementation:**
```typescript
// Add after the array validation
const MAX_MESSAGE_LENGTH = 10000; // 10k chars per message

const validMessages = messages
  .filter((msg: any) => 
    msg && 
    typeof msg.role === 'string' && 
    ['user', 'assistant', 'system'].includes(msg.role) &&
    typeof msg.content === 'string' &&
    msg.content.length > 0 &&
    msg.content.length <= MAX_MESSAGE_LENGTH
  )
  .slice(-10);

if (validMessages.length === 0) {
  return new Response(
    JSON.stringify({ error: "No valid messages provided" }),
    { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}
```

---

## Implementation Details

### Changes to `elevenlabs-tts/index.ts`
1. **Lines 176-179**: Replace detailed upstream error with generic message
2. **Line 200**: Replace `errorMessage` with generic error

```diff
- return jsonError(mappedStatus, `ElevenLabs API error: ${response.status}`, {
-   upstream_status: response.status,
-   upstream_body: errorText,
- });
+ return jsonError(mappedStatus, 'Text-to-speech service temporarily unavailable');
```

```diff
- return jsonError(500, errorMessage);
+ return jsonError(500, 'An unexpected error occurred');
```

### Changes to `family-history-chat/index.ts`
1. Add `MAX_MESSAGE_LENGTH` constant
2. Replace simple array validation with comprehensive message filtering
3. Validate message structure (role, content, length)

### Changes to `send-update-notification/index.ts`
1. **Lines 340-348**: Replace detailed error with generic message

```diff
- return new Response(
-   JSON.stringify({ error: error.message }),
+ return new Response(
+   JSON.stringify({ error: 'An unexpected error occurred' }),
```

### Changes to `notify-moderator/index.ts`
1. **Lines 174-182**: Replace detailed error with generic message

```diff
- return new Response(
-   JSON.stringify({ error: error.message }),
+ return new Response(
+   JSON.stringify({ error: 'An unexpected error occurred' }),
```

### Changes to `get-registered-users/index.ts`
1. **Lines 105-113**: Replace detailed error with generic message

```diff
- return new Response(
-   JSON.stringify({ error: error.message }),
+ return new Response(
+   JSON.stringify({ error: 'An unexpected error occurred' }),
```

---

## Security Benefits

| Fix | Benefit |
|-----|---------|
| Generic error messages | Prevents attackers from learning about internal architecture, third-party services, or configuration issues |
| Server-side logging | Maintains debugging capability for developers |
| Message size limits | Prevents token overflow attacks and potential DoS |
| Message structure validation | Ensures only properly formatted data reaches the AI API |

---

## Technical Summary

**Files to modify:** 5 edge functions
- `supabase/functions/elevenlabs-tts/index.ts`
- `supabase/functions/family-history-chat/index.ts`
- `supabase/functions/send-update-notification/index.ts`
- `supabase/functions/notify-moderator/index.ts`
- `supabase/functions/get-registered-users/index.ts`

**Changes:**
1. Replace all `error.message` responses in catch blocks with generic messages
2. Remove upstream API details from ElevenLabs error responses
3. Add comprehensive message validation with size limits to chat endpoint
4. Maintain detailed console.error() logging for debugging

**No database changes required.**
