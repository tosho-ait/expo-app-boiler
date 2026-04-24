// Single-line JSON logs so Vercel / Datadog / CloudWatch can parse fields.
// Call sites attach a short `event` tag and a context object (userId, route, etc.)
// so filtering by user or endpoint works without parsing free-text messages.

function emit(level, event, data) {
    const line = {
        ts: new Date().toISOString(),
        level,
        event,
        ...(data || {}),
    };
    const payload = JSON.stringify(line);
    if (level === 'error') console.error(payload);
    else if (level === 'warn') console.warn(payload);
    else console.log(payload);
}

export function logInfo(event, data) {
    emit('info', event, data);
}

export function logWarn(event, data) {
    emit('warn', event, data);
}

export function logError(event, err, data) {
    const errorInfo = err
        ? {
            error: {
                message: err.message || String(err),
                name: err.name,
                stack: err.stack,
            },
        }
        : {};
    emit('error', event, { ...(data || {}), ...errorInfo });
}

// Back-compat: existing call sites use logTrace for plain informational logs.
export function logTrace(...args) {
    console.log(...args);
}
