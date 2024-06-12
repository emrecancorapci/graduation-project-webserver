import { db } from "@/server/db";
import { sensorData } from "@/server/db/schema";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const min_parse = Number.parseInt(searchParams.get('min') ?? '');
  const max_parse = Number.parseInt(searchParams.get('max') ?? '');
  const min = !Number.isNaN(min_parse) ? min_parse : null; 
  const max = !Number.isNaN(max_parse) ? max_parse : null;

  console.log(searchParams.get('min'), searchParams.get('max'));
  console.log(min, max);


  const thirtyMin = 1_800_000; // 30 * 60 * 1000

  const data = await db.query.sensorData.findMany({
    where: ({ time }, { and, gte, lte }) =>
      and(
        gte(time, new Date(min ?? Date.now() - thirtyMin).getTime()),
        lte(time, new Date(max ?? Date.now()).getTime())
      ),
  });

  const formattedData = data.map((data) => ({
    ...data,
    ph: Number(data.ph),
  }));

  return Response.json(formattedData);
}

export async function POST(request: NextRequest) {
  const body = await request.json() as SensorData[];

  if (!Array.isArray(body)) {
    return new Response('Invalid request body', { status: 400 });
  }

  if (body.length === 0) {
    return new Response('Invalid request body', { status: 400 });
  }

  if (
    !body.every(
      (data) =>
        typeof data.time === 'number' ||
        (typeof data.time === 'string' &&
          (data.tp === undefined || typeof data.tp === 'number') &&
          (data.hd === undefined || typeof data.hd === 'number') &&
          (data.ph === undefined || typeof data.ph === 'number') &&
          (data.gh === undefined || typeof data.gh === 'number') &&
          (data.aq === undefined || typeof data.aq === 'number') &&
          (data.lt === undefined || typeof data.lt === 'number'))
    )
  ) {
    return new Response('Invalid request body', { status: 400 });
  }

  const secureBody = body.map((data) => {
    const time = new Date(data.time).getTime();

    return {
      time,
      tp: data.tp ?? undefined,
      hd: data.hd ?? undefined,
      ph: String(data.ph) ?? undefined,
      gh: data.gh ?? undefined,
      aq: data.aq ?? undefined,
      lt: data.lt ?? undefined,
    };
  });

  await db
    .insert(sensorData)
    .values(secureBody)
    .then((result) => {
      console.log(result);
      return new Response('Data inserted', { status: 201 });
    })
    .catch((error) => {
      console.error(error);
      return new Response('Error inserting data', { status: 500 });
    });

}

interface SensorData {
  time: number | string;
  tp: number | null;
  hd: number | null;
  ph: number | null;
  gh: number | null;
  aq: number | null;
  lt: number | null;
}