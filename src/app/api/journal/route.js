import { connectDB } from "@/lib/mongodb";
import { auth } from "@/middleware/auth";
import Journal from "@/models/journal";

export async function GET(req) {
  try {
    connectDB();
    const decoded = auth(req)
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date')
    const id = searchParams.get('id')

    const filter = {
      userId: decoded.userId,
    }
    // console.log(filter.userId)
    // console.log(typeof(filter.userId))
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);

      filter.date = {
        $gte: start,
        $lte: end,
      }
    }
    if (id) {
      filter._id = id
    }

    const journal = await Journal.find(filter).sort({ date: -1 }).limit(10);

    return Response.json(
      { success: true, message: "journal fetched", journal },
      { status: 200 },
    );
  } catch (err) {
    return Response.json(
      { success: false, message: "something wrong to fetched journal" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    connectDB();
    const decoded = auth(req)
    const body = await req.json();
    const journal = await Journal.create({ ...body, userId: decoded.userId });
    return Response.json(
      { success: true, message: "recall created", journal },
      { status: 201 },
    );
  } catch (err) {
    return Response.json(
      { success: false, message: "something wrong to create journal" },
      { status: 500 },
    );
  }
}

// export async function PATCH(req) {
//   try {
//     await connectDB();
//     const decoded = auth(req)
//     const body = await req.json();
//     const { id } = body;
//     const journal = await Journal.findByIdAndUpdate({ _id: id, userId: decoded.userId });
//     return Response.json(
//       { success: true, message: "Journal upadated successfully", journal },
//       { status: 200 },
//     );
//   } catch (err) {
//     return Response.json(
//       { success: false, message: "something wrong to fetch Journal recall" },
//       { status: 500 },
//     );
//   }
// }
