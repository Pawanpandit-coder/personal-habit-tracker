import { connectDB } from "@/lib/mongodb";
import { auth } from "@/middleware/auth";
import Recall from "@/models/recall";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    await connectDB();
    const decoded = auth(req)
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
    const id = searchParams.get('id')
    const currentDate = new Date();

    let filter;

    filter = [
      {
        $match: {
          userId: new mongoose.Types.ObjectId(decoded.userId)
        }
      },
      {
        $match: {
          $expr: {
            $in: [
              {
                $dateDiff: {
                  startDate: "$date",
                  endDate: currentDate,
                  unit: "day"
                }
              },
              [2, 4, 8, 15, 22]
            ]
          }
        }
      }
    ];

    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);

      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      console.log(start)
      console.log(end)

      filter = [
        {
          $match: {
            userId: new mongoose.Types.ObjectId(decoded.userId),
            date: {
              $gte: start,
              $lte: end
            }
          }
        }
      ];
    }


    if (id) {
      filter = [
        {
          $match: {
            userId: new mongoose.Types.ObjectId(decoded.userId),
            _id: new mongoose.Types.ObjectId(id)
          },

        }

      ]
    }

    const recall = await Recall.aggregate(filter);
    return Response.json(
      { success: true, message: "recall fetched", recall },
      { status: 200 },
    );
  } catch (err) {
    return Response.json(
      { success: false, message: "something wrong to fetched recall" },
      { status: 500 },
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const decoded = auth(req)
    const body = await req.json();
    const recall = await Recall.create({ ...body, userId: decoded.userId });
    return Response.json(
      { success: true, message: "recall created", recall },
      { status: 201 },
    );
  } catch (err) {
    return Response.json(
      { success: false, message: "something wrong to create recall" },
      { status: 500 },
    );
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const decoded = auth(req)
    const body = await req.json();
    const { id, completed } = body;
    const recall = await Recall.findByIdAndUpdate({ _id: id, userId: decoded.userId }, { completed });
    return Response.json(
      { success: true, message: "recall upadated successfully", recall },
      { status: 200 },
    );
  } catch (err) {
    return Response.json(
      { success: false, message: "something wrong to update recall" },
      { status: 500 },
    );
  }
}
