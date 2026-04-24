import {NextResponse} from "next/server";

export const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
}

export const jsonHeaders = {
    "Content-Type": "application/json",
    ...corsHeaders
}


export function respondServerError(error) {
    return NextResponse.json({error: 'internal error'}, {status: 500, headers: jsonHeaders});
}

export function respondNotAuthorized() {
    return NextResponse.json({error: "not authorized"}, {status: 401, headers: jsonHeaders});
}

export function respondReturnJson(data) {
    return NextResponse.json(data, {
        status: 200,
        headers: jsonHeaders
    });
}

export function respondReturn() {
    return NextResponse.json(null, {
        status: 200,
        headers: corsHeaders
    });
}
