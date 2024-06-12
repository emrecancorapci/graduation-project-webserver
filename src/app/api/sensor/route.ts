import { db } from "@/server/db";

export async function GET() {
  const sensors = await db.query.sensors.findMany();

  return Response.json(sensors);
}