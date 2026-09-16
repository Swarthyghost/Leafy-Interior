"use server";

export async function verifyAdminPin(pin: string): Promise<boolean> {
  const adminPin = process.env.ADMIN_PIN;
  
  // If no PIN is set on the server, we allow access
  if (!adminPin) {
    return true;
  }
  
  return pin === adminPin;
}

export async function hasAdminPin(): Promise<boolean> {
  return !!process.env.ADMIN_PIN;
}
