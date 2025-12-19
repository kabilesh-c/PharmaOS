import { NextRequest, NextResponse } from "next/server";

const mockUsers = [
  { id: "1", email: "admin@pharmacy.com", password: "admin123", name: "Admin User", role: "ADMIN" },
  { id: "2", email: "manager@pharmacy.com", password: "manager123", name: "Manager User", role: "MANAGER" },
  { id: "3", email: "pharmacist@pharmacy.com", password: "pharmacist123", name: "Pharmacist User", role: "PHARMACIST" },
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = mockUsers.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = `mock-jwt-token-${user.id}`;
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
