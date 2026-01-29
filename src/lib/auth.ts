import { NextResponse } from 'next/server';

export function protectAdminRoute(request: Request): NextResponse | null {
  const authHeader = request.headers.get('Authorization');
  const adminPassword = process.env.ADMIN_PASSWORD || 'meetjs-admin-2025';

  // Allow access if no password is set (development mode)
  if (!adminPassword) {
    return null;
  }

  if (authHeader !== `Bearer ${adminPassword}`) {
    return NextResponse.json(
      { error: 'Unauthorized - Invalid or missing API key' },
      { status: 401 }
    );
  }

  return null;
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'meetjs-admin-2025';
}