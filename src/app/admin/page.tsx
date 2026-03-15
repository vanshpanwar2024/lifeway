import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { AdminDashboardClient } from "@/components/admin/AdminDashboardClient";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/admin/login");
  }

  let properties: any[] = [];
  try {
    properties = await prisma.property.findMany({
      orderBy: { createdAt: "desc" }
    });
    // Serialize dates for client component
    properties = properties.map(p => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("Database connection error:", error);
  }

  return <AdminDashboardClient properties={properties} />;
}
